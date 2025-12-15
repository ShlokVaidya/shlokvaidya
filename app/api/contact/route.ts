import { NextRequest, NextResponse } from "next/server";
import NodeMailer from "nodemailer";
import { Client } from "pg";

export async function POST(req: NextRequest) {
  let client: Client | null = null;
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();

    // Ensure table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    await client.query(
      "INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );

    // Send email only if creds are present
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_PASS;

    if (!user || !pass) {
      console.warn("Email disabled: missing GMAIL_USER/GMAIL_PASS");
      return NextResponse.json({ ok: true, emailSent: false });
    }

    const transporter = NodeMailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.FORWARD_TO_EMAIL || user,
      subject: "New Contact Message",
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });

    return NextResponse.json({ ok: true, emailSent: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
  } finally {
    if (client) {
      try { await client.end(); } catch {}
    }
  }
}

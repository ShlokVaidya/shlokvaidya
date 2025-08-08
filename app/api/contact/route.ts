import { NextRequest, NextResponse } from "next/server";
import NodeMailer from 'nodemailer'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Save to Neon Postgres via Prisma
    await prisma.contactMessage.create({
      data: { name, email, message },
    });

    // Send email via Gmail SMTP
    const transporter = NodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.FORWARD_TO_EMAIL || process.env.GMAIL_USER,
      subject: "New Contact Message",
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
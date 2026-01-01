import { NextResponse } from "next/server";
import { hashWithSecret, generateSessionToken } from "@/lib/server-crypto";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { otp } = await req.json();
  const otpSecret = process.env.OTP_SECRET;
  
  if (!otp) {
    return NextResponse.json({ error: "OTP required" }, { status: 400 });
  }

  if (!otpSecret) {
    return NextResponse.json({ error: "OTP secret not configured" }, { status: 500 });
  }

  const otpHash = hashWithSecret(otp, otpSecret);

  try {
    const { rows } = await db.query(
      `
      SELECT id FROM admin_auth
      WHERE otp_hash = $1
        AND used = false
        AND expires_at > now()
      ORDER BY created_at DESC
      LIMIT 1
      `,
      [otpHash]
    );

    if (!rows.length) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 });
    }

    await db.query(
      `UPDATE admin_auth SET used = true WHERE id = $1`,
      [rows[0].id]
    );

    // Generate a session token and store it in the database
    const sessionToken = generateSessionToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await db.query(
      `
      INSERT INTO admin_sessions (token, expires_at)
      VALUES ($1, $2)
      `,
      [sessionToken, expiresAt]
    );

    const res = NextResponse.json({ ok: true });

    res.cookies.set("admin_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch (error) {
    console.error("Failed to verify OTP:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}

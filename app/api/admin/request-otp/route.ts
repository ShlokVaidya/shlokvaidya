import { NextResponse } from "next/server";
import { hash, generateOTP } from "@/lib/crypto";
import { generateUUID, hashWithSecret } from "@/lib/server-crypto";
import { sendOTP } from "@/lib/mail";
import { db } from "@/lib/db";

export async function POST() {
  const email = process.env.ADMIN_EMAIL!;
  const otpSecret = process.env.OTP_SECRET!;
  
  if (!email) {
    return NextResponse.json({ error: "Admin email not configured" }, { status: 500 });
  }

  const emailHash = hashWithSecret(email, otpSecret);
  const otp = generateOTP();
  const otpHash = hashWithSecret(otp, otpSecret);

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  try {
    await db.query(
      `
      INSERT INTO admin_auth (id, email_hash, otp_hash, expires_at)
      VALUES ($1, $2, $3, $4)
      `,
      [generateUUID(), emailHash, otpHash, expiresAt]
    );

    await sendOTP(email, otp);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to request OTP:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { hash, generateOTP } from "@/lib/crypto";
import { sendOTP } from "@/lib/mail";
import { db } from "@/lib/db"; // your Neon client
import crypto from "crypto";

export async function POST() {
  const email = process.env.ADMIN_EMAIL!;
  const emailHash = hash(email);
  const otp = generateOTP();
  const otpHash = hash(otp);

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await db.query(
    `
    INSERT INTO admin_auth (id, email_hash, otp_hash, expires_at)
    VALUES ($1, $2, $3, $4)
    `,
    [crypto.randomUUID(), emailHash, otpHash, expiresAt]
  );

  await sendOTP(email, otp);

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { hash } from "@/lib/crypto";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { otp } = await req.json();
  if (!otp) {
    return NextResponse.json({ error: "OTP required" }, { status: 400 });
  }

  const otpHash = hash(otp);

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

  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET!,
    { expiresIn: "24h" }
  );

  const res = NextResponse.json({ ok: true });

  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return res;
}

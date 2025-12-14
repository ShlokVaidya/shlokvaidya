import crypto from "crypto";

export function hash(value: string) {
  return crypto
    .createHmac("sha256", process.env.OTP_SECRET!)
    .update(value)
    .digest("hex");
}

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

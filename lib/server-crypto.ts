// Server-side only crypto utilities (uses Node.js crypto module)
import crypto from "crypto";

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function generateUUID(): string {
  return crypto.randomUUID();
}

export function hashWithSecret(value: string, secret: string): string {
  return crypto
    .createHmac("sha256", secret)
    .update(value)
    .digest("hex");
}

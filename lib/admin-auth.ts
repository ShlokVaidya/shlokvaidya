import jwt from "jsonwebtoken";

export function verifyAdmin(token?: string) {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
}

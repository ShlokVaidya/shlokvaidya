import { db } from "@/lib/db";

export async function verifyAdmin(token?: string) {
  if (!token) return null;
  
  try {
    const { rows } = await db.query(
      `
      SELECT * FROM admin_sessions
      WHERE token = $1
        AND expires_at > now()
      `,
      [token]
    );

    if (rows.length === 0) {
      return null;
    }

    return { role: "admin" };
  } catch (error) {
    console.error("Failed to verify admin session:", error);
    return null;
  }
}

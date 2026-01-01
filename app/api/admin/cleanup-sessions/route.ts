import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// This is an internal cleanup route - should be called periodically
export async function POST() {
  try {
    // Delete expired sessions
    await db.query(
      `DELETE FROM admin_sessions WHERE expires_at < now()`
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to cleanup sessions:", error);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}

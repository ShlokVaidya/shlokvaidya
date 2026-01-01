import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdmin } from "@/lib/admin-auth";
import { STATUS_MAP, StatusKey } from "@/lib/status";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get("admin_token")?.value;
    const admin = verifyAdmin(token);

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body: { state?: string; message?: string } = await req.json();
    const { state, message } = body;

    if (!state || !(state in STATUS_MAP)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const label = STATUS_MAP[state as StatusKey];

    await db.query(
      `
      INSERT INTO status (id, state, label, message, updated_at)
      VALUES ('current', $1, $2, $3, now())
      ON CONFLICT (id)
      DO UPDATE SET
        state = EXCLUDED.state,
        label = EXCLUDED.label,
        message = EXCLUDED.message,
        updated_at = now()
      `,
      [state, label, message ?? null]
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const res = await db.query(`SELECT * FROM status WHERE id = 'current'`);
    const status = res.rows[0] || { state: "offline", label: "Offline", message: null };
    return NextResponse.json(status);
  } catch (error) {
    console.warn("Database connection error, returning default status:", error);
    // Return default status if DB is unavailable
    return NextResponse.json({
      state: "offline",
      label: "Offline",
      message: "Database unavailable",
    });
  }
}

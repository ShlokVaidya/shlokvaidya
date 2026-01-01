import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET(request: Request) {
  const token = request.headers.get("cookie")?.split("admin_token=")[1]?.split(";")[0];

  if (!token || !verifyAdmin(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}

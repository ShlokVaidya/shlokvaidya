import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  const slug = context.params.slug;

  const result = await db.query(
    "SELECT count FROM views WHERE slug = $1",
    [slug]
  );
  const count = result.rows[0]?.count ?? 0;

  return NextResponse.json({ count });
}

export async function POST(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  const slug = context.params.slug;

  await db.query(
    `INSERT INTO views (slug, count)
     VALUES ($1, 1)
     ON CONFLICT (slug)
     DO UPDATE SET count = views.count + 1`,
    [slug]
  );

  return NextResponse.json({ success: true });
}

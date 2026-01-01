import { incrementView, getViews } from "@/lib/views";

export async function POST(request: Request) {
  const { slug } = await request.json();

  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  await incrementView(slug);
  const views = await getViews(slug);

  return Response.json({ views });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  const views = await getViews(slug);
  return Response.json({ views });
}

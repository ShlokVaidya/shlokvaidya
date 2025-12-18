import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("u") || "ShlokVaidya";
  const limit = Number(searchParams.get("limit") || "6");
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "GitHub Token not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`,
      {
        headers: {
          Authorization: `token ${token}`,
          "User-Agent": username,
        },
        next: { revalidate: 1800 }, // Cache 30 min
      }
    );

    if (!res.ok) {
      console.error(`GitHub API failed with status: ${res.status}`);
      return NextResponse.json({ error: "Failed to fetch repos" }, { status: res.status });
    }

    const repos = await res.json();
    return NextResponse.json({ repos });
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
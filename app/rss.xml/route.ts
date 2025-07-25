// app/rss.xml/route.ts

import { NextResponse } from "next/server";
import { getAllBlogs } from "@/lib/blog"; // adjust to your data fetching

const siteUrl = "http://localhost:3000"; // Replace with your domain

export async function GET() {
  const posts = await getAllBlogs(); // Fetch latest blog posts

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${post.title}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${post.summary || ""}</description>
    </item>
  `
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Shlok Vaidya's Blog</title>
      <link>${siteUrl}/blog</link>
      <description>Latest posts from Shlok Vaidya</description>
      <language>en-us</language>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });
}

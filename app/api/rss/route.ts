import { getAllPosts } from "@/lib/mdx";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = getAllPosts();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://shlokvaidya.vercel.app";

  const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Shlok Vaidya's Blog</title>
    <link>${baseUrl}</link>
    <description>Developer, Designer & Dreamer crafting experiences on the web. Exploring web development, design patterns, and innovative technologies.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/og-image.png</url>
      <title>Shlok Vaidya's Blog</title>
      <link>${baseUrl}</link>
    </image>
    ${posts
      .map((post) => {
        const postUrl = `${baseUrl}/blog/${post.slug}`;
        return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.description)}</description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      ${post.banner ? `<image>${post.banner}</image>` : ""}
      ${post.tags ? post.tags.map((tag: string) => `<category>${escapeXml(tag)}</category>`).join("") : ""}
      <author>shlok@example.com (Shlok Vaidya)</author>
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(rssContent, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

function escapeXml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

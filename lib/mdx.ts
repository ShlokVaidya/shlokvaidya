// lib/mdx.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

const BLOG_PATH = path.join(process.cwd(), "content/blogs");

export type BlogFrontmatter = {
  title: string;
  summary: string;
  slug: string;
  publishedAt: string;
  coverImage: string; // ✅ make required
  readingTime: number;
  tags: string[];
};
export async function getBlogBySlug(slug: string) {
  const files = fs.readdirSync(BLOG_PATH).filter((f) => f.endsWith(".mdx"));
  const slugs = files.map((f) => f.replace(/\.mdx?$/, ""));
  const index = slugs.indexOf(slug);

  const getMeta = (targetSlug: string | null) => {
    if (!targetSlug) return null;
    const filePath = path.join(BLOG_PATH, `${targetSlug}.mdx`);
    const source = fs.readFileSync(filePath, "utf8");
    const { data } = matter(source);
    return {
      slug: targetSlug,
      title: data.title,
      summary: data.summary,
    };
  };

  const prev = index > 0 ? getMeta(slugs[index - 1]) : null;
  const next = index < slugs.length - 1 ? getMeta(slugs[index + 1]) : null;

  const filePath = path.join(BLOG_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);

  const mdx = await compileMDX({ source: content, options: { parseFrontmatter: false } });

  return {
    meta: {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      ...(data as any),
      slug,
    },
    content: mdx.content,
    prev,
    next,
  };
}

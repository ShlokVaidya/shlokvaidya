import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_PATH = path.join(process.cwd(), "content/blogs");

export type BlogFrontmatter = {
  title: string;
  summary: string;
  slug: string;
  publishedAt: string;
  coverImage: string; 
  readingTime: number;
  tags: string[];
};

export function getAllBlogs(): BlogFrontmatter[] {
  const files = fs.readdirSync(BLOG_PATH).filter(file => file.endsWith(".mdx"));

  const blogs = files.map((fileName) => {
    const filePath = path.join(BLOG_PATH, fileName);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContents);

    const slug = fileName.replace(/\.mdx$/, "");

    return {
      ...(data as BlogFrontmatter),
      slug,
    };
  });

  // Sort by published date (latest first)
  return blogs.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

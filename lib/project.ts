import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECT_PATH = path.join(process.cwd(), "content/projects");

export type ProjectFrontmatter = {
  title: string;
  summary: string;
  slug: string;
  publishedAt: string;
  coverImage: string; 
  readingTime: number;
  tags: string[];
};

export function getAllProjects(): ProjectFrontmatter[] {
  const files = fs.readdirSync(PROJECT_PATH).filter(file => file.endsWith(".mdx"));

  const projects = files.map((fileName) => {
    const filePath = path.join(PROJECT_PATH, fileName);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContents);

    const slug = fileName.replace(/\.mdx$/, "");

    return {
      ...(data as ProjectFrontmatter),
      slug,
    };
  });

  // Sort by published date (latest first)
  return projects.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

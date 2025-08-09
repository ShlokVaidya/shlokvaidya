//* @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getRecentBlogs(limit = 3) {
  const blogsDir = path.join(process.cwd(), "content", "blogs");
  const files = fs.readdirSync(blogsDir);
  
  const blogs = files
    .map((file) => {
      const filePath = path.join(blogsDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      const { data } = matter(content);
      return {
        ...(data as { date: string; [key: string]: any }),
        slug: file.replace(/\.mdx?$/, ""),
      };
    })
    .sort((a, b) => new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1)
    .slice(0, limit);

  return blogs;
}

export function getRecentProjects(limit = 3) {
  const projectsDir = path.join(process.cwd(), "content", "projects");
  if (!fs.existsSync(projectsDir)) {
    return []; // Directory does not exist, return empty array
  }
  const files = fs.readdirSync(projectsDir);
  const projects = files
    .map((file) => {
      const filePath = path.join(projectsDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      const { data } = matter(content);
      return {
        ...(data as { date: string; [key: string]: any }),
        slug: file.replace(/\.mdx?$/, ""),
      };
    })
    .sort((a, b) => new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1)
    .slice(0, limit);

  return projects;
}
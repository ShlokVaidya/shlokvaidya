import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_PATH = path.join(process.cwd(), "content/blogs");

export interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  banner?: string;
  tags?: string[];
  [key: string]: any;
}

export async function getAllPostsWithImages(): Promise<PostMetadata[]> {
  const files = fs.readdirSync(BLOG_PATH);

  const postsWithImages = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(".mdx", "");
      const source = fs.readFileSync(path.join(BLOG_PATH, file), "utf8");
      const { data, content } = matter(source);

      // Use banner from frontmatter or null
      const banner = data.banner || null;

      return {
        slug,
        title: data.title || "",
        description: data.description || "",
        publishedAt: data.publishedAt || new Date().toISOString(),
        banner,
        ...data,
        readingTime: readingTime(content).text,
      } as PostMetadata;
    })
  );

  return postsWithImages.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime()
  );
}

export function getAllPosts(): PostMetadata[] {
  const files = fs.readdirSync(BLOG_PATH);

  return files.map((file) => {
    const slug = file.replace(".mdx", "");
    const source = fs.readFileSync(path.join(BLOG_PATH, file), "utf8");
    const { data, content } = matter(source);

    return {
      slug,
      title: data.title || "",
      description: data.description || "",
      publishedAt: data.publishedAt || new Date().toISOString(),
      banner: data.banner,
      ...data,
      readingTime: readingTime(content).text,
    } as PostMetadata;
  }).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string) {
  const source = fs.readFileSync(
    path.join(BLOG_PATH, `${slug}.mdx`),
    "utf8"
  );

  const { data, content } = matter(source);

  return {
    frontmatter: {
      title: data.title || "",
      publishedAt: data.publishedAt || new Date().toISOString(),
      ...data,
    } as PostMetadata,
    content,
    readingTime: readingTime(content).text,
  };
}

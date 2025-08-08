import { BlogFrontmatter } from "@/lib/mdx";
import Image from "next/image";
import Link from "next/link";

export default function Card({ blog }: { blog: BlogFrontmatter }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block rounded-xl overflow-hidden shadow hover:shadow-xl transition">
      <div className="relative w-full h-52">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4 bg-background">
        <h2 className="text-xl font-semibold">{blog.title}</h2>
        <p className="text-muted-foreground text-sm">{blog.summary}</p>
        <div className="mt-2 text-xs text-muted-foreground">
          {blog.publishedAt} • {blog.readingTime} min read
        </div>
      </div>
    </Link>
  );
}

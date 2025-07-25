import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { BlogNavigator } from "@/components/blog/BlogNavigator";
import { getBlogBySlug } from "@/lib/mdx";
import Image from "next/image";
import { ViewCounter } from "@/components/blog/ViewCounter";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const { meta } = await getBlogBySlug(params.slug);
    return {
      title: meta.title,
      description: meta.summary,
    };
  } catch {
    return {
      title: "Not Found",
      description: "Blog not found",
    };
  }
}

export default async function DetaileBlogPage({
  params,
}: {
  params: { slug: string };
}): Promise<React.JSX.Element> {
  const slug = params.slug;
  const { meta, content, prev, next } = await getBlogBySlug(slug);
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blogs
      </Link>

      <div className="space-y-1">
        <h1 className="text-3xl font-bold">{meta.title}</h1>
        <p className="text-sm text-muted-foreground">
          {meta.publishedAt} • {meta.readingTime} min read •{" "}
          <ViewCounter slug={slug} /> views
        </p>
      </div>

      {meta.coverImage && (
        <div className="relative w-full h-64 rounded-xl overflow-hidden">
          <Image
            src={meta.coverImage}
            alt={meta.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <article className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-p:text-lg prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800">
        {content}
      </article>

      <BlogNavigator
        prev={
          prev?.slug
            ? {
                title: prev.title,
                summary: prev.summary,
                slug: prev.slug,
              }
            : undefined
        }
        next={
          next?.slug
            ? {
                title: next.title,
                summary: next.summary,
                slug: next.slug,
              }
            : undefined
        }
      />
    </div>
  );
}

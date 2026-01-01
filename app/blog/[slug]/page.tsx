import PostNavigator from "@/components/PostNavigator";
import { ViewCounter } from "@/components/ViewCounter";
import { ViewTracker } from "@/components/ViewTracker";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { getViews } from "@/lib/views";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = (() => {
    try {
      return getPostBySlug(slug);
    } catch {
      return null;
    }
  })();

  if (!post) {
    notFound();
  }

  const views = await getViews(slug);
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((entry) => entry.slug === slug);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const otherPosts = allPosts.filter((entry) => entry.slug !== slug);
  const toc = extractHeadings(post.content);
  const bannerImage = (post.frontmatter as { banner?: string }).banner;

  const mdxComponents = {
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const id = slugify(String(props.children ?? ""));
      return (
        <h2 id={id} {...props} className="mt-12 scroll-mt-24 text-2xl font-semibold" />
      );
    },
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const id = slugify(String(props.children ?? ""));
      return (
        <h3 id={id} {...props} className="mt-10 scroll-mt-24 text-xl font-semibold" />
      );
    },
  } as const;

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-10">
      <div
        className="pointer-events-none absolute left-0 top-10 h-56 w-56 rounded-full bg-primary/12 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-12 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-[32px] border border-border/70 bg-card/80 shadow-2xl shadow-primary/10">
        <div className="absolute inset-0">
          {bannerImage ? (
            <Image
              src={bannerImage}
              alt="Post banner"
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-primary/15 via-primary/5 to-transparent" aria-hidden />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/80 to-background/70" aria-hidden />
        </div>

        <div className="relative z-10 flex flex-col gap-6 p-8 sm:p-12 lg:p-14">
          <Link
            href="/blog"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary transition hover:border-primary/60"
          >
            <ArrowLeft className="h-4 w-4 transition duration-200 group-hover:-translate-x-1" />
            Back to all posts
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/70 px-3 py-1">
              <CalendarDays className="h-4 w-4" />
              <span>{formatDate(post.frontmatter.publishedAt)}</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/70 px-3 py-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </span>
            <ViewCounter slug={slug} initialViews={views} />
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
              {post.frontmatter.title}
            </h1>
            {post.frontmatter.description ? (
              <p className="text-lg text-muted-foreground">{post.frontmatter.description}</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="relative mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="relative space-y-10 rounded-[28px] border border-border/70 bg-card/85 p-8 shadow-xl shadow-primary/8 backdrop-blur">
          <div className="prose max-w-none text-foreground">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-secondary/60 p-4 shadow-md shadow-primary/8 lg:col-span-2 lg:flex-row lg:items-center lg:justify-between">
              <div className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">Keep reading</div>
              <div className="grid gap-3 sm:grid-cols-2">
                {previousPost ? (
                  <Link
                    href={`/blog/${previousPost.slug}`}
                    className="group inline-flex items-center gap-2 rounded-xl border border-transparent bg-card/90 px-4 py-3 text-sm font-semibold transition hover:border-primary/60 hover:text-primary"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <div className="flex flex-col text-left leading-tight">
                      <span className="text-[11px] uppercase text-muted-foreground">Previous</span>
                      <span className="line-clamp-1">{previousPost.title}</span>
                    </div>
                  </Link>
                ) : null}

                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group inline-flex items-center gap-2 rounded-xl border border-transparent bg-card/90 px-4 py-3 text-sm font-semibold transition hover:border-primary/60 hover:text-primary sm:justify-end"
                  >
                    <div className="flex flex-col text-left leading-tight">
                      <span className="text-[11px] uppercase text-muted-foreground">Next</span>
                      <span className="line-clamp-1">{nextPost.title}</span>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            </div>

            {(!previousPost && !nextPost) ? (
              <p className="text-sm text-muted-foreground">No adjacent posts yet—check back soon.</p>
            ) : null}
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-md shadow-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                <Link2 className="h-4 w-4" />
                Quick links
              </div>
              <span className="text-[11px] uppercase text-muted-foreground">Sections</span>
            </div>

            <div className="mt-3 space-y-2">
              {toc.length ? (
                toc.map((heading) => (
                  <a
                    key={heading.slug}
                    href={`#${heading.slug}`}
                    className="group flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-foreground transition hover:bg-secondary/70 hover:text-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70 group-hover:bg-primary" aria-hidden />
                    <span className="line-clamp-1">{heading.text}</span>
                  </a>
                ))
              ) : (
                <p className="text-xs text-muted-foreground">Headings will show up here.</p>
              )}
            </div>
          </div>

          <PostNavigator posts={otherPosts} />
        </aside>
      </div>
    </section>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractHeadings(source: string) {
  return source
    .split(/\n+/)
    .filter((line) => /^##\s+/.test(line) || /^###\s+/.test(line))
    .map((line) => {
      const text = line.replace(/^#+\s+/, "").trim();
      return { text, slug: slugify(text) };
    })
    .slice(0, 12);
}

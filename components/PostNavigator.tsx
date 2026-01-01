"use client";

import { CalendarDays, Clock, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export type PostPreview = {
  slug: string;
  title: string;
  description?: string;
  publishedAt: string;
  readingTime?: string;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export default function PostNavigator({ posts }: { posts: PostPreview[] }) {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return posts.slice(0, 6);
    }

    return posts
      .filter((post) =>
        `${post.title} ${post.description ?? ""}`
          .toLowerCase()
          .includes(term)
      )
      .slice(0, 6);
  }, [posts, query]);

  return (
    <aside className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-primary/10">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
        <Search className="h-4 w-4" />
        Browse other posts
      </div>

      <div className="mt-3">
        <label className="sr-only" htmlFor="post-search">
          Search posts
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="post-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-xl border border-border/70 bg-secondary/60 px-10 py-2 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
            placeholder="Search titles or summaries"
          />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-xl border border-transparent bg-secondary/60 px-3 py-3 transition hover:border-primary/60 hover:bg-secondary/80"
          >
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary/80 px-2 py-1">
                <CalendarDays className="h-3.5 w-3.5" />
                <span>{formatDate(post.publishedAt)}</span>
              </span>
              {post.readingTime ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary/80 px-2 py-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readingTime}</span>
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-sm font-semibold text-foreground group-hover:text-primary">
              {post.title}
            </p>
            {post.description ? (
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                {post.description}
              </p>
            ) : null}
          </Link>
        ))}

        {!filteredPosts.length ? (
          <p className="text-xs text-muted-foreground">No posts matched your search.</p>
        ) : null}
      </div>
    </aside>
  );
}

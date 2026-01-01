"use client";

import { CalendarDays, Clock, Filter, Search, Tag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export type BlogIndexPost = {
  slug: string;
  title: string;
  description?: string;
  publishedAt: string;
  readingTime?: string;
  banner?: string;
  tags?: string[];
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export default function BlogIndex({ posts }: { posts: BlogIndexPost[] }) {
  const [query, setQuery] = useState("");
  const [onlyRecent, setOnlyRecent] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags from all posts
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const limitDate = new Date();
    limitDate.setMonth(limitDate.getMonth() - 3);

    return posts.filter((post) => {
      const matchesQuery = !term
        ? true
        : `${post.title} ${post.description ?? ""}`.toLowerCase().includes(term);
      const matchesRecent = !onlyRecent
        ? true
        : new Date(post.publishedAt) >= limitDate;
      const matchesTag = !selectedTag
        ? true
        : post.tags?.includes(selectedTag);
      return matchesQuery && matchesRecent && matchesTag;
    });
  }, [onlyRecent, posts, query, selectedTag]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        {/* Search and Filter Row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-3">
          <div className="flex-1">
            <label className="sr-only" htmlFor="blog-search">
              Search posts
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="blog-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title or topic..."
                className="w-full rounded-xl border border-border/70 bg-background px-10 py-2.5 text-sm outline-none transition focus:border-primary/60 focus:ring-1 focus:ring-primary/20"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOnlyRecent((prev) => !prev)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition whitespace-nowrap ${
              onlyRecent
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border/70 bg-background text-foreground hover:border-border/50"
            }`}
          >
            <Filter className="h-4 w-4" />
            Recent
          </button>
        </div>

        {/* Tags Row */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                    selectedTag === tag
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {tag}
                  {selectedTag === tag && <X className="h-3 w-3" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "post" : "posts"}
        {onlyRecent && " · Last 90 days"}
        {selectedTag && ` · Tagged with "${selectedTag}"`}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            {post.banner ? (
              <div className="aspect-video overflow-hidden bg-muted">
                <Image
                  src={post.banner}
                  alt={post.title}
                  width={400}
                  height={225}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" aria-hidden />
            )}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {post.description}
                  </p>
                )}
                
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center gap-3 border-t border-border/30 pt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {formatDate(post.publishedAt)}
                </span>
                {post.readingTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readingTime}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}

        {!filtered.length && (
          <div className="col-span-full py-12 text-center">
            <p className="text-muted-foreground">
              No posts found. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

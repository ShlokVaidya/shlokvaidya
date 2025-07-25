"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { BlogFrontmatter } from "@/lib/mdx";
import BlogCard from "./BlogCard";
import { Button } from "@/components/ui/button";

type Props = {
  blogs: BlogFrontmatter[];
};

export default function SearchAndFilter({ blogs }: Props) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const fuse = useMemo(
    () =>
      new Fuse(blogs, {
        keys: ["title", "summary"],
        threshold: 0.3,
      }),
    [blogs]
  );

  const allTags = Array.from(new Set(blogs.flatMap((b) => b.tags)));

  const filteredBlogs = useMemo(() => {
    let result = query ? fuse.search(query).map((r) => r.item) : blogs;

    if (selectedTag) {
      result = result.filter((blog) => blog.tags.includes(selectedTag));
    }

    return result;
  }, [fuse, query, selectedTag, blogs]);

  return (
    <div className="space-y-6">
      <input
        name="search"
        id="search"
        type="text"
        placeholder="Search blog posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded-md bg-background text-foreground"
      />

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={selectedTag === null ? "default" : "outline"}
          className={selectedTag === null ? "bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground-dark" : "hover:bg-muted"}
          onClick={() => setSelectedTag(null)}
        >
          All
        </Button>
        {allTags.map((tag) => (
          <Button
            key={tag}
            size="sm"
            variant={selectedTag === tag ? "default" : "outline"}
            className={selectedTag === tag ? "bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground-dark" : "hover:bg-muted"}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog.slug} blog={blog} />)
        ) : (
          <p className="text-muted-foreground">No blog posts found.</p>
        )}
      </div>
    </div>
  );
}



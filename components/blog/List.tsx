"use client";

import { useState } from "react";

type Blog = {
  title: string;
  summary: string;
  slug: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  coverImage: string;
};

function Card({ blog }: { blog: Blog }) {
  return (
    <a
      href={`/blog/${blog.slug}`}
      className="border rounded-xl overflow-hidden p-4 hover:shadow"
    >
      <h2 className="text-xl font-semibold">{blog.title}</h2>
      <p className="text-sm text-muted-foreground">{blog.summary}</p>
      <div className="text-xs mt-2">
        {blog.publishedAt} • {blog.readingTime} min read
        <div className="mt-2 flex flex-wrap gap-1">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function List({ blogs }: { blogs: Blog[] }) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.summary.toLowerCase().includes(search.toLowerCase());

    const matchesTag = selectedTag ? blog.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [...new Set(blogs.flatMap((b) => b.tags))];

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Search blogs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 rounded-md border bg-background"
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-full text-sm ${
            !selectedTag ? "bg-primary text-white" : "bg-muted"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            type="button"
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTag === tag ? "bg-primary text-white" : "bg-muted"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="text-center text-neutral-500 dark:text-neutral-400 py-12">
          No blogs found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBlogs.map((blog) => (
            <Card key={blog.slug} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

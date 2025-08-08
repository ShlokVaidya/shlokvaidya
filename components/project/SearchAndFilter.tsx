"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { ProjectFrontmatter } from "@/lib/mdx";
import Card from "./Card";
import { Button } from "@/components/ui/button";

type Props = {
  projects: ProjectFrontmatter[];
};

export default function SearchAndFilter({ projects }: Props) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const fuse = useMemo(
    () =>
      new Fuse(projects, {
        keys: ["title", "summary"],
        threshold: 0.3,
      }),
    [projects]
  );

  const allTags = Array.from(new Set(projects.flatMap((b) => b.tags)));

  const filteredProjects = useMemo(() => {
    let result = query ? fuse.search(query).map((r) => r.item) : projects;

    if (selectedTag) {
      result = result.filter((project) => project.tags.includes(selectedTag));
    }

    return result;
  }, [fuse, query, selectedTag, projects]);

  return (
    <div className="space-y-6">
      <input
        name="search"
        id="search"
        type="text"
        placeholder="Search project posts..."
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
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => <Card key={project.slug} project={project} />)
        ) : (
          <p className="text-muted-foreground">No project posts found.</p>
        )}
      </div>
    </div>
  );
}



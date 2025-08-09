"use client";

import { useState } from "react";

type Project = {
  title: string;
  summary: string;
  slug: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  coverImage: string;
};

function Card({ project }: { project: Project }) {
  return (
    <a
      href={`/project/${project.slug}`}
      className="border rounded-xl overflow-hidden p-4 hover:shadow"
    >
      <h2 className="text-xl font-semibold">{project.title}</h2>
      <p className="text-sm text-muted-foreground">{project.summary}</p>
      <div className="text-xs mt-2">
        {project.publishedAt} • {project.readingTime} min read
        <div className="mt-2 flex flex-wrap gap-1">
          {project.tags.map((tag) => (
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

export default function List({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.summary.toLowerCase().includes(search.toLowerCase());

    const matchesTag = selectedTag ? project.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [...new Set(projects.flatMap((b) => b.tags))];

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Search projects..."
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

      {filteredProjects.length === 0 ? (
        <div className="text-center text-neutral-500 dark:text-neutral-400 py-12">
          No projects found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

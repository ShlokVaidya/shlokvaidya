import React from "react";
import Image from "next/image";

type Blog = {
  title: string;
  summary: string;
  slug: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  coverImage: string;
};

type Project = {
  title: string;
  summary: string;
  slug: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  coverImage: string;
};

interface RecentSectionProps {
  blogs: Blog[];
  projects: Project[];
}

const RecentItem = ({
  item,
  type,
}: {
  item: Blog | Project;
  type: "blog" | "project";
}) => {
  const href = type === "blog" ? `/blog/${item.slug}` : `/projects/${item.slug}`;
  return (
    <a
      href={href}
      className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow hover:shadow-lg transition-shadow flex flex-col overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary"
      tabIndex={0}
    >
      <div className="relative w-full" style={{ aspectRatio: "3/2", minHeight: 0 }}>
        <Image
          src={item.coverImage}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 400px"
          priority={false}
        />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-semibold text-lg text-black dark:text-white mb-1 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-2 line-clamp-3">
          {item.summary}
        </p>
      </div>
    </a>
  );
};

export default function Recent({ blogs, projects }: RecentSectionProps) {
  return (
    <section className="w-full px-6 py-20 bg-background text-foreground">
      <header className="text-center max-w-4xl mx-auto mb-16">
        <h2
          id="about-features"
          className="text-4xl lg:text-6xl font-semibold tracking-tight text-black dark:text-white"
        >
          Recent Blogs &amp; Projects
        </h2>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          Explore my latest blogs and projects, showcasing my journey and skills in web development, design, and more.
        </p>
      </header>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Recent Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <RecentItem key={blog.slug} item={blog} type="blog" />
            ))}
          </div>
        </div>
        <hr className="my-12 border-neutral-200 dark:border-neutral-800" />
        <div>
          <h2 className="text-3xl font-bold mb-6">Recent Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <RecentItem key={project.slug} item={project} type="project" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



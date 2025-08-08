import { ProjectFrontmatter } from "@/lib/mdx";
import Image from "next/image";
import Link from "next/link";

export default function Card({ project }: { project: ProjectFrontmatter }) {
  return (
    <Link href={`/project/${project.slug}`} className="group block rounded-xl overflow-hidden shadow hover:shadow-xl transition">
      <div className="relative w-full h-52">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4 bg-background">
        <h2 className="text-xl font-semibold">{project.title}</h2>
        <p className="text-muted-foreground text-sm">{project.summary}</p>
        <div className="mt-2 text-xs text-muted-foreground">
          {project.publishedAt} • {project.readingTime} min read
        </div>
      </div>
    </Link>
  );
}

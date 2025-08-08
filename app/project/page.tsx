import { getAllProjects } from "@/lib/project";
import List from "@/components/project/List";

export const metadata = {
  title: "Projects",
  description:
    "Explore my projects showcasing innovative solutions and creative designs.",
};

export default async function ProjectPage() {
  const projects = getAllProjects();
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">Projects</h1>
      <List projects={projects} />
    </div>
  );
}

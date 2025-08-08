import Recent from "@/components/Recent";
import Features from "@/components/Features";
import Spotlight from "@/components/Spotlight";
import { getRecentBlogs } from "@/lib/getContent";
import { getAllBlogs } from "@/lib/blog";
import { getRecentProjects } from "@/lib/getContent";
import { getAllProjects } from "@/lib/project";

export default function Home() {
  const blogs = getAllBlogs() || getRecentBlogs(3);
  const projects = getAllProjects() || getRecentProjects(3);

  return (
    <>
      <Spotlight />
      <Features />
      <hr className="my-5 border-neutral-200 dark:border-neutral-800" />
      <Recent blogs={blogs} projects={projects} />
    </>
  );
}
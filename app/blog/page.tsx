import { getAllBlogs } from "@/lib/blog";
import List from "@/components/blog/List";

export const metadata = {
  title: "Blog",
  description:
    "Read insightful blogs on web development, design, and coding tips by Shlok Vaidya.",
};

export default async function BlogPage() {
  const blogs = getAllBlogs();
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">Blogs</h1>
      <List blogs={blogs} />
    </div>
  );
}

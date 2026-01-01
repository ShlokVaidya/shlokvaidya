import { Metadata } from "next";
import BlogIndex from "@/components/BlogIndex";
import FeaturedPost from "@/components/FeaturedPost";
import { getAllPostsWithImages } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog | Shlok Vaidya",
  description: "Articles and insights on web development, open-source, and technology.",
  openGraph: {
    title: "Blog | Shlok Vaidya",
    description: "Articles and insights on web development, open-source, and technology.",
    url: "https://shlokvaidya.com/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getAllPostsWithImages();
  const [featuredPost, ...otherPosts] = posts;

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute left-8 top-12 h-64 w-64 rounded-full bg-primary/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-12 top-24 h-80 w-80 rounded-full bg-primary/6 blur-3xl"
        aria-hidden
      />

      <div className="relative mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Blog
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Exploring the intersection of code, creativity, and innovation.
        </p>
        <div className="mx-auto mt-6 text-sm text-muted-foreground/80">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'}
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="relative mb-16">
          <FeaturedPost post={featuredPost} />
        </div>
      )}

      {/* All Posts Grid */}
      <div className="relative">
        <h2 className="mb-8 text-2xl font-semibold text-foreground">
          All Articles
        </h2>
        <BlogIndex posts={otherPosts} />
      </div>
    </section>
  );
}

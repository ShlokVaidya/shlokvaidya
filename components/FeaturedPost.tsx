"use client";

import { CalendarDays, Clock, ArrowRight, Sparkles, Eye, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogIndexPost } from "./BlogIndex";
import { useEffect, useState } from "react";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export default function FeaturedPost({ post }: { post: BlogIndexPost }) {
  const [views, setViews] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Animated counter for views
  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch(`/api/views?slug=${post.slug}`);
        const data = await res.json();
        animateValue(0, data.views || 0, 1000);
      } catch {
        setViews(0);
      }
    };
    fetchViews();
  }, [post.slug]);

  const animateValue = (start: number, end: number, duration: number) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        setViews(end);
        clearInterval(timer);
      } else {
        setViews(Math.floor(current));
      }
    }, 16);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic ambient glow that follows mouse */}
      <div 
        className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: isHovered 
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary-rgb, 147, 51, 234), 0.15), transparent 40%)`
            : undefined
        }}
      />
      
      <Link
        href={`/blog/${post.slug}`}
        className="relative block overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-card via-card to-card/80 shadow-xl shadow-black/5 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
      >
        <div className="grid gap-0 lg:grid-cols-2">
          {/* Image Section */}
          <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
            {post.banner ? (
              <Image
                src={post.banner}
                alt={post.title}
                width={800}
                height={600}
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                priority
              />
            ) : (
              <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-primary/30 via-primary/10 to-background">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1),transparent_50%)]" />
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-primary to-primary/50 bg-clip-text text-8xl font-black text-transparent opacity-30">
                      {post.title.charAt(0)}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
            
            {/* Featured Badge */}
            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/90 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
              <span className="text-xs font-semibold tracking-wide text-primary-foreground">
                FEATURED
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center p-8 lg:p-12">
            {/* Metadata */}
            <div className="mb-4 flex flex-wrap items-center gap-4 text-xs font-medium tracking-wide text-muted-foreground">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary/60" />
                {formatDate(post.publishedAt)}
              </span>
              {post.readingTime && (
                <>
                  <span className="text-border">•</span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary/60" />
                    {post.readingTime}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary lg:text-4xl">
              {post.title}
            </h2>

            {/* Description */}
            {post.description && (
              <p className="mb-6 text-base leading-relaxed text-muted-foreground line-clamp-3 lg:text-lg">
                {post.description}
              </p>
            )}

            {/* Interactive Stats */}
            <div className="mb-8 grid grid-cols-3 gap-4">
              <div className="group/stat relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-br from-background/80 to-background/40 p-4 transition-all hover:border-primary/30 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover/stat:opacity-100" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Eye className="h-4 w-4" />
                    <span className="text-xs font-medium">Views</span>
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {views.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="group/stat relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-br from-background/80 to-background/40 p-4 transition-all hover:border-primary/30 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover/stat:opacity-100" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs font-medium">Trending</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    #1
                  </div>
                </div>
              </div>

              <div className="group/stat relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-br from-background/80 to-background/40 p-4 transition-all hover:border-primary/30 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover/stat:opacity-100" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs font-medium">Read</span>
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {post.readingTime?.split(' ')[0] || '5'}
                    <span className="text-sm text-muted-foreground ml-1">min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags if available */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/20 transition-all hover:bg-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
              <span>Continue Reading</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>

            {/* Decorative animated line */}
            <div className="relative mt-8 h-1 w-16 overflow-hidden rounded-full bg-muted transition-all duration-300 group-hover:w-24">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary animate-shimmer" 
                style={{
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s linear infinite'
                }}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

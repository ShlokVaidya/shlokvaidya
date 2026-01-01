"use client";

import { Eye, FileText, TrendingUp } from "lucide-react";

interface BlogStatsProps {
  totalPosts: number;
  totalReadingTime?: string;
  totalViews?: number;
}

export default function BlogStats({ totalPosts, totalReadingTime, totalViews }: BlogStatsProps) {
  const avgViews = totalPosts > 0 ? Math.round((totalViews ?? 0) / totalPosts) : 0;
  
  return (
    <div className="relative mb-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Total Articles */}
          <div className="group relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-4 ring-1 ring-primary/20">
                  <FileText className="h-7 w-7 text-primary" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {totalPosts}
                  </p>
                  <p className="mt-1 text-sm font-medium text-muted-foreground tracking-wide">
                    ARTICLES
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Total Views */}
          <div className="group relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-4 ring-1 ring-primary/20">
                  <Eye className="h-7 w-7 text-primary" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {(totalViews ?? 0).toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm font-medium text-muted-foreground tracking-wide">
                    TOTAL VIEWS
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Average Views */}
          <div className="group relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-4 ring-1 ring-primary/20">
                  <TrendingUp className="h-7 w-7 text-primary" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {avgViews.toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm font-medium text-muted-foreground tracking-wide">
                    AVG VIEWS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

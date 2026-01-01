"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { STATUS_MAP } from "@/lib/status";
import { LogOut, FileText, Eye, Clock, Database, TrendingUp, Calendar } from "lucide-react";

type Step = "panel";

interface Stats {
  blog: {
    totalPosts: number;
    totalViews: number;
    totalReadingMinutes: number;
    topPosts: { slug: string; title: string; views: number }[];
    latestPosts: { slug: string; title: string; publishedAt: string }[];
  };
  database: {
    totalSessions: number;
    activeSessions: number;
  };
  system: {
    timestamp: string;
  };
}

export default function AdminStatusPage() {
  const router = useRouter();
  const [state, setState] = useState<keyof typeof STATUS_MAP>("building");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  async function updateStatus() {
    setLoading(true);
    setInfo("");

    const res = await fetch("/api/status/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state, message }),
    });

    setLoading(false);

    if (res.ok) {
      setInfo("Status updated successfully");
      setMessage("");
    } else {
      setInfo("Update failed");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/control/login");
    router.refresh();
  }

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setStatsLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-background/80">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Status Control</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Update your availability status
            </p>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-destructive/60 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Status Update Panel */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-border/50 bg-card/80 shadow-xl shadow-primary/10 backdrop-blur p-8 space-y-6">
              <h2 className="text-lg font-semibold text-foreground">Update Status</h2>
              
              <select
                aria-label="select"
                value={state}
                onChange={(e) =>
                  setState(e.target.value as keyof typeof STATUS_MAP)
                }
                className="w-full rounded-lg border border-border/70 bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary/60 focus:ring-1 focus:ring-primary/20"
              >
                {Object.entries(STATUS_MAP).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Optional message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg border border-border/70 bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary/60 focus:ring-1 focus:ring-primary/20"
              />

              <button
                onClick={updateStatus}
                disabled={loading}
                className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 transition hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Status"}
              </button>

              {info && (
                <p className="text-sm text-center text-muted-foreground">{info}</p>
              )}
            </div>
          </div>

          {/* Statistics Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {statsLoading ? (
              <div className="rounded-xl border border-border/50 bg-card/80 shadow-xl shadow-primary/10 backdrop-blur p-8">
                <p className="text-muted-foreground text-center">Loading statistics...</p>
              </div>
            ) : stats ? (
              <>
                {/* Overview Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-6 transition-all hover:border-primary/30 hover:shadow-lg">
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
                    <div className="relative flex items-center gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stats.blog.totalPosts}</p>
                        <p className="text-sm text-muted-foreground">Total Posts</p>
                      </div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-6 transition-all hover:border-primary/30 hover:shadow-lg">
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
                    <div className="relative flex items-center gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Eye className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stats.blog.totalViews.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Total Views</p>
                      </div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-6 transition-all hover:border-primary/30 hover:shadow-lg">
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
                    <div className="relative flex items-center gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stats.blog.totalReadingMinutes}</p>
                        <p className="text-sm text-muted-foreground">Min Reading</p>
                      </div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-6 transition-all hover:border-primary/30 hover:shadow-lg">
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
                    <div className="relative flex items-center gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Database className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stats.database.activeSessions}</p>
                        <p className="text-sm text-muted-foreground">Active Sessions</p>
                      </div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-6 transition-all hover:border-primary/30 hover:shadow-lg sm:col-span-2 lg:col-span-2">
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
                    <div className="relative flex items-center gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {stats.blog.totalPosts > 0 
                            ? Math.round(stats.blog.totalViews / stats.blog.totalPosts) 
                            : 0}
                        </p>
                        <p className="text-sm text-muted-foreground">Avg Views per Post</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Posts */}
                <div className="rounded-xl border border-border/50 bg-card/80 shadow-xl shadow-primary/10 backdrop-blur p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Top Posts by Views
                  </h3>
                  <div className="space-y-3">
                    {stats.blog.topPosts.map((post, index) => (
                      <div
                        key={post.slug}
                        className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {index + 1}
                          </span>
                          <span className="text-sm font-medium text-foreground truncate max-w-xs">
                            {post.title}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-muted-foreground flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {post.views.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Latest Posts */}
                <div className="rounded-xl border border-border/50 bg-card/80 shadow-xl shadow-primary/10 backdrop-blur p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Latest Posts
                  </h3>
                  <div className="space-y-3">
                    {stats.blog.latestPosts.map((post) => (
                      <div
                        key={post.slug}
                        className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition"
                      >
                        <span className="text-sm font-medium text-foreground truncate max-w-xs">
                          {post.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-border/50 bg-card/80 shadow-xl shadow-primary/10 backdrop-blur p-8">
                <p className="text-muted-foreground text-center">Failed to load statistics</p>
              </div>
            )}
          </div>   {info && (
                <p className="text-sm text-center text-muted-foreground">{info}</p>
              )}
        </div>
      </div>
    </main>
  );
}

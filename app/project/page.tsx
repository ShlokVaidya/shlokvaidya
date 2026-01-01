"use client";

import { useEffect, useState, useMemo } from "react";
import { Github, Star, GitFork, ExternalLink, Search, TrendingUp } from "lucide-react";
import Link from "next/link";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

export default function ProjectsPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("/api/github?limit=50");
        if (!res.ok) throw new Error("Failed to fetch repositories");
        const data = await res.json();
        const sortedRepos = (data.repos || []).sort(
          (a: Repo, b: Repo) => b.stargazers_count - a.stargazers_count
        );
        setRepos(sortedRepos);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const languages = useMemo(() => {
    const langs = new Set(repos.map((r) => r.language).filter(Boolean));
    return Array.from(langs).sort();
  }, [repos]);

  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description &&
          repo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        repo.topics.some((topic) =>
          topic.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesLanguage = !selectedLanguage || repo.language === selectedLanguage;

      return matchesSearch && matchesLanguage;
    });
  }, [repos, searchTerm, selectedLanguage]);

  const featuredRepos = useMemo(() => {
    return filteredRepos
      .filter((repo) => repo.stargazers_count >= 5 || repo.homepage)
      .slice(0, 3);
  }, [filteredRepos]);

  const otherRepos = useMemo(() => {
    return filteredRepos.filter(
      (repo) => !featuredRepos.find((f) => f.id === repo.id)
    );
  }, [filteredRepos, featuredRepos]);

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: "from-yellow-400 to-yellow-600",
      TypeScript: "from-blue-400 to-blue-600",
      Python: "from-blue-500 to-blue-700",
      Java: "from-orange-400 to-orange-600",
      Go: "from-cyan-400 to-cyan-600",
      Rust: "from-orange-500 to-orange-700",
      Ruby: "from-red-400 to-red-600",
      PHP: "from-indigo-400 to-indigo-600",
      C: "from-gray-500 to-gray-700",
      "C++": "from-pink-400 to-pink-600",
      CSS: "from-purple-400 to-purple-600",
      HTML: "from-orange-300 to-orange-500",
    };
    return colors[language] || "from-gray-400 to-gray-600";
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Animated gradient orbs */}
      <div
        className="pointer-events-none absolute left-8 top-12 h-64 w-64 rounded-full bg-primary/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-12 top-24 h-80 w-80 rounded-full bg-primary/6 blur-3xl"
        aria-hidden
      />

      {/* Header */}
      <div className="relative mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          My Projects
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          A collection of my open-source projects, experiments, and side projects.
          Explore what I&apos;ve been building.
        </p>
        <Link
          href="https://github.com/ShlokVaidya"
          target="_blank"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all hover:-translate-y-1 hover:shadow-lg shadow-primary/20"
        >
          <Github className="w-5 h-5" />
          View on GitHub
        </Link>
      </div>

      {/* Search & Filter */}
      {!loading && !error && repos.length > 0 && (
        <div className="relative mb-12 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search projects by name, description, or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          {/* Language Filter */}
          {languages.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedLanguage(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedLanguage === null
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                All Languages
              </button>
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedLanguage === lang
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="relative text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading projects...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="relative text-center py-20">
          <p className="text-red-500 font-semibold">{error}</p>
          <p className="text-muted-foreground mt-2">Failed to fetch your GitHub projects</p>
        </div>
      )}

      {/* Featured Projects */}
      {!loading && !error && featuredRepos.length > 0 && (
        <div className="relative mb-16">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">
              Featured Projects
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredRepos.map((repo) => (
              <div
                key={repo.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getLanguageColor(repo.language)} flex items-center justify-center`}>
                        <Github className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {repo.name}
                        </h3>
                      </div>
                    </div>
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {repo.description || "No description available"}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm mb-4 pb-4 border-b border-border">
                    {repo.language && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="font-semibold text-foreground">{repo.language}</span>
                      </div>
                    )}
                    {repo.stargazers_count > 0 && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Star className="w-4 h-4" />
                        <span className="font-semibold">{repo.stargazers_count}</span>
                      </div>
                    )}
                  </div>

                  {/* Topics */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.topics.slice(0, 2).map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-2">
                    {repo.homepage && (
                      <Link
                        href={repo.homepage}
                        target="_blank"
                        className="flex-1 text-center px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Live Demo
                      </Link>
                    )}
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      className="flex-1 text-center px-3 py-2 text-sm font-medium border border-primary text-primary bg-transparent rounded-lg hover:bg-primary/10 transition-colors"
                    >
                      View Code
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Projects Grid */}
      {!loading && !error && (
        <div className="relative">
          {otherRepos.length > 0 && (
            <h2 className="mb-6 text-2xl font-semibold text-foreground">
              All Projects
            </h2>
          )}
          {otherRepos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="group relative rounded-lg border border-border bg-card p-5 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors pr-2 flex-1">
                      {repo.name}
                    </h3>
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>

                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {repo.description || "No description available"}
                  </p>

                  {/* Topics */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {repo.topics.slice(0, 2).map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground pt-3 border-t border-border">
                    {repo.language && (
                      <div className="flex items-center gap-1">
                        <span
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${getLanguageColor(
                            repo.language
                          )}`}
                        ></span>
                        <span>{repo.language}</span>
                      </div>
                    )}
                    {repo.stargazers_count > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                    )}
                    {repo.forks_count > 0 && (
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        <span>{repo.forks_count}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTerm || selectedLanguage
                  ? "No projects match your filters"
                  : "No projects found"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* No Projects */}
      {!loading && !error && repos.length === 0 && (
        <div className="relative text-center py-20">
          <p className="text-muted-foreground">No projects found</p>
        </div>
      )}
    </section>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, Rss } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email}),
    });

    if (res.ok) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  };

  return (
    <footer className="relative z-10 bg-background text-foreground pt-20 pb-10 px-4 transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-16 text-background"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,0V46.29c47.41,22,99.22,29.1,148.57,17.72
            C279,38.92,385,4.18,493.81,3.6c111-.6,215.3,30.61,
            324.55,42.79c59.42,6.51,117.84,3.58,176.64-8.74V0Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 z-10">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            <Link href="/">Shlok Vaidya</Link>
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs">
            Developer, Designer & Dreamer crafting experiences on the web.
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              href="https://github.com/ShlokVaidya"
              target="_blank"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 hover:text-primary transition-colors" />
            </Link>
            <Link
              href="https://x.com/shlok0275"
              target="_blank"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 hover:text-primary transition-colors" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/shlok-vaidya-0b5a5b275/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 hover:text-primary transition-colors" />
            </Link>
            <Link href="/rss.xml" target="_blank" aria-label="RSS">
              <Rss className="w-5 h-5 hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/blog"
                className="hover:text-primary transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/project"
                className="hover:text-primary transition-colors"
              >
                Project
              </Link>
            </li>
            <li>
              <Link
                href="\#contact"
                className="hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="\#about"
                className="hover:text-primary transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">
            Newsletter
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Subscribe to get updates on my latest blogs & projects.
          </p>
          <form
            onSubmit={subscribe}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 text-sm rounded-md bg-muted text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-md bg-primary dark:text-black text-white hover:bg-primary/90 transition"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>

            {status === "success" && (
              <p className="text-green-600 text-sm mt-2 sm:mt-0 sm:ml-2">
                Thanks for subscribing!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-sm mt-2 sm:mt-0 sm:ml-2">
                Something went wrong.
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="mt-16 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Shlok Vaidya. All rights reserved.
      </div>
    </footer>
  );
}

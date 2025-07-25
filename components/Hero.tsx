"use client";
import React from "react";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight-new";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center h-[42rem] md:h-[44rem] w-full overflow-hidden rounded-md bg-white dark:bg-black/[0.96] bg-grid-black/[0.02] dark:bg-grid-white/[0.02] transition-colors duration-300 antialiased">
      <Spotlight />

      <div className="relative z-10 w-full max-w-7xl px-4 pt-20 md:pt-0 text-center flex flex-col items-center">
        <h1 className="text-balance text-4xl md:text-7xl font-bold leading-tight bg-gradient-to-b from-black to-neutral-600 dark:from-neutral-50 dark:to-neutral-400 text-transparent bg-clip-text transition-colors duration-300">
          Hey! I&apos;m Shlok
          <br />
          Welcome to My Corner of the Web.
        </h1>

        <p className="mt-6 md:mt-8 max-w-xl text-base text-neutral-700 dark:text-neutral-300 transition-colors duration-300">
          A subtle yet effective spotlight effect to make your visit more engaging and unique.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center w-40 h-10 rounded-xl text-sm font-medium bg-black text-white dark:border-white border border-transparent hover:opacity-90 transition"
          >
            Blog
          </Link>
          <Link
            href="#about"
            className="inline-flex items-center justify-center w-40 h-10 rounded-xl text-sm font-medium bg-white text-black border border-black hover:opacity-90 transition"
          >
            About Me
          </Link>
        </div>
      </div>
    </section>
  );
}

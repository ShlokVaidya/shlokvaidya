import React from "react";
import Image from "next/image";
import { SpotlightUI } from "@/components/ui/spotlight-new";
import HeroStatus from "@/components/ui/status";
import Link from "next/link";

const ArrowIcon = () => (
  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full overflow-hidden bg-background antialiased items-center justify-center transition-colors duration-300">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Light mode background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Dark mode background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]"
        style={{ backgroundSize: "60px 60px" }}
      />

      {/* Spotlight Effect */}
      <SpotlightUI />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 text-center animate-fade-in">
        {/* Profile Image */}
        <div className="mb-8 flex justify-center group">
          <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-primary/20 shadow-2xl shadow-primary/10 transition-all duration-500 group-hover:scale-110 group-hover:border-primary/40 group-hover:shadow-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Image
              src="/profile.jpg"
              alt="Shlok Vaidya"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-foreground md:text-7xl transition-colors duration-300 leading-tight">
          Hey, I&apos;m{" "}
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Shlok
          </span>
          !{" "}
          <br />
          <span className="text-4xl md:text-6xl font-bold text-muted-foreground">
            Welcome to my Corner of the Web.
          </span>
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-6 max-w-2xl text-lg font-normal text-muted-foreground transition-colors duration-300 leading-relaxed">
          I'm passionate about crafting{" "}
          <span className="text-foreground font-semibold">beautiful</span> and{" "}
          <span className="text-foreground font-semibold">functional</span> experiences on
          the web. Explore my projects and see what I’ve been working on.
        </p>

        <HeroStatus />

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            href="/blog"
            className="group px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 flex items-center gap-2"
          >
            <span>Read my Blog</span>
            <ArrowIcon />
          </Link>
          <Link
            href="/project"
            className="group px-8 py-3 rounded-xl border-2 border-primary text-primary font-semibold bg-transparent hover:bg-primary/10 transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
          >
            <span>View Projects</span>
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}

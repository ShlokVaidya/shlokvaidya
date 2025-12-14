import React from "react";
import Image from "next/image";
import { SpotlightUI } from "@/components/ui/spotlight-new";
import HeroStatus from "@/components/ui/status";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full overflow-hidden rounded-md bg-background antialiased items-center justify-center transition-colors duration-300">
      {/* Light mode background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Dark mode background grid */}
      <div
        className="absolute inset-0 pointer-events-none dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"
        style={{ backgroundSize: "40px 40px" }}
      />

      {/* Spotlight Effect */}
      <SpotlightUI />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 text-center">
        {/* Profile Image */}
        <div className="mb-6 flex justify-center">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-border shadow-lg transition-colors duration-300">
            <Image
              src="/profile.jpg"
              alt="Shlok Vaidya"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-foreground md:text-7xl transition-colors duration-300">
          Hey, I&apos;m Shlok! <br /> Welcome to my Corner of the Web.
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-4 max-w-lg text-base font-normal text-muted-foreground transition-colors duration-300">
          I’m passionate about crafting beautiful and functional experiences on
          the web. Explore my projects and see what I’ve been working on.
        </p>

        <HeroStatus />

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Link
            href="/blog"
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            Blogs
          </Link>
          <Link
            href="/project"
            className="px-6 py-2 rounded-lg border-2 border-primary text-primary font-semibold bg-transparent hover:bg-primary/10 transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            Projects
          </Link>
        </div>
      </div>
    </section>
  );
}

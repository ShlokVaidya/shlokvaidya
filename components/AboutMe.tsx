"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutMe() {
  return (
    <section className="w-full px-6 py-24 bg-neutral-950 text-white transition-colors duration-300" id="about">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text Section with animation */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            I&apos;m <strong>Shlok</strong>, a passionate developer who built this portfolio from scratch using modern tools like <span className="text-white">Next.js</span>, <span className="text-white">Tailwind CSS</span>, and <span className="text-white">MDX</span> — with a little help from ChatGPT.
            <br /><br />
            I love turning ideas into clean, performant, and elegant websites. Whether it&apos;s creating fast-loading UIs, integrating databases, or setting up newsletter systems — I enjoy every step of the process.
          </p>
        </motion.div>

        {/* Image Section with animation */}
        <motion.div
          className="flex flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="w-64 h-64 relative rounded-full overflow-hidden shadow-2xl border-2 border-white">
            <Image
              src="/profile.jpg"
              alt="Shlok's Profile"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactCard() {
  return (
    <section className="relative w-full px-6 py-24 bg-white dark:bg-black overflow-hidden" id="contact">
      {/* Decorative Blob SVG */}
      <div className="absolute top-0 -left-20 w-[600px] h-[600px] opacity-10 dark:opacity-5 pointer-events-none z-0">
        <svg 
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full fill-black dark:fill-white"
        >
          <path d="M40.5,-65.1C53.1,-58.8,64.4,-47.1,69.2,-33.7C74.1,-20.3,72.5,-5.2,67.8,8.4C63,22.1,55.1,34.2,45.2,43.9C35.2,53.7,23.2,61.1,8.5,67.3C-6.1,73.4,-22.4,78.3,-35.6,72.6C-48.7,67,-58.8,50.7,-63.9,34C-68.9,17.3,-68.8,0.1,-64.7,-15.7C-60.6,-31.5,-52.5,-45.8,-41.1,-52.8C-29.7,-59.7,-14.9,-59.4,-0.6,-58.6C13.8,-57.7,27.6,-56.5,40.5,-65.1Z" transform="translate(100 100)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-5xl mx-auto p-8 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border dark:border-neutral-800 shadow-md"
      >
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Left: Text */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
              Let’s Work Together
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-6 max-w-md mx-auto md:mx-0">
              Got an idea, project, or just want to say hi? I’m always open to
              connecting!
            </p>
            <div className="flex justify-center md:justify-start">
              <a
                href="mailto:shlokvaidya.in@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full 
                bg-black text-white dark:bg-white dark:text-black 
                hover:scale-105 transition-transform duration-300 text-sm font-medium"
              >
                <Mail className="w-4 h-4" />
                Let’s Get in Touch
              </a>
            </div>
          </div>

          {/* Right: Image or Illustration */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/contact.png" // 👉 Replace with your own SVG or PNG in /public
              alt="Contact Graphic"
              width={300}
              height={300}
              className="dark:invert"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

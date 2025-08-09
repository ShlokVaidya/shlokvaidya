"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { House, Library, FolderCode } from "lucide-react";

export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      "aria-label": "Home",
      icon: <House className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Blog",
      link: "/blog",
      "aria-label": "Blog",
      icon: (
        <Library className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Project",
      link: "/project",
      "aria-label": "Project",
      icon: (
        <FolderCode className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}


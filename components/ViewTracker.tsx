"use client";

import { useEffect } from "react";

export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    // Increment view when component mounts
    const incrementView = async () => {
      try {
        await fetch("/api/views", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });
      } catch (error) {
        console.error("Failed to increment view:", error);
      }
    };

    incrementView();
  }, [slug]);

  return null;
}

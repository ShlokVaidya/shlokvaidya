"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

export function ViewCounter({ slug, initialViews }: { slug: string; initialViews: number }) {
  const [views, setViews] = useState(initialViews);
  const [isIncrementing, setIsIncrementing] = useState(true);

  useEffect(() => {
    // Increment the view
    const incrementView = async () => {
      try {
        const response = await fetch("/api/views", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });

        if (response.ok) {
          const data = await response.json();
          setViews(data.views);
        }
      } catch (error) {
        console.error("Failed to increment view:", error);
      } finally {
        setIsIncrementing(false);
      }
    };

    incrementView();
  }, [slug]);

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-secondary/70 px-3 py-1">
      <Eye className="h-4 w-4" />
      <span>{views} {views === 1 ? "view" : "views"}</span>
    </span>
  );
}

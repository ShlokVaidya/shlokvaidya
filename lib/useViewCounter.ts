"use client";

import { useEffect, useState } from "react";

export function useViewCounter(slug: string) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    async function fetchAndUpdateViews() {
      await fetch(`/api/views/${slug}`, { method: "POST" });
      const res = await fetch(`/api/views/${slug}`);
      const data = await res.json();
      setViews(data.count);
    }
    fetchAndUpdateViews();
  }, [slug]);

  return views;
}

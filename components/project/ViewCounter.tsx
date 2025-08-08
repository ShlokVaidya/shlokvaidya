"use client";

import { useEffect, useState } from "react";

export function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    async function fetchViews() {
      await fetch(`/api/views/${slug}`, { method: "POST" });
      const res = await fetch(`/api/views/${slug}`);
      const data = await res.json();
      setViews(data.count);
    }

    fetchViews();
  }, [slug]);

  return <span>{views ?? "–"}</span>;
}

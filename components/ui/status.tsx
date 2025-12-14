"use client";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function HeroStatus() {
  const { data: status } = useSWR("/api/status/update", fetcher, {
    refreshInterval: 3600000,
  });

  if (!status) return null;

  return (
    <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800">
      <span
        className={`w-3 h-3 rounded-full ${
          status.state === "building"
            ? "bg-yellow-500"
            : status.state === "learning"
            ? "bg-blue-500"
            : status.state === "writing"
            ? "bg-purple-500"
            : status.state === "exploring"
            ? "bg-teal-500"
            : status.state === "focus"
            ? "bg-indigo-500"
            : status.state === "online"
            ? "bg-green-500"
            : status.state === "offline"
            ? "bg-red-500"
            : status.state === "unavailable"
            ? "bg-gray-400"
            : "bg-gray-300"
        }`}
      ></span>
      <span className="text-gray-700 dark:text-gray-200">
        {status.state.charAt(0).toUpperCase() + status.state.slice(1)}
        {status.message ? ` — ${status.message}` : ""}
      </span>
    </div>
  );
}

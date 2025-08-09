"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) setStatus("success");
    else setStatus("error");
  };

  return (
    <section className="max-w-2xl mx-auto py-20 px-4" id="contact">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold mb-2 text-primary">Contact Me</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Have a question, project, or just want to say hi? Fill out the form below and I&apos;ll get back to you soon!
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 space-y-6 border border-neutral-200 dark:border-neutral-800"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-1 text-neutral-700 dark:text-neutral-200">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-1 text-neutral-700 dark:text-neutral-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold mb-1 text-neutral-700 dark:text-neutral-200">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-primary dark:text-black text-white px-6 py-3 rounded-lg font-semibold text-lg shadow hover:bg-primary/90 transition disabled:opacity-60"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
        {status === "success" && (
          <p className="text-green-600 text-center font-medium">Message sent! I&apos;ll get back to you soon.</p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-center font-medium">Something went wrong. Please try again.</p>
        )}
      </form>
    </section>
  );
}
"use client";
import { useState } from "react";
import { Mail, Send, CheckCircle, XCircle } from "lucide-react";

const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

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
    if (res.ok) {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  return (
    <section className="max-w-3xl mx-auto py-24 px-4" id="contact">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Let's Connect
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Have a question, project idea, or just want to say hi? I'd love to hear from you!
        </p>
      </div>
      
      <form
        onSubmit={handleSubmit}
        className="relative bg-card rounded-2xl shadow-2xl shadow-black/5 p-8 md:p-10 space-y-6 border border-border/50 backdrop-blur-sm overflow-hidden"
      >
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-semibold text-foreground">
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
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-foreground">
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
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-semibold text-foreground">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            placeholder="Tell me about your project or idea..."
            value={form.message}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
          />
        </div>
        
        <button
          type="submit"
          disabled={status === "loading"}
          className="group w-full bg-primary text-primary-foreground px-6 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <LoadingSpinner />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
        
        {status === "success" && (
          <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 dark:text-green-400">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <p className="font-medium">Message sent! I'll get back to you soon.</p>
          </div>
        )}
        
        {status === "error" && (
          <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 dark:text-red-400">
            <XCircle className="h-5 w-5 flex-shrink-0" />
            <p className="font-medium">Something went wrong. Please try again.</p>
          </div>
        )}
      </form>
    </section>
  );
}

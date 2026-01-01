import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="space-y-20">
      <Hero />
      <Features />
      <Contact />
    </div>
  );
}
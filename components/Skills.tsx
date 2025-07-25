"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Code, Server, PenTool, Rocket } from "lucide-react"; // Use any icons

type SkillCardProps = {
  title: string;
  icon: ReactNode;
  description: string;
};

const skills: SkillCardProps[] = [
  {
    title: "Frontend",
    icon: <Code className="w-6 h-6" />,
    description: "React, Next.js, Tailwind CSS, ShadCN, Framer Motion",
  },
  {
    title: "Backend",
    icon: <Server className="w-6 h-6" />,
    description: "Node.js, Express, PostgreSQL, Neon, REST APIs",
  },
  {
    title: "Design",
    icon: <PenTool className="w-6 h-6" />,
    description: "Figma, Responsive UI, Theme design, Animations",
  },
  {
    title: "Deployment",
    icon: <Rocket className="w-6 h-6" />,
    description: "Vercel, Railway, GitHub CI/CD, Edge Functions",
  },
];

export default function Skills() {
  return (
    <section className="w-full px-6 py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Skills</h2>
        <p className="text-neutral-400 mb-12">
          Tools, technologies, and frameworks I enjoy working with.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-left shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="mb-4 text-white">{skill.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
              <p className="text-sm text-neutral-400">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

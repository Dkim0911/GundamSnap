"use client";

import { motion } from "framer-motion";
import { Cpu, Globe, Database, Palette, Bot, Github } from "lucide-react";

const technologies = [
  { id: 1, name: "Next.js 14", icon: <Globe className="w-6 h-6" />, desc: "App Router & Server Actions", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { id: 2, name: "Python FastAPI", icon: <Database className="w-6 h-6" />, desc: "High-performance Backend", color: "bg-green-500/10 text-green-400 border-green-500/20" },
  { id: 3, name: "OpenAI GPT-3.5", icon: <Bot className="w-6 h-6" />, desc: "Shippo's Logic Engine", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  { id: 4, name: "Tailwind CSS", icon: <Palette className="w-6 h-6" />, desc: "Responsive Styling", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
  { id: 5, name: "Framer Motion", icon: <Cpu className="w-6 h-6" />, desc: "Complex Animations", color: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
];

export default function TechStack() {
  return (
    <section className="bg-neutral-900 py-24 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-4">Under the Hood</h2>
            <p className="text-neutral-400 max-w-lg text-lg">This isn't just a template. It's a full-stack application.</p>
          </div>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white border border-white/20 px-6 py-3 rounded-lg hover:bg-white hover:text-black transition-all font-mono text-sm">
            <Github className="w-4 h-4" /> View Source Code
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              key={tech.id}
              className={`p-6 rounded-2xl border ${tech.color} flex flex-col gap-4 hover:bg-white/5 transition-colors cursor-default`}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-black/20 rounded-lg">{tech.icon}</div>
                <h3 className="text-xl font-bold text-white">{tech.name}</h3>
              </div>
              <p className="text-neutral-400 text-sm font-mono">{tech.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
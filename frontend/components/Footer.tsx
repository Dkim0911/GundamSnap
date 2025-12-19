"use client";

import { useLanguage } from "../context/LanguageContext";
import { Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-neutral-950 py-12 px-6 md:px-12 border-t border-white/10 text-center md:text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tighter mb-2">Gundam Snap </h2>
          <p className="text-neutral-500 text-sm">
            Logic & Magic. Based in San Diego, CA.
          </p>
        </div>

        {/* SOCIAL LINKS */}
        <div className="flex gap-6">
          
          {/* 1. INSTAGRAM */}
          <SocialLink 
            href="https://www.instagram.com/gundam_snap/"
            icon={<Instagram className="w-5 h-5" />} 
            label="Instagram" 
          />

          {/* 2. LINKEDIN */}
          <SocialLink 
            href="https://www.linkedin.com/in/david-kim-3b2b9b208"
            icon={<Linkedin className="w-5 h-5" />} 
            label="LinkedIn" 
          />

          {/* 3. EMAIL (Keep the 'mailto:' prefix!) */}
          <SocialLink 
            href="mailto:kunnami99@gmail.com"
            icon={<Mail className="w-5 h-5" />} 
            label="Email" 
          />

        </div>

        {/* COPYRIGHT */}
        <div className="text-neutral-600 text-xs">
          © {new Date().getFullYear()} All rights reserved.
          <br />
          Built with Next.js & Python.
        </div>
      </div>
    </footer>
  );
}

// Helper Component that handles "New Tab" logic automatically
function SocialLink({ href, icon, label }: { href: string, icon: any, label: string }) {
  // If it starts with "http", it's an external website -> Open in new tab
  const isExternal = href.startsWith("http");

  return (
    <a 
      href={href} 
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
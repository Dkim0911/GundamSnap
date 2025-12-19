"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
// 1. Import the fancy font again
import { Playfair_Display } from "next/font/google";

// 2. Configure it
const fancyFont = Playfair_Display({ 
  subsets: ["latin"], 
  weight: "700", 
  style: "italic" 
});

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-[999] flex justify-between items-center px-6 py-6 md:px-12 pointer-events-none"
    >
      
      {/* LOGO - Now using the Fancy Font again */}
      <div className="pointer-events-auto bg-black/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/5 md:border-none md:bg-transparent md:backdrop-blur-none transition-all">
        {/* We apply the font class here */}
        <h1 className={`${fancyFont.className} text-white text-2xl md:text-4xl tracking-wide mix-blend-difference shadow-black drop-shadow-md`}>
          Gundam Snap
        </h1>
      </div>

      {/* LANGUAGE SWITCHER */}
      <button 
        onClick={toggleLanguage}
        className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/80 backdrop-blur-xl border border-white/20 text-white hover:bg-neutral-800 transition-all shadow-2xl"
      >
        <span className={`text-xs font-bold ${language === 'en' ? 'opacity-100 text-white' : 'opacity-40 text-neutral-400'}`}>EN</span>
        <span className="opacity-20">|</span>
        <span className={`text-xs font-bold ${language === 'ko' ? 'opacity-100 text-white' : 'opacity-40 text-neutral-400'}`}>KR</span>
      </button>
    </motion.nav>
  );
}
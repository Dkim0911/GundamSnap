"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Code, Aperture } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// 👇 1. 나눔명조(Nanum Myeongjo)를 가져옵니다.
import { Nanum_Myeongjo } from "next/font/google";

// 👇 2. 굵기를 '800'(ExtraBold)으로 설정해서 드라마틱함을 살립니다.
const kFont = Nanum_Myeongjo({
  weight: "800",
  subsets: ["latin"],
  display: "swap",
});

const heroImages = [
 "https://gundamsnap.s3.us-east-1.amazonaws.com/Me/KakaoTalk_20251216_232045483.jpg",
 "https://gundamsnap.s3.us-east-1.amazonaws.com/Shippo/KakaoTalk_20251216_232148736.jpg",
 "https://gundamsnap.s3.us-east-1.amazonaws.com/Me/KakaoTalk_20251217_001904733.jpg"
];

export default function Hero() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToPhotos = () => {
    const isMobile = window.innerWidth < 768;
    const targetId = isMobile ? "gallery-start-mobile" : "gallery-start";
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-[100dvh] bg-neutral-950 overflow-hidden flex flex-col md:flex-row">
      
      {/* MOBILE BACKGROUND */}
      <div className="absolute inset-0 md:hidden z-0">
        <AnimatePresence mode="popLayout">
          <motion.img 
            key={heroImages[index]} 
            src={heroImages[index]} 
            alt="Hero Slideshow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent z-10" />
      </div>

      {/* LEFT CONTENT */}
      <div className="relative z-20 w-full md:w-1/2 h-full flex flex-col justify-end md:justify-center px-6 pb-24 md:px-24 md:pb-0 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 👇 3. 제목: 글자 간격(tracking)을 살짝 좁혀서(-tighter) 더 단단하고 영화 타이틀처럼 만듭니다 */}
          <h1 className={`${kFont.className} text-4xl sm:text-5xl md:text-7xl text-white mb-4 md:mb-6 drop-shadow-lg leading-tight tracking-tight`}>
             {t.heroSubtitle}
          </h1>

          {/* 👇 4. 본문: 본문은 가독성을 위해 간격 유지 */}
          <p className={`${kFont.className} text-neutral-200 md:text-neutral-300 text-sm md:text-xl max-w-md leading-relaxed mb-8 md:mb-8 drop-shadow-md`}>
            {t.intro}
            <br className="hidden md:block"/>
            <span className="block mt-4 opacity-80 text-xs md:text-lg">
              {t.shippoIntro}
            </span>
          </p>

          <div className="flex gap-3 md:gap-4">
             <button 
                onClick={scrollToPhotos}
                className="flex items-center gap-2 px-5 py-3 bg-white text-black font-medium rounded-full md:rounded-lg hover:bg-neutral-200 transition-colors text-sm md:text-base shadow-xl"
             >
                <Aperture className="w-4 h-4" />
                {t.btnPhotos}
             </button>

             <a 
                href="https://github.com/Dkim0911" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-black/40 backdrop-blur-md border border-white/20 text-white font-medium rounded-full md:rounded-lg hover:bg-black/60 transition-colors text-sm md:text-base cursor-pointer"
             >
                <Code className="w-4 h-4" />
                {t.btnGithub}
             </a>
          </div>
        </motion.div>
      </div>

      {/* RIGHT IMAGE (Desktop) */}
      <div className="hidden md:block w-1/2 h-full relative overflow-hidden bg-neutral-900">
        <AnimatePresence mode="popLayout">
          <motion.img 
            key={heroImages[index]} 
            src={heroImages[index]} 
            alt="Hero Slideshow"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/20 to-transparent z-10" />
      </div>

      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-[10px] uppercase tracking-widest font-sans">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </motion.div>
    </div>
  );
}
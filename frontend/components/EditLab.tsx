"use client";

import { useState, useRef } from "react";
import { MoveHorizontal } from "lucide-react";
import { useLanguage } from "../context/LanguageContext"; // Import Hook

export default function EditLab() {
  const { t, language } = useLanguage(); // Get translations
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // RAW (Before)
  const imageBefore = "https://gundamsnap.s3.us-east-1.amazonaws.com/Before%26After/DSCF5652-2.jpg"; 
  // EDITED (After)
  const imageAfter = "https://gundamsnap.s3.us-east-1.amazonaws.com/Before%26After/47.jpg";

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  // Font class logic for Korean title
  const titleFontClass = language === "ko" ? "font-serif-kr tracking-tight" : "tracking-tighter";

  return (
    <section className="bg-neutral-950 py-24 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
           {/* Translated Title & Subtitle */}
           <h2 className={`text-3xl md:text-5xl font-bold text-white mb-4 ${titleFontClass}`}>
             {t.editTitle}
           </h2>
           <p className="text-neutral-400">
             {t.editSubtitle}
           </p>
        </div>

        {/* CONTAINER */}
        <div 
          ref={containerRef}
          className="relative w-full max-w-[600px] mx-auto aspect-[2/3] rounded-2xl overflow-hidden cursor-col-resize select-none border border-white/10 shadow-2xl"
          onMouseMove={(e) => isDragging && handleMove(e)}
          onTouchMove={(e) => isDragging && handleMove(e)}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchEnd={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onClick={handleMove}
        >
          {/* 1. BACKGROUND IMAGE (Edited / After) */}
          <img 
            src={imageAfter} 
            alt="Edited" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ imageRendering: 'auto' }}
          />
          <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-green-400 border border-green-500/30 z-20">
            {t.labelAfter}
          </div>

          {/* 2. FOREGROUND IMAGE (Raw / Before) */}
          <div 
            className="absolute inset-0 overflow-hidden pointer-events-none z-10"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
                src={imageBefore} 
                alt="Raw" 
                className="absolute inset-0 w-full max-w-none h-full object-cover" 
                style={{ imageRendering: 'auto' }}
            />
            <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-white/70 border border-white/10">
                {t.labelRaw}
            </div>
          </div>

          {/* 3. THE SLIDER HANDLE */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white cursor-col-resize z-30 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-black">
              <MoveHorizontal className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
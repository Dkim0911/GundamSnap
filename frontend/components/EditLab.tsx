"use client";

import { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

export default function EditLab() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // RAW (Before) - Desaturated/Flat look
  const imageBefore = "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop&sat=-100"; 
  // EDITED (After) - Vibrant/Contrast look
  const imageAfter = "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop";

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  return (
    <section className="bg-neutral-950 py-24 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center md:text-left">
           <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-4">The Edit Room</h2>
           <p className="text-neutral-400">Drag to see how I transform raw data into a finished story.</p>
        </div>

        <div 
          ref={containerRef}
          className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-col-resize select-none border border-white/10 shadow-2xl"
          onMouseMove={(e) => isDragging && handleMove(e)}
          onTouchMove={(e) => isDragging && handleMove(e)}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchEnd={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onClick={handleMove} // Allow clicking to jump
        >
          {/* 1. BACKGROUND IMAGE (The Edited Version) */}
          <img src={imageAfter} alt="Edited" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          <div className="absolute top-8 right-8 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs font-bold text-green-400 border border-green-500/30">AFTER</div>

          {/* 2. FOREGROUND IMAGE (The Raw Version) - Clipped */}
          <div 
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img src={imageBefore} alt="Raw" className="absolute inset-0 w-full max-w-none h-full object-cover" />
            <div className="absolute top-8 left-8 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs font-bold text-white/70 border border-white/10">RAW</div>
          </div>

          {/* 3. THE SLIDER HANDLE */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center text-black">
              <MoveHorizontal className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
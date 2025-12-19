"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// Replace with your AWS links
const photos = [
 { id: 1, url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/535267512_3904455299851881_8001273326730162823_n.heic",  },
  { id: 2, url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/554964179_17998677248819013_8907473286905233585_n.heic",  },
  { id: 3, url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/489858367_678639281484857_2392473643447251943_n.heic",  },
  { id: 4, url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/495674392_1052986236742292_7192999295702587184_n.heic",  },
  { id: 5, url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/518457248_1946458459510988_484642713090936153_n.heic",  },
  { id: 6, url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/486663875_637065875959028_3857943899283404276_n.heic",  }, 
  { id: 7, url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/591140837_18005754005819013_5144521881938673645_n.heic",  },
  { id: 8, url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/591121954_18005754104819013_7034465213696952520_n.heic",  },
  { id: 9, url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/565951395_18001795778819013_457205484287609084_n.heic",  },
  { id: 10, url: "https://gundamsnap.s3.us-east-1.amazonaws.com/other/566593708_18001795712819013_2263524674656509398_n.heic",  }
];

export default function FocusReel() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage(); 
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // FIX: Changed -65% to -85% to ensure the last photo is fully revealed
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-85%"]);

  return (
    <>
      {/* DESKTOP LAYOUT */}
      <section id="gallery-start" ref={targetRef} className="relative h-[300vh] bg-neutral-950 hidden md:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden border-t border-white/10">
          <div className="absolute top-8 left-8 z-20 text-white mix-blend-difference pointer-events-none">
            <p className="text-xs uppercase tracking-[0.2em] opacity-70">{t.reelTitle}</p>
          </div>
          <motion.div style={{ x }} className="flex gap-12 pl-[10vw]">
            {photos.map((photo) => (
              <PhotoCard 
                key={photo.id} 
                photo={photo} 
                onClick={() => setSelectedPhoto(photo)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* MOBILE LAYOUT */}
      <section id="gallery-start-mobile" className="block md:hidden bg-neutral-950 border-t border-white/10 py-12">
        <div className="px-6 mb-6">
           <p className="text-[10px] uppercase tracking-[0.2em] text-white opacity-70">{t.reelTitle}</p>
        </div>
        <div className="flex overflow-x-auto gap-4 px-6 pb-12 snap-x snap-mandatory scrollbar-hide">
          {photos.map((photo) => (
             <div key={photo.id} className="shrink-0 snap-center">
                <PhotoCard 
                  photo={photo} 
                  onClick={() => setSelectedPhoto(photo)}
                />
             </div>
          ))}
          <div className="w-6 shrink-0" />
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-auto h-auto max-w-[95vw] max-h-[90vh] rounded-sm shadow-2xl bg-black overflow-hidden"
              onClick={(e) => e.stopPropagation()} 
            >
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.title} 
                className="w-auto h-auto max-w-full max-h-[90vh] object-contain block"
              />
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-white hover:text-black text-white p-2 rounded-full transition-all backdrop-blur-md border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PhotoCard({ photo, onClick }: { photo: any, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="relative shrink-0 w-[85vw] md:w-[500px] aspect-[2/3] rounded-sm overflow-hidden cursor-pointer group transition-all duration-500 ease-out border border-white/5 bg-neutral-900 shadow-2xl hover:border-white/30"
    >
      <img 
        src={photo.url} 
        alt={photo.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
        <h3 className="text-white text-3xl font-serif italic tracking-tight">{photo.title}</h3>
        <p className="text-white/80 text-sm mt-2 flex items-center gap-2 font-mono uppercase tracking-widest">
           View Full <ChevronRight className="w-4 h-4" />
        </p>
      </div>
    </div>
  );
}
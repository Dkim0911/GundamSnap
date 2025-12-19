"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, ChevronDown } from "lucide-react";

// ... (Your existing allPhotos array stays here) ...
const allPhotos = [
  { id: 1, category: "weddings", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/483278643_1306193017272450_6850192804037755443_n.heic", title: "", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 2, category: "weddings", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/483933443_1169535291531905_3554273313930417656_n.heic", title: "", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 3, category: "weddings", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/484168185_1898278931007456_3931509711110679139_n.heic", title: "", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 4, category: "weddings", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/484309314_548137277697148_8505816986235858993_n.heic", title: "", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 5, category: "weddings", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/491463844_689456013604218_1717216910098896517_n.heic", title: "", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 6, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/491468503_1006125568159868_5556386922636683298_n.heic", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 7, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/550108550_17998017167819013_2831090458844259389_n.heic", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 8, category: "weddings", url: "https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/550787928_17998016420819013_5336358062713856354_n.heic ", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 9, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/550934886_17998017131819013_5237128599951367867_n.heic ", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 10, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/551476898_17998016390819013_4063752741279133770_n.heic ", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 11, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/573687962_18003868463819013_4660683220299959755_n.heic", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 12, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/574224668_18003868496819013_193950875416962018_n.heic", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 13, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/574232173_18003868487819013_4272593282518951223_n.heic", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 14, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/575319609_18003868451819013_1084318406257887322_n.heic", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 15, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/575965073_18004158329819013_4885523971114578824_n.heic", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },
  { id: 16, category: "weddings", url: " https://gundamsnap.s3.us-east-1.amazonaws.com/Wedding/580576821_18004158338819013_9202504934975730_n.heic", title: " ", specs: "ISO 400 • f/1.8 • 1/2000s" },

];

const categories = ["all", "weddings", "portraits", "couple", "maternity", "graduation", "family", "other"];
const ITEMS_PER_PAGE = 9;

// 1. HELPER: Fisher-Yates Shuffle Algorithm
const shuffleArray = (array: typeof allPhotos) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function CollectionsGrid() {
  const [filter, setFilter] = useState("all");
  
  // 2. STATE: 'activePhotos' holds the currently filtered AND shuffled list
  // We initialize with 'allPhotos' (static) to prevent Hydration Errors, 
  // then shuffle immediately in useEffect.
  const [activePhotos, setActivePhotos] = useState(allPhotos);
  
  const [selectedPhoto, setSelectedPhoto] = useState<typeof allPhotos[0] | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // 3. EFFECT: Randomize "All" on initial page load
  useEffect(() => {
    setActivePhotos(shuffleArray(allPhotos));
  }, []);

  // 4. HANDLER: When category changes, Filter THEN Shuffle
  const handleFilterChange = (cat: string) => {
    setFilter(cat);
    
    // Step A: Filter
    const filtered = cat === "all" 
      ? allPhotos 
      : allPhotos.filter(p => p.category === cat);
      
    // Step B: Randomize
    setActivePhotos(shuffleArray(filtered));
    
    // Step C: Reset Page
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  // Slice based on the currently active randomized list
  const visiblePhotos = activePhotos.slice(0, visibleCount);

  return (
    <section className="min-h-screen bg-neutral-950 py-24 px-6 md:px-12 border-t border-white/10 relative z-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-2">Collections</h2>
          <p className="text-neutral-400">Curated moments categorized by vibe.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                filter === cat ? "bg-white text-black" : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {visiblePhotos.map((photo) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="relative aspect-[3/4] group cursor-pointer overflow-hidden rounded-xl border border-white/5"
            >
              <img 
                src={photo.url} 
                alt={photo.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex items-center gap-2 text-white border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">
                   <Maximize2 className="w-4 h-4" />
                   <span className="text-xs uppercase tracking-widest">Inspect</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* LOAD MORE BUTTON */}
      {visibleCount < activePhotos.length && (
        <div className="flex justify-center mt-16">
          <button 
            onClick={handleLoadMore}
            className="group flex flex-col items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <span className="text-sm uppercase tracking-[0.2em]">See More</span>
            <div className="p-3 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
               <ChevronDown className="w-5 h-5" />
            </div>
          </button>
        </div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-[3/2] md:aspect-[16/9] bg-black border border-white/10 rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedPhoto.url} alt={selectedPhoto.title} className="w-full h-full object-contain" />
              <div className="absolute inset-0 pointer-events-none p-6 md:p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start text-green-400 font-mono text-xs md:text-sm tracking-widest drop-shadow-md">
                   <div className="flex flex-col gap-1"><span>REC ●</span><span>[ {selectedPhoto.specs} ]</span></div>
                   <div className="flex gap-4"><span>BAT [||||]</span><span>{selectedPhoto.category.toUpperCase()}</span></div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 flex items-center justify-center">
                   <div className="w-1 h-1 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>
                </div>
                <div className="flex justify-between items-end text-white/80 font-sans">
                   <div><h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter">{selectedPhoto.title}</h3></div>
                   <div className="text-right"><button onClick={() => setSelectedPhoto(null)} className="pointer-events-auto hover:text-green-400 transition-colors flex items-center gap-2 text-sm uppercase tracking-widest">Close <X className="w-4 h-4" /></button></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
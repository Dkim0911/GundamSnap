"use client";

import Hero from "@/components/Hero";
import FocusReel from "@/components/FocusReel";
import CollectionsGrid from "@/components/CollectionsGrid";
import EditLab from "@/components/EditLab";     // The New Feature
import TechStack from "@/components/TechStack"; // Engineering Flex
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";
import { LanguageProvider } from "@/context/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="bg-neutral-950 min-h-screen">
        {/* GLOBAL FLOATING ELEMENTS */}
        <Navbar />
        <ChatWidget />
        
        {/* SECTION 1: The Intro (Slideshow) */}
        <Hero />
        
        {/* SECTION 2: The "Immersive" Scroll (Horizontal) */}
        <FocusReel />

        {/* SECTION 3: The Filterable Gallery (Masonry) */}
        <CollectionsGrid />

        {/* SECTION 4: The Before & After Slider (Interactive) */}
        <EditLab />

        {/* SECTION 5: Under the Hood (Tech Stack) */}
        <TechStack />

        {/* SECTION 6: The End (Contact) */}
        <Footer />
        
      </main>
    </LanguageProvider>
  );
}
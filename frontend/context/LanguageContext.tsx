"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

const translations = {
  en: {
    heroTitle: "Logic & Magic",
    heroSubtitle: "I write Logic. I capture Magic.",
    intro: "Hi, Welcome to Gundam Snap. I bridge the gap between Software Engineering and Professional Photography.",
    shippoIntro: "(And this is Shippo 🐈, my Chief Morale Officer).",
    btnPhotos: "See Photos",
    btnGithub: "View GitHub",
    badge: "Open for work",
    reelTitle: "Selected Works",
    askShippo: "Ask Shippo",
    // NEW ADDITION:
    greeting: "Meow!... Hi! I'm Shippo 🐈. I can help with photo styles or availability. What are you curious about?"
  },
  ko: {
    heroTitle: "Logic & Magic",
    heroSubtitle: "논리적인 설계 위에 피어나는 마법 같은 이야기",
    intro: "반갑습니다. 건담 스냅입니다. 0과 1로 이루어진 디지털 세계와, 빛과 색으로 채워진 현실 세계 사이에서 가장 아름다운 접점을 찾아냅니다..",
    shippoIntro: "(제 작업의 원동력인 고양이 비서, 싯포 🐈 도 인사드립니다).",
    btnPhotos: "사진 보기",
    btnGithub: "깃허브 보기",
    badge: "구직 중",
    reelTitle: "포트폴리오",
    askShippo: "시포에게 물어보기",
    // NEW ADDITION (Korean Greeting):
    greeting: "먀옹!... 안녕하세요! 싯포예요 🐈. 촬영 스타일이나 일정에 대해 알려드릴 수 있어요. 무엇이 궁금하신가요?"
  }
};

type Language = "en" | "ko";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ko" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
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
    heroSubtitle: "코드로 짓고, 빛으로 그리다",
    intro: "안녕하세요, 건담 스냅입니다. 개발자의 눈으로 세상을 구조적으로 보고, 포토그래퍼의 마음으로 그 안의 낭만을 찾아냅니다.",
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
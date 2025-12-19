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
    heroTitle: "논리와 마법",
    heroSubtitle: "논리를 코딩하고, 마법을 촬영합니다.",
    intro: "안녕하세요, 건담 스냅입니다. 저는 소프트웨어 엔지니어링과 전문 사진 촬영의 경계를 잇는 작업을 합니다.",
    shippoIntro: "(그리고 이쪽은 저의 최고 사기 진작 책임자, 싯포 🐈 입니다).",
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
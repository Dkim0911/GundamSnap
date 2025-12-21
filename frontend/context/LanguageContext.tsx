"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

const translations = {
  en: {
    // --- Hero Section ---
    heroTitle: "Logic & Magic",
    heroSubtitle: "I write Logic. I capture Magic.",
    intro: "Hi, Welcome to Gundam Snap. I bridge the gap between Software Engineering and Professional Photography.",
    shippoIntro: "(And this is Shippo 🐈, my Chief Morale Officer).",
    btnPhotos: "See Photos",
    btnGithub: "View GitHub",
    badge: "Open for work",
    
    // --- Featured Reel ---
    reelTitle: "Selected Works",

    // --- Chatbot ---
    askShippo: "Ask Shippo",
    greeting: "Meow!... Hi! I'm Shippo 🐈. I can help with photo styles or availability. What are you curious about?",

    // --- Collections Section ---
    colTitle: "Collections",
    colSubtitle: "Curated moments categorized by vibe.",
    catAll: "All",
    catWeddings: "Weddings",
    catCouple: "Couple",
    catMaternity: "Maternity",
    catGraduation: "Graduation",
    catFamily: "Family",
    catPortraits: "Portraits",
    catOther: "Other",
    btnSeeMore: "See More",
    inspect: "Inspect",
    close: "Close",

    // --- NEW: Edit Room ---
    editTitle: "The Edit Room",
    editSubtitle: "Drag to see how I transform raw data into a finished story.",
    labelRaw: "RAW",
    labelAfter: "AFTER",

    // --- NEW: Under the Hood ---
    techTitle: "Under the Hood",
    techSubtitle: "This isn't just a template. It's a full-stack application.",
    btnSource: "View Source Code",
    techDesc1: "App Router & Server Actions",
    techDesc2: "High-performance Backend",
    techDesc3: "Shippo's Logic Engine",
    techDesc4: "Responsive Styling",
    techDesc5: "Complex Animations"
  },
  ko: {
    // --- Hero Section ---
    heroTitle: "Logic & Magic",
    heroSubtitle: "논리적인 설계 위에 피어나는 마법 같은 이야기",
    intro: "반갑습니다. 건담 스냅입니다. 0과 1로 이루어진 디지털 세계와, 빛과 색으로 채워진 현실 세계 사이에서 가장 아름다운 접점을 찾아냅니다..",
    shippoIntro: "(제 작업의 원동력인 고양이 비서, 싯포 🐈 도 인사드립니다).",
    btnPhotos: "사진 보기",
    btnGithub: "깃허브 보기",
    badge: "구직 중",

    // --- Featured Reel ---
    reelTitle: "포트폴리오",

    // --- Chatbot ---
    askShippo: "시포에게 물어보기",
    greeting: "먀옹!... 안녕하세요! 싯포예요 🐈. 촬영 스타일이나 일정에 대해 알려드릴 수 있어요. 무엇이 궁금하신가요?",

    // --- Collections Section ---
    colTitle: "컬렉션",
    colSubtitle: "분위기별로 엄선한 최고의 순간들.",
    catAll: "전체",
    catWeddings: "웨딩",
    catCouple: "커플",
    catMaternity: "만삭",
    catGraduation: "졸업스냅",
    catFamily: "가족",
    catPortraits: "포트레이트",
    catOther: "기타",
    btnSeeMore: "더 보기",
    inspect: "크게 보기",
    close: "닫기",

    // --- NEW: Edit Room ---
    editTitle: "보정 작업실",
    editSubtitle: "슬라이더를 움직여 원본 데이터가 완성된 이야기로 변하는 과정을 확인하세요.",
    labelRaw: "원본 (RAW)",
    labelAfter: "보정본 (AFTER)",

    // --- NEW: Under the Hood ---
    techTitle: "기술 스택",
    techSubtitle: "단순한 템플릿이 아닙니다. 직접 설계한 풀스택 애플리케이션입니다.",
    btnSource: "소스 코드 보기",
    techDesc1: "App Router & 서버 액션",
    techDesc2: "고성능 백엔드 서버",
    techDesc3: "싯포(Shippo)의 두뇌",
    techDesc4: "반응형 스타일링",
    techDesc5: "복잡한 인터랙션 구현"
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
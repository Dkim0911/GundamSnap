import type { Metadata } from "next";
// 👇 Do_Hyeon 추가 (아주 굵고 멋진 폰트)
import { Inter, Playfair_Display, Do_Hyeon } from "next/font/google"; 
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

// 👇 도현체 설정 (weight: 400 하나만 있음)
const doHyeon = Do_Hyeon({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dohyeon", // 변수 이름 확인!
});

export const metadata: Metadata = {
  title: "Gundam Snap | Logic & Magic",
  description: "Photography portfolio of Gundam Snap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 👇 [매우 중요] doHyeon.variable을 여기에 꼭 추가해야 합니다!! */}
      <body className={`${inter.className} ${playfair.variable} ${doHyeon.variable}`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
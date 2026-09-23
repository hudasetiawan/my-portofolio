import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Sora, DM_Sans } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm", display: "swap" });

export const metadata: Metadata = {
  title: "Huda Setiawan | Front-End Engineer",
  description: "Portfolio of Huda Setiawan, a Front-End Engineer building fast, accessible and polished web interfaces.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // 'dark' class is added by default to prevent flash; ThemeProvider manages it at runtime
    <html lang="en" className={`${sora.variable} ${dmSans.variable} dark scroll-smooth`}>
      <body className="bg-surface font-sans text-on-surface-secondary antialiased selection:bg-selection">
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

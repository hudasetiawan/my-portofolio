import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Sora, DM_Sans } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm", display: "swap" });

export const metadata: Metadata = {
  title: "Your Name | Front-End Engineer",
  description: "Portfolio of Your Name, a front-end engineer building fast, accessible and polished web interfaces.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable} scroll-smooth`}>
      <body className="bg-black font-sans text-zinc-200 antialiased selection:bg-white/25">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

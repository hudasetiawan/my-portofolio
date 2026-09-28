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
  description: "Portfolio of Huda Setiawan, a Front-End Engineer focused on building modern, responsive, and aesthetic web interfaces using Next.js and React.",
  keywords: [
    "Huda Setiawan", 
    "Front-End Engineer", 
    "Web Developer", 
    "Portfolio", 
    "Next.js", 
    "React", 
    "Tailwind CSS",
    "Magelang",
    "Indonesia"
  ],
  authors: [{ name: "Huda Setiawan" }],
  openGraph: {
    title: "Huda Setiawan | Front-End Engineer",
    description: "Digital portfolio of Huda Setiawan, a passionate Front-End Engineer.",
    url: "https://www.hudasetiawan.my.id",
    siteName: "Huda Setiawan Portfolio",
    images: [
      {
        url: "/img/huda-hero.JPG", 
        width: 1200,
        height: 630,
        alt: "Huda Setiawan - Front-End Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Huda Setiawan | Front-End Engineer",
    description: "Digital portfolio of Huda Setiawan, a passionate Front-End Engineer.",
    images: ["/img/huda-hero.JPG"],
  },
  verification: {
    google: "a7eLkm1XNeWcoocxchCCI0MF5lVOWJ3FPkGzTcUFPp4",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable} dark scroll-smooth`}>
      <body className="bg-surface font-sans text-on-surface-secondary antialiased selection:bg-selection">
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
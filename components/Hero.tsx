"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Magnetic from "./Magnetic";
import LineWaves from "./LineWaves";
import { useTheme } from "./ThemeProvider";
import { snappy, spring } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};
const slideUp: Variants = { hidden: { y: "110%" }, show: { y: 0, transition: spring } };
const fadeUp: Variants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: spring } };

function Mask({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.12em] -mb-[0.12em] ${className}`}>
      <motion.span variants={slideUp} className="block">
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="home" className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden pt-20 pb-20">
      
      {/* Background WebGL */}
      <div aria-hidden="true" className="pointer-events-auto absolute inset-0 -z-10 opacity-90">
        <LineWaves
          color1={isDark ? "#ffffff" : "#1a1a1a"}
          color2={isDark ? "#a1a1aa" : "#0a0a0a"}
          color3={isDark ? "#71717a" : "#000000"}
          brightness={isDark ? 0.25 : 0.7}
          warpIntensity={1.2}
          speed={0.3}
          innerLineCount={32}
          outerLineCount={36}
          rotation={-45}
          enableMouseInteraction={true}
          mouseInfluence={3.0}
          lightMode={!isDark}
        />
      </div>

      {/* GRADIENT RESPONSIF: Tetap melindungi teks dari kiri (desktop) dan atas (mobile) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 ${
          isDark
            ? "bg-gradient-to-b lg:bg-gradient-to-r from-black via-black/80 to-transparent"
            : "bg-gradient-to-b lg:bg-gradient-to-r from-[#f5f3ef] via-[#f5f3ef]/90 to-transparent"
        }`}
      />

      {/* MAIN CONTAINER: Flex column di mobile, Flex row di Desktop (lg) */}
      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="pointer-events-none mx-auto flex w-full max-w-6xl flex-col-reverse lg:flex-row items-center justify-between gap-12 px-6"
      >
        
        {/* KOLOM KIRI: Teks & Tombol */}
        <div className="flex w-full lg:w-1/2 flex-col items-center text-center lg:items-start lg:text-left">
          <motion.p variants={fadeUp} className="mb-5 flex items-center gap-2 text-sm md:text-base text-on-surface-secondary">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to work
          </motion.p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-on-surface">
            <span className="sr-only">Huda Setiawan</span>
            <span aria-hidden="true" className="flex flex-wrap justify-center lg:justify-start">
              {"Huda Setiawan".split(" ").map((word, i) => (
                <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
                  <motion.span variants={slideUp} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <Mask className="mt-3 font-display text-lg sm:text-xl md:text-2xl text-on-surface-secondary">
            Front-End Engineer
          </Mask>

          <Mask className="mt-6 max-w-sm sm:max-w-md lg:max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-on-surface-secondary">
            I am a Front-End Developer with a strong foundation in UI/UX design. I specialize in building highly responsive, 
            accessible layouts using Tailwind CSS, while actively leveraging Next.js to deliver modern web experiences.
          </Mask>

          <motion.div variants={fadeUp} className="pointer-events-auto mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
            <Magnetic>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={snappy}
                className="block rounded-full bg-accent px-7 py-3 text-sm font-medium text-accent-text transition-shadow duration-300 hover:shadow-[0_0_40px_-6px_var(--glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                View Projects
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={snappy}
                className="block rounded-full border border-border-hover px-7 py-3 text-sm font-medium text-on-surface transition-colors duration-300 hover:border-on-surface hover:bg-nav-hover-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-surface"
              >
                Contact Me
              </motion.a>
            </Magnetic>
          </motion.div>
        </div>

        {/* KOLOM KANAN: Foto & Statistik Bento */}
        <motion.div variants={fadeUp} className="pointer-events-auto flex w-full lg:w-1/2 flex-col items-center lg:items-end">
          
          {/* Kontainer Foto (Ganti src dengan path foto Anda di folder public) */}
          <div className="relative h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 overflow-hidden rounded-3xl border-border-hover bg-nav-bg shadow-2xl">
            <Image
              src="/img/huda-hero.jpg" // PASTIKAN FOTO BERNAMA profile.jpg ADA DI FOLDER public
              alt="Huda Setiawan"
              fill
              className="object-cover grayscale transition-all duration-500 hover:scale-105 hover:grayscale-0"
              priority
            />
          </div>

          {/* Grid Statistik ala Bento (Acrylic Style) */}
          <div className="mt-6 grid w-full max-w-sm grid-cols-2 gap-3">
            {[
              { label: "Projects", value: "10+" },
              { label: "Certs", value: "2" },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-4 text-center shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10"
              >
                {/* Efek pantulan cahaya (Glossy Highlight) di tepi atas kaca saat di-hover */}
                <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                
                <span className="font-display text-2xl font-bold text-on-surface transition-transform duration-300 group-hover:scale-110">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs font-medium uppercase tracking-wider text-on-surface-secondary">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </motion.div>

      </motion.div>
    </section>
  );
}
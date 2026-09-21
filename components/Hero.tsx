"use client";

import type { ReactNode } from "react";
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

/** Text slides up from behind an overflow-hidden mask. The padding/negative margin pair stops descenders clipping. */
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
    <section id="home" className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
      
      {/* 1. UBAH DI SINI: Izinkan pointer events agar WebGL menangkap pergerakan kursor */}
      <div aria-hidden="true" className="pointer-events-auto absolute inset-0 -z-10 opacity-70">
        <LineWaves
          color1={isDark ? "#ffffff" : "#94a3b8"}
          color2={isDark ? "#a1a1aa" : "#64748b"}
          color3={isDark ? "#71717a" : "#475569"}
          brightness={isDark ? 0.25 : 0.4} // Sedikit dinaikkan agar efek gelombang terlihat jelas
          warpIntensity={1.2}
          speed={0.3}
          innerLineCount={32}
          outerLineCount={36}
          rotation={-45}
          enableMouseInteraction={true}
          mouseInfluence={3.0} // Naikkan nilai ini agar efek lekukan mouse lebih terasa
          lightMode={!isDark}
        />
      </div>

      {/* Vignette overlay: Berikan pointer-events-none agar tidak menghalangi kursor ke kanvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: isDark
            ? "linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)"
            : "linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 40%, transparent 100%)",
        }}
      />

      {/* 2. UBAH DI SINI: Berikan pointer-events-none pada pembungkus teks agar kursor menembus ke WebGL */}
      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="pointer-events-none mx-auto w-full max-w-6xl px-6 py-20"
      >
        <motion.p variants={fadeUp} className="mb-5 flex items-center gap-2 text-sm text-on-surface-secondary">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Open to work
        </motion.p>

        <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-on-surface sm:text-6xl lg:text-7xl">
          <span className="sr-only">Huda Setiawan</span>
          <span aria-hidden="true" className="flex flex-wrap">
            {"Huda Setiawan".split(" ").map((word, i) => (
              <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
                <motion.span variants={slideUp} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <Mask className="mt-3 font-display text-xl text-on-surface-secondary sm:text-2xl">Front-End Engineer</Mask>

        <Mask className="mt-6 max-w-xl text-base leading-relaxed text-on-surface-secondary sm:text-lg">
          I am a Front-End Developer with a strong foundation in UI/UX design. I specialize in building highly responsive, 
          accessible layouts using Tailwind CSS, while actively leveraging Next.js to deliver modern web experiences.
        </Mask>

        {/* 3. UBAH DI SINI: Kembalikan pointer-events-auto pada grup tombol agar tombol bisa diklik */}
        <motion.div variants={fadeUp} className="pointer-events-auto mt-10 flex flex-wrap gap-4">
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
      </motion.div>
    </section>
  );
}

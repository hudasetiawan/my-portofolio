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
      {/* Line Waves WebGL background — auto-adapts to current theme */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <LineWaves
          color1={isDark ? "#ffffff" : "#94a3b8"}
          color2={isDark ? "#a1a1aa" : "#64748b"}
          color3={isDark ? "#71717a" : "#475569"}
          brightness={isDark ? 0.15 : 0.35}
          warpIntensity={1.0}
          speed={0.3}
          innerLineCount={32}
          outerLineCount={36}
          rotation={-45}
          enableMouseInteraction={true}
          mouseInfluence={2.0}
          lightMode={false}
        />
      </div>

      {/* Subtle vignette overlay for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)"
            : "radial-gradient(ellipse at center, transparent 30%, rgba(248,250,252,0.7) 100%)",
        }}
      />

      <motion.div variants={container} initial="hidden" animate="show" className="mx-auto w-full max-w-6xl px-6 py-20">
        <motion.p variants={fadeUp} className="mb-5 flex items-center gap-2 text-sm text-on-surface-secondary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Open to work
        </motion.p>

        <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-on-surface sm:text-6xl lg:text-7xl">
          {"Huda Setiawan".split(" ").map((word, i) => (
            <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
              <motion.span variants={slideUp} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <Mask className="mt-3 font-display text-xl text-on-surface-secondary sm:text-2xl">Front-End Engineer</Mask>

        <Mask className="mt-6 max-w-xl text-base leading-relaxed text-on-surface-secondary sm:text-lg">
          A fresh graduate who turns designs into fast, accessible and polished interfaces with React and Next.js.
          I care about the small details that make a product feel good to use.
        </Mask>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
          <Magnetic>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={snappy}
              className="block rounded-full bg-accent px-7 py-3 text-sm font-medium text-accent-text transition-shadow duration-300 hover:shadow-[0_0_40px_-6px_var(--glow)]"
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
              className="block rounded-full border border-border-hover px-7 py-3 text-sm font-medium text-on-surface transition-colors duration-300 hover:border-on-surface hover:bg-nav-hover-bg"
            >
              Contact Me
            </motion.a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}

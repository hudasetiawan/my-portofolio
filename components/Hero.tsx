"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import Magnetic from "./Magnetic";
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
  return (
    <section id="home" className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
      {/* Silver orb: transform-only loop, so it stays on the GPU with no layout shift */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 sm:h-[34rem] sm:w-[34rem] lg:left-2/3">
          <motion.div
            className="h-full w-full rounded-full bg-gradient-to-br from-white/25 via-zinc-300/10 to-transparent blur-[110px] will-change-transform"
            animate={{ x: [0, 70, -50, 0], y: [0, -50, 40, 0], scale: [1, 1.15, 0.95, 1] }}
            transition={{ duration: 24, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="mx-auto w-full max-w-6xl px-6 py-20">
        <motion.p variants={fadeUp} className="mb-5 flex items-center gap-2 text-sm text-zinc-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          Open to work
        </motion.p>

        <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {"Huda Setiawan".split(" ").map((word, i) => (
            <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
              <motion.span variants={slideUp} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <Mask className="mt-3 font-display text-xl text-zinc-400 sm:text-2xl">Front-End Engineer</Mask>

        <Mask className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
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
              className="block rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-shadow duration-300 hover:shadow-[0_0_40px_-6px_rgba(255,255,255,0.55)]"
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
              className="block rounded-full border border-white/30 px-7 py-3 text-sm font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white/10"
            >
              Contact Me
            </motion.a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}

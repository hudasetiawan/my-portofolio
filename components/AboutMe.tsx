"use client";

import { motion, type Variants } from "framer-motion";
import { MapPin, Code2, GraduationCap } from "lucide-react";
import { spring } from "@/lib/motion";
import StrokeText from "./StrokeText";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item: Variants = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: spring } };

export default function AboutMe() {
  return (
    <section id="who-am-i" className="py-16 sm:py-20">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-4 sm:px-6"
      >
        {/* === HEADER === */}
        <div className="mb-10 sm:mb-12 lg:mb-16 flex flex-col gap-4 sm:gap-6">

          {/* 1. Label Berdiri Sendiri di Atas */}
          <motion.div variants={item} className="flex items-center gap-2 text-xs sm:text-sm font-medium uppercase tracking-widest text-on-surface-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-on-surface-secondary"></span>
            Who Am I
          </motion.div>

          {/* 2. Baris Judul & Deskripsi (Sejajar Tengah) */}
          <div className="flex flex-col items-start justify-between gap-6 sm:gap-8 lg:gap-10 lg:flex-row lg:items-center">

            {/* Kolom Kiri: Judul Raksasa */}
            <motion.div variants={item} className="flex-1 flex flex-col">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-on-surface">
                Front-End Engineer
              </h2>
              <div className="mt-1 w-full max-w-[800px]">
                <StrokeText
                  text="& UI/UX Designer."
                  fontSize={72}
                  strokeWidth={1.5}
                  strokeColor="var(--on-surface-secondary)"
                  fillColor="var(--on-surface)"
                  trigger="loop"
                  drawDuration={1.8}
                  className="max-sm:!text-3xl max-md:!text-4xl"
                />
              </div>
            </motion.div>

            {/* Kolom Kanan: Paragraf Deskripsi */}
            <motion.div
              variants={item}
              // Menggunakan text-sm untuk mobile dan text-base/lg untuk layar lebih besar
              className="flex w-full flex-col gap-3 sm:gap-5 text-sm sm:text-base lg:text-lg leading-relaxed text-on-surface-secondary lg:max-w-lg"
            >
              <p>
                Thriving at the intersection of design and technology, I focus on creating intuitive, accessible, and user-centered digital experiences backed by a strong foundation in Informatics Education.
              </p>
              <p>
                Beyond crafting pixel-perfect interfaces and writing clean code, I am deeply passionate about tech education and community leadership. I believe the most impactful digital solutions are built through collaborative environments and continuous learning.
              </p>
            </motion.div>

          </div>
        </div>

        {/* === BENTO GRID === */}
        <motion.div
          variants={container}
          className="grid auto-rows-[auto] sm:auto-rows-[160px] md:auto-rows-[180px] grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 md:grid-rows-2"
        >
          {/* KARTU 1: Academic Foundation */}
          <motion.div
            variants={item}
            className="group col-span-1 row-span-2 flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-border bg-gradient-to-br from-surface-alt/40 via-surface-card to-surface-card p-5 sm:p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:border-border-hover hover:bg-surface-alt/20 hover:shadow-[0_0_40px_-12px_var(--glow)] dark:shadow-none md:col-span-2"
          >
            <div>
              <div className="mb-4 sm:mb-6 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-border/60 bg-black/5 text-on-surface-secondary transition-all duration-500 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent dark:bg-white/5">
                <GraduationCap size={24} />
              </div>
              <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-semibold text-on-surface">
                Academic Foundation
              </h3>
              {/* Teks dinaikkan ke text-sm agar nyaman dibaca */}
              <p className="mt-1 sm:mt-2 text-sm leading-relaxed text-on-surface-secondary">
                Graduated with a strong engineering and educational foundation from Universitas Negeri Yogyakarta (2022-2026).
              </p>
            </div>

            <div className="mt-4 sm:mt-6 flex flex-col gap-3 sm:gap-4">
              <div className="flex items-end justify-between border-b border-border/60 pb-3">
                <span className="text-xs sm:text-sm font-medium text-on-surface-secondary">Degree</span>
                <span className="text-xs sm:text-sm font-semibold text-on-surface text-right">B.Ed. Informatics<br />Engineering</span>
              </div>
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="text-xs sm:text-sm font-medium text-on-surface-secondary">Cumulative GPA</span>
                <span className="text-base sm:text-lg font-bold text-on-surface group-hover:text-accent transition-colors duration-300">3.87 / 4.00</span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs sm:text-sm font-medium text-on-surface-secondary">Core Focus</span>
                <span className="text-xs sm:text-sm font-semibold text-on-surface">Software Engineering</span>
              </div>
            </div>
          </motion.div>

          {/* KARTU 2: Remote Ready */}
          <motion.div
            variants={item}
            className="group col-span-1 flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-border bg-gradient-to-br from-surface-alt/40 via-surface-card to-surface-card p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:border-border-hover hover:bg-surface-alt/20 hover:shadow-[0_0_40px_-12px_var(--glow)] dark:shadow-none"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-black/5 text-on-surface-secondary transition-all duration-500 group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent dark:bg-white/5">
                <MapPin size={18} />
              </div>
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              </span>
            </div>
            <div className="mt-4">
              <h3 className="font-display text-base sm:text-lg font-semibold text-on-surface">Remote & Onsite</h3>
              <p className="mt-1 text-sm text-on-surface-secondary">Based in Magelang, ID. Highly adaptable for collaboration.</p>
            </div>
          </motion.div>

          {/* KARTU 3: Design-to-Code */}
          <motion.div
            variants={item}
            className="group col-span-1 flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-border bg-gradient-to-br from-surface-alt/40 via-surface-card to-surface-card p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:border-border-hover hover:bg-surface-alt/20 hover:shadow-[0_0_40px_-12px_var(--glow)] dark:shadow-none"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-black/5 text-on-surface-secondary transition-all duration-500 group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent dark:bg-white/5">
                <Code2 size={18} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-display text-base sm:text-lg font-semibold text-on-surface">Design-to-Code</h3>
              <p className="mt-1 text-sm text-on-surface-secondary">Translating Figma prototypes into production-ready UI.</p>
            </div>
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
}
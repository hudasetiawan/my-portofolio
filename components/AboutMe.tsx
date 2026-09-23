"use client";

import { motion, type Variants } from "framer-motion";
import { MapPin, Code2, GraduationCap, HeartHandshake } from "lucide-react";
import { spring } from "@/lib/motion";
import StrokeText from "./StrokeText";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item: Variants = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: spring } };

export default function AboutMe() {
  return (
    <section id="who-am-i" className="py-20">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-6"
      >
        {/* === HEADER === */}
        <div className="mb-16 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          
          {/* Kolom Kiri */}
          <div className="flex-1">
            <motion.div variants={item} className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-on-surface-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-on-surface-secondary"></span>
              Who Am I
            </motion.div>

            <motion.div variants={item} className="flex flex-col">
              <h2 className="font-display text-5xl font-bold tracking-tight text-on-surface sm:text-6xl md:text-7xl">
                Front-End Engineer
              </h2>
              <div className="mt-1 w-full max-w-[800px]">
                <StrokeText
                  text="& UI/UX Designer."
                  fontSize={72}
                  strokeWidth={1.5}
                  /* Menggunakan CSS Variables agar warnanya dinamis mengikuti tema */
                  strokeColor="var(--on-surface-secondary)" 
                  fillColor="var(--on-surface)"   
                  trigger="loop"
                  drawDuration={1.8}
                  className="max-sm:!text-5xl"
                />
              </div>
            </motion.div>
          </div>
          
          {/* Kolom Kanan */}
          <motion.p 
            variants={item} 
            className="w-full text-lg leading-relaxed text-on-surface-secondary md:max-w-md md:pb-4"
          >
            I specialize in turning complex problems into elegant, user-centered digital solutions. By bridging the gap between design thinking and modern web architecture, I build interfaces that are not only visually appealing but also highly performant.
          </motion.p>
        </div>

        {/* === BENTO GRID === */}
        <motion.div
          variants={container}
          className="grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2"
        >
          {/* KARTU 1: Academic Foundation */}
          <motion.div
            variants={item}
            /* PERUBAHAN: Gradasi menyudut transparan & efek latar saat hover */
            className="group col-span-1 row-span-2 flex flex-col justify-between rounded-3xl border border-border bg-gradient-to-br from-surface-alt/40 via-surface-card to-surface-card p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:border-border-hover hover:bg-surface-alt/20 hover:shadow-[0_0_40px_-12px_var(--glow)] dark:shadow-none md:col-span-2"
          >
            <div>
              {/* PERUBAHAN: Ikon diberikan bg yang lebih tegas (bg-on-surface/[0.03] dark:bg-white/[0.05]) agar terlihat seperti badge premium */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-black/5 text-on-surface-secondary transition-all duration-500 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent dark:bg-white/5">
                <GraduationCap size={24} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-on-surface">
                Academic Foundation
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-secondary">
                Graduated with a strong engineering and educational foundation from Universitas Negeri Yogyakarta (2022-2026).
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-end justify-between border-b border-border/60 pb-3">
                <span className="text-sm font-medium text-on-surface-secondary">Degree</span>
                <span className="text-sm font-semibold text-on-surface text-right">B.Ed. Informatics<br/>Engineering</span>
              </div>
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="text-sm font-medium text-on-surface-secondary">Cumulative GPA</span>
                <span className="text-lg font-bold text-on-surface group-hover:text-accent transition-colors duration-300">3.87 / 4.00</span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="text-sm font-medium text-on-surface-secondary">Core Focus</span>
                <span className="text-sm font-semibold text-on-surface">Software Engineering</span>
              </div>
            </div>
          </motion.div>

          {/* KARTU 2: Remote Ready */}
          <motion.div
            variants={item}
            className="group col-span-1 flex flex-col justify-between rounded-3xl border border-border bg-gradient-to-br from-surface-alt/40 via-surface-card to-surface-card p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:border-border-hover hover:bg-surface-alt/20 hover:shadow-[0_0_40px_-12px_var(--glow)] dark:shadow-none"
          >
            <div className="flex items-center justify-between">
              {/* Ikon dengan bg-badge transparan */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-black/5 text-on-surface-secondary transition-all duration-500 group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent dark:bg-white/5">
                <MapPin size={18} />
              </div>
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              </span>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-on-surface">Remote & Onsite</h3>
              <p className="mt-1 text-sm text-on-surface-secondary">Based in Magelang, ID. Highly adaptable for collaboration.</p>
            </div>
          </motion.div>

          {/* KARTU 3: Design-to-Code */}
          <motion.div
            variants={item}
            className="group col-span-1 flex flex-col justify-between rounded-3xl border border-border bg-gradient-to-br from-surface-alt/40 via-surface-card to-surface-card p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:border-border-hover hover:bg-surface-alt/20 hover:shadow-[0_0_40px_-12px_var(--glow)] dark:shadow-none"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-black/5 text-on-surface-secondary transition-all duration-500 group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent dark:bg-white/5">
                <Code2 size={18} />
              </div>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-on-surface">Design-to-Code</h3>
              <p className="mt-1 text-sm text-on-surface-secondary">Translating Figma prototypes into production-ready UI.</p>
            </div>
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
}
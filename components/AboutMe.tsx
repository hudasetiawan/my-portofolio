"use client";

import { motion, type Variants } from "framer-motion";
import { MapPin, GraduationCap, Briefcase, Heart } from "lucide-react";
import { spring } from "@/lib/motion";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item: Variants = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: spring } };

const highlights = [
  {
    icon: GraduationCap,
    title: "Fresh Graduate",
    description: "Recently graduated with a strong foundation in computer science and modern web technologies.",
  },
  {
    icon: Briefcase,
    title: "Front-End Focused",
    description: "Passionate about crafting pixel-perfect, accessible and performant user interfaces.",
  },
  {
    icon: MapPin,
    title: "Based in Indonesia",
    description: "Open to remote work and relocation opportunities worldwide.",
  },
  {
    icon: Heart,
    title: "Detail Oriented",
    description: "I sweat the small stuff — micro-interactions, spacing and typography that make products feel alive.",
  },
];

export default function AboutMe() {
  return (
    <section id="about" className="py-20">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-6xl px-6"
      >
        {/* Section heading */}
        <motion.h2
          variants={item}
          className="font-display text-3xl font-semibold text-on-surface sm:text-4xl"
        >
          About Me
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-5 max-w-2xl leading-relaxed text-on-surface-secondary"
        >
          Hi! I&apos;m Huda Setiawan, a passionate front-end developer who loves
          turning ideas into beautiful, functional web experiences. With a keen
          eye for design and a commitment to clean code, I build interfaces that
          are not only visually appealing but also fast and accessible.
        </motion.p>

        {/* Highlight cards */}
        <motion.div
          variants={container}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {highlights.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={item}
              className="group rounded-2xl border border-border bg-gradient-to-b from-surface-alt to-surface-card p-6 transition-[border-color,box-shadow] duration-500 hover:border-border-hover hover:shadow-[0_0_40px_-12px_var(--glow)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-border text-on-surface-secondary transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-text">
                <Icon size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold text-on-surface">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-secondary">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, type Variants } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import Magnetic from "./Magnetic";
import { snappy, spring } from "@/lib/motion";

const socials = [
  { label: "GitHub", href: "https://github.com/hudasetiawan", icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/miftakhul-huda-dwi-setiawan-7644232a9/", icon: LinkedinIcon },
  { label: "Email", href: "mailto:hudasetiawann15@gmail.com", icon: Mail },
];

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item: Variants = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: spring } };

export default function Contact() {
  return (
    <section id="contact" className="px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto max-w-2xl text-center"
      >
        <motion.h2 variants={item} className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-on-surface">
          Let&apos;s build something together
        </motion.h2>
        <motion.p variants={item} className="mt-3 sm:mt-5 text-sm sm:text-base leading-relaxed text-on-surface-secondary">
          I&apos;m always looking for new opportunities and would love to hear from you. 
          If you have an opening or just want to say hello, my inbox is always open. Feel free to reach out!
        </motion.p>

        <motion.ul variants={container} className="mt-8 sm:mt-10 flex justify-center gap-3 sm:gap-4">
          {socials.map(({ label, href, icon: Icon }) => (
            <motion.li key={label} variants={item}>
              <Magnetic strength={0.4}>
                <motion.a
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  transition={snappy}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-border text-on-surface-secondary transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-text"
                >
                  <Icon width={20} height={20} className="sm:w-[22px] sm:h-[22px]" />
                </motion.a>
              </Magnetic>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, type Variants } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import Magnetic from "./Magnetic";
import { snappy, spring } from "@/lib/motion";

const socials = [
  { label: "GitHub", href: "https://github.com/your-username", icon: GithubIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-username", icon: LinkedinIcon },
  { label: "Email", href: "mailto:you@example.com", icon: Mail },
];

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item: Variants = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: spring } };

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto max-w-2xl text-center"
      >
        <motion.h2 variants={item} className="font-display text-3xl font-semibold text-white sm:text-4xl">
          Let&apos;s build something together
        </motion.h2>
        <motion.p variants={item} className="mt-5 leading-relaxed text-zinc-400">
          I&apos;m looking for my first front-end role and would love to hear about your team. If you have an opening
          or just want to say hello, my inbox is always open.
        </motion.p>

        <motion.ul variants={container} className="mt-10 flex justify-center gap-4">
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
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
                >
                  <Icon width={22} height={22} />
                </motion.a>
              </Magnetic>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}

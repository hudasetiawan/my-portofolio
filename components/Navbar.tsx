"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { snappy, spring } from "@/lib/motion";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={spring}
      className={`sticky top-0 z-50 border-b backdrop-blur-2xl backdrop-saturate-150 transition-colors duration-500 ${
        scrolled ? "border-border bg-nav-bg" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <motion.a
          href="#home"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          transition={snappy}
          className="font-display text-lg font-semibold tracking-tight text-on-surface"
        >
          Portofolio<span className="text-on-surface-muted"></span>
        </motion.a>

        {/* Desktop nav links */}
        <ul className="hidden items-center md:flex" onMouseLeave={() => setHovered(null)}>
          {links.map((l) => (
            <li key={l.href} className="relative" onMouseEnter={() => setHovered(l.href)}>
              <a
                href={l.href}
                className={`relative z-10 block px-4 py-2 text-sm transition-colors duration-300 ${
                  hovered === l.href ? "text-on-surface" : "text-on-surface-secondary"
                }`}
              >
                {l.label}
              </a>
              {hovered === l.href && (
                <motion.span
                  layoutId="nav-hover"
                  transition={snappy}
                  className="absolute inset-0 rounded-full bg-nav-hover-bg"
                />
              )}
            </li>
          ))}
        </ul>

        {/* Right side: theme toggle + mobile menu button */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <motion.button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            whileTap={{ scale: 0.9 }}
            transition={snappy}
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 p-2 text-on-surface-secondary transition-colors hover:text-on-surface md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>

        {/* Absolutely positioned so opening it never pushes page content */}
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={snappy}
              className="absolute inset-x-0 top-full flex flex-col border-b border-border bg-surface/95 px-6 py-3 backdrop-blur-xl md:hidden"
            >
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-on-surface-secondary transition-colors hover:text-on-surface"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>

      {/* Scroll progress hairline */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-on-surface/70"
      />
    </motion.header>
  );
}

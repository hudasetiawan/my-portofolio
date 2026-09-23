"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Code, ExternalLink, ImageIcon } from "lucide-react";
import { snappy, spring } from "@/lib/motion";

type Project = { title: string; description: string; tech: string[]; live: string; repo: string };

// Replace with your own projects
const projects: Project[] = [
  {
    title: "Project One",
    description: "A responsive dashboard with live charts, dark mode and a fully keyboard-accessible UI.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    live: "#",
    repo: "#",
  },
  {
    title: "Project Two",
    description: "An e-commerce storefront with cart state, product filtering and smooth page transitions.",
    tech: ["React", "Framer Motion", "Zustand"],
    live: "#",
    repo: "#",
  },
  {
    title: "Project Three",
    description: "A recipe-sharing app that uses a public API, infinite scroll and optimistic UI updates.",
    tech: ["React", "REST API", "CSS"],
    live: "#",
    repo: "#",
  },
  {
    title: "Project Four",
    description: "A personal blog with MDX content, SEO metadata and perfect Lighthouse scores.",
    tech: ["Next.js", "MDX", "Tailwind"],
    live: "#",
    repo: "#",
  },
];

export default function Projects() {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", duration: 30 });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Carousel progress hairline, smoothed with a spring
  const progress = useMotionValue(0);
  const smooth = useSpring(progress, { stiffness: 100, damping: 20 });
  const fill = useTransform(smooth, [0, 1], [0.15, 1]);

  useEffect(() => {
    if (!embla) return;
    const update = () => {
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
      progress.set(Math.min(1, Math.max(0, embla.scrollProgress())));
    };
    update();
    embla.on("select", update).on("scroll", update).on("reInit", update);
    return () => {
      embla.off("select", update).off("scroll", update).off("reInit", update);
    };
  }, [embla, progress]);

  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-full border border-border-hover text-on-surface-secondary transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-text disabled:pointer-events-none disabled:opacity-30";

  return (
    <section id="what-ive-built" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={spring}
          className="mb-10 flex items-end justify-between gap-6"
        >
          <h2 className="font-display text-3xl font-semibold text-on-surface sm:text-4xl">What I've Built</h2>
          <div className="flex gap-3">
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} transition={snappy} aria-label="Previous project" className={arrow} disabled={!canPrev} onClick={() => embla?.scrollPrev()}>
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} transition={snappy} aria-label="Next project" className={arrow} disabled={!canNext} onClick={() => embla?.scrollNext()}>
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Vertical padding + negative margin keeps the glow and lift from being clipped */}
        <div ref={emblaRef} className="-my-8 overflow-hidden py-8">
          <div className="-ml-5 flex">
            {projects.map((p, i) => (
              // Outer element handles the scroll reveal, inner article handles hover, so transforms never collide
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ ...spring, delay: i < 3 ? i * 0.12 : 0 }}
                className="min-w-0 shrink-0 grow-0 basis-[88%] pl-5 sm:basis-1/2 lg:basis-1/3"
              >
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={snappy}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface-alt to-surface-card transition-[border-color,box-shadow] duration-500 hover:border-border-hover hover:shadow-[0_0_40px_-12px_var(--glow)]"
                >
                  {/* Fixed aspect ratio + overflow-hidden = zoom without layout shift */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* Swap this div for <Image src=... fill className="object-cover ..." /> */}
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-placeholder-from via-placeholder-via to-placeholder-to transition-transform duration-700 ease-out will-change-transform group-hover:scale-105">
                      <ImageIcon size={36} className="text-on-surface-muted" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-semibold text-on-surface">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-on-surface-secondary">{p.description}</p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <li key={t} className="rounded-full border border-border bg-pill-bg px-3 py-1 text-xs text-pill-text">
                          {t}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex gap-5 text-sm">
                      <a href={p.live} className="flex items-center gap-1.5 text-on-surface-secondary transition-colors hover:text-on-surface">
                        <ExternalLink size={15} /> Live demo
                      </a>
                      <a href={p.repo} className="flex items-center gap-1.5 text-on-surface-secondary transition-colors hover:text-on-surface">
                        <Code size={15} /> Source
                      </a>
                    </div>
                  </div>
                </motion.article>
              </motion.div>
            ))}
          </div>
        </div>

        <div aria-hidden className="mt-10 h-px w-full bg-border">
          <motion.div style={{ scaleX: fill }} className="h-full origin-left bg-accent" />
        </div>
      </div>
    </section>
  );
}

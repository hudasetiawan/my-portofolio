"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ImageIcon, ChevronDown, Sparkles, Layers, Users, ArrowRight } from "lucide-react";
import { projects } from "@/data/projectsData";
import { getTechIcon } from "@/lib/techIcons";

const typeFilters = [
  { label: "All Types", value: "all" },
  { label: "Web Apps", value: "web" },
  { label: "Mobile Apps", value: "mobile" },
];

const categoryFilters = [
  { label: "All Categories", value: "all" },
  { label: "Personal", value: "personal" },
  { label: "Academic", value: "academic" },
  { label: "Internship", value: "internship" },
  { label: "Competition", value: "lomba" },
];

export default function Projects() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(2);

  const filteredProjects = projects.filter((item) => {
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesType && matchesCategory;
  });

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  const handleViewMore = () => {
    setVisibleCount(filteredProjects.length);
  };

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Header Seksi (Tanpa deskripsi bahasa Indonesia, tampil bersih & minimalis) */}
        <div className="mb-8 sm:mb-10 lg:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium uppercase tracking-widest text-on-surface-secondary mb-3 sm:mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
              Selected Works & Engineering
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-on-surface">
              Featured Projects
            </h2>
          </div>
        </div>

        {/* Panel Kontrol Filter */}
        <div className="mb-8 sm:mb-10 lg:mb-12 rounded-2xl sm:rounded-3xl border border-border bg-surface-card/60 p-4 sm:p-6 backdrop-blur-md shadow-sm">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-on-surface-secondary min-w-[70px] sm:min-w-[90px]">
                <Layers size={14} className="text-accent" /> Platform
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-1.5 bg-surface-alt p-1 rounded-xl sm:rounded-2xl border border-border/50 relative">
                {typeFilters.map((filter) => {
                  const isActive = selectedType === filter.value;
                  return (
                    <button
                      key={filter.value}
                      onClick={() => {
                        setSelectedType(filter.value);
                        setVisibleCount(2);
                      }}
                      className={`relative z-10 cursor-pointer rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                        isActive
                          ? "text-on-surface"
                          : "text-on-surface-secondary hover:text-on-surface"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTypePill"
                          className="absolute inset-0 bg-surface rounded-xl shadow-sm border border-border/60 z-[-1]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-on-surface-secondary min-w-[70px] sm:min-w-[90px]">
                <Sparkles size={14} className="text-accent" /> Category
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-1.5 bg-surface-alt p-1 rounded-xl sm:rounded-2xl border border-border/50 relative">
                {categoryFilters.map((filter) => {
                  const isActive = selectedCategory === filter.value;
                  return (
                    <button
                      key={filter.value}
                      onClick={() => {
                        setSelectedCategory(filter.value);
                        setVisibleCount(2);
                      }}
                      className={`relative z-10 cursor-pointer rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                        isActive
                          ? "text-on-surface"
                          : "text-on-surface-secondary hover:text-on-surface"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryPill"
                          className="absolute inset-0 bg-surface rounded-xl shadow-sm border border-border/60 z-[-1]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Grid Kartu Proyek */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:gap-8 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface-card shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:border-border-hover hover:shadow-[0_0_40px_-12px_var(--glow)] dark:shadow-none"
              >
                <div className="relative h-44 sm:h-56 lg:h-64 w-full bg-surface-alt/80 overflow-hidden border-b border-border/50 flex items-center justify-center p-3 sm:p-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-on-surface-secondary/40">
                      <ImageIcon size={48} strokeWidth={1} className="mb-2" />
                      <span className="text-xs font-medium">Project Mockup Preview</span>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex items-center gap-1.5 sm:gap-2">
                    {item.isTeam && (
                      <div className="flex items-center gap-1 rounded-full bg-surface/90 px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs font-semibold text-on-surface shadow-md backdrop-blur-md border border-border">
                        <Users size={12} className="text-accent" /> Team
                      </div>
                    )}
                    {item.featured && (
                      <div className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-surface/90 px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs font-bold text-on-surface shadow-md backdrop-blur-md border border-border">
                        <Sparkles size={12} className="text-accent" /> Featured
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-between flex-grow p-5 sm:p-6 lg:p-8">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-2 block">
                      {item.category}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-on-surface group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>

                    {item.isTeam && item.role && (
                      <p className="mt-1 text-xs font-medium text-accent">
                        Role: {item.role}
                      </p>
                    )}

                    <p className="mt-2.5 sm:mt-3 text-sm leading-relaxed text-on-surface-secondary line-clamp-3 sm:line-clamp-none">
                      {item.description}
                    </p>

                    <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2">
                      {item.tags.map((tag, idx) => (
                        <div
                          key={idx}
                          className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-surface-alt border border-border/65 shadow-sm transition-transform hover:scale-110"
                          title={tag}
                        >
                          {getTechIcon(tag, 20)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 pt-4 border-t border-border/50 flex items-center justify-between">
                    <Link
                      href={`/projects/${item.id}`}
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent hover:underline"
                    >
                      View Technical Case Study <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-16 text-center text-on-surface-secondary">
            <p className="text-sm">No projects found for this filter combination.</p>
          </div>
        )}

        {visibleCount < filteredProjects.length && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleViewMore}
              className="cursor-pointer flex items-center gap-2 rounded-2xl border border-border bg-surface-alt/80 px-6 py-3 text-sm font-semibold text-on-surface shadow-sm backdrop-blur-md transition-all duration-300 hover:border-border-hover hover:bg-surface hover:scale-105 active:scale-95"
            >
              View More Projects <ChevronDown size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
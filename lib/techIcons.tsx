import { type ReactNode } from "react";
import {
  SiNextdotjs, SiTypescript, SiJavascript, SiReact, SiHtml5, SiCss,
  SiTailwindcss, SiBootstrap, SiLaravel, SiPhp, SiMysql, SiNodedotjs,
  SiFigma, SiMiro, SiFramer, SiGit, SiGithub, SiPostman, SiNotion,
  SiDart, SiFlutter, SiPython, SiDocker, SiPostgresql, SiMongodb,
  SiRedis, SiFirebase, SiSupabase, SiPrisma, SiGraphql,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { Cpu } from "lucide-react";

/**
 * Central icon registry keyed by lowercase tech name.
 * Each entry carries a render function so the consuming component
 * can decide the `size` / `className` at call-site while keeping
 * the brand colour consistent.
 */
const iconRegistry: Record<string, (size: number, className?: string) => ReactNode> = {
  // ── Languages ──
  html5:          (s, c) => <SiHtml5       className={c ?? "text-[#E34F26]"} size={s} />,
  html:           (s, c) => <SiHtml5       className={c ?? "text-[#E34F26]"} size={s} />,
  css3:           (s, c) => <SiCss         className={c ?? "text-[#1572B6]"} size={s} />,
  css:            (s, c) => <SiCss         className={c ?? "text-[#1572B6]"} size={s} />,
  javascript:     (s, c) => <SiJavascript  className={c ?? "text-[#F7DF1E]"} size={s} />,
  typescript:     (s, c) => <SiTypescript  className={c ?? "text-[#3178C6]"} size={s} />,
  php:            (s, c) => <SiPhp         className={c ?? "text-[#777BB4]"} size={s} />,
  dart:           (s, c) => <SiDart        className={c ?? "text-[#0175C2]"} size={s} />,
  python:         (s, c) => <SiPython      className={c ?? "text-[#3776AB]"} size={s} />,

  // ── Frameworks / Libraries ──
  react:          (s, c) => <SiReact       className={c ?? "text-[#61DAFB]"} size={s} />,
  "next.js":      (s, c) => <SiNextdotjs   className={c ?? "text-current"} size={s} />,
  nextjs:         (s, c) => <SiNextdotjs   className={c ?? "text-current"} size={s} />,
  laravel:        (s, c) => <SiLaravel     className={c ?? "text-[#FF2D20]"} size={s} />,
  "node.js":      (s, c) => <SiNodedotjs   className={c ?? "text-[#339933]"} size={s} />,
  nodejs:         (s, c) => <SiNodedotjs   className={c ?? "text-[#339933]"} size={s} />,
  flutter:        (s, c) => <SiFlutter     className={c ?? "text-[#02569B]"} size={s} />,
  "framer motion": (s, c) => <SiFramer     className={c ?? "text-current"} size={s} />,
  framer:         (s, c) => <SiFramer      className={c ?? "text-current"} size={s} />,

  // ── CSS Frameworks ──
  "tailwind css":  (s, c) => <SiTailwindcss className={c ?? "text-[#06B6D4]"} size={s} />,
  tailwindcss:     (s, c) => <SiTailwindcss className={c ?? "text-[#06B6D4]"} size={s} />,
  tailwind:        (s, c) => <SiTailwindcss className={c ?? "text-[#06B6D4]"} size={s} />,
  bootstrap:       (s, c) => <SiBootstrap   className={c ?? "text-[#7952B3]"} size={s} />,

  // ── Databases ──
  mysql:          (s, c) => <SiMysql       className={c ?? "text-[#4479A1]"} size={s} />,
  postgresql:     (s, c) => <SiPostgresql  className={c ?? "text-[#4169E1]"} size={s} />,
  mongodb:        (s, c) => <SiMongodb     className={c ?? "text-[#47A248]"} size={s} />,
  redis:          (s, c) => <SiRedis       className={c ?? "text-[#DC382D]"} size={s} />,
  firebase:       (s, c) => <SiFirebase    className={c ?? "text-[#FFCA28]"} size={s} />,
  supabase:       (s, c) => <SiSupabase    className={c ?? "text-[#3ECF8E]"} size={s} />,
  prisma:         (s, c) => <SiPrisma      className={c ?? "text-zinc-900 dark:text-white"} size={s} />,
  graphql:        (s, c) => <SiGraphql     className={c ?? "text-[#E10098]"} size={s} />,

  // ── Tools ──
  figma:          (s, c) => <SiFigma       className={c ?? "text-[#F24E1E]"} size={s} />,
  miro:           (s, c) => <SiMiro        className={c ?? "text-[#050038]"} size={s} />,
  git:            (s, c) => <SiGit         className={c ?? "text-[#F05032]"} size={s} />,
  github:         (s, c) => <SiGithub      className={c ?? "text-black dark:text-white"} size={s} />,
  "vs code":      (s, c) => <VscVscode     className={c ?? "text-[#007ACC]"} size={s} />,
  vscode:         (s, c) => <VscVscode     className={c ?? "text-[#007ACC]"} size={s} />,
  postman:        (s, c) => <SiPostman     className={c ?? "text-[#FF6C37]"} size={s} />,
  notion:         (s, c) => <SiNotion      className={c ?? "text-black dark:text-white"} size={s} />,
  docker:         (s, c) => <SiDocker      className={c ?? "text-[#2496ED]"} size={s} />,

  // ── Misc ──
  "api integration": (s, c) => <Cpu        className={c ?? "text-accent"} size={s} />,
  "rest api":     (s, c) => <Cpu           className={c ?? "text-accent"} size={s} />,
};

/**
 * Returns the branded react-icons icon for a given tech name.
 * Falls back to a generic CPU chip icon if no match is found.
 */
export function getTechIcon(tag: string, size = 20, className?: string): ReactNode {
  const render = iconRegistry[tag.toLowerCase()];
  if (render) return render(size, className);
  return <Cpu className={className ?? "text-accent"} size={size} />;
}

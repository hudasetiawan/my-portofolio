"use client";

import { motion } from "framer-motion";
import { 
  SiNextdotjs, SiTypescript, SiJavascript, SiReact, SiHtml5, SiCss, 
  SiTailwindcss, SiBootstrap, SiLaravel, SiPhp, SiMysql, SiNodedotjs, 
  SiFigma, SiMiro, SiFramer, SiGit, SiGithub, SiPostman, SiNotion
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc"; 
import { Code2, PenTool } from "lucide-react";
import TextType from "./TextType"; 
// Import TargetCursor component
import TargetCursor from "./TargetCursor";

const mainIcons = [
  { icon: <SiHtml5 className="text-[#E34F26]" />, name: "HTML5" },
  { icon: <SiCss className="text-[#1572B6]" />, name: "CSS3" },
  { icon: <SiJavascript className="text-[#F7DF1E]" />, name: "JavaScript" },
  { icon: <SiTypescript className="text-[#3178C6]" />, name: "TypeScript" },
  { icon: <SiReact className="text-[#61DAFB]" />, name: "React" },
  { icon: <SiNextdotjs className="text-zinc-900 dark:text-white" />, name: "Next.js" },
  { icon: <SiTailwindcss className="text-[#06B6D4]" />, name: "Tailwind" },
  { icon: <SiBootstrap className="text-[#7952B3]" />, name: "Bootstrap" },
  { icon: <SiPhp className="text-[#777BB4]" />, name: "PHP" },
  { icon: <SiLaravel className="text-[#FF2D20]" />, name: "Laravel" },
  { icon: <SiMysql className="text-[#4479A1]" />, name: "MySQL" },
  { icon: <SiNodedotjs className="text-[#339933]" />, name: "Node.js" },
  { icon: <SiFigma className="text-[#F24E1E]" />, name: "Figma" },
  { icon: <SiFramer className="text-black dark:text-white" />, name: "Framer" },
  { icon: <SiMiro className="text-[#050038]" />, name: "Miro" },
  { icon: <SiGit className="text-[#F05032]" />, name: "Git" },
  { icon: <SiGithub className="text-black dark:text-white" />, name: "GitHub" },
  { icon: <VscVscode className="text-[#007ACC]" />, name: "VS Code" },
  { icon: <SiPostman className="text-[#FF6C37]" />, name: "Postman" },
  { icon: <SiNotion className="text-black dark:text-white" />, name: "Notion" },
];

const capabilities = [
  {
    id: "01",
    title: "Web Engineering",
    icon: <Code2 size={24} className="text-blue-500" />,
    desc: "Building responsive interfaces and robust backend systems. Experienced in designing data-driven application architectures using modern frameworks with a strong focus on performance.",
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Laravel", "MySQL", "API Integration"]
  },
  {
    id: "02",
    title: "UI/UX Design",
    icon: <PenTool size={24} className="text-pink-500" />,
    desc: "Designing user-centered interfaces applying Design Thinking methodologies. Focused on intuitive navigation, accessibility, and maintaining consistent design systems.",
    tags: ["Figma", "Design Thinking", "Wireframing", "Prototyping", "User Research", "Miro"]
  }
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-24 relative overflow-hidden">
      {/* Tambahkan TargetCursor secara lokal di seksi ini */}
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={false} // Anda bisa ubah ini ke true jika ingin kursor asli hilang
        parallaxOn={true}
        cursorColor="#a1a1aa" // Warna abu-abu yang serasi dengan tema zinc
        cursorColorOnTarget="#ffffff"
      />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 items-center">
          
          {/* KOLOM KIRI: Teks & Grid Ikon */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-on-surface-secondary mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-on-surface-secondary"></span>
                My Capabilities
              </div>
              
              <div className="min-h-32 sm:min-h-36 flex items-start">
                <TextType 
                  as="h2"
                  text={[
                    "What I Can Do", 
                    "How I Create", 
                    "My Tech Stack"
                  ]}
                  typingSpeed={80}
                  deletingSpeed={40}
                  pauseDuration={2500}
                  showCursor={true}
                  cursorCharacter="|"
                  className="font-display text-4xl font-bold tracking-tight text-on-surface sm:text-5xl"
                />
              </div>

              <p className="mt-4 text-lg text-on-surface-secondary leading-relaxed max-w-md">
                I combine technical expertise, logical problem-solving, and a keen eye for design to build reliable and user-friendly digital solutions.
              </p>

              {/* Grid Ikon */}
              <div className="mt-10 grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-fit">
                {mainIcons.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.03, duration: 0.4 }}
                    // Tambahkan class 'cursor-target' pada elemen ini
                    className="cursor-target group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-alt/50 border border-border/50 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:bg-surface hover:shadow-lg hover:border-border-hover hover:z-50"
                  >
                    <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </span>
                    
                    <div className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1 whitespace-nowrap bg-zinc-900 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg dark:bg-white dark:text-zinc-900 z-50 shadow-xl border border-white/10 dark:border-black/10">
                      {item.name}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-zinc-900 dark:border-t-white"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Kartu Kategori */}
          <div className="col-span-1 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            {capabilities.map((cap, idx) => (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                // Tambahkan class 'cursor-target' pada elemen ini
                className="cursor-target group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface-card p-8 shadow-sm transition-all duration-500 hover:border-border-hover hover:bg-surface hover:shadow-[0_0_40px_-15px_var(--glow)] dark:shadow-none min-h-[420px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-surface-alt/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-alt border border-border/50 shadow-inner">
                      {cap.icon}
                    </div>
                    <span className="font-display text-4xl font-bold text-on-surface-secondary opacity-20 transition-opacity duration-300 group-hover:opacity-40">
                      {cap.id}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-on-surface mb-4 group-hover:text-accent transition-colors duration-300">
                    {cap.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-on-surface-secondary">
                    {cap.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-8 flex flex-wrap gap-2 pt-6 border-t border-border/50">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-surface-alt/80 px-3 py-1.5 text-xs font-semibold text-on-surface border border-border/50 transition-colors duration-300 hover:bg-on-surface hover:text-background"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
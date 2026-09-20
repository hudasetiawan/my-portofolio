import { Atom, Braces, Code, FileCode2, GitBranch, PenTool, Sparkles, Triangle, Wind, type LucideIcon } from "lucide-react";

const stack: { name: string; icon: LucideIcon }[] = [
  { name: "React", icon: Atom },
  { name: "Next.js", icon: Triangle },
  { name: "TypeScript", icon: FileCode2 },
  { name: "JavaScript", icon: Braces },
  { name: "Tailwind CSS", icon: Wind },
  { name: "Framer Motion", icon: Sparkles },
  { name: "HTML & CSS", icon: Code },
  { name: "Git & GitHub", icon: GitBranch },
  { name: "Figma", icon: PenTool },
];

export default function TechStack() {
  return (
    <section id="skills" className="py-20">
      <h2 className="mb-10 px-6 text-center font-display text-2xl font-semibold text-zinc-100 sm:text-3xl">
        The tools I build with
      </h2>

      <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        {/* Two identical lists; the track slides -50% for a seamless loop */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-4 pr-4">
              {stack.map(({ name, icon: Icon }) => (
                <li
                  key={name}
                  className="flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/60 px-5 py-3 text-sm text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
                >
                  <Icon size={18} className="text-zinc-400" />
                  {name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

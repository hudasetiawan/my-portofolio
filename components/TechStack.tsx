"use client";

import FolderFloat from "./FolderFloat";

const folderTheme = {
  folderColor: "#18181b", // zinc-900 
  frontColor: "#27272a",  // zinc-800
  paperColor: "#f4f4f5",  // zinc-100
  itemColor: "#e4e4e7",   // zinc-200
  itemTextColor: "#18181b",
  labelColor: "#a1a1aa",  // zinc-400
};

export default function TechStack() {
  return (
    <section id="tech-stack" className="mx-auto w-full max-w-6xl px-6 py-24">
      
      {/* Header Seksi */}
      <div className="mb-12">
        <h2 className="font-display text-4xl font-bold tracking-tight text-on-surface sm:text-5xl">
          What I Can Do
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-on-surface-secondary">
          Membangun solusi digital yang andal dengan menggabungkan keahlian teknis, pemecahan masalah, dan pemahaman mendalam tentang pengalaman pengguna.
        </p>
      </div>

      {/* Grid Utama */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* KARTU 01: Web Engineering */}
        <div className="group flex h-[480px] flex-col justify-between overflow-hidden rounded-3xl border border-border-hover bg-surface/30 p-8 transition-colors hover:bg-surface/50">
          <div>
            <span className="mb-4 inline-block font-display text-lg font-bold text-on-surface-secondary opacity-50">01</span>
            <h3 className="font-display text-2xl font-semibold text-on-surface">Web Engineering</h3>
            <p className="mt-4 text-sm leading-relaxed text-on-surface-secondary">
              Membangun antarmuka responsif dan sistem backend yang andal. Berpengalaman merancang arsitektur aplikasi berbasis data menggunakan framework modern.
            </p>
          </div>
          
          <div className="flex h-32 w-full items-end justify-center pb-4">
            <FolderFloat 
              {...folderTheme}
              label="Tech Stack"
              sublabel="Core technologies"
              items={["Next.js", "TypeScript", "React", "Tailwind CSS", "Laravel", "MySQL"]}
              spread={110} 
              lift={30}
              width={160}
            />
          </div>
        </div>

        {/* KARTU 02: UI/UX Design */}
        <div className="group flex h-[480px] flex-col justify-between overflow-hidden rounded-3xl border border-border-hover bg-surface/30 p-8 transition-colors hover:bg-surface/50">
          <div>
            <span className="mb-4 inline-block font-display text-lg font-bold text-on-surface-secondary opacity-50">02</span>
            <h3 className="font-display text-2xl font-semibold text-on-surface">UI/UX Design</h3>
            <p className="mt-4 text-sm leading-relaxed text-on-surface-secondary">
              Merancang antarmuka berpusat pada pengguna dengan metodologi Design Thinking. Berfokus pada navigasi yang intuitif dan sistem desain yang konsisten.
            </p>
          </div>
          
          <div className="flex h-32 w-full items-end justify-center pb-4">
            <FolderFloat 
              {...folderTheme}
              label="Design Tools"
              sublabel="Workflow & Assets"
              items={["Figma", "Design Thinking", "Wireframing", "Prototyping", "User Research"]}
              spread={110}
              lift={30}
              width={160}
            />
          </div>
        </div>

        {/* KARTU 03: Leadership & Edu */}
        <div className="group flex h-[480px] flex-col justify-between overflow-hidden rounded-3xl border border-border-hover bg-surface/30 p-8 transition-colors hover:bg-surface/50">
          <div>
            <span className="mb-4 inline-block font-display text-lg font-bold text-on-surface-secondary opacity-50">03</span>
            <h3 className="font-display text-2xl font-semibold text-on-surface">Leadership & Edu</h3>
            <p className="mt-4 text-sm leading-relaxed text-on-surface-secondary">
              Mengoordinasikan tim lintas fungsi, memimpin inisiatif teknologi komunitas, dan merancang kurikulum pengajaran IT untuk mencetak talenta digital.
            </p>
          </div>
          
          <div className="flex h-32 w-full items-end justify-center pb-4">
            <FolderFloat 
              {...folderTheme}
              label="Capabilities"
              sublabel="Soft skills & Certs"
              items={["Google PM Cert", "Team Leadership", "IT Educator", "Mapres 2025", "Agile"]}
              spread={110}
              lift={30}
              width={160}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
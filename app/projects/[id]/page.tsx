import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projectsData";
import { ArrowLeft, ExternalLink, Code2, Calendar, Users, Layers, CheckCircle2, AlertCircle, User } from "lucide-react";
import { getTechIcon } from "@/lib/techIcons";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background text-on-surface">
            <div className="mx-auto max-w-4xl">

                {/* Tombol Kembali */}
                <div className="mb-8">
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-on-surface-secondary hover:text-on-surface transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to Portfolio
                    </Link>
                </div>

                {/* Header Proyek */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                    <span className="rounded-full bg-surface-alt px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-accent border border-border">
                        {project.category}
                    </span>
                    <span className="rounded-full bg-surface-alt px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-on-surface-secondary border border-border">
                        {project.type.toUpperCase()}
                    </span>

                    {/* Ubah logika ini: Tampilkan Role jika data role ada, tidak peduli isTeam true atau false */}
                    {project.role && (
                        <span className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-surface-alt px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold text-on-surface border border-border">
                            {/* Anda bisa mengubah ikon dinamis berdasarkan isTeam */}
                            {project.isTeam ? (
                                <Users size={12} className="text-accent" />
                            ) : (
                                <User size={12} className="text-accent" />
                            )}
                            Role: {project.role}
                        </span>
                    )}
                </div>

                <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-on-surface mb-2 sm:mb-3">
                    {project.title}
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-secondary leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                    {project.description}
                </p>

                {/* Mockup / Gambar Utama */}
                <div className="relative h-48 sm:h-72 lg:h-[420px] w-full rounded-2xl sm:rounded-3xl bg-surface-alt overflow-hidden border border-border mb-8 sm:mb-12 flex items-center justify-center p-3 sm:p-6 shadow-sm">
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover rounded-xl sm:rounded-2xl"
                        />
                    ) : (
                        <div className="text-center text-on-surface-secondary/50">
                            <p className="text-sm font-medium">Project Preview Mockup</p>
                        </div>
                    )}
                </div>

                {/* Grid Informasi Detail & Tombol Aksi */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">

                    {/* Kolom Kiri: Studi Kasus & Arsitektur */}
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-base sm:text-lg font-bold font-display mb-2 sm:mb-3 flex items-center gap-2">
                                <CheckCircle2 size={18} className="text-accent" /> Overview & Objective
                            </h3>
                            <p className="text-xs sm:text-sm leading-relaxed text-on-surface-secondary">
                                {project.fullDescription}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-base sm:text-lg font-bold font-display mb-2 sm:mb-3 flex items-center gap-2">
                                <Layers size={18} className="text-accent" /> Engineering & Architecture
                            </h3>
                            <p className="text-xs sm:text-sm leading-relaxed text-on-surface-secondary">
                                {project.architecture}
                            </p>
                        </div>

                        {project.challenges && (
                            <div>
                                <h3 className="text-base sm:text-lg font-bold font-display mb-2 sm:mb-3 flex items-center gap-2">
                                    <AlertCircle size={18} className="text-accent" /> Key Challenges & Solutions
                                </h3>
                                <p className="text-xs sm:text-sm leading-relaxed text-on-surface-secondary">
                                    {project.challenges}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Kolom Kanan: Meta Info & Tautan */}
                    <div className="rounded-2xl sm:rounded-3xl border border-border bg-surface-card p-4 sm:p-6 h-fit space-y-4 sm:space-y-6">
                        <div>
                            <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-on-surface-secondary mb-2 sm:mb-3">
                                Completion Date
                            </h4>
                            <p className="text-xs sm:text-sm font-semibold flex items-center gap-2">
                                <Calendar size={16} className="text-accent" /> {project.date}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-on-surface-secondary mb-2 sm:mb-3">
                                Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-2 sm:gap-2.5">
                                {project.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="flex items-center gap-2 rounded-lg sm:rounded-xl bg-surface-alt px-3 py-1.5 sm:px-3.5 sm:py-2 text-[10px] sm:text-xs font-medium text-on-surface border border-border/65 shadow-sm"
                                    >
                                        {getTechIcon(tag, 16)}
                                        <span>{tag}</span>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-3 sm:pt-4 border-t border-border/50 flex flex-col gap-2.5 sm:gap-3">
                            {/* Tombol Live Demo / Prototype Dinamis */}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-border bg-surface text-on-surface py-2.5 px-3.5 sm:py-3 sm:px-4 text-[10px] sm:text-xs font-semibold transition-all duration-300 hover:bg-surface-alt shadow-sm"
                                >
                                    {project.liveUrl.includes("figma.com")
                                        ? "View Figma Prototype"
                                        : "Live Demo"}
                                    <ExternalLink size={14} />
                                </a>
                            )}

                            {/* Tombol Source Code */}
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-border bg-surface text-on-surface py-2.5 px-3.5 sm:py-3 sm:px-4 text-[10px] sm:text-xs font-semibold transition-all duration-300 hover:bg-surface-alt shadow-sm"
                                >
                                    Source Code <Code2 size={14} />
                                </a>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}
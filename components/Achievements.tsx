"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trophy, Medal, Award, X, ImageIcon, Calendar, GraduationCap,
    ChevronLeft, ChevronRight
} from "lucide-react";

const achievements = [
    {
        id: "cum-laude-2026",
        title: "Cum Laude Honors",
        category: "Academic Honor",
        issuer: "Universitas Negeri Yogyakarta",
        date: "2026",
        icon: GraduationCap,
        description: "Graduated with Cum Laude honors (GPA 3.87/4.00), demonstrating consistent academic excellence and a strong mastery of software engineering principles throughout the degree.",
        images: [
            "/img/wisuda/wisuda1.JPG",
            "/img/wisuda/wisuda2.JPG",
            "/img/wisuda/wisuda3.JPG",
            "/img/wisuda/wisuda4.JPG"
        ],
    },
    {
        id: "mapres-2025",
        title: "Outstanding Student (Mapres)",
        category: "Award",
        issuer: "Universitas Negeri Yogyakarta",
        date: "2025",
        icon: Trophy,
        description: "Awarded as the most outstanding student of the university, recognizing excellence in academic performance, leadership, and contribution to technology driven community programs.",
        images: [
            "/img/mapres/mapres1.jpg",
            "/img/mapres/mapres2.jpg",
            "/img/mapres/mapres3.jpg"
        ],
    },
    {
        id: "unity-2024",
        title: "1st Honorable Mention",
        category: "Competition",
        issuer: "UNITY Programming Contest",
        date: "2024",
        icon: Medal,
        description: "Achieved 1st honorable mention in a highly competitive programming category. Demonstrated advanced problem-solving skills, algorithmic efficiency, and teamwork under strict time limits.",
        images: [
            "/img/unity/unity1.jpg",
            "/img/unity/unity2.jpg",
            "/img/unity/unity3.jpg",
            "/img/unity/unity4.jpg"
        ],
    }
];

export default function Achievements() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = "hidden";
            setCurrentImgIndex(0);
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedId]);

    // Fungsi navigasi Carousel
    const nextImage = (e: React.MouseEvent, totalImages: number) => {
        e.stopPropagation();
        setCurrentImgIndex((prev) => (prev + 1) % totalImages);
    };
    const prevImage = (e: React.MouseEvent, totalImages: number) => {
        e.stopPropagation();
        setCurrentImgIndex((prev) => (prev - 1 + totalImages) % totalImages);
    };

    return (
        <section id="achievements" className="py-20 relative">
            <div className="mx-auto max-w-6xl px-6">

                {/* Header Seksi */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-on-surface-secondary mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-on-surface-secondary"></span>
                        Social Proof
                    </div>
                    <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
                        Recognitions & Milestones
                    </h2>
                </div>

                {/* Grid Kartu Utama (SPLIT CARD DESIGN) */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {achievements.map((item) => (
                        <motion.div
                            key={item.id}
                            layoutId={`card-container-${item.id}`}
                            onClick={() => setSelectedId(item.id)}
                            className="group cursor-pointer flex flex-col overflow-hidden rounded-3xl border border-border bg-surface-card shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:border-border-hover hover:shadow-[0_0_40px_-12px_var(--glow)] dark:shadow-none h-[380px]"
                        >
                            {/* Bagian Atas: Hero Image (60%) */}
                            <motion.div
                                layoutId={`image-container-${item.id}`}
                                className="relative h-3/5 w-full bg-surface-alt overflow-hidden border-b border-border/50"
                            >
                                {/* Overlay Hitam transparan yang memudar saat di-hover */}
                                <div className="absolute inset-0 bg-black/40 z-10 transition-colors duration-500 group-hover:bg-black/10 dark:bg-black/60 dark:group-hover:bg-black/20" />

                                {item.images && item.images.length > 0 ? (
                                    <img
                                        src={item.images[0]}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-on-surface-secondary/40 z-0">
                                        <ImageIcon size={40} strokeWidth={1} className="mb-2 transition-transform duration-700 group-hover:scale-110" />
                                        <span className="text-xs font-medium">Add Image</span>
                                    </div>
                                )}

                                {/* Lencana Kategori di pojok gambar */}
                                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm backdrop-blur-md border border-black/10 dark:bg-zinc-900/90 dark:text-zinc-100 dark:border-white/10">
                                    <item.icon size={14} className="text-zinc-900 dark:text-zinc-100" />
                                    {item.category}
                                </div>
                            </motion.div>

                            {/* Bagian Bawah: Informasi Detail (40%) */}
                            <motion.div
                                layoutId={`text-container-${item.id}`}
                                className="flex h-2/5 flex-col justify-center p-6 bg-gradient-to-br from-surface-alt/30 to-transparent"
                            >
                                <motion.h3 layoutId={`title-${item.id}`} className="font-display text-xl font-semibold text-on-surface line-clamp-1">
                                    {item.title}
                                </motion.h3>
                                <motion.p layoutId={`issuer-${item.id}`} className="mt-1 text-sm text-on-surface-secondary line-clamp-1">
                                    {item.issuer}
                                </motion.p>
                                <div className="mt-auto flex items-center justify-between text-xs font-medium text-on-surface-secondary pt-4">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                                    <span className="text-accent group-hover:underline">View details &rarr;</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Pop-Up Modal (Expandable Card) */}
            <AnimatePresence>
                {selectedId && (
                    <>
                        {/* Latar Belakang Blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md"
                        />

                        {/* Kontainer Pop-Up Tengah */}
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 xl:p-0 pointer-events-none">
                            {achievements.map((item) => {
                                if (item.id !== selectedId) return null;
                                const hasImages = item.images && item.images.length > 0;

                                return (
                                    <motion.div
                                        key={item.id}
                                        layoutId={`card-container-${item.id}`}
                                        className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl pointer-events-auto md:flex-row md:h-[550px]"
                                    >
                                        {/* Tombol Tutup */}
                                        <button
                                            onClick={() => setSelectedId(null)}
                                            className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-black/40 dark:bg-white/20 dark:text-on-surface dark:hover:bg-white/40"
                                        >
                                            <X size={20} />
                                        </button>

                                        {/* Kolom Kiri: CAROUSEL GAMBAR */}
                                        <motion.div
                                            layoutId={`image-container-${item.id}`}
                                            className="relative flex h-64 w-full flex-shrink-0 items-center justify-center bg-surface-alt md:h-full md:w-1/2 overflow-hidden group/carousel"
                                        >
                                            {hasImages ? (
                                                <>
                                                    <motion.img
                                                        key={currentImgIndex}
                                                        src={item.images[currentImgIndex]}
                                                        alt={`${item.title} - Foto ${currentImgIndex + 1}`}
                                                        className="h-full w-full object-cover"
                                                        initial={{ opacity: 0, scale: 1.05 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.4 }}
                                                    />

                                                    {item.images.length > 1 && (
                                                        <>
                                                            <button
                                                                onClick={(e) => prevImage(e, item.images.length)}
                                                                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur-md transition-all hover:bg-black/50 group-hover/carousel:opacity-100"
                                                            >
                                                                <ChevronLeft size={24} />
                                                            </button>
                                                            <button
                                                                onClick={(e) => nextImage(e, item.images.length)}
                                                                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur-md transition-all hover:bg-black/50 group-hover/carousel:opacity-100"
                                                            >
                                                                <ChevronRight size={24} />
                                                            </button>
                                                            {/* Indikator Titik (Dots) */}
                                                            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                                                                {item.images.map((_, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImgIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center gap-3 text-on-surface-secondary/50">
                                                    <ImageIcon size={48} strokeWidth={1} />
                                                    <p className="text-sm font-medium">Dokumentasi Foto Belum Tersedia</p>
                                                </div>
                                            )}
                                        </motion.div>

                                        {/* Kolom Kanan: DETAIL TEKS */}
                                        <motion.div
                                            layoutId={`text-container-${item.id}`}
                                            className="flex flex-col justify-center p-8 md:w-1/2 md:p-12 bg-surface"
                                        >
                                            <motion.div layoutId={`title-${item.id}`} className="font-display text-3xl font-bold text-on-surface sm:text-4xl">
                                                {item.title}
                                            </motion.div>

                                            <motion.div layoutId={`issuer-${item.id}`} className="mt-2 text-lg font-medium text-accent flex items-center gap-2">
                                                <item.icon size={20} />
                                                {item.issuer}
                                            </motion.div>

                                            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-medium text-on-surface-secondary border-y border-border/50 py-4">
                                                <span className="flex items-center gap-1.5 rounded-full bg-surface-alt px-3 py-1 text-on-surface">
                                                    {item.category}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar size={16} />
                                                    {item.date}
                                                </span>
                                            </div>

                                            {/* Deskripsi (Faded In) */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="mt-6 flex-1 overflow-y-auto pr-2 custom-scrollbar"
                                            >
                                                <p className="leading-relaxed text-on-surface-secondary text-base">
                                                    {item.description}
                                                </p>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
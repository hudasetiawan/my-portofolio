"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Calendar, X, ImageIcon, CheckCircle2, ChevronDown } from "lucide-react";

const certifications = [
    // --- COURSERA (7) ---
    { id: "coursera-1", title: "Google Project Management Professional Certificate", platform: "Coursera", category: "coursera", issuer: "Google", date: "May 2025", credentialId: "5CG8SM9YYQOJ", verifyUrl: "https://coursera.org/verify/professional-cert/5CG8SM9YYQOJ", images: ["/img/certs/coursera7.png"], description: "Professional Certificate recognizing completion of 6 comprehensive project management courses covering traditional, agile, and hybrid methodologies." },
    { id: "coursera-2", title: "Foundations of Project Management", platform: "Coursera", category: "coursera", issuer: "Google", date: "Mar 2025", credentialId: "T3FZ8B7ADS2P", verifyUrl: "https://coursera.org/verify/T3FZ8B7ADS2P", images: ["/img/certs/coursera1.png"], description: "Learned foundational project management terminology, methodologies, and the role of a project manager." },
    { id: "coursera-3", title: "Project Initiation: Starting a Successful Project", platform: "Coursera", category: "coursera", issuer: "Google", date: "Mar 2025", credentialId: "DMYQW62J6K8D", verifyUrl: "https://coursera.org/verify/DMYQW62J6K8D", images: ["/img/certs/coursera2.png"], description: "Learned how to define project goals, set deliverables, identify stakeholders, and create project charters." },
    { id: "coursera-4", title: "Project Planning: Putting It All Together", platform: "Coursera", category: "coursera", issuer: "Google", date: "Apr 2025", credentialId: "AF7JZ678723T", verifyUrl: "https://coursera.org/verify/AF7JZ678723T", images: ["/img/certs/coursera3.png"], description: "Built comprehensive project plans, managed project timelines, estimated budgets, and assessed risks." },
    { id: "coursera-5", title: "Project Execution: Running the Project", platform: "Coursera", category: "coursera", issuer: "Google", date: "May 2025", credentialId: "697P2ASTPFZX", verifyUrl: "https://coursera.org/verify/697P2ASTPFZX", images: ["/img/certs/coursera4.png"], description: "Managed project execution, quality, communication, and process improvements during project lifecycles." },
    { id: "coursera-6", title: "Agile Project Management", platform: "Coursera", category: "coursera", issuer: "Google", date: "May 2025", credentialId: "4SRFRXZV670D", verifyUrl: "https://coursera.org/verify/4SRFRXZV670D", images: ["/img/certs/coursera5.png"], description: "Mastered Agile and Scrum frameworks, artifacts, sprint planning, and team collaboration." },
    { id: "coursera-7", title: "Capstone: Applying Project Management in the Real World", platform: "Coursera", category: "coursera", issuer: "Google", date: "May 2025", credentialId: "ZV4JHA58B73L", verifyUrl: "https://coursera.org/verify/ZV4JHA58B73L", images: ["/img/certs/coursera6.png"], description: "Applied practical project management skills through a simulated hands-on capstone project scenario." },

    // --- DICODING (7) ---
    { id: "dicoding-1", title: "Belajar Dasar Pemrograman Web", platform: "Dicoding", category: "dicoding", issuer: "Dicoding Indonesia", date: "25 Juni 2024", credentialId: "98XW8RDY0PM3", verifyUrl: "https://www.dicoding.com/certificates/98XW8RDY0PM3", images: ["/img/certs/dicoding1.png"], description: "Mempelajari dasar pembuatan halaman web menggunakan HTML dan CSS secara terstruktur dan responsif." },
    { id: "dicoding-2", title: "Belajar Membuat Front-End Web untuk Pemula", platform: "Dicoding", category: "dicoding", issuer: "Dicoding Indonesia", date: "25 Juni 2024", credentialId: "ERZR7MRNNZYV", verifyUrl: "https://www.dicoding.com/certificates/ERZR7MRNNZYV", images: ["/img/certs/dicoding2.png"], description: "Mempelajari DOM manipulation, Web Storage, ES6, dan dasar perancangan antarmuka front-end web interaktif." },
    { id: "dicoding-3", title: "Belajar Dasar Pemrograman JavaScript", platform: "Dicoding", category: "dicoding", issuer: "Dicoding Indonesia", date: "26 Juni 2024", credentialId: "53XEM02GOPRN", verifyUrl: "https://www.dicoding.com/certificates/53XEM02GOPRN", images: ["/img/certs/dicoding3.png"], description: "Menguasai sintaks dasar JavaScript, logika pemrograman, function, object, hingga asynchronous programming." },
    { id: "dicoding-4", title: "Belajar Dasar Structured Query Language (SQL)", platform: "Dicoding", category: "dicoding", issuer: "Dicoding Indonesia", date: "19 Oktober 2023", credentialId: "NVP7835Q4XR0", verifyUrl: "https://www.dicoding.com/certificates/NVP7835Q4XR0", images: ["/img/certs/dicoding4.png"], description: "Mempelajari pengelolaan basis data relasional, perintah DDL, DML, penggabungan tabel (JOIN), dan kueri data." },
    { id: "dicoding-5", title: "Belajar Dasar Git dengan GitHub", platform: "Dicoding", category: "dicoding", issuer: "Dicoding Indonesia", date: "20 Oktober 2023", credentialId: "MRZMLR1MKXYQ", verifyUrl: "https://www.dicoding.com/certificates/MRZMLR1MKXYQ", images: ["/img/certs/dicoding5.png"], description: "Memahami sistem kontrol versi menggunakan Git, branching, manajemen repositori, serta kolaborasi via GitHub." },
    { id: "dicoding-6", title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software", platform: "Dicoding", category: "dicoding", issuer: "Dicoding Indonesia", date: "20 Oktober 2023", credentialId: "N9ZO5Q39RPG5", verifyUrl: "https://www.dicoding.com/certificates/N9ZO5Q39RPG5", images: ["/img/certs/dicoding6.png"], description: "Membangun pola pikir komputasional dan fondasi fundamental yang wajib dikuasai seorang software developer." },
    { id: "dicoding-7", title: "Memulai Pemrograman dengan Haskell", platform: "Dicoding", category: "dicoding", issuer: "Dicoding Indonesia", date: "20 Oktober 2023", credentialId: "OLZ0QM050Z65", verifyUrl: "https://www.dicoding.com/certificates/OLZ0QM050Z65", images: ["/img/certs/dicoding7.png"], description: "Mempelajari paradigma pemrograman fungsional murni menggunakan bahasa Haskell." },

    // --- CODEPOLITAN (1) ---
    { id: "codepolitan-1", title: "Belajar Dasar HTML", platform: "Codepolitan", category: "codepolitan", issuer: "Codepolitan", date: "31 Januari 2024", credentialId: "84KJURM", verifyUrl: "https://codepolitan.com/c/84KJURM", images: ["/img/certs/codepolitan1.png"], description: "Mempelajari dasar-dasar struktur pembuatan elemen dokumen web menggunakan HTML dalam kelas online Codepolitan." }
];

const tabs = [
    { label: "All Certificates", value: "all" },
    { label: "Coursera (7)", value: "coursera" },
    { label: "Dicoding (7)", value: "dicoding" },
    { label: "Codepolitan (1)", value: "codepolitan" },
];

export default function Certifications() {
    const [activeTab, setActiveTab] = useState("all");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(3);

    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedId]);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        setVisibleCount(3);
    };

    const filteredCerts = activeTab === "all"
        ? certifications
        : certifications.filter((item) => item.category === activeTab);

    const displayedCerts = filteredCerts.slice(0, visibleCount);

    const handleViewMore = () => {
        setVisibleCount(filteredCerts.length);
    };

    const selectedCert = certifications.find((item) => item.id === selectedId);

    return (
        <section id="certifications" className="py-16 sm:py-20 relative">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">

                <div className="mb-8 sm:mb-10 lg:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium uppercase tracking-widest text-on-surface-secondary mb-3 sm:mb-4">
                            <span className="h-1.5 w-1.5 rounded-full bg-on-surface-secondary"></span>
                            Continuous Learning
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-on-surface">
                            Licenses & Certifications
                        </h2>
                    </div>

                    <div className="rounded-2xl sm:rounded-3xl border border-border bg-surface-card/60 p-4 sm:p-6 backdrop-blur-md shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-on-surface-secondary min-w-[90px]">
                                <Award size={14} className="text-accent" /> Platform
                            </div>
                            <div className="flex flex-wrap gap-1.5 bg-surface-alt p-1 rounded-xl sm:rounded-2xl border border-border/50 relative">
                                {tabs.map((tab) => {
                                    const isActive = activeTab === tab.value;
                                    return (
                                        <button
                                            key={tab.value}
                                            onClick={() => handleTabChange(tab.value)}
                                            className={`relative z-10 cursor-pointer rounded-xl px-4 py-2 text-xs font-semibold transition-colors duration-300 ${isActive
                                                    ? "text-on-surface font-bold"
                                                    : "text-on-surface-secondary hover:text-on-surface"
                                                }`}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeCertTab"
                                                    className="absolute inset-0 bg-surface rounded-xl shadow-sm border border-border/60 z-[-1]"
                                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                />
                                            )}
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {displayedCerts.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layoutId={`cert-container-${item.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                onClick={() => setSelectedId(item.id)}
                                className="group cursor-pointer flex flex-col overflow-hidden rounded-3xl border border-border bg-surface-card shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:border-border-hover hover:shadow-[0_0_40px_-12px_var(--glow)] dark:shadow-none h-[380px]"
                            >
                                <motion.div
                                    layoutId={`cert-image-${item.id}`}
                                    className="relative h-3/5 w-full bg-surface-alt/80 overflow-hidden border-b border-border/50 flex items-center justify-center p-3"
                                >
                                    {item.images && item.images.length > 0 ? (
                                        <Image
                                            src={item.images[0]}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-contain rounded-xl transition-transform duration-700 group-hover:scale-105 shadow-sm"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-on-surface-secondary/40 z-0">
                                            <ImageIcon size={40} strokeWidth={1} className="mb-2" />
                                            <span className="text-xs font-medium">Certificate Cover</span>
                                        </div>
                                    )}

                                    <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-full bg-surface/95 px-3 py-1 text-xs font-semibold text-on-surface shadow-sm backdrop-blur-md border border-border">
                                        <Award size={14} className="text-on-surface" />
                                        {item.platform}
                                    </div>
                                </motion.div>

                                <motion.div
                                    layoutId={`cert-text-${item.id}`}
                                    className="flex h-2/5 flex-col justify-center p-6 bg-gradient-to-br from-surface-alt/30 to-transparent"
                                >
                                    <h3 className="font-display text-lg font-semibold text-on-surface line-clamp-1">
                                        {item.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-on-surface-secondary line-clamp-1">
                                        Issued by {item.issuer}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between text-xs font-medium text-on-surface-secondary pt-4">
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                                        <span className="text-accent group-hover:underline">View details &rarr;</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {visibleCount < filteredCerts.length && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={handleViewMore}
                            className="cursor-pointer flex items-center gap-2 rounded-2xl border border-border bg-surface-alt/80 px-6 py-3 text-sm font-semibold text-on-surface shadow-sm backdrop-blur-md transition-all duration-300 hover:border-border-hover hover:bg-surface hover:scale-105 active:scale-95"
                        >
                            View More Certificates <ChevronDown size={16} />
                        </button>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedId && selectedCert && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md"
                        />

                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                            <motion.div
                                layoutId={`cert-container-${selectedCert.id}`}
                                className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl pointer-events-auto md:flex-row md:h-[600px]"
                            >
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-black/40 dark:bg-white/20 dark:text-on-surface dark:hover:bg-white/40 cursor-pointer"
                                >
                                    <X size={20} />
                                </button>

                                <motion.div
                                    layoutId={`cert-image-${selectedCert.id}`}
                                    className="relative flex h-72 w-full flex-shrink-0 items-center justify-center bg-surface-alt/90 md:h-full md:w-7/12 overflow-hidden border-r border-border/50 p-4 sm:p-6"
                                >
                                    {selectedCert.images && selectedCert.images.length > 0 ? (
                                        <Image
                                            src={selectedCert.images[0]}
                                            alt={selectedCert.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 58vw"
                                            className="object-contain rounded-2xl shadow-md"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-3 text-on-surface-secondary/50">
                                            <ImageIcon size={48} strokeWidth={1} />
                                            <p className="text-sm font-medium">Dokumentasi Sertifikat Belum Tersedia</p>
                                        </div>
                                    )}
                                </motion.div>

                                <motion.div
                                    layoutId={`cert-text-${selectedCert.id}`}
                                    className="flex flex-col justify-between p-8 md:w-5/12 md:p-10 bg-surface overflow-y-auto"
                                >
                                    <div>
                                        <h3 className="font-display text-2xl font-bold text-on-surface sm:text-3xl">
                                            {selectedCert.title}
                                        </h3>

                                        <div className="mt-2 text-base font-medium text-accent flex items-center gap-2">
                                            <Award size={18} />
                                            {selectedCert.issuer}
                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium text-on-surface-secondary border-y border-border/50 py-3">
                                            <span className="flex items-center gap-1.5 rounded-full bg-surface-alt px-3 py-1 text-on-surface">
                                                {selectedCert.platform}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={14} />
                                                {selectedCert.date}
                                            </span>
                                        </div>

                                        <div className="mt-4">
                                            {/* Diubah ke text-sm agar nyaman dibaca di mobile */}
                                            <p className="leading-relaxed text-on-surface-secondary text-sm">
                                                {selectedCert.description}
                                            </p>
                                        </div>

                                        <div className="mt-4 flex items-center gap-2 text-xs text-on-surface-secondary bg-surface-alt/50 p-3 rounded-xl border border-border/50">
                                            <CheckCircle2 size={16} className="text-accent flex-shrink-0" />
                                            <span className="truncate">Credential ID: <strong className="text-on-surface">{selectedCert.credentialId}</strong></span>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-border/50">
                                        <a
                                            href={selectedCert.verifyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-surface border border-border text-on-surface py-3 px-4 text-sm font-semibold transition-all duration-300 hover:bg-surface-alt hover:border-border-hover shadow-sm active:scale-[0.98]"
                                        >
                                            Verify Certificate <ExternalLink size={16} />
                                        </a>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
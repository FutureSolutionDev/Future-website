"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle, ExternalLink, TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Projects } from "@/data/projects";
import { UseProjectImages } from "@/lib/useProjectImages";

const AUTO_ADVANCE_MS = 6500;

/** Homepage proof carousel: cycles through every shipped project as a result, not a tech demo */
export function FeaturedWorkSection({
    initialImagesByFolder,
}: {
    initialImagesByFolder: Record<string, string[]>;
}) {
    const { language } = useLanguage();
    const isRTL = language === "ar";
    const count = Projects.length;

    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const goTo = (i: number) => setActiveIndex(((i % count) + count) % count);

    // Auto-advance (functional update keeps the interval stable; pauses on hover)
    useEffect(() => {
        if (paused || count <= 1) return;
        const timer = setInterval(() => setActiveIndex((i) => (i + 1) % count), AUTO_ADVANCE_MS);
        return () => clearInterval(timer);
    }, [paused, count]);

    const project = Projects[activeIndex];
    // Re-fetches at runtime when the active folder changes (new screenshots, no rebuild)
    const images = UseProjectImages(
        project?.imagesFolder ?? "/Projects",
        (project && initialImagesByFolder[project.imagesFolder]) ?? []
    );
    const liveUrl = project?.links.find((link) => link.key === "website")?.url;

    if (!project) return null;

    return (
        <section className="py-24 bg-surface-dark/30">
            <div className="container mx-auto px-4">
                {/* Section header */}
                <div className="text-center mb-14">
                    <span className="text-cyan-glow text-sm uppercase font-bold tracking-widest">
                        {isRTL ? "أعمالنا" : "Our Work"}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
                        {isRTL ? (
                            <>منصات <span className="text-primary-blue">تبيع وتدير وتنمو</span></>
                        ) : (
                            <>Platforms that <span className="text-primary-blue">sell, run, and grow</span></>
                        )}
                    </h2>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        {isRTL
                            ? "مش مجرد مواقع — أنظمة كاملة تشتغل لأصحابها كل يوم. دي منصات سلّمناها وهي تعمل الآن."
                            : "Not just websites — complete systems working for their owners every day. These are platforms we shipped, live right now."}
                    </p>
                </div>

                <div
                    className="relative max-w-6xl mx-auto"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="grid lg:grid-cols-2 gap-10 items-center"
                        >
                            {/* Screenshot */}
                            <a
                                href={liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-glow/40 transition-colors"
                            >
                                {images.length > 0 ? (
                                    <Image
                                        src={images[0]}
                                        alt={`${project.title} screenshot`}
                                        width={1200}
                                        height={750}
                                        className="w-full h-full object-contain bg-bg-dark group-hover:scale-[1.02] transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-blue/10 to-cyan-glow/10">
                                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                            {project.title}
                                        </span>
                                    </div>
                                )}
                            </a>

                            {/* Pitch */}
                            <div>
                                <span className="text-cyan-glow text-xs uppercase font-bold tracking-wider">
                                    {project.category[language]}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-bold mt-1 mb-4">{project.title}</h3>
                                <p className="text-text-muted leading-relaxed mb-5">
                                    {project.description[language]}
                                </p>

                                {project.result && (
                                    <p className="flex items-start gap-2 text-cyan-glow font-medium mb-6">
                                        <TrendingUp size={18} className="shrink-0 mt-0.5" />
                                        <span>{project.result[language]}</span>
                                    </p>
                                )}

                                <ul className="space-y-2.5 mb-8">
                                    {project.features.slice(0, 4).map((feature, i) => (
                                        <li key={`featured-feature-${i}`} className="flex items-start gap-2.5 text-sm text-text-main/90">
                                            <CheckCircle size={16} className="text-cyan-glow shrink-0 mt-0.5" />
                                            {isRTL ? feature.ar : feature.en}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-4">
                                    {liveUrl && (
                                        <a
                                            href={liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-blue text-white font-bold hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(29,161,242,0.4)]"
                                        >
                                            <ExternalLink size={16} />
                                            {isRTL ? "شاهد المنصة مباشرة" : "See It Live"}
                                        </a>
                                    )}
                                    <Link
                                        href={`/${language}/portfolio`}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary-blue/50 text-primary-blue font-bold hover:bg-primary-blue/10 transition-colors"
                                    >
                                        {isRTL ? "كل أعمالنا" : "All Our Work"}
                                        <ArrowRight size={16} className="rtl:rotate-180" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Carousel controls — only when there's more than one project */}
                    {count > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={() => goTo(activeIndex - 1)}
                                aria-label={isRTL ? "السابق" : "Previous"}
                                className="absolute top-1/2 -translate-y-1/2 start-0 -ms-2 md:-ms-5 w-11 h-11 rounded-full bg-surface-dark border border-white/10 text-text-main hover:border-cyan-glow/50 hover:text-cyan-glow transition-colors flex items-center justify-center z-10"
                            >
                                {isRTL ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
                            </button>
                            <button
                                type="button"
                                onClick={() => goTo(activeIndex + 1)}
                                aria-label={isRTL ? "التالي" : "Next"}
                                className="absolute top-1/2 -translate-y-1/2 end-0 -me-2 md:-me-5 w-11 h-11 rounded-full bg-surface-dark border border-white/10 text-text-main hover:border-cyan-glow/50 hover:text-cyan-glow transition-colors flex items-center justify-center z-10"
                            >
                                {isRTL ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
                            </button>

                            {/* Dots */}
                            <div className="flex items-center justify-center gap-2.5 mt-10">
                                {Projects.map((p, i) => (
                                    <button
                                        key={`dot-${p.title}`}
                                        type="button"
                                        onClick={() => goTo(i)}
                                        aria-label={`${isRTL ? "اذهب إلى" : "Go to"} ${p.title}`}
                                        aria-current={i === activeIndex}
                                        className={`h-2.5 rounded-full transition-all ${i === activeIndex
                                            ? "w-8 bg-cyan-glow"
                                            : "w-2.5 bg-white/20 hover:bg-white/40"}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

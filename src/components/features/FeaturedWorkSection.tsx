"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, ExternalLink, TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Projects } from "@/data/projects";
import { UseProjectImages } from "@/lib/useProjectImages";

/** Homepage proof section: the latest shipped project, framed as a result — not a tech demo */
export function FeaturedWorkSection({ initialImages }: { initialImages: string[] }) {
    const { language } = useLanguage();
    const isRTL = language === "ar";
    const project = Projects[0];
    const images = UseProjectImages(project?.imagesFolder ?? "/Projects", initialImages);

    if (!project || images.length === 0) return null;

    return (
        <section className="py-24 bg-surface-dark/30">
            <div className="container mx-auto px-4">
                {/* Section header */}
                <div className="text-center mb-14">
                    <span className="text-cyan-glow text-sm uppercase font-bold tracking-widest">
                        {isRTL ? "أحدث أعمالنا" : "Latest Work"}
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
                            ? "مش مجرد مواقع — أنظمة كاملة تشتغل لصاحبها كل يوم. دي آخر منصة سلّمناها وهي تعمل الآن."
                            : "Not just websites — complete systems working for their owners every day. Here is the latest platform we shipped, live right now."}
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto"
                >
                    {/* Screenshot */}
                    <a
                        href={project.links.Live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-glow/40 transition-colors"
                    >
                        <Image
                            src={images[0]}
                            alt={`${project.title} screenshot`}
                            width={1200}
                            height={750}
                            className="w-full h-full object-contain bg-bg-dark group-hover:scale-[1.02] transition-transform duration-500"
                        />
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
                            <a
                                href={project.links.Live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-blue text-white font-bold hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(29,161,242,0.4)]"
                            >
                                <ExternalLink size={16} />
                                {isRTL ? "شاهد المنصة مباشرة" : "See It Live"}
                            </a>
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
            </div>
        </section>
    );
}

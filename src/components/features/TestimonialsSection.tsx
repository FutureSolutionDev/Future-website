"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ApprovedTestimonials } from "@/data/testimonials";

const AUTO_ADVANCE_MS = 7000;

/** Social proof carousel — only client-approved quotes render, one at a time */
export function TestimonialsSection() {
    const { language } = useLanguage();
    const isRTL = language === "ar";
    const count = ApprovedTestimonials.length;

    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const goTo = (i: number) => setActiveIndex(((i % count) + count) % count);

    useEffect(() => {
        if (paused || count <= 1) return;
        const timer = setInterval(() => setActiveIndex((i) => (i + 1) % count), AUTO_ADVANCE_MS);
        return () => clearInterval(timer);
    }, [paused, count]);

    if (count === 0) return null;
    const testimonial = ApprovedTestimonials[activeIndex];

    return (
        <section className="py-24 bg-bg-dark">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-cyan-glow text-sm uppercase font-bold tracking-widest">
                        {isRTL ? "كلام عملائنا" : "What Clients Say"}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-3">
                        {isRTL ? (
                            <>بكلامهم هم — <span className="text-primary-blue">مش بكلامنا</span></>
                        ) : (
                            <>In their words — <span className="text-primary-blue">not ours</span></>
                        )}
                    </h2>
                </div>

                <div
                    className="relative max-w-3xl mx-auto"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.figure
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="relative p-8 md:p-10 rounded-2xl bg-surface-dark border border-white/5"
                        >
                            <Quote size={36} className="text-cyan-glow/30 mb-4 rtl:-scale-x-100" />
                            <blockquote className="text-lg md:text-xl leading-relaxed text-text-main/95 mb-6">
                                {testimonial.quote[language]}
                            </blockquote>
                            <figcaption className="flex items-center justify-between gap-4 flex-wrap">
                                <div>
                                    <div className="font-bold">{testimonial.name}</div>
                                    <div className="text-text-muted text-sm">{testimonial.role[language]}</div>
                                </div>
                                {testimonial.link && (
                                    <a
                                        href={testimonial.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-cyan-glow hover:text-primary-blue transition-colors"
                                    >
                                        <ExternalLink size={14} />
                                        {isRTL ? "شوف المنصة بنفسك" : "See the platform yourself"}
                                    </a>
                                )}
                            </figcaption>
                        </motion.figure>
                    </AnimatePresence>

                    {/* Controls — only with more than one testimonial */}
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

                            <div className="flex items-center justify-center gap-2.5 mt-8">
                                {ApprovedTestimonials.map((t, i) => (
                                    <button
                                        key={`t-dot-${i}`}
                                        type="button"
                                        onClick={() => goTo(i)}
                                        aria-label={`${isRTL ? "اذهب إلى رأي" : "Go to testimonial"} ${i + 1}`}
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

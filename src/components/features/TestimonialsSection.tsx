"use client";

import { motion } from "framer-motion";
import { Quote, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ApprovedTestimonials } from "@/data/testimonials";

/** Social proof in the client's own words — only client-approved quotes render */
export function TestimonialsSection() {
    const { language } = useLanguage();
    const isRTL = language === "ar";

    if (ApprovedTestimonials.length === 0) return null;

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

                <div className={`grid gap-6 max-w-4xl mx-auto ${ApprovedTestimonials.length > 1 ? "md:grid-cols-2" : ""}`}>
                    {ApprovedTestimonials.map((testimonial, i) => (
                        <motion.figure
                            key={`testimonial-${i}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
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
                    ))}
                </div>
            </div>
        </section>
    );
}

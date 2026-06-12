"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    ArrowRight,
    CheckCircle,
    Handshake,
    Radio,
    Rocket,
    Smartphone,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { TProduct } from "@/data/products";
import { Contact } from "@/lib/constants";
import { UseProjectImages } from "@/lib/useProjectImages";
import { WaitlistForm } from "@/components/features/WaitlistForm";
import { LinkButtons } from "@/components/features/LinkButtons";

function ProductGallery({ product, initialImages }: { product: TProduct; initialImages: string[] }) {
    const images = UseProjectImages(product.imagesFolder ?? "/Products", initialImages);
    const [activeIndex, setActiveIndex] = useState(0);
    const { language } = useLanguage();

    if (images.length === 0) return null;
    const safeIndex = Math.min(activeIndex, images.length - 1);

    return (
        <div className="space-y-3">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-bg-dark">
                <Image
                    src={images[safeIndex]}
                    alt={`${product.name} — screenshot ${safeIndex + 1}`}
                    width={1200}
                    height={750}
                    className="w-full h-full object-contain"
                />
            </div>
            {images.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                    {images.map((image, i) => (
                        <button
                            key={image}
                            type="button"
                            onClick={() => setActiveIndex(i)}
                            aria-label={
                                language === "ar"
                                    ? `عرض الصورة ${i + 1} من ${product.name}`
                                    : `Show screenshot ${i + 1} of ${product.name}`
                            }
                            className={`relative aspect-[16/10] w-24 md:w-28 rounded-lg overflow-hidden border-2 transition-all ${i === safeIndex
                                ? "border-cyan-glow shadow-[0_0_12px_rgba(0,229,255,0.25)]"
                                : "border-white/10 opacity-60 hover:opacity-100"}`}
                        >
                            <Image src={image} alt="" width={240} height={150} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function ProductView({
    product,
    initialImages,
}: {
    product: TProduct;
    initialImages: string[];
}) {
    const { language } = useLanguage();
    const isRTL = language === "ar";
    const isLive = product.status === "live";

    const investorMessage = encodeURIComponent(
        isRTL
            ? `مرحباً، مهتم بالاستثمار في ${product.name} وأود معرفة المزيد.`
            : `Hello, I'm interested in investing in ${product.name} and would like to know more.`
    );

    return (
        <article className="py-16 bg-bg-dark min-h-screen">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Breadcrumb-ish back link */}
                <Link
                    href={`/${language}/products`}
                    className="inline-flex items-center gap-2 text-text-muted hover:text-cyan-glow transition-colors mb-8 text-sm"
                >
                    <ArrowRight size={16} className="ltr:rotate-180" />
                    {isRTL ? "كل المنتجات" : "All products"}
                </Link>

                {/* Hero */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        {isLive ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold">
                                <Radio size={12} />
                                {isRTL ? "يعمل الآن في الإنتاج" : "Live in production"}
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                                <Rocket size={12} />
                                {product.stage ? product.stage[language] : isRTL ? "قريباً" : "Coming soon"}
                            </span>
                        )}
                        <span className="text-cyan-glow text-xs uppercase font-bold tracking-wider">
                            {product.category[language]}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
                    <p className="text-xl md:text-2xl text-text-muted max-w-3xl leading-relaxed">
                        {product.tagline[language]}
                    </p>
                </motion.header>

                <div className="grid lg:grid-cols-5 gap-10 items-start mb-14">
                    {/* Left: gallery or brand block */}
                    <div className="lg:col-span-3">
                        {initialImages.length > 0 || product.imagesFolder ? (
                            <ProductGallery product={product} initialImages={initialImages} />
                        ) : null}
                        {initialImages.length === 0 && (
                            <div className="aspect-[16/10] rounded-xl border border-white/10 bg-gradient-to-br from-primary-blue/10 to-cyan-glow/10 flex items-center justify-center">
                                <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                    {product.name}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Right: description + actions */}
                    <div className="lg:col-span-2 space-y-6">
                        <p className="text-text-muted leading-relaxed">{product.description[language]}</p>
                        <p className="text-sm text-text-main/80 bg-surface-dark border border-white/5 rounded-xl px-4 py-3">
                            <strong className="text-cyan-glow">{isRTL ? "لمين؟ " : "Who is it for? "}</strong>
                            {product.audience[language]}
                        </p>

                        {/* Channels: any number of links, icon+label resolved per key */}
                        {product.links && product.links.length > 0 && (
                            <LinkButtons links={product.links} />
                        )}
                        {isLive && product.demoOnRequest && (
                            <a
                                href={`${Contact.WhatsApp}?text=${encodeURIComponent(isRTL ? `أريد عرضاً تجريبياً لـ ${product.name}` : `I'd like a demo of ${product.name}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-blue text-white font-bold hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(29,161,242,0.4)]"
                            >
                                {isRTL ? "اطلب عرضاً تجريبياً" : "Request a demo"}
                            </a>
                        )}
                        {isLive && product.appsComingSoon && (
                            <p className="flex items-center gap-2 text-sm text-amber-400/90">
                                <Smartphone size={16} className="shrink-0" />
                                {isRTL
                                    ? "تطبيقات iOS وAndroid قريباً على المتاجر — سجّل إيميلك وهنبلغك."
                                    : "iOS & Android apps coming to the stores soon — leave your email below."}
                            </p>
                        )}

                        {/* Waitlist: coming-soon always; live too when apps are pending */}
                        {(!isLive || product.appsComingSoon) && (
                            <div className="p-5 rounded-2xl bg-surface-dark border border-white/5">
                                <WaitlistForm productName={product.name} />
                            </div>
                        )}

                        {/* Investor CTA */}
                        {product.investorCta && (
                            <a
                                href={`${Contact.WhatsApp}?text=${investorMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 p-5 rounded-2xl border border-cyan-glow/20 bg-cyan-glow/5 hover:bg-cyan-glow/10 transition-colors group"
                            >
                                <Handshake size={22} className="text-cyan-glow shrink-0 mt-0.5" />
                                <span>
                                    <span className="block font-bold group-hover:text-cyan-glow transition-colors">
                                        {isRTL ? "مهتم بالاستثمار أو الشراكة؟" : "Interested in investing or partnering?"}
                                    </span>
                                    <span className="text-sm text-text-muted">
                                        {isRTL
                                            ? "كلمنا مباشرة — نشاركك التفاصيل والأرقام."
                                            : "Talk to us directly — we'll share the details and numbers."}
                                    </span>
                                </span>
                            </a>
                        )}
                    </div>
                </div>

                {/* Stats */}
                {product.stats && product.stats.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
                        {product.stats.map((stat, i) => (
                            <motion.div
                                key={`stat-${i}`}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="text-center p-6 rounded-2xl bg-surface-dark border border-white/5"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-cyan-glow mb-1">{stat.value}</div>
                                <div className="text-text-muted text-sm">{stat.label[language]}</div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Features */}
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    {isRTL ? (
                        <>ماذا تقدم <span className="text-primary-blue">{product.name}</span></>
                    ) : (
                        <>What <span className="text-primary-blue">{product.name}</span> delivers</>
                    )}
                </h2>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 mb-16">
                    {product.features.map((feature, i) => (
                        <li key={`feature-${i}`} className="flex items-start gap-2.5 text-text-main/90 leading-relaxed">
                            <CheckCircle size={17} className="text-cyan-glow shrink-0 mt-1" />
                            {isRTL ? feature.ar : feature.en}
                        </li>
                    ))}
                </ul>

                {/* Bottom CTA */}
                <div className="text-center p-10 rounded-3xl bg-gradient-to-br from-primary-blue/10 to-cyan-glow/10 border border-cyan-glow/20">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">
                        {isLive
                            ? (isRTL ? "عايز منصة بنفس المستوى لمشروعك؟" : "Want a platform of this caliber for your business?")
                            : (isRTL ? `عايز تعرف أكثر عن ${product.name}؟` : `Want to know more about ${product.name}?`)}
                    </h2>
                    <p className="text-text-muted mb-7 max-w-xl mx-auto">
                        {isRTL
                            ? "كلمنا — استشارة مجانية بدون أي التزام."
                            : "Talk to us — a free consultation, no strings attached."}
                    </p>
                    <a
                        href={Contact.WhatsApp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary-blue text-white text-lg font-bold hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(29,161,242,0.5)]"
                    >
                        {isRTL ? "احجز استشارة مجانية" : "Book a Free Consultation"}
                    </a>
                </div>
            </div>
        </article>
    );
}

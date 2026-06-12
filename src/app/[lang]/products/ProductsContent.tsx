"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Radio, Rocket } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Products, type TProduct } from "@/data/products";

function StatusBadge({ product }: { product: TProduct }) {
    const { language } = useLanguage();
    const isRTL = language === "ar";
    if (product.status === "live") {
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold">
                <Radio size={12} />
                {isRTL ? "يعمل الآن" : "Live"}
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Rocket size={12} />
            {isRTL ? "قريباً" : "Coming Soon"}
        </span>
    );
}

function ProductCard({
    product,
    index,
    coverImage,
}: {
    product: TProduct;
    index: number;
    coverImage?: string;
}) {
    const { language } = useLanguage();
    const isRTL = language === "ar";

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="group rounded-2xl bg-surface-dark border border-white/5 overflow-hidden hover:border-cyan-glow/30 transition-all duration-300 flex flex-col"
        >
            <Link href={`/${language}/products/${product.slug}`} className="flex flex-col h-full">
                {/* Cover */}
                <div className="relative aspect-[16/9] bg-bg-dark border-b border-white/5 overflow-hidden">
                    {coverImage ? (
                        <Image
                            src={coverImage}
                            alt={`${product.name} screenshot`}
                            width={800}
                            height={450}
                            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-blue/10 to-cyan-glow/10">
                            <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                {product.name}
                            </span>
                        </div>
                    )}
                    <div className="absolute top-4 start-4">
                        <StatusBadge product={product} />
                    </div>
                </div>

                {/* Body */}
                <div className="p-7 flex flex-col flex-1">
                    <span className="text-cyan-glow text-xs uppercase font-bold tracking-wider mb-1">
                        {product.category[language]}
                    </span>
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-cyan-glow transition-colors">
                        {product.name}
                    </h2>
                    <p className="text-text-muted leading-relaxed mb-5">{product.tagline[language]}</p>

                    <ul className="space-y-2 mb-6">
                        {product.features.slice(0, 3).map((feature, i) => (
                            <li key={`pf-${i}`} className="flex items-start gap-2.5 text-sm text-text-main/90">
                                <CheckCircle size={15} className="text-cyan-glow shrink-0 mt-0.5" />
                                {isRTL ? feature.ar : feature.en}
                            </li>
                        ))}
                    </ul>

                    <span className="mt-auto inline-flex items-center gap-2 text-primary-blue font-bold text-sm group-hover:text-cyan-glow transition-colors">
                        {product.status === "live"
                            ? (isRTL ? "شوف المنصة" : "Explore the platform")
                            : (isRTL ? "اعرف أكثر وسجّل اهتمامك" : "Learn more & join the waitlist")}
                        <ArrowRight size={16} className="rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </span>
                </div>
            </Link>
        </motion.article>
    );
}

export default function ProductsContent({
    coverByFolder,
}: {
    coverByFolder: Record<string, string | undefined>;
}) {
    const { language } = useLanguage();
    const isRTL = language === "ar";
    const liveProducts = Products.filter((p) => p.status === "live");
    const upcomingProducts = Products.filter((p) => p.status === "coming-soon");

    return (
        <section className="py-20 bg-bg-dark min-h-screen">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        {isRTL ? (
                            <>منتجات <span className="text-primary-blue">نبنيها ونشغّلها</span></>
                        ) : (
                            <>Products we <span className="text-primary-blue">build and run</span></>
                        )}
                    </h1>
                    <p className="text-text-muted text-lg">
                        {isRTL
                            ? "مش بس بنبني للعملاء — بنبني منتجاتنا الخاصة وبنشغّلها لآلاف المستخدمين. ده اللي شغال النهارده، وده اللي جاي."
                            : "We don't just build for clients — we build and operate our own products for thousands of users. Here's what's live today, and what's coming next."}
                    </p>
                </div>

                {/* Live */}
                <h2 className="text-xl font-bold uppercase tracking-wider text-green-400 mb-6 flex items-center gap-2">
                    <Radio size={18} />
                    {isRTL ? "يعمل الآن في الإنتاج" : "Live in production"}
                </h2>
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {liveProducts.map((product, i) => (
                        <ProductCard
                            key={product.slug}
                            product={product}
                            index={i}
                            coverImage={product.imagesFolder ? coverByFolder[product.imagesFolder] : undefined}
                        />
                    ))}
                </div>

                {/* Coming soon */}
                <h2 className="text-xl font-bold uppercase tracking-wider text-amber-400 mb-6 flex items-center gap-2">
                    <Rocket size={18} />
                    {isRTL ? "قريباً — سجّل اهتمامك من دلوقتي" : "Coming soon — join the waitlist"}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingProducts.map((product, i) => (
                        <ProductCard
                            key={product.slug}
                            product={product}
                            index={i}
                            coverImage={product.imagesFolder ? coverByFolder[product.imagesFolder] : undefined}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

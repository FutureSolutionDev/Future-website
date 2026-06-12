"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const FAQS = [
    {
        q: { en: "How much does a project cost?", ar: "المشروع بيكلف قد إيه؟" },
        a: {
            en: "It depends on the scope — a landing site is not an e-commerce platform. After one free call you get a fixed quote with a clear scope. The price you approve is the price you pay.",
            ar: "بيعتمد على النطاق — موقع تعريفي غير منصة تجارة إلكترونية. بعد مكالمة مجانية واحدة بتستلم عرض سعر ثابت بنطاق واضح. السعر اللي بتوافق عليه هو اللي بتدفعه.",
        },
    },
    {
        q: { en: "How long does it take?", ar: "بياخد وقت قد إيه؟" },
        a: {
            en: "A typical first version ships in 4–8 weeks depending on scope, with a working link you can see every week from week one.",
            ar: "النسخة الأولى عادة بتتسلم في 4–8 أسابيع حسب النطاق، ومن أول أسبوع بتشوف لينك شغال بيتحدث كل أسبوع.",
        },
    },
    {
        q: { en: "Who owns the code?", ar: "الكود ملك مين؟" },
        a: {
            en: "You do — 100%. Code, design, and data are yours, delivered with documentation. No lock-in: any developer can continue the work.",
            ar: "ملكك انت — 100%. الكود والتصميم والبيانات بيتسلموا ليك بالتوثيق. مفيش احتكار: أي مطور يقدر يكمل الشغل بعدنا.",
        },
    },
    {
        q: { en: "What happens after launch?", ar: "إيه اللي بيحصل بعد الإطلاق؟" },
        a: {
            en: "We don't disappear. Support and maintenance plans keep your platform fast, secure, and up to date — and we're there for the next feature when you're ready.",
            ar: "مش بنختفي. باقات الدعم والصيانة بتخلي منصتك سريعة وآمنة ومحدثة — وموجودين للميزة الجاية لما تكون جاهز.",
        },
    },
    {
        q: { en: "Do you work with clients outside Egypt?", ar: "بتشتغلوا مع عملاء برة مصر؟" },
        a: {
            en: "Yes — we work fully remotely in Arabic and English, and our platforms ship bilingual by default when your market needs it.",
            ar: "أيوة — بنشتغل عن بعد بالكامل بالعربي والإنجليزي، ومنصاتنا بتطلع ثنائية اللغة لما سوقك يحتاج كده.",
        },
    },
    {
        q: { en: "I have an idea but I'm not technical — where do I start?", ar: "عندي فكرة بس مش تقني — أبدأ منين؟" },
        a: {
            en: "Exactly where the free consultation is for. Tell us the business goal in your own words; we translate it into what's possible, what it costs, and how long it takes.",
            ar: "ده بالظبط دور الاستشارة المجانية. احكيلنا الهدف بكلامك العادي، وإحنا نترجمه: إيه الممكن، بكام، وفي قد إيه.",
        },
    },
];

function FaqJsonLd({ lang }: { lang: "en" | "ar" }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.q[lang],
            acceptedAnswer: { "@type": "Answer", text: faq.a[lang] },
        })),
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/** Homepage FAQ — pre-answers the objections that stop people from reaching out */
export function FAQSection() {
    const { language } = useLanguage();
    const isRTL = language === "ar";
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-surface-dark/30">
            <FaqJsonLd lang={language} />
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <span className="text-cyan-glow text-sm uppercase font-bold tracking-widest">
                        {isRTL ? "أسئلة شائعة" : "FAQ"}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-3">
                        {isRTL ? (
                            <>الأسئلة اللي بتيجي في بالك <span className="text-primary-blue">قبل ما تتواصل</span></>
                        ) : (
                            <>The questions on your mind <span className="text-primary-blue">before you reach out</span></>
                        )}
                    </h2>
                </div>

                <div className="space-y-3">
                    {FAQS.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <motion.div
                                key={`faq-${i}`}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="rounded-xl bg-surface-dark border border-white/5 overflow-hidden"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-center justify-between gap-4 p-5 text-start font-bold hover:text-cyan-glow transition-colors"
                                >
                                    {isRTL ? faq.q.ar : faq.q.en}
                                    <ChevronDown
                                        size={20}
                                        className={`shrink-0 text-cyan-glow transition-transform ${isOpen ? "rotate-180" : ""}`}
                                    />
                                </button>
                                {isOpen && (
                                    <p className="px-5 pb-5 text-text-muted leading-relaxed">
                                        {isRTL ? faq.a.ar : faq.a.en}
                                    </p>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

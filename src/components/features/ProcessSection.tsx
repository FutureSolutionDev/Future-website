"use client";

import { motion } from "framer-motion";
import { PhoneCall, FileText, Repeat, Rocket } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const STEPS = [
    {
        icon: PhoneCall,
        title: { en: "Free consultation", ar: "استشارة مجانية" },
        text: {
            en: "We listen to your goal and tell you honestly what's possible — and what isn't worth building.",
            ar: "بنسمع هدفك ونقولك بصراحة إيه الممكن — وإيه اللي مش مستاهل يتبني أصلاً.",
        },
    },
    {
        icon: FileText,
        title: { en: "Plan & fixed quote", ar: "خطة وعرض سعر ثابت" },
        text: {
            en: "A clear scope, a timeline, and one price — before a single line of code is written.",
            ar: "نطاق واضح، جدول زمني، وسعر واحد معروف — قبل ما يتكتب سطر كود واحد.",
        },
    },
    {
        icon: Repeat,
        title: { en: "Weekly deliveries", ar: "تسليمات أسبوعية" },
        text: {
            en: "You see real progress every week on a live link — no black box, no surprises at the end.",
            ar: "بتشوف تقدم حقيقي كل أسبوع على لينك شغال — مفيش صندوق أسود ولا مفاجآت في الآخر.",
        },
    },
    {
        icon: Rocket,
        title: { en: "Launch & ongoing support", ar: "إطلاق ودعم مستمر" },
        text: {
            en: "We launch together, train your team, and stay for maintenance and the next growth step.",
            ar: "بنطلق مع بعض، ندرّب فريقك، ونفضل معاك للصيانة وخطوة النمو الجاية.",
        },
    },
];

/** "How we work" — answers the client's real question: what happens if I say yes? */
export function ProcessSection() {
    const { language } = useLanguage();
    const isRTL = language === "ar";

    return (
        <section className="py-24 bg-bg-dark">
            <div className="container mx-auto px-4">
                <div className="text-center mb-14">
                    <span className="text-cyan-glow text-sm uppercase font-bold tracking-widest">
                        {isRTL ? "كيف نشتغل" : "How We Work"}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
                        {isRTL ? (
                            <>من الفكرة للإطلاق في <span className="text-primary-blue">4 خطوات واضحة</span></>
                        ) : (
                            <>From idea to launch in <span className="text-primary-blue">4 clear steps</span></>
                        )}
                    </h2>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        {isRTL
                            ? "تعرف فين فلوسك رايحة وإيه اللي بيحصل في كل مرحلة — من أول مكالمة لحد ما منصتك تشتغل."
                            : "Know where your money goes and what happens at every stage — from the first call until your platform is live."}
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {STEPS.map((step, i) => (
                        <motion.div
                            key={`step-${i}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative p-7 rounded-2xl bg-surface-dark border border-white/5 hover:border-cyan-glow/25 transition-colors"
                        >
                            <span className="absolute top-5 end-5 text-5xl font-bold text-white/5 select-none">
                                {i + 1}
                            </span>
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-blue/20 to-cyan-glow/20 flex items-center justify-center text-cyan-glow mb-4">
                                <step.icon size={24} />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{isRTL ? step.title.ar : step.title.en}</h3>
                            <p className="text-text-muted text-sm leading-relaxed">
                                {isRTL ? step.text.ar : step.text.en}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Team, type TTeamMember } from "@/data/team";
import { LinkButtons } from "@/components/features/LinkButtons";

/** First letter of the localized name — used when no photo file exists */
function initialOf(member: TTeamMember, lang: "en" | "ar") {
    return (member.name[lang] || member.name.en || "?").trim().charAt(0).toUpperCase();
}

function TeamCard({
    member,
    photo,
    index,
}: {
    member: TTeamMember;
    photo: string | null;
    index: number;
}) {
    const { language } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="flex flex-col items-center text-center p-7 rounded-2xl bg-surface-dark border border-white/5 hover:border-cyan-glow/25 transition-colors"
        >
            {/* Photo or initial-letter avatar */}
            <div className="relative w-28 h-28 mb-5">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-blue/30 to-cyan-glow/30 blur-md" />
                {photo ? (
                    <Image
                        src={photo}
                        alt={member.name[language]}
                        width={112}
                        height={112}
                        className="relative w-28 h-28 rounded-full object-cover border-2 border-white/10"
                    />
                ) : (
                    <div className="relative w-28 h-28 rounded-full border-2 border-white/10 bg-gradient-to-br from-primary-blue/20 to-cyan-glow/20 flex items-center justify-center">
                        <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                            {initialOf(member, language)}
                        </span>
                    </div>
                )}
            </div>

            <h3 className="text-xl font-bold">{member.name[language]}</h3>
            <p className="text-cyan-glow text-sm font-medium mb-3">{member.role[language]}</p>
            {member.bio && (
                <p className="text-text-muted text-sm leading-relaxed mb-4">{member.bio[language]}</p>
            )}
            {member.links && member.links.length > 0 && (
                <div className="mt-auto pt-2">
                    <LinkButtons links={member.links} />
                </div>
            )}
        </motion.div>
    );
}

export function TeamSection({ photos }: { photos: Record<string, string | null> }) {
    const { language } = useLanguage();
    const isRTL = language === "ar";

    if (Team.length === 0) return null;

    return (
        <section className="py-20 bg-bg-dark">
            <div className="container mx-auto px-4">
                <div className="text-center mb-14">
                    <span className="text-cyan-glow text-sm uppercase font-bold tracking-widest">
                        {isRTL ? "قيادة الشركة" : "Leadership"}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
                        {isRTL ? (
                            <>العقول اللي <span className="text-primary-blue">وراء كل مشروع</span></>
                        ) : (
                            <>The minds <span className="text-primary-blue">behind every project</span></>
                        )}
                    </h2>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        {isRTL
                            ? "دول المؤسسون اللي بيقودوا كل مشروع — مدعومين بفريق من المهندسين والمصممين والمختصين بيكبر مع كل عميل جديد."
                            : "These are the founders who lead every project — backed by a wider team of engineers, designers, and specialists that grows with each new client."}
                    </p>
                </div>

                <div
                    className={`grid gap-6 max-w-5xl mx-auto ${Team.length === 1
                        ? "max-w-sm"
                        : Team.length === 2
                            ? "sm:grid-cols-2 max-w-2xl"
                            : "sm:grid-cols-2 lg:grid-cols-3"}`}
                >
                    {Team.map((member, i) => (
                        <TeamCard
                            key={`${member.photoSlug}-${i}`}
                            member={member}
                            photo={photos[member.photoSlug] ?? null}
                            index={i}
                        />
                    ))}
                </div>

                {/* Makes clear the cards are the core/leadership, not the whole company */}
                <p className="text-center text-text-muted/70 text-sm mt-10 max-w-xl mx-auto">
                    {isRTL
                        ? "وفريق متكامل من المطورين والمصممين ومديري المشاريع يعمل خلف الكواليس على كل مشروع."
                        : "Plus a full team of developers, designers, and project managers working behind the scenes on every build."}
                </p>
            </div>
        </section>
    );
}

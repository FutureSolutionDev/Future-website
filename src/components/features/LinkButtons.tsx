"use client";

import { Apple, ExternalLink, FileText, Github, Play, Youtube, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { TLinkItem, TLinkKey } from "@/data/links";
import type { Lang } from "@/lib/seo";

type TLinkMeta = {
    icon: LucideIcon;
    label: Record<Lang, string>;
    /** Primary links get the loud blue button; the rest get the quiet bordered one */
    primary?: boolean;
};

const LINK_REGISTRY: Record<TLinkKey, TLinkMeta> = {
    website: {
        icon: ExternalLink,
        label: { en: "Visit Website", ar: "زيارة الموقع" },
        primary: true,
    },
    appstore: {
        icon: Apple,
        label: { en: "App Store", ar: "App Store" },
    },
    googleplay: {
        icon: Play,
        label: { en: "Google Play", ar: "Google Play" },
    },
    github: {
        icon: Github,
        label: { en: "GitHub", ar: "GitHub" },
    },
    docs: {
        icon: FileText,
        label: { en: "Documentation", ar: "التوثيق" },
    },
    video: {
        icon: Youtube,
        label: { en: "Watch Demo", ar: "شاهد العرض" },
    },
};

const PRIMARY_CLASS =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-blue text-white text-sm font-bold hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(29,161,242,0.35)]";
const SECONDARY_CLASS =
    "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 bg-white/5 text-sm font-bold text-text-main hover:border-cyan-glow/40 hover:bg-white/10 transition-colors";

/** Renders any list of {key, url, label?} links with the right icon and style per key */
export function LinkButtons({ links }: { links: TLinkItem[] }) {
    const { language } = useLanguage();
    if (links.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-2">
            {links.map((link, i) => {
                const meta = LINK_REGISTRY[link.key];
                const Icon = meta.icon;
                const label = link.label ? link.label[language] : meta.label[language];
                return (
                    <a
                        key={`${link.key}-${i}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={meta.primary ? PRIMARY_CLASS : SECONDARY_CLASS}
                    >
                        <Icon size={16} />
                        {label}
                    </a>
                );
            })}
        </div>
    );
}

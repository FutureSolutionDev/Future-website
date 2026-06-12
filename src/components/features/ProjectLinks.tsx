"use client";

import { Apple, ExternalLink, Github, Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { TProject } from "@/data/projects";

/**
 * Renders every channel a project ships on: website, App Store, Google Play, GitHub.
 * Shows only the links that exist — one button per channel.
 */
export function ProjectLinks({ links, title }: { links: TProject["links"]; title: string }) {
    const { language } = useLanguage();
    const isRTL = language === "ar";

    const storeButtonClass =
        "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 bg-white/5 text-sm font-bold text-text-main hover:border-cyan-glow/40 hover:bg-white/10 transition-colors";

    return (
        <div className="flex flex-wrap items-center gap-2">
            {links.Live && (
                <a
                    href={links.Live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-blue text-white text-sm font-bold hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(29,161,242,0.35)]"
                >
                    <ExternalLink size={16} />
                    {isRTL ? "زيارة الموقع" : "Visit Live Site"}
                </a>
            )}
            {links.AppStore && (
                <a
                    href={links.AppStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${title} on the App Store`}
                    className={storeButtonClass}
                >
                    <Apple size={16} />
                    App Store
                </a>
            )}
            {links.GooglePlay && (
                <a
                    href={links.GooglePlay}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${title} on Google Play`}
                    className={storeButtonClass}
                >
                    <Play size={16} />
                    Google Play
                </a>
            )}
            {links.Github && (
                <a
                    href={links.Github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${title} on GitHub`}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                    <Github size={18} />
                </a>
            )}
        </div>
    );
}

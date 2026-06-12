"use client";

import { motion } from "framer-motion";
import { CheckCircle, TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Projects, type TProject } from "@/data/projects";
import { Contact } from "@/lib/constants";
import { UseProjectImages } from "@/lib/useProjectImages";
import { LinkButtons } from "@/components/features/LinkButtons";
import Image from "next/image";
import { useState } from "react";

/**
 * Screenshot gallery — the list refreshes at runtime from the server's folder
 * listing (drop a new image in public/Projects/<Name>/ and it just shows up).
 * The main image keeps the screenshots' own 16:10 ratio — no cropping.
 */
function ProjectGallery({ project, initialImages }: { project: TProject; initialImages: string[] }) {
  const images = UseProjectImages(project.imagesFolder, initialImages);
  const [activeIndex, setActiveIndex] = useState(0);
  const { language } = useLanguage();

  if (images.length === 0) return null;
  const safeIndex = Math.min(activeIndex, images.length - 1);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-bg-dark">
        <Image
          src={images[safeIndex]}
          alt={`${project.title} — screenshot ${safeIndex + 1}`}
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
                  ? `عرض الصورة ${i + 1} من ${project.title}`
                  : `Show screenshot ${i + 1} of ${project.title}`
              }
              className={`relative aspect-[16/10] w-24 md:w-28 rounded-lg overflow-hidden border-2 transition-all ${
                i === safeIndex
                  ? "border-cyan-glow shadow-[0_0_12px_rgba(0,229,255,0.25)]"
                  : "border-white/10 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt=""
                width={240}
                height={150}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  initialImages,
}: {
  project: TProject;
  index: number;
  initialImages: string[];
}) {
  const { language } = useLanguage();
  const isRTL = language === "ar";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl bg-surface-dark border border-white/5 overflow-hidden hover:border-cyan-glow/20 transition-colors duration-300 p-6 md:p-10"
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <span className="text-cyan-glow text-xs uppercase font-bold tracking-wider">
            {project.category[language]}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1">{project.title}</h2>
        </div>
        <LinkButtons links={project.links} />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
        {/* Gallery */}
        <ProjectGallery project={project} initialImages={initialImages} />

        {/* Story: what it does + the outcome */}
        <div>
          <p className="text-text-muted leading-relaxed mb-5">
            {project.description[language]}
          </p>
          {project.result && (
            <p className="flex items-start gap-2 text-cyan-glow font-medium bg-cyan-glow/5 border border-cyan-glow/15 rounded-xl px-4 py-3">
              <TrendingUp size={18} className="shrink-0 mt-0.5" />
              <span>{project.result[language]}</span>
            </p>
          )}
        </div>
      </div>

      {/* Client-facing features — the selling points */}
      <h3 className="text-sm font-bold uppercase tracking-wider text-text-main/80 mt-8 mb-3">
        {isRTL ? "ماذا تقدم المنصة" : "What the platform delivers"}
      </h3>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5 mb-8">
        {project.features.map((feature, i) => (
          <li key={`feature-${i}`} className="flex items-start gap-2.5 text-sm text-text-main/90 leading-relaxed">
            <CheckCircle size={16} className="text-cyan-glow shrink-0 mt-0.5" />
            {isRTL ? feature.ar : feature.en}
          </li>
        ))}
      </ul>

      {/* Tech — intentionally last and muted */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/5">
        <span className="text-xs text-text-muted/70 uppercase tracking-wider me-1">
          {isRTL ? "بُني بـ" : "Built with"}
        </span>
        {project.tech.map((t) => (
          <span
            key={`tech-${t}`}
            className="px-2 py-0.5 text-xs text-text-muted/80 rounded-md border border-white/5 bg-white/[0.02]"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function PortfolioContent({
  initialImagesByFolder,
}: {
  initialImagesByFolder: Record<string, string[]>;
}) {
  const { language } = useLanguage();
  const isRTL = language === "ar";

  return (
    <section className="py-20 bg-bg-dark min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isRTL ? (
              <>أعمال<span className="text-primary-blue">نا</span></>
            ) : (
              <>Our <span className="text-primary-blue">Work</span></>
            )}
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            {isRTL
              ? "منصات حقيقية تعمل اليوم وتخدم عملاء حقيقيين — هذه نتائجها وما تقدمه لأصحابها."
              : "Real platforms running in production for real customers — here is what they deliver for their owners."}
          </p>
        </div>

        <div className="flex flex-col gap-10 max-w-6xl mx-auto">
          {Projects.map((project, i) => (
            <ProjectCard
              key={`project-${i}-${project.title}`}
              project={project}
              index={i}
              initialImages={initialImagesByFolder[project.imagesFolder] ?? []}
            />
          ))}
        </div>

        {/* Marketing CTA — turn portfolio visitors into leads */}
        <div className="text-center mt-16">
          <p className="text-text-muted mb-4">
            {isRTL ? "عايز منصة بنفس المستوى لمشروعك؟" : "Want a platform like this for your business?"}
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
    </section>
  );
}

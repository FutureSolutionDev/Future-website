"use client";

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { projects } from '@/lib/constants';
import Image from 'next/image';
import { useState } from "react";

export function ProjectImage({ project }) {
    const fallbackImage = "/assets/hero-illustration.png";
    const [imgSrc, setImgSrc] = useState(
        project?.image || fallbackImage
    );
    return (
        <Image
            src={imgSrc}
            alt={project?.title || "Project image"}
            width={500}
            height={500}
            className="object-cover"
            onError={() => setImgSrc(fallbackImage)}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
            }}
        />
    );
}
export default function PortfolioPage() {
    const { language } = useLanguage();
    const projectsData = projects({ language })
    return (
        <section className="py-20 bg-bg-dark">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        {language === 'ar' ? 'أعمالنا' : 'Our'} <span className="text-primary-blue">{language === 'ar' ? '' : 'Work'}</span>
                    </h1>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        {language === 'ar'
                            ? 'استكشف مجموعة من مشاريعنا الأخيرة والتقنيات التي استخدمناها لبنائها.'
                            : 'Explore a selection of our recent projects and the technologies we used to build them.'}
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {projectsData.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-2xl bg-surface-dark border border-white/5"
                        >
                            <div className={`position-relative h-48 bg-gradient-to-r ${project.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} >
                                {project.image && <ProjectImage
                                    project={project}
                                />}
                            </div>
                            <div className="p-8 relative z-10 -mt-10">
                                <div className="bg-bg-dark/90 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-cyan-glow text-xs uppercase font-bold tracking-wider">{project.category}</span>
                                            <h3 className="text-2xl font-bold mt-1">{project.title}</h3>
                                        </div>
                                        <div className="flex space-x-2">
                                            {project.links.Github && (
                                                <a href={project.links.Github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                                                    <Github size={18} />
                                                </a>
                                            )}
                                            {project.links.Live && (
                                                <a href={project.links.Live} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary-blue text-white hover:bg-blue-600 transition-colors">
                                                    <ExternalLink size={18} />
                                                </a>
                                            )}
                            
                                        </div>
                                    </div>
                                    <p className="text-text-muted mb-6 text-sm">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map(t => (
                                            <span key={t} className="px-2 py-1 bg-surface-dark text-xs text-text-muted rounded-md border border-white/5">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

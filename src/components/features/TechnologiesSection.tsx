"use client";

import { motion } from 'framer-motion';

export function TechnologiesSection() {
    const techs = [
        { name: 'React', icon: '⚛️', color: 'text-cyan-400' },
        { name: 'Node.js', icon: '🟢', color: 'text-green-500' },
        { name: 'NEXT.js', icon: '▲', color: 'text-white' },
        { name: 'TypeScript', icon: 'TS', color: 'text-blue-500' },
        { name: 'Python', icon: '🐍', color: 'text-yellow-300' },
        { name: 'AWS', icon: '☁️', color: 'text-orange-400' },
        { name: 'PostgreSQL', icon: '🐘', color: 'text-blue-300' },
        { name: 'Docker', icon: '🐳', color: 'text-blue-500' },
    ];

    return (
        <section className="py-24 relative z-10 w-full">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">Technologies We Use</h2>
                    <p className="text-blue-200/60">Cutting-edge tools for cutting-edge solutions.</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {techs.map((tech, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="p-6 rounded-2xl bg-[#0a0a25] border border-blue-500/10 hover:border-blue-500/50 flex flex-col items-center justify-center gap-4 aspect-square group transition-all"
                        >
                            <div className={`text-5xl group-hover:scale-110 transition-transform ${tech.color}`}>
                                {tech.icon}
                            </div>
                            <span className="font-semibold text-xl text-white/90">{tech.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

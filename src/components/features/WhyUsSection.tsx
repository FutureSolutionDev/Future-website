"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Users } from 'lucide-react';

const features = [
    {
        icon: ShieldCheck,
        title: 'Secure & Reliable',
        description: 'Enterprise-grade security standards.',
    },
    {
        icon: Zap,
        title: 'High Performance',
        description: 'Optimized for speed and efficiency.',
    },
    {
        icon: Globe,
        title: 'Global Scale',
        description: 'Infrastructure that grows with you.',
    },
    {
        icon: Users,
        title: 'Expert Team',
        description: 'Dedicated senior engineers.',
    },
];

export function WhyUsSection() {
    // Assuming 'language' is defined elsewhere or passed as a prop,
    // for the purpose of this edit, we'll use a placeholder or assume it's available.
    // For example: const language = 'en';
    const language = 'en'; // Placeholder for language variable

    return (
        <section className="py-24 bg-bg-dark">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full" />
                        <img
                            src="/assets/hero-illustration.png"
                            alt="Why Us"
                            className="relative z-10 w-full h-auto drop-shadow-2xl"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">WHY <span className="text-primary-blue">Future Solutions?</span></h2>
                        <p className="text-text-muted text-lg mb-8">
                            We don&apos;t just write code; we architect success. Our team combines technical expertise with business acumen to deliver solutions that drive real results.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {features.map((feature, i) => (
                                <div key={i} className="flex items-start space-x-4">
                                    <div className="p-2 rounded-lg bg-surface-dark text-cyan-glow">
                                        <feature.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{feature.title}</h4>
                                        <p className="text-sm text-text-muted">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

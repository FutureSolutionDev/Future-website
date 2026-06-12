'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Greetings } from '@/lib/constants';

// Small star SVG for decoration
const MiniStar = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor">
        <path d="M10 1 L12 7 L18 7 L13 11 L15 17 L10 13 L5 17 L7 11 L2 7 L8 7 Z" />
    </svg>
);

// Hanging ornament ball
const HangingOrnament = ({ color, size = 12 }: { color: string; size?: number }) => (
    <svg viewBox="0 0 20 35" width={size} height={size * 1.75} fill="none">
        <defs>
            <radialGradient id={`orn-${color.replace('#', '')}`} cx="35%" cy="35%">
                <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                <stop offset="100%" stopColor={color} />
            </radialGradient>
        </defs>
        <line x1="10" y1="0" x2="10" y2="10" stroke="#DAA520" strokeWidth="0.8" />
        <circle cx="10" cy="10" r="2" fill="#DAA520" />
        <circle cx="10" cy="22" r="10" fill={`url(#orn-${color.replace('#', '')})`} />
        <ellipse cx="8" cy="18" rx="2.5" ry="1.5" fill="white" opacity="0.25" />
    </svg>
);

export function EidAlFitrDecorationDesktop() {
    const [hoveredLantern, setHoveredLantern] = useState<number | null>(null);
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);

    const lanterns = [
        { id: 1, position: 8, delay: 0, size: 65, chainLength: 4 },
        { id: 2, position: 70, delay: 0.2, size: 75, chainLength: 0 },
        { id: 3, position: 30, delay: 0.1, size: 75, chainLength: 0 },
        { id: 4, position: 88, delay: 0.3, size: 60, chainLength: 6 },
    ];

    const hangingStars = [
        { id: 1, position: 18, top: 2 },
        { id: 2, position: 38, top: 5 },
        { id: 3, position: 50, top: 0 },
        { id: 4, position: 62, top: 4 },
        { id: 5, position: 80, top: 2 },
        { id: 6, position: 95, top: 6 },
    ];

    const ornaments = [
        { id: 1, position: 22, color: '#E91E63', delay: 0.2 },
        { id: 2, position: 42, color: '#2196F3', delay: 0.5 },
        { id: 3, position: 55, color: '#4CAF50', delay: 0.3 },
        { id: 4, position: 75, color: '#FF9800', delay: 0.7 },
    ];

    return (
        <div className="absolute inset-x-0 top-full pointer-events-none overflow-visible z-40 h-28">
            {/* Hanging colored ornaments */}
            {ornaments.map((orn) => (
                <motion.div
                    key={`orn-${orn.id}`}
                    className="absolute pointer-events-auto cursor-pointer"
                    style={{
                        left: `${orn.position}%`,
                        top: '0px',
                    }}
                    animate={{
                        y: [0, 4, 0],
                        rotate: [-4, 4, -4],
                    }}
                    transition={{
                        duration: 3,
                        delay: orn.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    whileHover={{
                        scale: 1.4,
                        filter: `drop-shadow(0 0 10px ${orn.color}80)`,
                    }}
                >
                    <HangingOrnament color={orn.color} size={14} />
                </motion.div>
            ))}

            {/* Hanging Stars */}
            {hangingStars.map((star, i) => (
                <motion.div
                    key={`star-${star.id}`}
                    className="absolute pointer-events-auto cursor-pointer"
                    style={{
                        left: `${star.position}%`,
                        top: `${star.top}px`,
                        color: hoveredStar === star.id ? '#FFFFFF' : '#FFD700',
                        filter: hoveredStar === star.id
                            ? 'drop-shadow(0 0 12px rgba(255,255,255,1))'
                            : 'drop-shadow(0 0 4px rgba(255,215,0,0.5))',
                        transition: 'color 0.2s, filter 0.3s',
                    }}
                    animate={{
                        y: [0, 3, 0],
                        rotate: hoveredStar === star.id ? [0, 360] : [-3, 3, -3],
                        scale: hoveredStar === star.id ? 1.5 : [0.9, 1.1, 0.9],
                    }}
                    transition={{
                        duration: hoveredStar === star.id ? 0.6 : 3,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    onMouseEnter={() => setHoveredStar(star.id)}
                    onMouseLeave={() => setHoveredStar(null)}
                >
                    <MiniStar className="w-4 h-4" />
                </motion.div>
            ))}

            {/* Lanterns */}
            {lanterns.map((lantern) => (
                <motion.div
                    key={lantern.id}
                    className="absolute cursor-pointer pointer-events-auto"
                    style={{
                        left: `${lantern.position}%`,
                        top: `${lantern.chainLength}px`,
                        width: lantern.size,
                        height: lantern.size * 1.5,
                        transformOrigin: 'top center',
                    }}
                    animate={{
                        rotate: hoveredLantern === lantern.id
                            ? [-10, 10, -10]
                            : [-4, 4, -4],
                    }}
                    transition={{
                        duration: hoveredLantern === lantern.id ? 0.5 : 3,
                        delay: lantern.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    onMouseEnter={() => setHoveredLantern(lantern.id)}
                    onMouseLeave={() => setHoveredLantern(null)}
                >
                    <Image
                        src="/EidAlFitr/Lantern.webp"
                        alt="Eid Lantern"
                        width={lantern.size}
                        height={lantern.size * 1.5}
                        className="w-full h-full object-contain transition-all duration-300"
                        style={{
                            filter: hoveredLantern === lantern.id
                                ? 'drop-shadow(0 0 25px rgba(255,180,80,1)) brightness(1.3)'
                                : 'drop-shadow(0 0 10px rgba(255,180,80,0.5))',
                        }}
                    />
                </motion.div>
            ))}

            {/* Crescent Moon center */}
            <motion.div
                className="absolute left-[48%] md:left-[50%] -top-2 cursor-pointer pointer-events-auto"
                style={{ width: 60, height: 60 }}
                animate={{
                    y: [0, -4, 0],
                    rotate: [0, 3, -3, 0],
                }}
                transition={{
                    y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                }}
            >
                <Image
                    src="/EidAlFitr/Crescent.svg"
                    alt="Crescent Moon"
                    width={60}
                    height={60}
                    className="w-full h-full object-contain"
                    style={{
                        filter: 'drop-shadow(0 0 15px rgba(255,200,100,0.7))',
                    }}
                />
            </motion.div>

            {/* Sparkle particles */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                        left: `${3 + i * 10}%`,
                        top: `${8 + (i % 4) * 5}px`,
                        background: ['#FFD700', '#FF8F00', '#FFC107', '#E91E63', '#4CAF50'][i % 5],
                    }}
                    animate={{
                        y: [0, 15, 0],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                        duration: 3 + i * 0.3,
                        delay: i * 0.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

// Mini version for mobile menu
export function EidAlFitrDecorationMini() {
    return (
        <div className="flex items-center justify-center gap-3 py-3 border-b border-amber-500/20 mb-2">
            {/* Crescent */}
            <motion.div
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <Image
                    src="/EidAlFitr/Crescent.svg"
                    alt="Crescent"
                    width={28}
                    height={28}
                    style={{ filter: 'drop-shadow(0 0 8px rgba(255,200,100,0.6))' }}
                />
            </motion.div>

            {/* Lantern */}
            <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
                <Image
                    src="/EidAlFitr/Lantern.webp"
                    alt="Lantern"
                    width={22}
                    height={33}
                    style={{ filter: 'drop-shadow(0 0 6px rgba(255,180,80,0.5))' }}
                />
            </motion.div>

            {/* Text */}
            <span className="text-xs font-semibold px-1" style={{
                background: 'linear-gradient(90deg, #FFD700, #FF8F00, #FFD700)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}>
                Eid Mubarak
            </span>

            {/* Dates */}
            <motion.div
                animate={{ y: [0, -2, 0], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
                <Image
                    src="/EidAlFitr/Dates.webp"
                    alt="Dates"
                    width={30}
                    height={25}
                    style={{ filter: 'drop-shadow(0 0 4px rgba(139,69,19,0.3))' }}
                />
            </motion.div>

            {/* Crescent */}
            <motion.div
                animate={{ rotate: [3, -3, 3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <Image
                    src="/EidAlFitr/Crescent.svg"
                    alt="Crescent"
                    width={28}
                    height={28}
                    style={{ filter: 'drop-shadow(0 0 8px rgba(255,200,100,0.6))' }}
                />
            </motion.div>
        </div>
    );
}

export default function EidAlFitrDecoration({ Mode = "Desktop" }: { Mode?: "Desktop" | "Mobile" }) {
    if (!Greetings.EidAlFitr.Active) return null;
    if (Mode === "Desktop") return <EidAlFitrDecorationDesktop />;
    return <EidAlFitrDecorationMini />;
}

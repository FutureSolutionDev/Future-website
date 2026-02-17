'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

// Twinkling Star (4-point and 5-point)
const TwinkleStar = ({
    type = '4point',
    className = '',
    isHovered = false
}: {
    type?: '4point' | '5point';
    className?: string;
    isHovered?: boolean;
}) => (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor">
        <defs>
            <filter id="twinkleGlow">
                <feGaussianBlur stdDeviation={isHovered ? "2" : "0.5"} result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        {type === '4point' ? (
            <path
                d="M10 0 L11 8 L10 10 L9 8 Z M10 20 L9 12 L10 10 L11 12 Z M0 10 L8 9 L10 10 L8 11 Z M20 10 L12 11 L10 10 L12 9 Z"
                filter={isHovered ? "url(#twinkleGlow)" : undefined}
            />
        ) : (
            <path
                d="M10 1 L12 7 L18 7 L13 11 L15 17 L10 13 L5 17 L7 11 L2 7 L8 7 Z"
                filter={isHovered ? "url(#twinkleGlow)" : undefined}
            />
        )}
    </svg>
);

// Small hanging star SVG
const HangingStar = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 20 35" className={className} fill="none">
        <defs>
            <linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#DAA520" />
            </linearGradient>
        </defs>
        <circle cx="10" cy="3" r="1.5" fill="url(#starGold)" />
        <line x1="10" y1="4.5" x2="10" y2="12" stroke="#B8860B" strokeWidth="0.8" strokeDasharray="2 2" />
        <path
            d="M10 14 L12 20 L18 20 L13 24 L15 30 L10 26 L5 30 L7 24 L2 20 L8 20 Z"
            fill="url(#starGold)"
        />
    </svg>
);

export default function RamadanDecoration() {
    const [hoveredLantern, setHoveredLantern] = useState<number | null>(null);
    const [moonHovered, setMoonHovered] = useState(false);
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);

    // Lantern configurations
    const lanterns = [
        { id: 1, position: 70, delay: 0, size: 80, chainLength: 0 },
        { id: 2, position: 88, delay: 0.3, size: 65, chainLength: 6 },
    ];

    // Hanging stars
    const hangingStars = [
        { id: 1, position: 62, top: 0 },
        { id: 2, position: 80, top: 5 },
        { id: 3, position: 95, top: 2 },
    ];

    // Twinkling stars
    const twinkleStars = [
        { id: 1, left: 3, top: 2, size: 'w-3 h-3', type: '4point' as const, delay: 0 },
        { id: 2, left: 10, top: 8, size: 'w-2 h-2', type: '5point' as const, delay: 0.5 },
        { id: 3, left: 20, top: 3, size: 'w-2.5 h-2.5', type: '4point' as const, delay: 0.3 },
        { id: 4, left: 32, top: 6, size: 'w-2 h-2', type: '4point' as const, delay: 0.8 },
        { id: 5, left: 45, top: 2, size: 'w-3 h-3', type: '5point' as const, delay: 0.2 },
        { id: 6, left: 55, top: 8, size: 'w-2 h-2', type: '4point' as const, delay: 0.6 },
    ];

    return (
        <div className="absolute inset-x-0 top-full pointer-events-none overflow-visible z-40 h-28">

            {/* Hanging Stars */}
            {hangingStars.map((star, i) => (
                <motion.div
                    key={`hanging-star-${star.id}`}
                    className="absolute pointer-events-auto cursor-pointer"
                    style={{
                        left: `${star.position}%`,
                        top: `${star.top}px`,
                    }}
                    animate={{
                        y: [0, 3, 0],
                        rotate: [-3, 3, -3],
                    }}
                    transition={{
                        duration: 3,
                        delay: i * 0.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    whileHover={{
                        scale: 1.3,
                        filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.8))',
                    }}
                >
                    <HangingStar className="w-5 h-10" />
                </motion.div>
            ))}

            {/* Lanterns using SVG file */}
            {lanterns.map((lantern) => (
                <motion.div
                    key={lantern.id}
                    className="absolute cursor-pointer pointer-events-auto"
                    style={{
                        left: `${lantern.position}%`,
                        top: `${lantern.chainLength}px`,
                        transform: 'translateX(-50%)',
                        width: lantern.size,
                        height: lantern.size * 1.5,
                    }}
                    animate={{
                        y: hoveredLantern === lantern.id ? [-2, 2, -2] : [0, 4, 0],
                        rotate: hoveredLantern === lantern.id ? [-1, 1, -1] : [-2, 2, -2],
                    }}
                    transition={{
                        duration: hoveredLantern === lantern.id ? 0.4 : 3.5,
                        delay: lantern.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    onMouseEnter={() => setHoveredLantern(lantern.id)}
                    onMouseLeave={() => setHoveredLantern(null)}
                    whileHover={{ scale: 1.1 }}
                >
                    <Image
                        src="/Ramadan/Lantern.svg"
                        alt="Ramadan Lantern"
                        width={lantern.size}
                        height={lantern.size * 1.5}
                        className="w-full h-full object-contain transition-all duration-300"
                        style={{
                            filter: hoveredLantern === lantern.id
                                ? 'drop-shadow(0 0 20px rgba(255,180,80,0.9)) brightness(1.2)'
                                : 'drop-shadow(0 0 10px rgba(255,180,80,0.5))',
                        }}
                    />
                </motion.div>
            ))}

            {/* Crescent Moon using SVG file */}
            <motion.div
                className="absolute left-[50%] md:left-[55%] -top-3 cursor-pointer pointer-events-auto"
                style={{
                    width: 70,
                    height: 70,
                }}
                animate={{
                    y: moonHovered ? [0, -2, 0] : [0, -5, 0],
                    scale: moonHovered ? 1.15 : 1,
                    rotate: moonHovered ? [0, 5, 0] : [0, 3, 0],
                }}
                transition={{
                    duration: moonHovered ? 0.3 : 4,
                    repeat: moonHovered ? 0 : Infinity,
                    ease: 'easeInOut',
                }}
                onMouseEnter={() => setMoonHovered(true)}
                onMouseLeave={() => setMoonHovered(false)}
            >
                <Image
                    src="/Ramadan/Helal.svg"
                    alt="Crescent Moon"
                    width={70}
                    height={70}
                    className="w-full h-full object-contain transition-all duration-300"
                    style={{
                        filter: moonHovered
                            ? 'drop-shadow(0 0 30px rgba(255,200,100,1)) brightness(1.3)'
                            : 'drop-shadow(0 0 15px rgba(255,200,100,0.7))',
                    }}
                />
            </motion.div>

            {/* Twinkling Stars */}
            {twinkleStars.map((star) => (
                <motion.div
                    key={star.id}
                    className={`absolute ${star.size} cursor-pointer pointer-events-auto`}
                    style={{
                        left: `${star.left}%`,
                        top: `${star.top}px`,
                        color: hoveredStar === star.id ? '#FFFFFF' : '#FFD700',
                        filter: hoveredStar === star.id
                            ? 'drop-shadow(0 0 10px rgba(255,255,255,0.9))'
                            : 'drop-shadow(0 0 4px rgba(255,215,0,0.6))',
                        transition: 'color 0.2s ease, filter 0.2s ease'
                    }}
                    animate={{
                        opacity: hoveredStar === star.id ? 1 : [0.5, 1, 0.5],
                        scale: hoveredStar === star.id ? 1.5 : [0.9, 1.1, 0.9],
                    }}
                    transition={{
                        duration: hoveredStar === star.id ? 0.2 : 2,
                        delay: star.delay,
                        repeat: hoveredStar === star.id ? 0 : Infinity,
                        ease: 'easeInOut',
                    }}
                    onMouseEnter={() => setHoveredStar(star.id)}
                    onMouseLeave={() => setHoveredStar(null)}
                >
                    <TwinkleStar type={star.type} className="w-full h-full" isHovered={hoveredStar === star.id} />
                </motion.div>
            ))}

            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-yellow-300/50"
                    style={{
                        left: `${5 + i * 12}%`,
                        top: `${10 + (i % 3) * 4}px`,
                    }}
                    animate={{
                        y: [0, 12, 0],
                        opacity: [0.2, 0.7, 0.2],
                    }}
                    transition={{
                        duration: 4 + i * 0.3,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

// Mini version for mobile menu
export function RamadanDecorationMini() {
    const [moonHovered, setMoonHovered] = useState(false);
    const [lanternHovered, setLanternHovered] = useState(false);

    return (
        <div className="flex items-center justify-center gap-4 py-3 border-b border-yellow-500/20 mb-2">
            {/* Moon */}
            <motion.div
                className="cursor-pointer"
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                onMouseEnter={() => setMoonHovered(true)}
                onMouseLeave={() => setMoonHovered(false)}
                whileHover={{ scale: 1.2 }}
            >
                <Image
                    src="/Ramadan/Helal.svg"
                    alt="Moon"
                    width={32}
                    height={32}
                    className="transition-all duration-300"
                    style={{
                        filter: moonHovered
                            ? 'drop-shadow(0 0 15px rgba(255,200,100,1)) brightness(1.3)'
                            : 'drop-shadow(0 0 8px rgba(255,200,100,0.6))',
                    }}
                />
            </motion.div>

            {/* Lantern */}
            <motion.div
                className="cursor-pointer"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                onMouseEnter={() => setLanternHovered(true)}
                onMouseLeave={() => setLanternHovered(false)}
                whileHover={{ scale: 1.1 }}
            >
                <Image
                    src="/Ramadan/Lantern.svg"
                    alt="Lantern"
                    width={28}
                    height={42}
                    className="transition-all duration-300"
                    style={{
                        filter: lanternHovered
                            ? 'drop-shadow(0 0 12px rgba(255,180,80,0.9)) brightness(1.2)'
                            : 'drop-shadow(0 0 6px rgba(255,180,80,0.5))',
                    }}
                />
            </motion.div>

            {/* Text */}
            <span className="text-xs font-semibold px-2" style={{
                background: 'linear-gradient(90deg, #FFD700, #F7A828, #FFD700)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}>
                Ramadan Mubarak
            </span>

            {/* Lantern */}
            <motion.div
                className="cursor-pointer"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.1 }}
            >
                <Image
                    src="/Ramadan/Lantern.svg"
                    alt="Lantern"
                    width={28}
                    height={42}
                    style={{
                        filter: 'drop-shadow(0 0 6px rgba(255,180,80,0.5))',
                    }}
                />
            </motion.div>

            {/* Moon */}
            <motion.div
                className="cursor-pointer"
                animate={{ rotate: [3, -3, 3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.2 }}
            >
                <Image
                    src="/Ramadan/Helal.svg"
                    alt="Moon"
                    width={32}
                    height={32}
                    style={{
                        filter: 'drop-shadow(0 0 8px rgba(255,200,100,0.6))',
                    }}
                />
            </motion.div>
        </div>
    );
}

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Greetings } from '@/lib/constants';

// Islamic geometric mini star
const GeoStar = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 0L14 8L12 4L10 8Z M24 12L16 14L20 12L16 10Z M12 24L10 16L12 20L14 16Z M0 12L8 10L4 12L8 14Z M21 3L16 10L18.5 5.5Z M3 3L8 10L5.5 5.5Z M21 21L14 16L18.5 18.5Z M3 21L10 16L5.5 18.5Z" />
    </svg>
);

// Hanging Islamic ornament
const IslamicOrnament = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 20 40" className={className} fill="none">
        <defs>
            <linearGradient id="iornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#2E7D32" />
            </linearGradient>
        </defs>
        <line x1="10" y1="0" x2="10" y2="12" stroke="#DAA520" strokeWidth="0.8" />
        <circle cx="10" cy="12" r="1.5" fill="#DAA520" />
        <path d="M4 18 Q10 12 16 18 L16 32 Q10 38 4 32 Z" fill="url(#iornGrad)" opacity="0.8" />
        <path d="M7 20 Q10 16 13 20 L13 30 Q10 34 7 30 Z" fill="none" stroke="#FFD700" strokeWidth="0.5" opacity="0.5" />
        <circle cx="10" cy="25" r="2" fill="none" stroke="#FFD700" strokeWidth="0.4" opacity="0.6" />
    </svg>
);

export function EidAlAdhaDecorationDesktop() {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const sheepPositions = [
        { id: 'sheep-1', position: 46, top: 2, size: 50 },
    ];

    const ornaments = [
        { id: 'orn-1', position: 5, delay: 0 },
        { id: 'orn-2', position: 18, delay: 0.3 },
        { id: 'orn-3', position: 35, delay: 0.1 },
        { id: 'orn-4', position: 60, delay: 0.4 },
        { id: 'orn-5', position: 78, delay: 0.2 },
        { id: 'orn-6', position: 93, delay: 0.5 },
    ];

    const stars = [
        { id: 'star-1', position: 10, top: 3, delay: 0 },
        { id: 'star-2', position: 25, top: 6, delay: 0.4 },
        { id: 'star-3', position: 42, top: 2, delay: 0.2 },
        { id: 'star-4', position: 55, top: 5, delay: 0.6 },
        { id: 'star-5', position: 70, top: 3, delay: 0.3 },
        { id: 'star-6', position: 85, top: 7, delay: 0.7 },
        { id: 'star-7', position: 97, top: 4, delay: 0.1 },
    ];

    const mosquePositions = [
        { id: 'mosque-1', position: 70, top: -2, size: 80 },
        { id: 'mosque-2', position: 25, top: 0, size: 70 },
    ];

    return (
        <div className="absolute inset-x-0 top-full pointer-events-none overflow-visible z-40 h-28">
            {/* Islamic ornaments hanging */}
            {ornaments.map((orn) => (
                <motion.div
                    key={orn.id}
                    className="absolute pointer-events-auto cursor-pointer"
                    style={{
                        left: `${orn.position}%`,
                        top: '0px',
                        transformOrigin: 'top center',
                    }}
                    animate={{
                        rotate: hoveredItem === orn.id ? [-8, 8, -8] : [-3, 3, -3],
                    }}
                    transition={{
                        duration: hoveredItem === orn.id ? 0.5 : 3.5,
                        delay: orn.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    onMouseEnter={() => setHoveredItem(orn.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    whileHover={{
                        scale: 1.3,
                        filter: 'drop-shadow(0 0 12px rgba(76,175,80,0.8))',
                    }}
                >
                    <IslamicOrnament className="w-5 h-10" />
                </motion.div>
            ))}

            {/* Twinkling stars */}
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute pointer-events-auto cursor-pointer"
                    style={{
                        left: `${star.position}%`,
                        top: `${star.top}px`,
                        color: hoveredItem === star.id ? '#FFFFFF' : '#FFD700',
                        filter: hoveredItem === star.id
                            ? 'drop-shadow(0 0 12px rgba(255,255,255,1))'
                            : 'drop-shadow(0 0 4px rgba(255,215,0,0.4))',
                        transition: 'color 0.2s, filter 0.3s',
                    }}
                    animate={{
                        opacity: hoveredItem === star.id ? 1 : [0.4, 1, 0.4],
                        scale: hoveredItem === star.id ? 1.8 : [0.9, 1.1, 0.9],
                        rotate: hoveredItem === star.id ? [0, 360] : 0,
                    }}
                    transition={{
                        duration: hoveredItem === star.id ? 0.6 : 2.5,
                        delay: star.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    onMouseEnter={() => setHoveredItem(star.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    <GeoStar className="w-3.5 h-3.5" />
                </motion.div>
            ))}

            {/* Small mosque silhouettes */}
            {mosquePositions.map((mosque) => (
                <motion.div
                    key={mosque.id}
                    className="absolute pointer-events-auto cursor-pointer"
                    style={{
                        left: `${mosque.position}%`,
                        top: `${mosque.top}px`,
                        width: mosque.size,
                        height: mosque.size * 0.65,
                        transformOrigin: 'top center',
                    }}
                    animate={{
                        rotate: hoveredItem === mosque.id ? [-3, 3, -3] : [-2, 2, -2],
                        y: [0, -3, 0],
                    }}
                    transition={{
                        rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                        y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    onMouseEnter={() => setHoveredItem(mosque.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    <Image
                        src="/EidAlAdha/Mosque.webp"
                        alt="Mosque"
                        width={mosque.size}
                        height={mosque.size * 0.65}
                        className="w-full h-full object-contain transition-all duration-300"
                        style={{
                            filter: hoveredItem === mosque.id
                                ? 'drop-shadow(0 0 15px rgba(46,125,50,0.8)) brightness(1.2)'
                                : 'drop-shadow(0 0 6px rgba(46,125,50,0.3))',
                            opacity: hoveredItem === mosque.id ? 0.9 : 0.6,
                        }}
                    />
                </motion.div>
            ))}

            {/* Sheep (center decoration) */}
            {sheepPositions.map((sheep) => (
                <motion.div
                    key={sheep.id}
                    className="absolute pointer-events-auto cursor-pointer"
                    style={{
                        left: `${sheep.position}%`,
                        top: `${sheep.top}px`,
                        width: sheep.size,
                        height: sheep.size * 0.85,
                    }}
                    animate={{
                        y: hoveredItem === sheep.id ? [-2, 2, -2] : [0, -4, 0],
                        rotate: hoveredItem === sheep.id ? [-5, 5, -5] : 0,
                    }}
                    transition={{
                        y: { duration: hoveredItem === sheep.id ? 0.4 : 3, repeat: Infinity, ease: 'easeInOut' },
                        rotate: { duration: 0.4, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    onMouseEnter={() => setHoveredItem(sheep.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    <Image
                        src="/EidAlAdha/Sheep.svg"
                        alt="Sheep"
                        width={sheep.size}
                        height={sheep.size * 0.85}
                        className="w-full h-full object-contain transition-all duration-300"
                        style={{
                            filter: hoveredItem === sheep.id
                                ? 'drop-shadow(0 0 15px rgba(255,215,0,0.6)) brightness(1.1)'
                                : 'drop-shadow(0 0 5px rgba(0,0,0,0.2))',
                        }}
                    />
                </motion.div>
            ))}

            {/* Green + gold floating particles */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                        left: `${2 + i * 10}%`,
                        top: `${6 + (i % 4) * 5}px`,
                        background: i % 2 === 0 ? '#FFD700' : '#4CAF50',
                    }}
                    animate={{
                        y: [0, 12, 0],
                        opacity: [0.2, 0.7, 0.2],
                    }}
                    transition={{
                        duration: 3.5 + i * 0.3,
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
export function EidAlAdhaDecorationMini() {
    return (
        <div className="flex items-center justify-center gap-3 py-3 border-b border-green-500/20 mb-2">
            {/* Crescent */}
            <motion.div
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <Image
                    src="/EidAlAdha/Crescent.svg"
                    alt="Crescent"
                    width={26}
                    height={26}
                    style={{ filter: 'drop-shadow(0 0 6px rgba(255,200,100,0.6))' }}
                />
            </motion.div>

            {/* Sheep */}
            <motion.div
                animate={{ y: [0, -2, 0], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
                <Image
                    src="/EidAlAdha/Sheep.svg"
                    alt="Sheep"
                    width={32}
                    height={28}
                    style={{ filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.2))' }}
                />
            </motion.div>

            {/* Text */}
            <span className="text-xs font-semibold px-1" style={{
                background: 'linear-gradient(90deg, #FFD700, #4CAF50, #FFD700)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}>
                Eid Al-Adha
            </span>

            {/* Mosque */}
            <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
                <Image
                    src="/EidAlAdha/Mosque.webp"
                    alt="Mosque"
                    width={35}
                    height={22}
                    style={{ filter: 'drop-shadow(0 0 4px rgba(46,125,50,0.3))' }}
                />
            </motion.div>

            {/* Crescent */}
            <motion.div
                animate={{ rotate: [3, -3, 3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <Image
                    src="/EidAlAdha/Crescent.svg"
                    alt="Crescent"
                    width={26}
                    height={26}
                    style={{ filter: 'drop-shadow(0 0 6px rgba(255,200,100,0.6))' }}
                />
            </motion.div>
        </div>
    );
}

export default function EidAlAdhaDecoration({ Mode = "Desktop" }: { Mode?: "Desktop" | "Mobile" }) {
    if (!Greetings.EidAlAdha.Active) return null;
    if (Mode === "Desktop") return <EidAlAdhaDecorationDesktop />;
    return <EidAlAdhaDecorationMini />;
}

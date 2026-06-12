'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Greetings } from '@/lib/constants';
import confetti from 'canvas-confetti';

// Islamic geometric star
const IslamicStar8 = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
        <path d="M12 0L14 8L12 4L10 8Z M24 12L16 14L20 12L16 10Z M12 24L10 16L12 20L14 16Z M0 12L8 10L4 12L8 14Z M21 3L16 10L18.5 5.5Z M3 3L8 10L5.5 5.5Z M21 21L14 16L18.5 18.5Z M3 21L10 16L5.5 18.5Z" />
    </svg>
);

// Islamic arch pattern
const IslamicArch = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 100 120" className={className} fill="none">
        <defs>
            <linearGradient id="archGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2E7D32" stopOpacity="0.3" />
            </linearGradient>
        </defs>
        <path d="M10 120 L10 50 Q50 0 90 50 L90 120" stroke="url(#archGrad)" strokeWidth="1.5" fill="none" />
        <path d="M20 120 L20 55 Q50 15 80 55 L80 120" stroke="url(#archGrad)" strokeWidth="1" fill="none" />
        <path d="M30 120 L30 60 Q50 30 70 60 L70 120" stroke="url(#archGrad)" strokeWidth="0.8" fill="none" />
        <circle cx="50" cy="45" r="8" stroke="url(#archGrad)" strokeWidth="0.6" fill="none" />
        <circle cx="50" cy="45" r="4" stroke="url(#archGrad)" strokeWidth="0.4" fill="none" />
    </svg>
);

// Mountain silhouette (Arafat)
const Mountains = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 400 100" className={className} fill="none" preserveAspectRatio="none">
        <defs>
            <linearGradient id="mtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1B5E20" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0D3B12" stopOpacity="0.3" />
            </linearGradient>
        </defs>
        <path d="M0 100 L30 60 L60 75 L100 30 L140 55 L180 20 L220 45 L260 25 L300 50 L340 35 L380 65 L400 50 L400 100 Z" fill="url(#mtGrad)" />
    </svg>
);

// Confetti for Eid Al-Adha (green + gold theme)
function fireEidConfetti() {
    const duration = 3500;
    const end = Date.now() + duration;
    const colors = ['#FFD700', '#2E7D32', '#4CAF50', '#DAA520', '#1B5E20', '#FFC107'];

    const frame = () => {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 50,
            origin: { x: 0, y: 0.5 },
            colors,
            ticks: 200,
            gravity: 0.7,
            scalar: 1.2,
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 50,
            origin: { x: 1, y: 0.5 },
            colors,
            ticks: 200,
            gravity: 0.7,
            scalar: 1.2,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    setTimeout(() => {
        confetti({
            particleCount: 80,
            spread: 90,
            origin: { x: 0.5, y: 0.35 },
            colors,
            ticks: 250,
            gravity: 0.5,
            scalar: 1.5,
            shapes: ['circle', 'square'],
        });
    }, 600);
}

// Roaming sheep component — walks across the screen like in a farm
const RoamingSheep = ({
    id,
    startX,
    endX,
    y,
    size,
    duration,
    delay,
    direction,
}: {
    id: number;
    startX: number;
    endX: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    direction: 'left' | 'right';
}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            className="absolute cursor-pointer pointer-events-auto"
            style={{
                bottom: `${y}%`,
                width: size,
                height: size * 0.85,
                // Flip sheep based on walking direction
                scaleX: direction === 'left' ? -1 : 1,
            }}
            // Walk across the screen
            animate={{
                x: [
                    `${startX}vw`,
                    `${endX}vw`,
                ],
            }}
            transition={{
                x: {
                    duration,
                    delay,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'linear',
                },
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Bounce + tilt while walking */}
            <motion.div
                animate={{
                    y: hovered ? [0, -15, 0] : [0, -4, 0, -4, 0],
                    rotate: hovered ? [0, -8, 8, -8, 0] : [0, -1.5, 0, 1.5, 0],
                }}
                transition={{
                    y: {
                        duration: hovered ? 0.4 : 0.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    },
                    rotate: {
                        duration: hovered ? 0.5 : 0.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    },
                }}
            >
                {/* Shadow under sheep */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        bottom: -4,
                        left: '15%',
                        width: '70%',
                        height: 6,
                        background: 'radial-gradient(ellipse, rgba(0,0,0,0.35), transparent)',
                    }}
                    animate={{
                        scaleX: [1, 0.85, 1, 0.85, 1],
                        opacity: [0.4, 0.25, 0.4, 0.25, 0.4],
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <Image
                    src="/EidAlAdha/Sheep.svg"
                    alt={`Sheep ${id}`}
                    width={size}
                    height={size * 0.85}
                    className="w-full h-full object-contain"

                    style={{
                        filter: hovered
                            ? 'drop-shadow(0 8px 25px rgba(255,215,0,0.6)) brightness(1.15)'
                            : 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))',
                        // transform: 'rotate(360deg)',
                        transition: 'filter 0.3s',
                    }}
                />
            </motion.div>
        </motion.div>
    );
};

// Sheep herd configuration
const roamingSheep = [
    // Bottom layer — larger, slower (closer to camera)
    { id: 1, startX: -15, endX: 110, y: 8, size: 90, duration: 18, delay: 0, direction: 'right' as const },
    { id: 2, startX: 110, endX: -15, y: 12, size: 80, duration: 22, delay: 3, direction: 'left' as const },
    { id: 3, startX: -20, endX: 115, y: 5, size: 95, duration: 20, delay: 7, direction: 'right' as const },
    // Mid layer — medium size
    { id: 4, startX: 115, endX: -20, y: 18, size: 60, duration: 25, delay: 1.5, direction: 'left' as const },
    { id: 5, startX: -15, endX: 110, y: 22, size: 55, duration: 28, delay: 5, direction: 'right' as const },
    // Top layer — smaller, faster (farther from camera, near mountains)
    { id: 6, startX: 110, endX: -15, y: 28, size: 40, duration: 30, delay: 2, direction: 'left' as const },
    { id: 7, startX: -10, endX: 110, y: 32, size: 35, duration: 32, delay: 10, direction: 'right' as const },
];

export function EidAlAdhaGreetingView() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const hasFiredRef = useRef(false);

    useEffect(() => {
        const hasSeenGreeting = sessionStorage.getItem('eidAlAdhaGreetingSeen');
        if (!hasSeenGreeting) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                setIsAnimating(true);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, []);

    const triggerConfetti = useCallback(() => {
        if (!hasFiredRef.current) {
            hasFiredRef.current = true;
            setTimeout(fireEidConfetti, 900);
        }
    }, []);

    useEffect(() => {
        if (isAnimating) triggerConfetti();
    }, [isAnimating, triggerConfetti]);

    const handleClose = () => {
        setIsAnimating(false);
        confetti({
            particleCount: 120,
            spread: 160,
            origin: { x: 0.5, y: 0.5 },
            colors: ['#FFD700', '#2E7D32', '#4CAF50', '#DAA520'],
            ticks: 200,
            gravity: 0.5,
            scalar: 1.6,
        });
        setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem('eidAlAdhaGreetingSeen', 'true');
        }, 600);
    };

    // Stars
    const stars = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        size: [14, 18, 22][i % 3],
        top: `${(i * 17 + 5) % 95}%`,
        left: `${(i * 23 + 11) % 95}%`,
        delay: (i * 0.15) % 3,
        duration: 3 + (i % 3),
    }));

    // Floating light particles (firefly-like)
    const fireflies = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: `${(i * 7 + 3) % 95}%`,
        top: `${(i * 13 + 10) % 80}%`,
        size: 2 + (i % 3),
        delay: i * 0.4,
        duration: 4 + (i % 3),
    }));

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isAnimating && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden"
                    style={{
                        background: 'radial-gradient(ellipse at top, #0D3B12 0%, #071F0A 40%, #030F05 100%)',
                    }}
                >
                    {/* Mountain silhouette at bottom */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-32 md:h-40 pointer-events-none"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                    >
                        <Mountains className="w-full h-full" />
                    </motion.div>

                    {/* Animated God Rays from top */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={`ray-${i}`}
                                className="absolute top-0 origin-top"
                                style={{
                                    left: `${10 + i * 11}%`,
                                    width: '3px',
                                    height: '100%',
                                    background: `linear-gradient(180deg, rgba(255,215,0,${0.08 + i * 0.02}) 0%, transparent 50%)`,
                                    transform: `rotate(${-20 + i * 5}deg)`,
                                }}
                                animate={{
                                    opacity: [0.2, 0.6, 0.2],
                                    scaleY: [0.7, 1, 0.7],
                                }}
                                transition={{
                                    duration: 4 + i * 0.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </div>

                    {/* Stars */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {stars.map((star) => (
                            <motion.div
                                key={star.id}
                                className="absolute text-yellow-400"
                                style={{ top: star.top, left: star.left }}
                                animate={{
                                    opacity: [0.15, 0.8, 0.15],
                                    scale: [0.8, 1.2, 0.8],
                                }}
                                transition={{
                                    duration: star.duration,
                                    delay: star.delay,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            >
                                <IslamicStar8 size={star.size} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Floating Islamic Arches with 3D rotation */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '800px' }}>
                        {[0, 1, 2, 3].map((i) => (
                            <motion.div
                                key={`arch-${i}`}
                                className="absolute w-24 h-32 md:w-32 md:h-40 opacity-15"
                                style={{
                                    top: `${5 + i * 22}%`,
                                    left: `${(i * 27 + 5) % 85}%`,
                                    transformStyle: 'preserve-3d',
                                }}
                                animate={{
                                    rotateY: [0, 360],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    rotateY: { duration: 20 + i * 6, repeat: Infinity, ease: 'linear' },
                                    scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                                }}
                            >
                                <IslamicArch />
                            </motion.div>
                        ))}
                    </div>

                    {/* Firefly particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {fireflies.map((ff) => (
                            <motion.div
                                key={`ff-${ff.id}`}
                                className="absolute rounded-full"
                                style={{
                                    left: ff.left,
                                    top: ff.top,
                                    width: ff.size,
                                    height: ff.size,
                                    background: 'radial-gradient(circle, #FFD700, transparent)',
                                    boxShadow: '0 0 8px rgba(255,215,0,0.6)',
                                }}
                                animate={{
                                    x: [0, 20, -15, 0],
                                    y: [0, -15, 10, 0],
                                    opacity: [0.3, 0.9, 0.3],
                                    scale: [0.8, 1.3, 0.8],
                                }}
                                transition={{
                                    duration: ff.duration,
                                    delay: ff.delay,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </div>

                    {/* Roaming Sheep — walking across the screen */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
                        {roamingSheep.map((sheep) => (
                            <RoamingSheep key={`sheep-${sheep.id}`} {...sheep} />
                        ))}
                    </div>

                    {/* Crescent Moon - top right */}
                    <motion.div
                        className="absolute top-6 right-6 md:top-10 md:right-14 w-20 h-20 md:w-28 md:h-28"
                        animate={{
                            y: [0, -8, 0],
                            rotate: [0, 3, -3, 0],
                        }}
                        transition={{
                            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                            rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
                        }}
                    >
                        <Image
                            src="/EidAlAdha/Crescent.svg"
                            alt="Crescent"
                            width={112}
                            height={112}
                            className="w-full h-full object-contain"
                            style={{
                                filter: 'drop-shadow(0 0 30px rgba(255,200,100,0.8)) drop-shadow(0 0 60px rgba(255,180,80,0.3))',
                            }}
                        />
                    </motion.div>

                    {/* ===== MAIN CONTENT ===== */}
                    <motion.div
                        className="relative text-center max-w-2xl mx-auto z-10"
                        style={{ perspective: '1200px' }}
                        initial={{ scale: 0.7, y: 50, opacity: 0, rotateX: 15 }}
                        animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        {/* Kaaba silhouette */}
                        <motion.div
                            className="flex justify-center mb-4"
                            animate={{
                                y: [0, -5, 0],
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <Image
                                src="/EidAlAdha/Kaaba.webp"
                                alt="Kaaba"
                                width={100}
                                height={100}
                                className="w-20 h-auto md:w-24 opacity-70"
                                style={{
                                    filter: 'drop-shadow(0 5px 20px rgba(27,94,32,0.4)) drop-shadow(0 0 40px rgba(255,215,0,0.15))',
                                }}
                            />
                        </motion.div>

                        {/* Arabic Greeting */}
                        <motion.h1
                            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-3"
                            style={{ fontFamily: 'var(--font-cairo)' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.7 }}
                        >
                            <motion.span
                                style={{
                                    background: 'linear-gradient(90deg, #FFD700, #4CAF50, #FFD700, #2E7D32, #FFD700)',
                                    backgroundSize: '300% 100%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                عيد أضحى مبارك
                            </motion.span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            className="text-xl md:text-2xl mb-2 text-green-100"
                            style={{ fontFamily: 'var(--font-cairo)' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            كل عام وأنتم بخير
                        </motion.p>

                        {/* English */}
                        <motion.div
                            className="mb-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                        >
                            <p className="text-lg md:text-xl font-medium" style={{
                                background: 'linear-gradient(90deg, #FFD700, #4CAF50)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                Eid Al-Adha Mubarak
                            </p>
                            <p className="text-sm md:text-base text-green-200/60 mt-1">
                                May your sacrifice be accepted and blessed
                            </p>
                        </motion.div>

                        {/* Company */}
                        <motion.div
                            className="mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 }}
                        >
                            <p className="text-xs text-green-300/40 mb-1">From</p>
                            <p className="text-lg md:text-xl font-bold" style={{
                                background: 'linear-gradient(90deg, #FFD700, #4CAF50)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                Future Solutions Dev
                            </p>
                        </motion.div>

                        {/* Divider */}
                        <motion.div
                            className="flex items-center justify-center gap-4 mb-6"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1.0, duration: 0.5 }}
                        >
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-green-400 to-transparent" />
                            <IslamicStar8 size={16} className="text-green-400" />
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-green-400 to-transparent" />
                        </motion.div>

                        {/* Close Button */}
                        <motion.button
                            onClick={handleClose}
                            className="px-12 py-3 rounded-full font-semibold transition-all duration-300 text-lg"
                            style={{
                                background: 'linear-gradient(135deg, #FFD700 0%, #4CAF50 50%, #FFD700 100%)',
                                backgroundSize: '200% 100%',
                                color: '#0D3B12',
                                boxShadow: '0 4px 30px rgba(76, 175, 80, 0.4), 0 0 60px rgba(255, 215, 0, 0.15)',
                            }}
                            whileHover={{
                                scale: 1.08,
                                boxShadow: '0 6px 40px rgba(76, 175, 80, 0.6), 0 0 80px rgba(255, 215, 0, 0.25)',
                                backgroundPosition: '100% 50%',
                            }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                        >
                            متابعة
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function EidAlAdhaGreeting() {
    if (!Greetings.EidAlAdha.Active) return null;
    return <EidAlAdhaGreetingView />;
}

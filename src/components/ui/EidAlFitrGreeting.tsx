'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Greetings } from '@/lib/constants';
import confetti from 'canvas-confetti';

// Inline SVG Components
const IslamicStar = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
        <path d="M12 0L14.59 8.26L23.41 8.26L16.41 13.37L18.98 21.63L12 16.52L5.02 21.63L7.59 13.37L0.59 8.26L9.41 8.26Z" />
    </svg>
);

const GeometricOrnament = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 80 80" className={className} fill="none">
        <defs>
            <linearGradient id="ornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FF8F00" stopOpacity="0.4" />
            </linearGradient>
        </defs>
        <polygon points="40,5 75,25 75,55 40,75 5,55 5,25" stroke="url(#ornGrad)" strokeWidth="1" fill="none" />
        <polygon points="40,15 65,30 65,50 40,65 15,50 15,30" stroke="url(#ornGrad)" strokeWidth="0.8" fill="none" />
        <polygon points="40,25 55,35 55,45 40,55 25,45 25,35" stroke="url(#ornGrad)" strokeWidth="0.6" fill="none" />
        <circle cx="40" cy="40" r="5" stroke="url(#ornGrad)" strokeWidth="0.5" fill="none" />
    </svg>
);

// Confetti burst function
function fireConfetti() {
    const duration = 4000;
    const end = Date.now() + duration;

    const colors = ['#FFD700', '#FF8F00', '#FFC107', '#4CAF50', '#2196F3', '#E91E63', '#9C27B0'];

    const frame = () => {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors,
            ticks: 200,
            gravity: 0.8,
            scalar: 1.2,
            drift: 0.5,
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors,
            ticks: 200,
            gravity: 0.8,
            scalar: 1.2,
            drift: -0.5,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    };
    frame();

    // Big center burst
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 100,
            origin: { x: 0.5, y: 0.4 },
            colors,
            ticks: 300,
            gravity: 0.6,
            scalar: 1.5,
            shapes: ['circle', 'square'],
        });
    }, 500);
}

// Floating balloon component — drift derived deterministically from `delay`
// (random values during render break React purity rules and hydration)
const Balloon = ({ color, delay, left }: { color: string; delay: number; left: string }) => (
    <motion.div
        className="absolute bottom-0"
        style={{ left }}
        initial={{ y: 100, opacity: 0 }}
        animate={{
            y: [100, -800],
            opacity: [0, 1, 1, 0],
            x: [0, ((delay * 53) % 40) - 20, ((delay * 89) % 60) - 30],
        }}
        transition={{
            duration: 8 + ((delay * 31) % 4),
            delay: delay,
            repeat: Infinity,
            ease: 'easeOut',
        }}
    >
        <svg width="30" height="45" viewBox="0 0 30 45" fill="none">
            <defs>
                <radialGradient id={`balloon-${color.replace('#', '')}`} cx="35%" cy="35%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                    <stop offset="100%" stopColor={color} />
                </radialGradient>
            </defs>
            <ellipse cx="15" cy="17" rx="13" ry="17" fill={`url(#balloon-${color.replace('#', '')})`} />
            <path d="M15 34 L15 44" stroke={color} strokeWidth="0.8" />
            <path d="M13 34 L15 37 L17 34" fill={color} />
        </svg>
    </motion.div>
);

export function EidAlFitrGreetingView() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const hasFirefRef = useRef(false);

    useEffect(() => {
        const hasSeenGreeting = sessionStorage.getItem('eidAlFitrGreetingSeen');
        if (!hasSeenGreeting) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                setIsAnimating(true);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, []);

    const triggerConfetti = useCallback(() => {
        if (!hasFirefRef.current) {
            hasFirefRef.current = true;
            setTimeout(fireConfetti, 800);
        }
    }, []);

    useEffect(() => {
        if (isAnimating) {
            triggerConfetti();
        }
    }, [isAnimating, triggerConfetti]);

    const handleClose = () => {
        setIsAnimating(false);
        // Final celebration burst on close
        confetti({
            particleCount: 150,
            spread: 180,
            origin: { x: 0.5, y: 0.5 },
            colors: ['#FFD700', '#FF8F00', '#FFC107', '#4CAF50', '#E91E63'],
            ticks: 200,
            gravity: 0.5,
            scalar: 1.8,
        });
        setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem('eidAlFitrGreetingSeen', 'true');
        }, 600);
    };

    // Stars configuration
    const stars = Array.from({ length: 35 }, (_, i) => ({
        id: i,
        size: [14, 18, 24][i % 3],
        top: `${(i * 19) % 100}%`,
        left: `${(i * 23 + 7) % 100}%`,
        delay: (i * 0.12) % 2.5,
        duration: 2.5 + (i % 3),
    }));

    // Balloons
    const balloons = [
        { color: '#E91E63', delay: 0.5, left: '5%' },
        { color: '#2196F3', delay: 1.2, left: '15%' },
        { color: '#4CAF50', delay: 0.8, left: '25%' },
        { color: '#FF9800', delay: 1.5, left: '75%' },
        { color: '#9C27B0', delay: 0.3, left: '85%' },
        { color: '#FFD700', delay: 1.8, left: '92%' },
        { color: '#E91E63', delay: 2.5, left: '35%' },
        { color: '#2196F3', delay: 3.0, left: '65%' },
    ];

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
                        background: 'radial-gradient(ellipse at top, #1A237E 0%, #0D1442 40%, #060A24 100%)',
                    }}
                >
                    {/* Animated light rays from top */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={`ray-${i}`}
                                className="absolute top-0 origin-top"
                                style={{
                                    left: `${15 + i * 14}%`,
                                    width: '2px',
                                    height: '100%',
                                    background: `linear-gradient(180deg, rgba(255,215,0,0.15) 0%, transparent 60%)`,
                                    transform: `rotate(${-15 + i * 6}deg)`,
                                }}
                                animate={{
                                    opacity: [0.3, 0.7, 0.3],
                                    scaleY: [0.8, 1, 0.8],
                                }}
                                transition={{
                                    duration: 3 + i * 0.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </div>

                    {/* Twinkling Stars */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {stars.map((star) => (
                            <motion.div
                                key={star.id}
                                className="absolute text-yellow-300"
                                style={{ top: star.top, left: star.left }}
                                animate={{
                                    opacity: [0.2, 1, 0.2],
                                    scale: [0.8, 1.3, 0.8],
                                    rotate: [0, 180, 360],
                                }}
                                transition={{
                                    duration: star.duration,
                                    delay: star.delay,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            >
                                <IslamicStar size={star.size} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Floating Geometric Patterns with 3D rotation */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '1000px' }}>
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                            <motion.div
                                key={`pattern-${i}`}
                                className="absolute w-28 h-28 md:w-36 md:h-36 opacity-20"
                                style={{
                                    top: `${10 + (i * 17) % 80}%`,
                                    left: `${(i * 19 + 3) % 90}%`,
                                    transformStyle: 'preserve-3d',
                                }}
                                animate={{
                                    rotateX: [0, 360],
                                    rotateY: [0, 180, 360],
                                    scale: [1, 1.15, 1],
                                }}
                                transition={{
                                    rotateX: { duration: 25 + i * 5, repeat: Infinity, ease: 'linear' },
                                    rotateY: { duration: 30 + i * 4, repeat: Infinity, ease: 'linear' },
                                    scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                                }}
                            >
                                <GeometricOrnament />
                            </motion.div>
                        ))}
                    </div>

                    {/* Floating Balloons */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {balloons.map((balloon, i) => (
                            <Balloon key={`balloon-${i}`} {...balloon} />
                        ))}
                    </div>

                    {/* Crescent Moon with glow - top right */}
                    <motion.div
                        className="absolute top-6 right-6 md:top-10 md:right-14 w-20 h-20 md:w-28 md:h-28"
                        animate={{
                            y: [0, -8, 0],
                            rotate: [0, 3, -3, 0],
                        }}
                        transition={{
                            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                            rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                        }}
                    >
                        <Image
                            src="/EidAlFitr/Crescent.svg"
                            alt="Crescent"
                            width={112}
                            height={112}
                            className="w-full h-full object-contain"
                            style={{
                                filter: 'drop-shadow(0 0 25px rgba(255,200,100,0.8)) drop-shadow(0 0 50px rgba(255,180,80,0.4))',
                            }}
                        />
                    </motion.div>

                    {/* Floating Lanterns */}
                    {[
                        { left: '3%', top: '20%', size: 55, delay: 0 },
                        { left: '10%', top: '35%', size: 45, delay: 0.5 },
                        { left: '87%', top: '22%', size: 50, delay: 0.3 },
                        { left: '92%', top: '40%', size: 42, delay: 0.8 },
                    ].map((lantern, i) => (
                        <motion.div
                            key={`lantern-${i}`}
                            className="absolute"
                            style={{
                                left: lantern.left,
                                top: lantern.top,
                                width: lantern.size,
                                height: lantern.size * 1.5,
                                transformOrigin: 'top center',
                            }}
                            animate={{
                                rotate: [-6, 6, -6],
                                y: [0, -5, 0],
                            }}
                            transition={{
                                rotate: { duration: 3.5, delay: lantern.delay, repeat: Infinity, ease: 'easeInOut' },
                                y: { duration: 2.5, delay: lantern.delay + 0.2, repeat: Infinity, ease: 'easeInOut' },
                            }}
                        >
                            <Image
                                src="/EidAlFitr/Lantern.webp"
                                alt="Eid Lantern"
                                width={lantern.size}
                                height={lantern.size * 1.5}
                                className="w-full h-full object-contain"
                                style={{
                                    filter: 'drop-shadow(0 0 15px rgba(255,180,80,0.7))',
                                }}
                            />
                        </motion.div>
                    ))}

                    {/* ===== MAIN CONTENT with 3D perspective ===== */}
                    <motion.div
                        className="relative text-center max-w-2xl mx-auto z-10"
                        style={{ perspective: '1200px' }}
                        initial={{ scale: 0.7, y: 50, opacity: 0, rotateX: 20 }}
                        animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        {/* Prayer Mat as base (3D tilt) */}
                        <motion.div
                            className="flex justify-center mb-4"
                            style={{ transformStyle: 'preserve-3d' }}
                            animate={{
                                rotateX: [5, -2, 5],
                                y: [0, -3, 0],
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <Image
                                src="/EidAlFitr/PrayerMat.webp"
                                alt="Prayer Mat"
                                width={160}
                                height={100}
                                className="w-36 h-auto md:w-44 opacity-60"
                                style={{
                                    filter: 'drop-shadow(0 10px 20px rgba(27,94,32,0.3))',
                                }}
                            />
                        </motion.div>

                        {/* Dates plate with 3D float */}
                        <motion.div
                            className="flex justify-center mb-6"
                            style={{ transformStyle: 'preserve-3d' }}
                            animate={{
                                y: [0, -8, 0],
                                rotateY: [0, 5, -5, 0],
                            }}
                            transition={{
                                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                                rotateY: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                            }}
                        >
                            <Image
                                src="/EidAlFitr/Dates.webp"
                                alt="Dates"
                                width={140}
                                height={120}
                                className="w-28 h-auto md:w-36"
                                style={{
                                    filter: 'drop-shadow(0 8px 25px rgba(139,69,19,0.4))',
                                }}
                            />
                        </motion.div>

                        {/* Arabic Greeting with shimmer */}
                        <motion.h1
                            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-3"
                            style={{ fontFamily: 'var(--font-cairo)' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.7 }}
                        >
                            <motion.span
                                style={{
                                    background: 'linear-gradient(90deg, #FFD700, #FF8F00, #FFD700, #FFC107, #FFD700)',
                                    backgroundSize: '300% 100%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                عيد فطر مبارك
                            </motion.span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            className="text-xl md:text-2xl mb-2 text-amber-100"
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
                                background: 'linear-gradient(90deg, #FFD700, #FFC107)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                Eid Al-Fitr Mubarak
                            </p>
                            <p className="text-sm md:text-base text-blue-200/70 mt-1">
                                May your celebrations be filled with joy and blessings
                            </p>
                        </motion.div>

                        {/* Company */}
                        <motion.div
                            className="mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 }}
                        >
                            <p className="text-xs text-blue-300/50 mb-1">From</p>
                            <p className="text-lg md:text-xl font-bold" style={{
                                background: 'linear-gradient(90deg, #FFD700, #FFC107)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                Future Solutions Dev
                            </p>
                        </motion.div>

                        {/* Decorative divider */}
                        <motion.div
                            className="flex items-center justify-center gap-4 mb-6"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1.0, duration: 0.5 }}
                        >
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                            <IslamicStar size={16} className="text-amber-400" />
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                        </motion.div>

                        {/* Close Button */}
                        <motion.button
                            onClick={handleClose}
                            className="px-12 py-3 rounded-full font-semibold text-bg-dark transition-all duration-300 text-lg"
                            style={{
                                background: 'linear-gradient(135deg, #FFD700 0%, #FF8F00 50%, #FFD700 100%)',
                                backgroundSize: '200% 100%',
                                boxShadow: '0 4px 30px rgba(255, 215, 0, 0.4), 0 0 60px rgba(255, 143, 0, 0.2)',
                            }}
                            whileHover={{
                                scale: 1.08,
                                boxShadow: '0 6px 40px rgba(255, 215, 0, 0.6), 0 0 80px rgba(255, 143, 0, 0.3)',
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

export default function EidAlFitrGreeting() {
    if (!Greetings.EidAlFitr.Active) return null;
    return <EidAlFitrGreetingView />;
}

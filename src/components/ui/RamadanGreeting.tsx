'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Greetings } from '@/lib/constants';

// Star SVG Component
const Star = ({ className = '', size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) => {
    const sizes = { sm: 'w-2 h-2', md: 'w-4 h-4', lg: 'w-6 h-6' };
    return (
        <svg viewBox="0 0 24 24" className={`${sizes[size]} ${className}`} fill="currentColor">
            <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
        </svg>
    );
};

// Geometric Pattern
const GeometricPattern = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none">
        <defs>
            <linearGradient id="patternGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.3" />
            </linearGradient>
        </defs>
        <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" stroke="url(#patternGrad)" strokeWidth="1" fill="none" />
        <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" stroke="url(#patternGrad)" strokeWidth="1" fill="none" />
        <polygon points="50,30 70,40 70,60 50,70 30,60 30,40" stroke="url(#patternGrad)" strokeWidth="1" fill="none" />
    </svg>
);

// Mosque SVG
const Mosque = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 120 80" className={className} fill="none">
        <defs>
            <linearGradient id="mosqueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="#0097A7" />
            </linearGradient>
        </defs>
        <path d="M40 35 Q60 5 80 35 L80 55 L40 55 Z" fill="url(#mosqueGradient)" opacity="0.9" />
        <circle cx="60" cy="15" r="4" fill="#FFD700" />
        <rect x="20" y="25" width="12" height="35" fill="url(#mosqueGradient)" opacity="0.8" />
        <path d="M20 25 Q26 15 32 25" fill="url(#mosqueGradient)" />
        <circle cx="26" cy="18" r="2" fill="#FFD700" />
        <rect x="88" y="25" width="12" height="35" fill="url(#mosqueGradient)" opacity="0.8" />
        <path d="M88 25 Q94 15 100 25" fill="url(#mosqueGradient)" />
        <circle cx="94" cy="18" r="2" fill="#FFD700" />
        <path d="M52 55 L52 42 Q60 35 68 42 L68 55" fill="#050B14" />
        <rect x="15" y="55" width="90" height="8" fill="url(#mosqueGradient)" opacity="0.7" />
    </svg>
);

export function RamadanGreetingView() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [moonHovered, setMoonHovered] = useState(false);
    const [hoveredLantern, setHoveredLantern] = useState<number | null>(null);

    useEffect(() => {
        const hasSeenGreeting = sessionStorage.getItem('ramadanGreetingSeen');
        if (!hasSeenGreeting) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                setIsAnimating(true);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem('ramadanGreetingSeen', 'true');
        }, 500);
    };

    // Stars configuration
    const stars = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        size: ['sm', 'md', 'lg'][i % 3] as 'sm' | 'md' | 'lg',
        top: `${(i * 17) % 100}%`,
        left: `${(i * 23) % 100}%`,
        delay: (i * 0.1) % 2,
        duration: 2 + (i % 3),
    }));

    // Lanterns configuration
    const lanterns = [
        { id: 1, left: '5%', top: '15%', delay: 0, size: 60 },
        { id: 2, left: '12%', top: '30%', delay: 0.5, size: 50 },
        { id: 3, left: '85%', top: '18%', delay: 0.3, size: 55 },
        { id: 4, left: '90%', top: '35%', delay: 0.8, size: 45 },
    ];

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isAnimating && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    style={{
                        background: 'radial-gradient(ellipse at top, #0B1220 0%, #050B14 50%, #020408 100%)',
                    }}
                >
                    {/* Animated Stars */}
                    <div className="absolute inset-0 overflow-hidden">
                        {stars.map((star) => (
                            <motion.div
                                key={star.id}
                                className="absolute text-yellow-300"
                                style={{ top: star.top, left: star.left }}
                                animate={{
                                    opacity: [0.3, 1, 0.3],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: star.duration,
                                    delay: star.delay,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            >
                                <Star size={star.size} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Floating Geometric Patterns */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[0, 1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute w-32 h-32 opacity-20"
                                style={{
                                    top: `${20 + i * 20}%`,
                                    left: `${5 + i * 25}%`,
                                }}
                                animate={{
                                    rotate: [0, 360],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    rotate: { duration: 20 + i * 5, repeat: Infinity, ease: 'linear' },
                                    scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                                }}
                            >
                                <GeometricPattern />
                            </motion.div>
                        ))}
                    </div>

                    {/* Floating Lanterns using SVG file - pendulum swing from top */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-auto">
                        {lanterns.map((lantern) => (
                            <motion.div
                                key={lantern.id}
                                className="absolute cursor-pointer"
                                style={{
                                    left: lantern.left,
                                    top: lantern.top,
                                    width: lantern.size,
                                    height: lantern.size * 1.5,
                                    transformOrigin: 'top center', // Pivot point at top
                                }}
                                animate={{
                                    rotate: hoveredLantern === lantern.id
                                        ? [-12, 12, -12] // Wider swing on hover
                                        : [-5, 5, -5], // Normal pendulum swing
                                }}
                                transition={{
                                    duration: hoveredLantern === lantern.id ? 0.5 : 3.5,
                                    delay: lantern.delay,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                onMouseEnter={() => setHoveredLantern(lantern.id)}
                                onMouseLeave={() => setHoveredLantern(null)}
                            >
                                <Image
                                    src="/Ramadan/Lantern.webp"
                                    alt="Lantern"
                                    width={lantern.size}
                                    height={lantern.size * 1.5}
                                    className="w-full h-full object-contain"
                                    style={{
                                        filter: hoveredLantern === lantern.id
                                            ? 'drop-shadow(0 0 30px rgba(255,180,80,1)) drop-shadow(0 0 50px rgba(255,150,50,0.7)) brightness(1.4)'
                                            : 'drop-shadow(0 0 12px rgba(255,180,80,0.6))',
                                        transition: 'filter 0.3s ease',
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Crescent Moon using SVG file - only glow on hover */}
                    <motion.div
                        className="absolute top-8 right-8 md:top-12 md:right-16 w-24 h-24 md:w-32 md:h-32 cursor-pointer"
                        animate={{
                            y: [0, -6, 0], // Gentle floating only
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        onMouseEnter={() => setMoonHovered(true)}
                        onMouseLeave={() => setMoonHovered(false)}
                    >
                        <Image
                            src="/Ramadan/Helal.webp"
                            alt="Crescent Moon"
                            width={128}
                            height={128}
                            className="w-full h-full object-contain"
                            style={{
                                filter: moonHovered
                                    ? 'drop-shadow(0 0 50px rgba(255,200,100,1)) drop-shadow(0 0 80px rgba(255,180,80,0.8)) brightness(1.5)'
                                    : 'drop-shadow(0 0 20px rgba(255,200,100,0.6))',
                                transition: 'filter 0.4s ease',
                            }}
                        />
                    </motion.div>

                    {/* Main Content */}
                    <motion.div
                        className="relative text-center max-w-2xl mx-auto z-10"
                        initial={{ scale: 0.8, y: 30, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                    >
                        {/* Mosque Silhouette */}
                        <motion.div
                            className="flex justify-center mb-6"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <Mosque className="w-32 h-20 md:w-40 md:h-24" />
                        </motion.div>

                        {/* Arabic Greeting */}
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold mb-4"
                            style={{ fontFamily: 'var(--font-cairo)' }}
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <span
                                style={{
                                    background: 'linear-gradient(90deg, #FFD700, #FFA500, #FFD700, #FFC107)',
                                    backgroundSize: '200% 100%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                رمضان كريم
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            className="text-xl md:text-2xl mb-2 text-text-main"
                            style={{ fontFamily: 'var(--font-cairo)' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            كل عام وأنتم بخير
                        </motion.p>

                        {/* English Translation */}
                        <motion.div
                            className="mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <p className="text-lg md:text-xl text-cyan-glow font-medium">
                                Ramadan Mubarak
                            </p>
                            <p className="text-sm md:text-base text-text-muted mt-1">
                                May this blessed month bring you peace and prosperity
                            </p>
                        </motion.div>

                        {/* Company Name */}
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                        >
                            <p className="text-xs text-text-muted mb-1">From</p>
                            <p className="text-lg md:text-xl font-bold text-cyan-glow">
                                Future Solutions Dev
                            </p>
                        </motion.div>

                        {/* Decorative Line */}
                        <motion.div
                            className="flex items-center justify-center gap-4 mb-8"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
                            <Star size="md" className="text-yellow-400" />
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
                        </motion.div>

                        {/* Close Button */}
                        <motion.button
                            onClick={handleClose}
                            className="px-10 py-3 rounded-full font-semibold text-bg-dark transition-all duration-300"
                            style={{
                                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
                                backgroundSize: '200% 100%',
                                boxShadow: '0 4px 30px rgba(255, 215, 0, 0.4)',
                            }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 6px 40px rgba(255, 215, 0, 0.6)',
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            متابعة
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function RamadanGreeting() {
    if (!Greetings.Ramadan.Active) return null;
    return <RamadanGreetingView />;
}
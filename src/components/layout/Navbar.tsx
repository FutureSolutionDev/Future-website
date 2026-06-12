"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import SeasonalDecorations from '@/components/ui/SeasonalDecorations';
import { ActiveGreeting } from '@/lib/constants';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const PathName = usePathname();
    const navLinks = [
        { href: `/${language}`, label: t('nav.home') },
        { href: `/${language}/services`, label: t('nav.services') },
        { href: `/${language}/solutions`, label: t('nav.solutions') },
        { href: `/${language}/products`, label: t('nav.products') },
        { href: `/${language}/portfolio`, label: t('nav.portfolio') },
        { href: `/${language}/technologies`, label: t('nav.technologies') },
        { href: `/${language}/about`, label: t('nav.about') },
        { href: `/${language}/contact`, label: t('nav.contact') },
        { href: `/${language}/blog`, label: t('nav.blog') },
    ];

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };
    return (
        <nav className="sticky w-full z-50 top-0 left-0 bg-bg-dark/80 backdrop-blur-md border-b border-white/10">
            {/* Occasion Decorations hanging from navbar */}
            <SeasonalDecorations Mode="Desktop" />
            <div className="container mx-auto px-4 flex items-center justify-between md:h-[5rem] h-[4rem]">
                {/* Logo */}
                <Link href={`/${language}`} className="text-2xl font-bold text-white tracking-tighter">
                    <Image
                        src={ActiveGreeting?.Logo || "/favico/logo.webp"}
                        alt="Future Solutions Dev"
                        width={252}
                        height={160}
                        priority
                        className='h-14 md:h-16 w-auto'
                    />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={`desc-nav-${link.href}`}
                            href={link.href}
                            className={`hover:text-cyan-glow 
                                transition-colors text-md
                                font-bold 
                                 ${PathName == link.href ?
                                    "text-cyan-glow" : "text-text-muted"}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    <button
                        onClick={toggleLanguage}
                        className="p-2 text-text-muted hover:text-white transition-colors flex items-center gap-2"
                    >
                        <Globe size={16} />
                        <span className="text-xs font-bold">
                            {language === 'en' ? 'العربية' : 'English'}
                        </span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-bg-dark border-b border-white/10"
                    >
                        <div className="container px-4 py-8 flex flex-col space-y-4"
                        >
                            {/* Occasion Mini Decorations for Mobile */}
                            <SeasonalDecorations Mode="Mobile" />
                            {navLinks.map((link) => {
                                return (
                                    <Link
                                        key={`mobile-nav-${link.href}`}
                                        href={link.href}
                                        className={`text-lg font-medium  hover:text-primary-blue ${PathName === link.href ? "text-cyan-glow" : "text-white"}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            })}
                            <div className="pt-4 flex items-center justify-between border-t border-white/10">
                                <button
                                    onClick={toggleLanguage}
                                    className="flex items-center space-x-2 text-text-muted"
                                >
                                    <Globe size={18} />
                                    <span>{language === 'en' ? 'العربية' : 'English'}</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

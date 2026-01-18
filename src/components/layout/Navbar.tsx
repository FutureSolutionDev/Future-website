"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { usePathname } from 'next/navigation';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const [hasMounted, setHasMounted] = useState(false);
    const PathName = usePathname();
    useEffect(() => {
        setTimeout(() => setHasMounted(true), 0);
    }, []);
    const navLinks = [
        { href: '/services', label: t('nav.services') },
        { href: '/solutions', label: t('nav.solutions') },
        { href: '/portfolio', label: t('nav.portfolio') },
        { href: '/technologies', label: t('nav.technologies') },
        { href: '/about', label: t('nav.about') },
        { href: '/contact', label: t('nav.contact') },
    ];

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };
    return (
        <nav className="sticky w-full z-50 top-0 left-0 bg-bg-dark/80 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4 flex items-center justify-between"
                style={{
                    height: "3rem"
                }}
            >
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-white tracking-tighter">
                    Future<span className="text-primary-blue"> Solutions</span> <span className="text-text-muted">{"Dev"}</span>
                </Link>

                {/* Desktop Nav */}
                <div className="md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
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
                            {hasMounted ? (language === 'en' ? 'العربية' : 'English') : '...'}
                        </span>
                    </button>

                    <Button variant="primary" size="sm">{t('nav.getStarted')}</Button>
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
                            {navLinks.map((link) => {
                                return (
                                    <Link
                                        key={link.href}
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
                                <Button variant="primary" size="sm" className="w-full ml-4">{t('nav.getStarted')}</Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

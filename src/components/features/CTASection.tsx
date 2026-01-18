"use client";

import { Button } from '@/components/ui/Button';

export function CTASection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary-blue/5" />
            <div className="container mx-auto px-4 relative z-10 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to <span className="text-primary-blue">Scale?</span></h2>
                <p className="text-xl text-text-muted max-w-2xl mx-auto mb-8">
                    Let&apos;s discuss how we can transform your business with cutting-edge technology.
                </p>
                <div className="flex justify-center gap-4">
                    <Button size="lg">Start Your Project</Button>
                    <Button variant="secondary" size="lg">Contact Us</Button>
                </div>
            </div>
        </section>
    );
}

// Styled building blocks for article MDX bodies.
// Direction-aware automatically: layout flips with the <html dir> attribute,
// so no manual flex-row-reverse is needed.
import type { ComponentPropsWithoutRef } from 'react';
import { CheckCircle, ChevronRight, Sparkles, Zap } from 'lucide-react';

export function Highlights({ items }: { items: string[] }) {
    return (
        <div className="bg-surface-dark rounded-2xl p-6 border border-white/5 mb-6">
            <ul className="space-y-3">
                {items.map((item, i) => (
                    <li key={`highlight-${i}`} className="flex items-start gap-3">
                        <CheckCircle className="text-cyan-glow shrink-0 mt-0.5" size={20} />
                        <span className="text-text-main/90">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function Steps({ items }: { items: { title: string; description: string }[] }) {
    return (
        <div className="space-y-4 mb-6">
            {items.map((step, i) => (
                <div
                    key={`step-${i}`}
                    className="flex items-start gap-4 p-5 bg-surface-dark rounded-xl border border-white/5 hover:border-cyan-glow/20 transition-colors"
                >
                    <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-blue to-cyan-glow flex items-center justify-center text-white font-bold">
                        {i + 1}
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                        <p className="text-text-muted">{step.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function Features({ items }: { items: { name: string; description: string }[] }) {
    return (
        <div className="grid md:grid-cols-2 gap-4 mb-6">
            {items.map((feature, i) => (
                <div
                    key={`feature-${i}`}
                    className="p-5 bg-surface-dark rounded-xl border border-white/5 hover:border-cyan-glow/20 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-glow/5"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <Zap className="text-primary-blue" size={20} />
                        <h4 className="font-bold">{feature.name}</h4>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed">{feature.description}</p>
                </div>
            ))}
        </div>
    );
}

export function Tech({ items }: { items: string[] }) {
    return (
        <div className="bg-surface-dark rounded-2xl p-6 border border-white/5 mb-6">
            <ul className="space-y-3">
                {items.map((tech, i) => (
                    <li key={`tech-${i}`} className="flex items-center gap-3">
                        <ChevronRight className="text-cyan-glow shrink-0 rtl:rotate-180" size={18} />
                        <span className="text-text-main/90">{tech}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function Stats({ items }: { items: { value: string; label: string }[] }) {
    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
            {items.map((stat, i) => (
                <div key={`stat-${i}`} className="text-center p-6 bg-surface-dark rounded-xl border border-white/5">
                    <div className="text-3xl md:text-4xl font-bold text-cyan-glow mb-2">{stat.value}</div>
                    <div className="text-text-muted text-sm">{stat.label}</div>
                </div>
            ))}
        </div>
    );
}

/** Mapping passed to the compiled MDX content: markdown elements + the custom article blocks. */
export const ArticleMdxComponents = {
    h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => (
        <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-12 flex items-center gap-3" {...props}>
            <Sparkles className="text-cyan-glow shrink-0" size={28} />
            {children}
        </h2>
    ),
    h3: (props: ComponentPropsWithoutRef<'h3'>) => <h3 className="text-xl md:text-2xl font-bold mb-4 mt-8" {...props} />,
    p: (props: ComponentPropsWithoutRef<'p'>) => <p className="text-text-muted leading-relaxed mb-6" {...props} />,
    ul: (props: ComponentPropsWithoutRef<'ul'>) => <ul className="list-disc ps-6 space-y-2 text-text-muted mb-6" {...props} />,
    ol: (props: ComponentPropsWithoutRef<'ol'>) => <ol className="list-decimal ps-6 space-y-2 text-text-muted mb-6" {...props} />,
    li: (props: ComponentPropsWithoutRef<'li'>) => <li className="leading-relaxed" {...props} />,
    strong: (props: ComponentPropsWithoutRef<'strong'>) => <strong className="text-text-main font-bold" {...props} />,
    a: (props: ComponentPropsWithoutRef<'a'>) => <a className="text-cyan-glow underline hover:text-primary-blue transition-colors" {...props} />,
    blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
        <blockquote className="border-s-4 border-cyan-glow/50 ps-4 italic text-text-muted mb-6" {...props} />
    ),
    Highlights,
    Steps,
    Features,
    Tech,
    Stats,
};

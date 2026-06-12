"use client";

import { useState } from "react";
import { Bell, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SubmitWaitlistSignup } from "@/lib/contactApi";

type TStatus = "idle" | "sending" | "sent" | "error";

/** "Notify me at launch" — collects emails per coming-soon product */
export function WaitlistForm({ productName }: { productName: string }) {
    const { language } = useLanguage();
    const isRTL = language === "ar";
    const [status, setStatus] = useState<TStatus>("idle");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (status === "sending") return;
        const email = String(new FormData(event.currentTarget).get("email") ?? "");
        setStatus("sending");
        const ok = await SubmitWaitlistSignup(productName, email);
        setStatus(ok ? "sent" : "error");
        if (ok) {
            window.gtag?.("event", "waitlist_signup", { product: productName });
        }
    }

    if (status === "sent") {
        return (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-cyan-glow/5 border border-cyan-glow/20" role="status">
                <CheckCircle size={22} className="text-green-400 shrink-0" />
                <p className="text-sm text-text-main">
                    {isRTL
                        ? "تمام! هنبعتلك إيميل أول ما المنتج يُطلق."
                        : "Done! We'll email you the moment it launches."}
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <label htmlFor={`waitlist-${productName}`} className="flex items-center gap-2 text-sm font-bold">
                <Bell size={16} className="text-cyan-glow" />
                {isRTL ? "اعرف أول بأول — سجّل إيميلك وهنبلغك عند الإطلاق" : "Be first to know — get notified at launch"}
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    id={`waitlist-${productName}`}
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    placeholder={isRTL ? "بريدك الإلكتروني" : "Your email"}
                    className="flex-1 bg-bg-dark border border-white/10 rounded-lg px-4 py-3 focus:border-primary-blue focus:outline-none transition-colors text-sm"
                />
                <button
                    type="submit"
                    disabled={status === "sending"}
                    className="px-6 py-3 rounded-lg bg-primary-blue text-white text-sm font-bold hover:bg-blue-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(29,161,242,0.3)]"
                >
                    {status === "sending"
                        ? (isRTL ? "ثواني..." : "One sec...")
                        : (isRTL ? "بلّغني عند الإطلاق" : "Notify me")}
                </button>
            </div>
            {status === "error" && (
                <p className="text-sm text-red-400" role="alert">
                    {isRTL ? "حصلت مشكلة — جرب تاني." : "Something went wrong — please try again."}
                </p>
            )}
        </form>
    );
}

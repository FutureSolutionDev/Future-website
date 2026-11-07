"use client";

import { useId, useState } from "react";
import { BellRing, CheckCircle2 } from "lucide-react";
import { SubmitWaitlistSignup } from "@/Lib/ContactApi";
import { ButtonClass } from "@/Components/Common/Button";
import { Honeypot, ReadHoneypot } from "@/Components/Common/Honeypot";
import type { TDictionary } from "@/I18n/Index";

type TStatus = "Idle" | "Sending" | "Sent" | "Error";

export function WaitlistForm({ Product, Copy, Title }: { Product: string; Copy: TDictionary["Pages"]["Waitlist"]; Title?: string }) {
  const [Status, SetStatus] = useState<TStatus>("Idle");
  const InputId = useId();
  const ErrorId = `${InputId}-error`;

  async function OnSubmit(Event: React.FormEvent<HTMLFormElement>) {
    Event.preventDefault();
    if (Status === "Sending") return;
    const Data = new FormData(Event.currentTarget);
    const Email = String(Data.get("email") ?? "").trim();
    SetStatus("Sending");
    SetStatus((await SubmitWaitlistSignup(Product, Email, ReadHoneypot(Data))) ? "Sent" : "Error");
  }

  if (Status === "Sent") {
    return (
      <p role="status" className="flex items-center gap-2.5 rounded-md border border-line bg-surface p-4 font-semibold text-success">
        <CheckCircle2 size={20} aria-hidden="true" />
        {Copy.Done}
      </p>
    );
  }

  return (
    <form onSubmit={OnSubmit} className="relative rounded-lg border border-line bg-surface p-5">
      <p className="mb-3 flex items-center gap-2 font-semibold">
        <BellRing size={18} className="text-accent" aria-hidden="true" />
        {Title ?? Copy.Title}
      </p>
      <Honeypot />
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={InputId} className="sr-only">
          {Copy.EmailLabel}
        </label>
        <input
          id={InputId}
          name="email"
          type="email"
          required
          dir="auto"
          autoComplete="email"
          placeholder={Copy.Placeholder}
          aria-invalid={Status === "Error" || undefined}
          aria-describedby={Status === "Error" ? ErrorId : undefined}
          className="h-[50px] flex-1 rounded-md border border-control bg-page px-4 text-base text-ink placeholder:text-ink-soft focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/30"
        />
        <button type="submit" disabled={Status === "Sending"} className={ButtonClass("Primary", "Md", "disabled:opacity-60")}>
          {Status === "Sending" ? Copy.Sending : Copy.Submit}
        </button>
      </div>
      {Status === "Error" && (
        <p id={ErrorId} role="alert" className="mt-2.5 text-sm font-semibold text-danger">
          {Copy.Error}
        </p>
      )}
    </form>
  );
}

"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { ButtonClass } from "@/Components/Common/Button";
import { SubmitContactMessage } from "@/Lib/ContactApi";
import { CONTACT } from "@/Lib/Site";
import { Cn } from "@/Lib/Cn";
import type { TDictionary } from "@/I18n/Index";

type TStatus = "Idle" | "Sending" | "Sent" | "Error";
type TFormCopy = TDictionary["Pages"]["Contact"]["Form"];

declare global {
  interface Window {
    gtag?: (...Args: unknown[]) => void;
  }
}

const INPUT = "w-full rounded-md border border-control bg-surface px-3.5 text-base text-ink placeholder:text-ink-soft focus:border-focus focus:outline-none";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Field({ Id, Label, Hint, Error, children }: { Id: string; Label: string; Hint?: string; Error?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={Id} className="text-[15px] font-semibold">
        {Label}
      </label>
      {children}
      {Error ? (
        <p id={`${Id}-error`} className="flex items-center gap-1.5 text-sm font-semibold text-danger">
          <AlertCircle size={16} aria-hidden="true" />
          {Error}
        </p>
      ) : (
        Hint && <p id={`${Id}-hint`} className="text-sm text-ink-soft">{Hint}</p>
      )}
    </div>
  );
}

export function ContactForm({ Copy, WhatsAppLabel }: { Copy: TFormCopy; WhatsAppLabel: string }) {
  const [Status, SetStatus] = useState<TStatus>("Idle");
  const [EmailError, SetEmailError] = useState(false);

  async function OnSubmit(Event: React.FormEvent<HTMLFormElement>) {
    Event.preventDefault();
    if (Status === "Sending") return;
    const Form = Event.currentTarget;
    const Data = new FormData(Form);
    const Email = String(Data.get("email") ?? "").trim();
    if (!EMAIL_PATTERN.test(Email)) {
      SetEmailError(true);
      Form.querySelector<HTMLInputElement>("#contact-email")?.focus();
      return;
    }
    SetEmailError(false);
    SetStatus("Sending");
    const Ok = await SubmitContactMessage({
      Name: String(Data.get("name") ?? ""),
      Email,
      Topic: String(Data.get("topic") ?? ""),
      Message: String(Data.get("message") ?? ""),
    });
    if (Ok) {
      SetStatus("Sent");
      Form.reset();
      window.gtag?.("event", "contact_form_submit");
    } else {
      SetStatus("Error");
    }
  }

  if (Status === "Sent") {
    return (
      <div role="status" className="grid place-items-center gap-3 py-14 text-center">
        <CheckCircle2 size={48} className="text-success" aria-hidden="true" />
        <p className="text-lg font-bold">{Copy.SentTitle}</p>
        <p className="text-ink-muted">{Copy.SentText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={OnSubmit} noValidate className="grid gap-5">
      <h2 className="text-xl font-bold">{Copy.Title}</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field Id="contact-name" Label={Copy.Name} Hint={Copy.NameHint}>
          <input id="contact-name" name="name" type="text" required maxLength={100} autoComplete="name" aria-describedby="contact-name-hint" className={Cn(INPUT, "h-[50px]")} />
        </Field>
        <Field Id="contact-email" Label={Copy.Email} Error={EmailError ? Copy.EmailError : undefined}>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            dir="auto"
            autoComplete="email"
            aria-invalid={EmailError}
            aria-describedby={EmailError ? "contact-email-error" : undefined}
            onChange={() => EmailError && SetEmailError(false)}
            className={Cn(INPUT, "h-[50px]", EmailError && "border-2 border-danger")}
          />
        </Field>
      </div>
      <Field Id="contact-topic" Label={Copy.Topic} Hint={Copy.TopicHint}>
        <input id="contact-topic" name="topic" type="text" maxLength={200} aria-describedby="contact-topic-hint" className={Cn(INPUT, "h-[50px]")} />
      </Field>
      <Field Id="contact-message" Label={Copy.Message}>
        <textarea id="contact-message" name="message" required maxLength={5000} rows={5} className={Cn(INPUT, "resize-y py-3")} />
      </Field>
      <button type="submit" disabled={Status === "Sending"} className={ButtonClass("Primary", "Md", "w-full disabled:opacity-60 sm:w-auto sm:justify-self-start")}>
        <Send size={18} aria-hidden="true" className="rtl:-scale-x-100" />
        {Status === "Sending" ? Copy.Sending : Copy.Send}
      </button>
      {Status === "Error" && (
        <p role="alert" className="flex items-start gap-2 text-sm font-semibold text-danger">
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>
            {Copy.Error}{" "}
            <a href={CONTACT.WhatsApp} target="_blank" rel="noopener noreferrer" className="underline">
              {WhatsAppLabel}
            </a>
          </span>
        </p>
      )}
    </form>
  );
}

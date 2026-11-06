"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { ButtonClass } from "@/Components/Common/Button";
import { Honeypot, ReadHoneypot } from "@/Components/Common/Honeypot";
import { SubmitContactMessage } from "@/Lib/ContactApi";
import { CONTACT } from "@/Lib/Site";
import { Cn } from "@/Lib/Cn";
import type { TDictionary } from "@/I18n/Index";

type TStatus = "Idle" | "Sending" | "Sent" | "Error";
type TFormCopy = TDictionary["Pages"]["Contact"]["Form"];
type TFieldName = "name" | "email" | "message";

declare global {
  interface Window {
    gtag?: (...Args: unknown[]) => void;
  }
}

const INPUT =
  "w-full rounded-md border border-control bg-surface px-3.5 text-base text-ink placeholder:text-ink-soft focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/30";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type TFieldProps = {
  Id: string;
  Label: string;
  Hint?: string;
  Error?: string;
  Required?: boolean;
  RequiredLabel: string;
  children: React.ReactNode;
};

function Field({ Id, Label, Hint, Error, Required, RequiredLabel, children }: TFieldProps) {
  return (
    <div className="grid content-start gap-1.5">
      <label htmlFor={Id} className="text-[15px] font-semibold">
        {Label}
        {Required && (
          <span className="ms-1 text-danger" aria-hidden="true">
            *
          </span>
        )}
        {Required && <span className="sr-only"> ({RequiredLabel})</span>}
      </label>
      {children}
      {Error ? (
        <p id={`${Id}-error`} className="flex items-center gap-1.5 text-sm font-semibold text-danger">
          <AlertCircle size={16} aria-hidden="true" />
          {Error}
        </p>
      ) : (
        Hint && (
          <p id={`${Id}-hint`} className="text-sm text-ink-soft">
            {Hint}
          </p>
        )
      )}
    </div>
  );
}

function Describe(Id: string, HasError: boolean, HasHint: boolean): string | undefined {
  if (HasError) return `${Id}-error`;
  return HasHint ? `${Id}-hint` : undefined;
}

export function ContactForm({ Copy, WhatsAppLabel }: { Copy: TFormCopy; WhatsAppLabel: string }) {
  const [Status, SetStatus] = useState<TStatus>("Idle");
  const [Errors, SetErrors] = useState<Partial<Record<TFieldName, boolean>>>({});
  const SentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (Status === "Sent") SentRef.current?.focus();
  }, [Status]);

  const ClearError = (Name: TFieldName) => {
    if (Errors[Name]) SetErrors((Previous) => ({ ...Previous, [Name]: false }));
  };

  async function OnSubmit(Event: React.FormEvent<HTMLFormElement>) {
    Event.preventDefault();
    if (Status === "Sending") return;
    const Form = Event.currentTarget;
    const Data = new FormData(Form);
    const Values = {
      name: String(Data.get("name") ?? "").trim(),
      email: String(Data.get("email") ?? "").trim(),
      message: String(Data.get("message") ?? "").trim(),
    };
    const NextErrors = {
      name: Values.name.length === 0,
      email: !EMAIL_PATTERN.test(Values.email),
      message: Values.message.length === 0,
    };
    SetErrors(NextErrors);
    const FirstInvalid = (Object.keys(NextErrors) as TFieldName[]).find((Key) => NextErrors[Key]);
    if (FirstInvalid) {
      Form.querySelector<HTMLElement>(`#contact-${FirstInvalid}`)?.focus();
      return;
    }

    SetStatus("Sending");
    const Ok = await SubmitContactMessage({
      Name: Values.name,
      Email: Values.email,
      Topic: String(Data.get("topic") ?? ""),
      Message: Values.message,
      Honeypot: ReadHoneypot(Data),
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
      <div ref={SentRef} tabIndex={-1} role="status" className="grid place-items-center gap-3 py-14 text-center outline-none">
        <CheckCircle2 size={48} className="text-success" aria-hidden="true" />
        <p className="text-lg font-bold">{Copy.SentTitle}</p>
        <p className="text-ink-muted">{Copy.SentText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={OnSubmit} noValidate className="relative grid gap-5">
      <h2 className="text-xl font-bold">{Copy.Title}</h2>
      <Honeypot />
      <div className="grid items-start gap-5 sm:grid-cols-2">
        <Field Id="contact-name" Label={Copy.Name} Hint={Copy.NameHint} Error={Errors.name ? Copy.NameError : undefined} Required RequiredLabel={Copy.Required}>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            aria-invalid={Errors.name || undefined}
            aria-describedby={Describe("contact-name", Boolean(Errors.name), true)}
            onChange={() => ClearError("name")}
            className={Cn(INPUT, "h-[50px]", Errors.name && "border-2 border-danger")}
          />
        </Field>
        <Field Id="contact-email" Label={Copy.Email} Error={Errors.email ? Copy.EmailError : undefined} Required RequiredLabel={Copy.Required}>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            dir="auto"
            autoComplete="email"
            aria-invalid={Errors.email || undefined}
            aria-describedby={Describe("contact-email", Boolean(Errors.email), false)}
            onChange={() => ClearError("email")}
            className={Cn(INPUT, "h-[50px]", Errors.email && "border-2 border-danger")}
          />
        </Field>
      </div>
      <Field Id="contact-topic" Label={Copy.Topic} Hint={Copy.TopicHint} RequiredLabel={Copy.Required}>
        <input id="contact-topic" name="topic" type="text" maxLength={200} aria-describedby="contact-topic-hint" className={Cn(INPUT, "h-[50px]")} />
      </Field>
      <Field Id="contact-message" Label={Copy.Message} Error={Errors.message ? Copy.MessageError : undefined} Required RequiredLabel={Copy.Required}>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={5000}
          rows={5}
          aria-invalid={Errors.message || undefined}
          aria-describedby={Describe("contact-message", Boolean(Errors.message), false)}
          onChange={() => ClearError("message")}
          className={Cn(INPUT, "resize-y py-3", Errors.message && "border-2 border-danger")}
        />
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

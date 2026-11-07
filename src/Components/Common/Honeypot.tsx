import { HONEYPOT_FIELD } from "@/Lib/ContactApi";

export function Honeypot() {
  return (
    <input
      type="checkbox"
      name={HONEYPOT_FIELD}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="pointer-events-none absolute -z-10 size-0 opacity-0"
    />
  );
}

export function ReadHoneypot(Data: FormData): string {
  return Data.get(HONEYPOT_FIELD) ? "1" : "";
}

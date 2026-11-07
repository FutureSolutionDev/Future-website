import { SITE_KEYS } from "@/Lib/Site";

const ENDPOINT = "https://api.web3forms.com/submit";

export const HONEYPOT_FIELD = "botcheck";

export type TContactMessage = {
  Name: string;
  Email: string;
  Topic: string;
  Message: string;
  Honeypot: string;
};

async function Send(Payload: Record<string, string>, Honeypot: string): Promise<boolean> {
  if (Honeypot) return true;
  try {
    const Response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: SITE_KEYS.Web3FormsKey,
        from_name: "Future Solutions Website",
        ...Payload,
      }),
    });
    if (!Response.ok) return false;
    const Body = (await Response.json().catch(() => ({}))) as { success?: boolean };
    return Body.success !== false;
  } catch {
    return false;
  }
}

export function SubmitContactMessage(Data: TContactMessage): Promise<boolean> {
  return Send(
    {
      name: Data.Name,
      email: Data.Email,
      subject: `[futuresolutionsdev.com] ${Data.Topic || "Contact form message"}`,
      message: Data.Message,
    },
    Data.Honeypot,
  );
}

export function SubmitWaitlistSignup(Product: string, Email: string, Honeypot: string): Promise<boolean> {
  return Send(
    {
      email: Email,
      subject: `[Waitlist] ${Product}`,
      message: `New waitlist signup for ${Product}: ${Email}`,
    },
    Honeypot,
  );
}

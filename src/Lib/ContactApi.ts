import { SITE_KEYS } from "@/Lib/Site";

const ENDPOINT = "https://api.web3forms.com/submit";

export type TContactMessage = {
  Name: string;
  Email: string;
  Topic: string;
  Message: string;
};

async function Send(Payload: Record<string, string>): Promise<boolean> {
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
    return Response.ok;
  } catch {
    return false;
  }
}

export function SubmitContactMessage(Data: TContactMessage): Promise<boolean> {
  return Send({
    name: Data.Name,
    email: Data.Email,
    subject: `[futuresolutionsdev.com] ${Data.Topic || "Contact form message"}`,
    message: Data.Message,
  });
}

export function SubmitWaitlistSignup(Product: string, Email: string): Promise<boolean> {
  return Send({
    email: Email,
    subject: `[Waitlist] ${Product}`,
    message: `New waitlist signup for ${Product}: ${Email}`,
  });
}

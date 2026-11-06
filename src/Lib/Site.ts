export const SITE_TITLE = "Future Solutions Dev";

export const ASSET_VERSION = "2_0_0";

export const CONTACT = {
  WhatsApp: "https://wa.me/201148371185",
  Email: "info@futuresolutionsdev.com",
  Phone: "201015471713",
  PhoneDisplay: "+20 101 547 1713",
  Facebook: "https://www.facebook.com/futuresolutionsdev",
  LinkedIn: "https://www.linkedin.com/company/futuresolutionsdev",
  City: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
} as const;

export const SITE_KEYS = {
  Web3FormsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "1f7339db-d8e0-4a1b-a2ff-9861770fd9a5",
  GaId: process.env.NEXT_PUBLIC_GA_ID || "",
  GoogleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "KZqsk3oGtcDsiEFbH2SDUbaSsBA238c42ShrLfsmv2g",
  BingSiteVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "314B6D037027F4B4D7C73C663ECF08DA",
  FbDomainVerification: process.env.NEXT_PUBLIC_FB_DOMAIN_VERIFICATION || "",
};

export type TSeasonName = "Ramadan" | "EidAlFitr" | "EidAlAdha";

type TGreeting = {
  Active: boolean;
  Favicon: string;
  Logo: string;
};

export const GREETINGS: Record<"Default" | TSeasonName, TGreeting> = {
  Default: { Active: false, Favicon: "/favico/favico.png", Logo: "/favico/logo.webp" },
  Ramadan: { Active: false, Favicon: "/favico/favico.Ramadan.png", Logo: "/favico/logo.Ramadan.webp" },
  EidAlFitr: { Active: false, Favicon: "/favico/favico.EidAlFitr.png", Logo: "/favico/logo.EidAlFitr.webp" },
  EidAlAdha: { Active: false, Favicon: "/favico/favico.EidAlAdha.png", Logo: "/favico/logo.EidAlAdha.webp" },
};

export const ACTIVE_GREETING = Object.values(GREETINGS).find((Greeting) => Greeting.Active) ?? GREETINGS.Default;

export const ACTIVE_SEASON: TSeasonName | null =
  (Object.entries(GREETINGS).find(([Name, Greeting]) => Greeting.Active && Name !== "Default")?.[0] as
    | TSeasonName
    | undefined) ?? null;

export function WhatsAppLink(Message?: string): string {
  return Message ? `${CONTACT.WhatsApp}?text=${encodeURIComponent(Message)}` : CONTACT.WhatsApp;
}

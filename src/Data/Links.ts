import type { TBilingual } from "@/Lib/Seo";

export type TLinkKey =
  | "website"
  | "appstore"
  | "googleplay"
  | "github"
  | "reddit"
  | "docs"
  | "video"
  | "linkedin"
  | "twitter"
  | "facebook"
  | "phone"
  | "whatsapp"
  | "x"
  | "email";

export type TLinkItem = {
  key: TLinkKey;
  url: string;
  label?: TBilingual;
};

export type TScreenCaptions = Record<string, TBilingual>;

// Shared dynamic link model for products and portfolio projects.
// A link is { key, url, label? } — the key resolves to an icon + default label
// in the LinkButtons registry, so any number of links can be attached to an
// item and new channel types only need a registry entry.
import type { Lang } from "@/lib/seo";

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
    /** Optional bilingual label overriding the key's default (e.g. "منصة البروكرز") */
    label?: Record<Lang, string>;
};

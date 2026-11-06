import {
  Apple,
  ExternalLink,
  Facebook,
  FileText,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Play,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import type { TLinkItem, TLinkKey } from "@/Data/Links";
import type { Lang } from "@/Lib/Seo";
import type { TCommon } from "@/I18n/Index";
import { ButtonClass } from "./Button";

const LINK_ICONS: Record<TLinkKey, LucideIcon> = {
  website: ExternalLink, appstore: Apple, googleplay: Play, github: Github, docs: FileText,
  video: Youtube, linkedin: Linkedin, x: Twitter, twitter: Twitter, facebook: Facebook,
  whatsapp: MessageCircle, phone: Phone, email: Mail, reddit: MessageSquare,
};

type TLinkButtonsProps = {
  Links: TLinkItem[];
  Language: Lang;
  Labels: TCommon["Links"];
  Compact?: boolean;
};

export function LinkButtons({ Links, Language, Labels, Compact = false }: TLinkButtonsProps) {
  if (Links.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {Links.map((Link) => {
        const Glyph = LINK_ICONS[Link.key];
        if (!Glyph) return null;
        const Label = Link.label ? Link.label[Language] : Labels[Link.key];
        const Variant = Link.key === "website" && !Compact ? "Primary" : "Line";
        return (
          <a
            key={`${Link.key}-${Link.url}`}
            href={Link.url}
            target={Link.url.startsWith("tel:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={ButtonClass(Variant, "Sm")}
          >
            <Glyph size={16} aria-hidden="true" />
            {Label}
          </a>
        );
      })}
    </div>
  );
}

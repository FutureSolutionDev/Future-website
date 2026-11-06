import type { ComponentType } from "react";
import { Apple, ExternalLink, FileText, Mail, MessageCircle, Phone, Play } from "lucide-react";
import { BrandGlyph } from "./BrandIcons";
import type { TLinkItem, TLinkKey } from "@/Data/Links";
import type { Lang } from "@/Lib/Seo";
import type { TCommon } from "@/I18n/Index";
import { ButtonClass } from "./Button";

type TGlyph = ComponentType<{ size?: number; className?: string }>;

const X_GLYPH = BrandGlyph("X");

const LINK_ICONS: Record<TLinkKey, TGlyph> = {
  website: ExternalLink, appstore: Apple, googleplay: Play, github: BrandGlyph("Github"), docs: FileText,
  video: BrandGlyph("Youtube"), linkedin: BrandGlyph("Linkedin"), x: X_GLYPH, twitter: X_GLYPH,
  facebook: BrandGlyph("Facebook"), whatsapp: MessageCircle, phone: Phone, email: Mail, reddit: BrandGlyph("Reddit"),
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
            <Glyph size={16} className="shrink-0" />
            {Label}
          </a>
        );
      })}
    </div>
  );
}

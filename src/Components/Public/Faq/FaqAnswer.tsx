import Link from "next/link";
import type { TFaqAnswerPart } from "@/Data/Faqs";
import type { Lang } from "@/Lib/Seo";
import { WhatsAppLink } from "@/Lib/Site";

export function LocalHref(Language: Lang, Href: string): string {
  if (Href === "whatsapp") return WhatsAppLink();
  if (Href.startsWith("/#")) return `/${Language}${Href.slice(1)}`;
  return `/${Language}${Href}`;
}

export function FaqAnswer({ Parts, Language }: { Parts: TFaqAnswerPart[]; Language: Lang }) {
  return (
    <p className="text-ink-muted">
      {Parts.map((Part, Index) =>
        typeof Part === "string" ? (
          <span key={Index}>{Part}</span>
        ) : (
          <Link
            key={Index}
            href={LocalHref(Language, Part.Href)}
            className="font-semibold text-accent-ink [background:linear-gradient(var(--accent-soft),var(--accent-soft))_no-repeat_0_100%/100%_40%] hover:text-ink"
          >
            {Part.Text}
          </Link>
        ),
      )}
    </p>
  );
}

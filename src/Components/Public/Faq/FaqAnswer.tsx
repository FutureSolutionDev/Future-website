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
            className="font-semibold text-accent-ink underline decoration-accent decoration-2 underline-offset-[5px] transition-colors hover:text-ink hover:decoration-ink"
          >
            {Part.Text}
          </Link>
        ),
      )}
    </p>
  );
}

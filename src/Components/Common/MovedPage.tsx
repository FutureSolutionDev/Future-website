import type { Metadata } from "next";
import Link from "next/link";
import { PathFor, type Lang } from "@/Lib/Seo";
import { GetDictionary } from "@/I18n/Index";

export function MovedMetadata(Language: Lang, Target: string): Metadata {
  return {
    robots: { index: false, follow: true },
    alternates: { canonical: PathFor(Language, Target) },
  };
}

export function MovedPage({ Language, Target }: { Language: Lang; Target: string }) {
  const Href = PathFor(Language, Target);
  return (
    <section className="container-page py-24">
      <meta httpEquiv="refresh" content={`0;url=${Href}`} />
      <h1 className="sr-only">{GetDictionary(Language).Pages.Redirect.Text}</h1>
      <p className="text-lg text-ink-muted">
        {GetDictionary(Language).Pages.Redirect.Text}{" "}
        <Link href={Href} className="font-semibold text-accent-ink underline">
          {Href}
        </Link>
      </p>
    </section>
  );
}

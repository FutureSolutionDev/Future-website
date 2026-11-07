import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { ButtonLink } from "@/Components/Common/Button";
import { JsonLd } from "@/Components/Common/JsonLd";
import { PageHeader } from "@/Components/Common/PageHeader";
import { FaqTimeline } from "@/Components/Public/Faq/FaqTimeline";
import { ALL_FAQS } from "@/Data/Faqs";
import { FaqSchema } from "@/Lib/Schema";
import { PageMetadata, PathFor, ToLang } from "@/Lib/Seo";
import { WhatsAppLink } from "@/Lib/Site";
import { GetDictionary } from "@/I18n/Index";

const UPDATED_AT = "2026-11-06";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return PageMetadata(ToLang((await params).lang), "faq", "/faq");
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const Language = ToLang((await params).lang);
  const { Common, Pages } = GetDictionary(Language);
  const Copy = Pages.Faq;
  const Updated = new Intl.DateTimeFormat(Language === "ar" ? "ar-EG-u-nu-latn" : "en-US", { dateStyle: "long" }).format(new Date(UPDATED_AT));

  return (
    <>
      <JsonLd Data={FaqSchema(ALL_FAQS, Language)} />
      <PageHeader
        Language={Language}
        Common={Common}
        Trail={[{ Name: Common.Nav.Faq, Path: PathFor(Language, "/faq") }]}
        Label={Copy.Label}
        Title={Copy.Title}
        Lead={Copy.Lead}
      >
        <p className="mt-4 text-sm text-ink-soft">
          {Copy.Updated} <time dateTime={UPDATED_AT}>{Updated}</time>
        </p>
      </PageHeader>

      <div className="pt-12 md:pt-16">
        <FaqTimeline Language={Language} Copy={Copy} />
      </div>

      <section className="container-page pb-20 md:pb-[104px]">
        <div className="mx-auto max-w-lg rounded-lg border border-line bg-surface p-7 text-center shadow-card">
          <h2 className="text-xl font-bold">{Copy.EndTitle}</h2>
          <p className="mt-1.5 text-ink-muted">{Copy.EndText}</p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink Href={PathFor(Language, "/contact")}>{Common.Cta.BookConsultation}</ButtonLink>
            <ButtonLink Href={WhatsAppLink()} External Variant="Line">
              <MessageCircle size={18} aria-hidden="true" />
              {Common.Links.whatsapp}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

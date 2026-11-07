import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ButtonLink } from "@/Components/Common/Button";
import { PageHeader } from "@/Components/Common/PageHeader";
import { ContactForm } from "@/Components/Public/Contact/ContactForm";
import { CONTACT, WhatsAppLink } from "@/Lib/Site";
import { PageMetadata, PathFor, ToLang } from "@/Lib/Seo";
import { GetDictionary } from "@/I18n/Index";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return PageMetadata(ToLang((await params).lang), "contact", "/contact");
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const Language = ToLang((await params).lang);
  const { Common, Pages } = GetDictionary(Language);
  const Copy = Pages.Contact;
  const Rows = [
    { Icon: Mail, Label: Copy.Email, Value: <bdi dir="ltr">{CONTACT.Email}</bdi>, Href: `mailto:${CONTACT.Email}` },
    { Icon: Phone, Label: Copy.Phone, Value: <bdi dir="ltr">{CONTACT.PhoneDisplay}</bdi>, Href: `tel:+${CONTACT.Phone}` },
    { Icon: MapPin, Label: Copy.Address, Value: CONTACT.City[Language] },
  ];

  return (
    <>
      <PageHeader
        Language={Language}
        Common={Common}
        Trail={[{ Name: Common.Nav.Contact, Path: PathFor(Language, "/contact") }]}
        Label={Common.Nav.Contact}
        Title={Copy.Title}
        Lead={Copy.Lead}
      />
      <section className="container-page grid gap-8 py-16 md:grid-cols-[1fr_1.3fr] md:gap-12 md:py-20">
        <div className="grid content-start gap-6">
          <div className="rounded-lg border border-line bg-surface p-6 shadow-card">
            <h2 className="text-lg font-bold">{Copy.Info}</h2>
            <dl className="mt-5 grid gap-4">
              {Rows.map((Row) => (
                <div key={Row.Label} className="flex items-center gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Row.Icon size={19} aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-[13px] text-ink-soft">{Row.Label}</dt>
                    <dd className="font-semibold">
                      {Row.Href ? (
                        <a href={Row.Href} className="hover:text-accent-ink">
                          {Row.Value}
                        </a>
                      ) : (
                        Row.Value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            <ButtonLink Href={WhatsAppLink()} External ClassName="mt-6 w-full">
              <MessageCircle size={18} aria-hidden="true" />
              {Copy.WhatsAppFast}
            </ButtonLink>
          </div>
          <div className="rounded-lg border border-line p-6">
            <h2 className="text-lg font-bold">{Copy.NextTitle}</h2>
            <ol className="relative mt-5 grid gap-5 ps-11 before:absolute before:inset-y-2 before:start-[15px] before:w-px before:bg-line-strong">
              {Copy.NextSteps.map((Step, Index) => (
                <li key={Step} className="relative">
                  <span className="absolute -start-11 top-0 grid size-8 place-items-center rounded-full border-[1.5px] border-accent bg-page font-mono text-[13px] font-semibold text-accent-ink">
                    <bdi dir="ltr">{Index + 1}</bdi>
                  </span>
                  <span className="text-ink-muted">{Step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="rounded-lg border border-line bg-surface p-6 shadow-card md:p-8">
          <ContactForm Copy={Copy.Form} WhatsAppLabel={Common.Links.whatsapp} />
        </div>
      </section>
    </>
  );
}

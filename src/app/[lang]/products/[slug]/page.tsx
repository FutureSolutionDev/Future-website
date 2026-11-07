import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MessageCircle, Handshake } from "lucide-react";
import { ButtonLink } from "@/Components/Common/Button";
import { CtaPanel } from "@/Components/Common/CtaPanel";
import { JsonLd } from "@/Components/Common/JsonLd";
import { LinkButtons } from "@/Components/Common/LinkButtons";
import { PageHeader } from "@/Components/Common/PageHeader";
import { MetricRail } from "@/Components/Public/Home/MetricRail";
import { WaitlistForm } from "@/Components/Public/Work/WaitlistForm";
import { FeatureList, Screens } from "@/Components/Public/Work/DetailLayout";
import { GetProductBySlug, IsAvailable, PRODUCTS, ProductName, StatusLabel } from "@/Data/Products";
import { GetProjectImages, GetWorkOgImage } from "@/Lib/Images";
import { ProductSchema } from "@/Lib/Schema";
import { BuildMetadata, LANGS, PathFor, ToLang } from "@/Lib/Seo";
import { WhatsAppLink } from "@/Lib/Site";
import { GetDictionary } from "@/I18n/Index";

type TParams = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return LANGS.flatMap((lang) => PRODUCTS.map((Product) => ({ lang, slug: Product.Slug })));
}

export async function generateMetadata({ params }: TParams): Promise<Metadata> {
  const { lang, slug } = await params;
  const Language = ToLang(lang);
  const Product = GetProductBySlug(slug);
  if (!Product) return {};
  const ShareImage = GetWorkOgImage(Product.Slug);
  return BuildMetadata({
    Language,
    Path: `/products/${slug}`,
    Title: `${ProductName(Product, Language)}: ${Product.Category[Language]}`,
    Description: `${Product.Tagline[Language]} ${Product.Description[Language]}`,
    Keywords: [Product.Name, ...(Product.NameAr ? [Product.NameAr] : []), Product.Category[Language], Product.Category.en],
    Images: ShareImage ? [{ ...ShareImage, alt: ProductName(Product, Language) }] : undefined,
  });
}

export default async function ProductPage({ params }: TParams) {
  const { lang, slug } = await params;
  const Language = ToLang(lang);
  const Product = GetProductBySlug(slug);
  if (!Product) notFound();
  const Copy = GetDictionary(Language);
  const { Common, Pages } = Copy;
  const Images = Product.ImagesFolder ? GetProjectImages(Product.ImagesFolder) : [];
  const IsLive = IsAvailable(Product);
  const Name = ProductName(Product, Language);
  const Status = Product.Stage?.[Language] ?? StatusLabel(Product, Pages.Work);

  return (
    <>
      <JsonLd Data={ProductSchema(Product, Language, Images)} />
      <PageHeader
        Language={Language}
        Common={Common}
        Trail={[
          { Name: Common.Nav.Work, Path: PathFor(Language, "/portfolio") },
          { Name, Path: PathFor(Language, `/products/${Product.Slug}`) },
        ]}
        Label={Product.Category[Language]}
        Title={<span className={Name === Product.Name ? "font-latin" : undefined}>{Name}</span>}
        Lead={Product.Tagline[Language]}
      >
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-sm font-semibold text-accent-ink">
          <span aria-hidden="true" className={IsLive ? "size-2 rounded-full bg-success" : "size-2 rounded-full bg-accent"} />
          {Status}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          {Product.DemoOnRequest && (
            <ButtonLink Href={WhatsAppLink(`${Pages.Product.DemoMessage} ${Name}`)} External>
              <MessageCircle size={18} aria-hidden="true" />
              {Pages.Product.RequestDemo}
            </ButtonLink>
          )}
          {Product.Links && <LinkButtons Links={Product.Links} Language={Language} Labels={Common.Links} />}
        </div>
      </PageHeader>

      <div className="container-page grid gap-16 py-16 md:gap-20 md:py-20">
        <section className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-14">
          <div>
            <h2 className="text-2xl font-bold md:text-[28px]">{Pages.Project.Overview}</h2>
            <p className="mt-4 text-lg text-ink-muted">{Product.Description[Language]}</p>
            <p className="mt-6 rounded-md border-s-2 border-accent bg-accent-soft p-5">
              <b className="block text-sm text-accent-ink">{Pages.Product.WhoFor}</b>
              <span className="mt-1 block">{Product.Audience[Language]}</span>
            </p>
            {Product.License && (
              <p className="mt-4 text-sm text-ink-soft">
                {Pages.Product.License}:{" "}
                <a href={Product.License.Url} target="_blank" rel="noopener noreferrer" lang="en" className="font-semibold text-accent-ink underline underline-offset-4">
                  {Product.License.Name}
                </a>
              </p>
            )}
          </div>
          <div className="grid content-start gap-4">
            {!IsLive && <WaitlistForm Product={Product.Name} Copy={Pages.Waitlist} />}
            {Product.AppsComingSoon && <WaitlistForm Product={`${Product.Name} apps`} Copy={Pages.Waitlist} Title={Pages.Product.AppsSoon} />}
            {Product.InvestorCta && (
              <div className="rounded-lg border border-line p-5">
                <p className="flex items-center gap-2 font-semibold">
                  <Handshake size={18} className="text-accent" aria-hidden="true" />
                  {Pages.Product.InvestorTitle}
                </p>
                <p className="mt-1.5 text-[15px] text-ink-muted">{Pages.Product.InvestorText}</p>
                <ButtonLink Href={WhatsAppLink(`${Pages.Product.InvestorMessage} ${Name}`)} External Variant="Line" Size="Sm" ClassName="mt-4">
                  <MessageCircle size={16} aria-hidden="true" />
                  {Common.Cta.WhatsApp}
                </ButtonLink>
              </div>
            )}
          </div>
        </section>

        {Product.Stats && (
          <div className="-mb-12">
            <MetricRail Items={Product.Stats} Language={Language} />
          </div>
        )}

        {Images.length > 0 && (
          <Screens Title={Name} ImagesFolder={Product.ImagesFolder} Images={Images} Captions={Product.Captions} Language={Language} Copy={Copy} />
        )}
        <FeatureList Title={Pages.Product.Delivers} Features={Product.Features} Language={Language} />
      </div>

      <CtaPanel
        Language={Language}
        Common={Common}
        Title={IsLive ? Pages.Product.CtaLive : `${Pages.Product.CtaSoon} ${Name}?`}
        Text={Pages.Product.CtaText}
      />
    </>
  );
}

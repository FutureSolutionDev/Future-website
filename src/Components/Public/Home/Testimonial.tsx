import { APPROVED_TESTIMONIALS } from "@/Data/Testimonials";
import { SectionLabel } from "@/Components/Common/SectionLabel";
import type { Lang } from "@/Lib/Seo";

type TTestimonialProps = {
  Language: Lang;
  Label: string;
  LinkLabel: string;
};

export function Testimonial({ Language, Label, LinkLabel }: TTestimonialProps) {
  const Item = APPROVED_TESTIMONIALS[0];
  if (!Item) return null;
  return (
    <section className="bg-subtle py-20 md:py-[104px]">
      <figure className="container-page grid grid-cols-[2px_1fr] gap-6 md:gap-9">
        <span aria-hidden="true" className="bg-gradient-to-b from-accent to-transparent" />
        <div>
          <SectionLabel Index="04">{Label}</SectionLabel>
          <blockquote className="mt-6 max-w-[880px] text-[21px] leading-[1.8] font-medium md:text-[28px]">
            «{Item.Quote[Language]}»
          </blockquote>
          <figcaption className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-2 text-ink-muted">
            <span>
              <b className="font-latin font-semibold text-ink">{Item.Name}</b> · {Item.Role[Language]}
            </span>
            {Item.Link && (
              <a href={Item.Link} target="_blank" rel="noopener noreferrer" className="border-b border-current font-semibold text-accent-ink">
                {LinkLabel}
              </a>
            )}
          </figcaption>
        </div>
      </figure>
    </section>
  );
}

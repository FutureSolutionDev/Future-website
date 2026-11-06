import Image from "next/image";
import Link from "next/link";
import { CONTACT, SITE_TITLE } from "@/Lib/Site";
import { PathFor, type Lang } from "@/Lib/Seo";
import { SERVICES } from "@/Data/Services";
import { PRODUCTS } from "@/Data/Products";
import type { TCommon } from "@/I18n/Index";
import type { TNavItem } from "./Navbar";

type TFooterProps = {
  Language: Lang;
  Common: TCommon;
  Items: TNavItem[];
  LogoSrc: string;
};

const HEADING = "mb-4 text-sm font-semibold text-ink-soft";
const LINK = "block py-1 text-[15px] text-ink-muted transition-colors hover:text-ink";

export function Footer({ Language, Common, Items, LogoSrc }: TFooterProps) {
  return (
    <footer className="border-t border-line bg-subtle">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Image src={LogoSrc} alt="Future Solutions Dev" width={126} height={80} className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-[15px] text-ink-muted">{Common.Footer.About}</p>
        </div>
        <div>
          <h2 className={HEADING}>{Common.Nav.Services}</h2>
          <ul>
            {SERVICES.map((Service) => (
              <li key={Service.Id}>
                <Link href={PathFor(Language, `/services#${Service.Id}`)} className={LINK}>
                  {Service.Title[Language]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={HEADING}>{Common.Footer.Company}</h2>
          <ul>
            {Items.map((Item) => (
              <li key={Item.Key}>
                <Link href={Item.Path} className={LINK}>
                  {Item.Label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={PathFor(Language, "/contact")} className={LINK}>
                {Common.Nav.Contact}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className={HEADING}>{Common.Footer.Products}</h2>
          <ul>
            {PRODUCTS.map((Product) => (
              <li key={Product.Slug}>
                <Link href={PathFor(Language, `/products/${Product.Slug}`)} className={LINK}>
                  {Product.Name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={HEADING}>{Common.Footer.Contact}</h2>
          <ul>
            <li>
              <a href={`mailto:${CONTACT.Email}`} className={LINK}>
                <bdi dir="ltr">{CONTACT.Email}</bdi>
              </a>
            </li>
            <li>
              <a href={`tel:+${CONTACT.Phone}`} className={LINK}>
                <bdi dir="ltr">{CONTACT.PhoneDisplay}</bdi>
              </a>
            </li>
            <li>
              <a href={CONTACT.WhatsApp} target="_blank" rel="noopener noreferrer" className={LINK}>
                {Common.Links.whatsapp}
              </a>
            </li>
            <li className="py-1 text-[15px] text-ink-muted">{CONTACT.City[Language]}</li>
          </ul>
        </div>
      </div>
      <div className="container-page flex flex-col justify-between gap-3 border-t border-line py-6 text-sm text-ink-soft sm:flex-row">
        <p>
          © <bdi dir="ltr">{new Date().getFullYear()}</bdi> {SITE_TITLE}. {Common.Footer.Rights}
        </p>
        <p className="flex gap-4">
          <a href={CONTACT.LinkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            {Common.Links.linkedin}
          </a>
          <a href={CONTACT.Facebook} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            {Common.Links.facebook}
          </a>
        </p>
      </div>
    </footer>
  );
}

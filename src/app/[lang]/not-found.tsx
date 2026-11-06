"use client";

import { usePathname } from "next/navigation";
import { ButtonLink } from "@/Components/Common/Button";
import { PAGES_AR } from "@/I18n/Pages/Ar";
import { PAGES_EN } from "@/I18n/Pages/En";

export default function NotFound() {
  const Language = usePathname()?.startsWith("/ar") ? "ar" : "en";
  const Copy = (Language === "ar" ? PAGES_AR : PAGES_EN).NotFound;
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="font-mono text-7xl font-semibold text-accent">404</p>
        <h1 className="mt-6 text-3xl font-bold">{Copy.Title}</h1>
        <p className="mt-3 text-ink-muted">{Copy.Text}</p>
        <ButtonLink Href={`/${Language}`} ClassName="mt-8">
          {Copy.Back}
        </ButtonLink>
      </div>
    </section>
  );
}

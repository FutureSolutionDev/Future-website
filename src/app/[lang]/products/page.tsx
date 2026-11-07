import type { Metadata } from "next";
import { MovedMetadata, MovedPage } from "@/Components/Common/MovedPage";
import { ToLang } from "@/Lib/Seo";

const TARGET = "/portfolio#products";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return MovedMetadata(ToLang((await params).lang), TARGET);
}

export default async function ProductsMovedPage({ params }: { params: Promise<{ lang: string }> }) {
  return <MovedPage Language={ToLang((await params).lang)} Target={TARGET} />;
}

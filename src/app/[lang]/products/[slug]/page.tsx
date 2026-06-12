import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GetProduct, Products } from '@/data/products';
import { GetProjectImages } from '@/lib/projectImages';
import { BuildMetadata, IsLang, LANGS, SITE_URL, type Lang } from '@/lib/seo';
import ProductView from './ProductView';

export function generateStaticParams() {
    return LANGS.flatMap((lang) => Products.map((product) => ({ lang, slug: product.slug })));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
    const { lang: langParam, slug } = await params;
    const lang: Lang = IsLang(langParam) ? langParam : 'en';
    const product = GetProduct(slug);
    if (!product) return { title: 'Product Not Found' };

    const cover = product.imagesFolder ? GetProjectImages(product.imagesFolder)[0] : undefined;

    return BuildMetadata({
        lang,
        path: `/products/${slug}`,
        title: `${product.name} — ${product.category[lang]}`,
        description: product.tagline[lang],
        images: cover ? [{ url: cover, width: 1200, height: 750, alt: product.name }] : undefined,
    });
}

function ProductSchema(lang: Lang, product: NonNullable<ReturnType<typeof GetProduct>>) {
    const liveUrl = product.links?.find((link) => link.key === 'website')?.url;
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: product.name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: product.description[lang],
        url: `${SITE_URL}/${lang}/products/${product.slug}`,
        author: { '@type': 'Organization', name: 'Future Solutions Dev', url: SITE_URL },
        ...(liveUrl ? { installUrl: liveUrl } : {}),
    };
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const { lang: langParam, slug } = await params;
    const lang: Lang = IsLang(langParam) ? langParam : 'en';
    const product = GetProduct(slug);
    if (!product) notFound();

    const initialImages = product.imagesFolder ? GetProjectImages(product.imagesFolder) : [];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ProductSchema(lang, product)) }}
            />
            <ProductView product={product} initialImages={initialImages} />
        </>
    );
}

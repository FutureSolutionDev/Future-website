import type { Metadata } from 'next';
import { IsLang, PageMetadata } from '@/lib/seo';
import { Products } from '@/data/products';
import { GetProjectImages } from '@/lib/projectImages';
import ProductsContent from './ProductsContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return PageMetadata(IsLang(lang) ? lang : 'en', 'products', '/products');
}

export default function ProductsPage() {
    // First image of each product folder becomes the listing cover
    const coverByFolder = Object.fromEntries(
        Products.filter((p) => p.imagesFolder).map((p) => [
            p.imagesFolder as string,
            GetProjectImages(p.imagesFolder as string)[0],
        ])
    );
    return <ProductsContent coverByFolder={coverByFolder} />;
}

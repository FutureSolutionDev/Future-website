import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import './globals.css';
import { cn } from '@/lib/utils';
import { MetaConfig } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' });

export const metadata: Metadata = MetaConfig

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.variable, cairo.variable, "min-h-screen bg-bg-dark text-text-main antialiased flex flex-col")}>
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow
          md:min-h-[calc(100dvh-8.6rem)] min-h-[calc(100dvh-9rem)]
          overflow-y-auto overflow-x-hidden
          "
          >
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

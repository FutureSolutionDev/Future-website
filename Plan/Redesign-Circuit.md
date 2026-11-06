# إعادة تصميم الموقع: Circuit

> الحالة: اتنفذ على `feat/awesome-curie-nz7yrq` ومستني مراجعة Sabry. الـ `master` الحالي بيفضل شغال لحد ما نعمل merge.
> الـ Design System المعتمد: https://claude.ai/artifact/5rP59zpf4e5ySCphb5KHGc

## القرارات المعتمدة من Sabry

| القرار | الاختيار |
|---|---|
| الاتجاه البصري | Circuit: Hybrid فاتح، وأقسام navy (`inverse`)، وخط الدوائر من اللوجو هو التوقيع البصري |
| لون البراند | أزرق اللوجو `#1A93D6`، والأزرار `#0F77B6` |
| التنقّل | 6 روابط + زرار «احجز استشارة»، والـ Navbar navy في الرئيسية |
| المحتوى | فصحى مبسّطة موحّدة، مفيش «—»، وشهادات العملاء بالحرف |
| الاتجاه | التصميم عربي أولاً (RTL، والإنجليزي مرآة ليه). الافتراضي في الـ SEO يفضل إنجليزي (`/` → محتوى `/en`، و`x-default = en`) |
| الـ FAQ | صفحة خط زمني بمراحل، وروابط جوه الإجابات |
| الصور | Files Viewer في صفحة كل مشروع ومنتج، وأي صورة بتتفتح في Lightbox بريميوم |

## المعمارية (Stacks/NextJS.md في sabry-kit)

- **الـ Stack من غير تغيير:** Next.js 16 static export على VPS + Nginx. ده اختيار الكيت لموقع محتاج SEO، ومفيش backend.
- **Tailwind v4 CSS-first:** `src/Styles/Globals.css` فيه `@import "tailwindcss"` و`@theme`، والـ tokens نفس الـ Design System بالظبط. `tailwind.config.ts` و`autoprefixer` بيتشالوا.
- **الخطوط:** `next/font/google`: IBM Plex Sans Arabic وInter وIBM Plex Mono (self-hosted ومعمولها preload).
- **الهيكل PascalCase:**

```tree
src/
├── app/                  ← لازم lowercase (Next.js بيفرضه)
│   ├── [lang]/…          ← الصفحات (page.tsx رفيعة: metadata + تركيب الأقسام)
│   ├── llms.txt/route.ts ← GEO
│   ├── robots.ts · sitemap.ts · global-not-found.tsx
├── Components/
│   ├── Common/           ← Button, SectionLabel, CircuitTraces, Lightbox, FilesViewer, Field, JsonLd, PageHeader
│   └── Public/
│       ├── Layout/       ← Navbar, MobileMenu, Footer
│       ├── Home/ · Services/ · Work/ · Faq/ · Blog/ · About/ · Contact/
│       └── Seasonal/     ← زينة رمضان والأعياد (اتنقلت زي ما هي)
├── Data/                 ← المحتوى ثنائي اللغة: Projects, Products, Services, Industries, Technologies, Faqs, Team…
├── I18n/<Page>/{Ar,En}.ts + I18n/Common/
├── Lib/                  ← Seo, Schema, Blog, Images, ContactApi, Site, Cn
├── Hooks/                ← UseProjectImages, UseGallery
└── Styles/Globals.css
```

- **Server Components افتراضياً.** `"use client"` بيتحط بس على: القائمة في الموبايل، والـ Lightbox، والـ Files Viewer، وتقدّم الـ FAQ، والفورم، وفلتر المدونة، والـ Waitlist.
- **من غير `framer-motion` في الصفحات.** الحركة بالـ CSS، و`prefers-reduced-motion` محترم. framer-motion وcanvas-confetti فاضلين للزينة الموسمية بس (lazy chunks).
- **من غير `LanguageContext`.** اللغة بتيجي من `params` وبتتمرر props.

## الروابط (بدون ما نخسر ترتيب جوجل)

| القديم | الجديد |
|---|---|
| `/services` | زي ما هو، ومدموج فيه قسم التقنيات `#technologies` |
| `/solutions` | زي ما هو، واسمه في القائمة «القطاعات» |
| `/portfolio` | زي ما هو، واسمه «أعمالنا»، ومدموج فيه المنتجات `#products` |
| `/portfolio/<slug>` | **جديد**: صفحة مشروع فيها Files Viewer |
| `/products/<slug>` | زي ما هو، ومعاه Files Viewer |
| `/faq` | **جديد**: الخط الزمني |
| `/technologies` | 301 لـ `/services#technologies` (nginx) + صفحة redirect احتياطي |
| `/products` | 301 لـ `/portfolio#products` (nginx) + صفحة redirect احتياطي |

## SEO + AEO + GEO

1. Schemas: `Organization` (شاملة contactPoint وareaServed وknowsAbout)، و`WebSite`، و`BreadcrumbList` لكل صفحة داخلية، و`ItemList` بالخدمات، و`FAQPage` على `/faq`، و`Article`، و`SoftwareApplication`، و`CreativeWork` للمشاريع، و`Person` للفريق.
2. `llms.txt` بيتولّد من البيانات وقت الـ build: الخدمات والمشاريع والمنتجات والمقالات والأسئلة.
3. `robots.ts` بيسمح صراحة لـ GPTBot وClaudeBot وPerplexityBot وGoogle-Extended.
4. كل إجابة وكل مقال بيبدأ بالخلاصة، وفيه روابط داخلية بين الـ FAQ والخدمات والمقالات.
5. الـ Sitemap فيه الصفحات الجديدة، ومن غير صفحات الـ redirect.

## المهام

| # | المهمة | الحالة |
|---|---|---|
| 1 | Tailwind v4 + tokens + الخطوط + الهيكل | ✅ |
| 2 | البيانات: نقل وتحويل لفصحى ومن غير «—» | ✅ |
| 3 | المكوّنات المشتركة (Button، Label، Traces، Lightbox، FilesViewer، Field) | ✅ |
| 4 | Layout: Navbar وFooter وMobileMenu | ✅ |
| 5 | الصفحات: الرئيسية، الخدمات، القطاعات، أعمالنا، المشروع، المنتج، المدونة، المقال، الأسئلة، من نحن، تواصل، 404 | ✅ |
| 6 | SEO/AEO/GEO: schemas وllms.txt وrobots وsitemap وredirects | ✅ |
| 7 | المقالات الـ 18: فصحى ومن غير «—» (agent منفصل) | ✅ |
| 8 | تحقق: typecheck وlint وbuild وscreenshots عربي وإنجليزي وموبايل | ✅ |

## Edge cases

- `npm ci` في الـ CI: لازم `package-lock.json` يتحدث مع أي dependency جديدة.
- صور المعرض بتتحدث من غير rebuild (nginx JSON listing). `UseProjectImages` لازم يفضل شغال.
- الـ Lightbox: Esc، وحبس الـ focus، وإرجاع الـ focus، والسحب على الموبايل، والأسهم معكوسة في RTL.
- الأرقام وأسماء الملفات والإيميلات جوه `<bdi dir="ltr">`.

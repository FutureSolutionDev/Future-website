# Future Solutions — Company Website

Next.js 16 (App Router, **static export**) + React 19 + Tailwind CSS 4 (CSS-first tokens in `src/Styles/Globals.css`).
Design system: **Circuit** (Arabic first, RTL; English mirrors it). Plan and decisions: [Plan/Redesign-Circuit.md](Plan/Redesign-Circuit.md).
Bilingual: every page exists at `/en/...` and `/ar/...` (full SSG for both, with hreflang).

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000/en  (root / redirects)
npm run build      # static export → out/
npm run typecheck
npm run lint
```

Environment variables: copy `.env.example` → `.env.local` (form key, GA id, search-console verification tokens). In CI they come from GitHub repository **Variables**.

## ✍️ Adding a blog article (the whole workflow)

1. Create two files in `content/blog/`:
   - `my-article-slug.en.mdx`
   - `my-article-slug.ar.mdx`
2. Each file = YAML frontmatter + Markdown body. Required frontmatter:

   ```yaml
   ---
   title: "Article title"
   excerpt: "One-two sentences shown in listings and search results."
   category: "E-Commerce"
   readTime: "8 min read"
   publishedAt: "2026-06-12"
   icon: ShoppingCart        # ShoppingCart | BarChart | Server | Layers
   ---
   ```

   Optional: `coverImage`, `relatedSolutions: [other-slugs]`, `cta: {title, description, buttonText}`.
3. Body is normal Markdown. Rich blocks are available as components:

   ```mdx
   <Highlights items={["Point one", "Point two"]} />
   <Steps items={[{"title":"Step","description":"..."}]} />
   <Features items={[{"name":"Feature","description":"..."}]} />
   <Tech items={["Next.js", "PostgreSQL"]} />
   <Stats items={[{"value":"40%","label":"Faster"}]} />
   ```

4. `git push` → GitHub Action builds and deploys. The article appears in the blog listing, gets its own metadata/OG tags, and is added to `sitemap.xml` automatically. Nothing else to do.

If the Arabic file is missing the English version is served at `/ar/...` as a fallback (build does not break). Invalid frontmatter fails the build with a clear error.

## 🪔 Seasonal decorations (Ramadan / Eid)

Toggle manually in [src/Lib/Site.ts](src/Lib/Site.ts): set `Active: true` on exactly one entry in `GREETINGS`, then push (rebuild + deploy). Components and artwork are lazy-loaded, so inactive seasons cost visitors zero bytes.

## 💼 Portfolio

Project data lives in [src/Data/Projects.ts](src/Data/Projects.ts) and products in [src/Data/Products.ts](src/Data/Products.ts). Each project has its own page `/portfolio/<Slug>` with a **Files Viewer**; every image opens in the full-screen **Lightbox**. Add a caption per screenshot in `Captions` (file name → `{ en, ar }`); files without one get a label from their name.

**Gallery screenshots are dynamic.** Each project points at a folder (`ImagesFolder: "/Projects/Imtithal"`). Drop WebP/PNG files into that folder — named `01-x.webp`, `02-y.webp`… for display order — and they appear in the gallery:

- **In production:** upload straight into `out/Projects/<Name>/` on the VPS — the site picks them up on the next page load, **no rebuild needed** (nginx serves the folder listing as JSON; see `deploy/nginx.conf`). The deploy workflow protects these server-side uploads from `rsync --delete`.
- **Locally/dev:** files under `public/Projects/<Name>/` are read from disk on each reload.

Keep images ≤1200px wide WebP (~30-60KB). `node scripts/optimize-assets.mjs` has the sharp recipes.

## 🚀 Deployment

- **CI:** [.github/workflows/deploy.yml](.github/workflows/deploy.yml) — on push to `master`: build + rsync `out/` to the VPS. Requires secrets `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_PATH`.
- **nginx:** [deploy/nginx.conf](deploy/nginx.conf): caching, www to non-www, `/` serves `/en`, 301s for legacy URLs and for the merged pages (`/technologies` to `/services#technologies`, `/products` to `/portfolio#products`), real 404s. Apply on the server after every change (`nginx -t && systemctl reload nginx`).

## 🔍 SEO notes

- Per-page titles/descriptions live in [src/I18n/Seo/](src/I18n/Seo/) (`En.ts` and `Ar.ts`); UI text lives in [src/I18n/](src/I18n/).
- Content rules: simplified Modern Standard Arabic, **no em dash (—)**, answers start with the conclusion, client testimonials stay verbatim.
- Canonical + hreflang are generated per page; `sitemap.xml` is generated at build from real content (`src/app/sitemap.ts`).
- JSON-LD ([src/Lib/Schema.ts](src/Lib/Schema.ts)): Organization + WebSite in the layout, BreadcrumbList on inner pages, Service list, FAQPage on `/faq`, BlogPosting, CreativeWork per project, SoftwareApplication per product, Person per team member.
- GEO: `/llms.txt` is generated at build from the same data; `robots.txt` explicitly allows AI crawlers.
- OG image: `public/og/default.png` (regenerate with `node scripts/generate-og.mjs`).

## 📦 Asset rules

No file over ~300KB enters `public/`. Compress first (`scripts/optimize-assets.mjs` shows the sharp recipes — WebP, quality 80).

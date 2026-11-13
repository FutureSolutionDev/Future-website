# Per-article Open Graph images

One folder per article (named after its slug). These cards show when a blog
post is shared on WhatsApp, Facebook, X, LinkedIn, etc.

```
public/og/blog/
  <slug>/
    en.png    ← English-specific card
    ar.png    ← Arabic-specific card
    og.png    ← language-neutral (used for both if no per-language file)
```

`.png`, `.jpg`, `.jpeg`, `.webp` are all accepted.

**Example** — `og/blog/custom-website-vs-website-builders/en.png` + `ar.png`.

**Recommended size:** 1200 × 630 px, under ~300 KB.

If no file matches a post, the site falls back to the article's `coverImage`
(when it exists) and finally to `/og/default.png`. Resolver: `src/lib/ogImages.ts`.

# 🚀 خطة الإصلاح الشامل — Future Solutions Website

> **التاريخ:** 2026-06-12
> **مبنية على:** [audit-report.md](audit-report.md) + قرارات Sabry
> **القرارات المعتمدة:** VPS + nginx • مسارات /ar و /en كاملة • MDX + نشر تلقائي • Web3Forms • Portfolio بمشاريع حقيقية • GA4 + Search Consoles (Google/Bing/Meta) • الزينة يدوية محسّنة • GitHub Action → VPS

---

## نظرة عامة على المراحل

| المرحلة | المحتوى | المدة التقديرية | تعالج |
|---------|---------|-----------------|-------|
| **Phase 0** | بنية تحتية: nginx + Deploy تلقائي | نصف يوم | SEV-006, SEV-009 |
| **Phase 1** | Quick wins مستقلة: فورم + أصول + bundle + analytics | يوم | SEV-010, SEV-011, SEV-012, SEV-013, SEV-016 |
| **Phase 2** | الـ SEO الجذري: مسارات [lang] + metadata + sitemap + schemas | 2-3 أيام | SEV-001→008 |
| **Phase 3** | المحتوى: مدونة MDX + Portfolio + تنظيف | 1-2 يوم | SEV-014, SEV-015, SEV-017 |
| **Phase 4** | QA وإطلاق: قياس + فهرسة + اختبار شامل | نصف يوم | التحقق النهائي |

**قرار معماري مهم (لتفادي الشغل المكرر):** بما أن مسارات `/ar` و`/en` معتمدة، الـ metadata لكل صفحة هتتكتب **مرة واحدة داخل البنية الجديدة `[lang]`** في Phase 2 — مش هنكتبها على البنية الحالية ثم نعيد كتابتها. الـ quick wins في Phase 0-1 كلها مستقلة عن الـ refactor فتتنفذ فوراً بأمان.

---

## 📥 مطلوب منك (Inputs) — جهّزها على التوازي

| # | المطلوب | تُستخدم في |
|---|---------|------------|
| 1 | بيانات SSH للـ VPS (host, user, path الموقع) — هتتحط كـ GitHub Secrets | Task 2 |
| 2 | حساب Web3Forms (مجاني — access key) أو أعمله أنا وتغير الإيميل | Task 5 |
| 3 | GA4 Measurement ID (G-XXXX) من Google Analytics | Task 8 |
| 4 | أكواد التحقق: Google Search Console + Bing Webmaster + Meta domain verification | Task 8 |
| 5 | بيانات المشاريع الحقيقية للـ Portfolio: اسم، صورة، وصف (ع/E)، تقنيات، رابط live إن وجد — 2 إلى 6 مشاريع | Task 13 |
| 6 | تأكيد نطاق الموقع النهائي: `futuresolutionsdev.com` بدون www (هو المعتمد في الخطة) | Phase 2 |

---

# Phase 0 — البنية التحتية (nginx + Deploy)

## Task 1: إصلاح nginx config وإزالة ملفات السيرفر من public
- **النوع**: DevOps
- **الأولوية**: 🔴 عاجل
- **التبعيات**: لا شيء
- **الوصف**:
  1. نقل `public/nginx.conf` خارج `public/` إلى `deploy/nginx.conf` (حالياً منشور للعامة على الموقع ويكشف مسارات السيرفر).
  2. حذف `public/.htaccess` نهائياً (سيرفرنا nginx — الملف ميت ومضلل، وفيه دومين مشروع آخر futuretechdev.com).
  3. مراجعة/استكمال `deploy/nginx.conf`:
     - `try_files $uri $uri.html $uri/ =404;` — حتى تعمل `/about` بدون امتداد وتُرجع 404 حقيقي للمسارات الغلط (مش fallback للـ index).
     - كاش: `_next/static` → سنة immutable (موجود) • صور/خطوط → شهر (موجود) • **HTML → `no-cache, must-revalidate`** (إضافة مطلوبة — حتى يظهر المحتوى الجديد فور النشر).
     - redirect موحّد: `www.futuresolutionsdev.com` → non-www بـ 301 (server block منفصل).
     - gzip موجود — إضافة `application/xml` و`font/woff2` للأنواع.
     - security headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`.
  4. تطبيق الـ config على الـ VPS (`nginx -t` ثم reload).
- **معايير القبول**: `curl -I` يثبت: asset من `_next/static` فيه `max-age=31536000` • صفحة HTML فيها `no-cache` • `/about` تشتغل و`/xyz` ترجع 404 بكود 404 • `www.` يعمل 301 • `https://الموقع/nginx.conf` ترجع 404.
- **Edge Cases**: لو فيه روابط خارجية قديمة بـ www لازم الـ 301 يحافظ على المسار كاملاً • تأكد أن `404.html` الموجود في out هو صفحة الـ 404 المضبوطة في nginx (`error_page 404 /404.html;`).
- **الجهد**: صغير

## Task 2: GitHub Action — نشر تلقائي للـ VPS
- **النوع**: DevOps
- **الأولوية**: 🔴 عاجل
- **التبعيات**: Task 1 + Input #1
- **الوصف**: workflow على push لـ master: checkout → `npm ci` → `npm run build` → rsync لمجلد `out/` للـ VPS عبر SSH (مفتاح deploy مخصص في Secrets: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_PATH`). rsync بـ `--delete` مع استثناء أي مجلدات سيرفر خاصة.
- **معايير القبول**: push تجريبي يوصل الموقع للسيرفر خلال دقائق بدون تدخل يدوي • فشل الـ build يمنع النشر (لا ينشر out قديم/ناقص).
- **Edge Cases**: أول rsync بـ `--delete` ممكن يمسح ملفات موجودة على السيرفر مش في الريبو (شهادات، uploads) — نحصر الـ path على مجلد الموقع فقط ونعمل snapshot قبل أول تشغيل • concurrency: cancel-in-progress حتى لا يتسابق نشرَان.
- **ملاحظة**: ده اللي يخلي «مقال جديد = push وخلاص» حقيقية في Phase 3.
- **الجهد**: صغير

---

# Phase 1 — Quick Wins مستقلة (تتنفذ فوراً، لا تتأثر بالـ refactor)

## Task 3: ضغط وتحسين الأصول الثقيلة
- **النوع**: أداء
- **الأولوية**: 🔴 عاجل
- **الوصف**:
  1. **اللوجو**: نسخة `logo.webp` ~320px (~15KB) للـ Navbar بدل favico.png (1.15MB) + إصلاح أبعاد `<Image>` (حالياً 100×100 مع عرض 160×80 — تشويه).
  2. **Favicons**: مقاسات قياسية 32/180/512 من نفس التصميم (<50KB) لكل المواسم الأربعة.
  3. **hero.png** (1.2MB): تحويل WebP ~1300px (~100KB) + `priority` + منع تحميلها على الموبايل بـ `<picture>` مع `media="(min-width:768px)"` بدل `hidden` (display:none لا يمنع التحميل).
  4. **hero-illustration.png** (2.2MB): ضغط WebP.
  5. **SVGs المواسم (3-4.6MB)**: فحص الـ embedded base64 rasters — استبدال بـ WebP مضغوط أو تمرير على SVGO. الهدف: ≤150KB للملف.
- **معايير القبول**: لا ملف في `public/` أكبر من 300KB • اللوجو بدون تشويه • الموبايل لا يحمّل hero أصلاً (تحقق من Network tab).
- **Edge Cases**: الحفاظ على الشفافية في اللوجو • مقارنة بصرية قبل/بعد لكل SVG موسمي (الجودة البصرية مهمة فيها).
- **الجهد**: متوسط

## Task 4: تخفيف الـ JS bundle
- **النوع**: أداء
- **الأولوية**: 🟡 مهم
- **الوصف**:
  1. Dynamic imports لمكونات المواسم الستة + **نقل شرط `Active` خارج المكون** (في layout/Navbar) — الـ chunk لا يُحمَّل إلا والموسم مفعّل. (قرارك: التفعيل يظل يدوياً بـ `Active: true` — بس دلوقتي التكلفة صفر باقي السنة.)
  2. إزالة الحزم غير المستخدمة: `i18next`, `react-i18next`, `@radix-ui/react-label` (نُبقي `react-hook-form` + `zod` لو هنستخدمهم في الفورم — القرار عند Task 5، والأرجح لا: حقول HTML5 تكفي). نقل أدوات الـ build لـ devDependencies. التحقق من `Button.tsx` قبل لمس `react-slot`.
  3. إصلاح `sessionStorage.setItem` المعلّق في RamadanGreeting (popup كل تحميل صفحة لو الموسم اشتغل).
- **معايير القبول**: حجم JS الإجمالي في `out/` ينخفض ≥30% (من ~740KB) • `npx depcheck` نظيف • typecheck يعدي.
- **Edge Cases**: dynamic import مع `ssr: false` — المواسم تظهر بعد hydration بفلاش بسيط، مقبول لعنصر تجميلي.
- **الجهد**: صغير-متوسط

## Task 5: تشغيل Contact Form بـ Web3Forms
- **النوع**: Feature (تحويل)
- **الأولوية**: 🔴 عاجل
- **التبعيات**: Input #2
- **الوصف**: handler كامل: `name/required` على الحقول، حالات idle/sending/sent/error برسائل باللغتين، honeypot field ضد السبام، وعند الفشل عرض رابط واتساب كبديل. + GA event عند الإرسال الناجح (يتفعل مع Task 8).
- **معايير القبول**: رسالة اختبار توصل فعلاً على `info@futuresolutionsdev.com` • حالة الخطأ تظهر بديل الواتساب • لا يمكن الإرسال الفارغ.
- **Edge Cases**: double-submit (تعطيل الزر أثناء الإرسال) • فشل الشبكة (timeout + رسالة واضحة) • سبام (honeypot + Web3Forms spam protection).
- **الجهد**: صغير

## Task 6: GA4 + التحققات (Google / Bing / Meta)
- **النوع**: Growth/DevOps
- **الأولوية**: 🟡 مهم
- **التبعيات**: Inputs #3, #4
- **الوصف**:
  1. GA4 عبر `@next/third-parties` في الـ layout.
  2. أكواد التحقق في metadata: Google Search Console + Bing Webmaster + `facebook-domain-verification`.
  3. Events: `whatsapp_click` (Hero + Contact + Footer)، `contact_form_submit`، `language_switch`.
- **معايير القبول**: Realtime في GA4 يظهر الزيارة • الملكيّات متحققة في الثلاث منصات.
- **Edge Cases**: الـ script لا يحجب الـ rendering (afterInteractive — السلوك الافتراضي للمكتبة).
- **الجهد**: صغير

---

# Phase 2 — الـ SEO الجذري: بنية [lang] + Metadata كاملة

> **أكبر مرحلة وأعلاها قيمة.** كل صفحات الموقع تنتقل تحت `src/app/[lang]/` وتولَّد نسختين static: `/en/*` و`/ar/*`.

## Task 7: إعادة الهيكلة لمسارات اللغة
- **النوع**: Refactor
- **الأولوية**: 🔴 عاجل
- **التبعيات**: Phase 1 (حتى لا نعيد لمس نفس الملفات مرتين)
- **الوصف**:
  1. بنية جديدة: `src/app/[lang]/{layout,page}.tsx` + كل الصفحات تحتها. `generateStaticParams` → `['en','ar']`.
  2. `<html lang={lang} dir={...}>` من الـ params — **يلغي** الـ hacks: `setTimeout` في LanguageContext + Navbar، وتغيير dir بعد الـ mount (لا flash للاتجاه بعد اليوم).
  3. الترجمات: تُقرأ بحسب `params.lang` — الصفحات تتحول server components والنصوص تُبَكَّع في الـ HTML باللغتين. التفاعل (منيو، أنيميشن، فورم) يُعزل في client components صغيرة تستقبل النصوص كـ props.
  4. زر اللغة في Navbar يصبح `<Link>` لنفس الصفحة باللغة الأخرى (مع حفظ التفضيل في localStorage للزيارة القادمة).
  5. صفحة الجذر `/`: redirect خفيف لـ `/en` أو اللغة المحفوظة + nginx default redirect `/` → `/en` (302) للزاحف والزائر الجديد.
  6. **301 redirects في nginx للروابط القديمة**: `/about` → `/en/about` ...إلخ لكل الصفحات الحالية — حتى لا نخسر أي فهرسة/روابط خارجية موجودة.
- **معايير القبول**: `curl https://الموقع/ar/services | grep "خدماتنا"` ينجح بدون JS • `<html lang="ar" dir="rtl">` في مصدر الصفحة العربية • كل الروابط القديمة تعمل 301 لمقابلها • typecheck نظيف.
- **Edge Cases**: روابط داخلية كلها لازم تحمل الـ lang prefix (component `LocalizedLink` أو تمرير lang) • الـ 404 لكل لغة • مسار `/ar` بفونت Cairo والـ RTL flip للأسهم (موجود حالياً بـ conditionals — يتحول لـ CSS logical properties حيث أمكن) • أي URL بلغة غير en/ar → 404 مش crash.
- **الجهد**: كبير (ده قلب المرحلة)

## Task 8: Metadata فريدة لكل صفحة × لكل لغة
- **النوع**: SEO
- **التبعيات**: Task 7
- **الوصف**:
  1. ملف مركزي `src/lib/seo.ts`: title + description (≤160 حرفاً) لكل صفحة باللغتين — مكتوبة تستهدف كلمات بحث فعلية ("شركة برمجة في مصر"، "Custom Software Development Egypt"...).
  2. `generateMetadata` في كل صفحة: title عبر template `%s | Future Solutions` • description • `canonical: /{lang}/{path}` • `hreflang` (en + ar + x-default) • OG/Twitter بالـ lang الصحيح.
  3. تنظيف `MetaConfig`: حذف canonical المشترك وkeywords والـ description متعدد الأسطر.
- **معايير القبول**: grep على `out/` يثبت: لا يوجد صفحتان بنفس الـ title • كل صفحة canonical يطابق مسارها • hreflang موجود في كل صفحة ويشير للنسختين.
- **الجهد**: متوسط

## Task 9: صور OG حقيقية
- **النوع**: SEO/تسويق
- **الوصف**: تصميم `public/og/default.png` (1200×630، لوجو + tagline، <300KB) + صورة لكل مقال (أو عامة للمدونة مبدئياً) • إصلاح مسارات `coverImage`/`avatar` المكسورة في بيانات المقالات • fallback في `generateMetadata`.
- **معايير القبول**: Facebook Sharing Debugger + opengraph.xyz يعرضان البطاقة صح للرئيسية ولمقال.
- **الجهد**: صغير

## Task 10: sitemap.ts + robots.txt + JSON-LD
- **النوع**: SEO
- **التبعيات**: Tasks 7, 8
- **الوصف**:
  1. `src/app/sitemap.ts` (force-static): كل الصفحات × اللغتين + مقالات المدونة، يتولّد من نفس مصدر المحتوى — مقال جديد يدخل تلقائياً. حذف `public/sitemap.xml` اليدوي (بما فيه `/bltechnologiesog` المكسور).
  2. `robots.txt` نظيف + sitemap URL بدون www.
  3. JSON-LD: `Organization` في الـ layout + `Article` في صفحات المقالات + `BreadcrumbList` للمدونة.
- **معايير القبول**: Rich Results Test يقرأ الـ schemas بدون أخطاء • الـ sitemap يحتوي كل الـ URLs الفعلية (عد يدوي: صفحات×2 + مقالات×2).
- **الجهد**: صغير-متوسط

---

# Phase 3 — المحتوى: مدونة MDX + Portfolio

## Task 11: تحويل المدونة لـ MDX
- **النوع**: Refactor/Feature
- **الأولوية**: 🟡 مهم
- **التبعيات**: Task 7 (البنية النهائية للمسارات)
- **الوصف**:
  1. بنية: `content/blog/<slug>.en.mdx` + `<slug>.ar.mdx` بـ frontmatter (title, excerpt, category, publishedAt, readTime, coverImage, icon).
  2. loader في `src/lib/blog.ts` (`gray-matter` + `next-mdx-remote/rsc`): يقرأ وقت الـ build فقط — متوافق مع static export.
  3. ترحيل المقالات الأربعة الحالية من JSON لـ MDX (المحتوى الجامد sections/steps/features يتحول Markdown حر + components بسيطة للـ highlights).
  4. صفحة القائمة تقرأ frontmatter فقط (يحل مشكلة شحن 41KB) • صفحة المقال تـ render الـ MDX server-side.
  5. حذف `articles.json` بعد الترحيل.
  6. **workflow الكتابة النهائي**: ملف جديد → push → GitHub Action تبني وتنشر → المقال يظهر بالـ sitemap والـ metadata تلقائياً. **صفر خطوات تقنية إضافية.**
- **معايير القبول**: المقالات الأربعة تظهر مطابقة للوضع الحالي بصرياً • مقال تجريبي جديد يظهر كاملاً (قائمة + صفحة + sitemap) بمجرد إضافة ملفين MDX • build يفشل برسالة واضحة لو frontmatter ناقص (zod validation للـ frontmatter — استخدام حقيقي للحزمة الموجودة).
- **Edge Cases**: مقال موجود بلغة واحدة فقط (fallback للإنجليزية + تنويه) • slug مكرر (build error واضح) • أحرف عربية في الـ slug (نلتزم slugs إنجليزية) • XSS غير وارد (MDX يُصرَّف build-time من ملفاتنا فقط).
- **الجهد**: كبير

## Task 12: Portfolio بمشاريع حقيقية
- **النوع**: Feature (تحويل)
- **الأولوية**: 🟡 مهم
- **التبعيات**: Input #5
- **الوصف**: data file نظيف للمشاريع (باللغتين) • تفعيل الصفحة بالصور الحقيقية (مضغوطة WebP) • سطر "نتيجة ملموسة" لكل مشروع • إصلاح bug العنوان العربي (`<span>` الفاضي) • metadata خاصة بالصفحة. لحين وصول بياناتك: الصفحة تُخفى من الـ Navbar والـ sitemap (لا تُنشر فاضية).
- **معايير القبول**: الصفحة منشورة فقط ومعها ≥2 مشروع حقيقي بصور.
- **الجهد**: صغير-متوسط

## Task 13: تنظيف نهائي (SEV-017)
- **النوع**: Refactor
- **الوصف**: حذف `projects()` المعلّقة من constants • مراجعة `description` strings • إزالة أي dead code ظهر أثناء الـ refactor • `npx depcheck` أخير.
- **الجهد**: صغير

---

# Phase 4 — QA والإطلاق

## Task 14: التحقق الشامل والقياس
- **النوع**: QA
- **التبعيات**: كل ما سبق
- **Checklist**:
  - [ ] `bunx tsc --noEmit` + `npm run lint` نظاف
  - [ ] Lighthouse على الموقع المنشور: Performance ≥90، SEO = 100 (قياس قبل/بعد موثّق)
  - [ ] اختبار يدوي: كل صفحة × لغتين × موبايل/دسكتوب
  - [ ] الفورم يرسل فعلاً + الـ event يظهر في GA4
  - [ ] روابط قديمة: `/about` → 301 → `/en/about` • `/xyz` → 404 حقيقي • www → non-www
  - [ ] مشاركة واتساب/فيسبوك لرابط الموقع + رابط مقال — البطاقة سليمة
  - [ ] Google Search Console: إرسال الـ sitemap الجديد + طلب فهرسة الصفحات الرئيسية
  - [ ] Bing Webmaster: إرسال الـ sitemap
- **الجهد**: صغير

---

## 📋 ملخص التنفيذ

### ترتيب التنفيذ (Dependency Graph)
```
Task 1 (nginx) → Task 2 (deploy)
Tasks 3, 4, 5, 6 (مستقلة — بالتوازي بعد Phase 0)
Task 7 ([lang]) → Task 8 (metadata) → Task 10 (sitemap/schemas)
Task 7 → Task 11 (MDX)
Task 9 (OG images) — مستقلة داخل Phase 2
Input #5 → Task 12 (Portfolio)
الكل → Task 13 → Task 14 (QA)
```

### التوزيع
- **AI Agent (أنا)**: كل الـ Tasks 1-14 — كود واختبار وbuild
- **Sabry**: الـ Inputs الستة + مراجعة بصرية بعد كل Phase + تطبيق nginx config على الـ VPS (أو تديني access)

### المخاطر والحلول
| الخطر | الاحتمال | التأثير | الحل |
|-------|---------|--------|------|
| فقدان ترتيب الصفحات الحالية أثناء نقل المسارات | متوسط | عالي | 301 redirects شاملة من اليوم الأول + إرسال sitemap فوراً + مراقبة GSC أسبوعين |
| كسر بصري أثناء refactor الـ [lang] | متوسط | متوسط | تنفيذ صفحة-صفحة مع typecheck + مقارنة بصرية، Phase 2 على branch منفصل |
| rsync يمسح ملفات سيرفر | منخفض | عالي | snapshot قبل أول deploy + حصر الـ path |
| أول build على GitHub Actions يختلف عن المحلي | منخفض | متوسط | تثبيت Node version في الـ workflow مطابقة للمحلي |

### معيار النجاح النهائي
1. **SEO**: كل صفحة (×2 لغة) بعنوان ووصف وcanonical فريد + المحتوى العربي كامل في الـ HTML + sitemap حي — قابل للقياس في GSC خلال 2-4 أسابيع (impressions عربية تظهر لأول مرة).
2. **سرعة**: Lighthouse Performance ≥90 + زيارة متكررة تحمّل ≤50KB (بدل ~3MB حالياً).
3. **محتوى**: نشر مقال جديد = كتابة ملفين MDX + push. لا أي خطوة تقنية أخرى.
4. **تحويل**: رسائل الفورم توصل + كل تفاعل (واتساب/فورم) مقاس في GA4.

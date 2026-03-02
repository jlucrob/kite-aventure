# Kite Aventure — Nuxt 4 Static Website Plan

> Fully bilingual (FR-CA / EN-CA), mobile-first, SEO-optimized static website built with **Nuxt 4 + Tailwind CSS**, deployed to **Netlify**.  
> French is the default locale (unprefixed URLs); English is prefixed (`/en/...`).  
> Includes Netlify Forms, a Gorendezvous booking placeholder, and comprehensive SEO for kite school/trip keywords in the Quebec area.

---

## Table of Contents

1. [Tech Stack & Modules](#1-tech-stack--modules)
2. [Initialize the Project](#2-initialize-the-project)
3. [Install Modules](#3-install-modules)
4. [Folder Structure](#4-folder-structure)
5. [nuxt.config.ts Configuration](#5-nuxtconfigts-configuration)
6. [Layout with SEO Head Tags](#6-layout-with-seo-head-tags)
7. [Per-Page SEO Meta](#7-per-page-seo-meta)
8. [Structured Data / JSON-LD](#8-structured-data--json-ld)
9. [Sitemap & robots.txt (Automatic)](#9-sitemap--robotstxt-automatic)
10. [Shared Components](#10-shared-components)
11. [Pages](#11-pages)
12. [Translation Files (i18n)](#12-translation-files-i18n)
13. [Images & Fonts (Core Web Vitals)](#13-images--fonts-core-web-vitals)
14. [Netlify Forms Setup](#14-netlify-forms-setup)
15. [netlify.toml](#15-netlifytoml)
16. [Package.json Scripts](#16-packagejson-scripts)
17. [Development Workflow](#17-development-workflow)
18. [Deploy to Netlify](#18-deploy-to-netlify)
19. [Post-Deploy SEO Checklist](#19-post-deploy-seo-checklist)
20. [Verification](#20-verification)
21. [Key Decisions Summary](#21-key-decisions-summary)

---

## 1. Tech Stack & Modules

| Package | Purpose |
|---|---|
| `nuxt` (v4) | Core framework (Nuxt 4 with `app/` srcDir convention) |
| `@nuxtjs/tailwindcss` | Tailwind CSS integration (zero-config) |
| `@nuxtjs/i18n` | Bilingual EN-CA / FR-CA with browser detection + language switcher |
| `@nuxtjs/seo` | Meta-module bundling 6 SEO sub-modules (see below) |
| `@nuxt/image` | Responsive image optimization (WebP/AVIF, lazy loading) |
| `@nuxt/fonts` | Zero-config font optimization with fallback metrics |

### What `@nuxtjs/seo` bundles

| Sub-module | What it does |
|---|---|
| `@nuxtjs/sitemap` | Auto-generates bilingual XML sitemaps with `hreflang` alternates |
| `@nuxtjs/robots` | Dynamic `robots.txt`, auto-disables indexing in non-production |
| `nuxt-schema-org` | JSON-LD structured data (LocalBusiness, Course, etc.) |
| `nuxt-og-image` | Dynamic Open Graph image generation per page |
| `nuxt-link-checker` | Broken link detection during dev/build |
| `nuxt-seo-utils` | Automatic canonical URLs, OG defaults, title templates |

---

## 2. Initialize the Project

```bash
pnpx nuxi@latest init .
```

This scaffolds a Nuxt 4 project with `app/` as the source directory.

---

## 3. Install Modules

```bash
pnpx nuxi module add tailwindcss
pnpx nuxi module add i18n
pnpx nuxi module add @nuxtjs/seo
pnpx nuxi module add @nuxt/image
pnpx nuxi module add @nuxt/fonts
pnpm install
```

---

## 4. Folder Structure

```
website/
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css              # Tailwind directives (@tailwind base/components/utilities)
│   ├── components/
│   │   ├── AppHeader.vue             # Responsive nav bar + LanguageSwitcher + BookNowButton
│   │   ├── AppFooter.vue             # Footer with links, business info, copyright
│   │   ├── LanguageSwitcher.vue      # Toggle FR ↔ EN using useI18n().setLocale()
│   │   ├── BookNowButton.vue         # <a> placeholder linking to Gorendezvous
│   │   └── ContactForm.vue           # Netlify Forms-compatible contact form
│   ├── layouts/
│   │   └── default.vue               # Header + <slot /> + Footer + useLocaleHead() for SEO
│   ├── pages/
│   │   ├── index.vue                 # Home
│   │   ├── team.vue                  # The Team
│   │   ├── services/
│   │   │   ├── index.vue             # Services landing
│   │   │   ├── school.vue            # School subpage
│   │   │   └── trips.vue             # Trips subpage
│   │   └── contact.vue               # Contact page (uses ContactForm)
│   └── app.vue                       # Root: <NuxtLayout><NuxtPage /></NuxtLayout>
├── i18n/
│   └── locales/
│       ├── fr-CA.json                # All French translations
│       └── en-CA.json                # All English translations
├── public/
│   ├── favicon.ico
│   ├── og-default.jpg                # Default Open Graph image
│   └── __forms.html                  # Hidden Netlify form detection file
├── nuxt.config.ts
├── tailwind.config.ts                # Optional — auto-generated, customize as needed
├── netlify.toml
├── package.json
└── tsconfig.json
```

---

## 5. nuxt.config.ts Configuration

```ts
import { defineLocalBusiness } from 'nuxt-schema-org/schema'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  // Static site generation
  ssr: true,
  nitro: {
    preset: 'static',
  },

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/image',
    '@nuxt/fonts',
  ],

  // Site config — used by all SEO modules
  site: {
    url: 'https://kiteaventure.com',  // UPDATE with real domain
    name: 'Kite Aventure',
  },

  // i18n config
  i18n: {
    locales: [
      { code: 'fr', language: 'fr-CA', name: 'Français', file: 'fr-CA.json' },
      { code: 'en', language: 'en-CA', name: 'English', file: 'en-CA.json' },
    ],
    defaultLocale: 'fr',
    lazy: true,
    langDir: '../i18n/locales',            // relative to srcDir (app/)
    strategy: 'prefix_except_default',     // / for French, /en/... for English
    baseUrl: 'https://kiteaventure.com',   // REQUIRED for absolute hreflang URLs

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',   // only auto-detect on first visit to /
      alwaysRedirect: false,
    },
  },

  // Schema.org structured data — LocalBusiness for Google local results
  schemaOrg: {
    identity: defineLocalBusiness({
      '@type': 'SportsActivityLocation',
      'name': 'Kite Aventure',
      'description': 'École de kitesurf et agence de voyages kite à Québec',
      'url': 'https://kiteaventure.com',
      'address': {
        streetAddress: '...',            // UPDATE with real address
        addressLocality: 'Québec',
        addressRegion: 'QC',
        postalCode: 'G1...',             // UPDATE
        addressCountry: 'CA',
      },
      'telephone': '+1-418-XXX-XXXX',   // UPDATE
      'geo': {
        '@type': 'GeoCoordinates',
        latitude: 46.8139,
        longitude: -71.2080,
      },
      'image': '/og-default.jpg',
      'sameAs': [
        'https://facebook.com/...',      // UPDATE with real social links
        'https://instagram.com/...',
      ],
    }),
  },
})
```

---

## 6. Layout with SEO Head Tags

In `app/layouts/default.vue`, call `useLocaleHead()` and pass the result to `useHead()`. This auto-injects into every page:

- `<html lang="fr-CA">` (or `en-CA` depending on current locale)
- `<link rel="alternate" hreflang="fr-CA" href="...">` and `hreflang="en-CA"`
- `<link rel="canonical" href="...">`
- `<meta property="og:locale" content="fr_CA">` and `og:locale:alternate`

```vue
<script setup>
const head = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true,
})

useHead({
  htmlAttrs: {
    lang: head.value.htmlAttrs?.lang,
    dir: head.value.htmlAttrs?.dir,
  },
  link: [...(head.value.link || [])],
  meta: [...(head.value.meta || [])],
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
```

---

## 7. Per-Page SEO Meta

Every page should use `useSeoMeta()` in `<script setup>` with i18n-aware reactive values:

```vue
<script setup>
const { t } = useI18n()

useSeoMeta({
  title: () => t('home.seo.title'),
  description: () => t('home.seo.description'),
  // og:title and og:description are auto-inferred by nuxt-seo-utils — no duplication needed
})
</script>
```

`nuxt-seo-utils` automatically sets:
- `og:title` from page title
- `og:description` from page description
- Fixes broken `og:image` URLs to absolute URLs

### Target Keyword Mapping by Page

| Page | FR-CA keywords | EN-CA keywords |
|---|---|---|
| Home | école de kitesurf québec, kite québec, cours de kite | kitesurfing school quebec, kite lessons quebec city |
| School | cours kitesurf débutant québec, apprendre le kite | kite lessons beginner quebec, learn kitesurfing |
| Trips | voyage kitesurf, trip kite destination | kite trip, kitesurfing travel destination |
| Team | instructeurs kitesurf certifiés | certified kite instructors |
| Contact | contacter école kite québec | contact kite school quebec |

These keywords should be naturally woven into page titles, meta descriptions, headings (`<h1>`, `<h2>`), and body text in the translation files.

---

## 8. Structured Data / JSON-LD

The global `SportsActivityLocation` schema is set in `nuxt.config.ts` (see step 5).

Additionally, use the `useSchemaOrg()` composable on specific pages for page-specific schemas:

- **School page**: Add `Course` schema (kite lessons with price range, description)
- **Trips page**: Add `TouristTrip` or `Event` schema for trip offerings
- **Contact page**: Reinforce `LocalBusiness` with opening hours, contact info
- **Home page**: Add `WebSite` with `SearchAction` if applicable

Example for the School page:
```vue
<script setup>
useSchemaOrg([
  defineCourse({
    name: 'Cours de kitesurf débutant',
    description: 'Apprenez le kitesurf avec nos instructeurs certifiés à Québec.',
    provider: { '@id': '#identity' },
  }),
])
</script>
```

---

## 9. Sitemap & robots.txt (Automatic)

Both are handled by `@nuxtjs/seo` with **zero additional config**:

### Sitemap

Auto-generates:
```
/sitemap_index.xml
/fr-CA-sitemap.xml
/en-CA-sitemap.xml
```

Each entry includes `<xhtml:link rel="alternate" hreflang="...">` cross-references between the FR and EN versions. Submit `https://yourdomain.com/sitemap_index.xml` to Google Search Console.

### robots.txt

Auto-generated at `/robots.txt`:
- References the sitemap URL
- Auto-disables indexing in dev/staging environments (prevents duplicate content)
- Pages marked `disallow` are excluded from the sitemap automatically

---

## 10. Shared Components

### `AppHeader.vue`

Responsive navigation bar:
- **Mobile**: Hamburger menu icon → slides open / toggles a dropdown with all nav links
- **Desktop**: Horizontal nav bar with links
- Contains: nav links (Home, Team, Services, Contact) + `LanguageSwitcher` + `BookNowButton`
- Uses `<NuxtLink>` with `localePath()` for i18n-aware routing:

```vue
<NuxtLink :to="localePath('/')">{{ $t('nav.home') }}</NuxtLink>
<NuxtLink :to="localePath('/team')">{{ $t('nav.team') }}</NuxtLink>
<NuxtLink :to="localePath('/services')">{{ $t('nav.services') }}</NuxtLink>
<NuxtLink :to="localePath('/contact')">{{ $t('nav.contact') }}</NuxtLink>
```

### `AppFooter.vue`

- Business info (address, phone, email)
- Navigation links
- Copyright: `© 2026 Kite Aventure`
- Semantic `<footer>` element

### `LanguageSwitcher.vue`

```vue
<script setup>
const { locale, locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const otherLocale = computed(() =>
  locales.value.find(l => l.code !== locale.value)
)
</script>

<template>
  <NuxtLink
    :to="switchLocalePath(otherLocale.code)"
    class="..."
  >
    {{ otherLocale.name }}
  </NuxtLink>
</template>
```

### `BookNowButton.vue`

Styled `<a>` tag — placeholder for Gorendezvous booking platform:

```vue
<template>
  <a
    href="#"
    target="_blank"
    rel="noopener"
    class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition"
  >
    {{ $t('bookNow') }}
  </a>
</template>
```

> Replace `href="#"` with the real Gorendezvous URL when ready.

### `ContactForm.vue`

Netlify Forms-compatible contact form (see step 14 for details).

---

## 11. Pages

All pages use:
- **Semantic HTML**: `<h1>`, `<h2>`, `<section>`, `<article>`, `<nav>` — for accessibility and SEO
- **Single `<h1>` per page** — critical for SEO
- **All text via `$t()` keys** — fully bilingual
- **`<NuxtImg>`** for all images — responsive optimization via `@nuxt/image`

### Home (`app/pages/index.vue`)

- Hero section with `<h1>` tagline, background image, CTA `BookNowButton`
- Brief intro / about section
- Highlights / features section (why choose Kite Aventure)
- Call-to-action section

### The Team (`app/pages/team.vue`)

- `<h1>` page title
- Team member cards: placeholder photo (using `<NuxtImg>`), name, role, short bio
- Grid layout, responsive (1 col mobile, 2-3 cols desktop)

### Services Landing (`app/pages/services/index.vue`)

- `<h1>` page title
- Overview text
- Two cards/sections linking to School and Trips subpages
- Uses `<NuxtLink :to="localePath('/services/school')">` etc.

### School (`app/pages/services/school.vue`)

- `<h1>` with keyword-rich title
- Lesson details: levels (beginner, intermediate, advanced), what's included
- Pricing placeholder section
- CTA `BookNowButton`

### Trips (`app/pages/services/trips.vue`)

- `<h1>` with keyword-rich title
- Trip destination details (placeholder content)
- What's included, trip format
- CTA `BookNowButton`

### Contact (`app/pages/contact.vue`)

- `<h1>` page title
- Embeds `<ContactForm />` component
- Business contact info: address, phone, email
- Map placeholder (can embed Google Maps iframe later)

---

## 12. Translation Files (i18n)

### `i18n/locales/fr-CA.json`

```json
{
  "nav": {
    "home": "Accueil",
    "team": "L'équipe",
    "services": "Services",
    "school": "École",
    "trips": "Voyages",
    "contact": "Contact"
  },
  "bookNow": "Réserver maintenant",
  "home": {
    "seo": {
      "title": "École de kitesurf à Québec | Kite Aventure",
      "description": "Kite Aventure est votre école de kitesurf à Québec. Cours pour débutants et avancés, voyages kite vers les meilleures destinations. Réservez maintenant!"
    },
    "hero": "Découvrez le kitesurf à Québec",
    "intro": "Kite Aventure est une école de kitesurf et agence de voyages kite basée à Québec...",
    "highlights": { ... }
  },
  "team": {
    "seo": {
      "title": "Notre équipe d'instructeurs certifiés | Kite Aventure",
      "description": "Rencontrez nos instructeurs de kitesurf certifiés à Québec. Une équipe passionnée..."
    },
    "title": "Notre équipe",
    ...
  },
  "services": {
    "seo": {
      "title": "Services de kitesurf — École et voyages | Kite Aventure",
      "description": "Découvrez nos cours de kitesurf à Québec et nos voyages kite vers les meilleures destinations..."
    },
    "title": "Nos services",
    ...
  },
  "school": {
    "seo": {
      "title": "Cours de kitesurf à Québec — Débutant à avancé | Kite Aventure",
      "description": "Apprenez le kitesurf avec nos cours adaptés à tous les niveaux à Québec. Instructeurs certifiés, équipement fourni..."
    },
    "title": "École de kitesurf",
    ...
  },
  "trips": {
    "seo": {
      "title": "Voyages kitesurf — Destinations de rêve | Kite Aventure",
      "description": "Partez en voyage kitesurf avec Kite Aventure. Destinations soleil, tout inclus, encadrement professionnel..."
    },
    "title": "Voyages kitesurf",
    ...
  },
  "contact": {
    "seo": {
      "title": "Contactez-nous | Kite Aventure — École de kitesurf Québec",
      "description": "Contactez Kite Aventure pour vos cours de kitesurf ou voyages kite. Québec, QC..."
    },
    "title": "Nous contacter",
    "form": {
      "name": "Nom complet",
      "email": "Courriel",
      "phone": "Téléphone",
      "message": "Message",
      "submit": "Envoyer",
      "success": "Merci! Votre message a été envoyé avec succès.",
      "error": "Une erreur est survenue. Veuillez réessayer."
    }
  },
  "footer": {
    "copyright": "© 2026 Kite Aventure. Tous droits réservés."
  }
}
```

### `i18n/locales/en-CA.json`

Same structure, English values:

```json
{
  "nav": {
    "home": "Home",
    "team": "The Team",
    "services": "Services",
    "school": "School",
    "trips": "Trips",
    "contact": "Contact"
  },
  "bookNow": "Book Now",
  "home": {
    "seo": {
      "title": "Kitesurfing School in Quebec City | Kite Aventure",
      "description": "Kite Aventure is your kitesurfing school in Quebec City. Lessons for beginners and advanced riders, kite trips to top destinations. Book now!"
    },
    "hero": "Discover Kitesurfing in Quebec City",
    ...
  },
  ...
  "footer": {
    "copyright": "© 2026 Kite Aventure. All rights reserved."
  }
}
```

---

## 13. Images & Fonts (Core Web Vitals)

### `@nuxt/image`

- Use `<NuxtImg>` for all images (replaces `<img>`)
- Set `sizes` attribute for responsive images
- `loading="lazy"` by default; use `loading="eager"` for hero/above-fold images
- Auto-converts to WebP/AVIF for smaller file sizes
- Critical for **LCP** (Largest Contentful Paint)

### `@nuxt/fonts`

- Zero-config: just declare `font-family` in Tailwind config or CSS
- Automatically optimizes font loading
- Generates fallback fonts with matching metrics via Fontaine + Capsize
- Prevents **CLS** (Cumulative Layout Shift) from font swapping
- Caches fonts at build time

---

## 14. Netlify Forms Setup

Two parts are needed for Netlify to detect forms in a JavaScript-rendered static site:

### Part A: Hidden HTML form for Netlify detection

Create `public/__forms.html`:

```html
<!DOCTYPE html>
<html>
  <head><title>Forms</title></head>
  <body>
    <!-- Netlify build bot detects this form -->
    <form name="contact" netlify netlify-honeypot="bot-field" hidden>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="tel" name="phone" />
      <textarea name="message"></textarea>
    </form>
  </body>
</html>
```

### Part B: Vue ContactForm component

`app/components/ContactForm.vue`:

```vue
<script setup>
const { t } = useI18n()
const formStatus = ref('')

const handleSubmit = async (event) => {
  try {
    const formData = new FormData(event.target)
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
    formStatus.value = 'success'
    event.target.reset()
  } catch (error) {
    formStatus.value = 'error'
  }
}
</script>

<template>
  <form
    name="contact"
    method="POST"
    data-netlify="true"
    netlify-honeypot="bot-field"
    @submit.prevent="handleSubmit"
  >
    <input type="hidden" name="form-name" value="contact" />
    <input type="hidden" name="bot-field" />

    <label>{{ t('contact.form.name') }}</label>
    <input type="text" name="name" required />

    <label>{{ t('contact.form.email') }}</label>
    <input type="email" name="email" required />

    <label>{{ t('contact.form.phone') }}</label>
    <input type="tel" name="phone" />

    <label>{{ t('contact.form.message') }}</label>
    <textarea name="message" required></textarea>

    <button type="submit">{{ t('contact.form.submit') }}</button>

    <p v-if="formStatus === 'success'">{{ t('contact.form.success') }}</p>
    <p v-if="formStatus === 'error'">{{ t('contact.form.error') }}</p>
  </form>
</template>
```

---

## 15. netlify.toml

```toml
[build]
  command = "pnpm run generate"
  publish = ".output/public"

[build.environment]
  NODE_VERSION = "20"

# Security headers (minor SEO signal + good practice)
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

# SPA fallback for any client-side routes not pre-rendered
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 16. Package.json Scripts

These are auto-generated by `nuxi init`, but verify they exist:

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  }
}
```

---

## 17. Development Workflow

| Action | Command | Description |
|---|---|---|
| Start dev server | `pnpm dev` | Local dev with HMR at `http://localhost:3000` |
| Generate static site | `pnpm generate` | Pre-render all routes to `.output/public/` |
| Preview generated site | `pnpm preview` | Serve the static build locally for testing |
| Build (SSR mode) | `pnpm build` | SSR build — not typically used for static deployment |

---

## 18. Deploy to Netlify

### Option A: Git-based continuous deployment (recommended)

1. Push the repo to **GitHub** (or GitLab/Bitbucket)
2. In Netlify dashboard: **New site → Import from Git**
3. Set **Build command**: `pnpm run generate`
4. Set **Publish directory**: `.output/public`
5. Netlify auto-deploys on every push to the main branch

### Option B: Manual CLI deployment

```bash
pnpm generate
npx netlify-cli deploy --prod --dir=.output/public
```

---

## 19. Post-Deploy SEO Checklist

- [ ] Submit `https://yourdomain.com/sitemap_index.xml` to **Google Search Console**
- [ ] Verify `robots.txt` at `https://yourdomain.com/robots.txt`
- [ ] Test structured data with **Google Rich Results Test** (https://search.google.com/test/rich-results)
- [ ] Test OG tags with **Facebook Sharing Debugger** (https://developers.facebook.com/tools/debug/)
- [ ] Test with **Twitter Card Validator** (https://cards-dev.twitter.com/validator)
- [ ] Run **Google Lighthouse** audit — target 90+ on Performance, Accessibility, SEO, Best Practices
- [ ] Register/update **Google Business Profile** (links back to site — huge for local SEO in Quebec)
- [ ] Set up **Bing Webmaster Tools** and submit sitemap there too

---

## 20. Verification

- [ ] `pnpm dev` → visit all pages in both languages
- [ ] Toggle language switcher — verify URL changes (`/` ↔ `/en/`) and all text updates
- [ ] Resize browser / use mobile DevTools — verify responsive header (hamburger menu)
- [ ] Inspect `<head>` in DevTools — confirm `hreflang`, `canonical`, `og:locale` tags
- [ ] View page source — confirm pre-rendered HTML with SEO tags
- [ ] `pnpm generate` → verify all routes are pre-rendered in `.output/public/`
- [ ] Deploy to Netlify → submit the contact form → verify submission in Netlify → Forms dashboard
- [ ] Check BookNow button renders on all pages and opens in new tab
- [ ] Run Lighthouse on deployed site — all scores 90+
- [ ] Validate sitemap XML and JSON-LD structured data with Google's tools

---

## 21. Key Decisions Summary

| Decision | Choice | Reason |
|---|---|---|
| Framework | **Nuxt 4** | Latest, `app/` srcDir convention |
| Package manager | **pnpm** | Fast, disk-efficient |
| Default locale | **French (fr-CA)** | Quebec-based business |
| i18n strategy | **`prefix_except_default`** | Clean French URLs (`/`), explicit English (`/en/`) |
| SEO module | **`@nuxtjs/seo`** | Single install → sitemap, robots, schema.org, OG images, canonicals, link checker |
| Structured data | **`SportsActivityLocation`** | Most specific schema type for a kite school |
| Image optimization | **`@nuxt/image`** | Core Web Vitals (LCP) |
| Font optimization | **`@nuxt/fonts`** | Core Web Vitals (CLS) |
| Contact form | **Netlify Forms** | Native integration, no backend needed |
| Booking | **Gorendezvous placeholder** | `<a>` button only, connect later |
| Deployment | **Netlify** | Static hosting with form handling, CDN, auto-deploy |

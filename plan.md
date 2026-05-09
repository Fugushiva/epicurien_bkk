# Épicurien French Bakery — Plan d'Exécution Complet

**Projet:** Site vitrine premium (awwwards-tier) · **Status:** Design finalisé, prêt Phase 0
**Stack:** Next.js 16 + React 19 + TypeScript 5 + Tailwind CSS v4 + next-intl 3
**Durée estimée:** ~9 jours solo

---

## 1. Vue d'ensemble

### Objectifs
- Site vitrine premium **trilingue EN + FR + TH** pour Épicurien French Bakery (Bangkok)
- Storytelling cinématique + éditorial luxe inspiré Kinfolk / Le Figaro Madame
- Conversion: réserver visite, partager sur réseaux, presse/SEO local
- Scope: 4 pages principales + SEO complet + animations adaptatives cross-device

### Scope & Anti-Scope
✅ **Inclus V1:**
- Homepage cinématique (8 sections)
- Pages: `/menu`, `/visit`, `/press` (vraie page presse + kit média téléchargeable)
- i18n complet 3 langues
- SEO + Schema.org JSON-LD complet
- Animations scroll (Lenis + GSAP + Framer Motion) avec fallbacks `prefers-reduced-motion`
- Loading curtain + easter egg
- Dark mode support (bonus)

❌ **Hors scope:**
- E-commerce / panier / paiement
- Blog / news
- Commandes en ligne
- Chat / support client
- Newsletter (presse seulement)

---

## 2. Design System Finalisé

### Palette couleur
| Rôle | Valeur | Usage |
|------|--------|-------|
| **Primary (Ink)** | `#1C1917` (stone-900) | Text body, backgrounds, nav |
| **Secondary** | `#44403C` (stone-700) | Muted text, borders, hover |
| **CTA / Or** | `#CA8A04` (yellow-600) | Buttons, highlights, marquee |
| **Background** | `#FAFAF9` (stone-50) | Page bg, cards, sections |
| **Butter (accent)** | `#FEF3C7` (amber-100) | Food photography, callouts |
| **Caramel (crust)** | `#92400E` (amber-700) | Accent macro photography |
| **Text** | `#0C0A09` (stone-950) | Headlines, emphasis |

**Ratio:** 60% cream (background) · 25% ink (text) · 10% gold (CTA) · 5% terracotta (food)

### Typography

| Layer | Font | Weight | Usage | Clamp |
|-------|------|--------|-------|-------|
| **Display 1** | Fraunces 144 | 400/600 | Hero h1, XXL titles | `clamp(4rem, 10vw, 12rem)` |
| **Display 2** | Playfair Display | 400/700 | Section h2, pull quotes | `clamp(2.5rem, 8vw, 4rem)` |
| **Heading** | Playfair Display | 600 | h3, card titles | `clamp(1.5rem, 5vw, 2.5rem)` |
| **Body** | Inter | 400/500 | Paragraphes, nav | `clamp(1rem, 2vw, 1.125rem)` |
| **Caption** | JetBrains Mono | 400 | Métadonnées, crédits | `clamp(0.875rem, 1.5vw, 1rem)` |
| **TH support** | IBM Plex Sans Thai | 400 | Thai text (same scale) | Same clamp |

**Fallbacks:** Serif Georgia (Fraunces), Serif Bookman (Playfair), Sans-serif system (Inter), Sans-serif Thai default (Plex)

### Animations & Éffets

**Stack adaptative:**
- **Desktop** (pointer-fine + no reduced-motion): Lenis smooth scroll + GSAP ScrollTrigger parallax + Framer Motion reveal + SplitText word animations
- **Tablet/Mobile** (any pointer): Lenis optional, GSAP ScrollTrigger avec offsets simplifiés, Framer Motion réduit (1-2 effects/viewport)
- **Reduced motion**: Lenis OFF, GSAP instant, Framer instant, animations = opacity/color only, no motion

**Easing:** ease-out entrance, ease-in exit, duration 400-600ms, cubic-bezier curves

**Per-viewport max:** 1-2 animations simultanées, never >300ms + 400ms total

### Architecture Composants

**Core Layout:**
1. Navbar (Mini Navbar floating pill + Lenis scroll hide)
2. LangSwitcher (dropdown trilingue sticky top-right)
3. Footer (Footer4Col contact + social + wordmark XXL outline)

**Homepage sections (8):**
1. **Hero cinematic** — Image full-bleed croissant + Display 1 title + subtitle + scroll indicator (chevron animate)
2. **Award band** — Marquee scroll-velocity "★ Best Croissant Île-de-France 2021 ★" (greyscale logo)
3. **Story Chapitre 1: Le Chef** — Portrait Enzo + TextRevealByWord biography + quote
4. **Pull Quote** — Enzo citation word-by-word reveal, lien `/visit`
5. **Story Chapitre 2: La Geste** — Macro photography feuilletage + vanille Madagascar + storytelling
6. **Croissant Bar** — 6 produits grille (ProductCard hover zoom) + lien `/menu`
7. **Press Band** — Logos Le Parisien, The Thaiger, Koktail, Corner.inc (greyscale→color hover)
8. **Visit Teaser** — Image intérieur comptoir + adresse texte + CTA "Find us" → `/visit`
9. **Footer** — Wordmark XXL outline, contact (tel/email/map), social links

---

## 3. Pages

### `/` (Homepage)
- 8 sections + footer
- Animated hero, text reveals, scroll parallax
- SSG (revalidate 1h pour updates menu si syncé)
- Open Graph: hero image, "Award-winning bakery Bangkok"

### `/menu`
- Grille 2-3 colonnes (responsive 1 mobile) produits avec prix THB
- ProductCard: image, nom, prix, category badge (croissant/viennoiserie/bread), hover zoom
- Filtered view (optional): category tabs ou sidebar left
- SSR ou ISR si menu sync via API/CMS
- Link: tous produits → `/` section croissant bar

### `/visit`
- **En-haut:** Hero image comptoir Épicurien
- **Section 1:** "Find us" — Adresse texte + embedded Google Maps
- **Section 2:** "Hours & Contact" — Tableau horaires (Open 8–18/21) + tel + email + parking info
- **Section 3:** "Why visit" — 3 USPs visuelles (ambiance, qualité, localisation)
- **Section 4:** "Press & Awards" — Ribbon/card pour chaque article (The Thaiger, Koktail, Le Parisien)
- SSG
- Schema: LocalBusiness + openingHoursSpecification

### `/press`
- **Vrai page presse** — Pas juste une section hero
- Section 1: "Media Kit" — Télécharge PDF/ZIP (logo, photos, bio chef, fact sheet)
- Section 2: "Mentions presse" — Timeline ou grille articles presse (date, publication, langue, lien, excerpt)
  - Le Parisien (FR, 2021)
  - Koktail (EN, 2021)
  - The Thaiger (EN, 2025)
  - Corner.inc (EN, 2026)
  - Plus: mentions japonaises locales (dates, visuels)
- Section 3: "Contact presse" — Formulaire simple (nom, email, demande, tel) → email backend
- Section 4: "Awards & Distinctions" — Card large "Best Croissant Île-de-France 2021"
- SSG
- Open Graph: "Media Kit + Press Room"

---

## 4. i18n & Localisation

### Setup next-intl 3
- **Locales:** `en`, `fr`, `th`
- **Default:** `en` (URL: `/en`, `/`, ou `/en/...`)
- **Structure:** `/app/[locale]/` pour toutes les routes
- **Fallback:** EN si TH non disponible

### Traductions
**Phase 4 focus:**
- JSON files: `messages/en.json`, `messages/fr.json`, `messages/th.json`
- Namespaces: `navigation`, `hero`, `menu`, `visit`, `press`, `footer`, `common`
- Traduire: headings, descriptions, CTA, contact, social labels
- **TH:** Valider par native speaker après EN+FR

### SEO i18n
- Hreflang tags: `<link rel="alternate" hreflang="en" href="...">` per page
- Canonical: `<link rel="canonical" href="...">` (absolute)
- og:locale + og:locale:alternate meta tags
- robots.txt: pas de `Disallow` pour locales secondaires

---

## 5. SEO & Schema.org

### Technique
- **Sitemap:** `/sitemap.xml` auto (Next.js) avec all locales
- **Robots.txt:** All crawlers allowed, `/admin` disallowed
- **Hreflang:** Per-page locale alternates
- **Canonical:** Absolute URL, default to EN if no locale fallback
- **OG Cards:** og:title, og:description, og:image (1200x630), og:url per page/locale
- **Twitter Cards:** twitter:card (summary_large_image), twitter:image
- **Favicon:** SVG logo
- **PWA:** manifest.json (name, icons, start_url=/en, theme_color=#1C1917, display=standalone)

### Core Web Vitals Target
- **LCP:** <1.8s (image optimization + Lenis preload)
- **FID/INP:** <0.1s (debounce scroll, optimize JS)
- **CLS:** <0.05 (size images, fonts loaded early)
- **Lighthouse 95+** (all metrics)

### Schema.org JSON-LD

**1. Organization (homepage):**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Épicurien French Bakery",
  "url": "https://epicurien.bkk",
  "logo": "https://epicurien.bkk/logo.svg",
  "foundingDate": "[YYYY]",
  "founder": {
    "@type": "Person",
    "name": "Enzo Le Bohec",
    "image": "https://epicurien.bkk/enzo.jpg",
    "award": "Best Croissant Île-de-France 2021"
  }
}
```

**2. LocalBusiness (all pages):**
```json
{
  "@type": "LocalBusiness",
  "name": "Épicurien French Bakery",
  "telephone": "+66 80 791 2902",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "W District, Sukhumvit 71 Rd",
    "addressLocality": "Phra Khanong",
    "addressRegion": "Watthana",
    "postalCode": "10110",
    "addressCountry": "TH"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[TBD]",
    "longitude": "[TBD]"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "08:00",
    "closes": "18:00" // or 21:00 — confirm
  }
}
```

**3. Menu + MenuItem (per product on /menu):**
```json
{
  "@type": "Menu",
  "name": "Épicurien Menu",
  "hasMenuSection": [
    {
      "@type": "MenuSection",
      "name": "Croissants",
      "hasMenuItem": [
        {
          "@type": "MenuItem",
          "name": "Croissant Nature",
          "description": "...",
          "offers": {
            "@type": "Offer",
            "priceCurrency": "THB",
            "price": "95"
          }
        }
      ]
    }
  ]
}
```

### Keywords

**EN (Primary):**
- "best croissant Bangkok"
- "French bakery Bangkok"
- "award winning croissant Bangkok"
- "Phra Khanong bakery"
- "Epicurien bakery Bangkok"
- "Enzo Le Bohec Bangkok"

**FR (Secondary):**
- "boulangerie française Bangkok"
- "croissant Bangkok"
- "boulangerie française Thaïlande"
- "meilleur croissant Bangkok"

**TH (Tertiary — to validate):**
- ครัวซองต์ที่ดีที่สุด กรุงเทพ
- ขนมปังฝรั่งเศส กรุงเทพ
- บูบูติกเบเกอรี่ ฟระขนอง
- Enzo Le Bohec กรุงเทพ

### Local SEO
- **Google Business Profile:** Complete (hours, photos, posts, updates)
- **NAP Consistency:** All listings (Google, Wongnai, TripAdvisor, Grab) same format
- **Local directories:** Thai: Wongnai, Pantip, Thai Food Blog; Regional: The Thaiger, Coconuts BKK, BK Mag, Corner.inc, Time Out; International: TripAdvisor, Yelp
- **Backlinks:** Outreach Thai food journalists, expat bloggers, press mentions
- **Local reviews:** Encourage Google + Wongnai reviews (quality > quantity)

---

## 6. Stack & Dépendances

### Production

```json
{
  "next": "^16.0.0",
  "react": "^19.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^4.0.0",
  "next-intl": "^3.0.0",
  
  "gsap": "^3.12.0",
  "framer-motion": "^11.0.0",
  "lenis": "^1.1.0",
  "sonner": "^1.4.0",
  
  "lucide-react": "^0.294.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.3.0",
  "zod": "^3.22.0"
}
```

### Dev Dependencies

```json
{
  "typescript": "^5.0.0",
  "@types/node": "^20.0.0",
  "@types/react": "^18.0.0",
  "tailwindcss": "^4.0.0",
  "postcss": "^8.4.0",
  "autoprefixer": "^10.4.0",
  "eslint": "^8.0.0",
  "prettier": "^3.0.0",
  "@typescript-eslint/eslint-plugin": "^7.0.0"
}
```

### Installation Instructions
- `npm install` (all deps already listed in package.json)
- `npm install -g shadcn-cli` (optional, for future component scaffolding)

### Fonts
**Google Fonts + local fallback:**
- Fraunces 144 (variable, 400–700) — download OTF, host locally via `public/fonts/`
- Playfair Display (variable, 400–700)
- Inter (standard, 400–600)
- IBM Plex Sans Thai (400–600 for TH)
- JetBrains Mono (400)

`next.config.ts`: font optimization, preload critical fonts

---

## 7. Architecture & Conventions

### File Structure

```
epicurien/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx            # Root layout (Navbar, lang provider)
│   │   ├── page.tsx              # Homepage
│   │   ├── menu/
│   │   │   └── page.tsx
│   │   ├── visit/
│   │   │   └── page.tsx
│   │   ├── press/
│   │   │   └── page.tsx
│   │   └── sitemap.ts            # Dynamic sitemap
│   ├── robots.ts                 # robots.txt
│   └── api/
│       └── press/
│           └── contact/
│               └── route.ts      # POST press inquiry form
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── LangSwitcher.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── AwardBand.tsx
│   │   ├── StoryChef.tsx
│   │   ├── PullQuote.tsx
│   │   ├── StoryGeste.tsx
│   │   ├── CroissantBar.tsx
│   │   ├── PressBand.tsx
│   │   └── VisitTeaser.tsx
│   ├── ui/
│   │   ├── ProductCard.tsx
│   │   ├── SocialProof.tsx
│   │   ├── Marquee.tsx
│   │   ├── TextReveal.tsx
│   │   └── LoadingCurtain.tsx
│   └── common/
│       └── SEO.tsx
├── hooks/
│   ├── useWindowSize.ts
│   ├── useScrollTrigger.ts
│   └── usePreferReducedMotion.ts
├── lib/
│   ├── cn.ts                    # clsx + tailwind-merge
│   ├── constants.ts
│   └── api.ts                   # API helpers
├── messages/
│   ├── en.json
│   ├── fr.json
│   └── th.json
├── public/
│   ├── fonts/
│   ├── images/
│   ├── logo.svg
│   ├── favicon.svg
│   └── manifest.json
├── styles/
│   └── globals.css             # Tailwind directives + CSS vars
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── prettier.config.mjs
├── eslint.config.mjs
├── plan.md                     # This file
├── AGENTS.md                   # Project instructions
└── CONTENT.md                  # Content data
```

### Conventions

**Components:**
- Functional React with hooks only (no class components)
- Props interface `interface ComponentProps { ... }`
- Export `export const Component = ({ ... }: ComponentProps) => { ... }`
- Use `forwardRef` for interactive (DOM access needed)
- Lazy load heavy animations: `React.lazy` + Suspense

**Styling:**
- Tailwind utilities first, CSS vars for theme colors
- Define color tokens in `globals.css` or Tailwind config:
  ```css
  --color-primary: #1C1917;
  --color-cta: #CA8A04;
  ```
- Component-scoped styles: BEM-like class naming (`--hero-title`, `--section-spacing`)
- Never use inline styles except for dynamic values

**Animations:**
- GSAP for scroll-triggered (ScrollTrigger plugin)
- Framer Motion for entrance/exit (useInView, AnimatePresence)
- CSS transitions for hover/focus (max 300ms)
- Always test with `prefers-reduced-motion: reduce`

**Type Safety:**
- Strict TypeScript (`strict: true` in tsconfig)
- Export types, interfaces from components
- No `any` type
- Use discriminated unions for complex props

**SEO:**
- Generate `metadata` export in every page.tsx
- Use `next/head` for client-side Meta tags (Open Graph if dynamic)
- Structure data with `schema-org` JSON-LD in components

**i18n:**
- `const t = useTranslations('namespace')` in components
- Keys snake_case: `t('section_hero.title')`
- Locale from `useLocale()`
- Links: `<Link href={`/${locale}/menu`}>`

**API Routes:**
- POST `/api/press/contact` → email backend
- Request validation with Zod schema
- Error handling: 400/422 for validation, 500 for server, 200 for success
- CORS headers if needed

---

## 8. Plan d'Exécution (9 phases)

### **Phase 0: Setup** (0.5 day) ✅ **À démarrer immédiatement**

**Tasks:**
- [ ] Register project with token-savior (`set_project_root`)
- [ ] Initialize shadcn/ui: `npx shadcn-ui@latest init --defaults`
- [ ] Download & host fonts locally (Fraunces, Playfair, Inter, Plex Thai, JetBrains Mono)
- [ ] Configure Tailwind v4 design tokens: colors, typography scales, spacing
- [ ] Setup next-intl 3: middleware, i18n config, message loaders
- [ ] Install deps: GSAP, Framer Motion, Lenis, Sonner, Lucide, Zod, clsx, tailwind-merge
- [ ] Configure ESLint + Prettier (strict TS)
- [ ] Create `/messages/en.json` skeleton (all namespaces)
- [ ] Test build: `npm run build` should succeed

**Deliverables:**
- shadcn initialized, fonts preloaded
- Design tokens applied (colors visible in Tailwind)
- i18n middleware working (locale switching)
- Clean build

---

### **Phase 1: Layout & Navigation** (1 day)

**Tasks:**
- [ ] Create root layout (`app/[locale]/layout.tsx`):
  - Lenis initialization (smooth scroll, device-adaptive)
  - Navbar placeholder
  - Footer placeholder
  - Lang switcher top-right (sticky, z-50)
  - Preload critical fonts
  - SEO wrapper
- [ ] Build Navbar (Mini Navbar floating pill):
  - Navbar: `top-4 left-4 right-4` floating border rounded-full backdrop-blur
  - Logo center + nav items (home, menu, visit, press)
  - Hide on scroll down, show on scroll up (Lenis + GSAP)
  - Mobile: hamburger menu (Radix Dialog or custom)
  - Active link indicator (yellow underline)
- [ ] Build Footer (Footer4Col):
  - Left: Logo XXL outline
  - Center: Contact (tel, email, address)
  - Right: Social links (Instagram, Facebook, Twitter)
  - Bottom: Copyright + legal links
  - Responsive collapse mobile
- [ ] Build LangSwitcher:
  - Dropdown (EN, FR, TH flags)
  - Persist locale selection to localStorage
  - Smooth locale transitions (fade or slide)
- [ ] Test Lenis scroll on desktop + tablet + mobile (no horizontal scroll)
- [ ] Responsive testing: 375px, 768px, 1024px, 1440px

**Deliverables:**
- Navbar + Footer + LangSwitcher functional
- Lenis smooth scroll working (desktop optimized, mobile simplified)
- Responsive at all breakpoints

---

### **Phase 2: Homepage — 8 Sections** (2.5 days)

**Sections (in order):**

1. **Hero Cinematic** (0.5 day):
   - Full-bleed hero image (croissant, 16:9 aspect)
   - Display 1 title "Épicurien French Bakery"
   - Subtitle "Award-winning Paris croissant. Now in Bangkok."
   - Scroll indicator (chevron animate down, text "Scroll to explore")
   - Overlay dark 60% for text readability
   - Parallax effect on image (desktop only, Lenis + GSAP ScrollTrigger)
   - SSG image optimization (next/image, AVIF + WebP)

2. **Award Band** (0.3 day):
   - Full-width marquee band (bg gold `#CA8A04`, text ink)
   - Marquee: "★ Best Croissant in Île-de-France 2021 ★" (repeating, infinite scroll)
   - Scroll-velocity effect: speed tied to page scroll (Lenis + GSAP)
   - No animation on `prefers-reduced-motion` (static text)

3. **Story Chapitre 1: Le Chef** (0.4 day):
   - Section bg cream
   - 2-col layout (mobile: 1-col): portrait left, text right
   - Portrait: Enzo headshot, circular or rounded frame
   - Text: h2 "The Chef" + biography paragraph
   - Text reveal animation: word-by-word fade-in on scroll (Framer Motion + useInView)
   - Quote inline: *"I won. It took courage..."*

4. **Pull Quote** (0.2 day):
   - Section bg stone (darker, #44403C)
   - Large blockquote, text center
   - Enzo citation: *"Je souhaite plus tard ouvrir une boulangerie en Thaïlande."*
   - Word-by-word reveal (SplitText desktop, instant mobile/reduced-motion)
   - CTA button "Visit Now" → `/visit`

5. **Story Chapitre 2: La Geste** (0.4 day):
   - Section bg cream
   - 2-col layout: text left, macro image right
   - Macro photography: croissant feuilletage, golden crust, vanille Madagascar pod
   - Text: h2 "The Craft" + paragraph on ingredients + technique
   - Blur reveal animation on scroll (Framer Motion, blur→clear)

6. **Croissant Bar** (0.3 day):
   - Section bg cream
   - h2 "Our Selection"
   - 3-col grid (2 mobile, 1 tablet): 6 ProductCard items
   - ProductCard: image, name, category badge (croissant/viennoiserie), hover zoom (scale 1.05)
   - Each card links to `/menu#product-id`
   - CTA at bottom "Full Menu" → `/menu`

7. **Press Band** (0.2 day):
   - Section bg stone
   - h2 "As Seen In"
   - Horizontal scroll (or 2-row flex) logos: Le Parisien, The Thaiger, Koktail, Corner.inc
   - Greyscale on default, color on hover (CSS filter)
   - Click → `/press`

8. **Visit Teaser** (0.3 day):
   - Section bg cream
   - Full-width hero image (interior, Unsplash placeholder)
   - Overlay with address + hours + CTA "Find Us" → `/visit`
   - Text animation: fade-in from bottom (Framer Motion)

9. **Footer** — See Phase 1 (already built)

**Deliverables:**
- Homepage fully functional, all 8 sections responsive
- Images optimized (next/image, lazy loading)
- Animations working (Lenis + GSAP + Framer), fallbacks for reduced-motion
- All sections have proper spacing, typography scales applied

---

### **Phase 3: Secondary Pages** (1.5 days)

#### `/menu` (0.5 day):
- [ ] Hero mini: h1 "Menu" + subtitle
- [ ] ProductCard grid (2 mobile, 3 tablet, 4 desktop)
- [ ] Populate 6+ products from CONTENT.md (Croissant Nature 95฿, Pain au Chocolat 110฿, etc.)
- [ ] Product filtering (optional): category tabs or sidebar
- [ ] Link each product → detail modal or expanded card (optional V1.1)
- [ ] Responsive testing

#### `/visit` (0.5 day):
- [ ] Hero: image + "Find Us" heading
- [ ] Section "Location": Google Maps embed (iframe), address text, BTS info
- [ ] Section "Hours & Contact": Table (Open 8–18/21), tel, email, parking note
- [ ] Section "Why Visit": 3 USPs (ambiance, quality, location) with icons/images
- [ ] Section "Press Mentions": Ribbon/card each article (The Thaiger, Koktail, Le Parisien)
- [ ] Responsive testing

#### `/press` (0.5 day):
- [ ] Hero: "Media Kit & Press Room"
- [ ] Section "Download Media Kit": Button (ZIP: logo SVG, photos, bio, fact sheet PDF)
- [ ] Section "Press Mentions": Timeline or grid articles (date, publication, lang, excerpt, link)
  - Le Parisien (FR, March 2021)
  - Koktail (EN, June 2021)
  - The Thaiger (EN, 2025)
  - Corner.inc (EN, 2026)
  - Add: Japanese local mentions (Ameblo, etc.)
- [ ] Section "Contact Presse": Form (name, email, inquiry type, message) → API endpoint
- [ ] Section "Awards": Large card "Best Croissant Île-de-France 2021" with visuals
- [ ] Responsive testing

**Deliverables:**
- All 3 pages functional, responsive, styled
- Google Maps embed (real coordinates TBD)
- Press form backend connected (POST `/api/press/contact`)

---

### **Phase 4: i18n Completion** (1 day)

**Tasks:**
- [ ] Complete `/messages/en.json` with all keys (navigation, all pages, footer)
- [ ] Translate to `/messages/fr.json` (native FR speaker or validation)
- [ ] Translate to `/messages/th.json` (native TH speaker, validate with Enzo or local)
- [ ] Update all components: use `useTranslations('namespace')`
- [ ] Test all locale switching at every page
- [ ] Verify hreflang tags on every page (3 per page: en, fr, th)
- [ ] Test canonical URLs (absolute, no trailing slash)
- [ ] Test Open Graph cards per locale (og:locale, og:url)

**Deliverables:**
- All content trilingue, locale switching working
- hreflang/canonical correct
- OG cards per locale

---

### **Phase 5: SEO & Schema.org** (0.5 day)

**Tasks:**
- [ ] Generate `/sitemap.xml` (all pages × 3 locales, lastmod, priority)
- [ ] Create `/robots.txt` (allow all, disallow none)
- [ ] Add Organization schema JSON-LD to layout (founder, logo, URL)
- [ ] Add LocalBusiness schema to all pages (address, tel, hours, geo)
- [ ] Add Menu + MenuItem schemas to `/menu` page
- [ ] Create `next.config.ts` redirects: old domains → new domain (if applicable)
- [ ] Test SEO with Lighthouse (target 90+ SEO score)
- [ ] Verify Core Web Vitals: LCP <1.8s, CLS <0.05
- [ ] Test with Google Rich Results tool (schema validation)

**Deliverables:**
- sitemap.xml + robots.txt deployed
- All schemas validated, no errors
- Lighthouse 90+ SEO, 95+ overall

---

### **Phase 6: Animations Polish** (1 day)

**Tasks:**
- [ ] **GSAP ScrollTrigger:** Parallax on hero image, section entrance animations
  - Hero image: translate-y -20px on scroll
  - Section headings: fade-in + slide-up on entrance (stagger)
  - Product cards: scale-in cascade on menu page
- [ ] **Framer Motion:** Text reveals (word-by-word), entrance/exit
  - Pull quote: Stagger word opacity on mount
  - Product cards: AnimatePresence with layout
  - Modal entrance (if added): scale + fade
- [ ] **SplitText desktop-only:** Split copy into words/chars (Lenis desktop only)
  - Fallback: instant reveal on mobile/tablet
- [ ] **Marquee animation:** Smooth infinite scroll, respond to scroll velocity
- [ ] **Lenis smooth scroll:**
  - Desktop: full smooth scroll enabled
  - Mobile/tablet: simplified (no parallax chaining)
  - `prefers-reduced-motion`: Lenis off, instant scroll
- [ ] **Hover effects:** CTA buttons, cards, nav items (scale 1.02 or color shift, max 150ms)
- [ ] **Curtain loading effect:** Custom CSS animation or Framer Motion curtain on page transitions
- [ ] **Easter egg:** Hidden interaction (e.g., triple-click logo → surprise animation or quote)
- [ ] Test all animations on:
  - Desktop (Chrome, Safari, Firefox)
  - Mobile Safari (iOS)
  - Android Chrome (entry-level device simulation)
  - With `prefers-reduced-motion: reduce` enabled

**Deliverables:**
- All animations smooth, 60 FPS on desktop
- Mobile animations simplified, no lag
- Reduced-motion fully respected

---

### **Phase 7: Accessibility & Performance** (0.5 day)

**A11y Checklist:**
- [ ] All images: meaningful `alt` text
- [ ] All form inputs (press contact form): `<label>` associated with `<input>`
- [ ] Color: not sole indicator (always pair color with text/icon)
- [ ] Focus states: visible outline on all interactive (buttons, links, inputs)
- [ ] Keyboard nav: Tab order logical, no keyboard traps
- [ ] ARIA labels: nav landmarks, `role="main"`, `aria-label` for icon buttons
- [ ] Heading hierarchy: h1 once, h2–h6 logical nesting
- [ ] `lang` attribute: `<html lang="en">` (dynamic per locale)
- [ ] Viewport meta: `<meta name="viewport" content="width=device-width, initial-scale=1">`

**Performance:**
- [ ] Image optimization: `next/image`, responsive sizes, AVIF + WebP
- [ ] Code splitting: Lazy load components (menu page ProductCard grids, modals)
- [ ] CSS: No unused Tailwind (purge enabled in config)
- [ ] JS bundle: Analyze with `next/bundle-analyzer`, target <200KB gzipped
- [ ] Fonts: Preload critical fonts (Fraunces, Inter), swap loading strategy
- [ ] API routes: Debounce scroll events, cache static responses
- [ ] Next.js config: `swcMinify: true`, `compress: true`, image optimization
- [ ] Deploy on Vercel: automatic optimization, edge caching

**Testing:**
- [ ] axe DevTools: Run accessibility audit (0 errors, <10 warnings)
- [ ] Lighthouse: Performance 95+, SEO 90+, A11y 95+
- [ ] Mobile-Friendly Test: All pages responsive
- [ ] WebPageTest: Document size <5MB, load time <3s (3G)

**Deliverables:**
- A11y fully compliant (WCAG 2.1 AA)
- Performance: Lighthouse 95+

---

### **Phase 8: QA & Cross-Device Testing** (0.5 day)

**Devices & Browsers:**
- Desktop: Chrome (latest), Safari (macOS), Firefox (latest)
- Mobile iOS: Safari on iPhone 12 (A14) + iPhone SE (budget), Instagram WebView
- Mobile Android: Chrome on Samsung Galaxy A12 (budget) + Pixel 6 (modern), Facebook WebView
- Tablet: iPad (last 2 gens), Android tablet (Samsung Tab A)

**Test Scenarios:**
1. **Homepage:** Scroll full page, animations trigger correctly, text readable
2. **Menu:** Grid responsive (1/2/3/4 cols), images load, hover zoom smooth
3. **Visit:** Google Maps embed loads, form inputs accessible, address legible
4. **Press:** Media kit downloads, articles render, form submits
5. **i18n:** Switch locales 5+ times, verify hreflang, text layout adjusts
6. **Animations:** Parallax smooth (desktop), text reveals work (mobile), reduced-motion respected
7. **Performance:** Dev Tools Lighthouse run, FCP <1.5s, LCP <1.8s
8. **A11y:** Tab navigation logical, focus visible, keyboard-only nav works

**Issues Tracking:**
- Note all bugs/layout shifts
- Priority: show-stoppers (broken links, form error) > visual polish
- Fix + re-test critical issues before Phase 9

**Deliverables:**
- QA pass: all major features working on all target devices
- Known issues documented (if any, low priority)
- Performance benchmarked

---

### **Phase 9: Soft Launch & Handoff** (included in Phase 8, 0.5 day)

**Final Tasks:**
- [ ] Verify production build: `npm run build` + `npm run start` locally
- [ ] Dry-run deployment to Vercel (staging environment)
- [ ] Set environment variables (if any: API keys, email backend)
- [ ] Configure Google Search Console, Google Business Profile
- [ ] Set up analytics (optional: Plausible, Vercel Analytics)
- [ ] Test production domain (HTTPS, redirects)
- [ ] Create `README.md` with setup instructions for future maintainers
- [ ] Document content update process (how to change menu, hours, etc.)
- [ ] Commit final code to main branch
- [ ] Deploy to production

**Deliverables:**
- Live site at production domain
- Analytics configured
- Maintenance docs prepared

---

## 9. Dépendances Bloquantes & Critiques

### Immédiat (blocking Phase 0+1):
- ✅ Stack installed (Next.js 16, React 19, Tailwind v4)
- ⏳ **Font files** (Fraunces, Playfair, Plex Thai) — download, host locally
- ⏳ **Hero image placeholder** (Unsplash croissant, 1920×1080, 500KB max)
- ⏳ **Logo** (SVG, horizontal + square versions)

### Phase 2 (Homepage images):
- ⏳ **Chef portrait** (Enzo headshot, 400×400, retouched)
- ⏳ **Macro photography** (croissant cross-section, feuilletage detail, 1200×800, premium quality)
- ⏳ **Interior image** (Épicurien comptoir, 1920×1080)
- ⏳ **Lifestyle photos** (pastries on plate, coffee + croissant, hand holding croissant)

### Phase 3–4 (Pages + i18n):
- ⏳ **Confirm horaires** (CONTENT.md says "8–18 OR 8–21" — ask Enzo which is correct)
- ⏳ **GPS coordinates** (W District Sukhumvit 71, Phra Khanong — for Google Maps embed, Schema geo)
- ⏳ **Translations TH** (native speaker validation, keywords optimized)
- ⏳ **Press kit files** (PDF bio, fact sheet, high-res photos ZIP)

### Phase 5+ (SEO + Production):
- ⏳ **Google Business Profile** (claim, update, sync NAP)
- ⏳ **Social media links** (Instagram, Facebook verified)
- ⏳ **Email backend** (press inquiry form → Enzo email or support@domain)
- ⏳ **Production domain** (DNS, SSL certificate)

### Optional (V1.1+):
- Product photos (all 6+ items)
- Video hero (croissant-making process, 15s, looped)
- Live menu sync (API integration with CMS or POS)
- Booking/reservation system

---

## 10. Décisions Verrouillées

✅ **Design:**
- Palette: Primary ink `#1C1917`, CTA gold `#CA8A04`, cream background
- Typography: Fraunces display, Playfair headings, Inter body
- Style: Editorial Luxe + Cinematic (no liquid glass SaaS)

✅ **Tech:**
- Stack: Next.js 16 + React 19 + TypeScript + Tailwind v4 + next-intl 3
- Animations: Lenis (adaptive) + GSAP ScrollTrigger + Framer Motion
- Hosting: Vercel (auto-deployment from git)

✅ **Content:**
- Pages: `/` (home) + `/menu` + `/visit` + `/press` (real page, not section)
- i18n: EN (default) + FR + TH
- Press: Real page with media kit download + article mentions + contact form

✅ **UX:**
- Easter egg: Yes (surprise animation/quote on hidden interaction)
- Loading curtain: Yes (smooth page transition animation)
- Mobile-first responsive design
- Dark mode support: Optional (V1.1 if time)

✅ **Animations:**
- Max 1–2 animations per viewport simultaneously
- Lenis enabled desktop only (pointer-fine), disabled on mobile/tablet
- Full fallback for `prefers-reduced-motion: reduce`

---

## 11. Post-Launch Roadmap (V1.1+)

- [ ] Dark mode theme
- [ ] Product detail pages (modal or dedicated page per pastry)
- [ ] Video hero (croissant-making)
- [ ] Live menu integration (API sync)
- [ ] Reservation system (OpenTable, Calendly)
- [ ] Blog / recipes (optional)
- [ ] Email newsletter (optional, if audience requests)
- [ ] Mobile app (PWA or native, future)

---

## 12. Notes de Projet

**Philosophie design:** Celebrate the craft. Enzo's story is the hero — every pastry is his signature. Typography should feel premium + artisanal, not corporate. Imagery should be macro, sensory, mouth-watering. Typography scales fluently so text reads beautifully on 320px to 2560px.

**Tone:** Premium, passionate, local-first (Bangkok audience), respectful of French heritage (Ferrandi, Île-de-France concours). Not trendy or playful — refined, focused, inspiring.

**Performance is UX:** Fast load times, smooth animations, responsive design. No "we're building it" excuses. Every page <3s load (3G), Lighthouse 95+.

**Accessibility is not optional:** Every interaction keyboard-accessible, color not sole indicator, alt text on every image. WCAG 2.1 AA minimum.

---

**Plan Date:** May 2026  
**Last Updated:** May 2026  
**Status:** Ready for Phase 0 (Setup) — All decisions locked, no more design changes

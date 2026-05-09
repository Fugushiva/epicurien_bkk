<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Épicurien French Bakery — Project Guide

**Project Type:** Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + next-intl 3 (trilingue EN/FR/TH)  
**Status:** Design finalized, Phase 0 (Setup) ready to start  
**Scope:** Premium bakery vitrine site (4 pages + SEO + animations)  
**Team:** Solo developer (Jerome)

## Quick Reference

### Design Tokens (CSS Variables & Tailwind)

```css
:root {
  /* Color Palette */
  --color-primary: #1C1917;      /* stone-900 — ink black */
  --color-secondary: #44403C;    /* stone-700 — muted text */
  --color-cta: #CA8A04;          /* yellow-600 — gold buttons */
  --color-bg: #FAFAF9;           /* stone-50 — cream background */
  --color-accent-butter: #FEF3C7; /* amber-100 — food accent */
  --color-accent-caramel: #92400E; /* amber-700 — crust accent */
  --color-text: #0C0A09;         /* stone-950 — text body */

  /* Typography */
  --font-display: 'Fraunces', serif; /* Display 1, variable weight */
  --font-heading: 'Playfair Display', serif; /* h2–h6 */
  --font-body: 'Inter', sans-serif; /* Body text, multilingue */
  --font-thai: 'IBM Plex Sans Thai', sans-serif; /* Thai text pairing */
  --font-mono: 'JetBrains Mono', monospace; /* Captions, metadata */

  /* Spacing */
  --spacing-unit: 1rem; /* Base 16px, scale with --spacing-factor */
  --spacing-factor: clamp(1, 2vw, 1.5); /* Fluid scaling */

  /* Animation */
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 400ms;
  --easing-in: cubic-bezier(0.42, 0, 1, 1); /* ease-in */
  --easing-out: cubic-bezier(0, 0, 0.58, 1); /* ease-out */
}
```

### Tailwind Configuration

**Key extensions in `tailwind.config.ts`:**

```typescript
export default {
  theme: {
    colors: {
      primary: '#1C1917',
      secondary: '#44403C',
      cta: '#CA8A04',
      bg: '#FAFAF9',
      'accent-butter': '#FEF3C7',
      'accent-caramel': '#92400E',
      text: '#0C0A09',
    },
    fontFamily: {
      display: ['var(--font-display)', 'serif'],
      heading: ['var(--font-heading)', 'serif'],
      body: ['var(--font-body)', 'sans-serif'],
      thai: ['var(--font-thai)', 'sans-serif'],
      mono: ['var(--font-mono)', 'monospace'],
    },
    fontSize: {
      'display-1': 'clamp(4rem, 10vw, 12rem)',
      'display-2': 'clamp(2.5rem, 8vw, 4rem)',
      'heading-1': 'clamp(1.5rem, 5vw, 2.5rem)',
      'heading-2': 'clamp(1.25rem, 4vw, 2rem)',
      'body': 'clamp(1rem, 2vw, 1.125rem)',
      'caption': 'clamp(0.875rem, 1.5vw, 1rem)',
    },
    extend: {
      animation: {
        'marquee': 'marquee 20s linear infinite',
        'text-reveal': 'text-reveal 0.5s ease-out forwards',
      },
    },
  },
};
```

### Stack & Dependencies

**Critical (must be installed before Phase 1):**
- `next@16` ✅ (already installed)
- `react@19` ✅ (already installed)
- `typescript@5` ✅ (already installed)
- `tailwindcss@4` ✅ (already installed)
- `next-intl@3` — Add during Phase 0
- `gsap@3.12` (GSAP + ScrollTrigger plugin) — Phase 0
- `framer-motion@11` (entrance/exit animations) — Phase 0
- `lenis@1.1` (smooth scroll library) — Phase 0
- `lucide-react@0.294` (SVG icons) — Phase 0
- `zod@3.22` (form validation) — Phase 0
- `clsx@2` + `tailwind-merge@2` (classname utilities) — Phase 0

**Dev Dependencies:**
- `eslint@8` with `@typescript-eslint/*`
- `prettier@3`
- `postcss@8` + `autoprefixer@10`

**Installation:**
```bash
npm install next-intl gsap framer-motion lenis lucide-react zod clsx tailwind-merge sonner
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

### Folder Structure (Key Files)

```
app/
  [locale]/
    layout.tsx           ← Root layout (Navbar, Footer, Lenis init, i18n)
    page.tsx             ← Homepage
    menu/page.tsx
    visit/page.tsx
    press/page.tsx
    sitemap.ts           ← Dynamic sitemap.xml
  robots.ts              ← robots.txt
  api/
    press/
      contact/route.ts   ← POST /api/press/contact (form handler)

components/
  layout/
    Navbar.tsx           ← Floating pill navbar
    Footer.tsx           ← 4-column footer
    LangSwitcher.tsx     ← Language switcher dropdown
  sections/
    Hero.tsx, AwardBand.tsx, StoryChef.tsx, PullQuote.tsx,
    StoryGeste.tsx, CroissantBar.tsx, PressBand.tsx, VisitTeaser.tsx
  ui/
    ProductCard.tsx, Marquee.tsx, TextReveal.tsx, LoadingCurtain.tsx

hooks/
  usePreferReducedMotion.ts  ← Must check before animating
  useScrollTrigger.ts
  useWindowSize.ts

lib/
  cn.ts                  ← clsx + tailwind-merge utility
  constants.ts
  api.ts

messages/
  en.json, fr.json, th.json  ← i18n translations

public/
  fonts/                 ← Fraunces, Playfair, Inter, Plex Thai (hosted locally)
  images/
  logo.svg, favicon.svg
  manifest.json
```

### i18n Setup (next-intl 3)

**Locale routing:**
- `/en/*` → English (explicit)
- `/fr/*` → French (explicit)
- `/th/*` → Thai (explicit)
- `/` → redirects to `/en`

**Message files structure:**

```json
// messages/en.json
{
  "navigation": {
    "home": "Home",
    "menu": "Menu",
    "visit": "Visit",
    "press": "Press"
  },
  "hero": {
    "title": "Épicurien French Bakery",
    "subtitle": "Award-winning Paris croissant. Now in Bangkok."
  },
  ...
}
```

**Usage in components:**
```tsx
import { useTranslations } from 'next-intl';

export const Hero = () => {
  const t = useTranslations('hero');
  return <h1>{t('title')}</h1>;
};
```

### Animation Stack (Conditional by Device)

**Desktop (pointer-fine, no prefers-reduced-motion):**
- Lenis smooth scroll: full parallax chain
- GSAP ScrollTrigger: parallax images, staggered reveals
- Framer Motion: entrance/exit, stagger children
- SplitText: word-by-word animations

**Mobile/Tablet (any pointer):**
- Lenis: simplified (no parallax stacking)
- GSAP: reduced complexity (fade-in only)
- Framer Motion: entrance/exit (no stagger)
- SplitText: disabled (use opacity reveal instead)

**prefers-reduced-motion: reduce (all devices):**
- Lenis: OFF (instant scroll)
- GSAP: OFF (instant entrance, no parallax)
- Framer Motion: OFF (instant animate, instant initial)
- All CSS transitions: max 100ms (very short)

**Implementation pattern:**
```tsx
const prefersReducedMotion = usePreferReducedMotion();
const isDesktop = useMediaQuery('(pointer:fine)');

const variants = {
  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.6 } },
};

return (
  <motion.section
    initial={prefersReducedMotion ? 'visible' : 'hidden'}
    whileInView="visible"
    variants={variants}
  >
    {children}
  </motion.section>
);
```

### SEO & Schema

**Critical for all pages:**
- `<meta name="viewport" content="width=device-width, initial-scale=1" />`
- `<link rel="canonical" href="https://epicurien.bkk/[locale]/[page]" />`
- `<meta property="og:url" content="https://epicurien.bkk/[locale]/[page]" />`
- `<meta property="og:locale" content="en_US" />` (per locale)
- Hreflang tags for all 3 locales

**Generate with exportMetadata():**
```tsx
// app/[locale]/page.tsx
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => ({
  title: 'Épicurien French Bakery | Award-winning Croissants in Bangkok',
  description: '...',
  openGraph: { ... },
  alternates: {
    canonical: 'https://epicurien.bkk/en',
    languages: { en: 'https://epicurien.bkk/en', fr: 'https://epicurien.bkk/fr', th: 'https://epicurien.bkk/th' },
  },
});
```

### Conventions

**TypeScript:**
- `strict: true` in `tsconfig.json`
- No `any` types
- Interfaces over types for React props

**Styling:**
- Tailwind utilities first, CSS vars for dynamic colors
- Component-scoped BEM classes: `--section-title`, `--product-card`
- No inline styles except computed values

**Components:**
- Functional React + hooks only
- Props interface exported: `interface HeroProps { ... }`
- Lazy load heavy animations: `React.lazy()` + `Suspense`

**Git Commits:**
- Format: `feat: add hero section`, `fix: lenis smooth scroll on mobile`, `refactor: extract ProductCard`
- Branch names: `feature/hero-section`, `fix/animation-lag`

### Critical Gotchas (Next.js 16)

1. **Images:** Always use `next/image` + `srcSet` for responsive loading
   ```tsx
   import Image from 'next/image';
   <Image src="/hero.jpg" alt="..." width={1920} height={1080} priority />
   ```

2. **API Routes:** Server functions (`'use server'`) recommended over `route.ts`
   ```tsx
   'use server';
   export async function submitPressForm(data: PressFormData) { ... }
   ```

3. **Fonts:** Preload critical fonts in root layout
   ```tsx
   <link rel="preload" href="/fonts/fraunces.woff2" as="font" type="font/woff2" />
   ```

4. **CSS-in-JS:** Tailwind only, avoid styled-components (conflicts with React 19 server components)

5. **Lenis Init:** Call in useEffect, cleanup on unmount
   ```tsx
   useEffect(() => {
     const lenis = new Lenis({ ... });
     const unsubscribe = lenis.on('scroll', rafCallback);
     return () => unsubscribe();
   }, []);
   ```

### Performance Targets

- **LCP (Largest Contentful Paint):** <1.8s (image optimization, preload critical fonts)
- **FID/INP (Interaction):** <0.1s (debounce scroll, optimize JS)
- **CLS (Layout Shift):** <0.05 (size images, use `aspect-ratio`)
- **Lighthouse:** Performance 95+, SEO 90+, A11y 95+
- **Core Web Vitals:** All green

### Deployment (Vercel)

```bash
# Staging preview
git push origin feature-branch

# Production (main branch)
git push origin main
```

- Auto-deploys on push
- Environment variables: Configure in Vercel dashboard (`.env.local` ignored)
- Analytics: Enable Vercel Analytics (free tier includes Core Web Vitals)
- Custom domain: DNS CNAME to `cname.vercel-dns.com`

### Blocking Dependencies (Before Phase 1)

- [ ] Font files downloaded (Fraunces, Playfair, Plex Thai) → `public/fonts/`
- [ ] Logo SVG (horizontal + square) → `public/logo.svg`
- [ ] Hero image placeholder (Unsplash croissant) → `public/images/hero.jpg`
- [ ] next-intl initialized + middleware configured
- [ ] GSAP + Framer Motion + Lenis installed + tested (scroll works)
- [ ] Tailwind tokens applied (colors visible, typography scales fluid)

---

**Last Updated:** May 2026  
**Next Steps:** Review `plan.md` for full execution roadmap. Start Phase 0 (Setup).

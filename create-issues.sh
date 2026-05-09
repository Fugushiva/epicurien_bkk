#!/bin/bash

# PHASE 0: SETUP
echo "Creating Phase 0 issues..."

gh issue create --title "[Phase 0-1] Install npm dependencies" \
  --body "
## Task Description
Install all npm dependencies needed for the project before Phase 1 starts.

## Dependencies to Install
Production:
- next-intl@3 — i18n routing and translations
- gsap@3.12 — GSAP ScrollTrigger for parallax animations
- framer-motion@11 — entrance/exit animations
- lenis@1.1 — smooth scroll library
- lucide-react@0.294 — SVG icons
- zod@3.22 — form validation
- clsx@2 + tailwind-merge@2 — classname utilities
- sonner@1.4 — toast notifications

Dev Dependencies:
- @typescript-eslint/eslint-plugin @typescript-eslint/parser
- prettier@3

## Success Criteria
- [ ] npm install completes without errors
- [ ] All dependencies appear in package-lock.json
- [ ] Node modules folder is git-ignored (should already be in .gitignore)
- [ ] Run npm run build to verify no type errors

## References
- AGENTS.md: Stack & Dependencies section
- Next.js 16 breaking changes in node_modules/next/dist/docs/
" \
  --label "phase-0,setup,dependencies"

gh issue create --title "[Phase 0-2] Configure Tailwind CSS v4 with design tokens" \
  --body "
## Task Description
Setup Tailwind CSS v4 with custom color palette and typography scales defined in AGENTS.md.

## Implementation Steps

### 1. Create/Update tailwind.config.ts
```typescript
export default {
  theme: {
    colors: {
      primary: '#1C1917',      // stone-900 — ink black
      secondary: '#44403C',    // stone-700 — muted text
      cta: '#CA8A04',          // yellow-600 — gold buttons
      bg: '#FAFAF9',           // stone-50 — cream background
      'accent-butter': '#FEF3C7', // amber-100 — food accent
      'accent-caramel': '#92400E', // amber-700 — crust accent
      text: '#0C0A09',         // stone-950 — text body
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
  },
};
```

### 2. Create app/globals.css
Add CSS variables for design tokens (colors, animations, spacing).

### 3. Preload Fonts
In root layout, add preload links for Fraunces, Playfair Display, Inter, Plex Thai.

## Success Criteria
- [ ] tailwind.config.ts builds without errors
- [ ] Colors visible in dev server (test with text-primary, bg-cta, etc.)
- [ ] Typography scales are responsive (clamp works)
- [ ] npm run build succeeds with no Tailwind warnings
- [ ] globals.css applies to all pages

## References
- AGENTS.md: Design Tokens & Tailwind Configuration
- plan.md: Typography & Color Palette sections
" \
  --label "phase-0,setup,styling"

gh issue create --title "[Phase 0-3] Setup next-intl 3 with EN/FR/TH locales" \
  --body "
## Task Description
Configure next-intl 3 for trilingual routing (EN, FR, TH) with proper middleware and message files.

## Implementation Steps

### 1. Install next-intl
\`\`\`bash
npm install next-intl@3
\`\`\`

### 2. Create middleware.ts
Setup routing for [locale] parameter with EN/FR/TH support.

### 3. Create Message Files
- messages/en.json
- messages/fr.json
- messages/th.json

Structure with namespaces:
\`\`\`json
{
  \"navigation\": { \"home\": \"Home\", ... },
  \"hero\": { \"title\": \"...\", ... },
  ...
}
\`\`\`

### 4. Update next.config.ts
Add i18n config for locale detection and routing.

### 5. Create Root Layout
app/[locale]/layout.tsx with nextIntlDynamic and locale provider.

## Locale Routing
- /en/* → English (explicit)
- /fr/* → French (explicit)
- /th/* → Thai (explicit)
- / → redirects to /en

## Success Criteria
- [ ] localhost:3000 redirects to localhost:3000/en
- [ ] localhost:3000/fr loads French locale
- [ ] localhost:3000/th loads Thai locale
- [ ] useTranslations hook works in components
- [ ] Type safety for translations (no missing keys)

## References
- AGENTS.md: i18n Setup section
- plan.md: Section 4 (i18n & Localisation)
- next-intl docs: https://next-intl-docs.vercel.app/
" \
  --label "phase-0,setup,i18n"

gh issue create --title "[Phase 0-4] Download & host font files locally" \
  --body "
## Task Description
Download font files for Fraunces, Playfair Display, Inter, IBM Plex Sans Thai, and JetBrains Mono.
Host them locally in public/fonts/ and configure preloading in root layout.

## Required Fonts

| Font | Usage | Weights | URL |
|------|-------|---------|-----|
| Fraunces 144 | Display heading (h1) | 400, 600 | Google Fonts |
| Playfair Display | Section headings (h2-h6) | 400, 700 | Google Fonts |
| Inter | Body text, nav | 400, 500 | Google Fonts |
| IBM Plex Sans Thai | Thai text | 400, 600 | Google Fonts |
| JetBrains Mono | Captions, metadata | 400 | JetBrains Fonts |

## Implementation Steps

### 1. Download Font Files
Download .woff2 files from Google Fonts (preferred for web performance).
Place in public/fonts/ directory.

### 2. Create Font Face Declarations
In app/globals.css:
\`\`\`css
@font-face {
  font-family: 'Fraunces';
  src: url('/fonts/fraunces-variable.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
...
\`\`\`

### 3. Preload Critical Fonts in Root Layout
In app/[locale]/layout.tsx:
\`\`\`tsx
<link rel=\"preload\" href=\"/fonts/fraunces-variable.woff2\" as=\"font\" type=\"font/woff2\" />
<link rel=\"preload\" href=\"/fonts/playfair-display-variable.woff2\" as=\"font\" type=\"font/woff2\" />
\`\`\`

## Success Criteria
- [ ] Fraunces loads correctly (Display 1 text)
- [ ] Playfair Display loads correctly (headings)
- [ ] Inter loads correctly (body text)
- [ ] Thai text renders in Plex Sans Thai
- [ ] Fonts preload (check Network tab: preload requests)
- [ ] LCP not degraded (should be same or faster than CDN)

## References
- AGENTS.md: Fonts section
- plan.md: Typography section
" \
  --label "phase-0,setup,fonts"

gh issue create --title "[Phase 0-5] Create TypeScript & ESLint configuration" \
  --body "
## Task Description
Setup TypeScript strict mode and ESLint config for code quality and type safety.

## Implementation Steps

### 1. Verify tsconfig.json
Ensure strict mode is enabled:
\`\`\`json
{
  \"compilerOptions\": {
    \"strict\": true,
    \"noImplicitAny\": true,
    \"strictNullChecks\": true,
    \"moduleResolution\": \"bundler\"
  }
}
\`\`\`

### 2. Update eslint.config.mjs
Include:
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- Next.js recommended config
- Rules: no console.warn (except errors), no any types

### 3. Configure Prettier
Create prettier.config.mjs with:
- Tab width: 2
- Print width: 100
- Single quotes: false
- Trailing commas: es5

## Success Criteria
- [ ] npm run lint runs without errors
- [ ] TypeScript strict mode active (tsc --noEmit passes)
- [ ] No any types allowed
- [ ] ESLint config includes TypeScript rules
- [ ] Prettier formats code consistently

## References
- AGENTS.md: Conventions section
- tsconfig.json (already in project)
" \
  --label "phase-0,setup,config"

# PHASE 1: LAYOUT & NAVIGATION
echo "Creating Phase 1 issues..."

gh issue create --title "[Phase 1-1] Create Root Layout with i18n provider" \
  --body "
## Task Description
Build app/[locale]/layout.tsx as the root layout with:
- next-intl provider
- Lenis smooth scroll initialization
- Global styles import
- Font preloading
- Meta tags (favicon, manifest)

## Implementation Steps

### 1. Create app/[locale]/layout.tsx
\`\`\`tsx
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel=\"preload\" href=\"/fonts/fraunces.woff2\" as=\"font\" />
        <link rel=\"icon\" href=\"/favicon.svg\" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
\`\`\`

### 2. Initialize Lenis (useEffect in client component)
Create components/layout/LenisProvider.tsx to wrap smooth scroll.

### 3. Import Global Styles
app/globals.css should be imported in layout.

## Success Criteria
- [ ] npm run dev loads without errors
- [ ] localhost:3000/en renders layout
- [ ] Fonts preload (Network tab shows preload requests)
- [ ] useTranslations works in child components
- [ ] Lenis initializes (smooth scroll on scroll)

## Files to Create
- app/[locale]/layout.tsx
- components/layout/LenisProvider.tsx (optional)

## References
- AGENTS.md: Root layout section
- Next.js 16 App Router docs
" \
  --label "phase-1,layout"

gh issue create --title "[Phase 1-2] Build Navbar component (floating pill)" \
  --body "
## Task Description
Create components/layout/Navbar.tsx — a floating pill navbar that hides on scroll down.

## Design Spec
- Position: fixed, top-center, rounded-full
- Background: rgba(white, 0.9) with backdrop-blur
- Links: Home, Menu, Visit, Press
- Mobile: hamburger menu (optional for Phase 1)
- Animation: fade out on scroll down, fade in on scroll up (using Lenis scroll velocity)

## Implementation Steps

### 1. Create Navbar.tsx
\`\`\`tsx
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const Navbar = () => {
  const t = useTranslations('navigation');
  
  return (
    <nav className=\"fixed top-8 left-1/2 -translate-x-1/2 z-50\">
      <div className=\"bg-white/90 backdrop-blur rounded-full px-8 py-4 flex gap-8\">
        <Link href=\"/\">{t('home')}</Link>
        <Link href=\"/menu\">{t('menu')}</Link>
        <Link href=\"/visit\">{t('visit')}</Link>
        <Link href=\"/press\">{t('press')}</Link>
      </div>
    </nav>
  );
};
\`\`\`

### 2. Add Scroll Hide Animation
Use Lenis scroll event to trigger hide/show.

### 3. Style with Tailwind
- Colors: primary (text), bg (background)
- Typography: body text, 16px
- Hover: text-cta (gold)

## Success Criteria
- [ ] Navbar renders at top center
- [ ] Links navigate to correct pages
- [ ] Translations work (EN/FR/TH)
- [ ] Styling matches design tokens
- [ ] Navbar hides on scroll (scroll behavior visible)

## Files to Create
- components/layout/Navbar.tsx

## References
- AGENTS.md: Navbar section
- plan.md: Architecture Composants
" \
  --label "phase-1,navbar"

gh issue create --title "[Phase 1-3] Build Footer component (4-column)" \
  --body "
## Task Description
Create components/layout/Footer.tsx — a 4-column footer with contact, hours, social, and wordmark.

## Footer Sections

| Column | Content |
|--------|---------|
| Wordmark | Logo XXL outline (text-based or SVG) |
| Hours | Opening times (8-18 or 8-21), link to visit page |
| Contact | Phone, email, address, map link |
| Social | Instagram, Facebook, LinkedIn (icons) |

## Implementation Steps

### 1. Create Footer.tsx
\`\`\`tsx
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const Footer = () => {
  const t = useTranslations('footer');
  
  return (
    <footer className=\"bg-primary text-bg py-16 px-8\">
      <div className=\"grid grid-cols-4 gap-12 max-w-6xl mx-auto\">
        {/* Wordmark */}
        <div className=\"text-display-2 font-display font-bold\">
          ÉPICURIEN
        </div>
        
        {/* Hours */}
        <div>
          <h3>{t('hours')}</h3>
          <p>8:00 AM - 6:00 PM</p>
        </div>
        
        {/* Contact */}
        <div>
          <h3>{t('contact')}</h3>
          <p><a href=\"tel:+66807912902\">+66 80 791 2902</a></p>
          <p><a href=\"mailto:hello@epicurien.bkk\">hello@epicurien.bkk</a></p>
        </div>
        
        {/* Social */}
        <div>
          <h3>{t('follow')}</h3>
          <nav className=\"flex gap-4\">
            <a href=\"#\">Instagram</a>
            <a href=\"#\">Facebook</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
\`\`\`

### 2. Add to Root Layout
Import Footer in app/[locale]/layout.tsx after {children}.

### 3. Style with Tailwind
- Background: primary (#1C1917)
- Text: bg (#FAFAF9)
- Heading: display-2 or heading-1
- Links: hover-cta (gold)

## Success Criteria
- [ ] Footer renders at bottom of every page
- [ ] All 4 columns visible and aligned
- [ ] Links work (tel, email, social)
- [ ] Translations correct (EN/FR/TH)
- [ ] Responsive on mobile (stack to 2x2 or 1x4)
- [ ] Colors match design tokens

## Files to Create
- components/layout/Footer.tsx

## References
- AGENTS.md: Footer section
- plan.md: Footer structure
" \
  --label "phase-1,footer"

gh issue create --title "[Phase 1-4] Build LangSwitcher component (sticky dropdown)" \
  --body "
## Task Description
Create components/layout/LangSwitcher.tsx — a sticky language switcher in top-right corner.

## Design Spec
- Position: fixed top-right
- Trigger: button with current language code (EN/FR/TH)
- Dropdown: shows 3 flags/labels (English, Français, ไทย)
- Click: switches locale and navigates to same page in new language

## Implementation Steps

### 1. Create LangSwitcher.tsx
\`\`\`tsx
'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export const LangSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const locales = [
    { code: 'en', label: '🇬🇧 English' },
    { code: 'fr', label: '🇫🇷 Français' },
    { code: 'th', label: '🇹🇭 ไทย' },
  ];
  
  const changeLocale = (newLocale: string) => {
    const newPathname = pathname.replace(\`/\${locale}\`, \`/\${newLocale}\`);
    return newPathname;
  };

  return (
    <div className=\"fixed top-4 right-4 z-50\">
      <button onClick={() => setIsOpen(!isOpen)}>
        {locale.toUpperCase()}
      </button>
      {isOpen && (
        <div className=\"absolute right-0 mt-2 bg-white rounded-lg shadow-lg\">
          {locales.map(({ code, label }) => (
            <Link key={code} href={changeLocale(code)}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
\`\`\`

### 2. Add to Root Layout
Include LangSwitcher in app/[locale]/layout.tsx.

### 3. Style with Tailwind
- Button: bg-cta, text-primary, hover-secondary
- Dropdown: bg-white, border-secondary, rounded-lg

## Success Criteria
- [ ] Dropdown appears on click
- [ ] All 3 languages selectable
- [ ] Clicking language changes locale and navigates
- [ ] URL updates correctly (/en → /fr)
- [ ] Same page content loads in new language
- [ ] Dropdown closes after selection

## Files to Create
- components/layout/LangSwitcher.tsx

## References
- AGENTS.md: Navbar section
- next-intl 3 API
" \
  --label "phase-1,lang-switcher"

# PHASE 2: HOMEPAGE SECTIONS
echo "Creating Phase 2 issues..."

gh issue create --title "[Phase 2-1] Build Hero section (cinematic full-bleed)" \
  --body "
## Task Description
Create components/sections/Hero.tsx — a full-bleed hero with background image, headline, subtitle, and scroll indicator.

## Design Spec
- Background: Full-bleed hero image (croissant macro)
- Content: Centered
  - Display 1 title (clamp 4rem-12rem)
  - Subtitle (body text, gold accent)
  - Scroll chevron (animated bounce)
- Responsive: Image covers on mobile, parallax on desktop

## Implementation Steps

### 1. Create Hero.tsx
\`\`\`tsx
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export const Hero = () => {
  const t = useTranslations('hero');
  
  return (
    <section className=\"relative h-screen overflow-hidden\">
      <Image
        src=\"/images/hero-croissant.jpg\"
        alt=\"Hero croissant\"
        fill
        className=\"object-cover\"
        priority
      />
      
      <div className=\"absolute inset-0 flex flex-col items-center justify-center text-center\">
        <h1 className=\"text-display-1 font-display text-white drop-shadow-lg\">
          {t('title')}
        </h1>
        <p className=\"text-body text-cta mt-4\">
          {t('subtitle')}
        </p>
      </div>
      
      <div className=\"absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce\">
        <svg /* chevron icon */ />
      </div>
    </section>
  );
};
\`\`\`

### 2. Add Image Placeholder
Place high-quality croissant image at public/images/hero-croissant.jpg.

### 3. Add Scroll Animation
Chevron bounces continuously (CSS animation).

## Success Criteria
- [ ] Hero renders full viewport height
- [ ] Image loads with priority (no CLS)
- [ ] Title is readable (contrast OK with image)
- [ ] Subtitle in gold color
- [ ] Chevron animates bounce
- [ ] Responsive image scales
- [ ] Translations work (EN/FR/TH)

## Files to Create
- components/sections/Hero.tsx

## Assets Needed
- public/images/hero-croissant.jpg

## References
- AGENTS.md: Hero section
- plan.md: Homepage sections
" \
  --label "phase-2,hero"

gh issue create --title "[Phase 2-2] Build AwardBand section (marquee scroll)" \
  --body "
## Task Description
Create components/sections/AwardBand.tsx — a marquee scrolling text with award/achievement messages.

## Design Spec
- Marquee: Horizontal scrolling text, infinite loop
- Text: \"★ Best Croissant Île-de-France 2021 ★\" (repeating)
- Styling: Greyscale logo or text, background cream
- Animation: Velocity-based (faster on scroll, slower on rest)

## Implementation Steps

### 1. Create Marquee Component
Create components/ui/Marquee.tsx first (reusable marquee).

### 2. Create AwardBand.tsx
\`\`\`tsx
import { Marquee } from '@/components/ui/Marquee';
import { useTranslations } from 'next-intl';

export const AwardBand = () => {
  const t = useTranslations('award');
  
  return (
    <section className=\"bg-bg py-8\">
      <Marquee speed=\"fast\">
        {t('text')} • {t('text')} • {t('text')}
      </Marquee>
    </section>
  );
};
\`\`\`

### 3. Implement Marquee with CSS Animation
\`\`\`css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}
\`\`\`

## Success Criteria
- [ ] Text scrolls horizontally continuously
- [ ] Text repeats seamlessly (no gap)
- [ ] Works on all screen sizes
- [ ] Animation smooth (60fps)
- [ ] Text readable and aligned vertically

## Files to Create
- components/ui/Marquee.tsx
- components/sections/AwardBand.tsx

## References
- AGENTS.md: Animations section
- plan.md: AwardBand section
" \
  --label "phase-2,marquee"

gh issue create --title "[Phase 2-3] Build StoryChef section (text reveal + image)" \
  --body "
## Task Description
Create components/sections/StoryChef.tsx — story section with Enzo's portrait and word-by-word text reveal.

## Design Spec
- Image: Enzo portrait (left or top on mobile)
- Text: \"Le Chef\" heading + biography paragraph
- Animation: Word-by-word reveal (Framer Motion) on scroll-into-view
- Typography: Heading (Playfair), Body (Inter)

## Implementation Steps

### 1. Create StoryChef.tsx
\`\`\`tsx
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { TextReveal } from '@/components/ui/TextReveal';

export const StoryChef = () => {
  const t = useTranslations('story_chef');
  
  return (
    <section className=\"grid grid-cols-2 gap-12 py-16 px-8\">
      <div className=\"relative h-96\">
        <Image
          src=\"/images/enzo-portrait.jpg\"
          alt=\"Chef Enzo\"
          fill
          className=\"object-cover rounded-lg\"
        />
      </div>
      
      <div>
        <h2 className=\"text-heading-1 font-heading mb-6\">
          {t('title')}
        </h2>
        <TextReveal text={t('bio')} />
      </div>
    </section>
  );
};
\`\`\`

### 2. Create TextReveal Component
Build components/ui/TextReveal.tsx for word-by-word animation.

### 3. Add Framer Motion
Use AnimatePresence + motion.span for each word.

## Success Criteria
- [ ] Image loads and displays correctly
- [ ] Text reveals word-by-word on scroll
- [ ] Animation timing feels natural (150-300ms per word)
- [ ] Responsive layout (stacks on mobile)
- [ ] Translations work

## Files to Create
- components/sections/StoryChef.tsx
- components/ui/TextReveal.tsx

## Assets Needed
- public/images/enzo-portrait.jpg

## References
- AGENTS.md: StoryChef section
- Framer Motion docs
" \
  --label "phase-2,story-chef"

# Phase 3, 4+ issues...
echo "Phase 2 issues created. Continuing with remaining phases..."

# PHASE 3: PAGES
gh issue create --title "[Phase 3-1] Create /menu page with product grid" \
  --body "
## Task Description
Create app/[locale]/menu/page.tsx — product menu page with 2-3 column responsive grid.

## Page Structure
1. Hero section (smaller than homepage)
2. Product grid (ProductCard components)
3. Category tabs/filters (optional)
4. CTA: \"Explore all\" → back to homepage

## Product Card Spec
- Image: product photo
- Name: product name (translated)
- Price: THB currency
- Category badge: croissant/viennoiserie/bread
- Hover: zoom effect + shadow

## Implementation Steps

### 1. Create ProductCard.tsx
\`\`\`tsx
import Image from 'next/image';

interface ProductCardProps {
  name: string;
  price: number;
  category: string;
  image: string;
}

export const ProductCard = ({ name, price, category, image }: ProductCardProps) => {
  return (
    <div className=\"group cursor-pointer\">
      <div className=\"relative h-64 overflow-hidden rounded-lg mb-4\">
        <Image
          src={image}
          alt={name}
          fill
          className=\"object-cover group-hover:scale-110 transition\"
        />
      </div>
      <h3 className=\"text-heading-2 font-heading\">{name}</h3>
      <p className=\"text-secondary\">{category}</p>
      <p className=\"text-cta font-semibold\">{price} THB</p>
    </div>
  );
};
\`\`\`

### 2. Create /menu/page.tsx
\`\`\`tsx
import { ProductCard } from '@/components/ui/ProductCard';

const PRODUCTS = [
  { name: 'Croissant Nature', price: 95, category: 'croissant', image: '/images/croissant-nature.jpg' },
  // ... more products
];

export default function MenuPage() {
  return (
    <main>
      <div className=\"grid grid-cols-3 gap-8 py-16 px-8\">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </main>
  );
}
\`\`\`

### 3. Add Metadata
Export generateMetadata() for SEO.

## Success Criteria
- [ ] Products render in grid (3 cols desktop, 1 col mobile)
- [ ] Hover zoom effect works smoothly
- [ ] Prices display correctly
- [ ] Category badges visible
- [ ] Translations work
- [ ] Page is responsive
- [ ] SEO metadata set

## Files to Create
- components/ui/ProductCard.tsx
- app/[locale]/menu/page.tsx

## References
- AGENTS.md: /menu page
- plan.md: /menu page section
" \
  --label "phase-3,menu-page"

gh issue create --title "[Phase 3-2] Create /visit page with location & hours" \
  --body "
## Task Description
Create app/[locale]/visit/page.tsx — visit information page with location, hours, contact, map.

## Page Structure
1. Hero: interior photo
2. \"Find us\": Address text + embedded Google Maps
3. \"Hours & Contact\": Table (open times) + phone + email
4. \"Why visit\": 3 USPs (ambiance, quality, location)
5. \"Press & Awards\": Featured press mentions

## Implementation Steps

### 1. Create /visit/page.tsx

### 2. Embed Google Maps
Use iframe or google-map-react package.

### 3. Add Hours Table
Display open times with day-of-week.

### 4. Add Schema.org LocalBusiness
Include JSON-LD for SEO.

## Success Criteria
- [ ] Location displays correctly
- [ ] Google Maps embedded and interactive
- [ ] Hours table is readable
- [ ] Contact info clickable (tel, email)
- [ ] Responsive on mobile
- [ ] Schema.org LocalBusiness in <head>

## Files to Create
- app/[locale]/visit/page.tsx

## References
- AGENTS.md: /visit page
- plan.md: /visit page section
" \
  --label "phase-3,visit-page"

gh issue create --title "[Phase 3-3] Create /press page with media kit & contact form" \
  --body "
## Task Description
Create app/[locale]/press/page.tsx — complete press room with media kit, mentions, and inquiry form.

## Page Structure
1. \"Media Kit\": Download PDF/ZIP (logo, photos, chef bio)
2. \"Press Mentions\": Timeline or grid of articles (Le Parisien, Koktail, The Thaiger, Corner.inc)
3. \"Contact Press\": Form (name, email, inquiry, tel) → POST to API
4. \"Awards\": Featured award card

## Implementation Steps

### 1. Create /press/page.tsx

### 2. Add Press Form
Create form with Zod validation.

### 3. Add Download Button
Serve media kit zip from public/downloads/ or via API.

## Success Criteria
- [ ] Media kit download works
- [ ] Press mentions render correctly
- [ ] Form validates with Zod
- [ ] Form submission works (API to Phase 7)
- [ ] Responsive design
- [ ] Translations for all text

## Files to Create
- app/[locale]/press/page.tsx
- components/ui/PressForm.tsx

## References
- AGENTS.md: /press page
- plan.md: /press page section
" \
  --label "phase-3,press-page"

echo "All issues created successfully!"
echo "View on GitHub: https://github.com/Fugushiva/epicurien_bkk/issues"

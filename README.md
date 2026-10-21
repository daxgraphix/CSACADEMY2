# CS Academy — Digital Skills Platform for East Africa

> Practical, accessible, and locally relevant AI, cybersecurity, web development, and digital-skills training for the East African workforce. Instruction and course materials are in English; payment instructions are confirmed with learners before payment.

---

## Table of Contents

1. [Overview](#overview)
2. [Mission, Vision & Values](#mission-vision--values)
3. [The SMART Framework](#the-smart-framework)
4. [Platform Features](#platform-features)
5. [Delivery Channels](#delivery-channels)
6. [Program Catalog & Pricing](#program-catalog--pricing)
7. [Architecture](#architecture)
   - [High-Level Overview](#high-level-overview)
   - [Tech Stack](#tech-stack)
   - [Directory Structure](#directory-structure)
   - [Routing Model](#routing-model)
   - [State Management](#state-management)
   - [Theming System](#theming-system)
   - [Animations & Motion](#animations--motion)
   - [Data Layer](#data-layer)
   - [Internationalization & Localization](#internationalization--localization)
   - [Modals & Detail Views](#modals--detail-views)
   - [SEO](#seo)
   - [Security](#security)
8. [Pages & Routes](#pages--routes)
9. [Components](#components)
10. [Build & Development](#build--development)
11. [Browser Support](#browser-support)
12. [Accessibility](#accessibility)
13. [Performance](#performance)
14. [Get Started](#get-started)

---

## Overview

**CS Academy** is a client-side single-page application (SPA) that delivers practical digital-skills education to learners across Tanzania, Kenya, Uganda, Rwanda, Burundi, and the DRC. It is operated under the **Cyber Academy** parent organization and led by founder **Alex Rweyemamu**.

The platform is fully **data-driven**: every piece of visible content (courses, pricing, testimonials, blog posts, FAQs, instructors) lives in typed data modules under `src/data/` and `src/config/`. UI components are thin presentational layers that map over that data, which makes the site easy to localize, re-theme, and extend without touching component logic.

Key characteristics:

- **English-language instruction** with practical examples drawn from East African contexts.
- **Enrollment-first payment process**: payment methods and instructions are confirmed with learners before payment; the website does not take payment.
- **Low-bandwidth** friendly delivery (WhatsApp micro-learning, text-first PWA).
- **Dark/Light** theme with full CSS-variable theming and smooth transitions.
- **Multi-currency** pricing (TZS / KES / USD).
- **WhatsApp, email, and FormSubmit** handle learner inquiries and newsletter requests; the application content remains bundled at build time.

---

## Mission, Vision & Values

### Mission

CS Academy exists to bridge the digital divide across East Africa by delivering practical, jargon-free digital skills training that is accessible to anyone with a smartphone — regardless of location, formal education level, or economic background.

### Vision

An East Africa where every working adult — the shopkeeper in Mwanza, the nurse in Kampala, the teacher in Kigali — can confidently navigate digital tools, leverage AI for productivity, and transact safely online.

### Core Values

| Value | Description |
|---|---|
| **Accessibility** | English-first curricula, mobile-money payments, and low-bandwidth channels make education reachable. |
| **Practical Value** | Real-world skills and tangible projects that directly improve employability and business outcomes. |
| **Community** | An active, supportive network of tech learners and mentors across East Africa. |
| **Innovation & Safety** | Forward-looking generative-AI and cybersecurity tools with ethics and privacy built in. |

---

## The SMART Framework

CS Academy's proprietary pedagogical methodology — **SMART** — is a five-stage learning cycle engineered for working adults in resource-constrained environments.

| Stage | Name | Focus |
|---|---|---|
| **S** | **Understand** | Encounter a concept through a concrete, locally relevant problem scenario. |
| **M** | **Master** | Guided, step-by-step practice with AI-assisted real-time correction. |
| **A** | **Apply** | Apply the skill to a real workplace task with genuine stakes. |
| **R** | **Review** | Structured metacognitive reflection and peer review. |
| **T** | **Trust** | Earn a QR-verifiable digital certificate demonstrating verified competence. |

The framework content is defined in `src/data/smartFramework.ts` and rendered by `src/components/SmartFramework.tsx`.

---

## Platform Features

### QR-Verifiable Digital Certificates
Every certificate includes a unique QR code linking to a live verification page (`academy.cyberswahili.co.tz/verify`) showing the learner's name, assessed skills, completion dates, peer-review scores, and a timestamped serial number. Certificates are append-only and tamper-resistant.

### The Digital Shop
A catalog of practical resources, templates, and toolkits. Access and any payment arrangements are confirmed with the learner before purchase; the website does not collect payment details or take payment.

### Vibe Coding
CS Academy's flagship applied-AI programming track — building working software by describing what you want in plain language, then iteratively refining output. Available as a 6-week intensive cohort, a self-paced track, and an enterprise team workshop.

### Invite & Earn Referral System

Referral requirements and any available rewards are subject to the current terms shown in the learner account.

### DevPad (Interactive Playground)
`DevPadPage` is an in-app, AI-assisted coding playground where learners prototype, test, and share small applications with mentor feedback. Backed by the optional `@google/genai` integration declared in `package.json`.

---

## Delivery Channels

| # | Channel | Summary |
|---|---|---|
| 1 | **WhatsApp Micro-Learning** | Text/voice lessons via chat; works on 2G; the most accessible format. |
| 2 | **USSD & SMS Review** | Session-based review for intermittent-connectivity learners. |
| 3 | **Progressive Web App (PWA)** | Full browser access with offline caching and text-first rendering. |
| 4 | **Mobile Application (iOS/Android)** | Native apps with push reminders and offline sync. |
| 5 | **Corporate On-Site Training** | Facilitated on-site programs for organizations (banks, schools, NGOs). |
| 6 | **Self-Paced Online** | Asynchronous learning at the learner's own speed. |

Delivery-format metadata lives in `src/data/learningFormats.ts` and is rendered by `LearningFormatsSection` / `LearningFormatsPage`.

---

## Program Catalog & Pricing

### Core Pillars (from `src/config/site.ts`)

| Pillar | Badge | Description |
|---|---|---|
| **AI Literacy & Vibe Coding** | Flagship Track | Generative AI, workplace automation, prompt engineering, voice-assisted vibe coding. |
| **Cybersecurity & Safety** | Core Defense | Defensive hygiene, anti-phishing, mobile-payment fraud prevention, deepfake detection. |
| **Modern Digital Skills & Code** | Job Ready | Web development (React, Tailwind), UI/UX in Figma, digital marketing, data analytics. |

Training tracks are categorized as `ai`, `cybersecurity`, `digital-skills`, `web-coding`, and `design-uiux` (see `src/types/index.ts` and `src/data/training.ts`). Program deep-dives are available at `/programs/ai`, `/programs/cybersecurity`, and `/programs/digital-skills`.

### Pricing & Membership Plans (PRICING & MEMBERSHIP PLANS)

Defined in `src/data/pricing.ts` and rendered by `PricingSection.tsx`. All TZS prices include a +15,000 TZS adjustment, with KES/USD equivalents at the platform's standard rates (1 USD = 2,500 TZS; 1 TZS ≈ 1/18.75 KES).

| Plan | TZS | KES | USD | Billing |
|---|---|---|---|---|
| **WhatsApp Micro-Learning** | 20,000 | 1,050 | 8 | per month |
| **Self-Paced Video Platform** | 30,000 | 1,600 | 12 | per month |
| **Zoom & Meet Live Cohorts** _(Most Popular)_ | 50,000 | 2,700 | 20 | per month |
| **VIP Annual Pass (All Channels)** | 135,000 | 7,200 | 54 | per year |
| **Workshops & Seminars** | 465,000 | 24,800 | 186 | per workshop session (up to 30 participants) |
| **Physical Training (On-Site)** | 1,215,000 | 64,800 | 486 | per corporate cohort (multi-day) |
| **Conferences & Keynotes** | Custom | Custom | Custom | per keynote address |

Payment options vary by learner location and plan. CS Academy confirms the available method and instructions during enrollment; the website does not collect payment details or take payment.

---

## Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         index.html                           │
│  ├─ Meta / CSP / SEO / JSON-LD                              │
│  └─ <div id="root">  ← React mounts here                    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  main.tsx                                                   │
│   ├─ HelmetProvider (SEO)                                   │
│   ├─ AppProvider  (theme, currency, translations)           │
│   ├─ import './index.css'   (Tailwind v4 + theme vars)      │
│   └─ import './styles/reveal.css' (scroll reveal)           │
│            │                                                │
│            ▼                                                │
│  App.tsx  ── routing state machine (currentRoute)          │
│   ├─ Navbar / Footer / BackToTop / ScrollProgress          │
│   ├─ Page renderer (switch on currentRoute)                │
│   └─ Modal stack (Booking, Program, Training, Resource, …) │
└─────────────────────────────────────────────────────────────┘
            │                      │
            ▼                      ▼
   ┌────────────────┐     ┌──────────────────────┐
   │  Pages/*       │     │  Data Layer          │
   │  (route views) │◄────│  src/data/*, config  │
   └────────────────┘     └──────────────────────┘
```

The application is a **single-page state machine**, not a URL-driven router. Navigation is handled by a `currentRoute` state variable in `App.tsx` and a `setCurrentRoute` callback passed down to children. There is no `react-router` dependency; deep routes (`programs/ai`, etc.) are simply enumerated union members of the `PageRoute` type.

### Tech Stack

| Concern | Choice | Notes |
|---|---|---|
| Language | **TypeScript 5.8** (ES2022) | Strict typing via `src/types/index.ts`. |
| UI Library | **React 19** | Hooks-based function components. |
| Build Tool | **Vite 6** | `@vitejs/plugin-react`, `@tailwindcss/vite`. |
| Styling | **Tailwind CSS v4** | Zero-config, CSS-first; theming via CSS custom properties. |
| Animation | **motion** (Framer Motion successor) + custom CSS keyframes | `useReveal` hook for IntersectionObserver scroll reveals. |
| SEO | **react-helmet-async** | Per-page `<title>`, meta, OG, and JSON-LD. |
| Icons | **lucide-react** | Consistent open-source icon set. |
| State | **React Context + useReducer pattern** | `AppContext` for theme/currency/translations. |
| Forms | Validated locally | Zod-style schemas referenced in `utils/` (where used). |
| AI (optional) | **@google/genai** | Used by DevPad; not required for the static build. |
| Server (optional) | **express** + **dotenv** | Declared for future/optional backend; `vite build` is pure SPA. |

### Directory Structure

```
CSACADEMY2/
├── index.html                  # Entry HTML: meta, CSP, SEO, JSON-LD, theme bootstrap script
├── vite.config.ts              # Vite + React + Tailwind plugins, '@' path alias
├── tsconfig.json               # TypeScript config (bundler resolution, JSX react-jsx)
├── package.json                # Dependencies & scripts
├── metadata.json               # Project metadata
└── src/
    ├── main.tsx                # React root: HelmetProvider → AppProvider → App
    ├── App.tsx                 # Routing state machine, modal orchestration, layout
    ├── index.css               # Tailwind v4 import, CSS variables (dark/light), keyframes
    ├── config/
    │   └── site.ts             # Academy info, contact, socials, pillars, testimonials, founder
    ├── context/
    │   └── AppContext.tsx      # Global state: theme, currency, translations (+ localStorage)
    ├── types/
    │   └── index.ts            # Shared interfaces & PageRoute union
    ├── data/
    │   ├── translations.ts     # UI strings, section badges, Theme/Currency types
    │   ├── training.ts         # Training programs, featured training, packages
    │   ├── smartFramework.ts   # SMART methodology steps
    │   ├── resources.ts        # Downloadable toolkits/guides
    │   ├── programs.ts         # Program pillars & deep-dive content
    │   ├── pricing.ts          # Published membership and pricing plans
    │   ├── platformFeatures.ts # Feature cards (certificates, shop, etc.)
    │   ├── organizationIndustries.ts # Industry-specific solutions
    │   ├── learningFormats.ts  # Delivery-channel definitions
    │   ├── instructors.ts      # Instructor profiles
    │   ├── faq.ts              # Frequently asked questions
    │   └── blog.ts             # Blog articles
    ├── hooks/
    │   └── useReveal.ts        # IntersectionObserver scroll-reveal hook
    ├── utils/
    │   ├── download.ts         # HTML→PDF generation (branded certificates/guides)
    │   └── highlight.tsx       # Syntax/text highlighting helpers
    ├── styles/
    │   └── reveal.css          # .reveal / .reveal.is-revealed / .reveal-stagger
    ├── components/
    │   ├── Navbar.tsx          # Responsive nav (lg breakpoint), theme/currency toggles
    │   ├── Footer.tsx          # Site footer with social links
    │   ├── BackToTop.tsx       # Scroll-to-top button (theme-aware)
    │   ├── ScrollProgress.tsx  # Reading-progress bar
    │   ├── ErrorBoundary.tsx   # React error boundary
    │   ├── NotFound.tsx        # 404 / not-found route
    │   ├── Hero.tsx            # Landing hero
    │   ├── WhyCSAcademy.tsx    # Value-proposition section
    │   ├── TrainingProcess.tsx # How-it-works steps
    │   ├── TrainingPackages.tsx# Package cards
    │   ├── SocialProof.tsx     # Testimonials (category-filtered)
    │   ├── SmartFramework.tsx  # SMART framework display
    │   ├── ShareButtons.tsx    # Social share controls
    │   ├── ResourcesSection.tsx
    │   ├── ProgramsOverview.tsx
    │   ├── PricingSection.tsx  # Membership/pricing plans
    │   ├── PlatformFeaturesSection.tsx
    │   ├── LearningFormatsSection.tsx
    │   ├── ForOrganizationsSection.tsx
    │   ├── FeaturedTraining.tsx# Filterable training catalog (counts per category)
    │   ├── FAQSection.tsx
    │   ├── BlogSection.tsx
    │   ├── AboutSection.tsx
    │   ├── AudienceStrip.tsx
    │   ├── ContactCTA.tsx
    │   ├── BookingModal.tsx          # Inquiry form → WhatsApp / Email dispatch
    │   ├── ProgramDetailModal.tsx
    │   ├── TrainingDetailModal.tsx
    │   ├── ResourceViewModal.tsx
    │   └── BlogArticleModal.tsx
    └── pages/
        ├── HomePage.tsx
        ├── FeaturesPage.tsx
        ├── PricingPage.tsx
        ├── ProgramsPage.tsx
        ├── ProgramDeepDivePage.tsx   # slug-driven (ai | cybersecurity | digital-skills)
        ├── LearningFormatsPage.tsx
        ├── ForOrganizationsPage.tsx
        ├── ResourcesPage.tsx
        ├── BlogPage.tsx
        ├── AboutPage.tsx
        ├── ContactPage.tsx
        ├── VibeCodingPage.tsx
        └── DevPadPage.tsx

```

### Routing Model

`App.tsx` holds `const [currentRoute, setCurrentRoute] = useState<PageRoute>('home')`. A `renderCurrentPage()` switch maps each `PageRoute` to its page component and injects callbacks (`setCurrentRoute`, `openBookingModal`, `openProgramModal`, etc.). On every route change, `window.scrollTo({ top: 0 })` runs, and the page container is keyed (`<div key={currentRoute} className="page-enter">`) to trigger the `page-enter` transition (defined in `index.css`).

```ts
export type PageRoute =
  | 'home' | 'features' | 'pricing' | 'programs'
  | 'programs/ai' | 'programs/cybersecurity' | 'programs/digital-skills'
  | 'vibe-coding' | 'devpad' | 'learning-formats' | 'for-organizations'
  | 'resources' | 'blog' | 'about' | 'contact' | 'not-found';
```

### State Management

Global state is provided by `AppContext` (`src/context/AppContext.tsx`):

| State | Type | Persistence |
|---|---|---|
| `theme` | `'dark' \| 'light'` | `localStorage['cs_academy_theme']` (default `light`) |
| `currency` | `'TSH' \| 'KES' \| 'USD'` | `localStorage['cs_academy_currency']` (default `TSH`) |
| `t` | `Translations` | In-memory (from `translations.ts`) |

The provider toggles the `light` class on `document.documentElement` to drive theming (see below). Components consume state via the `useApp()` hook, which throws if used outside `AppProvider`.

Modal state (booking, program, training, resource, blog article) is local to `App.tsx` and coordinated with a single `Escape`-key handler and a body `overflow:hidden` lock while any modal is open.

### Theming System

Theming is **CSS-variable driven** and toggled by a single class on the root `<html>` element:

- `:root` defines the **dark** palette (`--bg-primary: #090909`, `--accent-red: #ff3b30`, etc.).
- `html.light` overrides the same variables with the **light** palette (`--bg-primary: #f7f4ee`, `--accent-red: #dc2626`, etc.).

`index.css` also exposes semantic helpers (`.text-theme-primary`, `.glass-surface`, `.theme-card`, `.badge-theme`, `.keyword-mark`, etc.) and a full keyframe library (`page-enter`, `float-soft`, `pulse-glow`, `shimmer-text`, `gradient-shift`, …). A `prefers-reduced-motion` block disables animations for accessibility. The initial theme is applied before paint by an inline script in `index.html` to avoid flash-of-wrong-theme.

### Animations & Motion

- **Page transitions**: `.page-enter` keyframe (fade + 12px rise) applied to the keyed route wrapper in `App.tsx`.
- **Scroll reveals**: `useReveal.ts` (IntersectionObserver) toggles `.is-revealed` on elements with `.reveal` / `.reveal-stagger` classes, defined in `src/styles/reveal.css` (700ms cubic-bezier easing). `index.css` defers to `reveal.css` as the source of truth (it is imported after `index.css` in `main.tsx`).
- **Component motion**: the `motion` library is used for modal entrances, micro-interactions, and hover states.
- **Reduced motion**: all animation durations are neutralized under `prefers-reduced-motion: reduce`.

### Data Layer

All content is typed and centralized:

| Module | Exports | Consumed by |
|---|---|---|
| `config/site.ts` | `siteConfig` (academy info, contact, socials, pillars, 20 testimonials, founder) | Footer, Hero, SocialProof, BookingModal |
| `data/translations.ts` | `translations`, `Theme`, `Currency` types | AppContext, all section components |
| `data/training.ts` | `featuredTrainingData`, `trainingPackagesData` | FeaturedTraining, TrainingPackages, TrainingDetailModal |
| `data/programs.ts` | Program pillars & deep-dive content | ProgramsPage, ProgramDeepDivePage, ProgramsOverview |
| `data/pricing.ts` | `pricingPlansData` | PricingSection, PricingPage |
| `data/learningFormats.ts` | `learningFormatsData` | LearningFormatsSection/Page |
| `data/platformFeatures.ts` | `platformFeaturesData` | PlatformFeaturesSection |
| `data/resources.ts` | `resourcesData` | ResourcesSection, ResourcesPage, ResourceViewModal |
| `data/blog.ts` | `blogPosts` | BlogSection, BlogPage, BlogArticleModal |
| `data/faq.ts` | `faqData` | FAQSection |
| `data/instructors.ts` | `instructorsData` | InstructorsPage, AboutPage |
| `data/smartFramework.ts` | SMART steps | SmartFramework |
| `data/organizationIndustries.ts` | Industry solutions | ForOrganizationsSection/Page |

### Internationalization & Localization

The platform supports **currency localization** out of the box (TZS / KES / USD) via the `currency` context and `priceTsh` / `priceKes` / `priceUsd` fields on price-bearing data. UI copy is centralized in `translations.ts` (section badges, nav labels, hero copy, CTAs). English is the primary instruction language; the content strategy embeds local East-African context rather than post-hoc translation.

### Modals & Detail Views

Detail and inquiry flows are rendered as overlay modals (not routes) for instant, stateful interaction:

- **BookingModal** — inquiry form that constructs a pre-filled message ending with *"Please provide curriculum details and scheduling availability."* and dispatches it via **WhatsApp** (`wa.me`) or **Email** (`mailto:`), with a copy-to-clipboard fallback.
- **ProgramDetailModal / TrainingDetailModal / ResourceViewModal / BlogArticleModal** — content detail overlays with focus trapping, `aria-modal`, and `Escape` handling.

### SEO

- `react-helmet-async` sets per-page `<title>`, `meta description`, canonical, and Open Graph/Twitter tags.
- `index.html` ships two JSON-LD blocks (`Organization` + `EducationalOrganization`).
- Meta keywords target East-African AI/cybersecurity/digital-skills search intent.
- `lang="en"` and `notranslate` set on `<html>` to stabilize rendering.

### Security

Implemented at the document level in `index.html`:

| Header / Policy | Value |
|---|---|
| **Content-Security-Policy** | `default-src 'self'`; scripts/styles `self` + `unsafe-inline`/`unsafe-eval` (Vite HMR requirement); images `self data: https:`; fonts `self` + gstatic; `upgrade-insecure-requests`; `block-all-mixed-content`. |
| **X-Content-Type-Options** | `nosniff` |
| **X-Frame-Options** | `DENY` (anti-clickjacking) |
| **X-XSS-Protection** | `1; mode=block` |
| **Referrer-Policy** | `strict-origin-when-cross-origin` |
| **Permissions-Policy** | `camera=(), microphone=(), geolocation=(), interest-cohort=()` |
| **Cross-Origin-Opener-Policy** | `same-origin` |
| **Cross-Origin-Resource-Policy** | `same-origin` |

> Note: `unsafe-inline` / `unsafe-eval` are required by Vite's dev/HMR runtime; tighten the CSP for a hardened production deployment if HMR is disabled.

---

## Pages & Routes

| Route | Page Component | Purpose |
|---|---|---|
| `home` | `HomePage` | Hero, features, programs, pricing, testimonials, blog, FAQ, CTA. |
| `features` | `FeaturesPage` | Platform capabilities overview. |
| `pricing` | `PricingPage` | Membership & pricing plans. |
| `programs` | `ProgramsPage` | Full program catalog with category filtering. |
| `programs/ai` | `ProgramDeepDivePage` (`slug="ai"`) | AI Literacy deep dive. |
| `programs/cybersecurity` | `ProgramDeepDivePage` (`slug="cybersecurity"`) | Cybersecurity deep dive. |
| `programs/digital-skills` | `ProgramDeepDivePage` (`slug="digital-skills"`) | Digital Skills deep dive. |
| `vibe-coding` | `VibeCodingPage` | Vibe Coding landing. |
| `devpad` | `DevPadPage` | AI-assisted coding playground. |
| `learning-formats` | `LearningFormatsPage` | Delivery channels & formats. |
| `for-organizations` | `ForOrganizationsPage` | Enterprise/NGO solutions. |
| `resources` | `ResourcesPage` | Free toolkit library. |
| `blog` | `BlogPage` | Articles listing & reading. |
| `about` | `AboutPage` | Organization, team, impact. |
| `contact` | `ContactPage` | Contact & inquiry. |
| `not-found` | `NotFound` | 404 fallback. |

---

## Components

**Layout / Chrome**
`Navbar` · `Footer` · `BackToTop` · `ScrollProgress` · `ErrorBoundary` · `NotFound`

**Sections (composable homepage/landing blocks)**
`Hero` · `WhyCSAcademy` · `TrainingProcess` · `TrainingPackages` · `SocialProof` · `SmartFramework` · `ShareButtons` · `ResourcesSection` · `ProgramsOverview` · `PricingSection` · `PlatformFeaturesSection` · `LearningFormatsSection` · `ForOrganizationsSection` · `FeaturedTraining` · `FAQSection` · `BlogSection` · `AboutSection` · `AudienceStrip` · `ContactCTA`

**Modals**
`BookingModal` · `ProgramDetailModal` · `TrainingDetailModal` · `ResourceViewModal` · `BlogArticleModal`

---

## Build & Development

### Prerequisites
- Node.js 18+ (tested with current LTS)
- npm (or compatible package manager)

### Scripts (`package.json`)

| Script | Command | Description |
|---|---|---|
| `dev` | `vite --port=3000 --host=0.0.0.0` | Start dev server with HMR. |
| `build` | `vite build` | Production build to `dist/`. |
| `preview` | `vite preview` | Preview the production build locally. |
| `clean` | `rm -rf dist server.js` | Remove build artifacts. |
| `lint` | `tsc --noEmit` | Type-check without emitting. |

### Common Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:3000)
npm run build      # production build
npm run preview    # serve the built app
npm run lint       # type-check
```

### Configuration Notes
- **Path alias**: `@/*` → project root (see `vite.config.ts` and `tsconfig.json` `paths`).
- **Tailwind v4** is configured via the `@tailwindcss/vite` plugin; no `tailwind.config.js` is required (theme tokens are CSS-first).
- **HMR** can be disabled in agent/CI environments via the `DISABLE_HMR=true` env var (disables file watching to reduce CPU).

---

## Browser Support

- **Chrome / Edge**: last 2 stable versions
- **Firefox**: last 2 stable versions
- **Safari iOS**: last 2 stable versions (iOS 14+)
- **Samsung Internet**: last 2 stable versions

---

## Accessibility

CS Academy targets **WCAG 2.1 AA**:

- All interactive elements are keyboard navigable with visible focus indicators.
- Color-contrast ratios meet AA thresholds (e.g., `--text-primary` tuned to `#1a1a1a` in light mode).
- All images carry descriptive `alt` text; icons use `lucide-react` with `aria-hidden` where decorative.
- All modals implement focus trapping, `role="dialog"`, `aria-modal`, and `Escape` handling.
- `aria-live` regions announce dynamic updates.
- `prefers-reduced-motion` is respected across all animation systems.
- `prefers-color-scheme` is used for the initial render before hydration.

---

## Performance

| Metric | Target |
|---|---|
| Largest Contentful Paint (LCP) | < 2.5s on 3G |
| First Input Delay (FID) | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Time to Interactive (TTI) | < 5s on 3G |

Optimizations in place: route-level lazy loading, text-first content, IntersectionObserver-based lazy reveals, and theme variables that avoid per-component prop drilling. The `/academy` route is a lightweight navigation hub; the `/` route is the campaign homepage. Resources, blog articles, pricing, and program content each have their own route.

---

## Get Started

### For Individual Learners
1. Visit **https://academy.cyberswahili.co.tz** on your phone or computer.
2. Browse the free toolkit library on the Resources page.
3. Enroll in your first professional track via the Programs page.
4. Join a WhatsApp cohort or start self-paced learning.
5. Earn your first QR-verifiable certificate.

### For Organizations
1. Contact **support@cyberswahili.co.tz** with your organization's name, headcount, and goals.
2. Receive a customized training-needs assessment within 48 hours.
3. Review and approve the proposed curriculum and pricing.
4. Launch with a pilot cohort; measure impact; scale organization-wide.

### For Developers
```bash
# Clone the repository
  git clone https://github.com/cyberacademy/csacademy.git
  cd csacademy

# Install dependencies
  npm install

# Start development server
  npm run dev

# Type check
  npm run lint
```

### Newsletter requests

The Dispatch form emails each request to the CS Academy support address through FormSubmit. Requests are managed by email; the form does not create an automated subscriber record or send a confirmation email. People can email support at any time to stop receiving updates. FormSubmit may require a one-time activation from the support inbox before it accepts the first submission.

---

*CS Academy — Building East Africa's Digital Workforce, One Skill at a Time.*

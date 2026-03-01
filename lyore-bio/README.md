# LYORE ABAYA | ليور عباية

A bilingual (Arabic / English) luxury abaya brand bio page built with Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, and Motion.

---

## Prerequisites

- **Node.js 20.x LTS** or higher — [Download](https://nodejs.org/)
- **npm 10.x** or higher (comes with Node.js)

```bash
node --version   # v20.x.x+
npm --version    # 10.x.x+
```

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev          # → http://localhost:3000

# 3. Open in browser
#    Arabic (default): http://localhost:3000/ar
#    English:          http://localhost:3000/en
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build (SSG) |
| `npm start` | Serve production build |
| `npx tsc --noEmit` | TypeScript check |
| `npm audit` | Security audit |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (New York style) |
| Animations | Motion (Framer Motion v12) |
| i18n | next-intl v4 (AR default, EN) |
| Icons | Lucide React |

---

## Project Structure

```
lyore-bio/
├── messages/              # Translation files (ar.json, en.json)
├── public/
│   ├── fonts/             # Self-hosted .woff2 fonts
│   │   ├── playfair-display/
│   │   ├── inter/
│   │   ├── noto-naskh-arabic/
│   │   └── tajawal/
│   └── images/            # Static assets
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout (fonts, meta)
│   │   └── [locale]/      # Locale routes (/ar, /en)
│   │       ├── layout.tsx # Locale layout (RTL/LTR, i18n provider)
│   │       └── page.tsx   # Home page
│   ├── components/
│   │   ├── layout/        # Layout components (LanguageSwitcher)
│   │   ├── sections/      # Page sections (AnimatedTest)
│   │   └── ui/            # shadcn/ui components (Button)
│   ├── data/              # Data files
│   ├── i18n/              # Internationalization config
│   │   ├── navigation.ts  # Locale-aware Link, useRouter
│   │   ├── request.ts     # Server-side locale resolution
│   │   └── routing.ts     # Routing config (locales, default)
│   ├── lib/               # Utilities
│   ├── proxy.ts           # Middleware (locale routing)
│   └── styles/
│       └── globals.css    # Design tokens + Tailwind config
├── components.json        # shadcn/ui config
├── next.config.ts         # Next.js config
├── package.json
└── tsconfig.json
```

---

## Design Tokens

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#550000` | Deep maroon — headings, buttons |
| `--color-secondary` | `#6B1C23` | Secondary maroon |
| `--color-accent` | `#C9A96E` | Champagne gold — dividers, labels |
| `--color-background` | `#FAF7F4` | Warm off-white — page bg |
| `--color-surface` | `#FFFFFF` | Cards, modals |
| `--color-text` | `#0A0A0A` | Body text |

### Fonts
| Locale | Headings | Body |
|--------|----------|------|
| Arabic | Noto Naskh Arabic | Tajawal |
| English | Playfair Display | Inter |

---

## Bilingual Support

- Default locale: **Arabic** (`/ar`, RTL)
- Second locale: **English** (`/en`, LTR)
- Root `/` redirects to `/ar/`
- Language switcher toggles instantly between locales

---

## License

Private — LYORE ABAYA © 2026

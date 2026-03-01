# Implementation Plan: Foundation & Setup

**Branch**: `001-foundation-setup` | **Date**: 2026-02-28 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-foundation-setup/spec.md`

## Summary

Initialize a production-ready Next.js 15 project with TypeScript strict mode, bilingual support (Arabic RTL/English LTR), complete design system implementation, and all necessary tooling for the LYORE ABAYA bio page. This foundation enables immediate feature development with zero configuration overhead.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode), Node.js 20.x LTS  
**Primary Dependencies**: Next.js 15 (App Router), Tailwind CSS v4, next-intl, Motion (Framer Motion v12), shadcn/ui, Lucide React  
**Storage**: N/A (static site, no database)  
**Testing**: Vitest (unit), Playwright (E2E) - to be configured in later phases  
**Target Platform**: Web (Vercel deployment), supports modern browsers (Chrome 90+, Safari 14+, Firefox 88+)  
**Project Type**: Static web application (Next.js with static export capability)  
**Performance Goals**: 
- Development server start < 10 seconds
- Hot module replacement < 1 second
- Build time < 30 seconds
- Font loading < 2 seconds on first visit
- Language switching < 100ms  
**Constraints**: 
- TypeScript strict mode (zero "any" types)
- Zero build errors/warnings
- Lighthouse Performance ≥ 95
- Lighthouse Accessibility ≥ 95
- No horizontal scroll on any device
- All fonts self-hosted (no CDN)  
**Scale/Scope**: Single-page application, 6 components, 2 locales (AR/EN), ~10 design tokens

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Design Token Compliance
✅ **PASS** - All 6 color tokens defined in spec match constitution exactly:
- `--color-primary`: #550000 ✓
- `--color-accent`: #C9A96E ✓
- `--color-background`: #FAF7F4 ✓
- `--color-text`: #0A0A0A ✓
- Plus secondary and surface colors

### Typography Compliance
✅ **PASS** - Font requirements match constitution:
- Playfair Display (EN headings) ✓
- Inter (EN body) ✓
- Noto Naskh Arabic (AR headings) ✓
- Tajawal (AR body) ✓
- All fonts self-hosted as .woff2 files ✓

### Technical Requirements Compliance
✅ **PASS** - All technical gates met:
- TypeScript strict mode required ✓
- Zero "any" types policy ✓
- RTL/LTR logical CSS properties ✓
- Motion animations with prefers-reduced-motion support ✓
- npm run build must pass with 0 errors/warnings ✓

### Design Rules Compliance
✅ **PASS** - Non-negotiable design rules acknowledged:
- border-radius: 0 on all buttons/containers ✓
- No box-shadow anywhere ✓
- Gold (#C9A96E) accent only, never background ✓
- Min tap target: 52px ✓
- Animations: ease-out curves only ✓

### Mobile UX Compliance
✅ **PASS** - Mobile requirements covered:
- Min tap target 52px ✓
- safe-area-inset-bottom for iPhone notch ✓
- No font below 11px ✓
- No horizontal overflow ✓
- Page load < 1.5 seconds ✓

**Constitution Check Result**: ✅ ALL GATES PASSED - Proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/001-foundation-setup/
├── plan.md              # This file
├── research.md          # Phase 0 output (dependency versions, best practices)
├── data-model.md        # Phase 1 output (configuration schemas)
├── quickstart.md        # Phase 1 output (setup instructions)
├── contracts/           # Phase 1 output (TypeScript interfaces)
│   ├── locale-config.ts
│   ├── design-tokens.ts
│   └── font-config.ts
└── tasks.md             # Phase 2 output (NOT created by this command)
```

### Source Code (repository root)

```text
lyore-bio/
├── messages/
│   ├── ar.json          # Arabic translations
│   └── en.json          # English translations
├── public/
│   ├── fonts/           # Self-hosted .woff2 files
│   │   ├── playfair-display/
│   │   ├── inter/
│   │   ├── noto-naskh-arabic/
│   │   └── tajawal/
│   └── images/          # Static assets
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── layout.tsx    # Root layout with dir, fonts, locale
│   │       └── page.tsx      # Home page
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   ├── layout/           # Layout components (future)
│   │   └── sections/         # Page sections (future)
│   ├── data/                 # Static data (future)
│   ├── lib/
│   │   └── utils.ts          # Utility functions
│   └── styles/
│       └── globals.css       # Global styles + design tokens
├── i18n.ts                   # next-intl configuration
├── middleware.ts             # Locale routing middleware
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind + design tokens
├── tsconfig.json             # TypeScript strict configuration
├── components.json           # shadcn/ui configuration
└── package.json              # Dependencies
```

**Structure Decision**: Single Next.js application with App Router. No backend needed (static site). Locale-based routing via `[locale]` dynamic segment. All components co-located in `src/` for simplicity. Self-hosted fonts in `public/fonts/` organized by font family.

## Complexity Tracking

> No constitution violations - this section is not applicable.

**Justification**: The foundation setup adheres to all constitution requirements without exceptions. All design tokens, typography, technical requirements, and mobile UX standards are met.

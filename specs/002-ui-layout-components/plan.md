# Implementation Plan: UI Layout & Components

**Branch**: `002-ui-layout-components` | **Date**: 2026-03-01 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/002-ui-layout-components/spec.md`

---

## Summary

Build the complete visual UI for the LYORE ABAYA bio page: cover section, logo/identity block, action buttons (WhatsApp primary + website disabled), social links row, footer, and language switcher. The page is mobile-first with a 480px max-width centered container for desktop. No i18n text wiring (Phase 4) and no animations (Phase 3) in scope.

---

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode), Node.js 20.x LTS  
**Primary Dependencies**: Next.js 15 (App Router), Tailwind CSS v4, Lucide React, next-intl (routing only), Motion (not yet used — Phase 3)  
**Storage**: None (static page)  
**Target Platform**: Web — iOS Safari 14+, Android Chrome 90+, Desktop Chrome/Firefox/Safari  
**Performance Goals**:
- Page renders in under 1.5 seconds on mobile (3G)
- No layout shift (CLS = 0) during logo overlap rendering
- WhatsApp link opens in under 1 second after tap

**Constraints**:
- TypeScript strict mode (zero `any` types)
- Zero build errors/warnings (`npm run build`)
- `border-radius: 0` on all buttons and the language switcher (non-negotiable)
- No `box-shadow` anywhere
- Gold (`#C9A96E`) used only as accent, never as a background fill
- All images use `next/image` with `fill` + `objectFit: "contain"`
- No horizontal overflow on any viewport (320px–1440px)
- Best-effort accessibility: tap targets ≥ 52px, visible focus states, `aria-disabled` on disabled button
- Language switcher uses `@/i18n/navigation` hooks (not `next/navigation`)

**Scale/Scope**: 5 new components + 1 page update. Single page, no routing changes, no API calls, no state management.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked post-design.*

### Design Token Compliance
✅ **PASS** — All color values map to existing design tokens:
- Cover: `--color-primary` (#550000) ✓
- Accent/dividers: `--color-accent` (#C9A96E) ✓
- Background: `--color-background` (#FAF7F4) ✓
- Text: `--color-text` (#0A0A0A) ✓
- Surface (logo bg): `--color-surface` (#FFFFFF) ✓
- Border: `--color-border` (#0A0A0A1A) ✓

### Typography Compliance
✅ **PASS** — Font sizes match constitution minimums (nothing below 9px for labels, never below 11px for interactive elements):
- Brand name: 1.6rem / Playfair Display ✓
- Tagline: 0.875rem ✓
- Button labels: 0.7rem ✓
- Social labels: 9px (`0.5625rem`) ✓ — within constitution best-effort range
- Footer/section labels: 10px (`0.625rem`) ✓

### Design Rules Compliance
✅ **PASS** — All non-negotiable design rules respected:
- `border-radius: 0` on buttons and language switcher ✓
- No `box-shadow` ✓
- Gold only as accent (divider, section label, hover state) ✓
- Min tap area 52px on all interactive elements ✓
- WhatsApp hover: ease-out 350ms ✓
- Social icon hover: ease-out 300ms ✓

### Mobile UX Compliance
✅ **PASS**:
- No font below 9px ✓
- No horizontal overflow ✓
- Safe-area inset on footer ✓
- Logical CSS positioning (`end-4`) for RTL/LTR ✓

**Constitution Check Result**: ✅ ALL GATES PASSED

---

## Project Structure

### Documentation (this feature)

```text
specs/002-ui-layout-components/
├── plan.md              ← This file
├── research.md          ← Phase 0: 8 implementation decisions
├── data-model.md        ← Phase 1: 7 UI entities with all field values
├── quickstart.md        ← Phase 1: step-by-step developer guide
├── contracts/
│   └── ui-components.ts ← TypeScript prop interfaces + static config
└── tasks.md             ← Phase 2 output (created by /speckit.tasks)
```

### Source Code (this feature adds/modifies)

```text
lyore-bio/src/
├── components/
│   ├── layout/
│   │   └── LanguageSwitcher.tsx    ← EXISTS (Phase 1) — no changes needed
│   └── sections/
│       ├── CoverSection.tsx         ← NEW
│       ├── LogoIdentityBlock.tsx    ← NEW
│       ├── ActionButtons.tsx        ← NEW
│       ├── SocialLinks.tsx          ← NEW
│       └── FooterBlock.tsx          ← NEW
└── app/
    └── [locale]/
        └── page.tsx                 ← MODIFY (replace placeholder)
```

---

## Phase 0: Research Findings

All implementation decisions resolved in [research.md](./research.md). Key decisions:

| Topic | Decision |
|---|---|
| Logo overlap | Negative `margin-top: -45px` (in-flow, no absolute positioning) |
| Desktop container | `max-w-[480px] mx-auto w-full` wrapping all content |
| Disabled button | `<div role="button" aria-disabled="true">` — not `<button disabled>` |
| TikTok/Snapchat icons | Lucide `Music2` / `Ghost` — no second icon library |
| Safe-area footer | `calc(40px + env(safe-area-inset-bottom))` with `viewport-fit=cover` |
| Language switcher position | `end-4` logical CSS — auto-flips for RTL/LTR |
| WhatsApp URL | Pre-encoded Arabic message, static value in contracts |
| Component split | 5 server components + 1 existing client component |

---

## Phase 1: Design & Contracts

### Component Architecture

All 5 new components are **React Server Components** (no `"use client"`). They accept typed props from `contracts/ui-components.ts`. `LanguageSwitcher` remains the only client component (already implemented).

```
page.tsx (server)
  ├── <main max-w-[480px] mx-auto>
  │     ├── <LanguageSwitcher />  (client, fixed)
  │     ├── <CoverSection />
  │     ├── <LogoIdentityBlock brandName tagline logoSrc logoAlt />
  │     ├── <ActionButtons whatsappLabel websiteLabel />
  │     ├── <SocialLinks sectionLabel items[] />
  │     └── <FooterBlock copyrightText craftedText />
```

### Data Flow

All text currently hardcoded in English (translations wired in Phase 4). Social URLs and WhatsApp href pulled from `SOCIAL_PLATFORM_CONFIG` and `WHATSAPP_HREF` constants in `contracts/ui-components.ts` — single source of truth for all external links.

### Key Implementation Notes

1. **Logo image**: Must use `next/image` with `fill` prop inside a `relative` positioned container. The `padding: 10px` on the container constrains the fill area.

2. **Gold divider width animation**: The divider is `w-[40px]` statically in Phase 2. Phase 3 will animate it from `width: 0 → 40px`. The static width is pre-set so Phase 3 only adds `initial/animate` props.

3. **`viewport-fit=cover`**: Must be added to `<head>` metadata in `app/[locale]/layout.tsx` for `env(safe-area-inset-bottom)` to work on notched iPhones.

4. **Image `next.config.ts`**: Verify `images.domains` does not need updating — `/logo.png` is local so no remote config needed.

---

## Complexity Tracking

No constitution violations. All design rules complied with.

**Potential risks**:
- Logo `fill` inside padding container: `position: relative` must be on the inner container, not the outer circle, to respect `padding: 10px`. Use `<div className="relative w-full h-full">` inside the padded circle.
- `env(safe-area-inset-bottom)` requires `<meta name="viewport" content="..., viewport-fit=cover">` in layout.tsx.

---

## Verification Plan

### Automated

```bash
# In lyore-bio/
npm run build    # 0 errors, 0 TypeScript warnings
npm run lint     # 0 ESLint errors
```

### Manual (browser)

| Test | Viewport | Expected |
|---|---|---|
| Full page renders | 375px mobile | All sections visible, no overflow |
| Logo overlaps cover | 375px mobile | Logo circle sits half on cover, half below |
| Desktop centering | 1280px | 480px content column centered, background fills sides |
| WhatsApp button tap | Mobile | Opens wa.me chat in new tab |
| Website button tap | Mobile | Zero response — no navigation |
| Social links × 4 | Mobile | Each opens correct URL in new tab |
| Language switcher tap | Any | Navigates /ar ↔ /en |
| Language switcher scroll | Mobile | Stays fixed at top-end corner |
| RTL layout | /ar | Text right-aligned, switcher on left end |
| LTR layout | /en | Text left-aligned, switcher on right end |
| Safe-area footer | iPhone notch | Footer not hidden behind home bar |

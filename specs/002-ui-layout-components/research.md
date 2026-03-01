# Research: UI Layout & Components

**Branch**: `002-ui-layout-components` | **Date**: 2026-03-01  
**Phase**: 0 — Pre-design research to resolve unknowns before implementation

---

## 1. Logo Overlap Pattern (Cover → Identity)

**Decision**: Use negative `margin-top: -45px` on the logo container to pull it over the cover block edge.  
**Rationale**: Simpler and more reliable than absolute positioning; the logo stays in document flow so elements below it stack naturally without additional offset math.  
**Alternatives considered**:
- Absolute positioning + z-index: works but removes logo from flow, requiring manual spacing for the identity block below.
- CSS `translate`: creates stacking context issues with `overflow: hidden` on the cover.

---

## 2. Desktop Max-Width Centering (480px Container)

**Decision**: Wrap all page content in a single `<main>` element with `max-w-[480px] mx-auto w-full`.  
**Rationale**: Cover block must also be contained (not full-bleed) since it would look disconnected at 1440px if full-width but the logo at 480px. Entire page lives inside the centered container.  
**Alternatives considered**:
- Full-bleed cover + narrow identity/button section: standard on some bio pages, but inconsistent with the solid-block cover design.
- CSS max-width on `<body>`: pollutes the root element; harder to add per-section overrides later.

---

## 3. Disabled Button Implementation

**Decision**: Use `<div>` (not `<button>`) for the website coming-soon element, styled to look like a button.  
**Rationale**: A native `<button>` with `disabled` still receives focus in some browsers. A `<div>` with `aria-disabled="true"` and `role="button"` prevents all interaction natively and satisfies best-effort accessibility.  
**Alternatives considered**:
- `<button disabled>`: simpler but `pointer-events: none` must be added manually in CSS; some assistive tech announces it as "dimmed" which may confuse users.
- `<a>` with no `href`: still focusable via keyboard.

---

## 4. Social Icons Row — Icon Library

**Decision**: Use **Lucide React** icons already installed in Phase 1:  
- Instagram → `Instagram` icon  
- TikTok → No native Lucide icon; use `Music2` as closest alternative  
- Snapchat → No native Lucide icon; use `Ghost` as closest alternative
- Email → `Mail` icon  
**Rationale**: Lucide is already a project dependency. Adding a second icon library for 2 icons adds unnecessary bundle size.  
**Alternatives considered**:
- react-icons: adds ~50KB; overkill for 4 icons.
- Inline SVG: maintainable but verbose; Lucide is cleaner.

---

## 5. Safe-Area Footer Padding

**Decision**: Use CSS `env(safe-area-inset-bottom)` via Tailwind arbitrary value: `pb-[calc(40px+env(safe-area-inset-bottom))]`.  
**Rationale**: Standard approach for iOS Safari notched devices. Requires `viewport-fit=cover` in the Next.js `<head>` metadata viewport config.  
**Alternatives considered**:
- JavaScript-based padding calculation: unnecessary complexity; CSS env() is universally supported.
- Fixed large bottom padding: wastes space on non-notched devices.

---

## 6. Language Switcher — Logical End Positioning

**Decision**: Use Tailwind's `end-4` (CSS `inset-inline-end: 1rem`) for positioning.  
**Rationale**: `end-4` automatically flips to the correct side for RTL (Arabic) and LTR (English) without any JavaScript locale detection in CSS. Works with `dir` attribute on `<html>`.  
**Alternatives considered**:
- `right-4`: hard-coded to right; breaks in RTL — switcher would be on the wrong side.
- JS conditional class: adds unnecessary runtime logic.

---

## 7. WhatsApp URL Encoding

**Decision**: Pre-encoded URL with Arabic message in Phase 2 (even though i18n is Phase 4).  
**Rationale**: The number and message are static brand data, not translated content. Encoding now avoids a regression risk in Phase 4.  
**URL**: `https://wa.me/971502507859?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20LYORE%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA%D9%83%D9%85%20%E2%9C%A8`

---

## 8. Component Breakdown Decision

**Decision**: 7 focused components, all server components except `LanguageSwitcher` (client):

| Component | Type | Responsibility |
|---|---|---|
| `CoverSection` | Server | Maroon cover block |
| `LogoIdentityBlock` | Server | Logo circle + brand name + divider + tagline |
| `ActionButtons` | Server | WhatsApp (primary) + Website (disabled) |
| `SocialLinks` | Server | Section label + 4 icon items |
| `Footer` | Server | Gold line + copyright + crafted line |
| `LanguageSwitcher` | Client | Fixed locale switcher (already exists from Phase 1) |
| `BioPage` (page.tsx) | Server | Orchestrates all sections in the 480px container |

**Rationale**: Small focused components are easier to test and animate independently in Phase 3.

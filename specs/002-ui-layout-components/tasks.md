# Tasks: UI Layout & Components

**Branch**: `002-ui-layout-components` | **Date**: 2026-03-01  
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)  
**Total Tasks**: 18 | **User Stories**: 5

---

## User Story → Task Map

| Story | Priority | Component(s) | Tasks |
|---|---|---|---|
| US1 — Page renders on mobile | P1 | CoverSection, LogoIdentityBlock | T004–T006 |
| US2 — WhatsApp contact | P1 | ActionButtons (primary) | T007–T008 |
| US4 — Social media follows | P1 | SocialLinks, FooterBlock | T009–T011 |
| US3 — Website disabled state | P2 | ActionButtons (disabled variant) | T012 |
| US5 — Language switcher | P2 | LanguageSwitcher (existing) | T013 |

---

## Phase 1: Setup

*Prerequisites needed before any component work.*

- [x] T001 Add `viewport-fit=cover` to the viewport metadata in `lyore-bio/src/app/[locale]/layout.tsx` (required for `env(safe-area-inset-bottom)` on notched iPhones)
- [x] T002 Confirm `logo.png` exists at `lyore-bio/public/logo.png`; if missing, add a white placeholder PNG of 200×200px so all subsequent components can reference it without errors
- [x] T003 Replace the placeholder content in `lyore-bio/src/app/[locale]/page.tsx` with a `<main className="max-w-[480px] mx-auto w-full relative min-h-screen bg-brand-background">` wrapper and import `LanguageSwitcher` as `<LanguageSwitcher />` inside it (fixed, outside flow); leave section slots as `{/* TODO */}` comments

---

## Phase 2: Foundational

*T003 is both setup and foundational — it acts as the scaffold all story phases build into. No additional foundational tasks needed.*

---

## Phase 3: User Story 1 — Visitor Views the Page on Mobile (P1)

**Story Goal**: Full page renders correctly on a 375px mobile viewport — all sections visible, no horizontal overflow.

**Independent Test**: Open `localhost:3000/ar` at 375px viewport width. All sections (cover, logo, brand name, divider, tagline) are visible and nothing overflows horizontally.

- [x] T004 [P] [US1] Create `lyore-bio/src/components/sections/CoverSection.tsx`
- [x] T005 [P] [US1] Create `lyore-bio/src/components/sections/LogoIdentityBlock.tsx`
  - Outer circle: `w-[90px] h-[90px] rounded-full bg-white border border-brand-border -mt-[45px] mx-auto overflow-hidden p-[10px] relative`
  - Inside circle: `<Image src={logoSrc} alt={logoAlt} fill style={{ objectFit: 'contain' }} />`
  - Brand name: `<p className="font-display text-[1.6rem] font-semibold text-center tracking-[0.2em] text-brand-text mt-3">`
  - Gold divider: `<div className="w-[40px] h-px bg-brand-accent mx-auto my-2.5" />`
  - Tagline: `<p className="text-[0.875rem] font-light text-center tracking-[0.04em] text-brand-text/65">`
- [x] T006 [US1] Import `CoverSection` and `LogoIdentityBlock` into `lyore-bio/src/app/[locale]/page.tsx`; render both with hardcoded Arabic text for now; verify logo overlaps cover by 45px

---

## Phase 4: User Story 2 — Visitor Contacts via WhatsApp (P1)

**Story Goal**: Tapping the WhatsApp button opens a WhatsApp chat to 971502507859 in a new tab.

**Independent Test**: Tap the maroon WhatsApp button at `localhost:3000/ar`. A `wa.me` link opens in a new browser tab with the correct number and pre-encoded Arabic message.

- [x] T007 [US2] Create `lyore-bio/src/components/sections/ActionButtons.tsx` — accepts props `{ whatsappLabel, websiteLabel, whatsappHref }` (see `ActionButtonsGroupProps` in contracts); renders:
  - **WhatsApp (primary)**: `<a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 h-14 w-full bg-brand-primary text-white text-[0.7rem] uppercase tracking-widest hover:bg-[#3D0000] transition-colors duration-[350ms]">` with `<IconBrandWhatsapp size={18} />` icon
  - **Website (disabled)**: `<div role="button" aria-disabled="true" aria-label={websiteLabel} className="flex items-center justify-center gap-3 h-14 w-full border border-brand-primary/40 text-brand-primary/40 text-[0.7rem] uppercase tracking-widest cursor-not-allowed pointer-events-none">` with `<IconWorld size={18} className="opacity-40" />` icon
  - Import `WHATSAPP_HREF` from `@/../../specs/002-ui-layout-components/contracts/ui-components` — **CORRECTION**: hardcode `WHATSAPP_HREF` value directly in the component file as a module-level constant (copy from contracts/ui-components.ts)
- [x] T008 [US2] Import `ActionButtons` into `lyore-bio/src/app/[locale]/page.tsx`; render `<ActionButtons whatsappLabel="تواصلي معنا" websiteLabel="الموقع قريباً" whatsappHref={WHATSAPP_HREF} />` after the `LogoIdentityBlock`; add `mt-4 w-full px-5 flex flex-col gap-3` wrapper; verify press state darkens to `#3D0000`

---

## Phase 5: User Story 4 — Visitor Follows on Social Media (P1)

**Story Goal**: Visitor sees 4 social platform icons with labels; tapping each opens the correct external profile in a new tab.

**Independent Test**: At `localhost:3000/ar`, all 4 icons (Instagram, TikTok, Snapchat, Email) are visible with labels. Each opens the correct platform URL in a new tab. Tap targets measure ≥ 52×52px in DevTools.

- [x] T009 [P] [US4] Create `lyore-bio/src/components/sections/SocialLinks.tsx` — accepts `{ sectionLabel, items[] }` (see `SocialLinksProps` in contracts); renders:
  - Section label: `<p className="text-[0.625rem] uppercase tracking-[0.35em] text-brand-accent text-center mt-8 mb-5">`
  - Icons row: `<div className="flex items-center justify-center gap-7">`
  - Each item (`<a>` tag): `group flex flex-col items-center justify-center gap-1.5 min-w-[52px] min-h-[52px]` with `target="_blank" rel="noopener noreferrer"`
  - Icon: `text-brand-text/45 group-hover:text-brand-accent transition-colors duration-300`
  - Label: `text-[9px] uppercase tracking-[0.1em] text-brand-text/35 group-hover:text-brand-accent transition-colors duration-300`
  - Use Tabler icons: `IconBrandInstagram` (Instagram), `IconBrandTiktok` (TikTok), `IconBrandSnapchat` (Snapchat), `IconMail` (Email) — size 24
- [x] T010 [P] [US4] Create `lyore-bio/src/components/sections/FooterBlock.tsx` — accepts `{ copyrightText }` (craftedText is always hardcoded); renders:
  - Wrapper: `<footer className="flex flex-col items-center pt-8 pb-[calc(40px+env(safe-area-inset-bottom))]">`
  - Gold line: `<div className="w-[30px] h-0.5 bg-brand-accent mb-4" />`
  - Copyright: `<p className="text-[10px] uppercase tracking-widest text-brand-text/25 text-center">{copyrightText}</p>`
  - Crafted line: `<p className="text-[10px] text-brand-text/18 text-center mt-1.5">Crafted with care · UAE 🇦🇪</p>`
- [x] T011 [US4] Import `SocialLinks` and `FooterBlock` into `lyore-bio/src/app/[locale]/page.tsx`; define `SOCIAL_ITEMS` array in the page using the 4 platforms from `specs/002-ui-layout-components/contracts/ui-components.ts` `SOCIAL_PLATFORM_CONFIG`; render `<SocialLinks sectionLabel="تابعنا" items={SOCIAL_ITEMS} />` and `<FooterBlock copyrightText="© LYORE ABAYA 2026" />` after the action buttons; verify hover states turn gold

---

## Phase 6: User Story 3 — Website Coming-Soon Disabled State (P2)

**Story Goal**: The website button registers zero interaction — no navigation, no press feedback.

**Independent Test**: At `localhost:3000/ar`, open browser DevTools Event Listeners panel, attempt to tap the website button — confirm no click/touch events fire. Visually confirm 40% opacity on border, text, and icon.

- [x] T012 [US3] In `lyore-bio/src/components/sections/ActionButtons.tsx`, verify the disabled `<div>`: (1) has `pointer-events-none` class, (2) has `aria-disabled="true"`, (3) has `cursor-not-allowed`, (4) border, text, and icon all render at 40% opacity; make any corrections needed; no new file required

---

## Phase 7: User Story 5 — Language Switcher Navigation (P2)

**Story Goal**: Tapping the language switcher navigates from `/ar` → `/en` and back; button is fixed and always visible.

**Independent Test**: At `localhost:3000/ar`, tap the language switcher — browser navigates to `localhost:3000/en`. At `/en`, tap again — navigates back to `/ar`. Scroll the page and verify the switcher stays pinned at the top-end corner.

- [x] T013 [US5] Verify `lyore-bio/src/components/layout/LanguageSwitcher.tsx` is imported and rendered inside the `<main>` container in `page.tsx` (T003 may have already done this); confirm it uses `usePathname` and `useRouter` from `@/i18n/navigation` (not `next/navigation`); confirm navigation between `/ar` and `/en` works; verify fixed positioning stays at `top-4 end-4` on scroll

---

## Phase 8: Polish & Cross-Cutting Concerns

*Final validation pass across all user stories.*

- [ ] T014 [P] Verify no horizontal overflow at 320px, 375px, and 430px viewport widths by opening `localhost:3000/ar` in browser DevTools device toolbar for each width — confirm no horizontal scrollbar appears and all content stays within the viewport
- [ ] T015 [P] Verify desktop centering: open `localhost:3000/ar` at 1280px viewport width — confirm page content is confined to a ~480px center column with the off-white background visible equally on both sides
- [ ] T016 [P] Verify RTL/LTR rendering: `/ar` must show right-aligned text with language switcher on the left; `/en` must show left-aligned text with switcher on the right — check `dir` attribute on `<html>` element in DevTools
- [ ] T017 Run `npm run build` in `lyore-bio/` — fix any TypeScript errors or build warnings until exit code is 0
- [ ] T018 Run `npm run lint` in `lyore-bio/` — fix any ESLint errors until exit code is 0

---

## Dependencies

```
T001 → T003 → T004, T005 (parallel)
T003 → T006 (needs T004, T005)
T006 → T007 → T008
T008 → T009, T010 (parallel)
T009, T010 → T011
T011 → T012
T013 (independent — LanguageSwitcher already exists)
T006, T008, T011, T012, T013 → T014, T015, T016 (parallel polish)
T016 → T017 → T018
```

## Parallel Execution Opportunities

| Session | Parallel Tasks | Prerequisite |
|---|---|---|
| Session A | T004 + T005 | T003 done |
| Session B | T009 + T010 | T008 done |
| Session C | T014 + T015 + T016 | T013 done |

---

## Implementation Strategy

**MVP Scope** (US1 + US2 gives a functional, shippable page):
1. Complete T001–T008 → Page renders with cover, logo, brand name, and working WhatsApp button
2. Add T009–T011 → Social links and footer complete the page
3. T012–T013 → Disabled state + language switching verified
4. T014–T018 → Polish and build validation

**Delivery Order**: Setup → US1 → US2 → US4 → US3 → US5 → Polish

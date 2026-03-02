# Tasks: i18n & Language Switching

**Branch**: `003-i18n-language-switching` | **Date**: 2026-03-02  
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)  
**Total Tasks**: 11 | **User Stories**: 4

---

## User Story → Task Map

| Story | Priority | Component(s) | Tasks |
|---|---|---|---|
| US1 — Arabic content from translations | P1 | page.tsx, ar.json | T001–T004 |
| US2 — English content from translations | P1 | en.json | T005 |
| US3 — RTL/LTR layout verification | P1 | layout.tsx (existing) | T006 |
| US4 — Locale switching updates text | P2 | LanguageSwitcher (existing) | T007 |

---

## Phase 1: Setup

*Update translation files with all required keys.*

- [ ] T001 [P] Update `lyore-bio/messages/ar.json` with all translation keys per data-model.md: add `bio.whatsapp`, `bio.website`, `bio.followUs`, `bio.instagram`, `bio.tiktok`, `bio.snapchat`, `bio.email`, `bio.copyright`; update `bio.brandName` to `"LYORE ABAYA"` and `bio.tagline` to `"حيث تلتقي الأناقة بالاحتشام"`; keep `nav.home` and `nav.switchLang`
- [ ] T002 [P] Update `lyore-bio/messages/en.json` with matching English keys: `bio.brandName` = `"LYORE ABAYA"`, `bio.tagline` = `"Where elegance meets modesty"`, `bio.whatsapp` = `"Chat with Us"`, `bio.website` = `"Website Coming Soon"`, `bio.followUs` = `"Follow Us"`, `bio.instagram` = `"Instagram"`, `bio.tiktok` = `"TikTok"`, `bio.snapchat` = `"Snapchat"`, `bio.email` = `"Email"`, `bio.copyright` = `"© LYORE ABAYA 2026 — All Rights Reserved"`

---

## Phase 2: Foundational

*No additional foundational tasks — translation infrastructure (next-intl, middleware, NextIntlClientProvider) is already in place from Phase 1.*

---

## Phase 3: User Story 1 — Arabic Visitor Sees Full Arabic Content (P1)

**Story Goal**: All visible text on `/ar` comes from `messages/ar.json` — zero hardcoded display strings remain in page.tsx.

**Independent Test**: Open `localhost:3000/ar` and verify tagline, button labels, social labels, section heading, and copyright all display Arabic text sourced from translation keys.

- [ ] T003 [US1] Modify `lyore-bio/src/app/[locale]/page.tsx`: convert `HomePage` to an `async` function; import `getTranslations` from `next-intl/server`; call `const t = await getTranslations('bio');`; replace all hardcoded strings:
  - `brandName="LYORE ABAYA"` → `brandName={t('brandName')}`
  - `tagline="حيث تلتقي الأناقة بالاحتشام"` → `tagline={t('tagline')}`
  - `whatsappLabel="تواصلي معنا"` → `whatsappLabel={t('whatsapp')}`
  - `websiteLabel="الموقع قريباً"` → `websiteLabel={t('website')}`
  - `sectionLabel="تابعنا"` → `sectionLabel={t('followUs')}`
  - `copyrightText="© LYORE ABAYA 2026"` → `copyrightText={t('copyright')}`
- [ ] T004 [US1] In `lyore-bio/src/app/[locale]/page.tsx`, replace the `SOCIAL_ITEMS` array to use translated labels instead of `SOCIAL_PLATFORM_CONFIG.*.arLabel`:
  - Remove the import of `SOCIAL_PLATFORM_CONFIG` from contracts
  - Hardcode the `href` values directly (copied from contracts) or keep the import for URLs only
  - Use `t('instagram')`, `t('tiktok')`, `t('snapchat')`, `t('email')` for labels
  - Update header comment to reflect Phase 4 i18n wiring is complete

---

## Phase 4: User Story 2 — English Visitor Sees Full English Content (P1)

**Story Goal**: Visiting `/en` shows all text in English.

**Independent Test**: Open `localhost:3000/en` and verify tagline reads "Where elegance meets modesty", buttons say "Chat with Us" / "Website Coming Soon", social labels are English, copyright is English.

*No additional code tasks needed — T003/T004 already wire translations, and T002 provides the English keys. This phase is a verification-only checkpoint.*

- [ ] T005 [US2] Verify `localhost:3000/en` displays all English text: tagline, button labels, social labels, section heading, and copyright all come from `messages/en.json`; confirm "Crafted with care · UAE 🇦🇪" remains unchanged

---

## Phase 5: User Story 3 — RTL/LTR Layout Verification (P1)

**Story Goal**: `/ar` renders RTL layout, `/en` renders LTR layout — text alignment, switcher position, and fonts all correct.

**Independent Test**: Toggle between `/ar` and `/en`; inspect `<html>` for `dir` attribute; verify text alignment and language switcher position flip.

- [ ] T006 [US3] Verify RTL/LTR rendering at `localhost:3000`:
  - On `/ar`: `<html dir="rtl" lang="ar">`, text right-aligned, switcher on logical start (left)
  - On `/en`: `<html dir="ltr" lang="en">`, text left-aligned, switcher on logical end (right)
  - On `/ar`: body text renders in Tajawal font (inspect DevTools → Computed → font-family)
  - On `/en`: body text renders in Inter font
  - Both locales: brand name renders in Playfair Display

---

## Phase 6: User Story 4 — Locale Switching Updates All Text (P2)

**Story Goal**: Tapping the language switcher navigates between locales and all visible text updates to the new language.

**Independent Test**: On `/ar`, tap the switcher → verify URL changes to `/en` and all text is English. Tap again → back to `/ar` with Arabic text.

- [ ] T007 [US4] Verify locale switching end-to-end at `localhost:3000/ar`:
  - Tap language switcher → navigates to `/en`
  - All text updates to English (tagline, buttons, social labels, copyright)
  - Tap again → navigates to `/ar`
  - All text updates to Arabic
  - WhatsApp button `href` contains Arabic pre-encoded message on both locales

---

## Phase 7: Polish & Cross-Cutting Concerns

*Final validation pass.*

- [ ] T008 [P] Verify no hardcoded display strings remain in `lyore-bio/src/app/[locale]/page.tsx` — search for any remaining Arabic/English text literals (except `"Crafted with care · UAE 🇦🇪"` and URL constants which are intentionally hardcoded)
- [ ] T009 [P] Verify both `messages/ar.json` and `messages/en.json` have identical key structures (same keys in both files — no missing translations)
- [ ] T010 Run `npm run build` in `lyore-bio/` — fix any TypeScript errors or build warnings until exit code is 0
- [ ] T011 Verify `localhost:3000` at 375px viewport width on both `/ar` and `/en` — no horizontal overflow, no layout breakage after i18n changes

---

## Dependencies

```
T001, T002 (parallel — different files)
T001, T002 → T003 → T004
T004 → T005, T006 (parallel — verification only)
T005, T006 → T007
T007 → T008, T009 (parallel — polish)
T009 → T010 → T011
```

## Parallel Execution Opportunities

| Session | Parallel Tasks | Prerequisite |
|---|---|---|
| Session A | T001 + T002 | None |
| Session B | T005 + T006 | T004 done |
| Session C | T008 + T009 | T007 done |

---

## Implementation Strategy

**MVP Scope** (US1 + US2 = full bilingual page):
1. T001–T004 → Arabic text from translations, social labels translated
2. T005 → English verified
3. T006–T007 → RTL/LTR and switcher verified
4. T008–T011 → Polish and build validation

**Delivery Order**: Setup → Arabic wiring → English verification → RTL/LTR → Switching → Polish

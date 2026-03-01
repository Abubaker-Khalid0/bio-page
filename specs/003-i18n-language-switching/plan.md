# Implementation Plan: i18n & Language Switching

**Branch**: `003-i18n-language-switching` | **Date**: 2026-03-01 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/003-i18n-language-switching/spec.md`

---

## Summary

Wire all hardcoded Arabic text in components through the `next-intl` translation system so that visiting `/ar` shows Arabic and `/en` shows English. Update translation files with complete key sets, modify `page.tsx` to use `getTranslations()`, and verify RTL/LTR layout switching works end-to-end.

---

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode), Node.js 20.x LTS  
**Primary Dependencies**: Next.js 15 (App Router), next-intl v4, Tailwind CSS v4  
**Target Platform**: Web — iOS Safari 14+, Android Chrome 90+, Desktop Chrome/Firefox/Safari

**Constraints**:
- `page.tsx` must stay a Server Component — use `getTranslations()` from `next-intl/server`
- `LanguageSwitcher.tsx` is the only client component — already uses `useLocale()`
- All other components (LogoIdentityBlock, ActionButtons, SocialLinks, FooterBlock) are Server Components that accept text as props
- "Crafted with care · UAE 🇦🇪" is hardcoded by design — never translated
- WhatsApp pre-filled message is always Arabic regardless of locale
- Zero build errors/warnings (`npm run build`)

**Scale/Scope**: 2 JSON files updated + 1 page file modified. No new components, no new dependencies, no API calls.

---

## Proposed Changes

### Translation Files

#### [MODIFY] [ar.json](file:///c:/Users/DELL/Downloads/Bio%20Page/lyore-bio/messages/ar.json)

Replace the current incomplete translation file with all 11 required keys under the `bio` namespace plus existing `nav` keys.

#### [MODIFY] [en.json](file:///c:/Users/DELL/Downloads/Bio%20Page/lyore-bio/messages/en.json)

Replace the current incomplete translation file with all 11 required English keys matching the Arabic key structure.

---

### Page Component

#### [MODIFY] [page.tsx](file:///c:/Users/DELL/Downloads/Bio%20Page/lyore-bio/src/app/%5Blocale%5D/page.tsx)

- Convert to `async` function to use `getTranslations('bio')` from `next-intl/server`
- Replace all hardcoded Arabic strings with `t('key')` calls
- Build `SOCIAL_ITEMS` array using translated labels instead of `SOCIAL_PLATFORM_CONFIG.*.arLabel`
- Remove the import of `SOCIAL_PLATFORM_CONFIG` (labels now come from translations)
- Keep `SocialLinkItemProps` type import for type safety
- Update header comment to reflect Phase 4 completion

---

## Verification Plan

### Automated

```bash
# In lyore-bio/
npm run build    # 0 errors, 0 TypeScript warnings
```

### Manual (browser)

| # | Step | Expected |
|---|---|---|
| 1 | Open `localhost:3000/ar` | All text in Arabic (tagline, buttons, social labels, copyright) |
| 2 | Open `localhost:3000/en` | All text in English |
| 3 | On `/ar`, inspect `<html>` | `dir="rtl"` and `lang="ar"` |
| 4 | On `/en`, inspect `<html>` | `dir="ltr"` and `lang="en"` |
| 5 | On `/ar`, tap language switcher | Navigates to `/en`, all text updates to English |
| 6 | On `/en`, tap language switcher | Navigates to `/ar`, all text updates to Arabic |
| 7 | On `/ar`, check body text font | Tajawal (inspect in DevTools → Computed → font-family) |
| 8 | On `/en`, check body text font | Inter |
| 9 | Check brand name font on both | Playfair Display always |
| 10 | Tap WhatsApp button on `/en` | Opens wa.me with Arabic pre-filled message |

# Research: i18n & Language Switching

**Feature**: `003-i18n-language-switching` | **Date**: 2026-03-01

---

## Decision 1: Server vs Client Component for page.tsx

**Decision**: Keep `page.tsx` as a **Server Component** using `useTranslations` from `next-intl`.

**Rationale**: `next-intl` v4 supports `useTranslations()` in React Server Components via `getTranslations()` from `next-intl/server`. Since `page.tsx` is currently a Server Component and only passes translated strings down as props, there's no need to convert it to a client component. Use `getTranslations()` (async, server-side) instead of `useTranslations()` (client-side).

**Alternatives considered**:
- Convert `page.tsx` to `"use client"` and use `useTranslations()` — rejected because it would lose SSR benefits and increase client bundle size.
- Pass translations via `getStaticProps` — not applicable in App Router.

---

## Decision 2: Translation Key Structure

**Decision**: Use nested JSON with a `bio` namespace: `bio.brandName`, `bio.tagline`, `bio.whatsapp`, etc.

**Rationale**: Existing translation files (`ar.json`, `en.json`) already use `bio` and `nav` namespaces. We extend the `bio` namespace to include all new keys. This keeps translations organized and allows `useTranslations('bio')` scoping.

**Alternatives considered**:
- Flat keys like `whatsappLabel` — rejected; harder to scope and group.
- Deep nesting like `bio.buttons.whatsapp.label` — rejected; overkill for 12 keys.

---

## Decision 3: LanguageSwitcher Text Source

**Decision**: Keep the **inline conditional** (`locale === "ar" ? "EN" : "عربي"`) in `LanguageSwitcher.tsx`.

**Rationale**: The switcher is already a client component using `useLocale()`. The label is a simple 2-value conditional that doesn't benefit from the translation system. Using `useTranslations` here would add an unnecessary dependency for 2 static strings. However, the `aria-label` for accessibility should be translated.

**Alternatives considered**:
- Use `useTranslations('nav')` for the label — acceptable but over-engineered for 2 values.

---

## Decision 4: Social Media Labels Source

**Decision**: Source social labels from **translation files** instead of the contracts config `arLabel`.

**Rationale**: Currently, `page.tsx` hardcodes `SOCIAL_PLATFORM_CONFIG.instagram.arLabel` which only provides Arabic labels. To support English, we move all social labels to the translation files and reference them by key.

**Alternatives considered**:
- Add `enLabel` to `SOCIAL_PLATFORM_CONFIG` — rejected; duplicates data and mixes concerns.

---

## Decision 5: WhatsApp Message per Locale

**Decision**: Keep the WhatsApp pre-filled message **always in Arabic**, regardless of locale.

**Rationale**: Per the spec assumptions, the business operates primarily in Arabic. The WhatsApp number (UAE) expects Arabic messages. The URL-encoded message is a static constant.

**Alternatives considered**:
- Different messages per locale — possible future enhancement but not in scope.

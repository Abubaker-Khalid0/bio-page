# Feature Specification: i18n & Language Switching

**Feature Branch**: `003-i18n-language-switching`  
**Created**: 2026-03-01  
**Status**: Draft  
**Input**: Phase 4 from `docs/implementation_plan.md` — Wire all hardcoded text through the translation system (`useTranslations`), verify RTL/LTR layout switching, locale-specific font rendering, and WhatsApp message encoding for both Arabic and English.

---

## Assumptions

- The foundation for i18n routing (`next-intl`, middleware, locale routes `/ar` and `/en`) is already established (Phase 1).
- All UI components (cover, logo identity, buttons, social links, footer, language switcher) are already built with hardcoded Arabic text (Phase 2).
- Entrance animations are already implemented using the Motion library (Phase 3).
- The translation file structure (`messages/ar.json` and `messages/en.json`) already exists but needs additional keys to cover all page content.
- The brand name "LYORE ABAYA" is the same in both languages — it is a proper noun that does not translate.
- The footer line "Crafted with care · UAE 🇦🇪" is hardcoded and identical in both languages.
- Font switching per locale is already configured in the layout (Phase 1): Arabic uses Tajawal for body text, English uses Inter, and Playfair Display is used for the brand name in both locales.
- The WhatsApp pre-filled message is always in Arabic (regardless of locale), since the business operates primarily in Arabic.
- The existing `LanguageSwitcher` component already navigates between `/ar` and `/en` — this spec focuses on wiring the **text content** to translations.
- Social platform URLs are identical in both locales — only the labels change.

---

## User Scenarios & Testing

### User Story 1 — Arabic Visitor Sees Full Arabic Content (Priority: P1)

As an **Arabic-speaking visitor**, I want to see all page text in Arabic when viewing the `/ar` route, so that I can understand the brand and take action in my native language.

**Why this priority**: Arabic is the default locale and the primary audience.

**Independent Test**: Open `/ar` and verify every visible text element (tagline, buttons, social labels, section title, copyright) displays Arabic content from the translation file.

**Acceptance Scenarios**:

1. **Given** I visit `/ar`, **When** the page renders, **Then** the tagline displays "حيث تلتقي الأناقة بالاحتشام"
2. **Given** I visit `/ar`, **When** I look at the buttons, **Then** the WhatsApp button says "تواصلي معنا" and the website button says "الموقع قريباً"
3. **Given** I visit `/ar`, **When** I see the social links section, **Then** the section label says "تابعنا" and each platform has its Arabic label (انستغرام, تيك توك, سناب, ايميل)
4. **Given** I visit `/ar`, **When** I see the footer, **Then** the copyright reads "© LYORE ABAYA 2026 — جميع الحقوق محفوظة"
5. **Given** I visit `/ar`, **When** I see the language switcher, **Then** it displays "EN"

---

### User Story 2 — English Visitor Sees Full English Content (Priority: P1)

As an **English-speaking visitor**, I want to see all page text in English when viewing the `/en` route, so that I can understand the brand without knowing Arabic.

**Why this priority**: English expands the brand's reach to non-Arabic speakers.

**Independent Test**: Open `/en` and verify every visible text element displays English content from the translation file.

**Acceptance Scenarios**:

1. **Given** I visit `/en`, **When** the page renders, **Then** the tagline displays "Where elegance meets modesty"
2. **Given** I visit `/en`, **When** I look at the buttons, **Then** the WhatsApp button says "Chat with Us" and the website button says "Website Coming Soon"
3. **Given** I visit `/en`, **When** I see the social links section, **Then** the section label says "Follow Us" and each platform has its English label (Instagram, TikTok, Snapchat, Email)
4. **Given** I visit `/en`, **When** I see the footer, **Then** the copyright reads "© LYORE ABAYA 2026 — All Rights Reserved"
5. **Given** I visit `/en`, **When** I see the language switcher, **Then** it displays "عربي"

---

### User Story 3 — RTL and LTR Layouts Render Correctly (Priority: P1)

As a **visitor**, I want the text direction and layout to match the active language, so that reading feels natural.

**Why this priority**: Incorrect text direction makes the page unreadable for that language.

**Independent Test**: Toggle between `/ar` and `/en` and verify text alignment, icon order, and switcher position change correctly.

**Acceptance Scenarios**:

1. **Given** I visit `/ar`, **When** I inspect the `<html>` element, **Then** `dir="rtl"` and `lang="ar"` are set
2. **Given** I visit `/en`, **When** I inspect the `<html>` element, **Then** `dir="ltr"` and `lang="en"` are set
3. **Given** I am on `/ar`, **When** I look at text alignment, **Then** text-aligned content is right-aligned and the language switcher is on the left (logical start)
4. **Given** I am on `/en`, **When** I look at text alignment, **Then** text-aligned content is left-aligned and the language switcher is on the right (logical end)
5. **Given** I am on `/ar`, **When** I view the body text, **Then** it renders in Tajawal font
6. **Given** I am on `/en`, **When** I view the body text, **Then** it renders in Inter font
7. **Given** either locale, **When** I view the brand name, **Then** it always renders in Playfair Display

---

### User Story 4 — Locale Switching Preserves Experience (Priority: P2)

As a **visitor**, I want to switch languages and see the new language immediately without losing my place, so that switching is seamless.

**Why this priority**: Seamless switching improves user trust and experience.

**Independent Test**: On `/ar`, tap the language switcher, verify URL changes to `/en` and all content shows English. Tap again and verify it returns to `/ar` with Arabic content.

**Acceptance Scenarios**:

1. **Given** I am on `/ar`, **When** I tap the language switcher, **Then** I navigate to `/en` and all visible text updates to English
2. **Given** I am on `/en`, **When** I tap the language switcher, **Then** I navigate to `/ar` and all visible text updates to Arabic
3. **Given** I switch locales, **When** the new page loads, **Then** the text direction and font family update to match the new locale

---

### Edge Cases

- What if a translation key is missing from a locale file? → The translation key ID is displayed as fallback text, making it obvious and debuggable.
- What if the visitor's browser language is neither Arabic nor English? → They are redirected to `/ar` (the default locale).
- What if the WhatsApp pre-filled message contains special characters? → The message is URL-encoded to handle Arabic and emoji characters correctly.
- What if the brand name needs to differ between languages? → The brand name is a translation key, allowing it to be customized per locale if needed in the future.

---

## Requirements

### Functional Requirements

- **FR-001**: All visible text on the page MUST come from translation files (`messages/ar.json` and `messages/en.json`) — no hardcoded user-facing text in component code, except "Crafted with care · UAE 🇦🇪" which is hardcoded by design
- **FR-002**: The translation files MUST include keys for: brand name, tagline, WhatsApp button label, website button label, social section label, individual social platform labels (×4), copyright text, and language switcher label
- **FR-003**: Components MUST use `useTranslations()` hook from `next-intl` to access translated strings
- **FR-004**: The `<html>` element MUST have `dir="rtl"` and `lang="ar"` when the locale is Arabic
- **FR-005**: The `<html>` element MUST have `dir="ltr"` and `lang="en"` when the locale is English
- **FR-006**: Body text MUST render in Tajawal for Arabic and Inter for English; brand name MUST always use Playfair Display
- **FR-007**: The WhatsApp button `href` MUST contain the pre-encoded Arabic greeting message regardless of the active locale
- **FR-008**: The language switcher MUST display "EN" on the Arabic route and "عربي" on the English route
- **FR-009**: Tapping the language switcher MUST navigate from the current locale to the alternate locale (`/ar` ↔ `/en`)
- **FR-010**: The language switcher position MUST use logical CSS (`end-4`) to automatically flip between left and right based on text direction
- **FR-011**: All social link labels MUST be translated per locale (Arabic labels for `/ar`, English labels for `/en`)
- **FR-012**: The social section heading (e.g., "تابعنا" / "Follow Us") MUST be translated per locale

### Key Entities

- **Translation File** (`messages/{locale}.json`): Contains all translatable strings keyed by a dot-notation path (e.g., `bio.tagline`)
- **Translated Component**: A React component that uses `useTranslations()` to render locale-specific text instead of hardcoded strings
- **Locale**: Either `ar` (Arabic, RTL, default) or `en` (English, LTR)

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: 100% of user-facing text (except the hardcoded footer craft line) is sourced from translation files — zero hardcoded display strings remain in component code
- **SC-002**: Visiting `/ar` shows all text in Arabic with RTL alignment; visiting `/en` shows all text in English with LTR alignment
- **SC-003**: Switching between `/ar` and `/en` via the language switcher updates all visible text in under 2 seconds
- **SC-004**: The `<html>` element's `dir` attribute correctly reflects the active locale on both routes
- **SC-005**: Arabic body text renders in Tajawal and English body text renders in Inter — verifiable by font inspection in browser DevTools
- **SC-006**: The WhatsApp link contains the correctly URL-encoded Arabic message on both the `/ar` and `/en` routes
- **SC-007**: All 12 translatable strings (brand name, tagline, 2 button labels, section label, 4 social labels, copyright, language switcher label, WhatsApp message) are present in both locale files

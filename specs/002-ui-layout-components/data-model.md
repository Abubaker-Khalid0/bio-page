# Data Model: UI Layout & Components

**Branch**: `002-ui-layout-components` | **Date**: 2026-03-01

---

## Entities

### 1. `CoverBlock`

The full-width maroon header block at the top of the page.

| Field | Type | Value | Constraint |
|---|---|---|---|
| `height` | `string` | `35vh` | Minimum `200px` always enforced |
| `minHeight` | `number` | `200` | px units |
| `backgroundColor` | `string` | `#550000` | Must match `--color-primary` token |

**State**: Static — no interactions, no state transitions.

---

### 2. `LogoContainer`

Circular frame that overlaps the cover block bottom edge.

| Field | Type | Value | Constraint |
|---|---|---|---|
| `size` | `number` | `90` | px; applied as both width and height |
| `borderRadius` | `string` | `50%` | Must be circular |
| `backgroundColor` | `string` | `#FFFFFF` | Must match `--color-surface` |
| `borderColor` | `string` | `#0A0A0A1A` | 10% opacity black |
| `borderWidth` | `number` | `1.5` | px |
| `padding` | `number` | `10` | px; prevents logo from touching edges |
| `marginTop` | `number` | `-45` | px; negative to overlap cover |
| `logoSrc` | `string` | `/logo.png` | Must exist in `public/` |
| `logoAlt` | `string` | `LYORE` | Non-empty, localized in Phase 4 |

**State**: Static.

---

### 3. `BrandIdentity`

Text group below the logo: brand name, gold divider, tagline.

| Field | Type | Value | Constraint |
|---|---|---|---|
| `brandName` | `string` | `LYORE ABAYA` | Uppercase; Playfair Display font |
| `brandNameSize` | `string` | `1.6rem` | Matches `--text-brand` |
| `brandNameWeight` | `number` | `600` | — |
| `brandNameLetterSpacing` | `string` | `0.2em` | — |
| `dividerWidth` | `number` | `40` | px |
| `dividerHeight` | `number` | `1` | px |
| `dividerColor` | `string` | `#C9A96E` | Matches `--color-accent` |
| `tagline` | `string` | AR/EN text | From translation keys |
| `taglineSize` | `string` | `0.875rem` | — |
| `taglineWeight` | `number` | `300` | — |
| `taglineOpacity` | `number` | `0.65` | Applied to `--color-text` |

**State**: Static.

---

### 4. `ActionButton`

Represents either the primary (WhatsApp) or disabled (website) button.

| Field | Type | Value/Options | Constraint |
|---|---|---|---|
| `label` | `string` | Translation key | Non-empty |
| `icon` | `LucideIcon` | `MessageCircle` \| `Globe` | From Lucide React |
| `iconSize` | `number` | `18` | px |
| `variant` | `"primary" \| "disabled"` | — | Determines all visual properties |
| `href` | `string \| null` | WhatsApp URL \| `null` | null for disabled variant |
| `target` | `"_blank" \| null` | — | null for disabled variant |
| `height` | `number` | `56` | px; applies to both variants |
| `width` | `string` | `100%` | Full container width |
| `borderRadius` | `number` | `0` | **Non-negotiable** per constitution |

**State transitions**:
- `primary`: `default` → `hover/press` (background darkens from `#550000` to `#3D0000`, 350ms ease-out)
- `disabled`: single state, no transitions, `pointer-events: none`

---

### 5. `SocialLinkItem`

A single entry in the social links row.

| Field | Type | Value | Constraint |
|---|---|---|---|
| `platform` | `"instagram" \| "tiktok" \| "snapchat" \| "email"` | — | Exactly 4 items |
| `icon` | `LucideIcon` | See research.md §4 | From Lucide React |
| `iconSize` | `number` | `24` | px |
| `label` | `string` | Translation key | Non-empty |
| `labelSize` | `string` | `0.5625rem` | `9px` |
| `labelLetterSpacing` | `string` | `0.1em` | — |
| `href` | `string` | Platform URL | See URL table below |
| `target` | `string` | `_blank` | Always |
| `rel` | `string` | `noopener noreferrer` | Always |
| `minTapArea` | `number` | `52` | px; applied as min-width and min-height |
| `defaultColor` | `string` | `#0A0A0A at 45%` | Icon; label at 35% |
| `hoverColor` | `string` | `#C9A96E` | Both icon and label; 300ms ease-out |

**Platform URLs**:

| Platform | URL |
|---|---|
| Instagram | `https://instagram.com/lyoreabaya` |
| TikTok | `https://tiktok.com/@lyoreabaya` |
| Snapchat | `https://snapchat.com/add/lyoreabaya` |
| Email | `mailto:info@lyoreabaya.com` |

**State transitions**: `default` → `hover` (color shifts to gold, 300ms ease-out)

---

### 6. `FooterBlock`

Bottom section with brand close elements.

| Field | Type | Value | Constraint |
|---|---|---|---|
| `accentLineWidth` | `number` | `30` | px |
| `accentLineHeight` | `number` | `0.5` | px |
| `accentLineColor` | `string` | `#C9A96E` | Matches `--color-accent` |
| `copyrightText` | `string` | `© LYORE ABAYA 2026` | Translation key |
| `copyrightSize` | `string` | `0.625rem` | `10px` |
| `copyrightOpacity` | `number` | `0.25` | Applied to `--color-text` |
| `craftedText` | `string` | `Crafted with care · UAE 🇦🇪` | Hardcoded, not translated |
| `craftedSize` | `string` | `0.625rem` | `10px` |
| `craftedOpacity` | `number` | `0.18` | Applied to `--color-text` |
| `paddingTop` | `number` | `32` | px |
| `paddingBottom` | `string` | `calc(40px + env(safe-area-inset-bottom))` | Safe-area aware |

**State**: Static.

---

### 7. `LanguageSwitcher`

Fixed locale toggle button (already implemented from Phase 1).

| Field | Type | Value | Constraint |
|---|---|---|---|
| `currentLocale` | `"ar" \| "en"` | — | From `useLocale()` |
| `targetLocale` | `"ar" \| "en"` | Opposite of current | — |
| `label` | `string` | `"EN"` or `"عربي"` | — |
| `position` | `string` | `fixed top-4 end-4` | Logical end respects RTL |
| `zIndex` | `number` | `50` | Above all content |
| `backgroundColor` | `string` | `#FFFFFF` | — |
| `height` | `number` | `34` | px |
| `paddingX` | `number` | `14` | px |
| `paddingY` | `number` | `6` | px |
| `fontSize` | `string` | `0.6875rem` | `11px` |
| `borderRadius` | `number` | `0` | **Non-negotiable** per constitution |

**State transitions**: Hover → opacity shift on text (300ms).  
**Navigation**: Tap → route to `/{targetLocale}` via `useRouter()` from `@/i18n/navigation`.

---

## Page Layout Entity

### `BioPageLayout`

The root composition wrapping all sections.

| Field | Type | Value | Constraint |
|---|---|---|---|
| `maxWidth` | `number` | `480` | px; `mx-auto w-full` centering |
| `backgroundColor` | `string` | `#FAF7F4` | Full viewport via `<body>` |
| `direction` | `"rtl" \| "ltr"` | Locale-driven | AR → rtl, EN → ltr |
| `fontFamily` | `string` | Locale-driven | AR → Tajawal/Naskh, EN → Inter/Playfair |

---

## Relationships

```
BioPageLayout
  └── LanguageSwitcher (fixed, outside flow)
  └── CoverBlock
  └── LogoContainer
        └── Logo image
  └── BrandIdentity
        └── Brand name
        └── Gold divider
        └── Tagline
  └── ActionButtons
        └── ActionButton (primary: WhatsApp)
        └── ActionButton (disabled: Website)
  └── SocialLinks
        └── Section label
        └── SocialLinkItem × 4
  └── FooterBlock
```

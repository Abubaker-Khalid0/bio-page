# Data Model: i18n & Language Switching

**Feature**: `003-i18n-language-switching` | **Date**: 2026-03-01

---

## Entity: Translation File

**Location**: `messages/{locale}.json`  
**Format**: Nested JSON with namespace scoping

### Schema

```json
{
  "bio": {
    "brandName":    "string — Brand display name",
    "tagline":      "string — Brand tagline below logo",
    "whatsapp":     "string — WhatsApp button label",
    "website":      "string — Disabled website button label",
    "followUs":     "string — Social links section heading",
    "instagram":    "string — Instagram platform label",
    "tiktok":       "string — TikTok platform label",
    "snapchat":     "string — Snapchat platform label",
    "email":        "string — Email platform label",
    "copyright":    "string — Footer copyright line"
  },
  "nav": {
    "home":         "string — Home page label (reserved)",
    "switchLang":   "string — Language switcher label"
  }
}
```

### Instances

**Arabic (`messages/ar.json`)**:

| Key | Value |
|---|---|
| bio.brandName | LYORE ABAYA |
| bio.tagline | حيث تلتقي الأناقة بالاحتشام |
| bio.whatsapp | تواصلي معنا |
| bio.website | الموقع قريباً |
| bio.followUs | تابعنا |
| bio.instagram | انستغرام |
| bio.tiktok | تيك توك |
| bio.snapchat | سناب |
| bio.email | ايميل |
| bio.copyright | © LYORE ABAYA 2026 — جميع الحقوق محفوظة |
| nav.switchLang | EN |

**English (`messages/en.json`)**:

| Key | Value |
|---|---|
| bio.brandName | LYORE ABAYA |
| bio.tagline | Where elegance meets modesty |
| bio.whatsapp | Chat with Us |
| bio.website | Website Coming Soon |
| bio.followUs | Follow Us |
| bio.instagram | Instagram |
| bio.tiktok | TikTok |
| bio.snapchat | Snapchat |
| bio.email | Email |
| bio.copyright | © LYORE ABAYA 2026 — All Rights Reserved |
| nav.switchLang | عربي |

---

## Entity: Locale

| Field | Type | Values |
|---|---|---|
| code | string | `"ar"` \| `"en"` |
| direction | `"rtl"` \| `"ltr"` | `ar` → `rtl`, `en` → `ltr` |
| bodyFont | string | `ar` → Tajawal, `en` → Inter |
| displayFont | string | Playfair Display (both) |
| isDefault | boolean | `ar` → true, `en` → false |

---

## Non-Translatable Constants

| Value | Reason |
|---|---|
| `"Crafted with care · UAE 🇦🇪"` | Hardcoded by design — brand signature |
| WhatsApp URL | Static URL with pre-encoded Arabic message |
| Social platform URLs | External URLs — identical in both locales |
| Logo `src` and `alt` | Asset path and brand name |

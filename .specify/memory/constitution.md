<!--
SYNC IMPACT REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Version Change: [TEMPLATE] → 1.0.0
Type: MAJOR (Initial constitution establishment)
Date: 2026-02-28

Modified Principles:
- Replaced generic template with complete LYORE ABAYA Bio Page specification
- Established 11 core design & technical principles
- Added comprehensive component specifications
- Defined i18n, animation, and mobile UX requirements

Added Sections:
✅ Project Overview (name, purpose, stack)
✅ Design Tokens (colors, typography, spacing)
✅ Page Layout (structure, section order)
✅ Component Specifications (6 detailed components)
✅ i18n Translations (AR/EN)
✅ Animation Specification (Motion/Framer)
✅ File Structure
✅ Links & Contact Data
✅ Mobile UX Requirements
✅ Technical Requirements
✅ Out of Scope

Templates Requiring Updates:
✅ .specify/templates/plan-template.md - Verify alignment with design principles
✅ .specify/templates/spec-template.md - Ensure scope matches constitution constraints
✅ .specify/templates/tasks-template.md - Align task categories with component structure
⚠ .agent/workflows/*.md - Review for consistency with project-specific guidance

Follow-up TODOs:
- None - All placeholders resolved
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-->

# 📜 LYORE ABAYA — Bio Page Constitution

**Version**: 1.0.0  
**Project**: lyore-bio  
**Last Updated**: February 2026  
**Status**: Ready for Development

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 1. PROJECT OVERVIEW

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Name**: LYORE BIO  
**Type**: Standalone Link-in-Bio Web Page  
**Purpose**: Single link placed in Instagram, TikTok, and Snapchat bio for LYORE ABAYA brand  
**Primary Goal**: Guide visitor to WhatsApp or Website in under 3 seconds  
**Audience**: Arabic-speaking modest fashion customers in UAE and GCC — arriving from social media  
**Deployment**: Vercel  
**Domain**: bio.lyore.com

**Stack**:
- Framework: Next.js 15 (App Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS v4
- Animation: Motion (Framer Motion v12)
- i18n: next-intl (AR default + EN)
- Icons: Lucide React

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 2. DESIGN TOKENS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Colors**:
- `--color-primary`: #550000 (deep maroon — cover bg, primary button)
- `--color-accent`: #C9A96E (champagne gold — dividers, labels)
- `--color-background`: #FAF7F4 (warm off-white — page background)
- `--color-text`: #0A0A0A (near black — body text)
- `--color-white`: #FFFFFF (logo bg, button text)
- `--color-border`: #0A0A0A1A (black at 10% — subtle borders)

**Typography**:
- `--font-display`: "Playfair Display" — brand name, headings
- `--font-body`: "Inter" — all other text
- `--font-ar`: "Tajawal" — Arabic body text

**Font Sizes**:
- `--text-brand`: 2.4rem (LYORE ABAYA name)
- `--text-tagline`: 0.95rem (bio/tagline)
- `--text-button`: 0.75rem (button labels)
- `--text-label`: 0.625rem (section labels like "تابعنا")
- `--text-footer`: 0.625rem (copyright)

**Spacing Scale**:
- `--space-xs`: 8px
- `--space-sm`: 16px
- `--space-md`: 24px
- `--space-lg`: 32px
- `--space-xl`: 48px

**Design Rules (NEVER break these)**:
1. border-radius: 0 on ALL buttons and containers
2. No box-shadow anywhere on the page
3. Gold (#C9A96E) is accent only — never a background fill
4. Buttons ghost by default — fill solid on tap/hover
5. Min tap target height: 52px (Apple HIG)
6. All animations: ease-out curves only, never bounce
7. Whitespace is intentional — generous spacing always

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 3. PAGE LAYOUT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Type**: Single page, single vertical scroll  
**Routing**: No subpages — app/[locale]/page.tsx only  
**Max Width**: 430px — centered on desktop  
**Full width on mobile**  
**Background**: #FAF7F4 (entire page)  
**Overflow**: No horizontal scroll under any circumstance

**Desktop treatment**:
- Page content centered at 430px max-width
- Sides: very subtle vignette or plain #FAF7F4
- No desktop-specific layout changes — mobile design scales up as-is

**Section order (top → bottom)**:
1. Language Switcher ← fixed top-right
2. Cover Section ← maroon color block
3. Logo + Name + Bio ← identity block
4. Action Buttons ← WhatsApp + Website
5. Social Links ← 4 platform icons
6. Footer ← copyright

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 4. COMPONENT SPECIFICATIONS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 4.1 LANGUAGE SWITCHER

**Position**: Fixed, top-right corner (top: 16px, right: 16px)  
In RTL: top-left corner (top: 16px, left: 16px)  
**Z-index**: 50 (always on top)

**Style**:
- Background: white
- Border: 1px solid #0A0A0A at 15%
- Padding: 6px 14px
- Height: 34px
- Corners: border-radius: 0 (sharp)

**Content**:
- AR mode: shows "EN" text → clicking switches to English
- EN mode: shows "عربي" text → clicking switches to Arabic

**Typography**:
- Font: Inter, 11px, letter-spacing: 0.15em, uppercase
- Color: #0A0A0A at 70%

**Behavior**:
- On switch to EN: Page direction: LTR, All text switches to English, Language button moves to top-left (logical end)
- On switch to AR: Page direction: RTL, All text switches to Arabic, Language button moves to top-right (logical end)

**Animation**:
- Button: opacity 0→1 scale 0.95→1 on mount, 300ms ease-out
- Text swap: crossfade 200ms

### 4.2 COVER SECTION

**Height**: 35vh (min: 200px)  
**Width**: 100%  
**Background**: #550000 (solid deep maroon — NO image)  
**Content**: Empty — pure color block

Serves as the visual anchor/header of the page.  
Bottom edge: No border, transitions directly into white background of logo section below.

### 4.3 LOGO + NAME + BIO BLOCK

This block overlaps the cover by half the logo height.  
The logo circle sits half in cover, half in white.

**[LOGO CIRCLE]**
- Shape: Circle (border-radius: 50%)
- Size: 90px × 90px
- Background: #FFFFFF
- Border: 1.5px solid #0A0A0A at 15%
- Position: Centered horizontally, translateY(-45px) — overlaps cover by 45px
- Content: Brand logo image (PNG with transparent bg), object-fit: contain, padding: 10px inside circle
- Shadow: none

**[BRAND NAME]**
- Text: "LYORE ABAYA"
- Font: Playfair Display, 1.6rem, font-weight: 600
- Color: #0A0A0A
- Tracking: letter-spacing: 0.2em
- Alignment: centered
- Margin-top: 12px (below logo circle)

**[GOLD DIVIDER LINE]**
- Width: 40px
- Height: 1px
- Color: #C9A96E
- Alignment: centered
- Margin: 10px auto

**[BIO / TAGLINE]**
- AR text: "حيث تلتقي الأناقة بالاحتشام"
- EN text: "Where elegance meets modesty"
- Font: Tajawal (AR) / Inter (EN)
- Size: 0.875rem
- Weight: 300 (light)
- Color: #0A0A0A at 65%
- Tracking: letter-spacing: 0.04em
- Alignment: centered
- Margin-top: 8px
- Container padding below bio: 28px

### 4.4 ACTION BUTTONS

**Container**: padding 0 28px, gap 12px between buttons

**[BUTTON 1 — WhatsApp (PRIMARY)]**
- Background: #550000
- Text color: #FFFFFF
- Border: none
- Height: 56px
- Width: 100%
- Corners: border-radius: 0 (sharp — strictly)
- Content (flex row, centered):
  - Icon: WhatsApp icon, color: #FFFFFF, size: 18px
  - Gap: 10px
  - Text AR: "تواصلي معنا"
  - Text EN: "Chat with Us"
  - Font: Inter/Tajawal, 0.7rem, letter-spacing: 0.2em, uppercase
- On tap/hover: background darkens to #3D0000, transition: 350ms ease
- Action: opens WhatsApp
- URL: https://wa.me/971502507859?text=مرحباً LYORE، أود الاستفسار عن منتجاتكم ✨
- Opens in new tab

**[BUTTON 2 — Website (SECONDARY)]**
- Background: transparent
- Text color: #550000
- Border: 1.5px solid #550000
- Height: 56px
- Width: 100%
- Corners: border-radius: 0 (sharp — strictly)
- Content (flex row, centered):
  - Icon: Globe icon (Lucide), size: 18px
  - Gap: 10px
  - Text AR: "الموقع قريباً"
  - Text EN: "Website Coming Soon"
  - Font: same as Button 1
- State: visually active but shows "coming soon" — NOT disabled (still tappable, no action yet) OR shows a subtle tooltip "قريباً 🤍" on tap
- On tap/hover: background fills #550000, text turns white, transition: 400ms ease

### 4.5 SOCIAL LINKS

**Section label**:
- Text AR: "تابعنا"
- Text EN: "Follow Us"
- Font: Inter, 0.625rem, letter-spacing: 0.35em, uppercase
- Color: #C9A96E
- Align: centered
- Margin: 32px top, 20px bottom

**Icons row**:
- Layout: flex row, centered, gap: 28px
- 4 icons (in order AR right→left / EN left→right):
  1. Instagram → https://instagram.com/lyoreabaya
  2. TikTok → https://tiktok.com/@lyoreabaya
  3. Snapchat → https://snapchat.com/add/lyoreabaya
  4. Email → mailto:info@lyoreabaya.com

**Each icon item (flex column, centered)**:
- Icon: size 24px, color: #0A0A0A at 45%
- Label: platform name below icon, font: 9px, #0A0A0A at 35%, letter-spacing: 0.1em, uppercase
- Gap: 6px between icon and label
- Tap area: min 52px × 52px
- On tap/hover: icon color → #C9A96E (champagne gold), label color → #C9A96E, transition: 300ms ease
- All links: open in new tab (_blank + noopener noreferrer)

### 4.6 FOOTER

**Padding**: 32px top, 40px bottom + env(safe-area-inset-bottom) for iPhone notch

**Gold hairline**:
- Width: 30px, Height: 0.5px
- Color: #C9A96E
- Align: centered, margin-bottom: 16px

**Line 1**:
- Text AR: "© LYORE ABAYA 2026 — جميع الحقوق محفوظة"
- Text EN: "© LYORE ABAYA 2026 — All Rights Reserved"
- Font: 10px, uppercase, letter-spacing: 0.2em
- Color: #0A0A0A at 25%
- Align: centered

**Line 2**:
- Text: "Crafted with care · UAE 🇦🇪"
- Font: 10px
- Color: #0A0A0A at 18%
- Align: centered
- Margin: 6px top

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 5. i18n — TRANSLATIONS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Default locale**: ar (RTL)  
**Second locale**: en (LTR)

**Locale routing**:
- /ar → Arabic (default, redirected from /)
- /en → English

**messages/ar.json keys**:
- bio.brandName: "LYORE ABAYA"
- bio.tagline: "حيث تلتقي الأناقة بالاحتشام"
- bio.whatsapp: "تواصلي معنا"
- bio.website: "الموقع قريباً"
- bio.followUs: "تابعنا"
- bio.instagram: "انستغرام"
- bio.tiktok: "تيك توك"
- bio.snapchat: "سناب"
- bio.email: "ايميل"
- bio.copyright: "© LYORE ABAYA 2026 — جميع الحقوق محفوظة"
- bio.langSwitch: "EN"

**messages/en.json keys**:
- bio.brandName: "LYORE ABAYA"
- bio.tagline: "Where elegance meets modesty"
- bio.whatsapp: "Chat with Us"
- bio.website: "Website Coming Soon"
- bio.followUs: "Follow Us"
- bio.instagram: "Instagram"
- bio.tiktok: "TikTok"
- bio.snapchat: "Snapchat"
- bio.email: "Email"
- bio.copyright: "© LYORE ABAYA 2026 — All Rights Reserved"
- bio.langSwitch: "عربي"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 6. ANIMATION SPECIFICATION

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Library**: Motion (Framer Motion v12)  
**All curves**: ease-out only  
**prefers-reduced-motion**: if true → opacity transitions only, skip all y/scale transforms

**Page load sequence (staggered entrance)**:
- Step 1 — Cover block: opacity 0→1, 500ms, delay 0ms
- Step 2 — Logo circle: scale 0.85→1 + opacity 0→1, 600ms, delay 200ms
- Step 3 — Brand name: y: 12→0 + opacity 0→1, 600ms, delay 350ms
- Step 4 — Gold line: width 0→40px, 400ms, delay 500ms
- Step 5 — Tagline: opacity 0→1, 500ms, delay 620ms
- Step 6 — WhatsApp button: y: 16→0 + opacity 0→1, 500ms, delay 750ms
- Step 7 — Website button: y: 16→0 + opacity 0→1, 500ms, delay 850ms
- Step 8 — "تابعنا" label: opacity 0→1, 400ms, delay 950ms
- Step 9 — Instagram icon: y: 10→0 + opacity 0→1, 400ms, delay 1050ms
- Step 10 — TikTok icon: y: 10→0 + opacity 0→1, 400ms, delay 1120ms
- Step 11 — Snapchat icon: y: 10→0 + opacity 0→1, 400ms, delay 1190ms
- Step 12 — Email icon: y: 10→0 + opacity 0→1, 400ms, delay 1260ms
- Step 13 — Footer: opacity 0→1, 300ms, delay 1400ms
- Step 14 — Lang switcher: opacity 0→1 scale 0.9→1, 400ms, delay 300ms

**Total sequence**: ~1.7 seconds — unhurried, editorial

**Language switch transition**:
- All text elements: opacity 1→0→1 over 300ms
- Direction change (RTL↔LTR): smooth layout shift

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 7. FILE STRUCTURE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
lyore-bio/
├── messages/
│   ├── ar.json
│   └── en.json
├── public/
│   └── logo.png          ← brand logo (transparent bg)
├── src/
│   └── app/
│       └── [locale]/
│           ├── layout.tsx     ← sets dir, font, locale
│           └── page.tsx       ← entire bio page
├── i18n.ts
├── middleware.ts              ← locale routing
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

Single component file — no subcomponents needed.  
Everything lives in page.tsx for simplicity.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 8. LINKS & CONTACT DATA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**WhatsApp**: +971 50 250 7859  
https://wa.me/971502507859  
WhatsApp message (AR): "مرحباً LYORE، أود الاستفسار عن منتجاتكم ✨"

**Website**: Coming Soon (no URL yet)

**Instagram**: https://instagram.com/lyoreabaya  
**TikTok**: https://tiktok.com/@lyoreabaya  
**Snapchat**: https://snapchat.com/add/lyoreabaya  
**Email**: info@lyoreabaya.com

All external links: target="_blank" rel="noopener noreferrer"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 9. MOBILE UX REQUIREMENTS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Every tappable element minimum height: 52px  
✅ Bottom padding uses safe-area-inset-bottom (iPhone notch)  
✅ No font size below 11px  
✅ No horizontal overflow ever  
✅ Page loads under 1.5 seconds  
✅ Single lightweight asset: logo.png (max 80kb, WebP preferred)  
✅ Tested on: iPhone Safari, Android Chrome

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 10. TECHNICAL REQUIREMENTS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ TypeScript strict — zero "any" types  
✅ All text via useTranslations() — no hardcoded strings  
✅ RTL/LTR via logical CSS (start-*, end-*, ms-*, me-*)  
✅ Motion animations respect useReducedMotion()  
✅ npm run build passes with 0 errors, 0 warnings  
✅ Lighthouse Mobile: Performance ≥ 95, Accessibility ≥ 95

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 11. OUT OF SCOPE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✗ No analytics or tracking  
✗ No contact form  
✗ No dark mode  
✗ No loading screen  
✗ No cookie banner  
✗ No subpages  
✗ No product listings  
✗ No backend or API calls

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Governance

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This constitution defines the complete design and technical specification for the LYORE ABAYA bio page. All implementation work MUST adhere to:

1. Design tokens and visual rules (Section 2) — non-negotiable
2. Component specifications (Section 4) — exact measurements and behaviors
3. Animation timing and curves (Section 6) — no deviations
4. Mobile UX requirements (Section 9) — accessibility and performance standards
5. Technical requirements (Section 10) — code quality gates

**Amendment Process**:
- Design token changes require stakeholder approval
- Component specification updates must maintain visual consistency
- Technical requirement changes must not compromise performance or accessibility
- All amendments increment version according to semantic versioning

**Compliance Review**:
- Pre-deployment: Lighthouse audit (Performance ≥ 95, Accessibility ≥ 95)
- Visual QA: Test on iPhone Safari and Android Chrome
- Code review: TypeScript strict mode, zero warnings
- Animation review: Verify ease-out curves and reduced-motion support

**Version**: 1.0.0 | **Ratified**: 2026-02-28 | **Last Amended**: 2026-02-28

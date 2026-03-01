# Quickstart: UI Layout & Components

**Branch**: `002-ui-layout-components` | **Date**: 2026-03-01

---

## Prerequisites

- Phase 1 (`001-foundation-setup`) fully merged to `main`
- `npm run dev` runs without errors at `localhost:3000`
- `logo.png` placed in `lyore-bio/public/logo.png`

---

## What This Phase Builds

The complete visual page for LYORE ABAYA's bio page — no i18n wiring, no animations yet. After this phase, the page is pixel-perfect on mobile and desktop.

---

## New Files to Create

```text
lyore-bio/src/
├── components/
│   ├── sections/
│   │   ├── CoverSection.tsx          # Maroon header block
│   │   ├── LogoIdentityBlock.tsx     # Logo + brand name + divider + tagline
│   │   ├── ActionButtons.tsx         # WhatsApp (primary) + Website (disabled)
│   │   ├── SocialLinks.tsx           # "Follow Us" label + 4 social icons
│   │   └── FooterBlock.tsx           # Gold line + copyright + crafted line
```

> `LanguageSwitcher.tsx` already exists in `src/components/layout/`. No changes needed there.

---

## Files to Update

```text
lyore-bio/src/app/[locale]/page.tsx   # Replace placeholder content with BioPage layout
```

---

## Step-by-Step

### 1. Create `CoverSection.tsx`

A single `<div>` with:
- `h-[35vh] min-h-[200px] w-full`
- `bg-brand-primary`

### 2. Create `LogoIdentityBlock.tsx`

- Circular container: `w-[90px] h-[90px] rounded-full bg-white border border-brand-border -mt-[45px] mx-auto overflow-hidden p-[10px]`
- Inside: `<Image src="/logo.png" alt="LYORE" fill style={{ objectFit: "contain" }} />`
- Brand name: `font-display text-[1.6rem] font-semibold text-center tracking-[0.2em] text-brand-text mt-3`
- Gold divider: `w-[40px] h-px bg-brand-accent mx-auto my-2.5`
- Tagline: `text-[0.875rem] font-light text-center tracking-[0.04em] text-brand-text/65`

### 3. Create `ActionButtons.tsx`

**WhatsApp (primary)**:
- `<a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">`
- `flex items-center justify-center gap-3 h-14 w-full bg-brand-primary text-white text-[0.7rem] uppercase tracking-widest hover:bg-[#3D0000] transition-colors duration-[350ms]`
- Icon: `<MessageCircle size={18} />`

**Website (disabled)**:
- `<div role="button" aria-disabled="true">`
- `flex items-center justify-center gap-3 h-14 w-full border border-brand-primary/40 text-brand-primary/40 text-[0.7rem] uppercase tracking-widest cursor-not-allowed`
- Icon: `<Globe size={18} className="opacity-40" />`

### 4. Create `SocialLinks.tsx`

Section label:
- `text-[0.625rem] uppercase tracking-[0.35em] text-brand-accent text-center mt-8 mb-5`

Icons row:
- `flex items-center justify-center gap-7`

Each item (`<a>` tag):
- `flex flex-col items-center gap-1.5 min-w-[52px] min-h-[52px] justify-center`
- Icon: `size-6 text-brand-text/45 group-hover:text-brand-accent transition-colors duration-300`
- Label: `text-[9px] uppercase tracking-[0.1em] text-brand-text/35 group-hover:text-brand-accent transition-colors duration-300`

Icons to use (Lucide): `Instagram`, `Music2` (TikTok), `Ghost` (Snapchat), `Mail` (Email)

### 5. Create `FooterBlock.tsx`

```text
pt-8 pb-[calc(40px+env(safe-area-inset-bottom))]

Gold line:    w-[30px] h-0.5 bg-brand-accent mx-auto mb-4
Copyright:    text-[10px] uppercase tracking-widest text-brand-text/25 text-center
Crafted:      text-[10px] text-brand-text/18 text-center mt-1.5
```

### 6. Update `page.tsx`

Replace placeholder with:

```tsx
<main className="max-w-[480px] mx-auto w-full relative">
  <LanguageSwitcher />
  <CoverSection />
  <div className="flex flex-col items-center px-5 gap-3">
    <LogoIdentityBlock ... />
    <ActionButtons ... />
    <SocialLinks ... />
    <FooterBlock ... />
  </div>
</main>
```

---

## Verification

```bash
# In lyore-bio/
npm run dev

# Check:
# 1. http://localhost:3000/ar — full Arabic page renders
# 2. http://localhost:3000/en — same page (untranslated yet)
# 3. Resize to 375px — no horizontal overflow
# 4. Open DevTools → 1280px — content centered in 480px column
# 5. Tap WhatsApp button — opens wa.me link in new tab
# 6. Tap Website button — nothing happens
# 7. Tap language switcher — navigates between /ar and /en
# 8. Check 4 social icons open correct URLs in new tab
```

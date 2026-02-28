# 📋 LYORE BIO — Implementation Plan
Version: 1.0
Last Updated: February 2026
File: docs/implementation_plan.md

---

## 🎯 Project Overview

A standalone luxury Link-in-Bio page for LYORE ABAYA.
Single page, mobile-first, bilingual (AR/EN), deployed on Vercel.
Stack: Next.js 15 + TypeScript + Tailwind CSS v4 + Motion + next-intl

---

## 📐 Confirmed Scope Decisions

| Decision | Value |
|---|---|
| Cover | Solid maroon #550000 — no image |
| Logo | PNG file provided by developer |
| Website button | Disabled visually — no action on tap |
| Language | UI first → i18n second |
| Deployment | Vercel via GitHub |
| Routing | /ar (default) + /en |

---

## 🏗️ Phase 1 — Foundation & Setup
**Duration:** 30 minutes
**Goal:** Project runs locally with zero errors

### Tasks
- [ ] 1.1 Initialize Next.js 15
```bash
npx create-next-app@latest lyore-bio \
  --typescript --tailwind --app --src-dir \
  --import-alias "@/*"
 1.2 Install dependencies

bash
npm install motion next-intl
npm install lucide-react
 1.3 Configure Tailwind CSS v4
Define CSS variables in src/app/globals.css:

css
:root {
  --color-primary:    #550000;
  --color-accent:     #C9A96E;
  --color-background: #FAF7F4;
  --color-text:       #0A0A0A;
  --color-white:      #FFFFFF;
}
 1.4 Configure next-intl
Create i18n.ts in root:

ts
import {getRequestConfig} from 'next-intl/server';
export default getRequestConfig(async ({locale}) => ({
  messages: (await import(`../messages/${locale}.json`)).default
}));
 1.5 Create middleware.ts for locale routing:

ts
import createMiddleware from 'next-intl/middleware';
export default createMiddleware({
  locales: ['ar', 'en'],
  defaultLocale: 'ar'
});
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
 1.6 Configure self-hosted fonts via next/font:

Playfair Display (brand name)

Inter (EN body)

Tajawal (AR body)

 1.7 Add logo file:
Place logo.png in /public/logo.png

 1.8 Create folder structure:


lyore-bio/
├── messages/
│   ├── ar.json
│   └── en.json
├── public/
│   └── logo.png
├── src/
│   └── app/
│       └── [locale]/
│           ├── layout.tsx
│           └── page.tsx
├── i18n.ts
├── middleware.ts
├── next.config.ts
└── tailwind.config.ts
 1.9 Create messages/ar.json:

json
{
  "bio.brandName":  "LYORE ABAYA",
  "bio.tagline":    "حيث تلتقي الأناقة بالاحتشام",
  "bio.whatsapp":   "تواصلي معنا",
  "bio.website":    "الموقع قريباً",
  "bio.followUs":   "تابعنا",
  "bio.instagram":  "انستغرام",
  "bio.tiktok":     "تيك توك",
  "bio.snapchat":   "سناب",
  "bio.email":      "ايميل",
  "bio.copyright":  "© LYORE ABAYA 2026 — جميع الحقوق محفوظة",
  "bio.langSwitch": "EN"
}
 1.10 Create messages/en.json:

json
{
  "bio.brandName":  "LYORE ABAYA",
  "bio.tagline":    "Where elegance meets modesty",
  "bio.whatsapp":   "Chat with Us",
  "bio.website":    "Website Coming Soon",
  "bio.followUs":   "Follow Us",
  "bio.instagram":  "Instagram",
  "bio.tiktok":     "TikTok",
  "bio.snapchat":   "Snapchat",
  "bio.email":      "Email",
  "bio.copyright":  "© LYORE ABAYA 2026 — All Rights Reserved",
  "bio.langSwitch": "عربي"
}
✅ Phase 1 Exit Criteria

npm run dev runs without errors

/ar route loads (blank page is fine)

/en route loads

Fonts render correctly

🎨 Phase 2 — UI Layout & Components
Duration: 2–3 hours
Goal: Full page UI complete, pixel-perfect, no i18n yet

Tasks
 2.1 Create app/[locale]/layout.tsx

Sets dir="rtl" or dir="ltr" based on locale

Applies correct font family per locale

Sets <html lang={locale}>

Background color: #FAF7F4

 2.2 Build Language Switcher
Position: fixed top, logical end (end-4 top-4), z-50
Style:


background: white
border: 1px solid #0A0A0A1A
padding: 6px 14px
height: 34px
border-radius: 0 (sharp)
font: Inter 11px uppercase tracking-widest
Behavior: links to /en or /ar (next-intl Link)
Animation: opacity 0→1, scale 0.9→1, 400ms delay 300ms

 2.3 Build Cover Section


height: 35vh (min 200px)
width: 100%
background: #550000
No content inside — pure maroon block.

 2.4 Build Logo + Identity Block
Logo circle:


size: 90px × 90px
border-radius: 50%
background: white
border: 1.5px solid #0A0A0A1A
margin-top: -45px (overlaps cover)
mx-auto
overflow: hidden
padding: 10px
Inside: <Image src="/logo.png" alt="LYORE" fill object-fit="contain" />

Brand name below:


font: Playfair Display, 1.6rem, weight 600
color: #0A0A0A
letter-spacing: 0.2em
text-align: center
margin-top: 12px
Gold divider:


width: 40px, height: 1px
background: #C9A96E
margin: 10px auto
Tagline:


font: Tajawal (AR) / Inter (EN), 0.875rem, weight 300
color: #0A0A0A at 65%
text-align: center
letter-spacing: 0.04em
 2.5 Build Action Buttons

WhatsApp button (PRIMARY):


background: #550000
color: white
height: 56px, width: 100%
border-radius: 0
font: 0.7rem uppercase tracking-widest
icon: MessageCircle (Lucide) white 18px
hover/tap: background → #3D0000, transition 350ms
href: https://wa.me/971502507859?text=...
target: _blank
Website button (SECONDARY / DISABLED):


background: transparent
border: 1.5px solid #550000 at 40% opacity
color: #550000 at 40% opacity
height: 56px, width: 100%
border-radius: 0
font: same as primary
icon: Globe (Lucide) 18px at 40% opacity
cursor: not-allowed
pointer-events: none
NO hover effect
 2.6 Build Social Links Section

Section label:


font: Inter 0.625rem uppercase letter-spacing: 0.35em
color: #C9A96E
text-align: center
margin-top: 32px, margin-bottom: 20px
Icons row (flex, centered, gap: 28px):
Each icon item:


display: flex flex-col items-center
min tap area: 52px × 52px
icon: 24px, color: #0A0A0A at 45%
label: 9px uppercase letter-spacing 0.1em, #0A0A0A at 35%
gap: 6px between icon and label
hover/tap: icon + label → #C9A96E, transition 300ms
target: _blank rel="noopener noreferrer"
Platforms:


Instagram → https://instagram.com/lyoreabaya
TikTok    → https://tiktok.com/@lyoreabaya
Snapchat  → https://snapchat.com/add/lyoreabaya
Email     → mailto:info@lyoreabaya.com
 2.7 Build Footer


padding-top: 32px
padding-bottom: 40px + env(safe-area-inset-bottom)

Gold line: 30px × 0.5px, #C9A96E, centered, mb-4

Line 1: © LYORE ABAYA 2026
        10px uppercase tracking-widest
        #0A0A0A at 25%

Line 2: Crafted with care · UAE 🇦🇪
        10px, #0A0A0A at 18%
        margin-top: 6px
✅ Phase 2 Exit Criteria

Full page renders correctly on mobile (375px)

Logo overlaps cover correctly

Both buttons display correctly

Disabled state on website button visible

All 4 social icons show with labels

Footer renders at bottom

✨ Phase 3 — Animations
Duration: 1 hour
Goal: All entrance animations working smoothly

Tasks
 3.1 Install and configure Motion
Wrap page content in Motion components

 3.2 Add useReducedMotion() check:

ts
const prefersReduced = useReducedMotion();
const animate = prefersReduced 
  ? { opacity: 1 } 
  : { opacity: 1, y: 0 };
 3.3 Implement full entrance sequence:

Step	Element	Animation	Duration	Delay
1	Cover block	opacity 0→1	500ms	0ms
2	Logo circle	scale 0.85→1 + opacity 0→1	600ms	200ms
3	Brand name	y:12→0 + opacity 0→1	600ms	350ms
4	Gold line	width 0→40px	400ms	500ms
5	Tagline	opacity 0→1	500ms	620ms
6	WhatsApp btn	y:16→0 + opacity 0→1	500ms	750ms
7	Website btn	y:16→0 + opacity 0→1	500ms	850ms
8	"تابعنا" label	opacity 0→1	400ms	950ms
9	Instagram	y:10→0 + opacity 0→1	400ms	1050ms
10	TikTok	y:10→0 + opacity 0→1	400ms	1120ms
11	Snapchat	y:10→0 + opacity 0→1	400ms	1190ms
12	Email	y:10→0 + opacity 0→1	400ms	1260ms
13	Footer	opacity 0→1	300ms	1400ms
14	Lang switcher	scale 0.9→1 + opacity 0→1	400ms	300ms
All easing: ease-out only. Total: ~1.7 seconds.

 3.4 Add hover/tap micro-interactions:

Social icons: color shift to gold on hover

WhatsApp button: darken on tap

Language switcher: opacity shift on hover

✅ Phase 3 Exit Criteria

All elements appear in correct sequence

Animations feel smooth and unhurried

prefers-reduced-motion works correctly

No janky layout shifts during animation

🌐 Phase 4 — i18n & Language Switcher
Duration: 1 hour
Goal: Full AR/EN switching with RTL/LTR

Tasks
 4.1 Replace all hardcoded text with useTranslations()

ts
const t = useTranslations();
// usage:
<p>{t('bio.tagline')}</p>
 4.2 Language switcher navigation:

AR → click → navigate to /en

EN → click → navigate to /ar

Uses next-intl <Link> with locale prop

 4.3 Verify RTL/LTR switching:

dir="rtl" on AR: text right-aligned,
icons order right→left

dir="ltr" on EN: text left-aligned,
icons order left→right

Language switcher position flips correctly
(logical end-4 handles this automatically)

 4.4 Font switching per locale:

AR: Tajawal for body text

EN: Inter for body text

Playfair Display always for brand name

 4.5 WhatsApp message encoding:

ts
const message = encodeURIComponent(
  'مرحباً LYORE، أود الاستفسار عن منتجاتكم ✨'
);
const url = `https://wa.me/971502507859?text=${message}`;
✅ Phase 4 Exit Criteria

/ar renders full Arabic, RTL layout

/en renders full English, LTR layout

Language switcher toggles correctly

All text comes from translation files

WhatsApp URL encodes Arabic correctly

🚀 Phase 5 — Deployment
Duration: 30 minutes
Goal: Live on Vercel at bio.lyore.com

Tasks
 5.1 Final build check:

bash
npm run build
Zero errors, zero TypeScript warnings.

 5.2 Push to GitHub:

bash
git add .
git commit -m "feat: LYORE Bio Page complete"
git push origin main
 5.3 Connect GitHub repo to Vercel:

Go to vercel.com → New Project

Import GitHub repo lyore-bio

Framework: Next.js (auto-detected)

Deploy

 5.4 Configure custom domain on Vercel:

Add domain: bio.lyore.com

Vercel provides DNS records

 5.5 Add subdomain on Hostinger:

Go to Hostinger DNS settings

Add CNAME record:


Name:  bio
Value: cname.vercel-dns.com
 5.6 Verify SSL (HTTPS) — Vercel handles automatically

 5.7 Test live on:

iPhone Safari (AR + EN)

Android Chrome (AR + EN)

Desktop Chrome

✅ Phase 5 Exit Criteria

https://bio.lyore.com loads correctly

HTTPS active (green lock)

AR and EN both work on live URL

WhatsApp button opens correctly on mobile

All social links open correctly

📅 Timeline
Phase	Task	Duration
Phase 1	Foundation & Setup	30 min
Phase 2	UI Layout & Components	2–3 hours
Phase 3	Animations	1 hour
Phase 4	i18n & Language Switcher	1 hour
Phase 5	Deployment	30 min
Total	Complete Bio Page	~6 hours
🚫 Out of Scope
✗ No analytics or tracking
✗ No contact form
✗ No dark mode
✗ No loading screen
✗ No cookie banner
✗ No subpages or routing beyond /ar and /en
✗ No backend or API calls
✗ No product listings


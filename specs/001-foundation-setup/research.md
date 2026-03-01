# Research: Foundation & Setup

**Feature**: 001-foundation-setup  
**Date**: 2026-02-28  
**Phase**: 0 (Outline & Research)

## Overview

This document consolidates research findings for setting up a Next.js 15 project with TypeScript, bilingual support, and a complete design system. All technical decisions are documented with rationale and alternatives considered.

---

## 1. Next.js 15 + App Router Setup

### Decision
Use Next.js 15.0.x with App Router architecture, initialized via `create-next-app@latest` with TypeScript and Tailwind CSS flags.

### Rationale
- App Router is the recommended approach for new Next.js projects (stable since 13.4)
- Built-in support for React Server Components reduces client bundle size
- File-based routing with `[locale]` dynamic segments simplifies i18n
- Automatic code splitting and optimized font loading via `next/font`
- Vercel deployment is seamless with App Router

### Alternatives Considered
- **Pages Router**: Deprecated pattern, lacks RSC support, more complex i18n setup
- **Remix**: Excellent framework but less mature ecosystem for static export
- **Astro**: Great for content sites but overkill for single-page bio

### Best Practices
- Enable `output: 'export'` in `next.config.ts` for static site generation
- Use `generateStaticParams` for locale routes to pre-render both AR and EN
- Leverage `next/font/local` for self-hosted fonts with automatic optimization
- Configure `trailingSlash: true` for consistent routing on static hosts

### References
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)

---

## 2. TypeScript Strict Mode Configuration

### Decision
Enable all strict mode flags in `tsconfig.json` with zero tolerance for `any` types.

### Rationale
- Catches type errors at compile time, reducing runtime bugs
- Improves IDE autocomplete and refactoring safety
- Constitution requirement: "TypeScript strict — zero 'any' types"
- Better documentation through type signatures

### Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false
  }
}
```

### Alternatives Considered
- **Loose mode**: Faster initial development but accumulates technical debt
- **Gradual strictness**: Inconsistent codebase, harder to maintain standards

### Best Practices
- Use `satisfies` operator for type narrowing without widening
- Prefer `unknown` over `any` when type is truly unknown
- Use type guards for runtime type checking
- Leverage discriminated unions for state management

---

## 3. Tailwind CSS v4 + Design Tokens

### Decision
Use Tailwind CSS v4 with CSS variables for design tokens, configured in `globals.css` and `tailwind.config.ts`.

### Rationale
- Tailwind v4 has improved CSS variable support and smaller runtime
- CSS variables enable dynamic theming and easier token management
- Constitution specifies exact color values that map cleanly to CSS vars
- Utility-first approach reduces CSS bundle size
- Excellent RTL support via logical properties plugin

### Design Token Implementation
```css
/* globals.css */
:root {
  --color-primary: #550000;
  --color-secondary: #6B1C23;
  --color-accent: #C9A96E;
  --color-background: #FAF7F4;
  --color-surface: #FFFFFF;
  --color-text: #0A0A0A;
  --color-border: #0A0A0A1A;
  
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 32px;
  --space-xl: 48px;
}
```

### Alternatives Considered
- **Vanilla CSS**: More verbose, no utility classes, harder to maintain consistency
- **CSS Modules**: Good encapsulation but requires more boilerplate
- **Styled Components**: Runtime overhead, not ideal for static sites

### Best Practices
- Use `@layer` directives to organize custom utilities
- Leverage `theme.extend` in config to preserve default Tailwind values
- Use logical properties (`start`, `end`, `ms`, `me`) for RTL support
- Configure `content` paths to include all component directories for tree-shaking

### References
- [Tailwind CSS v4 Beta](https://tailwindcss.com/docs/v4-beta)
- [CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)

---

## 4. next-intl for Bilingual Support

### Decision
Use `next-intl` v3.x for internationalization with Arabic (RTL) as default and English (LTR) as secondary locale.

### Rationale
- Best-in-class i18n library for Next.js App Router
- Built-in support for RTL/LTR direction switching
- Type-safe translation keys with TypeScript
- Automatic locale detection and routing via middleware
- Minimal bundle size impact (tree-shakeable)

### Configuration Strategy
```typescript
// i18n.ts
export const locales = ['ar', 'en'] as const;
export const defaultLocale = 'ar';

// middleware.ts
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});
```

### Alternatives Considered
- **next-i18next**: Older library, Pages Router focused, more complex setup
- **react-intl**: More verbose API, lacks Next.js-specific optimizations
- **Custom solution**: Reinventing the wheel, higher maintenance burden

### Best Practices
- Store translations in `messages/{locale}.json` for easy management
- Use `useTranslations()` hook for client components
- Use `getTranslations()` for server components
- Namespace translations by feature (e.g., `bio.brandName`)
- Configure `localeDetection: false` to prevent automatic redirects

### References
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [App Router Integration Guide](https://next-intl-docs.vercel.app/docs/getting-started/app-router)

---

## 5. Self-Hosted Fonts Strategy

### Decision
Download font files as .woff2 format, store in `public/fonts/`, and load via `next/font/local`.

### Rationale
- Clarification answer: "Self-hosted local files"
- Better performance: no external DNS lookup or CDN latency
- Privacy compliant: no data sent to Google Fonts
- Offline development: works without internet connection
- Full control over font loading strategy and fallbacks

### Font Sources
- **Playfair Display**: [Google Fonts](https://fonts.google.com/specimen/Playfair+Display) → download .woff2
- **Inter**: [rsms.me/inter](https://rsms.me/inter/) → download variable font .woff2
- **Noto Naskh Arabic**: [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Naskh+Arabic) → download .woff2
- **Tajawal**: [Google Fonts](https://fonts.google.com/specimen/Tajawal) → download .woff2

### Implementation Pattern
```typescript
// app/[locale]/layout.tsx
import localFont from 'next/font/local';

const playfairDisplay = localFont({
  src: '../../../public/fonts/playfair-display/playfair-display.woff2',
  variable: '--font-display',
  display: 'swap',
  weight: '400 600 700'
});
```

### Alternatives Considered
- **Google Fonts CDN**: Rejected per clarification (privacy concerns, external dependency)
- **Fontsource npm packages**: Adds unnecessary build complexity
- **System fonts only**: Doesn't meet constitution's brand identity requirements

### Best Practices
- Use variable fonts when available to reduce file count
- Include only needed weights (400, 600, 700 for this project)
- Set `display: 'swap'` to prevent FOIT (Flash of Invisible Text)
- Configure fallback fonts: `Arial` for English, system Arabic font for Arabic
- Preload critical fonts in layout for faster initial render

### References
- [next/font Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Web Font Best Practices](https://web.dev/font-best-practices/)

---

## 6. Motion (Framer Motion v12) for Animations

### Decision
Use Motion (Framer Motion v12) for all animations with ease-out curves and `prefers-reduced-motion` support.

### Rationale
- Constitution specifies Motion (Framer Motion v12) explicitly
- Declarative animation API integrates well with React
- Built-in support for `prefers-reduced-motion` media query
- Excellent performance with hardware acceleration
- Stagger animations and layout animations out of the box

### Animation Strategy
```typescript
// Example: Staggered entrance animation
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.75, ease: 'easeOut' }}
>
  {/* WhatsApp button */}
</motion.div>
```

### Alternatives Considered
- **CSS animations**: Less flexible, harder to coordinate complex sequences
- **GSAP**: More powerful but heavier bundle size, overkill for this project
- **React Spring**: Physics-based animations don't match constitution's ease-out requirement

### Best Practices
- Use `useReducedMotion()` hook to detect user preference
- Fallback to opacity-only transitions when reduced motion is enabled
- Keep animation durations under 1 second for perceived performance
- Use `layout` prop for automatic layout animations
- Leverage `AnimatePresence` for exit animations

### References
- [Motion Documentation](https://motion.dev/)
- [Framer Motion Accessibility](https://www.framer.com/motion/accessibility/)

---

## 7. shadcn/ui Component Library

### Decision
Install shadcn/ui and configure with project design tokens for consistent UI components.

### Rationale
- Copy-paste component library (no runtime dependency)
- Full control over component code and styling
- Built on Radix UI primitives (accessible by default)
- Integrates seamlessly with Tailwind CSS
- Easy to customize with design tokens

### Configuration
```json
// components.json
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### Alternatives Considered
- **Headless UI**: Good primitives but requires more custom styling
- **Chakra UI**: Runtime CSS-in-JS overhead, not ideal for static sites
- **Material UI**: Heavy bundle size, opinionated design system

### Best Practices
- Install components individually to keep bundle size minimal
- Customize component styles to match constitution design tokens
- Use `cn()` utility for conditional class merging
- Leverage Radix UI primitives for accessibility

### References
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)

---

## 8. Tailwind RTL Plugin

### Decision
Use `tailwindcss-rtl` plugin for automatic RTL/LTR layout switching based on `dir` attribute.

### Rationale
- Automatically converts directional utilities (left/right) to logical properties
- Works seamlessly with next-intl's direction switching
- No manual RTL class management needed
- Reduces CSS duplication and maintenance burden

### Configuration
```javascript
// tailwind.config.ts
import rtl from 'tailwindcss-rtl';

export default {
  plugins: [rtl],
  // ...
};
```

### Alternatives Considered
- **Manual logical properties**: Error-prone, requires discipline across team
- **Separate RTL stylesheet**: Doubles CSS bundle size, harder to maintain
- **CSS `dir()` selector**: Limited browser support, verbose syntax

### Best Practices
- Use logical properties in custom CSS: `margin-inline-start` instead of `margin-left`
- Test both RTL and LTR layouts in development
- Use Tailwind's `start-*` and `end-*` utilities instead of `left-*` and `right-*`
- Set `dir` attribute on `<html>` element in layout based on locale

### References
- [tailwindcss-rtl Plugin](https://github.com/20lives/tailwindcss-rtl)
- [CSS Logical Properties Guide](https://rtlstyling.com/posts/rtl-styling)

---

## 9. Lucide React Icons

### Decision
Use `@tabler/icons-react@^3.37.1` for all icon components (WhatsApp, Globe, social media icons).

### Rationale
- Lightweight icon library (tree-shakeable, only imports used icons)
- 5000+ icons with consistent stroke-based design system
- React components with TypeScript support
- Easy to customize size, color, and stroke width via props
- No SVG sprite management needed

### Usage Pattern
```typescript
import { IconBrandWhatsapp, IconWorld, IconBrandInstagram } from '@tabler/icons-react';

<IconBrandWhatsapp size={18} color="#FFFFFF" />
```

### Alternatives Considered
- **React Icons**: Larger bundle, inconsistent icon styles across packs
- **Heroicons**: Good but smaller icon set
- **Custom SVGs**: More work to maintain, no tree-shaking

### Best Practices
- Import icons individually to enable tree-shaking
- Use `size` prop for consistent sizing (18px for buttons, 24px for social)
- Use `strokeWidth` prop to match brand aesthetic
- Wrap icons in semantic elements for accessibility

### References
- [Tabler Icons React Documentation](https://tabler.io/icons)

---

## 10. npm Audit for Security Scanning

### Decision
Run `npm audit` after dependency installation and fail build if high/critical vulnerabilities found.

### Rationale
- Clarification answer: "Yes, with npm audit"
- Built into npm, zero additional setup
- Catches known vulnerabilities in dependencies
- Constitution requirement: "npm audit reports 0 high or critical vulnerabilities"
- Industry best practice for production applications

### Implementation
```json
// package.json scripts
{
  "scripts": {
    "postinstall": "npm audit --audit-level=high",
    "audit:fix": "npm audit fix"
  }
}
```

### Alternatives Considered
- **Snyk**: More comprehensive but requires external service and API key
- **Dependabot**: GitHub-specific, not portable across platforms
- **Manual review**: Not scalable, easy to miss vulnerabilities

### Best Practices
- Run `npm audit` in CI/CD pipeline
- Set `--audit-level=high` to fail only on serious issues
- Use `npm audit fix` to automatically update vulnerable packages
- Review audit reports before applying fixes (breaking changes possible)
- Keep dependencies up to date with regular `npm update`

### References
- [npm audit Documentation](https://docs.npmjs.com/cli/v10/commands/npm-audit)
- [npm Security Best Practices](https://docs.npmjs.com/packages-and-modules/securing-your-code)

---

## 11. Node.js Version Requirement

### Decision
Require Node.js 20.x LTS as minimum version, document in README and check in setup scripts.

### Rationale
- Clarification answer: "Node.js 20.x LTS"
- Next.js 15 requires Node.js 18.18+ minimum
- Node.js 20 is current LTS with support until April 2026
- Better performance and security updates than 18.x
- Aligns with Vercel's default Node.js version

### Implementation
```json
// package.json
{
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  }
}
```

### Alternatives Considered
- **Node.js 18.18+**: Shorter support lifecycle, less performant
- **Node.js 22.x**: Not LTS yet, potential stability issues

### Best Practices
- Document Node.js version in README
- Use `.nvmrc` file for nvm users: `20`
- Add version check in setup scripts
- Configure Vercel to use Node.js 20.x in project settings

### References
- [Node.js Release Schedule](https://nodejs.org/en/about/previous-releases)
- [Next.js System Requirements](https://nextjs.org/docs/getting-started/installation)

---

## Summary

All technical decisions are finalized with clear rationale and best practices documented. No "NEEDS CLARIFICATION" items remain. Ready to proceed to Phase 1 (Design & Contracts).

### Key Takeaways
1. **Next.js 15 + App Router** with static export for Vercel deployment
2. **TypeScript strict mode** with zero tolerance for `any` types
3. **Tailwind CSS v4** with CSS variables for design tokens
4. **next-intl** for bilingual support (AR default, EN secondary)
5. **Self-hosted fonts** as .woff2 files loaded via `next/font/local`
6. **Motion (Framer Motion v12)** for animations with accessibility support
7. **shadcn/ui** for UI components with custom design tokens
8. **tailwindcss-rtl** plugin for automatic RTL/LTR layout
9. **@tabler/icons-react@^3.37.1** for lightweight, tree-shakeable icons with 5000+ options
10. **npm audit** for security scanning with high/critical threshold
11. **Node.js 20.x LTS** as minimum runtime version

All decisions align with constitution requirements and clarification answers.

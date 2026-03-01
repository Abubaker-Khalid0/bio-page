# Data Model: Foundation & Setup

**Feature**: 001-foundation-setup  
**Date**: 2026-02-28  
**Phase**: 1 (Design & Contracts)

## Overview

This document defines the configuration data structures for the foundation setup. Since this is a static site with no database, the "data model" consists of TypeScript interfaces for configuration objects, design tokens, and locale settings.

---

## 1. Locale Configuration

### Entity: LocaleConfig

**Purpose**: Represents language and directionality settings for the bilingual application.

**Attributes**:
- `code`: Locale identifier ("ar" | "en")
- `direction`: Text direction ("rtl" | "ltr")
- `displayName`: Human-readable locale name
- `fonts`: Font family configuration for this locale

**Relationships**:
- Has one `FontConfig` for headings
- Has one `FontConfig` for body text

**Validation Rules**:
- `code` must be one of the supported locales
- `direction` must match locale convention (ar → rtl, en → ltr)
- `fonts` must reference valid font family names

**State Transitions**: N/A (immutable configuration)

**TypeScript Interface**:
```typescript
interface LocaleConfig {
  code: 'ar' | 'en';
  direction: 'rtl' | 'ltr';
  displayName: string;
  fonts: {
    heading: string;  // CSS font-family value
    body: string;     // CSS font-family value
  };
}
```

**Example**:
```typescript
const arLocale: LocaleConfig = {
  code: 'ar',
  direction: 'rtl',
  displayName: 'العربية',
  fonts: {
    heading: 'var(--font-naskh)',
    body: 'var(--font-tajawal)'
  }
};
```

---

## 2. Design Token

### Entity: DesignToken

**Purpose**: Represents a single design system value (color, spacing, typography) with metadata.

**Attributes**:
- `name`: Token identifier (e.g., "color-primary")
- `value`: CSS value (e.g., "#550000", "8px", "2.4rem")
- `category`: Token type ("color" | "spacing" | "typography")
- `cssVariable`: CSS custom property name (e.g., "--color-primary")
- `description`: Human-readable description

**Relationships**: None (flat structure)

**Validation Rules**:
- `name` must be unique within category
- `value` must be valid CSS value for category
- `cssVariable` must start with "--"
- Color values must be valid hex codes (#RRGGBB or #RRGGBBAA)
- Spacing values must use px, rem, or em units

**State Transitions**: N/A (immutable configuration)

**TypeScript Interface**:
```typescript
type TokenCategory = 'color' | 'spacing' | 'typography';

interface DesignToken {
  name: string;
  value: string;
  category: TokenCategory;
  cssVariable: string;
  description?: string;
}
```

**Example**:
```typescript
const primaryColor: DesignToken = {
  name: 'primary',
  value: '#550000',
  category: 'color',
  cssVariable: '--color-primary',
  description: 'Deep maroon - cover background, primary button'
};
```

---

## 3. Font Configuration

### Entity: FontConfig

**Purpose**: Represents font loading configuration for `next/font/local`.

**Attributes**:
- `family`: Font family name (e.g., "Playfair Display")
- `src`: Path to font file(s) relative to project root
- `weight`: Font weights to load (e.g., "400 600 700")
- `style`: Font style ("normal" | "italic")
- `display`: Font display strategy ("swap" | "block" | "fallback" | "optional")
- `variable`: CSS variable name for this font (e.g., "--font-display")
- `fallback`: Fallback font stack

**Relationships**:
- Referenced by `LocaleConfig.fonts`

**Validation Rules**:
- `src` must point to existing .woff2 file(s)
- `weight` must be valid CSS font-weight value
- `display` should be "swap" for optimal UX (prevent FOIT)
- `variable` must start with "--font-"
- `fallback` must include system fonts

**State Transitions**: N/A (immutable configuration)

**TypeScript Interface**:
```typescript
interface FontConfig {
  family: string;
  src: string | Array<{ path: string; weight?: string; style?: string }>;
  weight?: string;
  style?: 'normal' | 'italic';
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  variable: string;
  fallback?: string[];
}
```

**Example**:
```typescript
const playfairDisplay: FontConfig = {
  family: 'Playfair Display',
  src: './public/fonts/playfair-display/playfair-display.woff2',
  weight: '400 600 700',
  style: 'normal',
  display: 'swap',
  variable: '--font-display',
  fallback: ['Georgia', 'serif']
};
```

---

## 4. Next.js Configuration

### Entity: NextConfig

**Purpose**: Represents Next.js build and runtime configuration.

**Attributes**:
- `output`: Build output mode ("export" for static site)
- `trailingSlash`: Whether to add trailing slashes to URLs
- `images`: Image optimization configuration
- `experimental`: Experimental features configuration

**Relationships**: None

**Validation Rules**:
- `output: 'export'` required for static deployment
- `trailingSlash: true` recommended for static hosts
- `images.unoptimized: true` required when using `output: 'export'`

**State Transitions**: N/A (build-time configuration)

**TypeScript Interface**:
```typescript
interface NextConfig {
  output?: 'standalone' | 'export';
  trailingSlash?: boolean;
  images?: {
    unoptimized?: boolean;
    remotePatterns?: Array<{
      protocol: string;
      hostname: string;
    }>;
  };
  experimental?: {
    typedRoutes?: boolean;
  };
}
```

**Example**:
```typescript
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    typedRoutes: true
  }
};
```

---

## 5. Tailwind Configuration

### Entity: TailwindConfig

**Purpose**: Represents Tailwind CSS configuration with design tokens.

**Attributes**:
- `content`: File paths to scan for class names
- `theme`: Theme customization (colors, fonts, spacing)
- `plugins`: Tailwind plugins (RTL, forms, etc.)

**Relationships**:
- References `DesignToken` values in theme

**Validation Rules**:
- `content` must include all component directories
- `theme.extend` should preserve default Tailwind values
- Color values must match constitution design tokens

**State Transitions**: N/A (build-time configuration)

**TypeScript Interface**:
```typescript
interface TailwindConfig {
  content: string[];
  theme?: {
    extend?: {
      colors?: Record<string, string>;
      fontFamily?: Record<string, string[]>;
      spacing?: Record<string, string>;
    };
  };
  plugins?: Array<any>;
}
```

**Example**:
```typescript
const tailwindConfig: TailwindConfig = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)'
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: [require('tailwindcss-rtl')]
};
```

---

## 6. i18n Configuration

### Entity: I18nConfig

**Purpose**: Represents next-intl internationalization configuration.

**Attributes**:
- `locales`: Array of supported locale codes
- `defaultLocale`: Default locale code
- `localePrefix`: URL prefix strategy ("always" | "as-needed" | "never")
- `localeDetection`: Whether to auto-detect user locale

**Relationships**:
- References `LocaleConfig` for each supported locale

**Validation Rules**:
- `defaultLocale` must be in `locales` array
- `localePrefix: 'always'` recommended for clarity
- `localeDetection: false` prevents unwanted redirects

**State Transitions**: N/A (runtime configuration)

**TypeScript Interface**:
```typescript
interface I18nConfig {
  locales: readonly string[];
  defaultLocale: string;
  localePrefix?: 'always' | 'as-needed' | 'never';
  localeDetection?: boolean;
}
```

**Example**:
```typescript
const i18nConfig: I18nConfig = {
  locales: ['ar', 'en'] as const,
  defaultLocale: 'ar',
  localePrefix: 'always',
  localeDetection: false
};
```

---

## 7. Translation Messages

### Entity: TranslationMessages

**Purpose**: Represents translation key-value pairs for a locale.

**Attributes**:
- Nested object structure with dot-notation keys
- All values are strings

**Relationships**:
- One `TranslationMessages` object per locale

**Validation Rules**:
- Keys must be consistent across all locales
- Values must be non-empty strings
- Nested structure should match across locales

**State Transitions**: N/A (static JSON files)

**TypeScript Interface**:
```typescript
type TranslationMessages = {
  [namespace: string]: {
    [key: string]: string | TranslationMessages;
  };
};
```

**Example**:
```typescript
const arMessages: TranslationMessages = {
  bio: {
    brandName: 'LYORE ABAYA',
    tagline: 'حيث تلتقي الأناقة بالاحتشام',
    whatsapp: 'تواصلي معنا',
    website: 'الموقع قريباً'
  }
};
```

---

## Entity Relationship Diagram

```
┌─────────────────┐
│  LocaleConfig   │
├─────────────────┤
│ code            │
│ direction       │
│ displayName     │
│ fonts           │───┐
└─────────────────┘   │
                      │
                      ▼
                ┌─────────────────┐
                │   FontConfig    │
                ├─────────────────┤
                │ family          │
                │ src             │
                │ weight          │
                │ display         │
                │ variable        │
                │ fallback        │
                └─────────────────┘

┌─────────────────┐
│  DesignToken    │
├─────────────────┤
│ name            │
│ value           │
│ category        │
│ cssVariable     │
│ description     │
└─────────────────┘

┌─────────────────┐       ┌──────────────────────┐
│   I18nConfig    │───────│ TranslationMessages  │
├─────────────────┤       ├──────────────────────┤
│ locales         │       │ [namespace]          │
│ defaultLocale   │       │   [key]: string      │
│ localePrefix    │       └──────────────────────┘
│ localeDetection │
└─────────────────┘

┌─────────────────┐       ┌─────────────────┐
│   NextConfig    │       │ TailwindConfig  │
├─────────────────┤       ├─────────────────┤
│ output          │       │ content         │
│ trailingSlash   │       │ theme           │
│ images          │       │ plugins         │
│ experimental    │       └─────────────────┘
└─────────────────┘
```

---

## Summary

All configuration entities are defined with clear attributes, validation rules, and TypeScript interfaces. These structures will be implemented in Phase 2 (Tasks) as actual TypeScript files and configuration objects.

**Key Entities**:
1. **LocaleConfig** - Language and direction settings
2. **DesignToken** - Design system values
3. **FontConfig** - Font loading configuration
4. **NextConfig** - Next.js build settings
5. **TailwindConfig** - Tailwind CSS customization
6. **I18nConfig** - Internationalization settings
7. **TranslationMessages** - Locale-specific translations

All entities are immutable configuration objects with no state transitions or complex relationships.

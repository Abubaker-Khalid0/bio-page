# Quickstart: Foundation & Setup

**Feature**: 001-foundation-setup  
**Date**: 2026-02-28  
**Estimated Time**: 30-45 minutes

## Prerequisites

Before starting, ensure you have:

- **Node.js 20.x LTS** or higher ([Download](https://nodejs.org/))
- **npm 10.x** or higher (comes with Node.js)
- **Git** for version control
- **Code editor** (VS Code recommended)

Verify your environment:
```bash
node --version  # Should show v20.x.x or higher
npm --version   # Should show 10.x.x or higher
```

---

## Step 1: Initialize Next.js Project

Create a new Next.js 15 project with TypeScript and Tailwind CSS:

```bash
npx create-next-app@latest lyore-bio \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-eslint
```

When prompted:
- ✅ Would you like to use TypeScript? **Yes**
- ✅ Would you like to use ESLint? **No** (we'll configure later)
- ✅ Would you like to use Tailwind CSS? **Yes**
- ✅ Would you like to use `src/` directory? **Yes**
- ✅ Would you like to use App Router? **Yes**
- ✅ Would you like to customize the default import alias? **No** (use @/*)

Navigate to project:
```bash
cd lyore-bio
```

---

## Step 2: Configure TypeScript Strict Mode

Update `tsconfig.json` to enable strict mode:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## Step 3: Install Core Dependencies

Install all required packages:

```bash
npm install next-intl motion @tabler/icons-react@^3.37.1
```

Install development dependencies:

```bash
npm install -D tailwindcss-rtl @types/node
```

---

## Step 4: Configure shadcn/ui

Initialize shadcn/ui:

```bash
npx shadcn@latest init
```

When prompted:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**
- React Server Components: **Yes**
- TypeScript: **Yes**
- Where is your global CSS file? **src/styles/globals.css**
- Configure import alias: **@/components** and **@/lib/utils**

---

## Step 5: Download Self-Hosted Fonts

Create fonts directory:

```bash
mkdir -p public/fonts/{playfair-display,inter,noto-naskh-arabic,tajawal}
```

Download fonts as .woff2 files:

1. **Playfair Display**: Visit [Google Fonts](https://fonts.google.com/specimen/Playfair+Display)
   - Select weights: 400, 600, 700
   - Download and extract .woff2 files to `public/fonts/playfair-display/`

2. **Inter**: Visit [rsms.me/inter](https://rsms.me/inter/)
   - Download variable font .woff2
   - Place in `public/fonts/inter/`

3. **Noto Naskh Arabic**: Visit [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Naskh+Arabic)
   - Select weights: 400, 600, 700
   - Download and extract .woff2 files to `public/fonts/noto-naskh-arabic/`

4. **Tajawal**: Visit [Google Fonts](https://fonts.google.com/specimen/Tajawal)
   - Select weights: 300, 400, 500
   - Download and extract .woff2 files to `public/fonts/tajawal/`

---

## Step 6: Configure Design Tokens

Create `src/styles/globals.css` with design tokens:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Colors */
    --color-primary: #550000;
    --color-secondary: #6B1C23;
    --color-accent: #C9A96E;
    --color-background: #FAF7F4;
    --color-surface: #FFFFFF;
    --color-text: #0A0A0A;
    --color-border: #0A0A0A1A;
    
    /* Spacing */
    --space-xs: 8px;
    --space-sm: 16px;
    --space-md: 24px;
    --space-lg: 32px;
    --space-xl: 48px;
    
    /* Typography */
    --text-brand: 2.4rem;
    --text-tagline: 0.95rem;
    --text-button: 0.75rem;
    --text-label: 0.625rem;
    --text-footer: 0.625rem;
  }
  
  body {
    background-color: var(--color-background);
    color: var(--color-text);
  }
}
```

---

## Step 7: Configure Tailwind CSS

Update `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';
import rtl from 'tailwindcss-rtl';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        border: 'var(--color-border)'
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Arial', 'sans-serif'],
        naskh: ['var(--font-naskh)', 'Traditional Arabic', 'serif'],
        tajawal: ['var(--font-tajawal)', 'Arial', 'sans-serif']
      },
      spacing: {
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)'
      }
    }
  },
  plugins: [rtl]
};

export default config;
```

---

## Step 8: Configure next-intl

Create `i18n.ts` in project root:

```typescript
import { getRequestConfig } from 'next-intl/server';

export const locales = ['ar', 'en'] as const;
export const defaultLocale = 'ar';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default
}));
```

Create `middleware.ts` in project root:

```typescript
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: false
});

export const config = {
  matcher: ['/', '/(ar|en)/:path*']
};
```

---

## Step 9: Create Translation Files

Create `messages/ar.json`:

```json
{
  "bio": {
    "brandName": "LYORE ABAYA",
    "tagline": "حيث تلتقي الأناقة بالاحتشام",
    "langSwitch": "EN"
  }
}
```

Create `messages/en.json`:

```json
{
  "bio": {
    "brandName": "LYORE ABAYA",
    "tagline": "Where elegance meets modesty",
    "langSwitch": "عربي"
  }
}
```

---

## Step 10: Configure Next.js

Update `next.config.ts`:

```typescript
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default withNextIntl(nextConfig);
```

---

## Step 11: Set Up Locale Layout

Create `src/app/[locale]/layout.tsx`:

```typescript
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import localFont from 'next/font/local';
import '../styles/globals.css';

const playfairDisplay = localFont({
  src: '../../../public/fonts/playfair-display/playfair-display.woff2',
  variable: '--font-display',
  display: 'swap'
});

const inter = localFont({
  src: '../../../public/fonts/inter/inter.woff2',
  variable: '--font-body',
  display: 'swap'
});

const notoNaskhArabic = localFont({
  src: '../../../public/fonts/noto-naskh-arabic/noto-naskh-arabic.woff2',
  variable: '--font-naskh',
  display: 'swap'
});

const tajawal = localFont({
  src: '../../../public/fonts/tajawal/tajawal.woff2',
  variable: '--font-tajawal',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'LYORE ABAYA',
  description: 'Where elegance meets modesty'
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction}>
      <body
        className={`${playfairDisplay.variable} ${inter.variable} ${notoNaskhArabic.variable} ${tajawal.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

---

## Step 12: Create Test Page

Create `src/app/[locale]/page.tsx`:

```typescript
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('bio');

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold text-primary mb-4">
          {t('brandName')}
        </h1>
        <p className="font-body text-lg text-text/70">
          {t('tagline')}
        </p>
      </div>
    </main>
  );
}
```

---

## Step 13: Configure npm Scripts

Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "postinstall": "npm audit --audit-level=high",
    "audit:fix": "npm audit fix"
  },
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  }
}
```

---

## Step 14: Run Development Server

Start the development server:

```bash
npm run dev
```

Open browser and test:
- Arabic (default): http://localhost:3000/ar
- English: http://localhost:3000/en

---

## Step 15: Verify Setup

Run verification checks:

```bash
# Check TypeScript compilation
npx tsc --noEmit

# Check for security vulnerabilities
npm audit

# Build for production
npm run build
```

All checks should pass with 0 errors and 0 warnings.

---

## Success Criteria Checklist

✅ Development server starts in under 10 seconds  
✅ TypeScript compilation shows 0 errors  
✅ npm audit reports 0 high/critical vulnerabilities  
✅ Both `/ar` and `/en` routes render correctly  
✅ RTL direction works for Arabic  
✅ LTR direction works for English  
✅ Design tokens are available as CSS variables  
✅ Fonts load correctly for both locales  
✅ Hot module replacement works (< 1 second)  
✅ Build completes successfully with 0 errors/warnings

---

## Troubleshooting

### Issue: "Module not found: Can't resolve 'next-intl'"
**Solution**: Run `npm install next-intl`

### Issue: "Font files not loading"
**Solution**: Verify .woff2 files are in correct directories under `public/fonts/`

### Issue: "TypeScript errors about 'any' types"
**Solution**: Enable strict mode in `tsconfig.json` and fix type annotations

### Issue: "npm audit shows vulnerabilities"
**Solution**: Run `npm audit fix` to auto-update packages

### Issue: "Build fails with 'output: export' error"
**Solution**: Ensure `images.unoptimized: true` is set in `next.config.ts`

---

## Next Steps

Foundation setup is complete! You can now:

1. Run `/speckit.tasks` to generate implementation tasks
2. Start building components per the constitution
3. Add more translation keys to `messages/*.json`
4. Configure additional shadcn/ui components as needed

---

## Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Motion Documentation](https://motion.dev/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Constitution](../../.specify/memory/constitution.md)

# Feature Specification: Foundation & Setup

**Feature Branch**: `001-foundation-setup`  
**Created**: 2026-02-28  
**Status**: Draft  
**Input**: User description: "Phase 1 - Foundation & Setup: Initialize Next.js 15 project with TypeScript, Tailwind CSS v4, shadcn/ui, Motion (Framer Motion v12), next-intl for AR/EN bilingual support, Lucide React icons, self-hosted fonts (Playfair Display, Inter, Noto Naskh Arabic, Tajawal), RTL plugin, and complete design system with CSS variables"

## Clarifications

### Session 2026-02-28

- Q: Should fonts be loaded from Google Fonts CDN or downloaded and self-hosted locally? → A: Self-hosted local files
- Q: What is the minimum Node.js version required for this project? → A: Node.js 20.x LTS
- Q: Should the project include automated dependency security scanning? → A: Yes, with npm audit

## User Scenarios & Testing

### User Story 1 - Development Environment Ready (Priority: P1)

As a developer, I need a fully configured Next.js 15 project with TypeScript so that I can start building features immediately without configuration issues.

**Why this priority**: This is the foundation for all subsequent development. Without a properly configured environment, no other features can be built.

**Independent Test**: Can be fully tested by running `npm run dev` and verifying the development server starts without errors, displays a basic page, and hot-reload works.

**Acceptance Scenarios**:

1. **Given** a fresh project initialization, **When** I run `npm run dev`, **Then** the development server starts on localhost:3000 without errors
2. **Given** the dev server is running, **When** I make a change to a component file, **Then** the browser hot-reloads automatically
3. **Given** the project structure, **When** I inspect the configuration files, **Then** TypeScript strict mode is enabled and all paths are correctly aliased with `@/*`

---

### User Story 2 - Bilingual Support Functional (Priority: P1)

As a developer, I need working Arabic (RTL) and English (LTR) language switching so that I can build bilingual pages according to the constitution.

**Why this priority**: Bilingual support is a core requirement stated in the constitution. All pages must support both languages from the start.

**Independent Test**: Can be fully tested by navigating to `/ar` and `/en` routes and verifying correct text direction, font rendering, and locale-specific content display.

**Acceptance Scenarios**:

1. **Given** the application is running, **When** I navigate to `/ar`, **Then** the page renders in RTL direction with Arabic fonts
2. **Given** the application is running, **When** I navigate to `/en`, **Then** the page renders in LTR direction with English fonts
3. **Given** I'm on the Arabic page, **When** I switch language, **Then** I'm redirected to `/en` with the same page content in English
4. **Given** the root URL `/`, **When** I visit it, **Then** I'm automatically redirected to `/ar` (default locale)

---

### User Story 3 - Design System Available (Priority: P1)

As a developer, I need all design tokens (colors, typography, spacing) available as CSS variables so that I can build components that match the constitution's design specifications.

**Why this priority**: The design system is non-negotiable per the constitution. All components must use the exact colors, fonts, and spacing defined.

**Independent Test**: Can be fully tested by inspecting CSS variables in browser DevTools and creating a test component that uses all design tokens.

**Acceptance Scenarios**:

1. **Given** the application is running, **When** I inspect CSS variables in DevTools, **Then** all color tokens (--color-primary, --color-accent, etc.) are defined with correct hex values
2. **Given** a test component, **When** I apply design token classes, **Then** the component renders with the exact colors specified in the constitution (#550000 for primary, #C9A96E for accent, etc.)
3. **Given** Arabic content, **When** I render text, **Then** it uses Noto Naskh Arabic for headings and Tajawal for body text
4. **Given** English content, **When** I render text, **Then** it uses Playfair Display for headings and Inter for body text

---

### User Story 4 - UI Component Library Ready (Priority: P2)

As a developer, I need shadcn/ui components installed and configured so that I can build consistent UI elements quickly.

**Why this priority**: While important for development velocity, the project can technically start without shadcn/ui. However, it significantly speeds up component development.

**Independent Test**: Can be fully tested by installing a test shadcn/ui component (e.g., Button) and verifying it renders correctly with Tailwind styles.

**Acceptance Scenarios**:

1. **Given** shadcn/ui is initialized, **When** I run `npx shadcn@latest add button`, **Then** the Button component is added to `src/components/ui/` without errors
2. **Given** a Button component is installed, **When** I import and use it in a page, **Then** it renders with correct Tailwind styling
3. **Given** the shadcn/ui configuration, **When** I inspect `components.json`, **Then** it's configured to use the project's design tokens

---

### User Story 5 - Animation Library Configured (Priority: P2)

As a developer, I need Motion (Framer Motion v12) installed and working so that I can implement the staggered entrance animations specified in the constitution.

**Why this priority**: Animations are a key part of the user experience per the constitution, but the site can function without them initially.

**Independent Test**: Can be fully tested by creating a simple animated component and verifying smooth transitions with ease-out curves.

**Acceptance Scenarios**:

1. **Given** Motion is installed, **When** I create a component with fade-in animation, **Then** it animates smoothly with ease-out curve
2. **Given** a user has `prefers-reduced-motion` enabled, **When** they view animated components, **Then** only opacity transitions occur (no transform animations)
3. **Given** multiple animated elements, **When** the page loads, **Then** stagger delays work correctly

---

### Edge Cases

- What happens when fonts fail to load? (Fallback to system fonts: Arial for English, system Arabic font)
- How does the system handle invalid locale routes? (Redirect to default `/ar` locale)
- What if CSS variables are not supported in older browsers? (Graceful degradation with fallback colors)
- How does RTL plugin handle mixed LTR/RTL content? (Use logical CSS properties: start/end instead of left/right)
- What happens if npm install fails due to network issues? (Clear error message with retry instructions)
- What if Node.js version is below 20.x? (Display clear error message during setup with version requirement)

## Requirements

### Functional Requirements

- **FR-001**: System MUST initialize Next.js 15 with App Router architecture on Node.js 20.x LTS or higher
- **FR-002**: System MUST enable TypeScript strict mode with zero "any" types allowed
- **FR-003**: System MUST configure Tailwind CSS v4 with custom design tokens
- **FR-004**: System MUST install and configure shadcn/ui with project-specific theming
- **FR-005**: System MUST install Motion (Framer Motion v12) for animations
- **FR-006**: System MUST configure next-intl for Arabic (default/RTL) and English (LTR) locales
- **FR-007**: System MUST install Lucide React for icon components
- **FR-008**: System MUST configure self-hosted fonts via next/font with local font files (no CDN):
  - Playfair Display (English headings) - downloaded as .woff2 files
  - Inter (English body) - downloaded as .woff2 files
  - Noto Naskh Arabic (Arabic headings) - downloaded as .woff2 files
  - Tajawal (Arabic body) - downloaded as .woff2 files
  - Font files stored in `public/fonts/` directory
  - Fonts loaded via next/font/local for optimal performance
- **FR-009**: System MUST configure Tailwind RTL plugin for bidirectional layout support
- **FR-010**: System MUST define CSS variables for all design tokens:
  - `--color-primary`: #550000 (deep maroon)
  - `--color-secondary`: #6B1C23
  - `--color-accent`: #C9A96E (champagne gold)
  - `--color-background`: #FAF7F4 (warm off-white)
  - `--color-surface`: #FFFFFF
  - `--color-text`: #0A0A0A (near black)
- **FR-011**: System MUST create project folder structure with:
  - `src/app/[locale]/` for pages
  - `src/components/ui/` for shadcn components
  - `src/components/layout/` for layout components
  - `src/components/sections/` for page sections
  - `src/data/` for data files
  - `src/lib/` for utilities
  - `messages/` for translations
  - `public/fonts/` for self-hosted font files (.woff2 format)
  - `public/images/` for assets
- **FR-012**: System MUST configure locale routing:
  - `/ar` → Arabic (default, redirect from `/`)
  - `/en` → English
- **FR-013**: System MUST set correct `dir` attribute (`rtl` or `ltr`) based on active locale
- **FR-014**: System MUST apply correct font family based on active locale
- **FR-015**: System MUST run npm audit after dependency installation to check for security vulnerabilities
- **FR-016**: Development server MUST run without errors or warnings

### Key Entities

- **Locale Configuration**: Represents language settings (code: "ar" | "en", direction: "rtl" | "ltr", fonts: object)
- **Design Token**: Represents a design system value (name: string, value: string, category: "color" | "typography" | "spacing")
- **Font Configuration**: Represents font loading settings (family: string, weight: array, subsets: array, display: string)

## Success Criteria

### Measurable Outcomes

- **SC-001**: Development server starts in under 10 seconds after running `npm run dev`
- **SC-002**: `npm run build` completes successfully with 0 errors and 0 warnings
- **SC-003**: Language switching between Arabic and English occurs instantly (< 100ms)
- **SC-004**: All 6 design token colors render with exact hex values specified in constitution
- **SC-005**: Font files load in under 2 seconds on first page visit
- **SC-006**: TypeScript compilation shows 0 type errors
- **SC-007**: npm audit reports 0 high or critical vulnerabilities
- **SC-008**: Hot module replacement (HMR) updates occur in under 1 second after file save
- **SC-009**: Project structure matches constitution file organization exactly

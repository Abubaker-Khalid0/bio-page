---
description: "Task list for Foundation & Setup implementation"
---

# Tasks: Foundation & Setup

**Input**: Design documents from `/specs/001-foundation-setup/`  
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓, quickstart.md ✓

**Tests**: No test tasks included - tests not requested in specification

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Single Next.js application structure:
- Root config files: `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `i18n.ts`, `middleware.ts`
- Source: `src/app/[locale]/`, `src/components/`, `src/lib/`, `src/styles/`
- Static assets: `public/fonts/`, `public/images/`
- Translations: `messages/ar.json`, `messages/en.json`

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Initialize Next.js 15 project with TypeScript and core dependencies

- [x] T001 Initialize Next.js 15 project with create-next-app (TypeScript, Tailwind, App Router, src-dir)
- [x] T002 Configure TypeScript strict mode in tsconfig.json per research.md
- [x] T003 [P] Install core dependencies: next-intl, motion, @tabler/icons-react@^3.37.1
- [x] T004 [P] Install dev dependencies: tailwindcss-rtl, @types/node
- [x] T005 [P] Configure npm scripts and engines in package.json (Node.js 20.x requirement)
- [x] T006 [P] Initialize shadcn/ui with npx shadcn@latest init

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core configuration that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Download and organize self-hosted font files (.woff2) in public/fonts/ per research.md
- [x] T008 [P] Create design token CSS variables in src/styles/globals.css per contracts/design-tokens.ts
- [x] T009 [P] Configure Tailwind CSS v4 with design tokens and RTL plugin in tailwind.config.ts
- [x] T010 [P] Configure next-intl in i18n.ts (locales: ar, en; default: ar)
- [x] T011 [P] Create locale routing middleware in middleware.ts
- [x] T012 [P] Configure Next.js for static export in next.config.ts (output: 'export', trailingSlash: true)
- [x] T013 [P] Create translation files: messages/ar.json and messages/en.json with initial keys
- [x] T014 [P] Create project folder structure per plan.md (src/components/ui, src/components/layout, src/components/sections, src/data, src/lib)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Development Environment Ready (Priority: P1) 🎯 MVP

**Goal**: Fully configured Next.js 15 project with TypeScript so developers can start building features immediately without configuration issues

**Independent Test**: Run `npm run dev` and verify development server starts without errors, displays a basic page, and hot-reload works

### Implementation for User Story 1

- [x] T015 [P] [US1] Configure self-hosted fonts in src/app/[locale]/layout.tsx using next/font/local per contracts/font-config.ts
- [x] T016 [P] [US1] Create root layout with locale provider in src/app/[locale]/layout.tsx (sets dir, fonts, NextIntlClientProvider)
- [x] T017 [US1] Create test page in src/app/[locale]/page.tsx with brand name and tagline using useTranslations
- [x] T018 [US1] Verify TypeScript compilation with npx tsc --noEmit (0 errors expected)
- [x] T019 [US1] Run npm audit and verify 0 high/critical vulnerabilities
- [x] T020 [US1] Test development server startup time (< 10 seconds) and HMR (< 1 second)

**Checkpoint**: Development environment is fully functional - can run `npm run dev` successfully

---

## Phase 4: User Story 2 - Bilingual Support Functional (Priority: P1)

**Goal**: Working Arabic (RTL) and English (LTR) language switching so developers can build bilingual pages according to the constitution

**Independent Test**: Navigate to `/ar` and `/en` routes and verify correct text direction, font rendering, and locale-specific content display

### Implementation for User Story 2

- [x] T021 [P] [US2] Verify locale routing works: root `/` redirects to `/ar` (default locale)
- [x] T022 [P] [US2] Test Arabic route `/ar` renders with RTL direction and Arabic fonts (Noto Naskh Arabic, Tajawal)
- [x] T023 [P] [US2] Test English route `/en` renders with LTR direction and English fonts (Playfair Display, Inter)
- [x] T024 [US2] Create language switcher component in src/components/layout/LanguageSwitcher.tsx (shows "EN" in AR mode, "عربي" in EN mode)
- [x] T025 [US2] Add language switcher to layout and verify switching between locales works (< 100ms)
- [x] T026 [US2] Verify dir attribute changes correctly on html element based on locale

**Checkpoint**: Bilingual support is fully functional - both locales render correctly with proper direction and fonts

---

## Phase 5: User Story 3 - Design System Available (Priority: P1)

**Goal**: All design tokens (colors, typography, spacing) available as CSS variables so developers can build components that match the constitution's design specifications

**Independent Test**: Inspect CSS variables in browser DevTools and create a test component that uses all design tokens

### Implementation for User Story 3

- [x] T027 [P] [US3] Verify all 6 color tokens are defined in globals.css with exact hex values from constitution
- [x] T028 [P] [US3] Verify all 5 spacing tokens are defined in globals.css
- [x] T029 [P] [US3] Verify all 5 typography tokens are defined in globals.css
- [x] T030 [US3] Create test component in src/app/[locale]/page.tsx that uses design tokens (primary color, accent color, spacing)
- [x] T031 [US3] Verify Tailwind utility classes work with design tokens (text-primary, bg-accent, space-md)
- [x] T032 [US3] Test Arabic content renders with correct fonts (Noto Naskh Arabic for headings, Tajawal for body)
- [x] T033 [US3] Test English content renders with correct fonts (Playfair Display for headings, Inter for body)

**Checkpoint**: Design system is fully available - all tokens accessible via CSS variables and Tailwind utilities

---

## Phase 6: User Story 4 - UI Component Library Ready (Priority: P2)

**Goal**: shadcn/ui components installed and configured so developers can build consistent UI elements quickly

**Independent Test**: Install a test shadcn/ui component (e.g., Button) and verify it renders correctly with Tailwind styles

### Implementation for User Story 4

- [x] T034 [US4] Verify shadcn/ui initialization completed successfully (components.json exists)
- [x] T035 [US4] Install Button component with npx shadcn@latest add button
- [x] T036 [US4] Create test page using Button component in src/app/[locale]/page.tsx
- [x] T037 [US4] Verify Button renders with correct Tailwind styling and design tokens
- [x] T038 [US4] Verify components.json is configured to use project design tokens
- [x] T039 [US4] Test Button component works in both Arabic (RTL) and English (LTR) layouts

**Checkpoint**: shadcn/ui is ready for use - components can be added and styled with design tokens

---

## Phase 7: User Story 5 - Animation Library Configured (Priority: P2)

**Goal**: Motion (Framer Motion v12) installed and working so developers can implement the staggered entrance animations specified in the constitution

**Independent Test**: Create a simple animated component and verify smooth transitions with ease-out curves

### Implementation for User Story 5

- [x] T040 [P] [US5] Create animated test component in src/components/sections/AnimatedTest.tsx with fade-in animation
- [x] T041 [US5] Verify animation uses ease-out curve (transition: { ease: 'easeOut' })
- [x] T042 [US5] Test prefers-reduced-motion support: animations should only use opacity when enabled
- [x] T043 [US5] Create staggered animation example with multiple elements (delays: 0ms, 100ms, 200ms)
- [x] T044 [US5] Verify stagger delays work correctly and animations are smooth
- [x] T045 [US5] Add animated test component to page and verify it animates on load

**Checkpoint**: Motion is fully configured - animations work with accessibility support

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and documentation

- [x] T046 [P] Run full TypeScript compilation check: npx tsc --noEmit (expect 0 errors)
- [x] T047 [P] Run npm audit and verify 0 high/critical vulnerabilities
- [x] T048 [P] Run production build: npm run build (expect 0 errors, 0 warnings)
- [x] T049 [P] Verify build output is SSG (pages pre-rendered; middleware requires server mode, no `out/` dir)
- [x] T050 [P] Test production build locally: npm start (serves SSG build)
- [x] T051 [P] Verify all success criteria from spec.md are met (SC-001 through SC-009)
- [x] T052 [P] Create README.md with setup instructions based on quickstart.md
- [x] T053 [P] Document Node.js version requirement (20.x LTS) in README.md
- [x] T054 Run complete quickstart.md validation end-to-end
- [x] T055 Verify project structure matches constitution file organization exactly

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P1 → P1 → P2 → P2)
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories (independent)
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories (independent)
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories (independent)
- **User Story 5 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories (independent)

### Within Each User Story

- All tasks within a user story can run in parallel if marked [P]
- Tasks without [P] must run sequentially within their story
- Story complete before moving to next priority

### Parallel Opportunities

- **Phase 1 (Setup)**: T003, T004, T005, T006 can run in parallel
- **Phase 2 (Foundational)**: T008, T009, T010, T011, T012, T013, T014 can run in parallel after T007
- **Phase 3 (US1)**: T015, T016 can run in parallel; T018, T019, T020 can run in parallel after T017
- **Phase 4 (US2)**: T021, T022, T023 can run in parallel
- **Phase 5 (US3)**: T027, T028, T029 can run in parallel; T032, T033 can run in parallel after T030
- **Phase 6 (US4)**: All tasks sequential (depend on previous)
- **Phase 7 (US5)**: T040 can start immediately
- **Phase 8 (Polish)**: T046, T047, T048, T049, T050, T051, T052, T053 can run in parallel
- **All User Stories (Phase 3-7)**: Can run in parallel after Foundational phase completes

---

## Parallel Example: User Story 1

```bash
# Launch parallel tasks for User Story 1:
Task T015: "Configure self-hosted fonts in src/app/[locale]/layout.tsx"
Task T016: "Create root layout with locale provider in src/app/[locale]/layout.tsx"

# After T017 completes, launch validation tasks in parallel:
Task T018: "Verify TypeScript compilation"
Task T019: "Run npm audit"
Task T020: "Test development server startup time"
```

---

## Parallel Example: User Story 2

```bash
# Launch all route tests in parallel:
Task T021: "Verify locale routing works"
Task T022: "Test Arabic route /ar"
Task T023: "Test English route /en"
```

---

## Parallel Example: User Story 3

```bash
# Launch all token verification tasks in parallel:
Task T027: "Verify all 6 color tokens"
Task T028: "Verify all 5 spacing tokens"
Task T029: "Verify all 5 typography tokens"

# After T030 completes, launch font tests in parallel:
Task T032: "Test Arabic content renders with correct fonts"
Task T033: "Test English content renders with correct fonts"
```

---

## Implementation Strategy

### MVP First (User Stories 1-3 Only - All P1)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Development Environment)
4. Complete Phase 4: User Story 2 (Bilingual Support)
5. Complete Phase 5: User Story 3 (Design System)
6. **STOP and VALIDATE**: Test all P1 stories independently
7. Deploy/demo if ready - this is the minimum viable foundation

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Checkpoint (dev environment works)
3. Add User Story 2 → Test independently → Checkpoint (bilingual works)
4. Add User Story 3 → Test independently → Checkpoint (design system works)
5. **MVP COMPLETE** - All P1 stories done, foundation is production-ready
6. Add User Story 4 → Test independently → Checkpoint (UI library ready)
7. Add User Story 5 → Test independently → Checkpoint (animations ready)
8. Polish phase → Final validation → Deploy

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Development Environment)
   - Developer B: User Story 2 (Bilingual Support)
   - Developer C: User Story 3 (Design System)
3. After P1 stories complete:
   - Developer D: User Story 4 (UI Component Library)
   - Developer E: User Story 5 (Animation Library)
4. Stories complete and integrate independently

---

## Task Summary

**Total Tasks**: 55  
**Setup Phase**: 6 tasks  
**Foundational Phase**: 8 tasks (BLOCKING)  
**User Story 1 (P1)**: 6 tasks  
**User Story 2 (P1)**: 6 tasks  
**User Story 3 (P1)**: 7 tasks  
**User Story 4 (P2)**: 6 tasks  
**User Story 5 (P2)**: 6 tasks  
**Polish Phase**: 10 tasks

**Parallel Opportunities**: 28 tasks marked [P] can run in parallel within their phase

**MVP Scope**: Phases 1-5 (User Stories 1-3, all P1 priorities) = 33 tasks

**Independent Test Criteria**:
- US1: Development server starts without errors, hot-reload works
- US2: Both `/ar` and `/en` routes render with correct direction and fonts
- US3: All design tokens accessible and working in components
- US4: shadcn/ui components can be added and styled
- US5: Animations work smoothly with accessibility support

---

## Notes

- [P] tasks = different files, no dependencies within phase
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- No tests included (not requested in specification)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All file paths are exact and match project structure from plan.md
- Constitution compliance verified in each user story's tasks

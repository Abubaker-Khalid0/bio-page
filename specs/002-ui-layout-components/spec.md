# Feature Specification: UI Layout & Components

**Feature Branch**: `002-ui-layout-components`  
**Created**: 2026-03-01  
**Status**: Draft  
**Input**: Phase 2 from `docs/implementation_plan.md` — Build the full page UI for the LYORE ABAYA Link-in-Bio page: layout, language switcher, cover section, logo/identity block, action buttons, social links, and footer. All pixel-perfect, mobile-first, no i18n wiring yet.

---

## Clarifications

### Session 2026-03-01

- Q: What is the maximum width of the page content on wider (desktop) screens? → A: Centered container, max-width 480px; background color fills the rest of the screen.
- Q: What accessibility (WCAG) compliance level is required? → A: Best effort — the visual design spec takes priority; no formal WCAG compliance level is required.
- Q: Should the language switcher button navigate between locales in Phase 2? → A: Yes, fully functional — clicking navigates between /ar and /en routes; Phase 4 adds translated text content only.

---

## Assumptions

- The page is viewed primarily on mobile (375px reference width); desktop is a secondary concern.
- All colors, typography sizes, and spacing values follow the design tokens established in Phase 1.
- The logo file (`logo.png`) is already placed in the public assets folder.
- Visitor actions (tapping buttons, switching language) should feel instant — no loading states needed.
- Accessibility follows a best-effort approach: tap target sizing and visible focus states are implemented, but formal WCAG AA/AAA compliance is explicitly not required. The design spec's opacity and color choices take priority.
- The website button is intentionally non-functional (coming-soon state); this is a permanent product decision, not a temporary placeholder.
- Social platform URLs are final and confirmed by the brand.
- The footer's second line ("Crafted with care · UAE 🇦🇪") is hardcoded and not translatable.

---

## User Scenarios & Testing

### User Story 1 — Visitor Views the Page on Mobile (Priority: P1)

As a **first-time visitor**, I want to see a visually polished brand page when I open the link, so that I immediately understand who LYORE ABAYA is and what I can do next.

**Why this priority**: This is the core deliverable. Every other UI element exists to support this moment.

**Independent Test**: Open the page on a 375px-wide mobile viewport and verify all sections render correctly without horizontal overflow or layout shifts.

**Acceptance Scenarios**:

1. **Given** I open the page, **When** the page renders, **Then** I see a solid maroon cover block spanning the full width at the top
2. **Given** the page loads, **When** I look at the identity section, **Then** I see the circular logo overlapping the bottom edge of the cover, the brand name below it, a short gold divider line, and the tagline beneath that
3. **Given** I scroll the page, **When** I reach the bottom, **Then** the footer is visible with a short gold accent line, copyright line, and a crafted-by line
4. **Given** the page is on mobile (375px), **When** I view it, **Then** there is no horizontal scrollbar and all content fits within the viewport width

---

### User Story 2 — Visitor Contacts via WhatsApp (Priority: P1)

As a **potential buyer**, I want to tap a clearly visible WhatsApp button, so that I can start a conversation with LYORE directly.

**Why this priority**: WhatsApp is the primary conversion point for the brand. The button must be unmissable and fully functional.

**Independent Test**: Tap the WhatsApp button and confirm it opens the WhatsApp chat with the correct number pre-filled.

**Acceptance Scenarios**:

1. **Given** I see the primary action button, **When** I tap it, **Then** I am taken to a WhatsApp chat with the LYORE contact (number: 971502507859)
2. **Given** the button has a hover/tap state, **When** I press and hold on mobile, **Then** the button visibly darkens to indicate interaction
3. **Given** the button area, **When** I look at it, **Then** it is full-width, 56px tall, with a maroon background, white text, and a messaging icon

---

### User Story 3 — Visitor Sees Website Coming-Soon State (Priority: P2)

As a visitor, I want to see a clearly disabled "website" button, so that I understand the website is not yet available without confusion.

**Why this priority**: The disabled state must communicate "not yet" — not "broken". A clear visual treatment prevents frustration.

**Independent Test**: Attempt to tap the website button and verify nothing happens; inspect it to confirm it is non-interactive.

**Acceptance Scenarios**:

1. **Given** the secondary button, **When** I look at it, **Then** it appears visually faded (40% opacity on border, text, and icon) compared to the primary button
2. **Given** the secondary button, **When** I tap it, **Then** nothing happens — no navigation, no feedback
3. **Given** the secondary button, **When** I hover (on desktop), **Then** the cursor indicates the element is not interactive

---

### User Story 4 — Visitor Follows on Social Media (Priority: P1)

As a follower, I want to find the brand's social media profiles in one place, so that I can follow LYORE on my preferred platform.

**Why this priority**: Social growth is a primary goal of the bio page.

**Independent Test**: Tap each social icon and verify it opens the correct external profile in a new tab.

**Acceptance Scenarios**:

1. **Given** the social links section, **When** I view it, **Then** I see four platforms: Instagram, TikTok, Snapchat, and Email — each with an icon and a label below it
2. **Given** any social icon, **When** I tap it, **Then** the correct platform profile opens in a new browser tab without leaving the bio page
3. **Given** a social icon, **When** I hover (desktop), **Then** both the icon and its label shift to the gold accent color
4. **Given** any social link, **When** I inspect its tap target, **Then** the tappable area is at least 52×52px

---

### User Story 5 — Language Switcher Visibility (Priority: P2)

As a visitor, I want to see a language switcher button in the corner, so that I know I can switch between Arabic and English.

**Why this priority**: The switcher must be present and styled correctly at this phase, even if full locale-switching logic comes in Phase 4.

**Independent Test**: Verify the switcher button is visible at the top corner of the screen, fixed in position, and does not overlap page content.

**Acceptance Scenarios**:

1. **Given** the page is loaded, **When** I look at the top corner, **Then** a small uppercase language label button is visible, fixed and always on top
2. **Given** I scroll the page, **When** the page scrolls, **Then** the language switcher stays fixed at the top corner
3. **Given** the button's visual design, **When** I inspect it, **Then** it has a white background, a subtle border, sharp corners (no border-radius), and 34px height
4. **Given** I am on the Arabic (`/ar`) route, **When** I tap the switcher, **Then** I am navigated to the English (`/en`) route, and vice versa

---

### Edge Cases

- What if the logo image fails to load? → A white circle placeholder is shown; the brand name and tagline remain visible.
- What if the visitor's screen is narrower than 320px? → Layout degrades gracefully — no content is clipped, buttons remain full-width.
- What if the visitor's device does not have WhatsApp installed? → The system opens the WhatsApp web fallback in the browser.
- What if the social link URL is unreachable? → The link still opens a new tab; error handling is the destination platform's responsibility.
- What if the cover section height is too short on very small screens? → The minimum height of 200px ensures the cover block always has visible presence.

---

## Requirements

### Functional Requirements

- **FR-001**: The page MUST render a full-width cover block at the top with a height of 35% of the viewport (minimum 200px)
- **FR-002**: The cover block background MUST use the brand primary color (deep maroon) with no image or pattern
- **FR-003**: The logo MUST be displayed in a circular container (90×90px) that overlaps the bottom edge of the cover by 45px and is centered horizontally
- **FR-004**: The logo container MUST have a white background, a subtle border, and internal padding to prevent the logo from touching the edges
- **FR-005**: The brand name MUST appear below the logo in the display typeface, centered, with wide letter spacing
- **FR-006**: A short horizontal gold divider line (40px wide, 1px tall) MUST appear between the brand name and the tagline
- **FR-007**: The tagline MUST appear below the divider, centered, in a lighter font weight and muted color
- **FR-008**: The primary WhatsApp action button MUST be full-width, 56px tall, with a maroon background, white text, and a messaging icon on the start side
- **FR-009**: Tapping the WhatsApp button MUST open a WhatsApp conversation to number 971502507859 in a new tab
- **FR-010**: The WhatsApp button MUST have a darker background on hover/tap (press state), transitioning over 350ms
- **FR-011**: The secondary website button MUST be full-width, 56px tall, with a transparent background and a maroon-tinted border and text at 40% opacity
- **FR-012**: The secondary website button MUST be completely non-interactive — no tap response, no cursor change to pointer, no navigation
- **FR-013**: The social links section MUST display a section label in gold uppercase text above the icons row
- **FR-014**: The social icons row MUST contain exactly four items: Instagram, TikTok, Snapchat, and Email — arranged horizontally with equal spacing
- **FR-015**: Each social icon item MUST have a minimum tappable area of 52×52px, with the icon above its text label
- **FR-016**: Each social icon and its label MUST transition to the gold accent color on hover, over 300ms
- **FR-017**: Each social link MUST open its destination in a new tab with no referrer leak (`noopener noreferrer`)
- **FR-018**: The footer MUST include a centered gold accent line, a copyright line, and a "Crafted with care · UAE 🇦🇪" line
- **FR-019**: The footer MUST include bottom padding that accounts for mobile safe-area insets (e.g. iPhone home bar)
- **FR-020**: The language switcher button MUST be fixed to the top-end corner of the screen (respecting RTL/LTR logical positioning) at z-index above all content
- **FR-021**: The language switcher MUST have a white background, a subtle border, sharp corners, 34px height, and display the opposite locale label ("EN" or "عربي")
- **FR-025**: Tapping the language switcher MUST navigate from `/ar` to `/en` (and vice versa); locale routing infrastructure handles the redirect
- **FR-022**: The layout MUST set text direction (`rtl` or `ltr`) and the appropriate font family based on the active locale
- **FR-023**: The page MUST have a warm off-white background color applied to the full viewport
- **FR-024**: On viewports wider than 480px, all page content MUST be constrained to a centered container with a maximum width of 480px; the background color fills the remaining screen area on both sides

### Key Entities

- **Cover Block**: Visual brand anchor — `{ height: "35vh | min 200px", color: "brand-primary" }`
- **Logo Container**: Circular frame — `{ size: "90×90px", overlap: "-45px", background: "white", border: "subtle" }`
- **Identity Block**: Brand text group — `{ brandName, divider, tagline }`
- **Action Button**: Interactive CTA — `{ label, icon, variant: "primary | disabled", href }`
- **Social Link Item**: Platform shortcut — `{ platform, icon, label, href, tapArea: "52×52px" }`
- **Footer**: Brand close — `{ accentLine, copyrightLine, craftedLine, safeAreaPadding }`
- **Language Switcher**: Locale toggle — `{ position: "fixed top-end", label: "EN | عربي" }`

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: The full page renders correctly on a 375px-wide mobile viewport with zero horizontal overflow
- **SC-002**: The logo circular container overlaps the cover block by exactly 45px — visible without any gap or full submersion
- **SC-003**: The WhatsApp button tap opens the correct chat destination in under 1 second on a standard mobile connection
- **SC-004**: All 4 social icon tap targets measure at least 52×52px (verifiable via browser accessibility tools)
- **SC-005**: The website button registers zero interaction events when tapped (verified by browser event inspection)
- **SC-006**: The language switcher remains visible and fixed at the top corner while scrolling through 100% of the page content
- **SC-007**: Page content on mobile viewports from 320px to 430px wide shows no clipped, overflowing, or invisible elements
- **SC-008**: All social links open the correct destination URL in a new tab (4 of 4 links verified)
- **SC-009**: The cover-to-identity section transition (logo overlap) is visually identical across iOS Safari and Android Chrome
- **SC-010**: The footer bottom padding prevents content from being hidden behind the mobile safe-area (home bar) on notched devices
- **SC-011**: On a 1280px-wide desktop viewport, the page content is centered and confined within a 480px-wide column with the background color visible on both sides

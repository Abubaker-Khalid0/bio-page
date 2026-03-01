/**
 * UI Component Contracts: UI Layout & Components
 *
 * Defines the prop interfaces for all page section components.
 * All values must align with design tokens in contracts/design-tokens.ts.
 *
 * @module contracts/ui-components
 */

// ─── Locale ─────────────────────────────────────────────────────────────────

export type Locale = "ar" | "en";
export type Direction = "rtl" | "ltr";

// ─── Cover Section ───────────────────────────────────────────────────────────

/**
 * Pure visual maroon header block.
 * No props required — all values are design-system constants.
 */
export interface CoverSectionProps {
    /** Optional override for testing; defaults to "35vh" with "200px" min */
    heightOverride?: string;
}

// ─── Logo & Identity ─────────────────────────────────────────────────────────

export interface LogoIdentityBlockProps {
    /** Brand name text (e.g. "LYORE ABAYA") */
    brandName: string;
    /** Tagline text (locale-appropriate) */
    tagline: string;
    /** Path to logo image — must exist in /public */
    logoSrc: string;
    /** Accessible alt text for the logo */
    logoAlt: string;
}

// ─── Action Buttons ──────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "disabled";

export interface ActionButtonProps {
    /** Display label */
    label: string;
    /** Tabler icon component */
    icon: any;
    /** Visual and interaction variant */
    variant: ButtonVariant;
    /**
     * Navigation target URL.
     * Required for "primary" variant; MUST be null for "disabled".
     */
    href: string | null;
    /** Accessible label override (used when label alone is insufficient) */
    ariaLabel?: string;
}

export interface ActionButtonsGroupProps {
    whatsappLabel: string;
    websiteLabel: string;
    whatsappHref: string;
}

// ─── Social Links ─────────────────────────────────────────────────────────────

export type SocialPlatform = "instagram" | "tiktok" | "snapchat" | "email";

export interface SocialLinkItemProps {
    platform: SocialPlatform;
    /** Tabler icon component */
    icon: any;
    /** Short display label (e.g. "Instagram", "انستغرام") */
    label: string;
    /** Full destination URL */
    href: string;
}

export interface SocialLinksProps {
    /** Section heading label (e.g. "تابعنا" / "Follow Us") */
    sectionLabel: string;
    items: SocialLinkItemProps[];
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export interface FooterBlockProps {
    /** Copyright line (e.g. "© LYORE ABAYA 2026") */
    copyrightText: string;
    /**
     * Hardcoded second line — not translated.
     * Always: "Crafted with care · UAE 🇦🇪"
     */
    readonly craftedText: "Crafted with care · UAE 🇦🇪";
}

// ─── Language Switcher ────────────────────────────────────────────────────────

/**
 * Already implemented in Phase 1.
 * Documented here for reference; component lives at
 * src/components/layout/LanguageSwitcher.tsx
 */
export interface LanguageSwitcherProps {
    /** The currently active locale — drives label and navigation target */
    currentLocale: Locale;
}

// ─── Page Layout ─────────────────────────────────────────────────────────────

export interface BioPageProps {
    /** Active locale — drives direction, font family, and all translated text */
    locale: Locale;
}

// ─── Social Platform Config ───────────────────────────────────────────────────

/**
 * Static configuration for all 4 social platforms.
 * URLs are final brand-confirmed values.
 */
export const SOCIAL_PLATFORM_CONFIG: Record<
    SocialPlatform,
    { href: string; arLabel: string; enLabel: string }
> = {
    instagram: {
        href: "https://instagram.com/lyoreabaya",
        arLabel: "انستغرام",
        enLabel: "Instagram",
    },
    tiktok: {
        href: "https://tiktok.com/@lyoreabaya",
        arLabel: "تيك توك",
        enLabel: "TikTok",
    },
    snapchat: {
        href: "https://snapchat.com/add/lyoreabaya",
        arLabel: "سناب",
        enLabel: "Snapchat",
    },
    email: {
        href: "mailto:info@lyoreabaya.com",
        arLabel: "ايميل",
        enLabel: "Email",
    },
};

/**
 * Pre-encoded WhatsApp URL with Arabic inquiry message.
 * Static — not locale-dependent (message is always in Arabic per brand decision).
 */
export const WHATSAPP_HREF =
    "https://wa.me/971502507859?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20LYORE%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA%D9%83%D9%85%20%E2%9C%A8";

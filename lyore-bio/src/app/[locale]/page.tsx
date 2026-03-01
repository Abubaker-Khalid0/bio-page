import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import CoverSection from "@/components/sections/CoverSection";
import LogoIdentityBlock from "@/components/sections/LogoIdentityBlock";
import ActionButtons from "@/components/sections/ActionButtons";
import SocialLinks from "@/components/sections/SocialLinks";
import FooterBlock from "@/components/sections/FooterBlock";
import { StaggerGroup } from "@/components/sections/AnimatedTest";
import { SOCIAL_PLATFORM_CONFIG } from "@/../../specs/002-ui-layout-components/contracts/ui-components";
import type { SocialLinkItemProps } from "@/../../specs/002-ui-layout-components/contracts/ui-components";

/* ============================================================
   Bio Page — Phase 2: UI Layout & Components
   Phase 3 (animations) and Phase 4 (i18n text) are added later.
   ============================================================ */

const WHATSAPP_HREF =
    "https://wa.me/971502507859?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20LYORE%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA%D9%83%D9%85%20%E2%9C%A8";

// Social media items configuration
const SOCIAL_ITEMS: SocialLinkItemProps[] = [
    {
        platform: "instagram",
        icon: null as any, // Icon is mapped internally in SocialLinks component
        label: SOCIAL_PLATFORM_CONFIG.instagram.arLabel,
        href: SOCIAL_PLATFORM_CONFIG.instagram.href,
    },
    {
        platform: "tiktok",
        icon: null as any,
        label: SOCIAL_PLATFORM_CONFIG.tiktok.arLabel,
        href: SOCIAL_PLATFORM_CONFIG.tiktok.href,
    },
    {
        platform: "snapchat",
        icon: null as any,
        label: SOCIAL_PLATFORM_CONFIG.snapchat.arLabel,
        href: SOCIAL_PLATFORM_CONFIG.snapchat.href,
    },
    {
        platform: "email",
        icon: null as any,
        label: SOCIAL_PLATFORM_CONFIG.email.arLabel,
        href: SOCIAL_PLATFORM_CONFIG.email.href,
    },
];

export default function HomePage() {
    return (
        <main className="max-w-[480px] mx-auto w-full relative min-h-screen bg-brand-background">
            {/* Language switcher — fixed, outside document flow */}
            <LanguageSwitcher />

            {/* ── US1: Page renders on mobile ── */}
            <CoverSection />
            <StaggerGroup className="flex flex-col items-center px-5 gap-3 pb-2">
                <LogoIdentityBlock
                    brandName="LYORE ABAYA"
                    tagline="حيث تلتقي الأناقة بالاحتشام"
                    logoSrc="/images/logo.png"
                    logoAlt="LYORE"
                />

                {/* ── US2: WhatsApp CTA + disabled website button ── */}
                <ActionButtons
                    whatsappLabel="تواصلي معنا"
                    websiteLabel="الموقع قريباً"
                    whatsappHref={WHATSAPP_HREF}
                />

                {/* ── US4: Social media links ── */}
                <SocialLinks sectionLabel="تابعنا" items={SOCIAL_ITEMS} />

                {/* ── Footer ── */}
                <FooterBlock
                    copyrightText="© LYORE ABAYA 2026"
                    craftedText="Crafted with care · UAE 🇦🇪"
                />
            </StaggerGroup>
        </main>
    );
}

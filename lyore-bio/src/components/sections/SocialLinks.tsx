import {
    IconBrandInstagram,
    IconBrandTiktok,
    IconBrandSnapchat,
    IconMail,
} from "@tabler/icons-react";
import type { SocialLinkItemProps, SocialLinksProps } from "@/../../specs/002-ui-layout-components/contracts/ui-components";

/**
 * SocialLinks — Phase 5: UI Layout & Components
 *
 * Displays 4 social platform icons with labels in a horizontal row.
 * Each icon is a clickable link that opens the platform in a new tab.
 * Hover states transition icons and labels to gold accent color.
 *
 * Tap targets are ≥ 52×52px for accessibility.
 */

const ICON_MAP = {
    instagram: IconBrandInstagram,
    tiktok: IconBrandTiktok,
    snapchat: IconBrandSnapchat,
    email: IconMail,
};

export default function SocialLinks({
    sectionLabel,
    items,
}: SocialLinksProps) {
    return (
        <section className="w-full mt-4">
            {/* Section label */}
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-accent text-center mt-8 mb-6 drop-shadow-sm">
                {sectionLabel}
            </p>

            {/* Icons row */}
            <div className="flex items-center justify-center gap-7">
                {items.map((item) => {
                    const IconComponent = ICON_MAP[item.platform];
                    return (
                        <a
                            key={item.platform}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.label}
                            className="group flex flex-col items-center justify-center gap-1.5 min-w-[52px] min-h-[52px]"
                        >
                            <IconComponent
                                size={28}
                                stroke={1.5}
                                className="text-brand-primary group-hover:text-brand-accent group-hover:-translate-y-1 transition-all duration-300"
                                aria-hidden="true"
                            />
                            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-brand-primary/80 group-hover:text-brand-accent transition-colors duration-300">
                                {item.label}
                            </span>
                        </a>
                    );
                })}
            </div>
        </section>
    );
}

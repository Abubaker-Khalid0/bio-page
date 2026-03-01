import { IconBrandWhatsapp, IconWorld } from "@tabler/icons-react";

interface ActionButtonsGroupProps {
    whatsappLabel: string;
    websiteLabel: string;
    whatsappHref: string;
}

/**
 * ActionButtons — Phase 2: UI Layout & Components
 *
 * Two full-width buttons stacked vertically:
 * 1. WhatsApp (primary) — maroon background, opens wa.me in new tab
 * 2. Website (disabled) — faded outline, completely non-interactive
 *
 * Phase 3 will add entrance animations (slide-up + opacity).
 * Phase 4 will wire labels to i18n translations.
 */
export default function ActionButtons({
    whatsappLabel,
    websiteLabel,
    whatsappHref,
}: ActionButtonsGroupProps) {
    return (
        <div className="flex flex-col items-center gap-3 w-full max-w-[320px] mx-auto mt-4">
            {/* ── WhatsApp (primary) ── */}
            <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-row items-center justify-center gap-3 h-14 w-full rounded-full bg-brand-primary text-white text-base font-semibold uppercase tracking-widest hover:bg-[#3D0000] active:scale-[0.98] hover:scale-[1.02] hover:shadow-lg hover:shadow-brand-primary/20 transition-all duration-[400ms] ease-out"
            >
                <IconBrandWhatsapp size={20} stroke={2} aria-hidden="true" className="group-hover:scale-110 transition-transform duration-300" />
                {whatsappLabel}
            </a>

            {/* ── Website coming soon (disabled) ── */}
            <div
                role="button"
                aria-disabled="true"
                className="flex items-center justify-center gap-3 h-14 w-full rounded-full border border-brand-primary/40 text-brand-primary/40 text-base font-semibold uppercase tracking-widest cursor-not-allowed pointer-events-none"
            >
                <IconWorld size={20} stroke={2} aria-hidden="true" className="opacity-40" />
                {websiteLabel}
            </div>
        </div>
    );
}

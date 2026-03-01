import type { FooterBlockProps } from "@/../../specs/002-ui-layout-components/contracts/ui-components";

/**
 * FooterBlock — Phase 5: UI Layout & Components
 *
 * Page footer with:
 * - Gold horizontal line
 * - Copyright text (locale-dependent)
 * - "Crafted with care" line (always English, hardcoded)
 *
 * Bottom padding includes safe-area-inset for notched devices.
 */
export default function FooterBlock({
    copyrightText,
    craftedText,
}: FooterBlockProps) {
    return (
        <footer className="flex flex-col items-center pt-8 pb-[calc(10px+env(safe-area-inset-bottom))]">
            {/* Gold line */}
            <div
                className="w-[30px] h-0.5 bg-brand-accent mb-4"
                aria-hidden="true"
            />

            {/* Copyright */}
            <p className="text-[10px] uppercase tracking-widest text-brand-text/25 text-center">
                {copyrightText}
            </p>

            {/* Crafted line */}
            <p className="text-[10px] text-brand-text/25 text-center mt-1.5">                {craftedText}
            </p>
        </footer>
    );
}

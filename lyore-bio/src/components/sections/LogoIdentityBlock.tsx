import Image from "next/image";

interface LogoIdentityBlockProps {
    brandName: string;
    tagline: string;
    logoSrc: string;
    logoAlt: string;
}

/**
 * LogoIdentityBlock — Phase 2: UI Layout & Components
 *
 * Circular logo container that overlaps the CoverSection by -45px,
 * followed by brand name, gold divider, and tagline.
 *
 * Phase 3 will add entrance animations to each child element.
 * Phase 4 will wire brandName and tagline to i18n translations.
 */
export default function LogoIdentityBlock({
    brandName,
    tagline,
    logoSrc,
    logoAlt,
}: LogoIdentityBlockProps) {
    return (
        <div className="flex flex-col items-center w-full">
            {/* ── Logo circle ── */}
            <div className="relative w-[130px] h-[130px] rounded-full bg-brand-surface border border-brand-accent/30 shadow-xl shadow-black/10 -mt-[85px] overflow-hidden shrink-0">
                <div className="relative w-full h-full">
                    <Image
                        src={logoSrc}
                        alt={logoAlt}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </div>
            </div>

            {/* ── Brand name ── */}
            <p className="font-display text-[1.8rem] font-semibold text-center tracking-[0.25em] text-brand-text mt-4 uppercase drop-shadow-sm">
                {brandName}
            </p>

            {/* ── Gold divider ── */}
            <div
                className="w-[40px] h-px bg-brand-accent my-2.5"
                aria-hidden="true"
            />

            {/* ── Tagline ── */}
            <p className="text-[1rem] font-light text-center tracking-[0.04em] text-brand-text/75 px-6">
                {tagline}
            </p>
        </div>
    );
}

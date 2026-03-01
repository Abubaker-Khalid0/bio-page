/**
 * CoverSection — Phase 2: UI Layout & Components
 *
 * Full-width maroon header block at the top of the bio page.
 * Enhanced with a premium top-to-bottom gradient.
 * The logo circle (LogoIdentityBlock) overlaps this by -45px margin.
 */
export default function CoverSection() {
    return (
        <div
            className="h-[25vh] min-h-[150px] w-full bg-gradient-to-b from-brand-primary via-brand-primary to-[#3D0000] shadow-sm rounded-b-[2.5rem]"
            aria-hidden="true"
        />
    );
}

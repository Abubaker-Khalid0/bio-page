"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import AnimatedTest, { StaggerGroup } from "@/components/sections/AnimatedTest";

/* ============================================================
   Design System + UI Library + Animation Test Page
   ============================================================ */
export default function HomePage() {
    const t = useTranslations("bio");

    return (
        <main className="min-h-screen bg-[var(--color-background)] p-md">
            {/* ── Header ── */}
            <header className="flex items-center justify-between mb-xl">
                <p className="text-brand-accent font-display tracking-widest uppercase text-xs">
                    Design System
                </p>
                <LanguageSwitcher />
            </header>

            {/* ── Brand (animated) ── */}
            <AnimatedTest>
                <section className="text-center mb-xl">
                    <h1
                        style={{ fontSize: "var(--text-brand)" }}
                        className="text-brand-primary font-display tracking-widest uppercase"
                    >
                        {t("brandName")}
                    </h1>
                    <div
                        className="mx-auto my-sm"
                        style={{ width: 48, height: 1, backgroundColor: "var(--color-accent)" }}
                        aria-hidden="true"
                    />
                    <p style={{ fontSize: "var(--text-tagline)" }} className="text-brand-text opacity-80">
                        {t("tagline")}
                    </p>
                </section>
            </AnimatedTest>

            {/* ── Color Tokens ── */}
            <AnimatedTest delay={0.15}>
                <section className="mb-xl">
                    <h2 className="text-brand-primary font-display text-lg tracking-wider uppercase mb-sm">
                        Color Tokens
                    </h2>
                    <div className="grid grid-cols-2 gap-sm sm:grid-cols-4">
                        {[
                            { name: "Primary", cls: "bg-[var(--color-primary)]", hex: "#550000" },
                            { name: "Secondary", cls: "bg-[var(--color-secondary)]", hex: "#6B1C23" },
                            { name: "Accent", cls: "bg-[var(--color-accent)]", hex: "#C9A96E" },
                            { name: "Background", cls: "bg-[var(--color-background)] border border-brand-border", hex: "#FAF7F4" },
                            { name: "Surface", cls: "bg-[var(--color-surface)] border border-brand-border", hex: "#FFFFFF" },
                            { name: "Text", cls: "bg-[var(--color-text)]", hex: "#0A0A0A" },
                            { name: "Border", cls: "bg-[var(--color-border)]", hex: "#0A0A0A1A" },
                        ].map((c) => (
                            <div key={c.name} className="flex flex-col items-center gap-xs">
                                <div className={`w-16 h-16 rounded-sm ${c.cls}`} />
                                <span style={{ fontSize: "var(--text-label)" }} className="text-brand-text tracking-wider uppercase">
                                    {c.name}
                                </span>
                                <span style={{ fontSize: "var(--text-footer)" }} className="text-brand-text opacity-50 font-mono">
                                    {c.hex}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </AnimatedTest>

            {/* ── Spacing Tokens ── */}
            <AnimatedTest delay={0.3}>
                <section className="mb-xl">
                    <h2 className="text-brand-primary font-display text-lg tracking-wider uppercase mb-sm">
                        Spacing Tokens
                    </h2>
                    <div className="flex flex-col gap-xs">
                        {[
                            { name: "--space-xs", val: "8px", tw: "p-xs" },
                            { name: "--space-sm", val: "16px", tw: "p-sm" },
                            { name: "--space-md", val: "24px", tw: "p-md" },
                            { name: "--space-lg", val: "32px", tw: "p-lg" },
                            { name: "--space-xl", val: "48px", tw: "p-xl" },
                        ].map((s) => (
                            <div key={s.name} className="flex items-center gap-sm">
                                <div className="bg-brand-accent h-4 rounded-sm" style={{ width: s.val }} />
                                <span style={{ fontSize: "var(--text-label)" }} className="text-brand-text tracking-wider uppercase">
                                    {s.name} = {s.val} → {s.tw}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </AnimatedTest>

            {/* ── Typography Tokens ── */}
            <AnimatedTest delay={0.45}>
                <section className="mb-xl">
                    <h2 className="text-brand-primary font-display text-lg tracking-wider uppercase mb-sm">
                        Typography Tokens
                    </h2>
                    <div className="flex flex-col gap-sm bg-brand-surface p-md rounded-sm border border-brand-border">
                        <p style={{ fontSize: "var(--text-brand)" }} className="text-brand-primary font-display tracking-widest">
                            --text-brand (2.4rem)
                        </p>
                        <p style={{ fontSize: "var(--text-tagline)" }} className="text-brand-text">
                            --text-tagline (0.95rem)
                        </p>
                        <p style={{ fontSize: "var(--text-button)" }} className="text-brand-accent tracking-wider uppercase">
                            --text-button (0.75rem)
                        </p>
                        <p style={{ fontSize: "var(--text-label)" }} className="text-brand-text tracking-wider uppercase">
                            --text-label (0.625rem)
                        </p>
                        <p style={{ fontSize: "var(--text-footer)" }} className="text-brand-text opacity-60">
                            --text-footer (0.625rem)
                        </p>
                    </div>
                </section>
            </AnimatedTest>

            {/* ── shadcn/ui Buttons ── */}
            <AnimatedTest delay={0.6}>
                <section className="mb-xl">
                    <h2 className="text-brand-primary font-display text-lg tracking-wider uppercase mb-sm">
                        shadcn/ui Button
                    </h2>
                    <div className="flex flex-wrap gap-sm bg-brand-surface p-md rounded-sm border border-brand-border">
                        <Button variant="default">Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                    </div>
                    <h3 className="text-brand-text text-sm tracking-wider uppercase mt-md mb-xs">Sizes</h3>
                    <div className="flex flex-wrap items-center gap-sm bg-brand-surface p-md rounded-sm border border-brand-border">
                        <Button size="xs">XS</Button>
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                    </div>
                    <h3 className="text-brand-text text-sm tracking-wider uppercase mt-md mb-xs">Brand-styled</h3>
                    <div className="flex flex-wrap gap-sm bg-brand-surface p-md rounded-sm border border-brand-border">
                        <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-[var(--color-surface)] tracking-wider uppercase">
                            {t("ctaShop")}
                        </Button>
                        <Button
                            variant="outline"
                            className="border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-background)] tracking-wider uppercase"
                        >
                            {t("ctaWhatsApp")}
                        </Button>
                    </div>
                </section>
            </AnimatedTest>

            {/* ── Stagger Animation Demo (T043-T044) ── */}
            <section className="mb-xl">
                <h2 className="text-brand-primary font-display text-lg tracking-wider uppercase mb-sm">
                    Stagger Animation
                </h2>
                <StaggerGroup staggerDelay={0.1} className="flex flex-col gap-sm">
                    {[
                        { label: "Item 1 — delay: 0ms", color: "var(--color-primary)" },
                        { label: "Item 2 — delay: 100ms", color: "var(--color-secondary)" },
                        { label: "Item 3 — delay: 200ms", color: "var(--color-accent)" },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="p-md rounded-sm border border-brand-border bg-brand-surface flex items-center gap-sm"
                        >
                            <div
                                className="w-4 h-4 rounded-full shrink-0"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-brand-text text-sm tracking-wider">{item.label}</span>
                        </div>
                    ))}
                </StaggerGroup>
            </section>

            {/* ── Font Tests ── */}
            <AnimatedTest delay={0.8}>
                <section className="mb-xl">
                    <h2 className="text-brand-primary font-display text-lg tracking-wider uppercase mb-sm">
                        Arabic Fonts
                    </h2>
                    <div className="flex flex-col gap-sm bg-brand-surface p-md rounded-sm border border-brand-border" dir="rtl">
                        <p className="font-naskh text-2xl text-brand-primary">
                            نوتو نسخ عربي — عنوان رئيسي (Noto Naskh Arabic)
                        </p>
                        <p className="font-tajawal text-base text-brand-text">
                            تجوال — نص الجسم العادي للفقرات والتفاصيل (Tajawal)
                        </p>
                    </div>
                </section>
            </AnimatedTest>

            <AnimatedTest delay={0.9}>
                <section className="mb-xl">
                    <h2 className="text-brand-primary font-display text-lg tracking-wider uppercase mb-sm">
                        English Fonts
                    </h2>
                    <div className="flex flex-col gap-sm bg-brand-surface p-md rounded-sm border border-brand-border">
                        <p className="font-display text-2xl text-brand-primary tracking-wider">
                            Playfair Display — Display Heading
                        </p>
                        <p className="font-body text-base text-brand-text">
                            Inter — Body text for paragraphs and details
                        </p>
                    </div>
                </section>
            </AnimatedTest>
        </main>
    );
}

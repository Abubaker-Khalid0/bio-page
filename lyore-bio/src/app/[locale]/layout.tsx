import type { Viewport, Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import "../../styles/globals.css";

/* ============================================================
   Self-hosted fonts — per contracts/font-config.ts
   ============================================================ */
const playfairDisplay = localFont({
  src: "../../../public/fonts/playfair-display/playfair-display.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "400 600 700",
  fallback: ["Georgia", "serif"],
});

const inter = localFont({
  src: "../../../public/fonts/inter/inter.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "300 400 600",
  fallback: ["Arial", "sans-serif"],
});

const notoNaskhArabic = localFont({
  src: "../../../public/fonts/noto-naskh-arabic/noto-naskh-arabic.woff2",
  variable: "--font-naskh",
  display: "swap",
  weight: "400 600 700",
  fallback: ["Traditional Arabic", "serif"],
});

const tajawal = localFont({
  src: "../../../public/fonts/tajawal/tajawal.woff2",
  variable: "--font-tajawal",
  display: "swap",
  weight: "300 400 500",
  fallback: ["Arial", "sans-serif"],
});

/* ============================================================
   Viewport
   ============================================================ */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/* ============================================================
   Metadata — favicon / app icons
   ============================================================ */
export const metadata: Metadata = {
  title: "LYORE ABAYA",
  icons: {
    icon: "/favicon.ico",
    apple: "/images/logo.png",
  },
};

/* ============================================================
   Supported locales
   ============================================================ */
const locales = ["ar", "en"];

/* ============================================================
   Locale layout — owns <html> and <body>
   Sets lang, dir, and locale-appropriate font stack.
   ============================================================ */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = locale === "ar" ? "rtl" : "ltr";

  // All four font CSS-variable classes are always present so
  // Tailwind utilities like font-display / font-body work everywhere.
  const fontClasses = [
    playfairDisplay.variable,
    inter.variable,
    notoNaskhArabic.variable,
    tajawal.variable,
  ].join(" ");

  return (
    <html lang={locale} dir={direction} className={fontClasses}>
      <body className="antialiased bg-brand-background text-brand-text">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

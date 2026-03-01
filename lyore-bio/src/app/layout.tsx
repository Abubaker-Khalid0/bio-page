import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";

/* ============================================================
   Self-hosted fonts — per contracts/font-config.ts
   ============================================================ */
const playfairDisplay = localFont({
  src: "../../public/fonts/playfair-display/playfair-display.woff2",
  variable: "--font-display",
  weight: "400 600 700",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const inter = localFont({
  src: "../../public/fonts/inter/inter.woff2",
  variable: "--font-body",
  weight: "300 400 600",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const notoNaskhArabic = localFont({
  src: "../../public/fonts/noto-naskh-arabic/noto-naskh-arabic.woff2",
  variable: "--font-naskh",
  weight: "400 600 700",
  display: "swap",
  fallback: ["Traditional Arabic", "serif"],
});

const tajawal = localFont({
  src: "../../public/fonts/tajawal/tajawal.woff2",
  variable: "--font-tajawal",
  weight: "300 400 500",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

/* ============================================================
   Metadata
   ============================================================ */
export const metadata: Metadata = {
  title: "LYORE ABAYA | ليور عباية",
  description: "Luxury abayas that reflect your elegance | عباءات فاخرة تعكس أناقتك",
};

/* ============================================================
   Root layout — owns <html> and <body>
   lang/dir are set dynamically by the [locale] layout via script
   ============================================================ */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      className={`${playfairDisplay.variable} ${inter.variable} ${notoNaskhArabic.variable} ${tajawal.variable}`}
    >
      <body className="antialiased bg-[var(--color-background)] text-[var(--color-text)]">
        {children}
      </body>
    </html>
  );
}

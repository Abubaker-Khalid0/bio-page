import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import "../globals.css";

const playfairDisplay = localFont({
  src: "../../../public/fonts/playfair-display/playfair-display.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "400 600 700",
});

const inter = localFont({
  src: "../../../public/fonts/inter/inter.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "300 400 600",
});

const notoNaskhArabic = localFont({
  src: "../../../public/fonts/noto-naskh-arabic/noto-naskh-arabic.woff2",
  variable: "--font-naskh",
  display: "swap",
  weight: "400 600 700",
});

const tajawal = localFont({
  src: "../../../public/fonts/tajawal/tajawal.woff2",
  variable: "--font-tajawal",
  display: "swap",
  weight: "300 400 500",
});

export const metadata: Metadata = {
  title: "LYORE ABAYA",
  description: "Where elegance meets modesty",
};

const locales = ["ar", "en"];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = locale === "ar" ? "rtl" : "ltr";
  const fontFamily = locale === "ar" 
    ? `${tajawal.variable} ${notoNaskhArabic.variable}` 
    : `${inter.variable} ${playfairDisplay.variable}`;

  return (
    <html lang={locale} dir={direction}>
      <body
        className={`${fontFamily} antialiased bg-lyore-background text-lyore-text`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

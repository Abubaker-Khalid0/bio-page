import type { Metadata } from "next";

/* ============================================================
   Root layout — pass-through only.
   <html> and <body> are rendered by [locale]/layout.tsx
   to allow dynamic lang / dir attributes per locale.
   ============================================================ */

export const metadata: Metadata = {
  title: "LYORE ABAYA | ليور عباية",
  description:
    "Luxury abayas that reflect your elegance | عباءات فاخرة تعكس أناقتك",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

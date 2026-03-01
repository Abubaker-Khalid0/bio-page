"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { motion } from "motion/react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    router.push(pathname, { locale: newLocale });
  };

  return (
    <motion.button
      onClick={switchLocale}
      className="fixed top-4 end-4 z-50 bg-white/70 backdrop-blur-md border border-white/50 px-4 py-[6px] h-[34px] text-[11px] uppercase tracking-[0.15em] text-brand-text/80 hover:text-brand-text hover:bg-white/90 transition-all duration-300 ease-out"
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
    >
      {locale === "ar" ? "EN" : "عربي"}
    </motion.button>
  );
}

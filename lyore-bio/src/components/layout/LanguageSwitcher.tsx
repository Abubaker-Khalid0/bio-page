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
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <motion.button
      onClick={switchLocale}
      className="fixed top-4 end-4 z-50 bg-white border border-brand-text/10 px-[14px] py-[6px] h-[34px] text-[11px] uppercase tracking-[0.15em] text-brand-text/70 hover:text-brand-text transition-colors"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
    >
      {locale === "ar" ? "EN" : "عربي"}
    </motion.button>
  );
}

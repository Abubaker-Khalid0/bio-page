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
      className="fixed top-5 end-5 z-50 flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-brand-text/90 shadow-[0_4px_20px_rgb(0,0,0,0.06)] hover:bg-white hover:text-brand-text hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-300 ease-out group"
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="15" 
        height="15" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="group-hover:rotate-12 transition-transform duration-300"
      >
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
        <path d="M3.6 9h16.8"></path>
        <path d="M3.6 15h16.8"></path>
        <path d="M11.5 3a17 17 0 0 0 0 18"></path>
        <path d="M12.5 3a17 17 0 0 1 0 18"></path>
      </svg>
      <span className="mt-[2px]">{locale === "ar" ? "EN" : "عربي"}</span>
    </motion.button>
  );
}

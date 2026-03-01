/**
 * Locale Configuration Contract
 * 
 * Defines the structure for language and directionality settings
 * in the bilingual LYORE ABAYA bio page application.
 * 
 * @module contracts/locale-config
 */

/**
 * Supported locale codes
 */
export type LocaleCode = 'ar' | 'en';

/**
 * Text direction for locale
 */
export type TextDirection = 'rtl' | 'ltr';

/**
 * Font configuration for a locale
 */
export interface LocaleFonts {
  /** CSS font-family value for headings */
  heading: string;
  /** CSS font-family value for body text */
  body: string;
}

/**
 * Complete locale configuration
 */
export interface LocaleConfig {
  /** Locale identifier (ISO 639-1 code) */
  code: LocaleCode;
  
  /** Text direction for this locale */
  direction: TextDirection;
  
  /** Human-readable locale name in native language */
  displayName: string;
  
  /** Font family configuration for this locale */
  fonts: LocaleFonts;
}

/**
 * Locale configuration map
 */
export type LocaleConfigMap = Record<LocaleCode, LocaleConfig>;

/**
 * Example locale configurations
 */
export const LOCALE_CONFIGS: LocaleConfigMap = {
  ar: {
    code: 'ar',
    direction: 'rtl',
    displayName: 'العربية',
    fonts: {
      heading: 'var(--font-naskh)',
      body: 'var(--font-tajawal)'
    }
  },
  en: {
    code: 'en',
    direction: 'ltr',
    displayName: 'English',
    fonts: {
      heading: 'var(--font-display)',
      body: 'var(--font-body)'
    }
  }
};

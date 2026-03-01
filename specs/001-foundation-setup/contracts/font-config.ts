/**
 * Font Configuration Contract
 * 
 * Defines the structure for font loading configuration using next/font/local.
 * All fonts are self-hosted as .woff2 files per constitution requirements.
 * 
 * @module contracts/font-config
 */

/**
 * Font display strategy
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display
 */
export type FontDisplay = 'auto' | 'block' | 'swap' | 'fallback' | 'optional';

/**
 * Font style
 */
export type FontStyle = 'normal' | 'italic';

/**
 * Font source definition
 */
export interface FontSource {
  /** Path to font file relative to project root */
  path: string;
  /** Font weight for this file (optional) */
  weight?: string;
  /** Font style for this file (optional) */
  style?: FontStyle;
}

/**
 * Font configuration for next/font/local
 */
export interface FontConfig {
  /** Font family name */
  family: string;
  
  /** Path to font file(s) - string for single file, array for multiple */
  src: string | FontSource[];
  
  /** Font weights to load (e.g., "400 600 700") */
  weight?: string;
  
  /** Font style */
  style?: FontStyle;
  
  /** Font display strategy (recommended: "swap") */
  display?: FontDisplay;
  
  /** CSS variable name for this font (e.g., "--font-display") */
  variable: string;
  
  /** Fallback font stack */
  fallback?: string[];
  
  /** Subset to preload (e.g., ["latin", "arabic"]) */
  subsets?: string[];
}

/**
 * Font configurations for all project fonts
 */
export const FONT_CONFIGS: Record<string, FontConfig> = {
  playfairDisplay: {
    family: 'Playfair Display',
    src: './public/fonts/playfair-display/playfair-display.woff2',
    weight: '400 600 700',
    style: 'normal',
    display: 'swap',
    variable: '--font-display',
    fallback: ['Georgia', 'serif'],
    subsets: ['latin']
  },
  
  inter: {
    family: 'Inter',
    src: './public/fonts/inter/inter.woff2',
    weight: '300 400 600',
    style: 'normal',
    display: 'swap',
    variable: '--font-body',
    fallback: ['Arial', 'sans-serif'],
    subsets: ['latin']
  },
  
  notoNaskhArabic: {
    family: 'Noto Naskh Arabic',
    src: './public/fonts/noto-naskh-arabic/noto-naskh-arabic.woff2',
    weight: '400 600 700',
    style: 'normal',
    display: 'swap',
    variable: '--font-naskh',
    fallback: ['Traditional Arabic', 'serif'],
    subsets: ['arabic']
  },
  
  tajawal: {
    family: 'Tajawal',
    src: './public/fonts/tajawal/tajawal.woff2',
    weight: '300 400 500',
    style: 'normal',
    display: 'swap',
    variable: '--font-tajawal',
    fallback: ['Arial', 'sans-serif'],
    subsets: ['arabic']
  }
};

/**
 * Font loading priorities
 */
export const FONT_PRIORITIES = {
  /** Fonts to preload (critical for initial render) */
  preload: ['inter', 'tajawal'],
  
  /** Fonts to load on demand */
  onDemand: ['playfairDisplay', 'notoNaskhArabic']
};

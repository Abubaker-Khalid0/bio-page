/**
 * Design Tokens Contract
 * 
 * Defines the structure for design system values (colors, spacing, typography)
 * as specified in the LYORE ABAYA constitution.
 * 
 * @module contracts/design-tokens
 */

/**
 * Design token category
 */
export type TokenCategory = 'color' | 'spacing' | 'typography';

/**
 * Design token definition
 */
export interface DesignToken {
  /** Token identifier (e.g., "primary", "accent") */
  name: string;
  
  /** CSS value (e.g., "#550000", "8px", "2.4rem") */
  value: string;
  
  /** Token category */
  category: TokenCategory;
  
  /** CSS custom property name (e.g., "--color-primary") */
  cssVariable: string;
  
  /** Optional human-readable description */
  description?: string;
}

/**
 * Color tokens as defined in constitution
 */
export const COLOR_TOKENS: DesignToken[] = [
  {
    name: 'primary',
    value: '#550000',
    category: 'color',
    cssVariable: '--color-primary',
    description: 'Deep maroon - cover background, primary button'
  },
  {
    name: 'secondary',
    value: '#6B1C23',
    category: 'color',
    cssVariable: '--color-secondary',
    description: 'Secondary maroon shade'
  },
  {
    name: 'accent',
    value: '#C9A96E',
    category: 'color',
    cssVariable: '--color-accent',
    description: 'Champagne gold - dividers, labels, accents'
  },
  {
    name: 'background',
    value: '#FAF7F4',
    category: 'color',
    cssVariable: '--color-background',
    description: 'Warm off-white - page background'
  },
  {
    name: 'surface',
    value: '#FFFFFF',
    category: 'color',
    cssVariable: '--color-surface',
    description: 'Pure white - logo background, button text'
  },
  {
    name: 'text',
    value: '#0A0A0A',
    category: 'color',
    cssVariable: '--color-text',
    description: 'Near black - body text'
  },
  {
    name: 'border',
    value: '#0A0A0A1A',
    category: 'color',
    cssVariable: '--color-border',
    description: 'Black at 10% opacity - subtle borders'
  }
];

/**
 * Spacing tokens as defined in constitution
 */
export const SPACING_TOKENS: DesignToken[] = [
  {
    name: 'xs',
    value: '8px',
    category: 'spacing',
    cssVariable: '--space-xs'
  },
  {
    name: 'sm',
    value: '16px',
    category: 'spacing',
    cssVariable: '--space-sm'
  },
  {
    name: 'md',
    value: '24px',
    category: 'spacing',
    cssVariable: '--space-md'
  },
  {
    name: 'lg',
    value: '32px',
    category: 'spacing',
    cssVariable: '--space-lg'
  },
  {
    name: 'xl',
    value: '48px',
    category: 'spacing',
    cssVariable: '--space-xl'
  }
];

/**
 * Typography tokens as defined in constitution
 */
export const TYPOGRAPHY_TOKENS: DesignToken[] = [
  {
    name: 'brand',
    value: '2.4rem',
    category: 'typography',
    cssVariable: '--text-brand',
    description: 'LYORE ABAYA brand name'
  },
  {
    name: 'tagline',
    value: '0.95rem',
    category: 'typography',
    cssVariable: '--text-tagline',
    description: 'Bio/tagline text'
  },
  {
    name: 'button',
    value: '0.75rem',
    category: 'typography',
    cssVariable: '--text-button',
    description: 'Button labels'
  },
  {
    name: 'label',
    value: '0.625rem',
    category: 'typography',
    cssVariable: '--text-label',
    description: 'Section labels'
  },
  {
    name: 'footer',
    value: '0.625rem',
    category: 'typography',
    cssVariable: '--text-footer',
    description: 'Footer copyright text'
  }
];

/**
 * All design tokens combined
 */
export const ALL_TOKENS: DesignToken[] = [
  ...COLOR_TOKENS,
  ...SPACING_TOKENS,
  ...TYPOGRAPHY_TOKENS
];

/**
 * Generate CSS custom properties from tokens
 */
export function generateCSSVariables(tokens: DesignToken[]): string {
  return tokens
    .map(token => `  ${token.cssVariable}: ${token.value};`)
    .join('\n');
}

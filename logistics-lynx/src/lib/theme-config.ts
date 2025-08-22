// 🎨 TRANS BOT AI - ADVANCED THEME CONFIGURATION
// Enterprise-grade design system with semantic tokens and theme variants

export const themeConfig = {
  // 🌈 Color Palette - Semantic Design Tokens
  colors: {
    // Primary Brand Colors
    primary: {
      50: 'hsl(221.2 83.2% 53.3% / 0.1)',
      100: 'hsl(221.2 83.2% 53.3% / 0.2)',
      200: 'hsl(221.2 83.2% 53.3% / 0.3)',
      300: 'hsl(221.2 83.2% 53.3% / 0.4)',
      400: 'hsl(221.2 83.2% 53.3% / 0.5)',
      500: 'hsl(221.2 83.2% 53.3% / 0.6)',
      600: 'hsl(221.2 83.2% 53.3% / 0.7)',
      700: 'hsl(221.2 83.2% 53.3% / 0.8)',
      800: 'hsl(221.2 83.2% 53.3% / 0.9)',
      900: 'hsl(221.2 83.2% 53.3% / 1)',
      DEFAULT: 'hsl(221.2 83.2% 53.3%)',
    },
    
    // Semantic Status Colors
    success: {
      50: 'hsl(142.1 76.2% 36.3% / 0.1)',
      100: 'hsl(142.1 76.2% 36.3% / 0.2)',
      500: 'hsl(142.1 76.2% 36.3%)',
      600: 'hsl(142.1 76.2% 36.3% / 0.8)',
      700: 'hsl(142.1 76.2% 36.3% / 0.9)',
      DEFAULT: 'hsl(142.1 76.2% 36.3%)',
    },
    
    warning: {
      50: 'hsl(38 92% 50% / 0.1)',
      100: 'hsl(38 92% 50% / 0.2)',
      500: 'hsl(38 92% 50%)',
      600: 'hsl(38 92% 50% / 0.8)',
      700: 'hsl(38 92% 50% / 0.9)',
      DEFAULT: 'hsl(38 92% 50%)',
    },
    
    error: {
      50: 'hsl(0 84.2% 60.2% / 0.1)',
      100: 'hsl(0 84.2% 60.2% / 0.2)',
      500: 'hsl(0 84.2% 60.2%)',
      600: 'hsl(0 84.2% 60.2% / 0.8)',
      700: 'hsl(0 84.2% 60.2% / 0.9)',
      DEFAULT: 'hsl(0 84.2% 60.2%)',
    },
    
    info: {
      50: 'hsl(221.2 83.2% 53.3% / 0.1)',
      100: 'hsl(221.2 83.2% 53.3% / 0.2)',
      500: 'hsl(221.2 83.2% 53.3%)',
      600: 'hsl(221.2 83.2% 53.3% / 0.8)',
      700: 'hsl(221.2 83.2% 53.3% / 0.9)',
      DEFAULT: 'hsl(221.2 83.2% 53.3%)',
    },
  },

  // 📏 Spacing Scale
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },

  // 📐 Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    full: '9999px',
  },

  // 🌫️ Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },

  // ⚡ Transitions
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: '300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // 📱 Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // 🎯 Z-Index Scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
  },
} as const;

// 🎨 Theme Variants
export const themeVariants = {
  light: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(222.2 84% 4.9%)',
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(222.2 84% 4.9%)',
    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(222.2 84% 4.9%)',
    primary: 'hsl(221.2 83.2% 53.3%)',
    primaryForeground: 'hsl(210 40% 98%)',
    secondary: 'hsl(210 40% 96%)',
    secondaryForeground: 'hsl(222.2 47.4% 11.2%)',
    muted: 'hsl(210 40% 96%)',
    mutedForeground: 'hsl(215.4 16.3% 46.9%)',
    accent: 'hsl(210 40% 96%)',
    accentForeground: 'hsl(222.2 47.4% 11.2%)',
    destructive: 'hsl(0 84.2% 60.2%)',
    destructiveForeground: 'hsl(210 40% 98%)',
    border: 'hsl(214.3 31.8% 91.4%)',
    input: 'hsl(214.3 31.8% 91.4%)',
    ring: 'hsl(221.2 83.2% 53.3%)',
  },
  
  dark: {
    background: 'hsl(222.2 84% 4.9%)',
    foreground: 'hsl(210 40% 98%)',
    card: 'hsl(222.2 84% 4.9%)',
    cardForeground: 'hsl(210 40% 98%)',
    popover: 'hsl(222.2 84% 4.9%)',
    popoverForeground: 'hsl(210 40% 98%)',
    primary: 'hsl(217.2 91.2% 59.8%)',
    primaryForeground: 'hsl(222.2 47.4% 11.2%)',
    secondary: 'hsl(217.2 32.6% 17.5%)',
    secondaryForeground: 'hsl(210 40% 98%)',
    muted: 'hsl(217.2 32.6% 17.5%)',
    mutedForeground: 'hsl(215 20.2% 65.1%)',
    accent: 'hsl(217.2 32.6% 17.5%)',
    accentForeground: 'hsl(210 40% 98%)',
    destructive: 'hsl(0 62.8% 30.6%)',
    destructiveForeground: 'hsl(210 40% 98%)',
    border: 'hsl(217.2 32.6% 17.5%)',
    input: 'hsl(217.2 32.6% 17.5%)',
    ring: 'hsl(224.3 76.3% 94.1%)',
  },
  
  enterprise: {
    background: 'hsl(220 14% 96%)',
    foreground: 'hsl(220 9% 46%)',
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(220 9% 46%)',
    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(220 9% 46%)',
    primary: 'hsl(220 13% 18%)',
    primaryForeground: 'hsl(0 0% 100%)',
    secondary: 'hsl(220 14% 96%)',
    secondaryForeground: 'hsl(220 9% 46%)',
    muted: 'hsl(220 14% 96%)',
    mutedForeground: 'hsl(220 9% 46%)',
    accent: 'hsl(220 14% 96%)',
    accentForeground: 'hsl(220 9% 46%)',
    destructive: 'hsl(0 84% 60%)',
    destructiveForeground: 'hsl(0 0% 100%)',
    border: 'hsl(220 13% 91%)',
    input: 'hsl(220 13% 91%)',
    ring: 'hsl(220 13% 18%)',
  },
} as const;

// 🎯 Component-Specific Theme Tokens
export const componentTokens = {
  button: {
    borderRadius: themeConfig.borderRadius.md,
    fontSize: '0.875rem',
    fontWeight: '500',
    padding: {
      sm: '0.5rem 0.75rem',
      md: '0.5rem 1rem',
      lg: '0.75rem 2rem',
    },
  },
  
  card: {
    borderRadius: themeConfig.borderRadius.lg,
    padding: themeConfig.spacing.lg,
    shadow: themeConfig.shadows.md,
  },
  
  input: {
    borderRadius: themeConfig.borderRadius.md,
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
  },
  
  table: {
    borderRadius: themeConfig.borderRadius.md,
    headerBackground: 'hsl(220 14% 96%)',
    rowHover: 'hsl(220 14% 96%)',
  },
} as const;

// 🎨 CSS Custom Properties Generator
export const generateCSSVariables = (theme: keyof typeof themeVariants) => {
  const vars = themeVariants[theme];
  return Object.entries(vars)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n');
};

// 🎯 Theme Utility Functions
export const themeUtils = {
  // Get color with opacity
  colorWithOpacity: (color: string, opacity: number) => {
    return color.replace(')', ` / ${opacity})`).replace('hsl(', 'hsla(');
  },
  
  // Generate gradient
  gradient: (from: string, to: string, direction: 'to-r' | 'to-br' | 'to-b' = 'to-r') => {
    return `linear-gradient(${direction}, ${from}, ${to})`;
  },
  
  // Generate shadow with color
  shadowWithColor: (shadow: string, color: string) => {
    return shadow.replace('rgb(0 0 0', `hsl(${color}`);
  },
} as const;

// 📦 Export everything
export type ThemeConfig = typeof themeConfig;
export type ThemeVariants = typeof themeVariants;
export type ComponentTokens = typeof componentTokens;

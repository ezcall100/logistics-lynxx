/**
 * Brand Configuration
 * Centralized brand customization for the unified design system
 */

export const brand = {
  name: "Logistics Lynx",
  description: "Next-generation Transportation Management System",
  
  // Primary brand colors - customizable
  primary: {
    50: "#eff6ff",
    100: "#dbeafe", 
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6", // Main brand color
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  
  // Portal-specific accent colors
  portals: {
    "super-admin": {
      primary: "#6366f1", // Indigo
      secondary: "#8b5cf6",
      accent: "#a855f7",
    },
    carrier: {
      primary: "#3b82f6", // Blue
      secondary: "#06b6d4", 
      accent: "#0891b2",
    },
    broker: {
      primary: "#10b981", // Emerald
      secondary: "#059669",
      accent: "#047857",
    },
    shipper: {
      primary: "#8b5cf6", // Purple
      secondary: "#a855f7",
      accent: "#c084fc",
    },
    driver: {
      primary: "#f59e0b", // Amber
      secondary: "#d97706",
      accent: "#b45309",
    },
    "owner-operator": {
      primary: "#ef4444", // Red
      secondary: "#dc2626",
      accent: "#b91c1c",
    },
    factoring: {
      primary: "#06b6d4", // Cyan
      secondary: "#0891b2",
      accent: "#0e7490",
    },
  },
  
  // Typography
  typography: {
    fonts: {
      heading: "Plus Jakarta Sans, system-ui, sans-serif",
      body: "DM Sans, system-ui, sans-serif", 
      mono: "JetBrains Mono, SF Mono, Monaco, monospace",
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  
  // Border radius system
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    "2xl": 24,
    full: 9999,
  },
  
  // Shadow system
  shadows: {
    sm: "0 2px 4px rgba(0, 0, 0, 0.1)",
    md: "0 4px 8px rgba(0, 0, 0, 0.15)",
    lg: "0 8px 16px rgba(0, 0, 0, 0.2)",
    xl: "0 16px 32px rgba(0, 0, 0, 0.25)",
    "2xl": "0 24px 48px rgba(0, 0, 0, 0.3)",
  },
  
  // Spacing system
  spacing: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
  },
  
  // Animation timing
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
  
  // Breakpoints
  breakpoints: {
    xs: "360px",
    sm: "640px", 
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  
  // Feature flags
  features: {
    animations: true,
    reducedMotion: true,
    darkMode: true,
    highContrast: false,
    experimental: false,
  },
};

// Type definitions for brand configuration
export type BrandConfig = typeof brand;
export type PortalKey = keyof typeof brand.portals;
export type ColorScale = keyof typeof brand.primary;

// Utility functions
export const getPortalColor = (portal: PortalKey, scale: ColorScale = "500") => {
  return brand.portals[portal]?.primary || brand.primary[scale];
};

export const getBrandColor = (scale: ColorScale = "500") => {
  return brand.primary[scale];
};

export const getSpacing = (size: keyof typeof brand.spacing) => {
  return `${brand.spacing[size]}px`;
};

export const getRadius = (size: keyof typeof brand.radius) => {
  return `${brand.radius[size]}px`;
};

export const getTransition = (speed: keyof typeof brand.transitions) => {
  return brand.transitions[speed];
};

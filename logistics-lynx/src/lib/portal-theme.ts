/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Portal Theme Helper - Trans Bot AI Design System v2.0
 * Provides runtime portal accent mapping for the 20 canonical portals
 */

export interface PortalAccent {
  accent: string;
  surface: string;
  ink: string;
}

export interface PortalAccentMap {
  [portalKey: string]: PortalAccent;
}

// Default accent map (matches the SQL seeding)
const DEFAULT_ACCENT_MAP: PortalAccentMap = {
  superAdmin: { accent: "#7c3aed", surface: "#0b1020", ink: "#eaeafe" },
  admin: { accent: "#475569", surface: "#0b1020", ink: "#e2e8f0" },
  tmsAdmin: { accent: "#c026d3", surface: "#0b1020", ink: "#f5d0fe" },
  onboarding: { accent: "#0d9488", surface: "#071b1b", ink: "#ccfbf1" },
  broker: { accent: "#0284c7", surface: "#06121b", ink: "#e0f2fe" },
  shipper: { accent: "#4f46e5", surface: "#0b1020", ink: "#e0e7ff" },
  carrier: { accent: "#059669", surface: "#061612", ink: "#d1fae5" },
  driver: { accent: "#d97706", surface: "#1a1003", ink: "#fde68a" },
  ownerOperator: { accent: "#4f46e5", surface: "#0b1020", ink: "#e0e7ff" },
  factoring: { accent: "#e11d48", surface: "#19090b", ink: "#ffe4e6" },
  loadBoard: { accent: "#ea580c", surface: "#1a0e05", ink: "#ffedd5" },
  crm: { accent: "#db2777", surface: "#1b0e16", ink: "#fce7f3" },
  financials: { accent: "#047857", surface: "#061612", ink: "#d1fae5" },
  edi: { accent: "#0891b2", surface: "#07141a", ink: "#cffafe" },
  marketplace: { accent: "#9333ea", surface: "#120b1a", ink: "#f3e8ff" },
  analytics: { accent: "#1d4ed8", surface: "#0b1020", ink: "#dbeafe" },
  autonomous: { accent: "#22c55e", surface: "#0f1115", ink: "#e5ffe9" },
  workers: { accent: "#65a30d", surface: "#0f1407", ink: "#ecfccb" },
  rates: { accent: "#6d28d9", surface: "#100b1a", ink: "#ede9fe" },
  directory: { accent: "#334155", surface: "#0b1020", ink: "#e2e8f0" }
};

/**
 * Get accent configuration for a specific portal
 * @param portalKey - The portal identifier
 * @returns PortalAccent configuration
 */
export function getAccentFor(portalKey: string): PortalAccent {
  const normalizedKey = portalKey.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Try exact match first
  if (DEFAULT_ACCENT_MAP[portalKey]) {
    return DEFAULT_ACCENT_MAP[portalKey];
  }
  
  // Try normalized match
  const normalizedMatch = Object.entries(DEFAULT_ACCENT_MAP).find(([key]) => 
    key.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedKey
  );
  
  if (normalizedMatch) {
    return normalizedMatch[1];
  }
  
  // Fallback to super admin
  console.warn(`Portal accent not found for "${portalKey}", using super admin fallback`);
  return DEFAULT_ACCENT_MAP.superAdmin;
}

/**
 * Apply portal theme to the document root
 * @param portalKey - The portal identifier
 */
export function applyPortalTheme(portalKey: string): void {
  const { accent, surface, ink } = getAccentFor(portalKey);
  const root = document.documentElement;
  
  // Set portal attribute for CSS targeting
  root.setAttribute('data-portal', portalKey);
  
  // Apply theme variables
  root.style.setProperty('--accent', accent);
  root.style.setProperty('--bg', surface);
  root.style.setProperty('--ink', ink);
  
  // Calculate and set accent ink (text color for accent backgrounds)
  const accentInk = getContrastColor(accent);
  root.style.setProperty('--accent-ink', accentInk);
  
  // Emit OTEL span for observability
  if (typeof window !== 'undefined' && (window as any).otel) {
    (window as any).otel.span?.setAttributes({
      'portal.key': portalKey,
      'portal.accent': accent,
      'ui.version': 'v2'
    });
  }
}

/**
 * Calculate contrast color for accessibility
 * @param hexColor - Hex color string
 * @returns 'white' or 'black' for best contrast
 */
function getContrastColor(hexColor: string): string {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

/**
 * Get all available portal keys
 * @returns Array of portal keys
 */
export function getAvailablePortalKeys(): string[] {
  return Object.keys(DEFAULT_ACCENT_MAP);
}

/**
 * Validate portal key exists
 * @param portalKey - The portal identifier
 * @returns boolean indicating if portal exists
 */
export function isValidPortalKey(portalKey: string): boolean {
  return portalKey in DEFAULT_ACCENT_MAP;
}

/**
 * React hook for portal theme application
 * @param portalKey - The portal identifier
 */
export function usePortalTheme(portalKey: string): void {
  React.useEffect(() => {
    if (portalKey) {
      applyPortalTheme(portalKey);
    }
  }, [portalKey]);
}

// Export default for convenience
export default {
  getAccentFor,
  applyPortalTheme,
  getAvailablePortalKeys,
  isValidPortalKey,
  usePortalTheme
};

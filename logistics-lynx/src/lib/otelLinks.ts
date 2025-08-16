/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Build trace deep-links for OTEL backend
 * Supports any vendor via URL template or base URL
 */

export function buildTraceLink(traceId?: string | null): string | null {
  if (!traceId) return null;
  
  // Try URL template first (preferred - supports any vendor format)
  const tmpl = import.meta.env.VITE_TRACES_URL_TEMPLATE || "";
  if (tmpl.includes("{TRACE_ID}")) {
    return tmpl.replace("{TRACE_ID}", traceId);
  }
  
  // Fallback to base URL + standard path
  const base = import.meta.env.VITE_OTEL_UI_BASE || "";
  if (base) {
    return `${base.replace(/\/+$/, '')}/trace/${traceId}`;
  }
  
  return null;
}

/**
 * Build trace link with custom template
 */
export function buildTraceLinkWithTemplate(traceId: string, template: string): string | null {
  if (!traceId || !template) return null;
  
  // Replace common placeholders
  return template
    .replace("{TRACE_ID}", traceId)
    .replace("{TRACEID}", traceId)
    .replace("{trace_id}", traceId)
    .replace("{traceid}", traceId);
}

/**
 * Get available trace link templates for common vendors
 */
export const TRACE_LINK_TEMPLATES = {
  jaeger: "http://localhost:16686/trace/{TRACE_ID}",
  tempo: "http://localhost:3200/trace/{TRACE_ID}",
  honeycomb: "https://ui.honeycomb.io/{DATASET}/datasets/{TRACE_ID}",
  grafana: "https://grafana.example.com/explore?orgId=1&left=%5B%22now-1h%22,%22now%22,%22tempo%22,%7B%22query%22:%22%7BTRACE_ID%7D%22%7D%5D",
  datadog: "https://app.datadoghq.com/apm/trace/{TRACE_ID}",
  newrelic: "https://one.newrelic.com/launcher/nr1-core.home?pane=eyJuZXJyaWNJZCI6MTIzNDU2Nzg5LCJhcHBJZCI6MTIzNDU2Nzg5LCJ0eXBlIjoiVHJhY2UiLCJ0aW1lUmFuZ2UiOnsiYmVnaW4iOiJub3ctMWgiLCJlbmQiOiJub3cifX0%3D&state=eyJ0cmFjZUlkIjoie1RSQUNFX0lEfSJ9",
  lightstep: "https://app.lightstep.com/{PROJECT}/trace/{TRACE_ID}",
  signoz: "http://localhost:3301/trace/{TRACE_ID}",
} as const;

/**
 * Get trace link template for a specific vendor
 */
export function getTraceTemplate(vendor: keyof typeof TRACE_LINK_TEMPLATES): string {
  return TRACE_LINK_TEMPLATES[vendor];
}

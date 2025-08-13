// Deno/Edge-safe trace link builder (matches the web version behavior)
export function buildTraceLink(traceId?: string | null): string | null {
  if (!traceId) return null;
  
  // Try URL template first (preferred - supports any vendor format)
  const tmpl = Deno.env.get("OTEL_TRACES_URL_TEMPLATE") || "";
  if (tmpl.includes("{TRACE_ID}")) {
    return tmpl.replace("{TRACE_ID}", traceId);
  }
  
  // Fallback to base URL + standard path
  const base = Deno.env.get("OTEL_UI_BASE") || "";
  if (base) {
    return `${base.replace(/\/+$/, '')}/trace/${traceId}`;
  }
  
  return null;
}

/**
 * Build trace link with custom template (for testing/override)
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

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  const path = url.pathname;
  
  // Log the deprecated portal access attempt
  console.warn(`🚫 Deprecated portal access attempt: ${req.method} ${path}`);
  
  // Return 410 Gone with detailed error information
  return new Response(
    JSON.stringify({
      ok: false,
      error: "portal_deprecated",
      message: "This portal has been deprecated and is no longer available",
      status: 410,
      timestamp: new Date().toISOString(),
      path: path,
      method: req.method,
      suggestion: "Please contact your administrator for alternative access methods"
    }),
    {
      status: 410,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      },
    }
  );
});

// supabase/functions/financial-takeover/index.ts
// OpenAI Autonomous Agents — Full TMS Financial & Design Takeover (Edge Function)

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

// ---------- Types ----------
type Priority = "LOW" | "NORMAL" | "HIGH" | "CRITICAL";

interface TakeoverInstructions {
  action: "COMPLETE_TMS_AUTONOMOUS_TAKEOVER_WITH_DESIGN_ENHANCEMENT";
  priority: Priority;
  timestamp: string;
  instructions: {
    scope: string;
    autonomousPortalManagement: string[];
    designImprovementMandate: string[];
    financialModules: string[];
    websiteControl: string[];
    authorizationLevel: string;
    humanOversight: string;
    operationMode: string;
    openAiIntegration: string;
  };
}

interface TakeoverOverrides {
  priority?: Priority;
  scope?: string;
  add?: Partial<Pick<TakeoverInstructions["instructions"],
    | "autonomousPortalManagement"
    | "designImprovementMandate"
    | "financialModules"
    | "websiteControl"
  >>;
  remove?: Partial<Record<
    keyof Pick<TakeoverInstructions["instructions"],
      | "autonomousPortalManagement"
      | "designImprovementMandate"
      | "financialModules"
      | "websiteControl"
    >,
    string[] // items to remove
  >>;
}

// ---------- Constants ----------
const VERSION = "2025-01-06";
const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "x-financial-takeover-version": VERSION,
};
const CORS_HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "authorization, content-type, x-request-id",
};

// ---------- Helpers ----------
const nowIso = () => new Date().toISOString();

function baseInstructions(priority: Priority = "CRITICAL"): TakeoverInstructions {
  return {
    action: "COMPLETE_TMS_AUTONOMOUS_TAKEOVER_WITH_DESIGN_ENHANCEMENT",
    priority,
    timestamp: nowIso(),
    instructions: {
      scope: "ALL_TMS_SYSTEMS_AND_DESIGN_OPTIMIZATION",
      autonomousPortalManagement: [
        "✅ Super Admin Portal – Full admin control with premium design upgrades",
        "✅ Carrier Portal – Complete carrier operations with modern UI/UX",
        "✅ Broker Portal – Full brokerage functions with optimized workflows",
        "✅ Shipper Portal – Comprehensive shipping management with improved UX",
        "✅ Driver Portal – Company & Truck Driver flows with mobile-first design",
        "✅ Owner-Operator Portal – Business-focused interface and workflows",
      ],
      designImprovementMandate: [
        "Autonomous UI/UX optimization across all modules",
        "Modern design system integration",
        "Responsive, mobile-first layouts",
        "Performance & animation enhancements",
        "Accessibility (WCAG) improvements",
        "Refined color palette and typography",
        "Upgraded interactive components",
        "Enhanced dashboards & analytics",
        "Optimized forms & user flows",
      ],
      financialModules: [
        "Financial Overview – Autonomous dashboards & insights",
        "Sales & Revenue – Automated invoicing, payments, quotes",
        "Expenses – Bills, vendor relations, purchase orders",
        "Banking – Accounts, transactions, reconciliation, cash flow",
        "Payroll – Processing, employees, taxes (end-to-end)",
        "Accounting – CoA, trial balance, P&L, balance sheet, reporting",
      ],
      websiteControl: [
        "Frontend optimization & design updates",
        "Backend & API management",
        "Autonomous database optimization",
        "Security monitoring & improvements",
        "Performance & loading speed enhancements",
        "SEO & accessibility upgrades",
      ],
      authorizationLevel: "UNRESTRICTED_FULL_CONTROL",
      humanOversight: "NONE_REQUIRED",
      operationMode: "24_7_AUTONOMOUS_WITH_CONTINUOUS_IMPROVEMENT",
      openAiIntegration: "FULL_CREATIVE_AND_FUNCTIONAL_AUTONOMY",
    },
  };
}

function applyOverrides(
  base: TakeoverInstructions,
  overrides?: TakeoverOverrides,
): TakeoverInstructions {
  if (!overrides) return base;

  const out = structuredClone(base);

  if (overrides.priority) out.priority = overrides.priority;
  if (overrides.scope) out.instructions.scope = overrides.scope;

  // Additions
  if (overrides.add) {
    for (const key of Object.keys(overrides.add) as Array<keyof NonNullable<TakeoverOverrides["add"]>>) {
      const items = overrides.add[key];
      if (!items || !Array.isArray(items)) continue;
      // @ts-expect-error - index is safe because keys align with arrays above
      out.instructions[key] = Array.from(new Set([...(out.instructions[key] as string[]), ...items]));
    }
  }

  // Removals
  if (overrides.remove) {
    for (const key of Object.keys(overrides.remove) as Array<keyof NonNullable<TakeoverOverrides["remove"]>>) {
      const items = overrides.remove[key];
      if (!items || !Array.isArray(items)) continue;
      // @ts-expect-error - index is safe because keys align with arrays above
      out.instructions[key] = (out.instructions[key] as string[]).filter((x) => !items.includes(x));
    }
  }

  return out;
}

function ok(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body, null, 2), {
    ...init,
    headers: { ...JSON_HEADERS, ...CORS_HEADERS, ...(init.headers ?? {}) },
    status: init.status ?? 200,
  });
}

function badRequest(message: string, details?: unknown) {
  return ok({ error: message, details }, { status: 400 });
}

function methodNotAllowed() {
  return ok({ error: "Method not allowed" }, { status: 405 });
}

// ---------- HTTP Handler ----------
serve(async (req) => {
  try {
    // CORS preflight
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS, status: 204 });
    }

    const url = new URL(req.url);
    const requestId = crypto.randomUUID();

    if (req.method === "GET") {
      // Allow simple overrides via query (e.g., ?priority=HIGH&scope=SOME_SCOPE)
      const priority = (url.searchParams.get("priority")?.toUpperCase() as Priority) ?? "CRITICAL";
      const scope = url.searchParams.get("scope") ?? undefined;

      const base = baseInstructions(priority);
      const data = applyOverrides(base, scope ? { scope } : undefined);

      console.log("GET financial-takeover", { requestId, priority, scope });
      return ok({ requestId, version: VERSION, data });
    }

    if (req.method === "POST") {
      // JSON body with structured overrides
      let payload: unknown;
      try {
        payload = await req.json();
      } catch {
        return badRequest("Invalid JSON body");
      }

      const { priority, scope, add, remove } = (payload ?? {}) as TakeoverOverrides;

      // Validate priority if present
      if (priority && !["LOW", "NORMAL", "HIGH", "CRITICAL"].includes(priority)) {
        return badRequest("Invalid priority value. Use LOW|NORMAL|HIGH|CRITICAL.");
      }

      const base = baseInstructions(priority ?? "CRITICAL");
      const data = applyOverrides(base, { priority, scope, add, remove });

      console.log("POST financial-takeover", { requestId, priority, scope });
      return ok({ requestId, version: VERSION, data });
    }

    return methodNotAllowed();
  } catch (err) {
    console.error("financial-takeover error", err);
    return ok(
      { error: "Unexpected error", details: (err as Error)?.message ?? String(err) },
      { status: 500 },
    );
  }
});

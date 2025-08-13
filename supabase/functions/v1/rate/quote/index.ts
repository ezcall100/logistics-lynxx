import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

// Input validation schema
const QuoteRequestSchema = z.object({
  origin: z.object({
    city: z.string().min(1),
    state: z.string().length(2),
    zip: z.string().regex(/^\d{5}(-\d{4})?$/),
  }),
  destination: z.object({
    city: z.string().min(1),
    state: z.string().length(2),
    zip: z.string().regex(/^\d{5}(-\d{4})?$/),
  }),
  equipment: z.enum(['dry_van', 'reefer', 'flatbed', 'power_only']),
  weight: z.number().min(1).max(80000),
  class: z.number().min(50).max(500),
  hazmat: z.boolean().default(false),
  expedited: z.boolean().default(false),
  company_id: z.string().uuid(),
});

type QuoteRequest = z.infer<typeof QuoteRequestSchema>;

interface QuoteResponse {
  ok: boolean;
  rate?: number;
  confidence?: number;
  breakdown?: {
    base_rate: number;
    fuel_surcharge: number;
    accessorials: number;
    hazmat_fee?: number;
    expedited_fee?: number;
  };
  error?: string;
  message?: string;
}

serve(async (req) => {
  try {
    // CORS headers
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    // Handle preflight
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 200, headers });
    }

    // Only allow POST
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ ok: false, error: "method_not_allowed" }),
        { status: 405, headers }
      );
    }

    // Parse and validate input
    const body = await req.json();
    const validation = QuoteRequestSchema.safeParse(body);
    
    if (!validation.success) {
      return new Response(
        JSON.stringify({ 
          ok: false, 
          error: "validation_error",
          message: validation.error.message 
        }),
        { status: 400, headers }
      );
    }

    const { origin, destination, equipment, weight, class: freightClass, hazmat, expedited, company_id } = validation.data;

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check company entitlements
    const { data: entitlement, error: entitlementError } = await supabase
      .from("org_entitlements")
      .select("plan_id, status")
      .eq("company_id", company_id)
      .single();

    if (entitlementError || !entitlement) {
      return new Response(
        JSON.stringify({ ok: false, error: "company_not_found" }),
        { status: 404, headers }
      );
    }

    if (entitlement.status !== 'active' && entitlement.status !== 'trial') {
      return new Response(
        JSON.stringify({ ok: false, error: "subscription_inactive" }),
        { status: 403, headers }
      );
    }

    // Check if rates feature is enabled
    const { data: plan } = await supabase
      .from("plans")
      .select("features")
      .eq("id", entitlement.plan_id)
      .single();

    if (!plan?.features?.rates) {
      return new Response(
        JSON.stringify({ ok: false, error: "feature_not_enabled" }),
        { status: 403, headers }
      );
    }

    // Build lane key
    const laneKey = `${origin.state}-${destination.state}`;
    
    // Get base rate from contract_rates or lane_stats
    const { data: contractRate } = await supabase
      .from("contract_rates")
      .select("rate_per_mile")
      .eq("company_id", company_id)
      .eq("origin_state", origin.state)
      .eq("destination_state", destination.state)
      .eq("equipment", equipment)
      .single();

    let baseRatePerMile = 2.50; // Default rate

    if (contractRate) {
      baseRatePerMile = contractRate.rate_per_mile;
    } else {
      // Fallback to market rates
      const { data: marketRate } = await supabase
        .from("lane_stats")
        .select("avg_rate_per_mile")
        .eq("lane_key", laneKey)
        .eq("equipment", equipment)
        .single();

      if (marketRate) {
        baseRatePerMile = marketRate.avg_rate_per_mile;
      }
    }

    // Get distance (simplified - in production, use actual distance calculation)
    const distance = 800; // miles (placeholder)

    // Calculate base rate
    const baseRate = baseRatePerMile * distance;

    // Get fuel surcharge
    const { data: fuelData } = await supabase
      .from("fuel_tables")
      .select("surcharge_percent")
      .eq("state", origin.state)
      .single();

    const fuelSurcharge = fuelData ? (baseRate * fuelData.surcharge_percent / 100) : (baseRate * 0.15);

    // Calculate accessorials
    let accessorials = 0;
    if (weight > 40000) accessorials += 50; // Heavy weight
    if (freightClass > 200) accessorials += 75; // High class

    // Calculate additional fees
    const hazmatFee = hazmat ? 150 : 0;
    const expeditedFee = expedited ? 200 : 0;

    // Calculate total rate
    const totalRate = baseRate + fuelSurcharge + accessorials + hazmatFee + expeditedFee;

    // Calculate confidence based on data availability
    let confidence = 0.8; // Base confidence
    if (contractRate) confidence += 0.15;
    if (fuelData) confidence += 0.05;

    confidence = Math.min(confidence, 0.95);

    const response: QuoteResponse = {
      ok: true,
      rate: Math.round(totalRate * 100) / 100,
      confidence: Math.round(confidence * 100) / 100,
      breakdown: {
        base_rate: Math.round(baseRate * 100) / 100,
        fuel_surcharge: Math.round(fuelSurcharge * 100) / 100,
        accessorials: Math.round(accessorials * 100) / 100,
        hazmat_fee: hazmatFee,
        expedited_fee: expeditedFee,
      },
    };

    return new Response(JSON.stringify(response), { status: 200, headers });

  } catch (error) {
    console.error("Rate quote error:", error);
    
    return new Response(
      JSON.stringify({ 
        ok: false, 
        error: "internal_error",
        message: "An unexpected error occurred" 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
});

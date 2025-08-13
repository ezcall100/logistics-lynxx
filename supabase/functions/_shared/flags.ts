// Simple feature flag resolver for Edge functions
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

export async function resolveFlag(key: string, defaultValue: boolean = false): Promise<boolean> {
  try {
    // Try to get environment-specific flag first
    const { data: envFlag } = await supabase
      .from("feature_flags_v2")
      .select("value")
      .eq("key", key)
      .eq("scope", "env")
      .eq("env", Deno.env.get("OTEL_ENVIRONMENT") || "development")
      .single();

    if (envFlag) {
      return envFlag.value === true;
    }

    // Fall back to global flag
    const { data: globalFlag } = await supabase
      .from("feature_flags_v2")
      .select("value")
      .eq("key", key)
      .eq("scope", "global")
      .single();

    if (globalFlag) {
      return globalFlag.value === true;
    }

    return defaultValue;
  } catch (error) {
    console.warn(`Failed to resolve feature flag ${key}:`, error);
    return defaultValue;
  }
}

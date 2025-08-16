/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/lib/supabaseClient";
import type { ResolvedFlag } from "@/types/feature-flags";

const TTL_MS = 10_000; // 10s soft cache
const cache = new Map<string, { exp: number; data: ResolvedFlag | null }>();

function k(companyId: string, env: string, key: string) {
  return `${companyId}::${env}::${key}`;
}

export async function resolveFlag(companyId: string, env: string, key: string): Promise<ResolvedFlag | null> {
  const ck = k(companyId, env, key);
  const now = Date.now();
  const hit = cache.get(ck);
  if (hit && hit.exp > now) return hit.data;

  const { data, error } = await supabase
    .rpc("resolve_feature_flag", { _company: companyId, _env: env, _key: key });
  if (error) {
    console.error("resolve_feature_flag error", error);
    cache.set(ck, { exp: now + TTL_MS, data: null });
    return null;
  }
  const res = (data?.[0] ?? null) as ResolvedFlag | null;
  cache.set(ck, { exp: now + TTL_MS, data: res });
  return res;
}

export async function flagOn(companyId: string, env: string, key: string, def = false): Promise<boolean> {
  const r = await resolveFlag(companyId, env, key);
  return r?.value ?? def;
}

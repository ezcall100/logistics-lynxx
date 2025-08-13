// PR-102: Deno-side verification helper (Supabase Edge)
// Usage: const v = await verifySignedRequest(req, { requireFlag: 'security.signingV2Required' });

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type VerifyOpts = {
  secret?: string;               // optional; fallback to Deno.env.TRANSBOT_HMAC_SECRET
  skewSeconds?: number;          // default 300
  requireFlag?: string;          // optional feature flag key (tenant/env aware)
  companyIdHeader?: string;      // header that carries company UUID (for flag resolution)
};

type VerifyResult = {
  ok: boolean;
  reason?: string;
  bodyText: string;
  parsed?: unknown;
  keyId?: string;
  ts?: number;
  nonce?: string;
};

const enc = new TextEncoder();

function toUint8(v: string) { return enc.encode(v); }
async function sha256(b: ArrayBuffer | Uint8Array) {
  const buf = b instanceof Uint8Array ? b : new Uint8Array(b);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash)).map(x => x.toString(16).padStart(2, "0")).join("");
}
function timingSafeEq(a: string, b: string) {
  const ab = toUint8(a); const bb = toUint8(b);
  if (ab.length !== bb.length) return false;
  let out = 0; for (let i = 0; i < ab.length; i++) out |= (ab[i] ^ bb[i]);
  return out === 0;
}

function canonicalString(params: {
  ts: number; nonce: string; method: string; path: string; bodyHash: string; keyId: string;
}) {
  const { ts, nonce, method, path, bodyHash, keyId } = params;
  // newline-delimited to avoid ambiguity
  return `${ts}\n${nonce}\n${method.toUpperCase()}\n${path}\n${bodyHash}\n${keyId}`;
}

async function hmacSha256Hex(secret: string, msg: string) {
  const key = await crypto.subtle.importKey("raw", toUint8(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, toUint8(msg));
  return Array.from(new Uint8Array(sig)).map(x => x.toString(16).padStart(2, "0")).join("");
}

// Optional hierarchical flag check
async function isFlagRequired(companyId: string | null, key: string): Promise<boolean> {
  if (!key) return false;
  // env inference
  const env = Deno.env.get("APP_ENV") ?? "production";
  const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  try {
    const { data, error } = await supa.rpc("resolve_feature_flag", {
      _company: companyId, _env: env, _key: key
    });
    if (error) return false;
    return !!data?.[0]?.value;
  } catch {
    return false;
  }
}

export async function verifySignedRequest(req: Request, opts: VerifyOpts = {}): Promise<VerifyResult> {
  const url = new URL(req.url);
  const method = req.method;
  const raw = await req.clone().arrayBuffer();             // read without consuming original
  const bodyText = new TextDecoder().decode(raw);
  const bodyHash = await sha256(toUint8(bodyText));

  const sigHeader = req.headers.get("x-transbot-signature") || "";
  // Format: v2 keyId=<id>;ts=<unix>;nonce=<uuid>;sig=<hex>
  // Example: v2 keyId=ops-n8n;ts=1734280000;nonce=1b5...;sig=abc123...
  const m = sigHeader.match(/^v2\s+keyId=([^;]+);ts=(\d+);nonce=([^;]+);sig=([a-f0-9]{64})$/i);
  if (!m) {
    return { ok: false, reason: "missing_or_malformed_signature", bodyText };
  }
  const [, keyId, tsStr, nonce, sig] = m;
  const ts = Number(tsStr);

  // clock skew
  const skew = opts.skewSeconds ?? 300;
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - ts) > skew) {
    return { ok: false, reason: "timestamp_out_of_window", bodyText, keyId, ts, nonce };
  }

  const secret = opts.secret || Deno.env.get("TRANSBOT_HMAC_SECRET") || "";
  if (!secret) return { ok: false, reason: "missing_secret", bodyText, keyId, ts, nonce };

  const canon = canonicalString({ ts, nonce, method, path: url.pathname, bodyHash, keyId });
  const expect = await hmacSha256Hex(secret, canon);
  if (!timingSafeEq(expect, sig)) {
    return { ok: false, reason: "bad_signature", bodyText, keyId, ts, nonce };
  }

  // replay guard (nonce)
  const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  const ua = req.headers.get("user-agent") || null;
  const ins = await supa.from("api_signing_nonces")
    .insert({ key_id: keyId, nonce, ip, user_agent: ua })
    .select("key_id")
    .single();
  if (ins.error) {
    return { ok: false, reason: "replay_detected", bodyText, keyId, ts, nonce };
  }

  // optional hierarchical policy gate (flag)
  const companyIdHeader = opts.companyIdHeader ?? "x-transbot-company";
  const companyId = req.headers.get(companyIdHeader);
  if (opts.requireFlag) {
    const required = await isFlagRequired(companyId, opts.requireFlag);
    if (!required) {
      // allowed to pass (compat) but annotated as soft; flip to hard-enforce later
      // return { ok: false, reason: "flag_not_enabled", bodyText, keyId, ts, nonce };
    }
  }

  let parsed: unknown = undefined;
  try { parsed = bodyText ? JSON.parse(bodyText) : undefined; } catch { /* non-json permitted */ }

  return { ok: true, bodyText, parsed, keyId, ts, nonce };
}

// PR-103: Admin proxy for DLQ operations (JWT auth + v2 signed internal call)
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { verifySignedRequest } from "../_shared/signing_v2.ts";

// helpers
const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const SECRET = Deno.env.get("TRANSBOT_HMAC_SECRET")!;     // used only server-side to call dlq-replay
const PROJECT_URL = Deno.env.get("SUPABASE_URL")!;
const DLQ_REPLAY_URL = `${PROJECT_URL}/functions/v1/dlq-replay`;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

async function requireSuperAdmin(req: Request) {
  // rely on RLS-backed RPC path for privilege; but also gate by profile/claim quickly
  try {
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace(/^Bearer /i, "");
    if (!token) return false;
    const { data: { user } } = await supa.auth.getUser(token);
    // quick profile check (optional)
    const { data } = await supa.from("profiles").select("role").eq("user_id", user?.id ?? "").maybeSingle();
    return (data?.role === "super_admin");
  } catch {
    return false;
  }
}

async function signV2(method: string, url: URL, keyId: string, body: string) {
  const ts = Math.floor(Date.now() / 1000);
  const nonce = crypto.randomUUID();
  const bodyHash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(body))))
    .map(x => x.toString(16).padStart(2,"0")).join("");
  const canon = `${ts}\n${nonce}\n${method.toUpperCase()}\n${url.pathname}\n${bodyHash}\n${keyId}`;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(canon));
  const sig = Array.from(new Uint8Array(sigBuf)).map(x => x.toString(16).padStart(2,"0")).join("");
  return `v2 keyId=ops-admin-ui;ts=${ts};nonce=${nonce};sig=${sig}`;
}

serve(async (req) => {
  try {
    const url = new URL(req.url);

    // Only super-admins may use this UI proxy
    if (!(await requireSuperAdmin(req))) {
      return json({ ok: false, error: "not_authorized" }, 403);
    }

    if (req.method === "GET" && url.pathname.endsWith("/dlq-admin")) {
      // list items using secure RPC (definer)
      const company = url.searchParams.get("company_id");
      const limit = Number(url.searchParams.get("limit") || "50");
      const status = url.searchParams.get("status") || null;

      const { data, error } = await supa.rpc("dlq_admin_list", { _company: company, _limit: limit, _status: status });
      if (error) return json({ ok: false, error: error.message }, 400);
      return json({ ok: true, items: data ?? [] });
    }

    if (req.method === "POST" && url.pathname.endsWith("/dlq-admin")) {
      const body = await req.json();
      const action = String(body?.action || "");
      const company_id = String(body?.company_id || "");
      const ids = Array.isArray(body?.ids) ? body.ids : undefined;
      const max = Number(body?.max ?? 25);
      const dry_run = !!body?.dry_run;

      if (!company_id) return json({ ok:false, error:"company_id_required" }, 400);

      if (action === "pause") {
        const { error } = await supa.rpc("dlq_admin_pause_company", { _company: company_id, _pause: true });
        if (error) return json({ ok:false, error:error.message }, 400);
        return json({ ok:true, paused:true });
      }

      if (action === "unpause") {
        const { error } = await supa.rpc("dlq_admin_pause_company", { _company: company_id, _pause: false });
        if (error) return json({ ok:false, error:error.message }, 400);
        return json({ ok:true, paused:false });
      }

      if (action === "drain") {
        const { error } = await supa.rpc("dlq_admin_drain_company", { _company: company_id });
        if (error) return json({ ok:false, error:error.message }, 400);
        return json({ ok:true, drained:true });
      }

      if (action === "replay" || action === "dry_run") {
        // forward to dlq-replay with v2 signature
        const payload: Record<string, unknown> = { company_id, max, dry_run, dlq_ids: ids };
        const target = new URL(DLQ_REPLAY_URL);
        const sig = await signV2("POST", target, "ops-admin-ui", JSON.stringify(payload));
        const r = await fetch(target.toString(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Transbot-Company": company_id,
            "X-Transbot-Signature": sig
          },
          body: JSON.stringify(payload)
        });
        const out = await r.json();
        return json({ ok: r.ok, status: r.status, result: out }, r.ok ? 200 : r.status);
      }

      return json({ ok:false, error:"unknown_action" }, 400);
    }

    return new Response("Not found", { status: 404 });
  } catch (e) {
    return json({ ok:false, error: String(e) }, 500);
  }
});

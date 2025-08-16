/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { useFlag } from "@/hooks/useFlag";
import { buildTraceLink } from "@/lib/otelLinks";

type DlqItem = {
  id: string;
  company_id: string;
  created_at: string;
  last_error_at: string | null;
  attempts: number;
  last_error: string | null;
  payload_bytes: number;
  status: string;
  trace_id?: string | null;
};

async function fetchItems(companyId: string | null, limit = 50, status?: string) {
  const base = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dlq-admin`;
  const qs = new URLSearchParams();
  if (companyId) qs.set("company_id", companyId);
  if (status) qs.set("status", status);
  qs.set("limit", String(limit));
  const r = await fetch(`${base}?${qs.toString()}`, { headers: await authHeader() });
  if (!r.ok) throw new Error(`list_failed:${r.status}`);
  const js = await r.json();
  return (js.items ?? []) as DlqItem[];
}

async function action(payload: Record<string, unknown>) {
  const r = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dlq-admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(await authHeader()) },
    body: JSON.stringify(payload),
  });
  const js = await r.json();
  if (!r.ok || !js.ok) throw new Error(js.error || `action_failed:${r.status}`);
  return js;
}

async function authHeader() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function DlqAdminPage() {
  const uiEnabled = useFlag("default", "development", "ops.dlqAdminUIEnabled", false);
  const [companyId, setCompanyId] = useState<string>("");
  const [status, setStatus] = useState<string | undefined>();
  const [limit, setLimit] = useState<number>(50);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const qc = useQueryClient();

  const { data: items = [] as unknown[], isLoading, refetch } = useQuery({
    queryKey: ["dlq", companyId, limit, status],
    queryFn: () => fetchItems(companyId || null, limit, status),
    enabled: uiEnabled.value,
    refetchOnWindowFocus: false,
  });

  const selectedIds = useMemo(() => Object.keys(selected).filter(k => selected[k]), [selected]);

  const mPause = useMutation({ mutationFn: (pause: boolean) => action({ action: pause ? "pause" : "unpause", company_id: companyId }) , onSuccess: () => refetch() });
  const mDrain = useMutation({ mutationFn: () => action({ action: "drain", company_id: companyId }), onSuccess: () => refetch() });
  const mDryRun = useMutation({ mutationFn: () => action({ action: "dry_run", company_id: companyId, max: 25, ids: selectedIds }), onSuccess: () => qc.invalidateQueries({ queryKey:["dlq"] }) });
  const mReplay = useMutation({ mutationFn: () => action({ action: "replay", company_id: companyId, max: 25, ids: selectedIds, dry_run: false }), onSuccess: () => qc.invalidateQueries({ queryKey:["dlq"] }) });

  if (!uiEnabled.value) return <div className="p-6">⚠️ DLQ Admin UI is disabled by flag.</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">🧯 DLQ Admin</h1>

      <div className="flex gap-2 items-end">
        <div>
          <label className="text-sm">Company ID</label>
          <input className="border rounded px-2 py-1 w-[420px]" placeholder="00000000-0000-4000-8000-000000000001"
                 value={companyId} onChange={e=>setCompanyId(e.target.value)} />
        </div>
        <div>
          <label className="text-sm">Status</label>
          <select className="border rounded px-2 py-1" value={status ?? ""} onChange={e=>setStatus(e.target.value || undefined)}>
            <option value="">(any)</option>
            <option value="failed">failed</option>
            <option value="quarantined">quarantined</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Limit</label>
          <input type="number" className="border rounded px-2 py-1 w-24" value={limit} min={1} max={200}
                 onChange={e=>setLimit(parseInt(e.target.value || "50"))} />
        </div>
        <button className="px-3 py-2 rounded bg-black text-white" onClick={()=>refetch()} disabled={isLoading}>Refresh</button>
      </div>

      <div className="flex gap-2">
        <button className="px-3 py-2 rounded bg-yellow-500 text-white disabled:opacity-50"
                onClick={()=>mDryRun.mutate()} disabled={!companyId || selectedIds.length===0}>Dry Run Replay (selected)</button>
        <button className="px-3 py-2 rounded bg-green-600 text-white disabled:opacity-50"
                onClick={()=>mReplay.mutate()} disabled={!companyId || selectedIds.length===0}>Replay (selected)</button>
        <button className="px-3 py-2 rounded bg-orange-600 text-white disabled:opacity-50"
                onClick={()=>mPause.mutate(true)} disabled={!companyId}>Pause Tenant</button>
        <button className="px-3 py-2 rounded bg-slate-600 text-white disabled:opacity-50"
                onClick={()=>mPause.mutate(false)} disabled={!companyId}>Unpause Tenant</button>
        <button className="px-3 py-2 rounded bg-red-700 text-white disabled:opacity-50"
                onClick={()=>mDrain.mutate()} disabled={!companyId}>Drain Tenant</button>
      </div>

      <div className="border rounded">
        <table className="w-full text-sm">
          <thead>
          <tr className="bg-slate-50">
            <th className="p-2"></th>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Company</th>
            <th className="p-2">Attempts</th>
            <th className="p-2">Payload</th>
            <th className="p-2">Last Error</th>
            <th className="p-2">Trace</th>
            <th className="p-2">Created</th>
          </tr>
          </thead>
          <tbody>
          {items.map((it) => (
            <tr key={it.id} className="border-t">
              <td className="p-2">
                <input type="checkbox" checked={!!selected[it.id]} onChange={() => setSelected(s => ({...s, [it.id]: !s[it.id]}))}/>
              </td>
              <td className="p-2 font-mono text-xs">{it.id}</td>
              <td className="p-2 font-mono text-xs">{it.company_id}</td>
              <td className="p-2 text-center">{it.attempts}</td>
              <td className="p-2 text-center">{it.payload_bytes} B</td>
              <td className="p-2 truncate max-w-[420px]" title={it.last_error || ""}>{it.last_error || "-"}</td>
              <td className="p-2">
                {it.trace_id ? (
                  <a 
                    className="text-blue-600 hover:text-blue-800 underline font-mono text-xs" 
                    href={buildTraceLink(it.trace_id) || "#"} 
                    target="_blank" 
                    rel="noreferrer"
                    title="Open in OTEL backend"
                  >
                    {it.trace_id}
                  </a>
                ) : (
                  <span className="text-muted-foreground text-xs">n/a</span>
                )}
              </td>
              <td className="p-2">{new Date(it.created_at).toLocaleString()}</td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td className="p-4 text-center text-slate-500" colSpan={8}>No items</td></tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

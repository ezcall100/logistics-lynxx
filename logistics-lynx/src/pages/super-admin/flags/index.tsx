import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { FeatureFlag } from "@/types/feature-flags";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

type Scope = "global" | "env" | "tenant";

export default function FlagsPage() {
  const [rows, setRows] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState<Partial<FeatureFlag> | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from<FeatureFlag>("feature_flags_v2")
      .select("*")
      .order("key", { ascending: true })
      .order("scope", { ascending: true });
    if (!error) setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function scopeBadge(s: Scope) {
    const m: Record<Scope, string> = { global: "secondary", env: "default", tenant: "destructive" };
    return <Badge variant={m[s]} className="capitalize">{s}</Badge>;
  }

  async function upsert() {
    if (!edit?.key || !edit?.scope) return;
    const payload = {
      key: edit.key,
      scope: edit.scope,
      env: edit.scope === "env" ? (edit.env ?? "production") : null,
      company_id: edit.scope === "tenant" ? (edit.company_id ?? null) : null,
      value: !!edit.value,
      payload: edit.payload ?? {},
      reason: edit.reason ?? null,
      owner_name: edit.owner_name ?? null,
      expires_at: edit.expires_at ?? null,
    };
    const { error } = await supabase.from("feature_flags_v2")
      .upsert(payload, { onConflict: "key,scope,env,company_id" });
    if (error) { alert(error.message); return; }
    setEdit(null);
    load();
  }

  async function remove(row: FeatureFlag) {
    if (!confirm(`Delete flag ${row.key} [${row.scope}]?`)) return;
    const { error } = await supabase.from("feature_flags_v2").delete().eq("id", row.id);
    if (error) { alert(error.message); return; }
    load();
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Feature Flags</h1>

      <Card className="p-4 space-y-3">
        <h2 className="font-medium">New / Edit Flag</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <Input placeholder="key" value={edit?.key ?? ""} onChange={e => setEdit({ ...edit, key: e.target.value })} />
          <Select value={(edit?.scope as Scope) ?? "global"} onValueChange={v => setEdit({ ...edit, scope: v as Scope })}>
            <option value="global">global</option>
            <option value="env">env</option>
            <option value="tenant">tenant</option>
          </Select>
          {edit?.scope === "env" && (
            <Input placeholder="env (production/staging/dev)" value={edit?.env ?? ""} onChange={e => setEdit({ ...edit, env: e.target.value })}/>
          )}
          {edit?.scope === "tenant" && (
            <Input placeholder="company_id (uuid)" value={edit?.company_id ?? ""} onChange={e => setEdit({ ...edit, company_id: e.target.value as any })}/>
          )}
          <div className="flex items-center gap-2">
            <Switch checked={!!edit?.value} onCheckedChange={v => setEdit({ ...edit, value: v })}/>
            <span>enabled</span>
          </div>
          <Input placeholder="owner name (optional)" value={edit?.owner_name ?? ""} onChange={e => setEdit({ ...edit, owner_name: e.target.value })}/>
          <Input placeholder="expires_at (ISO, optional)" value={edit?.expires_at ?? ""} onChange={e => setEdit({ ...edit, expires_at: e.target.value })}/>
          <Input placeholder="reason (optional)" value={edit?.reason ?? ""} onChange={e => setEdit({ ...edit, reason: e.target.value })}/>
          <div className="col-span-1 md:col-span-6 flex gap-2">
            <Button onClick={upsert}>Save</Button>
            <Button variant="secondary" onClick={() => setEdit(null)}>Clear</Button>
          </div>
        </div>
      </Card>

      <Card className="p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-muted/50">
              <th className="p-3">Key</th><th>Scope</th><th>Env</th><th>Company</th><th>Value</th><th>Expires</th><th>Owner</th><th></th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td className="p-3" colSpan={8}>Loading…</td></tr>}
            {!loading && rows.map(r => (
              <tr key={r.id} className="border-t">
                <td className="p-3 font-mono">{r.key}</td>
                <td>{scopeBadge(r.scope as Scope)}</td>
                <td>{r.env ?? "—"}</td>
                <td className="font-mono">{r.company_id ?? "—"}</td>
                <td>{r.value ? <Badge>ON</Badge> : <Badge variant="outline">off</Badge>}</td>
                <td>{r.expires_at ?? "—"}</td>
                <td>{r.owner_name ?? "—"}</td>
                <td className="p-3 space-x-2">
                  <Button size="sm" variant="secondary" onClick={() => setEdit(r)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => remove(r)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

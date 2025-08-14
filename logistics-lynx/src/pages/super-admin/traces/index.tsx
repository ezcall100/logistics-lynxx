import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { buildTraceLink } from "@/lib/otelLinks";
import { useFlag } from "@/hooks/useFlag";

type TraceRow = {
  company_id: string;
  task_id: string;
  fn_name: string | null;
  status: string;
  updated_at: string;
  trace_id: string;
};

export default function TracesPage() {
  const enabled = useFlag("", "prod", "obs.tracesPageEnabled", false);
  const [companyId, setCompanyId] = useState<string>("");
  const [since, setSince] = useState<string>("24 hours");
  
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["admin-recent-traces", companyId, since],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc("admin_recent_traces", {
          _company: companyId || null,
          _since: since,
        });
      if (error) throw error;
      return data as TraceRow[];
    },
    enabled: enabled.value, // Only run query if feature flag is enabled
  });

  const rows = useMemo(() => data ?? [], [data]);

  if (!enabled.value) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Traces page is disabled by feature flag.
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600 mb-4">Error loading traces: {error.message}</div>
        <button 
          onClick={() => refetch()} 
          className="bg-blue-600 text-white rounded px-3 py-1 text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Traces (Super-Admin)</h1>
        <div className="text-sm text-muted-foreground">
          Deep links to OTEL backend
        </div>
      </div>

      <div className="flex gap-3 items-end">
        <div>
          <label className="block text-xs mb-1 font-medium">Company ID (optional)</label>
          <input
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            placeholder="uuid…"
            className="border rounded px-2 py-1 w-80 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs mb-1 font-medium">Since</label>
          <select 
            value={since} 
            onChange={(e) => setSince(e.target.value)} 
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="15 minutes">15 minutes</option>
            <option value="1 hour">1 hour</option>
            <option value="6 hours">6 hours</option>
            <option value="24 hours">24 hours</option>
            <option value="3 days">3 days</option>
            <option value="7 days">7 days</option>
          </select>
        </div>
        <button 
          onClick={() => refetch()} 
          className="bg-black text-white rounded px-3 py-1 text-sm hover:bg-gray-800"
        >
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="text-sm text-muted-foreground">Loading traces…</div>
      ) : rows.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          No traces found for the selected criteria.
        </div>
      ) : (
        <div className="overflow-auto rounded border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <Th>Updated</Th>
                <Th>Company</Th>
                <Th>Task</Th>
                <Th>Function</Th>
                <Th>Status</Th>
                <Th>Trace ID</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const traceLink = buildTraceLink(row.trace_id);
                return (
                  <tr key={`${row.task_id}-${row.updated_at}`} className="border-t hover:bg-gray-50">
                    <Td mono>{new Date(row.updated_at).toLocaleString()}</Td>
                    <Td mono>{row.company_id}</Td>
                    <Td mono>{row.task_id}</Td>
                    <Td>{row.fn_name || "-"}</Td>
                    <Td>
                      <StatusBadge status={row.status} />
                    </Td>
                    <Td>
                      {traceLink ? (
                        <a 
                          className="text-blue-600 hover:text-blue-800 underline font-mono text-xs" 
                          href={traceLink} 
                          target="_blank" 
                          rel="noreferrer"
                          title="Open in OTEL backend"
                        >
                          {row.trace_id}
                        </a>
                      ) : (
                        <span className="text-muted-foreground font-mono text-xs">
                          {row.trace_id || "n/a"}
                        </span>
                      )}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="text-xs text-muted-foreground space-y-1">
        <p>
          Deep links built from <code>VITE_TRACES_URL_TEMPLATE</code> environment variable.
        </p>
        <p>
          Example: <code>https://otel.example.com/trace/{"{TRACE_ID}"}</code>
        </p>
        <p>
          Showing {rows.length} traces from the last {since}.
        </p>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left px-3 py-2 font-medium text-xs">{children}</th>;
}

function Td({ children, mono }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <td className={`px-3 py-2 ${mono ? "font-mono" : ""}`}>
      {children}
    </td>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
      case 'done':
        return 'bg-green-100 text-green-800';
      case 'failed':
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'queued':
        return 'bg-yellow-100 text-yellow-800';
      case 'log':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}

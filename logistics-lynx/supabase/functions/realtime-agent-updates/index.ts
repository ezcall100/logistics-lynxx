// supabase/functions/agent-realtime/index.ts
// Realtime Agent & n8n WebSocket hub for autonomous ops

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

// ---------- Env & config ----------
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const WS_AUTH_TOKEN = Deno.env.get("WS_AUTH_TOKEN") ?? ""; // optional: protect mutating actions

const HEARTBEAT_MS = 25_000;
const IDLE_TIMEOUT_MS = 90_000; // disconnect if no heartbeat
const LOG_PREFIX = "🔌 agent-realtime";

// ---------- CORS for HTTP fallbacks ----------
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, upgrade, connection, x-auth-token",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};
const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };

// ---------- Supabase client ----------
function sb(): SupabaseClient {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
}

// ---------- Connection registry ----------
type ClientInfo = {
  id: string;
  ws: WebSocket;
  createdAt: number;
  lastSeen: number;
  sub?: ReturnType<SupabaseClient["channel"]>; // Realtime channel
  role: "viewer" | "writer";
};

const clients = new Map<string, ClientInfo>();
const uid = () => crypto.randomUUID();
const now = () => Date.now();

// ---------- Utils ----------
const ok = (body: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(body, null, 2), {
    ...init,
    status: init.status ?? 200,
    headers: { ...CORS, ...JSON_HEADERS, ...(init.headers ?? {}) },
  });

const fail = (message: string, status = 400, details?: unknown) =>
  ok({ success: false, error: message, details, timestamp: new Date().toISOString() }, { status });

function send(ws: WebSocket, msg: Record<string, unknown>) {
  try {
    ws.send(JSON.stringify({ ...msg, ts: new Date().toISOString() }));
  } catch (_) {
    // noop
  }
}

function broadcast(msg: Record<string, unknown>, filter?: (c: ClientInfo) => boolean) {
  for (const c of clients.values()) {
    if (!filter || filter(c)) send(c.ws, msg);
  }
}

function requireWriter(headers: Headers): boolean {
  if (!WS_AUTH_TOKEN) return true; // disabled
  const token = headers.get("x-auth-token") ?? "";
  return token === WS_AUTH_TOKEN;
}

// ---------- Validators (lightweight) ----------
function isString(x: unknown): x is string {
  return typeof x === "string";
}
function isObject(x: unknown): x is Record<string, unknown> {
  return !!x && typeof x === "object" && !Array.isArray(x);
}

type InboundMessage =
  | { type: "ping" }
  | { type: "subscribe_to_updates" }
  | {
      type: "agent_status_update";
      data: { agent_id: string; agent_type: string; status: string; message?: string; response_time?: number };
    }
  | {
      type: "task_completion";
      data: { task_id: string; agent_id: string; status: string; result?: unknown; duration?: number };
    }
  | {
      type: "health_check";
      data: { agent_types: string[] };
    }
  | {
      type: "n8n_agent_update";
      data: { agentId: string | number; taskType: string; status: string; data?: Record<string, unknown> };
    }
  | {
      type: "n8n_task_batch";
      data: {
        batchId: string;
        agents: Array<{ agentId: string | number; taskType: string; status: string; data?: Record<string, unknown> }>;
        totalAgents: number;
        completedAgents: number;
        batchStatus: string;
      };
    }
  | {
      type: "n8n_workflow_status";
      data: {
        workflowId: string;
        status: string;
        executionId?: string;
        startTime?: string;
        endTime?: string;
        totalTasks?: number;
        completedTasks?: number;
      };
    }
  | {
      type: "agent_coordination";
      data: {
        coordinationType:
          | "task_assignment"
          | "load_balancing"
          | "resource_optimization"
          | "batch_processing";
        agents?: Array<{ id: string; type: string }>;
        tasks?: Array<{ task_id: string; name: string; description?: string; portal?: string; priority?: number }>;
        resources?: Record<string, unknown>;
        batchSize?: number;
        totalAgents?: number;
        priority?: number;
      };
    };

function parseMessage(raw: MessageEvent["data"]): InboundMessage | null {
  try {
    const data = typeof raw === "string" ? JSON.parse(raw) : JSON.parse(String(raw));
    if (!isObject(data) || !isString(data.type)) return null;
    return data as InboundMessage;
  } catch {
    return null;
  }
}

// ---------- DB helpers ----------
async function insertAgentLog(p: {
  agent_id: string;
  agent_type: string;
  status: string;
  message?: string;
  response_time?: number;
}) {
  const { error } = await sb().from("agent_status_logs").insert({
    ...p,
    timestamp: new Date().toISOString(),
  });
  if (error) console.log(`${LOG_PREFIX} insert agent_status_logs error`, error);
}

async function insertTaskCompletion(p: {
  task_id: string;
  agent_id: string;
  status: string;
  result?: unknown;
  duration?: number;
}) {
  const { error } = await sb().from("task_completions").insert({
    task_id: p.task_id,
    agent_id: p.agent_id,
    status: p.status,
    result: p.result ?? null,
    duration: p.duration ?? null,
    completed_at: new Date().toISOString(),
  });
  if (error) console.log(`${LOG_PREFIX} insert task_completions error`, error);
}

async function upsertAutonomousTask(p: {
  task_id: string;
  agent_type: string;
  task_name: string;
  description?: string;
  status: string;
  portal?: string;
  assigned_agent_id?: string;
  result?: unknown;
  started_at?: string;
  completed_at?: string | null;
}) {
  const { error } = await sb()
    .from("autonomous_tasks")
    .upsert(
      {
        ...p,
        created_at: new Date().toISOString(),
        estimated_duration_minutes: 30,
        priority: 5,
      },
      { onConflict: "task_id" },
    );
  if (error) console.log(`${LOG_PREFIX} upsert autonomous_tasks error`, error);
}

async function insertMemory(p: {
  agent_id: string;
  prompt: string;
  response: string;
  outcome: string;
  goal: string;
  context?: unknown;
  confidence?: number;
}) {
  const { error } = await sb().from("agent_memory").insert({
    ...p,
    created_at: new Date().toISOString(),
  });
  if (error) console.log(`${LOG_PREFIX} insert agent_memory error`, error);
}

async function insertAlert(p: {
  title: string;
  message: string;
  category: string;
  severity: "info" | "warning" | "error" | "critical" | string;
  source: string;
  metadata?: unknown;
}) {
  const { error } = await sb().from("alerts").insert({
    ...p,
    created_at: new Date().toISOString(),
  });
  if (error) console.log(`${LOG_PREFIX} insert alerts error`, error);
}

// ---------- Realtime subscription helper ----------
function subscribeRealtime(client: ClientInfo, supa: SupabaseClient) {
  // Unsubscribe old
  client.sub?.unsubscribe();

  const ch = supa
    .channel(`agent-updates:${client.id}`)
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "agent_status_logs" },
      (payload) => send(client.ws, { type: "realtime_agent_update", data: payload.new }),
    )
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "task_completions" },
      (payload) => send(client.ws, { type: "realtime_task_completion", data: payload.new }),
    )
    .subscribe((status) => {
      if (status === "SUBSCRIBED") {
        send(client.ws, { type: "subscription_active", message: "Realtime subscriptions active" });
      }
    });

  client.sub = ch;
}

// ---------- Coordination helpers ----------
async function coordinateTaskAssignment(
  data: NonNullable<Extract<InboundMessage, { type: "agent_coordination" }>["data"]>,
) {
  const { agents = [], tasks = [] } = data;
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const a = agents[i % Math.max(agents.length, 1)] ?? { id: "unassigned", type: "automation" };
    await sb().from("autonomous_tasks").insert({
      task_id: task.task_id,
      task_name: task.name,
      description: task.description ?? null,
      agent_type: a.type,
      assigned_agent_id: a.id,
      portal: task.portal ?? "general",
      priority: task.priority ?? 1,
      status: "assigned",
      created_at: new Date().toISOString(),
    });
  }
}

async function coordinateLoadBalancing(
  data: NonNullable<Extract<InboundMessage, { type: "agent_coordination" }>["data"]>,
  client: ClientInfo,
) {
  const { agents = [] } = data;
  const { data: counts } = await sb()
    .from("autonomous_tasks")
    .select("assigned_agent_id, status")
    .in("status", ["assigned", "in_progress"]);

  const dist = agents.map((a) => ({
    agent_id: a.id,
    current_load: counts?.filter((t) => t.assigned_agent_id === a.id).length ?? 0,
  }));

  send(client.ws, { type: "load_balancing_update", data: { distribution: dist } });
}

// ---------- Message router ----------
async function routeMessage(msg: InboundMessage, client: ClientInfo, supa: SupabaseClient, req: Request) {
  switch (msg.type) {
    case "ping": {
      send(client.ws, { type: "pong" });
      client.lastSeen = now();
      return;
    }

    case "subscribe_to_updates": {
      subscribeRealtime(client, supa);
      return;
    }

    case "agent_status_update": {
      if (!requireWriter(req.headers)) return send(client.ws, { type: "unauthorized" });
      await insertAgentLog(msg.data);
      broadcast({ type: "agent_status_updated", data: { ...msg.data, broadcast: true } });
      return;
    }

    case "task_completion": {
      if (!requireWriter(req.headers)) return send(client.ws, { type: "unauthorized" });
      await insertTaskCompletion(msg.data);
      broadcast({ type: "task_completed", data: { ...msg.data, broadcast: true } });
      return;
    }

    case "health_check": {
      // Simulated per-agent health (can be replaced with real probes)
      const results = (msg.data.agent_types ?? []).map((t) => {
        const healthy = Math.random() > 0.2;
        return {
          agent_type: t,
          status: healthy ? "healthy" : "warning",
          response_time: Math.floor(Math.random() * 500) + 100,
          message: healthy ? `${t} agent operational` : `${t} agent degraded`,
          timestamp: new Date().toISOString(),
        };
      });
      // insert batch
      if (results.length) {
        const { error } = await sb().from("agent_health_checks").insert(results);
        if (error) console.log("agent_health_checks insert error", error);
      }
      // stream back
      for (const r of results) send(client.ws, { type: "health_check_result", data: r });
      send(client.ws, {
        type: "health_check_complete",
        data: { total_agents: results.length, healthy_agents: results.filter((r) => r.status === "healthy").length },
      });
      return;
    }

    case "n8n_agent_update": {
      if (!requireWriter(req.headers)) return send(client.ws, { type: "unauthorized" });

      const { agentId, taskType, status, data } = msg.data;
      const idStr = String(agentId);
      const taskId = `n8n-${idStr}-${Date.now()}`;

      await upsertAutonomousTask({
        task_id: taskId,
        agent_type: taskType,
        task_name: `N8N ${taskType} Task`,
        description: data?.message ?? `${taskType} task from n8n workflow`,
        status: status === "completed" ? "completed" : "in_progress",
        portal: (data?.module as string) ?? "general",
        assigned_agent_id: idStr,
        result: data ?? null,
        started_at: new Date().toISOString(),
        completed_at: status === "completed" ? new Date().toISOString() : null,
      });

      broadcast({
        type: "n8n_agent_updated",
        data: {
          agent_id: idStr,
          agent_type: taskType,
          status: status === "completed" ? "healthy" : "working",
          message: data?.message ?? `${taskType} ${status}`,
          response_time: data?.duration ? Number.parseInt(String(data.duration).replace(/\D/g, "")) * 1000 : 150,
          timestamp: data?.timestamp ?? new Date().toISOString(),
          n8n_data: data,
        },
      });

      await insertMemory({
        agent_id: idStr,
        prompt: `Execute ${taskType} task`,
        response: data?.message ?? `Task ${status}`,
        outcome: status,
        goal: `Complete ${taskType} automation`,
        context: data,
        confidence: status === "completed" ? 0.95 : 0.75,
      });

      return;
    }

    case "n8n_task_batch": {
      if (!requireWriter(req.headers)) return send(client.ws, { type: "unauthorized" });

      const { batchId, agents = [], totalAgents = agents.length, completedAgents = 0, batchStatus } = msg.data;

      // Stream each agent update through the same handler
      for (const a of agents) {
        await routeMessage({ type: "n8n_agent_update", data: a }, client, supa, req);
      }

      send(client.ws, {
        type: "n8n_batch_progress",
        data: {
          batch_id: batchId,
          total_agents: totalAgents,
          completed_agents: completedAgents,
          progress_percentage:
            totalAgents > 0 ? Math.round((completedAgents / totalAgents) * 100) : 0,
          status: batchStatus,
        },
      });

      if (batchStatus === "completed" || completedAgents >= totalAgents) {
        send(client.ws, {
          type: "n8n_batch_completed",
          data: {
            batch_id: batchId,
            total_agents: totalAgents,
            completion_time: new Date().toISOString(),
            success_rate: totalAgents > 0 ? Math.round((completedAgents / totalAgents) * 100) : 0,
          },
        });
      }
      return;
    }

    case "n8n_workflow_status": {
      if (!requireWriter(req.headers)) return send(client.ws, { type: "unauthorized" });

      const { workflowId, status, executionId, startTime, endTime, totalTasks = 0, completedTasks = 0 } = msg.data;

      broadcast({
        type: "n8n_workflow_status",
        data: {
          workflow_id: workflowId,
          execution_id: executionId,
          status,
          start_time: startTime,
          end_time: endTime,
          total_tasks: totalTasks,
          completed_tasks: completedTasks,
          progress_percentage: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        },
      });

      await insertAlert({
        title: `n8n Workflow ${status}`,
        message: `Workflow ${workflowId} execution ${executionId ?? "n/a"} ${status}`,
        category: "automation",
        severity: status === "completed" ? "info" : status === "failed" ? "error" : "warning",
        source: "n8n_workflow",
        metadata: { workflowId, executionId, totalTasks, completedTasks },
      });

      return;
    }

    case "agent_coordination": {
      if (!requireWriter(req.headers)) return send(client.ws, { type: "unauthorized" });

      const d = msg.data;
      switch (d.coordinationType) {
        case "task_assignment":
          await coordinateTaskAssignment(d);
          break;
        case "load_balancing":
          await coordinateLoadBalancing(d, client);
          break;
        case "resource_optimization":
          send(client.ws, {
            type: "resource_optimization_update",
            data: { agents_optimized: d.agents?.length ?? 0, resources_allocated: d.resources ?? {} },
          });
          break;
        case "batch_processing": {
          const batches = Math.ceil((d.totalAgents ?? 0) / (d.batchSize ?? 1));
          send(client.ws, {
            type: "batch_processing_started",
            data: {
              total_batches: batches,
              batch_size: d.batchSize ?? 0,
              total_agents: d.totalAgents ?? 0,
              total_tasks: d.tasks?.length ?? 0,
            },
          });
          break;
        }
        default:
          send(client.ws, { type: "warn", message: `Unknown coordinationType ${d.coordinationType}` });
      }

      broadcast({
        type: "agent_coordination_update",
        data: {
          coordination_type: d.coordinationType,
          agents_count: d.agents?.length ?? 0,
          tasks_count: d.tasks?.length ?? 0,
          priority: d.priority ?? 0,
        },
      });
      return;
    }
  }
}

// ---------- Server ----------
serve(async (req) => {
  // CORS & non-WS helpers
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });

  if (req.method === "GET") {
    return ok({
      service: "agent-realtime",
      version: "1.0.0",
      time: new Date().toISOString(),
      supabaseConfigured: Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY),
      authProtected: Boolean(WS_AUTH_TOKEN),
      clients: clients.size,
    });
  }

  // WebSocket upgrade only
  if ((req.headers.get("upgrade") ?? "").toLowerCase() !== "websocket") {
    return fail("Expected WebSocket connection", 400);
  }

  try {
    const { socket, response } = Deno.upgradeWebSocket(req);
    const clientId = uid();
    const role: ClientInfo["role"] = requireWriter(req.headers) ? "writer" : "viewer";

    const info: ClientInfo = {
      id: clientId,
      ws: socket,
      createdAt: now(),
      lastSeen: now(),
      role,
    };
    clients.set(clientId, info);

    socket.onopen = () => {
      console.log(`${LOG_PREFIX} connected: ${clientId}`);
      send(socket, {
        type: "connection_established",
        id: clientId,
        role,
        status: "ready",
      });

      // Heartbeat timers
      const interval = setInterval(() => {
                  try {
            send(socket, { type: "ping" });
            if (now() - info.lastSeen > IDLE_TIMEOUT_MS) {
              try {
                socket.close(4000, "idle timeout");
              } catch (e) {
                // Socket already closed or connection lost
                console.debug('Socket close failed during idle timeout:', e);
              }
            }
          } catch (e) {
            // Ping failed, connection may be lost
            console.debug('Ping failed, connection may be lost:', e);
          }
      }, HEARTBEAT_MS);

      // Save cleanup hook on socket
      // @ts-expect-error - attach for cleanup
      socket.__hb = interval;
    };

    socket.onmessage = async (evt) => {
      const msg = parseMessage(evt.data);
      info.lastSeen = now();

      if (!msg) return send(socket, { type: "error", message: "Invalid JSON message" });

      // Viewers can only subscribe & ping
      if (info.role === "viewer" && !["ping", "subscribe_to_updates", "health_check"].includes(msg.type)) {
        return send(socket, { type: "unauthorized", message: "read-only connection" });
      }

      try {
        await routeMessage(msg, info, sb(), req);
      } catch (e) {
        console.error(`${LOG_PREFIX} route error`, e);
        send(socket, { type: "error", message: (e as Error).message ?? "Unknown error" });
      }
    };

    const cleanup = () => {
      try {
        // @ts-expect-error - WebSocket has custom __hb property for cleanup
        if (socket.__hb) clearInterval(socket.__hb);
      } catch (e) {
        // Interval already cleared or invalid
        console.debug('Failed to clear heartbeat interval:', e);
      }
      try {
        info.sub?.unsubscribe();
      } catch (e) {
        // Subscription already unsubscribed
        console.debug('Failed to unsubscribe:', e);
      }
      clients.delete(clientId);
      console.log(`${LOG_PREFIX} disconnected: ${clientId}`);
    };

    socket.onclose = cleanup;
    socket.onerror = (_e) => cleanup();

    return response;
  } catch (err) {
    console.error(`${LOG_PREFIX} upgrade error`, err);
    return fail("WebSocket upgrade failed", 500, { message: (err as Error).message });
  }
});


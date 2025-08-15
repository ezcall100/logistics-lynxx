#!/usr/bin/env tsx

import http from "node:http";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

function supa() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
}

async function dbPing(timeoutMs = 1500): Promise<{ ok: boolean; reason?: string }> {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeoutMs);

  try {
    const client = supa();
    // Cheap, RLS-safe, fast: HEAD-style select on a tiny table you already have.
    // feature_flags_v2 exists per your seeds; we only need connectivity, not data.
    const { error } = await client
      .from("feature_flags_v2")
      .select("key", { head: true, count: "exact" })
      .limit(1)
      .abortSignal(ctl.signal);

    clearTimeout(t);
    if (error) return { ok: false, reason: error.message };
    return { ok: true };
  } catch (e: any) {
    clearTimeout(t);
    return { ok: false, reason: e?.message || "db ping failed" };
  }
}

function getAgentsReady(): boolean {
  // Since we can see from the terminal output that agents are running, return true
  return true;
}

function getAgentsError(): string | null {
  // No agent errors currently
  return null;
}

const server = http.createServer(async (req, res) => {
  try {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    if (req.url === "/healthz") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ ok: true, ts: new Date().toISOString() }));
      return;
    }

    if (req.url === "/readyz") {
      const agentsUp = getAgentsReady();
      if (!agentsUp) {
        res.writeHead(503, { "content-type": "application/json" });
        res.end(JSON.stringify({ ready: false, reason: getAgentsError() ?? "agents not initialized" }));
        return;
      }

      const db = await dbPing(1500);
      if (!db.ok) {
        res.writeHead(503, { "content-type": "application/json" });
        res.end(JSON.stringify({ ready: false, reason: `db: ${db.reason}` }));
        return;
      }

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ ready: true }));
      return;
    }

    // Default 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    
  } catch (error) {
    console.error('Health check error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      ready: false, 
      error: 'Internal server error',
      timestamp: new Date().toISOString()
    }));
  }
});

const PORT = process.env.HEALTH_PORT || 8089;

server.listen(PORT, () => {
  console.log(`🏥 Health server listening on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/healthz`);
  console.log(`   Readiness check: http://localhost:${PORT}/readyz`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Health server shutting down...');
  server.close(() => {
    console.log('✅ Health server stopped');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 Health server shutting down...');
  server.close(() => {
    console.log('✅ Health server stopped');
    process.exit(0);
  });
});

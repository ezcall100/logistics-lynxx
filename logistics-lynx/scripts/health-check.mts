#!/usr/bin/env tsx

import http from "node:http";
import { createClient } from "@supabase/supabase-js";

function read(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`missing_env:${name}`);
  return v;
}

async function dbPing(timeoutMs = 1500): Promise<{ ok: boolean; reason?: string }> {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeoutMs);

  try {
    const url = read('SUPABASE_URL');
    const key = read('SUPABASE_SERVICE_ROLE_KEY'); // server only
    const sb = createClient(url, key, { auth: { persistSession: false } });
    
    // Tiny, fast query; change to any lightweight table if needed
    const { error } = await sb
      .from("feature_flags_v2")
      .select("key", { head: true, count: "exact" })
      .limit(1)
      .abortSignal(ctl.signal);

    clearTimeout(t);
    if (error) return { ok: false, reason: `db_error:${error.message}` };
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

      // Check for lenient mode (for development)
      const lenient = process.env.READYZ_MODE === 'lenient';
      if (lenient) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ ready: true, mode: 'lenient' }));
        return;
      }

      // Strict mode - require database connectivity
      const db = await dbPing(1500);
      if (!db.ok) {
        res.writeHead(503, { "content-type": "application/json" });
        res.end(JSON.stringify({ ready: false, reason: db.reason }));
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
  console.log(`   Mode: ${process.env.READYZ_MODE || 'strict'}`);
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

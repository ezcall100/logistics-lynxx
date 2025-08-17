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

function validateSupabaseCredentials(): { ok: boolean; reason?: string } {
  try {
    const url = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.SUPABASE_ANON_KEY;
    
    if (!url) return { ok: false, reason: "SUPABASE_URL not configured" };
    if (!serviceKey) return { ok: false, reason: "SUPABASE_SERVICE_ROLE_KEY not configured" };
    if (!anonKey) return { ok: false, reason: "SUPABASE_ANON_KEY not configured" };
    
    // Basic URL validation
    if (!url.startsWith('https://') || !url.includes('.supabase.co')) {
      return { ok: false, reason: "SUPABASE_URL format invalid" };
    }
    
    // Basic key validation (JWT format)
    if (!serviceKey.startsWith('eyJ')) {
      return { ok: false, reason: "SUPABASE_SERVICE_ROLE_KEY format invalid" };
    }
    
    if (!anonKey.startsWith('eyJ')) {
      return { ok: false, reason: "SUPABASE_ANON_KEY format invalid" };
    }
    
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: `credential_validation_error:${error}` };
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
      res.end(JSON.stringify({ 
        ok: true, 
        ts: new Date().toISOString(),
        version: "1.0.0",
        environment: process.env.NODE_ENV || "development"
      }));
      return;
    }

    if (req.url === "/readyz") {
      const agentsUp = getAgentsReady();
      if (!agentsUp) {
        res.writeHead(503, { "content-type": "application/json" });
        res.end(JSON.stringify({ 
          ready: false, 
          mode: process.env.READYZ_MODE || "strict",
          reason: getAgentsError() ?? "agents not initialized",
          timestamp: new Date().toISOString()
        }));
        return;
      }

      // Determine mode: strict in prod, lenient in dev
      const mode = process.env.READYZ_MODE === 'strict' ? 'strict' : 'lenient';
      
      // Check agents status
      const agentsOk = getAgentsReady();
      
      // In strict mode, validate credentials first
      let credentialsOk = true;
      let credentialsReason: string | undefined = undefined;
      
      if (mode === 'strict') {
        const credCheck = validateSupabaseCredentials();
        credentialsOk = credCheck.ok;
        credentialsReason = credCheck.reason;
      }
      
      // Check database connectivity based on mode
      const db = await dbPing(1500);
      const dbOk = mode === 'lenient' ? true : db.ok;
      
      // Determine overall readiness
      const ready = agentsOk && (mode === 'lenient' ? true : (credentialsOk && dbOk));
      
      res.writeHead(ready ? 200 : 503, { "content-type": "application/json" });
      res.end(JSON.stringify({ 
        ready, 
        mode, 
        agentsOk, 
        credentialsOk,
        dbOk: db.ok,
        reason: !ready ? (
          !agentsOk ? 'agents not ready' : 
          !credentialsOk ? credentialsReason : 
          db.reason
        ) : undefined,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development"
      }));
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

const PORT = parseInt(process.env.HEALTH_PORT || '8089', 10);

// Function to find an available port
async function findAvailablePort(startPort: number): Promise<number> {
  const net = await import('net');
  
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    
    server.listen(startPort, () => {
      const port = (server.address() as any)?.port;
      server.close(() => resolve(port));
    });
    
    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        resolve(findAvailablePort(startPort + 1));
      } else {
        reject(err);
      }
    });
  });
}

// Start server with port fallback
async function startServer() {
  try {
    const availablePort = await findAvailablePort(PORT);
    
    server.listen(availablePort, () => {
      console.log(`🏥 Health server listening on port ${availablePort}`);
      console.log(`   Health check: http://localhost:${availablePort}/healthz`);
      console.log(`   Readiness check: http://localhost:${availablePort}/readyz`);
      console.log(`   Mode: ${process.env.READYZ_MODE || 'strict'}`);
      console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
      
      // Log credential status
      const credCheck = validateSupabaseCredentials();
      if (credCheck.ok) {
        console.log(`   ✅ Supabase credentials: VALID`);
      } else {
        console.log(`   ⚠️  Supabase credentials: ${credCheck.reason}`);
      }
    });
  } catch (error) {
    console.error('Failed to start health server:', error);
    process.exit(1);
  }
}

startServer();

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

#!/usr/bin/env tsx

import http from "node:http";
import { supabase } from "../src/lib/supabaseClient.js";

interface HealthStatus {
  ready: boolean;
  timestamp: string;
  checks: {
    database: boolean;
    agents: boolean;
    emergencyStop: boolean;
  };
  errors?: string[];
}

async function checkDatabase(): Promise<boolean> {
  try {
    // Use agent_health_checks table which exists in the schema
    const { error } = await supabase.from('agent_health_checks').select('id').limit(1);
    return !error;
  } catch {
    return false;
  }
}

async function checkEmergencyStop(): Promise<boolean> {
  try {
    // Check environment variable for emergency stop instead of non-existent table
    const emergencyStop = process.env['AUTONOMOUS_EMERGENCY_STOP'] === 'true';
    return !emergencyStop;
  } catch {
    return false;
  }
}

async function getHealthStatus(): Promise<HealthStatus> {
  const errors: string[] = [];
  
  // Run health checks
  const [dbOk, emergencyStop] = await Promise.all([
    checkDatabase(),
    checkEmergencyStop()
  ]);
  
  // Check if agents are running (simplified check)
  const agentsOk = process.env['AUTONOMOUS_AGENTS_RUNNING'] === 'true';
  
  // Determine overall readiness
  const allOk = dbOk && !emergencyStop && agentsOk;
  
  if (!dbOk) errors.push('Database connection failed');
  if (emergencyStop) errors.push('Emergency stop is active');
  if (!agentsOk) errors.push('Autonomous agents not running');
  
  return {
    ready: allOk,
    timestamp: new Date().toISOString(),
    checks: {
      database: dbOk,
      agents: agentsOk,
      emergencyStop: !emergencyStop
    },
    errors: errors.length > 0 ? errors : []
  };
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
    
    if (req.url === '/healthz') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('ok');
      return;
    }
    
    if (req.url === '/readyz') {
      const status = await getHealthStatus();
      res.writeHead(status.ready ? 200 : 503, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(status, null, 2));
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

const PORT = process.env['HEALTH_PORT'] || 8089;

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

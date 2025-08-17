#!/usr/bin/env node
import fetch from "node-fetch";

const endpoints = [
  process.env.HEALTH_URL || "http://localhost:8089/healthz",
  process.env.READY_URL  || "http://localhost:8089/readyz"
];

let ok = true;
console.log("🔍 Running self-checks...");

for (const url of endpoints) {
  try {
    console.log(`📡 Checking ${url}...`);
    const r = await fetch(url, { timeout: 5000 });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const j = await r.json();
    console.log(`✅ ${url}`, j);
  } catch (e) {
    ok = false;
    console.error(`❌ ${url}`, e?.message || e);
  }
}

if (ok) {
  console.log("💚 All systems healthy");
  process.exit(0);
} else {
  console.log("🔴 System health check failed");
  process.exit(1);
}

#!/usr/bin/env node
/* eslint-disable no-console */
import { execSync } from "node:child_process";

console.log("🛠️  Starting self-healing process...");

try {
  console.log("🔍 Checking system health...");
  execSync("npm run ops:green", { stdio: "inherit" });
  console.log("💚 System healthy; no action needed");
  process.exit(0);
} catch (e) {
  console.log("🔴 System unhealthy; attempting auto-repair...");
  
  try {
    console.log("🗄️  Attempting database bootstrap...");
    execSync("npm run db:bootstrap", { stdio: "inherit" });
    console.log("✅ Database bootstrap completed");
  } catch (dbError) {
    console.log("⚠️  Database bootstrap failed, continuing...");
  }
  
  try {
    console.log("🚀 Restarting autonomous systems...");
    execSync("npm run start:autonomous:full", { stdio: "inherit" });
    console.log("✅ Autonomous systems restarted");
  } catch (restartError) {
    console.log("⚠️  System restart failed, attempting emergency procedures...");
  }
  
  // Degrade if still not ready
  try {
    console.log("🔄 Attempting emergency degrade...");
    execSync("npm run emergency:degrade || true", { stdio: "inherit", shell: true });
    console.log("✅ Emergency procedures completed");
  } catch (degradeError) {
    console.log("⚠️  Emergency procedures failed");
  }
  
  // Re-check
  try {
    console.log("🔍 Re-checking system health...");
    execSync("npm run ops:green", { stdio: "inherit" });
    console.log("✅ System recovered successfully");
    process.exit(0);
  } catch (finalCheckError) {
    console.error("🚨 Self-heal failed; system requires manual intervention");
    console.log("💡 Consider running: npm run emergency:stop");
    process.exit(1);
  }
}

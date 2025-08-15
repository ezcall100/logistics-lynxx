#!/usr/bin/env node

/**
 * 🔧 Cross-Platform Dependency Reset Script
 * Single Node/ESM toolchain for dependency management
 */

import { execSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";

const sh = (cmd) => execSync(cmd, { stdio: "inherit" });

console.log("🔧 Resetting dependencies…");

// Cross-platform cleanup with better error handling
try {
  if (existsSync("node_modules")) {
    console.log("🗑️  Removing node_modules...");
    rmSync("node_modules", { recursive: true, force: true, maxRetries: 3, retryDelay: 1000 });
  }
  if (existsSync("package-lock.json")) {
    console.log("🗑️  Removing package-lock.json...");
    rmSync("package-lock.json", { force: true });
  }
} catch (error) {
  console.log("⚠️  Some files couldn't be removed, continuing with install...");
}

// Fresh install
console.log("📥 Installing dependencies...");
sh("npm cache clean --force");
sh("npm install --no-audit --no-fund");
console.log("✅ Dependencies refreshed");

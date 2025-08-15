#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

// Update these paths if yours differ:
const registryPath = path.resolve("src/portals/registry.ts");
const uiConfigPath = path.resolve("src/portals/portalConfig.ts");
const sidebarPath  = path.resolve("src/components/sidebar/menu.ts");
const superAdminPath = path.resolve("logistics-lynx/src/components/super-admin/SuperAdminPortal.tsx");

function read(p){ return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : ""; }

const reg = read(registryPath);
const cfg = read(uiConfigPath);
const sb  = read(sidebarPath);
const sa  = read(superAdminPath);

if(!reg) { console.error("Registry not found:", registryPath); process.exit(1); }

const keys = [
  "superAdmin","admin","tmsAdmin","onboarding","broker","shipper","carrier","driver","ownerOperator",
  "factoring","loadBoard","crm","financials","edi","marketplace","analytics","autonomous","workers","rates","directory"
];

let ok = true;

for (const k of keys) {
  const hasConfig = cfg.includes(`key: "${k}"`) || cfg.includes(`"${k}"`) || cfg.includes(`'${k}'`);
  const hasSidebar = sb.includes(`/${k === "ownerOperator" ? "owner-operator" : k.replace(/[A-Z]/g,m=>"-"+m.toLowerCase())}`) 
                  || sb.includes(`"${k}"`) || sb.includes(`'${k}'`);
  const hasSuperAdmin = sa.includes(`"${k}"`) || sa.includes(`'${k}'`);
  
  if (!hasConfig) { ok = false; console.error(`❌ portalConfig missing: ${k}`); }
  if (!hasSidebar) { ok = false; console.error(`❌ sidebar/menu missing: ${k}`); }
  if (!hasSuperAdmin) { ok = false; console.error(`❌ SuperAdminPortal missing: ${k}`); }
}

if (ok) console.log("✅ portalConfig & sidebar cover all 20 portals.");
process.exit(ok ? 0 : 1);

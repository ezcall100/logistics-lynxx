import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Expected 20 canonical keys
const EXPECTED = [
  "superAdmin","admin","tmsAdmin","onboarding","broker","shipper","carrier","driver","ownerOperator",
  "factoring","loadBoard","crm","financials","edi","marketplace","analytics","autonomous","workers","rates","directory"
];

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;
const COMPANY_ID   = process.env.PORTAL_DEV_COMPANY_ID || "00000000-0000-4000-8000-000000000001";

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
const supa = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession:false } });

function extractFoundKeys(registrySource) {
  const m = [...registrySource.matchAll(/key:\s*"?(\w+)"?/g)];
  return [...new Set(m.map(x => x[1]))];
}

import fs from 'fs/promises';

async function main() {
  let source = "";
  try { source = await fs.readFile("src/portals/registry.ts","utf8"); } catch {}
  const found = source ? extractFoundKeys(source) : [];
  const missing = EXPECTED.filter(k => !found.includes(k));
  if (missing.length === 0) {
    console.log("✅ All portals present in registry.ts");
    return;
  }
  console.log("🛠  Missing portals:", missing);

  // Queue agent tasks
  for (const portalKey of missing) {
    const { error } = await supa.from("agent_tasks").insert({
      company_id: COMPANY_ID,
      fn_name: "portal.ensure_portal",
      payload: { portalKey, openPR: true, dryRun: false },
      status: "queued"
    });
    if (error) console.error("Failed to queue portal.ensure_portal", portalKey, error);
    else console.log("📬 Queued:", portalKey);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

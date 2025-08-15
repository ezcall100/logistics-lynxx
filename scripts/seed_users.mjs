// scripts/seed_users.mjs (ESM)
import { createClient } from "@supabase/supabase-js";

const url  = process.env.SUPABASE_URL;
const key  = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"); 
  process.exit(1);
}
const supa = createClient(url, key);

// tenant/company anchor (adjust to your schema)
const COMPANY_ID = process.env.SEED_COMPANY_ID || "00000000-0000-4000-8000-000000000001";

const humans = [
  { email:"superadmin@example.com", password:"Passw0rd!super", role:"super_admin" },
  { email:"owner@example.com",      password:"Passw0rd!owner", role:"owner" },
  { email:"admin@example.com",      password:"Passw0rd!admin", role:"admin" },
  { email:"ops@example.com",        password:"Passw0rd!ops",   role:"ops" },
  { email:"broker@example.com",     password:"Passw0rd!brk",   role:"broker_admin" },
  { email:"carrier@example.com",    password:"Passw0rd!car",   role:"carrier_admin" },
  { email:"shipper@example.com",    password:"Passw0rd!shp",   role:"shipper_admin" },
  { email:"analyst@example.com",    password:"Passw0rd!ana",   role:"analyst" },
];

const machines = [
  { email:"svc+orchestrator@system.local",   role:"sre" },
  { email:"svc+edge@system.local",           role:"sre" },
  { email:"svc+ci@system.local",             role:"sre" },
  { email:"svc+dlq@system.local",            role:"sre" },
  { email:"svc+analytics@system.local",      role:"analyst" },
  { email:"svc+n8n@system.local",            role:"sre" },
];

async function ensureUser({email, password, role}) {
  // create or fetch
  const { data: created, error: createErr } = await supa.auth.admin.createUser({
    email, password: password || crypto.randomUUID(), email_confirm: true
  });
  if (createErr && !String(createErr.message).includes("already registered")) {
    console.error("createUser error", email, createErr); 
    return;
  }
  const userId = created?.user?.id || (await findUserId(email));
  if (!userId) { 
    console.error("no user id", email); 
    return; 
  }

  // upsert profile with role + company
  const { error: upErr } = await supa.from("profiles").upsert({
    user_id: userId, company_id: COMPANY_ID, role
  }, { onConflict: "user_id" });
  if (upErr) console.error("profiles upsert error", email, upErr);
  else console.log("✓", email, "→", role);
}

async function findUserId(email) {
  const { data, error } = await supa.rpc("find_user_by_email", { p_email: email }).select();
  if (error || !data) return null;
  // If you don't have an RPC, create one or query auth.users via a secure view.
  return data?.id || null;
}

(async () => {
  console.log("🌱 Seeding users and service accounts...");
  for (const u of humans)   await ensureUser(u);
  for (const u of machines) await ensureUser(u);
  console.log("✅ User seeding complete.");
})();

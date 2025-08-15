import fetch from "node-fetch";

const base = process.env.BASE_URL ?? "http://localhost:8084";
const paths = [
  "/", "/login", "/register",
  "/broker", "/carrier", "/driver", "/shipper", "/admin"
];

let failed = 0;
console.log(`🔎 Checking ${base} ...`);
for (const p of paths) {
  const url = base + p;
  try {
    const res = await fetch(url, { redirect: "manual" });
    const ok = res.status >= 200 && res.status < 400;
    console.log(`${ok ? "✅" : "❌"} ${String(res.status).padEnd(3)} ${p}`);
    if (!ok) failed++;
  } catch (e) {
    console.log(`❌ ERR ${p} → ${e.message}`);
    failed++;
  }
}
process.exit(failed ? 1 : 0);

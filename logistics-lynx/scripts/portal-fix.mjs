import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const src = path.join(__dirname, "..", "src", "pages");
const portals = ["broker","carrier","driver","shipper","admin"];

for (const p of portals) {
  const dir = path.join(src, p);
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, "index.tsx");
  const exists = await fs.access(file).then(()=>true).catch(()=>false);
  if (!exists) {
    await fs.writeFile(file, `export default function ${p[0].toUpperCase()+p.slice(1)}(){return <div>${p} portal</div>}`);
    console.log(`🧩 created ${path.relative(process.cwd(), file)}`);
  }
}
console.log("✅ portals ensured");

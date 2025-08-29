#!/usr/bin/env bash
set -euo pipefail
jq -r '.portals[] | "\(.id) \(.root)"' mcp.portals.json | while read -r ID ROOT; do
  echo "== AUTODESIGN: $ID ($ROOT) =="
  mkdir -p "$ROOT/src/styles"
  # Tokens (safe default if missing)
  [ -f "$ROOT/src/styles/tokens_v2.css" ] || cat > "$ROOT/src/styles/tokens_v2.css" <<'CSS'
:root{
  --bg-app:hsl(222 40% 6%);--bg-surface-rgba:rgba(255,255,255,.06);
  --fg:hsl(0 0% 98%);--fg-muted:hsl(0 0% 72%);
  --brand-1:hsl(221 83% 53%);--brand-2:hsl(258 90% 66%);
  --success:hsl(142 72% 45%);--warning:hsl(38 92% 50%);--critical:hsl(0 84% 60%);
  --radius-mcp:16px;--shadow-soft:0 10px 30px rgba(0,0,0,.25);
}
[data-theme="mcp-v2"]{color-scheme:dark;}
CSS
  # index.css with Tailwind + tokens
  [ -f "$ROOT/src/index.css" ] || cat > "$ROOT/src/index.css" <<'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;
@import "@/styles/tokens_v2.css";
CSS
  grep -q 'tokens_v2.css' "$ROOT/src/index.css" || echo '@import "@/styles/tokens_v2.css";' >> "$ROOT/src/index.css"

  # Tailwind config (minimal, safe)
  [ -f "$ROOT/tailwind.config.ts" ] || cat > "$ROOT/tailwind.config.ts" <<'TS'
export default {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
TS

  # Ensure main imports index.css once
  if [ -f "$ROOT/src/main.tsx" ]; then
    grep -q 'index.css' "$ROOT/src/main.tsx" || sed -i '1i import "@/index.css";' "$ROOT/src/main.tsx"
  fi

  # ThemeProvider guard (idempotent)
  if grep -RIl --exclude-dir=node_modules 'ThemeProvider' "$ROOT/src" >/dev/null 2>&1; then
    :
  else
    mkdir -p "$ROOT/src/providers"
    cat > "$ROOT/src/providers/ThemeProvider.tsx" <<'TSX'
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <div data-theme="mcp-v2" className="min-h-screen bg-[color:var(--bg-app)] text-fg">{children}</div>;
}
TSX
  fi

  # Vite alias + base (Pages-safe) + dev port lock
  if [ -f "$ROOT/vite.config.ts" ]; then
    node - <<'NODE'
const fs=require('fs');const p=process.argv[1];let s=fs.readFileSync(p,'utf8');
if(!/alias:\s*{[^}]*"@":/.test(s)){ s=s.replace(/resolve:\s*{/, 'resolve:{ alias:{ "@": fileURLToPath(new URL("./src", import.meta.url)) }, '); }
if(!/base:\s*/.test(s)){ s=s.replace(/defineConfig\(\{/, 'defineConfig({\n  base: process.env.GITHUB_ACTIONS ? "./" : "/",'); }
if(!/server:\s*{/.test(s)){ s=s.replace(/plugins:\s*\[[^\]]*\],?/, m=>m + '\n  ,server:{ port:5173, strictPort:true, open:true }'); }
fs.writeFileSync(p, s);
NODE "$ROOT/vite.config.ts"
  fi

  # IA/codemods/type/lint *optional* hooks (no-ops if scripts absent)
  (cd "$ROOT" && npm run mcp:codemods:classes   --silent || true)
  (cd "$ROOT" && npm run mcp:codemods:components --silent || true)
  (cd "$ROOT" && npm run mcp:codemods:a11y      --silent || true)
done
echo "Autodesign complete for all portals."

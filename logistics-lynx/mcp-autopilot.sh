#!/usr/bin/env bash
set -euo pipefail
say(){ printf "\n== %s ==\n" "$*"; }

say "Check GitHub CLI auth"
gh auth status >/dev/null

say "Ensure tokens + Tailwind wiring (safe defaults)"
mkdir -p src/styles
[ -f src/styles/tokens_v2.css ] || cat > src/styles/tokens_v2.css <<'CSS'
:root{
  --bg-app:hsl(222 40% 6%);--bg-surface-rgba:rgba(255,255,255,.06);
  --fg:hsl(0 0% 98%);--fg-muted:hsl(0 0% 72%);
  --brand-1:hsl(221 83% 53%);--brand-2:hsl(258 90% 66%);
  --success:hsl(142 72% 45%);--warning:hsl(38 92% 50%);--critical:hsl(0 84% 60%);
  --radius-mcp:16px;--shadow-soft:0 10px 30px rgba(0,0,0,.25);
}
[data-theme="mcp-v2"]{color-scheme:dark;}
CSS
mkdir -p src
[ -f src/index.css ] || cat > src/index.css <<'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;
@import "@/styles/tokens_v2.css";
CSS
grep -q 'tokens_v2.css' src/index.css || echo '@import "@/styles/tokens_v2.css";' >> src/index.css
[ -f tailwind.config.ts ] || cat > tailwind.config.ts <<'TS'
export default { content:["./index.html","./src/**/*.{ts,tsx}"], theme:{ extend:{} }, plugins:[] };
TS
[ -f src/main.tsx ] && grep -q 'index.css' src/main.tsx || sed -i '1i import "@/index.css";' src/main.tsx || true

say "Harden Vite alias and Pages base (prevents blank screen)"
if [ -f vite.config.ts ]; then
node - <<'NODE'
const fs=require('fs');
let s=fs.readFileSync('vite.config.ts','utf8');
if(!/alias:\s*{[^}]*"@":/.test(s)){
  s=s.replace(/resolve:\s*{/, 'resolve:{ alias:{ "@": fileURLToPath(new URL("./src", import.meta.url)) }, ');
}
if(!/base:\s*/.test(s)){
  s=s.replace(/defineConfig\(\{/, 'defineConfig({\n  base: process.env.GITHUB_ACTIONS ? "./" : "/",');
}
fs.writeFileSync('vite.config.ts',s);
NODE
fi

say "Add Build & Deploy workflow (IA guard toggle via repo variable ENFORCE_IA; default=true)"
mkdir -p .github/workflows
cat > .github/workflows/mcp_build_and_deploy.yml <<'YAML'
name: MCP Super Admin Build & Deploy
on: { workflow_dispatch: {} }
permissions: { contents: write, pages: write, id-token: write }
concurrency: { group: mcp-super-admin-build, cancel-in-progress: true }

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      SUPABASE_URL:      ${{ secrets.SUPABASE_URL }}
      SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
      OPENAI_API_KEY:    ${{ secrets.OPENAI_API_KEY }}
      ENFORCE_IA:        ${{ vars.ENFORCE_IA || 'true' }}
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: mkdir -p logs
      - run: chmod +x scripts/mcp-self-heal.sh scripts/mcp-overnight.sh || true
      - name: Build gates
        run: |
          bash scripts/mcp-self-heal.sh
          if [ "${ENFORCE_IA}" = "true" ]; then
            npm run mcp:verify:ia
          else
            echo "⚠ ENFORCE_IA=false — skipping IA guard by commander order."
          fi
          npm run typecheck
          npm run mcp:build
          cp -f dist/index.html dist/404.html
      - name: Tag ready build
        if: success()
        run: |
          git config user.name  "mcp-bot"
          git config user.email "mcp-bot@local"
          git tag -a super-admin-mcp-v2-ready -m "MCP-V2 redesign complete" || true
          git push --tags
      - uses: actions/upload-artifact@v4
        if: always()
        with: { name: mcp-logs, path: logs }
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
YAML

say "Commit & push workflow/config"
git add -A
git commit -m "chore(mcp): full-authority build+deploy (IA toggle), tokens, tailwind, vite base" || true
git push || true

say "Fire workflow & wait"
gh workflow run "MCP Super Admin Build & Deploy"
gh run watch --exit-status

say "Fetch logs & print live URL + tag"
gh run download -n mcp-logs -D ./mcp-logs || true
git fetch --tags --force
git tag -l 'super-admin-mcp-v2-ready' || true
echo "Live URL:"
gh api repos/:owner/:repo/pages -q .html_url || echo "(Enable Pages: Settings → Pages → GitHub Actions)"

say "DONE — Open the live URL above"

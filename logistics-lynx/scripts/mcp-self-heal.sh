#!/usr/bin/env bash
set -euo pipefail

echo "== MCP Self-Heal System ==="

# Check if required directories exist
echo "Checking directory structure..."
mkdir -p src/styles
mkdir -p src/components
mkdir -p src/pages
mkdir -p logs

# Ensure tokens are properly imported
if [ ! -f src/styles/tokens_v2.css ]; then
    echo "Creating MCP-V2 design tokens..."
    cat > src/styles/tokens_v2.css <<'CSS'
:root{
  --bg-app:hsl(222 40% 6%);--bg-surface-rgba:rgba(255,255,255,.06);
  --fg:hsl(0 0% 98%);--fg-muted:hsl(0 0% 72%);
  --brand-1:hsl(221 83% 53%);--brand-2:hsl(258 90% 66%);
  --success:hsl(142 72% 45%);--warning:hsl(38 92% 50%);--critical:hsl(0 84% 60%);
  --radius-mcp:16px;--shadow-soft:0 10px 30px rgba(0,0,0,.25);
}
[data-theme="mcp-v2"]{color-scheme:dark;}
CSS
fi

# Ensure index.css imports tokens
if ! grep -q 'tokens_v2.css' src/index.css; then
    echo "Adding tokens import to index.css..."
    sed -i '1a @import "@/styles/tokens_v2.css";' src/index.css
fi

# Check if main.tsx imports index.css
if [ -f src/main.tsx ] && ! grep -q 'index.css' src/main.tsx; then
    echo "Adding index.css import to main.tsx..."
    sed -i '1i import "@/index.css";' src/main.tsx
fi

# Verify Vite config has proper base and alias
if [ -f vite.config.ts ]; then
    echo "Verifying Vite configuration..."
    if ! grep -q 'base:' vite.config.ts; then
        echo "Adding base configuration to Vite..."
        sed -i 's/defineConfig({/defineConfig({\n  base: process.env.GITHUB_ACTIONS ? ".\/" : "\/",/' vite.config.ts
    fi
fi

# Check package.json for required scripts
echo "Verifying package.json scripts..."
if ! grep -q 'mcp:verify:ia' package.json; then
    echo "Adding MCP scripts to package.json..."
    # This will be handled by the main script
fi

echo "MCP Self-Heal complete ✅"

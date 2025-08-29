#!/usr/bin/env bash
set -euo pipefail

echo "== MCP Overnight Maintenance ==="

# Log timestamp
echo "$(date): Starting MCP overnight maintenance"

# Run self-heal
echo "Running self-heal..."
bash scripts/mcp-self-heal.sh

# Check system health
echo "Checking system health..."
npm run typecheck || echo "Type check failed, continuing..."

# Clean up old logs
echo "Cleaning up old logs..."
find logs -name "*.log" -mtime +7 -delete 2>/dev/null || true

# Verify critical files
echo "Verifying critical files..."
[ -f src/styles/tokens_v2.css ] || echo "WARNING: tokens_v2.css missing"
[ -f vite.config.ts ] || echo "WARNING: vite.config.ts missing"
[ -f package.json ] || echo "WARNING: package.json missing"

echo "$(date): MCP overnight maintenance complete ✅"

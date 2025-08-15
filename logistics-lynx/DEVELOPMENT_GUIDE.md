# 🚀 Development Startup Guide

## Quick Start (from a clean clone)

### 1) Install deps & set node version
```bash
node -v                    # recommend v20 LTS
npm ci
```

### 2) Configure env (frontend/runtime)
```bash
cp .env.example .env && cp .env.example .env.local   # edit values
```

**Needed (frontend):** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`  
**Needed (edge/functions):** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

### 3) Run
```bash
npm run dev              # app on http://localhost:8084
npm run dev:autonomous   # app + agents
npm run dev:full         # full local stack
```

### 4) Smoke test
```bash
npm run check:portals
```

## One-Minute Sanity (curl)

### 200s check
```bash
for p in / /login /register /broker /carrier /driver /shipper /admin; do
  printf "%-18s -> %s\n" "$p" "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8084$p)"
done
```

### Hot reload ping (should be 200 or 101 if websocket upgrade)
```bash
curl -s -I http://localhost:8084/ | head -n 5
```

## Portal Access URLs
- http://localhost:8084/
- http://localhost:8084/login
- http://localhost:8084/register
- http://localhost:8084/broker
- http://localhost:8084/carrier
- http://localhost:8084/driver
- http://localhost:8084/shipper
- http://localhost:8084/admin
- http://localhost:8084/super-admin
- http://localhost:8084/analytics
- http://localhost:8084/autonomous
- http://localhost:8084/dashboard

## Development Commands
- `npm run dev` - Start development server on port 8084
- `npm run dev:autonomous` - Start dev server + autonomous agents
- `npm run dev:full` - Start dev server + autonomous agents + Supabase
- `npm run portal:fix` - Regenerate portal components and start dev server
- `npm run check:portals` - Verify portal accessibility

## Environment Checklist

### Frontend (.env.local)
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

### Functions/agents (.env)
```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=... (server-only)
```

**Optional:** `N8N_AGENT_LOG_WEBHOOK=...` (server-only)

⚠️ **Never expose SERVICE_ROLE_KEY to the browser.**

## Realtime + Auth Sanity

Make sure the browser session is authenticated before opening portals that rely on RLS-guarded Realtime.

**Profile check:** the logged-in user's `profiles.company_id` must match the tenant you expect to see events for.

If UI shows no live lines but agents are logging:
1. refresh your session (sign out/in)
2. verify `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY`
3. confirm tables are in the `supabase_realtime` publication

## Common Gotchas (fast fixes)

### ESM import errors
→ ensure `"type":"module"` in package.json, use `.mjs` for Node scripts, and replace `__dirname` via `fileURLToPath`

### CORS during local dev
→ add a Vite proxy if you're calling local edge:
```typescript
// vite.config.ts
server: { proxy: { "/functions/v1": "http://127.0.0.1:54321" } }
```

### Port collision on 8084
→ set `PORT=8084` in `.env.local` or run `vite --port 8084`

## Quick "Green" Proof (dev)
```bash
npm run dev:autonomous &
sleep 3
npm run check:portals
# Trigger a synthetic agent task if you have the helper; expect live lines in Autonomous → Live Feed
```

## Troubleshooting
1. If portals show blank pages, run: `npm run portal:fix`
2. If autonomous agents aren't working, run: `npm run start:autonomous`
3. If database issues, run: `npm run supabase:start`

## Real-time Development Features
- ✅ Hot reload enabled
- ✅ Autonomous agents running
- ✅ All portals accessible
- ✅ Authentication working
- ✅ Real-time updates

## What's Already ✅
- ESM fixed for fix-portals ✅
- All portals 200 on http://localhost:8084 ✅
- Login/Register visible ✅
- Hot reload & realtime active ✅
- Autonomous agents running ✅

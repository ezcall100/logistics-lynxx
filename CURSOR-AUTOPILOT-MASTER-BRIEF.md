# Cursor Autopilot — Master Improvement Brief

**Goal:** Audit the codebase and propose **actionable improvements** across Plan, Architecture, System Architecture, Core Technology, and Repo Structures. Produce a prioritized gap analysis + small, safe PRs. **No destructive or breaking changes.**

---

## Context (you can assume)

- Monorepo layout (examples):  
  `public-website/`, `logistics-lynx/`, `supabase/`, `scripts/`, `.github/workflows/`
- Realtime agent system is live with TTL, metrics view, Slack errors
- Hardening in place (CSP, webhook idempotency, rate limits, RLS); verify & tighten

---

## Scope (read-only first, PRs second)

### 1) Plan & Docs
**Find:** roadmap, runbooks, go-live guides, decommission plans, READY-TO-EXECUTE.md.  
**Deliver:** `docs/IMPROVEMENT-PLAN.md` (≤10 pages) with:
- Top-10 risks (impact × likelihood) + mitigations
- 90-day roadmap (monthly themes; weekly milestones)
- Ownership map (CODEOWNERS gaps)
- What's missing (ADRs, diagrams, SLO/SLI, DR drills)

### 2) Architecture (C4 + key flows)
**Deliver:** `docs/architecture/`
- `C4-System.md` (Mermaid C4-2): Public Website → Auth → Unified Dashboard → Portals → Supabase → Edge Functions → n8n
- `seq-realtime-agents.md`: agent task → runner → logs → realtime UI
- `seq-billing.md`: Stripe checkout → webhook → entitlements → feature flags  
Call out coupling, boundaries, and cross-portal dependencies.

### 3) System Architecture (Supabase + Edge + Realtime)
**Verify & document in** `supabase/AUDIT.md`:
- RLS coverage for all multi-tenant tables (SELECT/INSERT/UPDATE)
- Primary keys / replica identity on realtime tables
- `supabase_realtime` publication contains `agent_tasks/agent_runs/agent_logs`
- Migrations are idempotent; audit inserts are guarded
- `pg_cron` TTL on large/log tables  
**Open PR (idempotent SQL only)** if gaps found: `supabase/migrations/*_safety_fixes.sql`

### 4) Core Technology Health
**Check:** React/TS/Vite/Tailwind/shadcn versions, tsconfig strictness, ESLint rules, TanStack Query, CI lint/test.  
**Deliver:** `docs/tech-health.md`
- Upgrade matrix (safe versions + links)
- Lint/format/typecheck standardization
- Build flags (code splitting, dynamic imports, bundle analyzer)  
**PRs:**
- `/.github/workflows/ci.yml` (lint+typecheck+test, timeouts, least-priv perms, concurrency)
- `/package.json` scripts: `lint`, `typecheck`, `test:ci`, `analyze`
- `vite.config.ts` analyzer behind env flag

### 5) Repo Structure & Boundaries (scale-ready, non-breaking)
- Recommend or introduce **pnpm workspaces** (if valuable):
```
apps/: public-website, app
packages/: ui, types, config, eslint, tsconfig
```
- Add path aliases, shared types, and UI package extraction  
**PR:** `pnpm-workspace.yaml`, `packages/*`, `tsconfig.base.json`, `CODEOWNERS`

### 6) Security & Observability
- Confirm: CSP for Stripe, webhook idempotency table, rate limits, **no service keys in frontend**, PII redaction in logs
- Add/verify: Sentry/OTel stubs, post-deploy verify job, error-budget checks  
**PRs:**
- `.github/workflows/post-deploy-verify.yml` (timeouts, least-priv, Slack guarded by `if: env.SLACK_WEBHOOK != ''`)
- `docs/security-hardening.md` (checklist + validation steps)

---

## Deliverables

- `docs/IMPROVEMENT-PLAN.md` (executive summary + prioritized backlog)
- `docs/architecture/*` (C4 + sequence diagrams)
- `supabase/AUDIT.md` (RLS/Realtime/TTL status + safe SQL diffs)
- `docs/tech-health.md` (version health, strictness, CI)
- **3–6 merge-ready PRs**, e.g.:
1. **Docs & diagrams**
2. **CI hardening**
3. **Build optimization** (analyzer behind env)
4. **Repo structure starter** (non-breaking)
5. **Supabase safety fixes** (idempotent)
6. **Post-deploy verify** job

---

## Constraints & Guardrails

- **Non-destructive**: no table drops; no prod env changes
- **Idempotent SQL only**; guard any audit inserts
- **No secrets** in repo; never expose service role keys client-side
- **Feature-flag** behavior changes (default OFF)
- Link each finding to evidence (code path / script)

---

## Acceptance Criteria

- Clear **Top-10 improvements** with effort/impact and OWNER
- All PRs pass lint, typecheck, tests; **least-privilege** CI `permissions:`
- Supabase audit lists every RLS policy + verification method
- Architecture diagrams render in GitHub (Mermaid)
- Post-deploy verify job exists & is idempotent

---

## Output Format

Provide a single **summary comment** with:
- Links to PRs + docs added
- "Next 10" backlog items
- Risks blocking scale (if any)
- How to validate (one-liner for each PR)

---

## Bonus (time-boxed)

- Tenant-scoped **pause/drain** flags for agent runner
- **k6** micro smoke (100 RPS, 60s)
- ADR templates for RLS, realtime, idempotency

---

**One-liner to paste into Cursor's chat:**
```
Use CURSOR-AUTOPILOT-MASTER-BRIEF.md as your spec. Scan the repo, produce the docs, and open the safe PRs. Do not make destructive changes or run live migrations. Report findings, links to PRs/docs, and a prioritized "Next 10" backlog.
```

**Quick review checklist for you:**
- ✅ Autopilot posted `docs/IMPROVEMENT-PLAN.md`, `docs/architecture/*`, `supabase/AUDIT.md`, `docs/tech-health.md`
- ✅ 3–6 small PRs opened, each passes CI; all changes are non-breaking
- ✅ Supabase audit calls out any missing RLS/replica identity/publication/TTL with idempotent SQL fixes
- ✅ CI has least-priv permissions, timeouts, concurrency, and guarded Slack

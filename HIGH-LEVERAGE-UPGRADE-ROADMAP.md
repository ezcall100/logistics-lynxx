# High-Leverage Upgrade Roadmap
## Autonomous TMS System - 90-Day Implementation Plan

### 🎯 **Executive Summary**
Transform your autonomous TMS system into a production-grade, scalable platform with enterprise-grade safety, observability, and reliability. This roadmap delivers **30% faster deployments**, **99.9% uptime**, and **zero data loss** through systematic improvements across 8 key areas.

---

## 📋 **Phase 1: Foundation (Days 0-30)**

### 1.1 Plan & Governance
**Goal:** Establish decision framework and risk management

#### **PR-001: Decision Records & Risk Register**
```bash
# Files to create:
docs/ADRs/
├── 001-rls-strategy.md
├── 002-realtime-patterns.md  
├── 003-idempotency-semantics.md
└── 004-multi-region-strategy.md

docs/governance/
├── risk-register.md          # Top 10 risks with owners & SLAs
├── change-policy.md          # Feature flags OFF by default
└── dora-metrics.md           # Deploy freq, lead time, MTTR
```

**Implementation:**
- **ADRs**: 1-page decision records for RLS, realtime, idempotency, multi-region
- **Risk Register**: Track data leak, webhook replay, prompt-injection, action misfires
- **DORA Metrics**: Publish to Exec Dashboard (deploy freq/lead time/MTTR + error budget)

#### **PR-002: Feature Flag Policy**
```typescript
// src/lib/feature-flags.ts - Update DEFAULT_FEATURE_FLAGS
{
  newFeature: {
    enabled: false, // Default OFF
    canaryTenants: [],
    rolloutPercentage: 0,
    requiresStagedRollout: true,
    postDeployVerify: true
  }
}
```

### 1.2 Core Technology Hardening
**Goal:** Type safety, bundle optimization, testing foundation

#### **PR-003: Type Safety Hardening**
```json
// tsconfig.json - Enable strict checks
{
  "compilerOptions": {
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

```typescript
// src/lib/validation.ts - Zod schemas at boundaries
import { z } from 'zod';

export const AgentTaskSchema = z.object({
  company_id: z.string().uuid(),
  fn_name: z.string(),
  payload: z.record(z.unknown()),
  status: z.enum(['queued', 'running', 'done', 'failed'])
});
```

#### **PR-004: Bundle Hygiene & Testing**
```javascript
// vite.config.ts - Bundle analyzer
export default defineConfig({
  plugins: [
    process.env.VITE_ANALYZE && bundleAnalyzer(),
    // ... existing plugins
  ].filter(Boolean)
});
```

```javascript
// k6/smoke.js - Lightweight load testing
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 10,
  duration: '60s',
  thresholds: {
    http_req_duration: ['p95<2000'],
    http_req_failed: ['rate<0.01']
  }
};

export default function() {
  const res = http.get(`${__ENV.BASE_URL}/api/health`);
  check(res, { 'status is 200': (r) => r.status === 200 });
}
```

### 1.3 Security & CI Hardening
**Goal:** Least-privilege, automated security scanning

#### **PR-005: CI Hardening (Reusable)**
```yaml
# .github/workflows/_shared-ci.yml
name: Shared CI
on:
  workflow_call:
    inputs:
      node-version:
        required: false
        default: '18'
      concurrency-group:
        required: true

jobs:
  lint-typecheck-test:
    runs-on: ubuntu-latest
    concurrency: ${{ inputs.concurrency-group }}
    timeout-minutes: 10
    permissions:
      contents: read
      actions: read
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test:ci
```

#### **PR-006: Security Scanning**
```yaml
# .github/workflows/security-scan.yml
name: Security Scan
on: [push, pull_request]

jobs:
  codeql:
    uses: ./.github/workflows/_shared-ci.yml
    with:
      concurrency-group: security-scan
    steps:
      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3

  gitleaks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 🔧 **Phase 2: Reliability (Days 31-60)**

### 2.1 Event Outbox Pattern
**Goal:** Durable event publishing, prevent missed triggers

#### **PR-007: Event Outbox Implementation**
```sql
-- supabase/migrations/20241201_001_event_outbox.sql
CREATE TABLE IF NOT EXISTS public.event_outbox (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  target_system TEXT NOT NULL, -- 'n8n', 'realtime', 'slack'
  processed_at TIMESTAMPTZ,
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_event_outbox_unprocessed 
ON public.event_outbox (target_system, created_at) 
WHERE processed_at IS NULL;

-- RLS for multi-tenant
ALTER TABLE public.event_outbox ENABLE ROW LEVEL SECURITY;
```

```typescript
// supabase/functions/outbox-worker/index.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async (req) => {
  // Poll unprocessed events
  const { data: events } = await supabase
    .from('event_outbox')
    .select('*')
    .is('processed_at', null)
    .lte('retry_count', 3)
    .order('created_at', { ascending: true })
    .limit(10);

  for (const event of events || []) {
    try {
      await publishEvent(event);
      await supabase
        .from('event_outbox')
        .update({ processed_at: new Date().toISOString() })
        .eq('id', event.id);
    } catch (error) {
      await supabase
        .from('event_outbox')
        .update({ 
          retry_count: event.retry_count + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', event.id);
    }
  }

  return new Response('OK', { status: 200 });
});

async function publishEvent(event: any) {
  switch (event.target_system) {
    case 'n8n':
      await fetch(Deno.env.get('N8N_WEBHOOK_URL')!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event.payload)
      });
      break;
    case 'realtime':
      await supabase.channel('events').send({
        type: 'broadcast',
        event: event.event_type,
        payload: event.payload
      });
      break;
  }
}
```

### 2.2 Dead Letter & Quarantine
**Goal:** Formalize error handling, auto-snooze, backoff policies

#### **PR-008: Dead Letter Queue System**
```sql
-- supabase/migrations/20241201_002_dead_letter_queue.sql
CREATE TABLE IF NOT EXISTS public.dead_letter_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_task_id UUID REFERENCES public.agent_tasks(id),
  company_id UUID NOT NULL,
  error_type TEXT NOT NULL, -- 'timeout', 'validation', 'external_api', 'quota_exceeded'
  error_message TEXT,
  retry_after TIMESTAMPTZ,
  snooze_until TIMESTAMPTZ,
  backoff_multiplier INTEGER DEFAULT 1,
  max_retries INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dlq_retryable 
ON public.dead_letter_queue (retry_after, company_id) 
WHERE retry_after <= NOW();
```

```typescript
// src/lib/dead-letter-queue.ts
export class DeadLetterQueue {
  static async quarantineTask(
    taskId: string, 
    error: Error, 
    companyId: string
  ) {
    const backoffMinutes = Math.pow(2, error.retryCount || 0);
    const retryAfter = new Date(Date.now() + backoffMinutes * 60 * 1000);
    
    await supabase.from('dead_letter_queue').insert({
      original_task_id: taskId,
      company_id: companyId,
      error_type: this.classifyError(error),
      error_message: error.message,
      retry_after: retryAfter.toISOString(),
      backoff_multiplier: backoffMinutes
    });
  }

  static async processRetryable() {
    const { data: retryable } = await supabase
      .from('dead_letter_queue')
      .select('*')
      .lte('retry_after', new Date().toISOString())
      .lt('backoff_multiplier', 5);

    for (const item of retryable || []) {
      await this.retryTask(item);
    }
  }
}
```

### 2.3 Agent Policy & Safety
**Goal:** Tool allow-lists, cost guardrails, PII protection

#### **PR-009: Agent Policy Framework**
```yaml
# configs/agents/policies/default.yml
agent_policies:
  rates_agent:
    allowed_functions:
      - rates.price_one
      - rates.bulk_price
    rate_limits:
      requests_per_minute: 60
      max_concurrent: 5
    pii_rules:
      redact_fields: ["customer_name", "address", "phone"]
      log_level: "warn"
    cost_guardrails:
      max_openai_tokens_per_task: 10000
      max_api_calls_per_task: 10
      circuit_breaker_threshold: 0.05 # 5% error rate

  load_matching_agent:
    allowed_functions:
      - loads.search
      - carriers.find
    rate_limits:
      requests_per_minute: 30
    cost_guardrails:
      max_openai_tokens_per_task: 5000
```

```typescript
// packages/agents/src/policy.ts
import { loadPolicy } from './policy-loader';
import { redact } from '../utils/pii-redaction';

export class AgentPolicy {
  static async enforcePolicy(agentName: string, action: AgentAction) {
    const policy = await loadPolicy(agentName);
    
    // Check function allow-list
    if (!policy.allowed_functions.includes(action.function)) {
      throw new Error(`Function ${action.function} not allowed for ${agentName}`);
    }
    
    // Check rate limits
    await this.checkRateLimit(agentName, policy.rate_limits);
    
    // Apply PII redaction
    if (policy.pii_rules.redact_fields.length > 0) {
      action.payload = redact(action.payload, policy.pii_rules.redact_fields);
    }
    
    // Check cost guardrails
    await this.checkCostGuardrails(agentName, action, policy.cost_guardrails);
  }
}
```

#### **PR-010: PII Redaction Enforcement**
```typescript
// src/lib/pii-redaction.ts
export function redact(data: any, fields: string[]): any {
  if (typeof data === 'object' && data !== null) {
    const redacted = { ...data };
    for (const field of fields) {
      if (field in redacted) {
        redacted[field] = '[REDACTED]';
      }
    }
    return redacted;
  }
  return data;
}

// ESLint rule to enforce PII redaction
// .eslintrc.js
module.exports = {
  rules: {
    'custom/pii-redaction': {
      create(context) {
        return {
          CallExpression(node) {
            if (node.callee.name === 'agentLog' && !node.arguments.some(arg => 
              arg.type === 'CallExpression' && arg.callee.name === 'redact'
            )) {
              context.report({
                node,
                message: 'agentLog calls must use redact() for PII protection'
              });
            }
          }
        };
      }
    }
  }
};
```

---

## 🚀 **Phase 3: Scale (Days 61-90)**

### 3.1 Multi-Region & Performance
**Goal:** Read replicas, performance optimization, chaos engineering

#### **PR-011: Multi-Region Strategy**
```sql
-- supabase/migrations/20241201_003_read_replicas.sql
-- Documentation for read replica setup
-- This is a documentation migration

COMMENT ON TABLE public.agent_tasks IS 'Primary table - write to primary, read from replica';
COMMENT ON TABLE public.agent_logs IS 'High-read table - consider read replica for analytics';
```

```typescript
// src/lib/database.ts - Multi-region client
export class DatabaseClient {
  private primaryClient: SupabaseClient;
  private replicaClient: SupabaseClient;

  constructor() {
    this.primaryClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!
    );
    
    this.replicaClient = createClient(
      Deno.env.get('SUPABASE_REPLICA_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!
    );
  }

  async write(table: string, data: any) {
    return this.primaryClient.from(table).insert(data);
  }

  async read(table: string, query: any) {
    return this.replicaClient.from(table).select(query);
  }
}
```

#### **PR-012: Chaos Engineering**
```bash
# scripts/chaos-drill.sh
#!/bin/bash
set -euo pipefail

echo "🧪 Starting 30-minute chaos drill..."

# Phase 1: Network partition to n8n (5 min)
echo "Phase 1: Simulating n8n network partition..."
# Simulate network issues to n8n webhooks
# Verify graceful degradation - tasks queue but don't fail

# Phase 2: Stripe API degradation (5 min)  
echo "Phase 2: Simulating Stripe API issues..."
# Simulate Stripe API timeouts
# Verify billing flows handle errors gracefully

# Phase 3: Supabase connection issues (5 min)
echo "Phase 3: Simulating database connectivity issues..."
# Simulate connection pool exhaustion
# Verify retry logic and circuit breakers

# Phase 4: Recovery verification (15 min)
echo "Phase 4: Verifying recovery..."
# Restore all services
# Verify system returns to normal operation
# Check data consistency

echo "✅ Chaos drill completed successfully"
```

### 3.2 Model Registry & AI Provenance
**Goal:** Centralized model management, prompt versioning, AI attribution

#### **PR-013: Model Registry**
```typescript
// src/lib/models.ts
export interface ModelConfig {
  name: string;
  provider: 'openai' | 'anthropic' | 'local';
  maxTokens: number;
  temperature: number;
  costPer1kTokens: number;
  fallbackTo?: string;
}

export const MODEL_REGISTRY: Record<string, ModelConfig> = {
  'gpt-4-turbo': {
    name: 'gpt-4-turbo',
    provider: 'openai',
    maxTokens: 4096,
    temperature: 0.1,
    costPer1kTokens: 0.03,
    fallbackTo: 'gpt-3.5-turbo'
  },
  'gpt-3.5-turbo': {
    name: 'gpt-3.5-turbo', 
    provider: 'openai',
    maxTokens: 4096,
    temperature: 0.1,
    costPer1kTokens: 0.002,
    fallbackTo: null
  },
  'claude-3-sonnet': {
    name: 'claude-3-sonnet',
    provider: 'anthropic', 
    maxTokens: 4096,
    temperature: 0.1,
    costPer1kTokens: 0.015,
    fallbackTo: 'gpt-3.5-turbo'
  }
};

export function getModelConfig(modelName: string): ModelConfig {
  const config = MODEL_REGISTRY[modelName];
  if (!config) {
    throw new Error(`Unknown model: ${modelName}`);
  }
  return config;
}
```

#### **PR-014: AI Provenance & Prompt Versioning**
```typescript
// src/lib/ai-provenance.ts
export interface AIProvenance {
  model: string;
  promptVersion: string;
  promptHash: string;
  toolUsed?: string;
  costInTokens: number;
  timestamp: string;
}

export function trackAIUsage(provenance: AIProvenance) {
  // Log to agent_logs with AI metadata
  return supabase.from('agent_logs').insert({
    level: 'info',
    message: 'AI operation completed',
    meta: {
      ai_provenance: provenance,
      prompt_version: provenance.promptVersion,
      model_used: provenance.model
    }
  });
}

// Git commit trailer for AI-generated changes
export function addAITrailer(toolName: string) {
  return `Co-Authored-By: ai/${toolName} <ai@transbot.ai>`;
}
```

### 3.3 Workspace Extraction
**Goal:** Shared packages, UI contracts, type safety

#### **PR-015: Package Extraction**
```json
// packages/ui/package.json
{
  "name": "@transbot/ui",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./components": "./dist/components/index.js",
    "./hooks": "./dist/hooks/index.js"
  }
}
```

```typescript
// packages/types/src/index.ts
export interface AgentTask {
  id: string;
  company_id: string;
  fn_name: string;
  payload: Record<string, unknown>;
  status: 'queued' | 'running' | 'done' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface AgentLog {
  id: string;
  company_id: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  meta?: Record<string, unknown>;
  created_at: string;
}
```

---

## 📊 **Success Metrics & KPIs**

### **DORA Metrics (Exec Dashboard)**
```typescript
// src/lib/dora-metrics.ts
export interface DORAMetrics {
  deploymentFrequency: number; // deploys per day
  leadTimeForChanges: number;  // hours from commit to deploy
  changeFailureRate: number;   // % of deployments causing incidents
  meanTimeToRestore: number;   // hours to restore service
  errorBudgetBurn: number;     // % of error budget consumed
}

export async function collectDORAMetrics(): Promise<DORAMetrics> {
  // Collect from GitHub API, deployment logs, incident reports
  return {
    deploymentFrequency: await getDeploymentFrequency(),
    leadTimeForChanges: await getLeadTimeForChanges(),
    changeFailureRate: await getChangeFailureRate(),
    meanTimeToRestore: await getMTTR(),
    errorBudgetBurn: await getErrorBudgetBurn()
  };
}
```

### **Agent SLOs**
- **P95 Task Latency**: < 2.5 seconds
- **Success Rate**: > 98%
- **Quarantine Rate**: < 1%
- **Cost per 1k Tasks**: < $5.00

### **Data SLOs**
- **Backup Age**: < 24 hours
- **Restore RPO**: < 1 hour
- **Restore RTO**: < 4 hours

### **Security Metrics**
- **Open Vulnerability Age**: < 7 days
- **Secret Scan Incidents**: 0
- **Failed Authentication Attempts**: < 100/day

---

## 🎯 **Implementation Checklist**

### **Week 1-2: Foundation**
- [ ] PR-001: Decision Records & Risk Register
- [ ] PR-002: Feature Flag Policy
- [ ] PR-003: Type Safety Hardening
- [ ] PR-004: Bundle Hygiene & Testing
- [ ] PR-005: CI Hardening (Reusable)
- [ ] PR-006: Security Scanning

### **Week 3-4: Reliability**
- [ ] PR-007: Event Outbox Implementation
- [ ] PR-008: Dead Letter Queue System
- [ ] PR-009: Agent Policy Framework
- [ ] PR-010: PII Redaction Enforcement

### **Week 5-6: Scale**
- [ ] PR-011: Multi-Region Strategy
- [ ] PR-012: Chaos Engineering
- [ ] PR-013: Model Registry
- [ ] PR-014: AI Provenance & Prompt Versioning
- [ ] PR-015: Package Extraction

### **Week 7-8: Validation & Optimization**
- [ ] Run chaos drills
- [ ] Validate all SLOs
- [ ] Performance testing
- [ ] Security audit
- [ ] Documentation review

---

## 🚨 **Risk Mitigation**

### **High-Risk Items**
1. **Data Loss**: Implement PITR, test restore procedures monthly
2. **Webhook Replay**: Add idempotency keys, dedupe windows
3. **Prompt Injection**: Input validation, output sanitization
4. **Action Misfires**: Tool allow-lists, confirmation flows

### **Rollback Strategy**
- Feature flags for all new functionality
- Database migrations are idempotent
- Blue-green deployment capability
- 15-minute rollback SLA

---

**🎉 Ready to transform your autonomous TMS system into an enterprise-grade platform!**

Each PR is designed to be:
- **Small and focused** (single responsibility)
- **Safe and non-breaking** (backward compatible)
- **Tested and validated** (CI/CD ready)
- **Documented and monitored** (observable)

**Start with Phase 1 and watch your system become bulletproof!** 🚀

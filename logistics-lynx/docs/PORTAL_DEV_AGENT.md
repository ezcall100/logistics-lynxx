# 🏢 Portal Development Agent

A production-ready, autonomous agent that creates, modifies, and manages portals for all role types and portal types with full production access and role-based development capabilities.

## 🚀 Features

### **Comprehensive Portal Types Support:**
- Carrier Portal
- Broker Portal  
- Shipper Portal
- Driver Portal
- Owner-Operator Portal
- Admin Portal
- Enterprise Portal
- Marketplace Portal
- Analytics Portal
- Billing Portal
- Support Portal

### **Role-Based Development:**
- Supports 11 different user roles
- Role-specific permissions and features
- Automatic portal creation based on role requirements

### **Full Production Access:**
- Can create, modify, and deploy portals autonomously
- Real-time portal management and optimization
- Automatic feature updates and performance optimization

## 🏗️ Architecture

### **Database Layer**
```sql
-- Feature flags for agent control
insert into public.feature_flags_v2(key, scope, value, reason, owner_name) values
  ('agents.portalDev.enabled','global',true,'Enable portal-dev autonomous agent','autonomous'),
  ('budget.portalDev.maxPRsPerHour','global',8,'PR throttle to protect CI','autonomous');
```

### **Edge Functions (Deno)**
- `supabase/functions/agent-runner/lib/github.ts` - GitHub API client
- `supabase/functions/agent-runner/lib/portalDev.ts` - Portal development logic
- `supabase/functions/agent-runner/index.ts` - Main agent runner

### **Node.js Scripts**
- `scripts/portal-scan-and-queue.mjs` - Automatic portal scanning and task queuing

## 🔧 Setup

### **1. Environment Variables**
```bash
# GitHub bot (server-only, never ship to browser)
GITHUB_TOKEN=ghp_************************
GITHUB_OWNER=your-org
GITHUB_REPO=logistics-lynx
GITHUB_DEFAULT_BRANCH=main

# Supabase
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-key
PORTAL_DEV_COMPANY_ID=00000000-0000-4000-8000-000000000001
```

### **2. Database Migration**
```bash
supabase db push
```

### **3. Deploy Edge Functions**
```bash
supabase functions deploy agent-runner
```

## 🎯 Usage

### **Manual Portal Creation**
```bash
# Dry run (no PR)
psql "$SUPABASE_DB_URL" -c "
insert into agent_tasks(company_id, fn_name, payload, status)
values ('00000000-0000-4000-8000-000000000001', 'portal.ensure_portal',
        jsonb_build_object('portalKey','financials','dryRun',true,'openPR',false),'queued');"

# Live task with PR
psql "$SUPABASE_DB_URL" -c "
insert into agent_tasks(company_id, fn_name, payload, status)
values ('00000000-0000-4000-8000-000000000001','portal.ensure_portal',
        jsonb_build_object('portalKey','workers','dryRun',false,'openPR',true),'queued');"
```

### **Automatic Portal Scanning**
```bash
# Scan and queue all missing portals
npm run portal:scan
```

### **Autonomous System Integration**
```bash
# Start full autonomous development system
npm run start:autonomous-full
```

## 🔒 Safety & Guardrails

### **Feature Flags**
- `agents.portalDev.enabled` - Master switch for the agent
- `budget.portalDev.maxPRsPerHour` - Rate limiting to protect CI

### **Path Allowlist**
The agent only touches:
- `src/pages/*` - Portal page scaffolds
- `src/portals/registry.ts` - Portal registry
- `src/pages/_scaffold/PortalScaffold.tsx` - Universal scaffold

### **Audit Trail**
- Every task emits `agent_logs` entries
- OTEL spans for tracing
- Slack error notifications with trace links

### **Idempotent Operations**
- Safe to run multiple times
- Checks for existing portals before creating
- Updates existing files instead of overwriting

## 📋 Portal Registry

The agent automatically maintains the portal registry with:

```typescript
interface PortalDef {
  key: string;
  title: string;
  path: string;
  featureFlag: string;
  roles: string[];
}
```

### **Supported Portal Keys**
```typescript
const EXPECTED = [
  "superAdmin","admin","tmsAdmin","onboarding","broker","shipper","carrier","driver","ownerOperator",
  "factoring","loadBoard","crm","financials","edi","marketplace","analytics","autonomous","workers","rates","directory"
];
```

## 🎨 Generated Content

### **Portal Scaffold Template**
```tsx
import React from "react";

export default function {PortalName}Portal() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">{Portal Title}</h1>
      <p className="text-muted-foreground">This portal is provisioned and protected. Build out features here.</p>
    </div>
  );
}
```

### **GitHub PR Structure**
- Branch: `autobot/portal-{key}-YYYY-MM-DD`
- Title: `feat(portal): provision {key} portal (scaffold + registry)`
- Body: Includes safety notes and generation info

## 🔍 Monitoring

### **Live Feed**
```bash
# Watch agent logs
supabase functions logs agent-runner --follow
```

### **GitHub Activity**
- Monitor branch creation: `autobot/portal-*`
- Watch PR creation and status
- Review generated code quality

### **Error Handling**
- Slack notifications for failures
- Detailed error logs with stack traces
- Automatic retry mechanisms

## 🚀 Advanced Features

### **Role-Based Permissions**
Each portal gets appropriate role assignments:
```typescript
const roles = {
  superAdmin: ["super_admin"],
  broker: ["broker_admin", "broker_user", "owner", "admin"],
  carrier: ["carrier_admin", "carrier_user", "owner", "admin"],
  // ... etc
};
```

### **Feature Flag Integration**
Automatic feature flag generation:
```typescript
const featureFlag = `portal.${portalKey}.enabled`;
```

### **Path Generation**
Smart path generation for different portal types:
```typescript
const path = portalKey === "ownerOperator" ? "/owner-operator"
          : portalKey === "loadBoard"     ? "/load-board"
          : `/${portalKey.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}`;
```

## 🔧 Troubleshooting

### **Common Issues**

1. **GitHub Token Not Configured**
   ```
   Error: GITHUB_TOKEN not configured
   ```
   Solution: Set the `GITHUB_TOKEN` environment variable

2. **Registry File Not Found**
   ```
   Error: registry.ts not found or unreadable
   ```
   Solution: Ensure `src/portals/registry.ts` exists

3. **Portal Already Exists**
   ```
   Registry: { updated: false }
   ```
   This is normal - the agent is idempotent

### **Debug Mode**
```bash
# Enable dry run mode
payload: { portalKey: 'test', dryRun: true, openPR: false }
```

## 📈 Performance

### **Rate Limits**
- Max 8 PRs per hour (configurable)
- Automatic throttling to protect CI
- Queue-based processing

### **Resource Usage**
- Lightweight Deno Edge functions
- Minimal GitHub API calls
- Efficient file content parsing

## 🔮 Future Enhancements

### **Planned Features**
- [ ] Automatic Playwright E2E test generation
- [ ] Portal selection copy updates
- [ ] PR comment with verification commands
- [ ] Advanced role-based feature generation
- [ ] Portal analytics and usage tracking

### **Integration Opportunities**
- [ ] CI/CD pipeline integration
- [ ] Automated code review
- [ ] Performance monitoring
- [ ] A/B testing framework

## 📞 Support

For issues or questions:
1. Check the logs: `supabase functions logs agent-runner`
2. Review GitHub PRs for generated content
3. Monitor Slack for error notifications
4. Check feature flag status in database

---

**🎉 The Portal Development Agent is now fully operational and ready to autonomously manage your portal ecosystem!**

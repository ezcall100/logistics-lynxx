# PR-101: Hierarchical Feature Flags (+ audit) - Deployment Guide

## 🚀 **Deployment Steps**

### **1. Run Migration**
```bash
# Deploy the migration
supabase db push

# Verify migration applied
psql "$SUPABASE_DB_URL" -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'feature_flags%';"
```

### **2. Post-Deploy Verification**

#### **Check Migration Success**
```sql
-- Verify tables created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('feature_flags_v2', 'feature_flags_audit');

-- Verify enum created
SELECT typname FROM pg_type WHERE typname = 'flag_scope';

-- Verify indexes created
SELECT indexname FROM pg_indexes 
WHERE tablename = 'feature_flags_v2' AND schemaname = 'public';
```

#### **Test Resolver Function**
```sql
-- Test global flag resolution
SELECT * FROM public.resolve_feature_flag(null, 'production', 'agents.autonomousProcessing');

-- Expected: should return the seeded flag
-- key: 'agents.autonomousProcessing'
-- value: true
-- resolved_scope: 'global'
```

#### **Verify Audit Trigger**
```sql
-- Insert a test flag
INSERT INTO public.feature_flags_v2(key, scope, value, reason, owner_name)
VALUES ('test.audit', 'global', true, 'testing audit', 'deployment-test');

-- Check audit log
SELECT key, action, actor_email, created_at 
FROM public.feature_flags_audit 
WHERE key = 'test.audit' 
ORDER BY created_at DESC;

-- Clean up test
DELETE FROM public.feature_flags_v2 WHERE key = 'test.audit';
```

### **3. UI Verification**

#### **Access Super-Admin UI**
1. Navigate to `/super-admin/flags`
2. Verify the page loads without errors
3. Check that the seeded flag `agents.autonomousProcessing` appears

#### **Test Flag Creation**
1. Create a new flag:
   - **Key**: `test.new.flag`
   - **Scope**: `global`
   - **Value**: `true`
   - **Reason**: `testing new flag creation`
   - **Owner Name**: `your-email@company.com`

2. Verify the flag appears in the table
3. Check audit log for the creation event

## 🔧 **Usage Examples**

### **Edge Function Usage**
```typescript
// Inside any Deno Edge function handler
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

async function isEnabled(companyId: string, key: string) {
  const env = Deno.env.get("APP_ENV") ?? "production";
  const { data } = await supa.rpc("resolve_feature_flag", { 
    _company: companyId, 
    _env: env, 
    _key: key 
  });
  return !!data?.[0]?.value;
}

// Usage
const autonomousEnabled = await isEnabled(companyId, "agents.autonomousProcessing");
if (autonomousEnabled) {
  // Execute autonomous logic
}
```

### **Frontend Usage**
```tsx
// Gating UI components
import { useFlag } from "@/hooks/useFlag";

function AutonomousButton({ companyId }: { companyId: string }) {
  const { value: autonomousOn } = useFlag(
    companyId, 
    import.meta.env.VITE_APP_ENV ?? "production",
    "agents.autonomousProcessing", 
    false
  );

  return autonomousOn ? <AutonomousButton /> : null;
}

// Conditional feature rendering
function FeatureGate({ children, flagKey, companyId }: { 
  children: React.ReactNode; 
  flagKey: string; 
  companyId: string; 
}) {
  const { value, loading } = useFlag(
    companyId,
    import.meta.env.VITE_APP_ENV ?? "production",
    flagKey,
    false
  );

  if (loading) return <div>Loading...</div>;
  return value ? <>{children}</> : null;
}
```

### **Direct API Usage**
```typescript
// Using the resolver client directly
import { flagOn } from "@/lib/flags";

async function checkFeature(companyId: string, flagKey: string) {
  const enabled = await flagOn(
    companyId,
    import.meta.env.VITE_APP_ENV ?? "production",
    flagKey,
    false // default value
  );
  
  return enabled;
}
```

## 🎛️ **Flag Hierarchy Examples**

### **Global → Env → Tenant Priority**
```sql
-- 1. Global flag (lowest priority)
INSERT INTO public.feature_flags_v2(key, scope, value, reason)
VALUES ('new.feature', 'global', false, 'disabled globally');

-- 2. Environment-specific override (higher priority)
INSERT INTO public.feature_flags_v2(key, scope, env, value, reason)
VALUES ('new.feature', 'env', 'staging', true, 'enabled in staging');

-- 3. Tenant-specific override (highest priority)
INSERT INTO public.feature_flags_v2(key, scope, company_id, value, reason)
VALUES ('new.feature', 'tenant', 'canary-company-id', true, 'enabled for canary');
```

### **Resolution Order**
1. **Tenant + Environment**: `tenant` scope with matching `company_id` and `env`
2. **Tenant (any env)**: `tenant` scope with matching `company_id`, no `env`
3. **Environment**: `env` scope with matching `env`
4. **Global**: `global` scope (fallback)

## 📊 **Monitoring & Audit**

### **View Effective Flags**
```sql
-- See all effective flags for current environment
SELECT * FROM public.v_feature_flags_effective;

-- Check audit trail for specific flag
SELECT 
  key,
  action,
  actor_email,
  reason,
  created_at,
  CASE 
    WHEN action = 'update' THEN 
      jsonb_pretty(old_row) || ' → ' || jsonb_pretty(new_row)
    ELSE jsonb_pretty(new_row)
  END as changes
FROM public.feature_flags_audit 
WHERE key = 'agents.autonomousProcessing'
ORDER BY created_at DESC;
```

### **Expiring Flags Alert**
```sql
-- Find flags expiring in next 7 days
SELECT 
  key,
  scope,
  expires_at,
  owner_name,
  reason
FROM public.feature_flags_v2 
WHERE expires_at IS NOT NULL 
  AND expires_at BETWEEN NOW() AND NOW() + INTERVAL '7 days'
ORDER BY expires_at ASC;
```

## 🔒 **Security Notes**

- **RLS Enabled**: Client writes are disabled by default
- **Service Role Required**: Use service role for programmatic flag changes
- **Audit Trail**: All changes are logged with actor and reason
- **Tenant Isolation**: Users can only see tenant-scoped flags for their company

## 🚨 **Troubleshooting**

### **Common Issues**

1. **Flag not resolving**: Check hierarchy order and expiration dates
2. **Permission denied**: Ensure using service role for writes
3. **Cache issues**: Clear browser cache or wait 10 seconds for TTL
4. **UI not loading**: Check RLS policies and user authentication

### **Debug Queries**
```sql
-- Check flag existence
SELECT * FROM public.feature_flags_v2 WHERE key = 'your.flag.key';

-- Test resolution
SELECT * FROM public.resolve_feature_flag('company-id', 'production', 'your.flag.key');

-- Check audit trail
SELECT * FROM public.feature_flags_audit WHERE key = 'your.flag.key' ORDER BY created_at DESC;
```

## ✅ **Success Criteria**

- [ ] Migration runs without errors
- [ ] Resolver function returns expected results
- [ ] Audit trigger captures changes
- [ ] Super-admin UI loads and functions
- [ ] Flag hierarchy resolves correctly
- [ ] RLS policies work as expected

---

**Next Steps**: Ready for PR-102 (timestamped request signing) to complete the security hardening! 🚀

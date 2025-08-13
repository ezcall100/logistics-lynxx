# PR-102: Timestamped Request Signing (v2) - Deployment Guide

## 🚀 **Deployment Steps**

### **1. Run Migration**
```bash
# Deploy the migration
supabase db push

# Verify migration applied
psql "$SUPABASE_DB_URL" -c "SELECT table_name FROM information_schema.tables WHERE table_name = 'api_signing_nonces';"
```

### **2. Deploy Edge Functions**
```bash
# Deploy the shared signing helper
supabase functions deploy _shared

# Deploy updated DLQ replay function
supabase functions deploy dlq-replay
```

### **3. Set Environment Variables**
```bash
# Required for signing verification
export TRANSBOT_HMAC_SECRET="your-super-secret-64-char-key"

# Optional: Enable v2 signing requirement via feature flag
psql "$SUPABASE_DB_URL" -c "
INSERT INTO public.feature_flags_v2(key, scope, value, reason, owner_name)
VALUES ('security.signingV2Required', 'global', false, 'Enable v2 signing requirement', 'deployment')
ON CONFLICT (key, scope) DO UPDATE SET value = false;
"
```

## 🧪 **Verification Tests**

### **1. Test Signature Generation**
```bash
# Generate a v2 signature
export TRANSBOT_HMAC_SECRET="your-secret-key"
HDR=$(npx ts-node logistics-lynx/scripts/sign-v2.ts \
  -m POST \
  -u "https://your-project.supabase.co/functions/v1/dlq-replay" \
  -k ops-n8n \
  -s "$TRANSBOT_HMAC_SECRET" \
  -d '{"company_id":"00000000-0000-4000-8000-000000000001","max":5}')

echo "Generated signature: $HDR"
```

### **2. Test Valid Request**
```bash
# Make a signed request
curl -sS -X POST \
  -H "Content-Type: application/json" \
  -H "X-Transbot-Company: 00000000-0000-4000-8000-000000000001" \
  -H "X-Transbot-Signature: $HDR" \
  -d '{"company_id":"00000000-0000-4000-8000-000000000001","max":5}' \
  "https://your-project.supabase.co/functions/v1/dlq-replay"

# Expected: 200 OK with replay results
```

### **3. Test Replay Protection**
```bash
# Replay the exact same request
curl -sS -X POST \
  -H "Content-Type: application/json" \
  -H "X-Transbot-Company: 00000000-0000-4000-8000-000000000001" \
  -H "X-Transbot-Signature: $HDR" \
  -d '{"company_id":"00000000-0000-4000-8000-000000000001","max":5}' \
  "https://your-project.supabase.co/functions/v1/dlq-replay"

# Expected: 401 with "replay_detected" error
```

### **4. Test Clock Skew Protection**
```bash
# Generate signature with old timestamp (manually modify script)
# Expected: 401 with "timestamp_out_of_window" error
```

### **5. Test Invalid Signature**
```bash
# Use wrong signature
curl -sS -X POST \
  -H "Content-Type: application/json" \
  -H "X-Transbot-Company: 00000000-0000-4000-8000-000000000001" \
  -H "X-Transbot-Signature: v2 keyId=ops-n8n;ts=1734280000;nonce=invalid;sig=wrong" \
  -d '{"company_id":"00000000-0000-4000-8000-000000000001"}' \
  "https://your-project.supabase.co/functions/v1/dlq-replay"

# Expected: 401 with "bad_signature" error
```

## 🔧 **Usage Examples**

### **Edge Function Integration**
```typescript
// In any Edge function
import { verifySignedRequest } from "../_shared/signing_v2.ts";

Deno.serve(async (req) => {
  // Verify v2 signature
  const v = await verifySignedRequest(req, {
    requireFlag: "security.signingV2Required",
    companyIdHeader: "x-transbot-company",
  });
  
  if (!v.ok) {
    return new Response(JSON.stringify({ 
      error: 'Request signing verification failed', 
      reason: v.reason 
    }), { status: 401 });
  }

  // Use parsed body from verification
  const body = v.parsed;
  
  // Continue with your logic...
});
```

### **Server-Side Signing**
```typescript
// In n8n, backend services, or other trusted servers
import { signRequest } from './sign-v2';

const signature = await signRequest({
  method: 'POST',
  url: 'https://your-project.supabase.co/functions/v1/dlq-replay',
  keyId: 'ops-n8n',
  secret: process.env.TRANSBOT_HMAC_SECRET,
  body: JSON.stringify({ company_id: 'company-id', max: 25 })
});

// Use signature in request headers
const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Transbot-Signature': signature,
    'X-Transbot-Company': 'company-id'
  },
  body: JSON.stringify({ company_id: 'company-id', max: 25 })
});
```

### **Command Line Signing**
```bash
# Generate signature for immediate use
npx ts-node logistics-lynx/scripts/sign-v2.ts \
  -m POST \
  -u "https://your-project.supabase.co/functions/v1/dlq-replay" \
  -k ops-n8n \
  -s "$TRANSBOT_HMAC_SECRET" \
  -d '{"company_id":"company-id","max":25,"dry_run":true}'

# Copy the output and use in curl
```

## 🎛️ **Feature Flag Control**

### **Enable v2 Signing Requirement**
```sql
-- Enable for all tenants (global)
UPDATE public.feature_flags_v2 
SET value = true, reason = 'Enabling v2 signing requirement'
WHERE key = 'security.signingV2Required' AND scope = 'global';

-- Enable for specific environment
INSERT INTO public.feature_flags_v2(key, scope, env, value, reason)
VALUES ('security.signingV2Required', 'env', 'production', true, 'Production v2 signing')
ON CONFLICT (key, scope, env) DO UPDATE SET value = true;

-- Enable for specific tenant (canary)
INSERT INTO public.feature_flags_v2(key, scope, company_id, value, reason)
VALUES ('security.signingV2Required', 'tenant', 'canary-company-id', true, 'Canary v2 signing')
ON CONFLICT (key, scope, company_id) DO UPDATE SET value = true;
```

### **Gradual Rollout Strategy**
1. **Phase 1**: Deploy with flag disabled (backward compatible)
2. **Phase 2**: Enable for canary tenants
3. **Phase 3**: Enable for staging environment
4. **Phase 4**: Enable globally for production

## 📊 **Monitoring & Debugging**

### **Check Nonce Store**
```sql
-- View recent nonces
SELECT 
  key_id,
  nonce,
  ts,
  ip,
  user_agent
FROM public.api_signing_nonces
ORDER BY ts DESC
LIMIT 10;

-- Check for potential issues
SELECT 
  key_id,
  COUNT(*) as nonce_count,
  MIN(ts) as oldest,
  MAX(ts) as newest
FROM public.api_signing_nonces
GROUP BY key_id
ORDER BY nonce_count DESC;
```

### **Audit Log Analysis**
```sql
-- Check for signing-related audit events
SELECT 
  action,
  scope,
  target_count,
  success_count,
  failure_count,
  created_at
FROM public.audit_logs
WHERE action = 'dlq_replay'
  AND created_at >= NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

### **Feature Flag Status**
```sql
-- Check signing requirement status
SELECT 
  key,
  scope,
  env,
  company_id,
  value,
  reason
FROM public.feature_flags_v2
WHERE key = 'security.signingV2Required'
ORDER BY scope, env, company_id;
```

## 🔒 **Security Considerations**

### **Secret Management**
- **Environment Variable**: Store `TRANSBOT_HMAC_SECRET` securely
- **Rotation**: Rotate secrets periodically
- **Access Control**: Limit access to signing utilities
- **Audit**: Monitor signature generation and usage

### **Clock Synchronization**
- **Default Skew**: ±5 minutes (300 seconds)
- **Adjustment**: Modify `skewSeconds` parameter if needed
- **Monitoring**: Watch for timestamp-related failures

### **Replay Protection**
- **Nonce Storage**: 24-hour TTL with daily cleanup
- **Uniqueness**: Enforced by database constraints
- **Scope**: Per keyId to allow multiple signing keys

## 🚨 **Troubleshooting**

### **Common Issues**

1. **"missing_or_malformed_signature"**
   - Check signature format: `v2 keyId=...;ts=...;nonce=...;sig=...`
   - Verify header name: `X-Transbot-Signature`

2. **"timestamp_out_of_window"**
   - Check system clock synchronization
   - Adjust `skewSeconds` if needed
   - Verify timestamp generation in signing script

3. **"replay_detected"**
   - Expected for duplicate requests
   - Check if nonce generation is working
   - Verify nonce store is accessible

4. **"bad_signature"**
   - Verify secret key matches
   - Check canonical string format
   - Ensure body hasn't been modified

### **Debug Queries**
```sql
-- Check nonce store health
SELECT COUNT(*) as total_nonces FROM public.api_signing_nonces;

-- Check for expired nonces (should be cleaned up)
SELECT COUNT(*) as expired_nonces 
FROM public.api_signing_nonces 
WHERE ts < NOW() - INTERVAL '1 day';

-- Check feature flag resolution
SELECT * FROM public.resolve_feature_flag(
  'your-company-id', 
  'production', 
  'security.signingV2Required'
);
```

## ✅ **Success Criteria**

- [ ] Migration runs without errors
- [ ] Nonce store is accessible and working
- [ ] Signature generation produces valid headers
- [ ] Valid signatures are accepted
- [ ] Invalid signatures are rejected
- [ ] Replay protection works
- [ ] Clock skew protection works
- [ ] Feature flag controls enforcement
- [ ] Backward compatibility maintained

## 🔄 **Rollback Plan**

### **Quick Disable**
```sql
-- Disable v2 signing requirement
UPDATE public.feature_flags_v2 
SET value = false, reason = 'Rollback: disabling v2 signing'
WHERE key = 'security.signingV2Required';
```

### **Full Rollback**
```bash
# Revert Edge function to previous version
supabase functions deploy dlq-replay --no-verify-jwt

# Remove nonce table (optional - safe to keep)
# DROP TABLE public.api_signing_nonces;
```

---

**Next Steps**: Ready for PR-103 (DLQ Admin UI) to provide operational visibility and control! 🚀

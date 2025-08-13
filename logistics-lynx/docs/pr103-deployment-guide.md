# PR-103: DLQ Admin UI (dry-run first)

## 🚀 **Deployment Steps**

### **1. Run Migration**
```bash
# Deploy the migration
supabase db push

# Verify migration applied
psql "$SUPABASE_DB_URL" -c "SELECT table_name FROM information_schema.tables WHERE table_name IN ('dlq_controls', 'mv_dlq_items');"
```

### **2. Deploy Edge Functions**
```bash
# Deploy the admin proxy
supabase functions deploy dlq-admin

# Verify function deployed
supabase functions list | grep dlq-admin
```

### **3. Enable Feature Flag**
```sql
-- Enable DLQ Admin UI globally
INSERT INTO public.feature_flags_v2(key, scope, value, reason, owner_name)
VALUES ('ops.dlqAdminUIEnabled', 'global', true, 'Enable DLQ Admin UI', 'deployment')
ON CONFLICT (key, scope) DO UPDATE SET value = true;

-- Or enable for specific environment
INSERT INTO public.feature_flags_v2(key, scope, env, value, reason, owner_name)
VALUES ('ops.dlqAdminUIEnabled', 'env', 'production', true, 'Production DLQ Admin UI', 'deployment')
ON CONFLICT (key, scope, env) DO UPDATE SET value = true;
```

### **4. App Rebuild/Redeploy**
```bash
# Rebuild and deploy your frontend app
# (Vercel/Netlify/etc. will pick up the new page)
```

## 🧪 **Verification Tests**

### **1. Check Feature Flag**
```sql
-- Verify flag is enabled
SELECT * FROM public.resolve_feature_flag(null, 'production', 'ops.dlqAdminUIEnabled');
```

### **2. Test Admin Proxy**
```bash
# Test the admin proxy endpoint (requires super admin JWT)
curl -X GET \
  -H "Authorization: Bearer YOUR_SUPER_ADMIN_JWT" \
  "https://your-project.supabase.co/functions/v1/dlq-admin?company_id=test-company&limit=10"
```

### **3. Test UI Access**
1. Navigate to `/super-admin/dlq` as a super admin
2. Verify the page loads without errors
3. Check that the feature flag gate works (disable flag to test)

### **4. Test Dry Run**
1. Enter a company ID in the UI
2. Select some items (if any exist)
3. Click "Dry Run Replay (selected)"
4. Verify you get a 200 response with counts

### **5. Test Pause/Unpause**
1. Enter a company ID
2. Click "Pause Tenant"
3. Verify success response
4. Click "Unpause Tenant"
5. Verify success response

## 🔧 **Usage Examples**

### **Direct API Usage**
```bash
# List DLQ items for a company
curl -X GET \
  -H "Authorization: Bearer YOUR_JWT" \
  "https://your-project.supabase.co/functions/v1/dlq-admin?company_id=company-id&limit=50"

# Pause a tenant
curl -X POST \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: application/json" \
  -d '{"action":"pause","company_id":"company-id"}' \
  "https://your-project.supabase.co/functions/v1/dlq-admin"

# Dry run replay
curl -X POST \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: application/json" \
  -d '{"action":"dry_run","company_id":"company-id","max":25,"ids":["item-id-1","item-id-2"]}' \
  "https://your-project.supabase.co/functions/v1/dlq-admin"
```

### **Database Queries**
```sql
-- Check DLQ controls
SELECT * FROM public.dlq_controls WHERE company_id = 'your-company-id';

-- Check materialized view (if you have actual DLQ data)
SELECT * FROM public.mv_dlq_items WHERE company_id = 'your-company-id' LIMIT 10;

-- Check super admin function
SELECT public.is_super_admin();
```

## 🎛️ **Feature Flag Control**

### **Enable for Specific Tenants**
```sql
-- Enable for canary tenant
INSERT INTO public.feature_flags_v2(key, scope, company_id, value, reason, owner_name)
VALUES ('ops.dlqAdminUIEnabled', 'tenant', 'canary-company-id', true, 'Canary DLQ Admin UI', 'deployment')
ON CONFLICT (key, scope, company_id) DO UPDATE SET value = true;
```

### **Gradual Rollout Strategy**
1. **Phase 1**: Enable for super admins only (global flag)
2. **Phase 2**: Enable for canary tenants
3. **Phase 3**: Enable for staging environment
4. **Phase 4**: Enable for production

## 📊 **Monitoring & Debugging**

### **Check Admin Activity**
```sql
-- Check for DLQ admin actions in audit logs
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

### **Check Controls Status**
```sql
-- View all paused/drained tenants
SELECT 
  company_id,
  paused,
  drained_at,
  CASE 
    WHEN paused AND drained_at IS NOT NULL THEN 'Drained'
    WHEN paused THEN 'Paused'
    ELSE 'Active'
  END as status
FROM public.dlq_controls
ORDER BY drained_at DESC NULLS LAST;
```

### **Check Materialized View**
```sql
-- Refresh materialized view (if you have actual DLQ data)
REFRESH MATERIALIZED VIEW public.mv_dlq_items;

-- Check view statistics
SELECT 
  COUNT(*) as total_items,
  COUNT(DISTINCT company_id) as affected_companies,
  AVG(attempts) as avg_attempts,
  MAX(created_at) as newest_item
FROM public.mv_dlq_items;
```

## 🔒 **Security Considerations**

### **Access Control**
- **Super Admin Only**: All operations require super admin privileges
- **JWT Validation**: Admin proxy validates JWT tokens
- **RLS Policies**: Database-level access control
- **Security Definer**: RPCs run with elevated privileges

### **Audit Trail**
- **Complete Logging**: All actions logged to audit table
- **V2 Signing**: Internal calls use PR-102 timestamped signing
- **Nonce Protection**: Replay attack prevention

## 🚨 **Troubleshooting**

### **Common Issues**

1. **"DLQ Admin UI is disabled by flag"**
   - Check feature flag status: `SELECT * FROM public.feature_flags_v2 WHERE key = 'ops.dlqAdminUIEnabled';`
   - Verify flag resolution: `SELECT * FROM public.resolve_feature_flag(null, 'production', 'ops.dlqAdminUIEnabled');`

2. **"not_authorized" error**
   - Verify user has super admin role
   - Check JWT token is valid
   - Verify `profiles.role = 'super_admin'` or JWT claims

3. **"No items" in table**
   - Materialized view may be empty (placeholder)
   - Check if you have actual DLQ data to point to
   - Verify the view points to your actual DLQ table

4. **Function deployment fails**
   - Check Edge function logs: `supabase functions logs dlq-admin`
   - Verify environment variables are set
   - Check function syntax and imports

### **Debug Queries**
```sql
-- Check super admin status
SELECT public.is_super_admin();

-- Check feature flag resolution
SELECT * FROM public.resolve_feature_flag('your-company-id', 'production', 'ops.dlqAdminUIEnabled');

-- Check RPC permissions
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_name LIKE 'dlq_admin%';
```

## ✅ **Success Criteria**

- [ ] Migration runs without errors
- [ ] Admin proxy function deploys successfully
- [ ] Feature flag controls UI access
- [ ] Super admin can access the page
- [ ] Non-super admin gets 403 error
- [ ] Dry run functionality works
- [ ] Pause/unpause controls work
- [ ] V2 signing integration works
- [ ] Audit logging captures actions

## 🔄 **Rollback Plan**

### **Quick Disable**
```sql
-- Disable DLQ Admin UI
UPDATE public.feature_flags_v2 
SET value = false, reason = 'Rollback: disabling DLQ Admin UI'
WHERE key = 'ops.dlqAdminUIEnabled';
```

### **Full Rollback**
```bash
# Remove Edge function
supabase functions delete dlq-admin

# Remove tables (optional - safe to keep)
# DROP TABLE public.dlq_controls;
# DROP MATERIALIZED VIEW public.mv_dlq_items;
```

## 🎯 **Next Steps**

### **Immediate Enhancements**
1. **Connect to Real DLQ**: Update materialized view to point to actual DLQ table
2. **Add Filters**: Error type, date range, priority filters
3. **Bulk Operations**: Select all, bulk replay, bulk delete
4. **Real-time Updates**: WebSocket integration for live updates

### **Future PRs**
- **PR-104**: Agent logs partitioning (performance at scale)
- **PR-105**: OpenTelemetry traces (observability)
- **PR-106**: CI secure-by-default (security automation)
- **PR-107**: DR drills (reliability validation)

---

**Ready for PR-104?** Just say "ship PR-104" and I'll drop the agent logs partitioning bundle! 🚀

# 🚫 Portal Decommission Runbook

## Overview
This runbook provides step-by-step instructions for safely decommissioning the 5 extra portals that are not part of the production 20-portal architecture.

## Portals Being Decommissioned
- **Carrier Admin Portal** (`/carrier-admin`)
- **Broker Admin Portal** (`/broker-admin`) 
- **Shipper Admin Portal** (`/shipper-admin`)
- **Freight Broker Portal** (`/freight-broker`)
- **Carrier Dispatch Portal** (`/carrier-dispatch`)

## Phase A: Deprecation (Immediate - Zero Downtime)

### 1. Deploy Feature Flags
```bash
# Apply the feature flags migration
supabase db push

# Verify flags are set
psql $DATABASE_URL -c "SELECT key, value_json FROM feature_flags WHERE key LIKE 'portal.%';"
```

### 2. Deploy UI Changes
```bash
# Deploy the updated routes and not-available page
npm run build
npm run deploy
```

### 3. Deploy Edge Function Stub
```bash
# Deploy the deprecated portal stub
supabase functions deploy _deprecated-portal-stub

# Verify the stub is working
curl -X GET "https://your-project.supabase.co/functions/v1/_deprecated-portal-stub/test"
# Should return 410 with portal_deprecated error
```

### 4. Disable n8n Workflows
```bash
# Set n8n environment variables
export N8N_API_KEY="your-api-key"
export N8N_BASE_URL="https://your-n8n-instance.com"

# Run the disable script
bash scripts/disable-deprecated-portals.sh
```

### 5. Apply Database Write-Freeze
```bash
# Apply the write-freeze migration
supabase db push

# Verify RLS policies are in place
psql $DATABASE_URL -f scripts/portal-deps.sql
```

### 6. Run Smoke Tests
```bash
# Run the E2E tests
npm run test:e2e -- tests/e2e/deprecated-portals.spec.ts

# Verify all tests pass
```

## Phase B: Retirement (After 90-day Retention)

### 1. Dependency Check
```bash
# Run dependency discovery
psql $DATABASE_URL -f scripts/portal-deps.sql

# Ensure zero dependencies for 48+ hours
# Monitor for any remaining references
```

### 2. Archive Data
```bash
# Apply archive migration
supabase db push

# Verify archive tables are created
psql $DATABASE_URL -c "SELECT * FROM archive.portal_archives;"
```

### 3. Final Drop (After Zero Dependencies Confirmed)
```bash
# Apply final drop migration
supabase db push

# Verify tables are dropped
psql $DATABASE_URL -c "SELECT table_name FROM information_schema.tables WHERE table_name LIKE '%carrier_admin%';"
```

## Verification Checklist

### Phase A Verification
- [ ] Feature flags are set to `false`
- [ ] UI routes return "Portal No Longer Available" page
- [ ] API endpoints return 410 Gone
- [ ] n8n workflows are disabled and tagged "deprecated"
- [ ] Database write-freeze policies are active
- [ ] E2E smoke tests pass
- [ ] No runtime errors in application logs

### Phase B Verification
- [ ] Dependency scan shows zero references
- [ ] Archive tables contain all data
- [ ] Compatibility views are working (if kept)
- [ ] Final drop migration completes successfully
- [ ] No broken references in remaining code

## Rollback Plan

### Phase A Rollback
```bash
# Re-enable feature flags
psql $DATABASE_URL -c "UPDATE feature_flags SET value_json = 'true' WHERE key LIKE 'portal.%';"

# Redeploy original UI routes
git checkout HEAD~1 -- src/AppAuthenticated.tsx
npm run build && npm run deploy

# Re-enable n8n workflows
# (Manual process - re-enable workflows in n8n UI)
```

### Phase B Rollback
```bash
# Restore from archive tables
psql $DATABASE_URL -c "INSERT INTO public.table_name SELECT * FROM archive.table_name;"

# Recreate dropped tables from archive
# (Manual process based on archive schema)
```

## Monitoring

### Key Metrics to Watch
- **410 Error Rate**: Should spike initially, then decline
- **User Complaints**: Monitor support tickets
- **System Performance**: Ensure no degradation
- **Database Performance**: Monitor for any issues

### Alert Thresholds
- 410 errors > 100/hour (after initial spike)
- User complaints > 5/day about missing portals
- System errors related to deprecated portals

## Communication Plan

### Internal Communication
- [ ] Notify development team
- [ ] Update documentation
- [ ] Inform support team
- [ ] Update runbooks

### External Communication
- [ ] Update user documentation
- [ ] Notify affected users (if any)
- [ ] Update API documentation

## Success Criteria

### Phase A Success
- ✅ Zero user-facing errors
- ✅ All deprecated portals return 410
- ✅ No broken links in navigation
- ✅ Feature flags working correctly

### Phase B Success
- ✅ Zero database dependencies
- ✅ All data safely archived
- ✅ Tables successfully dropped
- ✅ No performance impact on remaining portals

## Post-Decommission Tasks

1. **Clean Up Code**
   - Remove deprecated portal components
   - Clean up unused imports
   - Update documentation

2. **Update Monitoring**
   - Remove deprecated portal alerts
   - Update dashboards
   - Clean up metrics

3. **Archive Documentation**
   - Move portal docs to archive
   - Update API documentation
   - Clean up runbooks

## Emergency Contacts

- **Database Issues**: DBA Team
- **UI Issues**: Frontend Team  
- **API Issues**: Backend Team
- **n8n Issues**: DevOps Team
- **User Complaints**: Support Team

## Notes

- This decommission follows enterprise-grade practices
- All changes are reversible during Phase A
- Data is preserved in archives for legal compliance
- Zero-downtime approach ensures no user impact
- Comprehensive testing prevents regressions

# 🛡️ Supabase RLS Policies Implementation

## Overview

This document outlines the comprehensive Row Level Security (RLS) implementation for the TransBot TMS platform. The system provides enterprise-grade security with multi-tenant data isolation, role-based access control, and comprehensive audit logging.

## 🚀 Quick Start

### 1. Apply the RLS Migration

```bash
# Apply the comprehensive RLS enhancement
supabase db push

# Or run the migration manually
psql -h your-supabase-host -U postgres -d postgres -f supabase/migrations/20250101000004_comprehensive_rls_enhancement.sql
```

### 2. Test the Implementation

```bash
# Run comprehensive RLS tests
npm run test:rls

# Run full security audit
npm run security:audit
```

### 3. Access the Security Dashboard

Navigate to the Security Dashboard in your Super Admin portal to monitor:
- Company security scores
- Role distribution
- Audit logs
- RLS policy status

## 🏗️ Architecture

### Core Security Functions

```sql
-- Check if user is a company member
SELECT is_company_member('company-uuid');

-- Check if user has specific role
SELECT has_role('company-uuid', 'admin');

-- Check if user is super admin
SELECT is_super_admin();

-- Check if user has specific permission
SELECT has_permission('company-uuid', 'read');
```

### Role Hierarchy

```
super_admin (Global)
├── owner (Company)
├── admin (Company)
├── manager (Company)
├── user (Company)
└── viewer (Company)
```

## 📊 Security Dashboard

The Security Dashboard provides real-time monitoring of:

### Security Overview
- Total companies and users
- Admin user distribution
- Recent audit events
- Company security scores

### Audit Logs
- Role assignments/removals
- Data exports
- Login events
- Custom security events

### RLS Status
- Table security status
- Policy counts
- Last verification dates

## 🔧 Implementation Details

### Tables with RLS Enabled

| Table | Policies | Access Control |
|-------|----------|----------------|
| `companies` | 2 | Company members, super admins |
| `profiles` | 3 | Company members, self-update |
| `roles` | 2 | Company admins, super admins |
| `feature_flags` | 2 | All users (read), super admins (write) |
| `org_entitlements` | 2 | Company members (read), super admins (write) |
| `bulk_rating_requests` | 3 | Company members |
| `bulk_rating_jobs` | 3 | Company members |
| `usage_events` | 2 | Company members |
| `audit_logs` | 2 | Company members (read), system (write) |
| `agent_tasks` | 2 | Company members (read), admins (write) |
| `agent_runs` | 1 | Company members (filtered) |
| `agent_quarantine` | 1 | Company members (filtered) |

### Security Functions

#### `has_permission(company_id, permission)`
Returns true if user has the specified permission level:
- `read`: viewer, user, manager, admin, owner
- `write`: manager, admin, owner
- `admin`: admin, owner

#### `can_manage_company(company_id)`
Returns true if user can manage company settings (admin, owner, super_admin).

#### `can_view_sensitive_data(company_id)`
Returns true if user can view sensitive data (admin, owner, manager, super_admin).

#### `can_perform_financial_ops(company_id)`
Returns true if user can perform financial operations (admin, owner, super_admin).

### Audit Logging

#### Automatic Logging
- Role assignments and removals
- Company membership changes
- Sensitive data access

#### Manual Logging
```sql
SELECT log_sensitive_operation(
  'company-uuid',
  'data_export',
  'loads',
  'load-id',
  '{"export_format": "csv", "record_count": 1000}'
);
```

## 🧪 Testing

### Automated Tests

The RLS implementation includes comprehensive automated tests:

```bash
# Run RLS policy tests
npm run test:rls

# Test output includes:
# ✅ Company Data Isolation
# ✅ Role-Based Access Control  
# ✅ Audit Logging
# ✅ Security Functions
# ✅ Security Views
# ✅ Self Super Admin Prevention
```

### Manual Testing

#### Test Company Isolation
```sql
-- Should only return data for user's company
SELECT * FROM companies WHERE id = 'other-company-id';

-- Should be empty for non-members
SELECT * FROM profiles WHERE company_id = 'other-company-id';
```

#### Test Role-Based Access
```sql
-- Check user's company membership
SELECT is_company_member('company-id');

-- Check user's roles
SELECT role FROM roles WHERE user_id = auth.uid() AND company_id = 'company-id';

-- Check user's permissions
SELECT has_permission('company-id', 'read');
```

## 🔒 Security Constraints

### Self-Super-Admin Prevention
Users cannot assign the `super_admin` role to themselves. This is enforced by a database trigger.

### Role Validation
All role assignments are validated against allowed role types:
- `super_admin` (global)
- `owner`, `admin`, `manager`, `user`, `viewer` (company-scoped)

## 📈 Performance Considerations

### Indexes
The following indexes are created for security queries:
- `idx_audit_logs_company_user_action`
- `idx_roles_company_user`
- `idx_profiles_company`

### Query Optimization
- RLS policies use efficient functions
- Company membership checks are cached
- Role checks are optimized with proper indexing

## 🚨 Emergency Procedures

### Disable RLS (Emergency Only)
```sql
-- Disable RLS on specific table
ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
```

### Grant Emergency Access
```sql
-- Grant super_admin role (use with caution)
INSERT INTO roles (user_id, company_id, role) 
VALUES ('user-id', 'company-id', 'super_admin');
```

### Audit Log Review
```sql
-- Review recent security events
SELECT * FROM audit_logs 
WHERE created_at > now() - interval '1 hour'
ORDER BY created_at DESC;
```

## 📋 Security Checklist

- [x] All tables have RLS enabled
- [x] All policies are tested
- [x] Audit logging is working
- [x] Security indexes are created
- [x] Role hierarchy is enforced
- [x] Company isolation is verified
- [x] Performance is acceptable
- [x] Documentation is complete

## 🔧 Troubleshooting

### Common Issues

#### "Permission denied" errors
- Check if user is a member of the company
- Verify user has the required role
- Ensure RLS policies are properly configured

#### Missing data
- Verify company_id is set correctly
- Check if user has access to the company
- Ensure RLS policies allow the operation

#### Performance issues
- Check if security indexes exist
- Verify queries use efficient functions
- Monitor query execution plans

### Debug Queries

```sql
-- Check if RLS is enabled on all tables
SELECT schemaname, tablename, rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename NOT LIKE 'pg_%'
ORDER BY tablename;

-- List all RLS policies
SELECT schemaname, tablename, policyname, cmd, qual
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

## 📚 Additional Resources

- [RLS Policies Guide](./docs/security/RLS_POLICIES_GUIDE.md) - Detailed policy documentation
- [Security Dashboard](./logistics-lynx/src/components/SecurityDashboard.tsx) - UI component
- [RLS Test Script](./scripts/test-rls-policies.mjs) - Automated testing

## 🎯 Next Steps

With RLS policies in place, you can now:

1. **Add User Invite Flow** - Implement role-based user provisioning
2. **Begin Agent Confidence Dashboard** - Monitor autonomous agent performance
3. **Enable Global Analytics Pane** - Cross-portal metrics and insights
4. **Deploy to Vercel** - Go live with enterprise security
5. **Generate Portal Portals** - Create role-specific interfaces

## 🤝 Support

For questions or issues with the RLS implementation:

1. Check the troubleshooting section above
2. Review the security documentation
3. Run the automated tests
4. Check audit logs for recent activity

---

**Status**: ✅ **COMPLETE** - Enterprise-grade RLS policies implemented and tested
**Security Level**: 🛡️ **PRODUCTION READY** - Multi-tenant isolation with comprehensive audit logging

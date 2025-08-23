# Row Level Security (RLS) Policies Guide

## Overview

This document outlines the comprehensive Row Level Security (RLS) policies implemented across the TransBot TMS platform. These policies ensure data isolation between companies and enforce role-based access control at the database level.

## Security Architecture

### Core Principles

1. **Multi-tenant Isolation**: Data is automatically filtered by company_id
2. **Role-based Access**: Different roles have different permissions
3. **Audit Logging**: All sensitive operations are logged
4. **Defense in Depth**: Multiple layers of security validation

### Role Hierarchy

```
super_admin (Global)
├── owner (Company)
├── admin (Company)
├── manager (Company)
├── user (Company)
└── viewer (Company)
```

## Core Security Functions

### `is_company_member(company_id)`
Returns true if the authenticated user is a member of the specified company.

### `has_role(company_id, role)`
Returns true if the authenticated user has the specified role in the company.

### `is_super_admin()`
Returns true if the authenticated user has super_admin privileges.

### `has_permission(company_id, permission)`
Returns true if the user has the specified permission level:
- `read`: viewer, user, manager, admin, owner
- `write`: manager, admin, owner
- `admin`: admin, owner

## Table Security Policies

### Core Identity Tables

#### `companies`
- **View**: Company members, super admins, company admins/owners
- **Manage**: Super admins and company owners only

#### `profiles`
- **View**: Company members and super admins
- **Update**: Users can update their own profile
- **Insert**: Super admins and company admins/owners

#### `roles`
- **View**: Company members and super admins
- **Manage**: Company admins/owners and super admins
- **Audit**: All role changes are automatically logged

### Feature Management Tables

#### `feature_flags`
- **View**: All authenticated users
- **Manage**: Super admins only

#### `org_entitlements`
- **View**: Company members
- **Manage**: Super admins only

#### `plans`
- **View**: All authenticated users
- **Manage**: Super admins only

### Business Logic Tables

#### `bulk_rating_requests`
- **View**: Company members
- **Create/Update**: Company members

#### `bulk_rating_jobs`
- **View**: Company members
- **Create/Update**: Company members

#### `usage_events`
- **View**: Company members
- **Create**: Company members

#### `audit_logs`
- **View**: Company members
- **Create**: System only (automatic)

#### `billing_events`
- **View**: Company members
- **Manage**: Service role only

### Agent System Tables

#### `agent_tasks`
- **View**: Company members
- **Manage**: Company admins/owners and super admins

#### `agent_runs`
- **View**: Company members (filtered by task company)

#### `agent_quarantine`
- **View**: Company members (filtered by task company)

### Maps & Location Tables

#### `routes`
- **All Operations**: User's own routes only

#### `locations`
- **All Operations**: User's own locations only

#### `saved_places`
- **All Operations**: User's own saved places only

#### `distance_matrix_cache`
- **All Operations**: User's own cache entries only

#### `geocoding_cache`
- **All Operations**: User's own cache entries only

## Security Views

### `v_company_security_overview`
Provides a comprehensive view of company security status:
- User counts by role
- Recent audit activity
- Security metrics

**Access**: Company members and super admins

## Audit Logging

### Automatic Logging
The following operations are automatically logged:
- Role assignments and removals
- Company membership changes
- Sensitive data access

### Manual Logging
Use `log_sensitive_operation()` function to log custom events:

```sql
SELECT log_sensitive_operation(
  'company-uuid',
  'data_export',
  'loads',
  'load-id',
  '{"export_format": "csv", "record_count": 1000}'
);
```

## Security Constraints

### Self-Super-Admin Prevention
Users cannot assign the `super_admin` role to themselves. This is enforced by a database trigger.

### Role Validation
All role assignments are validated against the allowed role types:
- `super_admin` (global)
- `owner`, `admin`, `manager`, `user`, `viewer` (company-scoped)

## Performance Considerations

### Indexes
The following indexes are created for security queries:
- `idx_audit_logs_company_user_action`
- `idx_roles_company_user`
- `idx_profiles_company`

### Query Optimization
- RLS policies use efficient functions
- Company membership checks are cached
- Role checks are optimized with proper indexing

## Testing Security Policies

### Verification Queries

Check if RLS is enabled on all tables:
```sql
SELECT schemaname, tablename, rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename NOT LIKE 'pg_%'
ORDER BY tablename;
```

List all RLS policies:
```sql
SELECT schemaname, tablename, policyname, cmd, qual
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

### Testing Company Isolation
```sql
-- Should only return data for user's company
SELECT * FROM companies WHERE id = 'other-company-id';

-- Should be empty for non-members
SELECT * FROM profiles WHERE company_id = 'other-company-id';
```

## Best Practices

### Application Layer
1. Always use the security functions in your queries
2. Validate permissions before performing operations
3. Log sensitive operations manually when needed
4. Use parameterized queries to prevent SQL injection

### Database Layer
1. All tables have RLS enabled
2. Policies are tested and verified
3. Audit logging is comprehensive
4. Indexes are optimized for security queries

### Monitoring
1. Monitor audit logs for suspicious activity
2. Track failed permission checks
3. Review role assignments regularly
4. Monitor company security overview

## Troubleshooting

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

Check user's company membership:
```sql
SELECT is_company_member('company-id');
```

Check user's roles:
```sql
SELECT role FROM roles WHERE user_id = auth.uid() AND company_id = 'company-id';
```

Check user's permissions:
```sql
SELECT has_permission('company-id', 'read');
```

## Security Checklist

- [ ] All tables have RLS enabled
- [ ] All policies are tested
- [ ] Audit logging is working
- [ ] Security indexes are created
- [ ] Role hierarchy is enforced
- [ ] Company isolation is verified
- [ ] Performance is acceptable
- [ ] Documentation is complete

## Emergency Procedures

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

# Access Control System Usage Guide

This guide demonstrates how to use the comprehensive RBAC + ABAC + Entitlements access control system in your TMS application.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Backend Middleware](#backend-middleware)
3. [Frontend Components](#frontend-components)
4. [API Routes](#api-routes)
5. [Common Patterns](#common-patterns)
6. [Advanced Features](#advanced-features)
7. [Testing](#testing)

## Quick Start

### 1. Database Setup

First, run the migrations to set up the access control tables:

```bash
# Run the access control migrations
supabase db push
```

### 2. Basic Usage

```typescript
import { requireAccess, checkAccess } from '../lib/access-control';

// Backend middleware
app.post('/api/loads', 
  requireAccess({ 
    entitlement: 'loads.ltl', 
    permission: 'load.create' 
  }),
  createLoadHandler
);

// Frontend component
import { FeatureGate, PermissionGate } from '../components/access-control';

<FeatureGate feature="loads.ocean" planTier="enterprise" addon="ocean">
  <PermissionGate permission="load.create" showRequestAccess>
    <OceanLoadForm />
  </PermissionGate>
</FeatureGate>
```

## Backend Middleware

### Basic Access Control

```typescript
import { requireAccess } from '../lib/access-control';

// Simple permission check
app.get('/api/loads', 
  requireAccess({ permission: 'load.read' }),
  getLoadsHandler
);

// Entitlement + permission check
app.post('/api/loads', 
  requireAccess({ 
    entitlement: 'loads.ltl',
    permission: 'load.create' 
  }),
  createLoadHandler
);

// With ABAC attributes
app.post('/api/loads', 
  requireAccess({ 
    entitlement: 'loads.ocean',
    permission: 'load.create',
    attributes: { lob: 'ocean', region: 'US' }
  }),
  createOceanLoadHandler
);
```

### Programmatic Access Checks

```typescript
import { checkAccess } from '../lib/access-control';

// Check access programmatically
const result = await checkAccess(orgId, userId, undefined, {
  entitlement: 'loads.ocean',
  permission: 'load.create',
  attributes: { lob: 'ocean' }
});

if (result.allowed) {
  // Proceed with operation
} else {
  console.log('Access denied:', result.reason);
  console.log('Missing:', result.missing);
}
```

### API Key Access

```typescript
// Check API key permissions
const result = await checkAccess(orgId, undefined, apiKeyId, {
  permission: 'load.read'
});

if (result.allowed) {
  // API key has permission
}
```

## Frontend Components

### Feature Gates (Entitlements)

```tsx
import { 
  FeatureGate, 
  OceanFreightGate, 
  AdvancedAnalyticsGate,
  AutonomousAIGate 
} from '../components/access-control/FeatureGate';

// Basic feature gate
<FeatureGate feature="loads.ocean" planTier="enterprise" addon="ocean">
  <OceanLoadBookingForm />
</FeatureGate>

// Convenience components
<OceanFreightGate>
  <OceanFreightDashboard />
</OceanFreightGate>

<AdvancedAnalyticsGate>
  <AdvancedAnalyticsPanel />
</AdvancedAnalyticsGate>

<AutonomousAIGate>
  <AutonomousAgentCenter />
</AutonomousAIGate>

// Custom fallback
<FeatureGate 
  feature="loads.air" 
  planTier="enterprise" 
  addon="air"
  fallback={<AirFreightUpgradeCTA />}
>
  <AirFreightForm />
</FeatureGate>
```

### Permission Gates

```tsx
import { 
  PermissionGate, 
  CreateLoadGate, 
  ExportLoadGate,
  ManageUsersGate 
} from '../components/access-control/PermissionGate';

// Basic permission gate
<PermissionGate permission="load.create" showRequestAccess>
  <CreateLoadButton />
</PermissionGate>

// Convenience components
<CreateLoadGate>
  <CreateLoadForm />
</CreateLoadGate>

<ExportLoadGate>
  <ExportButton />
</ExportLoadGate>

<ManageUsersGate>
  <UserManagementPanel />
</ManageUsersGate>

// With request access
<PermissionGate 
  permission="invoice.export" 
  showRequestAccess
  resource="invoice" 
  action="export"
>
  <ExportInvoiceButton />
</PermissionGate>
```

### Combined Gates

```tsx
// Combine feature and permission gates
<FeatureGate feature="loads.ocean" planTier="enterprise" addon="ocean">
  <PermissionGate permission="load.create" showRequestAccess>
    <OceanLoadForm />
  </PermissionGate>
</FeatureGate>

// Multiple permission checks
<PermissionGate permission="load.read">
  <PermissionGate permission="load.update">
    <EditableLoadTable />
  </PermissionGate>
</PermissionGate>
```

## API Routes

### Load Management

```typescript
// Load routes with access control
app.get('/api/loads', 
  requireAccess({ permission: 'load.read' }),
  getLoadsHandler
);

app.post('/api/loads', 
  requireAccess({ 
    entitlement: 'loads.ltl',
    permission: 'load.create' 
  }),
  createLoadHandler
);

app.put('/api/loads/:id', 
  requireAccess({ permission: 'load.update' }),
  updateLoadHandler
);

app.delete('/api/loads/:id', 
  requireAccess({ permission: 'load.delete' }),
  deleteLoadHandler
);

app.post('/api/loads/bulk', 
  requireAccess({ 
    entitlement: 'load.bulk',
    permission: 'load.create' 
  }),
  bulkCreateLoadsHandler
);
```

### Rate Management

```typescript
app.get('/api/rates', 
  requireAccess({ permission: 'rate.read' }),
  getRatesHandler
);

app.post('/api/rates', 
  requireAccess({ permission: 'rate.create' }),
  createRateHandler
);

app.post('/api/rates/bulk', 
  requireAccess({ 
    entitlement: 'rate.bulk',
    permission: 'rate.create' 
  }),
  bulkCreateRatesHandler
);
```

### Analytics

```typescript
app.get('/api/analytics', 
  requireAccess({ 
    entitlement: 'analytics.read',
    permission: 'analytics.read' 
  }),
  getAnalyticsHandler
);

app.post('/api/analytics/export', 
  requireAccess({ 
    entitlement: 'analytics.export',
    permission: 'analytics.export' 
  }),
  exportAnalyticsHandler
);

app.get('/api/analytics/advanced', 
  requireAccess({ 
    entitlement: 'analytics.advanced',
    permission: 'analytics.read' 
  }),
  getAdvancedAnalyticsHandler
);
```

### User Management

```typescript
app.get('/api/users', 
  requireAccess({ permission: 'user.read' }),
  getUsersHandler
);

app.post('/api/users', 
  requireAccess({ permission: 'user.create' }),
  createUserHandler
);

app.put('/api/users/:id/roles', 
  requireAccess({ permission: 'user.manage_roles' }),
  updateUserRolesHandler
);
```

## Common Patterns

### Portal Access Control

```tsx
// Portal component with access control
const PortalCard = ({ portal }) => {
  return (
    <FeatureGate feature={portal.entitlement} planTier={portal.planTier}>
      <PermissionGate permission={portal.permission}>
        <Card>
          <CardHeader>
            <CardTitle>{portal.name}</CardTitle>
            <CardDescription>{portal.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate(portal.route)}>
              Access Portal
            </Button>
          </CardContent>
        </Card>
      </PermissionGate>
    </FeatureGate>
  );
};

// Usage
<PortalCard 
  portal={{
    name: 'Ocean Freight',
    description: 'Manage ocean freight operations',
    entitlement: 'loads.ocean',
    planTier: 'enterprise',
    addon: 'ocean',
    permission: 'portal.ocean',
    route: '/ocean'
  }}
/>
```

### Conditional UI Elements

```tsx
const LoadActions = ({ load }) => {
  return (
    <div className="flex gap-2">
      <PermissionGate permission="load.read">
        <Button variant="outline" onClick={() => viewLoad(load.id)}>
          View
        </Button>
      </PermissionGate>
      
      <PermissionGate permission="load.update">
        <Button variant="outline" onClick={() => editLoad(load.id)}>
          Edit
        </Button>
      </PermissionGate>
      
      <PermissionGate permission="load.delete">
        <Button variant="destructive" onClick={() => deleteLoad(load.id)}>
          Delete
        </Button>
      </PermissionGate>
      
      <ExportGate>
        <PermissionGate permission="load.export">
          <Button variant="outline" onClick={() => exportLoad(load.id)}>
            Export
          </Button>
        </PermissionGate>
      </ExportGate>
    </div>
  );
};
```

### Form Validation

```tsx
const CreateLoadForm = () => {
  const [formData, setFormData] = useState({});
  
  const handleSubmit = async (data) => {
    // Check access before submission
    const result = await checkAccess(orgId, userId, undefined, {
      entitlement: 'loads.ltl',
      permission: 'load.create',
      attributes: { lob: data.lob, region: data.origin_region }
    });
    
    if (!result.allowed) {
      toast.error(`Access denied: ${result.reason}`);
      return;
    }
    
    // Proceed with submission
    await createLoad(data);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

## Advanced Features

### Temporary Access Elevation

```typescript
import { accessControl } from '../lib/access-control';

// Request temporary access
const requestAccess = async () => {
  const result = await accessControl.requestTemporaryAccess(
    orgId,
    userId,
    ['invoice.export', 'payment.approve'],
    'Need to process end-of-month invoices and payments',
    4 // 4 hours
  );
  
  if (result.success) {
    toast.success('Access request submitted. Waiting for approval.');
  }
};

// Approve access request (admin only)
const approveRequest = async (requestId: string) => {
  const result = await accessControl.approveTemporaryAccess(
    requestId,
    adminUserId,
    ['invoice.export'], // Grant only some permissions
    2 // 2 hours
  );
  
  if (result.success) {
    toast.success('Access request approved');
  }
};
```

### Custom Roles

```typescript
// Create custom role
const createCustomRole = async () => {
  const { data: customRole } = await supabase
    .from('custom_roles')
    .insert({
      org_id: orgId,
      key: 'senior_analyst',
      label: 'Senior Analyst',
      description: 'Advanced analytics and reporting capabilities'
    })
    .select()
    .single();
  
  // Assign permissions
  await supabase.from('custom_role_permissions').insert([
    { custom_role_id: customRole.id, permission_key: 'analytics.read' },
    { custom_role_id: customRole.id, permission_key: 'analytics.export' },
    { custom_role_id: customRole.id, permission_key: 'load.export' },
    { custom_role_id: customRole.id, permission_key: 'invoice.export' }
  ]);
  
  // Assign to user
  await supabase.from('user_custom_roles').insert({
    org_id: orgId,
    user_id: userId,
    custom_role_id: customRole.id
  });
};
```

### ABAC Scopes

```typescript
// Set ABAC scopes for role
const setRoleScopes = async () => {
  await supabase.from('permission_scopes').insert({
    org_id: orgId,
    subject_type: 'role',
    subject_key: 'broker_admin',
    attribute: {
      lob: ['ltl', 'ftl', 'intermodal'],
      region: ['US', 'CA', 'MX'],
      carrier_type: ['asset_based', 'non_asset_based']
    }
  });
};

// Set ABAC scopes for user
const setUserScopes = async () => {
  await supabase.from('permission_scopes').insert({
    org_id: orgId,
    subject_type: 'user',
    subject_key: userId,
    attribute: {
      lob: ['ltl'],
      region: ['US'],
      department: ['operations']
    }
  });
};
```

### API Key Management

```typescript
// Create API key with scopes
const createApiKey = async () => {
  const { data: apiKey } = await supabase
    .from('api_keys')
    .insert({
      org_id: orgId,
      name: 'Production Integration',
      key_hash: 'hashed-api-key',
      scopes: ['load.read', 'rate.read', 'analytics.read'],
      metadata: {
        environment: 'production',
        team: 'engineering',
        integration: 'erp-system'
      },
      rate_limit_per_minute: 1000
    })
    .select()
    .single();
  
  return apiKey;
};

// Validate API key
const validateApiKey = async (apiKeyHash: string) => {
  const { data: apiKey } = await supabase
    .from('api_keys')
    .select('*')
    .eq('key_hash', apiKeyHash)
    .eq('is_active', true)
    .single();
  
  if (!apiKey || (apiKey.expires_at && new Date(apiKey.expires_at) < new Date())) {
    throw new Error('Invalid or expired API key');
  }
  
  return apiKey;
};
```

## Testing

### Unit Tests

```typescript
import { describe, it, expect } from 'vitest';
import { checkAccess } from '../lib/access-control';

describe('Access Control', () => {
  it('should allow access with valid entitlement and permission', async () => {
    const result = await checkAccess(orgId, userId, undefined, {
      entitlement: 'loads.ltl',
      permission: 'load.create'
    });
    
    expect(result.allowed).toBe(true);
  });
  
  it('should deny access without entitlement', async () => {
    const result = await checkAccess(orgId, userId, undefined, {
      entitlement: 'loads.ocean',
      permission: 'load.create'
    });
    
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('Feature not enabled');
  });
});
```

### Integration Tests

```typescript
describe('Load API with Access Control', () => {
  it('should create load with proper access', async () => {
    const response = await request(app)
      .post('/api/loads')
      .set('Authorization', `Bearer ${userToken}`)
      .send(loadData);
    
    expect(response.status).toBe(201);
  });
  
  it('should deny load creation without permission', async () => {
    const response = await request(app)
      .post('/api/loads')
      .set('Authorization', `Bearer ${readOnlyUserToken}`)
      .send(loadData);
    
    expect(response.status).toBe(403);
  });
});
```

### Component Tests

```tsx
import { render, screen } from '@testing-library/react';
import { FeatureGate } from '../components/access-control/FeatureGate';

describe('FeatureGate', () => {
  it('should render children when feature is enabled', () => {
    render(
      <FeatureGate feature="loads.ltl">
        <div>Load Form</div>
      </FeatureGate>
    );
    
    expect(screen.getByText('Load Form')).toBeInTheDocument();
  });
  
  it('should render upgrade CTA when feature is disabled', () => {
    render(
      <FeatureGate feature="loads.ocean" planTier="enterprise">
        <div>Ocean Form</div>
      </FeatureGate>
    );
    
    expect(screen.getByText('Ocean Freight Not Available')).toBeInTheDocument();
  });
});
```

## Best Practices

### 1. Always Check Access

```typescript
// ✅ Good: Check access before operations
const createLoad = async (loadData) => {
  const result = await checkAccess(orgId, userId, undefined, {
    entitlement: 'loads.ltl',
    permission: 'load.create'
  });
  
  if (!result.allowed) {
    throw new Error(`Access denied: ${result.reason}`);
  }
  
  // Proceed with creation
  return await supabase.from('loads').insert(loadData);
};

// ❌ Bad: No access check
const createLoad = async (loadData) => {
  return await supabase.from('loads').insert(loadData);
};
```

### 2. Use Appropriate Granularity

```typescript
// ✅ Good: Specific permissions
<PermissionGate permission="load.create">
  <CreateLoadButton />
</PermissionGate>

// ❌ Bad: Too broad
<PermissionGate permission="load.*">
  <CreateLoadButton />
</PermissionGate>
```

### 3. Provide Clear Feedback

```tsx
// ✅ Good: Clear upgrade messaging
<FeatureGate 
  feature="loads.ocean" 
  planTier="enterprise" 
  addon="ocean"
>
  <OceanLoadForm />
</FeatureGate>

// ✅ Good: Request access option
<PermissionGate 
  permission="invoice.export" 
  showRequestAccess
>
  <ExportButton />
</PermissionGate>
```

### 4. Audit Everything

```typescript
// Access decisions are automatically logged
// You can query audit logs for compliance
const getAuditLogs = async (orgId: string, startDate: Date, endDate: Date) => {
  const { data } = await supabase
    .from('access_audit_logs')
    .select('*')
    .eq('org_id', orgId)
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())
    .order('created_at', { ascending: false });
  
  return data;
};
```

### 5. Regular Access Reviews

```typescript
// Generate access review reports
const generateAccessReview = async (orgId: string) => {
  const users = await accessControl.getOrganizationUsers(orgId);
  
  return users.map(user => ({
    user: user.email,
    role: user.role,
    permissions: await accessControl.getUserPermissions(orgId, user.id),
    last_activity: user.last_activity,
    temporary_permissions: await getTemporaryPermissions(user.id)
  }));
};
```

This comprehensive access control system provides enterprise-grade security with flexible configuration options, detailed audit trails, and intuitive user interfaces for managing access across your TMS application.

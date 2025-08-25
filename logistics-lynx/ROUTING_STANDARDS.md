# Routing Standards Documentation

## Overview

This document outlines the routing standards and best practices for the TMS Super Admin portal and future modules. Following these standards ensures consistent navigation behavior, proper nested routing, and maintainable code.

## Core Principles

### 1. Nested Routing Structure
- **Parent routes** must include `/*` wildcard for proper nested rendering
- **Child routes** must be relative (no leading `/`) to stay within parent context
- **Single router tree** - avoid nested `<Routes>` components

### 2. Route Organization
- All Super Admin routes are under `/super-admin/*`
- Use descriptive, hierarchical route names
- Group related functionality under common prefixes

## Route Structure

### Super Admin Portal Routes

```typescript
// App.tsx - Main route structure
<Route path="/super-admin/*" element={<SuperAdmin />}>
  {/* Dashboard Routes */}
  <Route index element={<SystemOverview />} />
  <Route path="dashboard" element={<SystemOverview />} />
  <Route path="dashboard/users" element={<ActiveUsers />} />
  
  {/* User Management Routes */}
  <Route path="users" element={<AllUsers />} />
  <Route path="users/roles" element={<UserRoles />} />
  <Route path="users/groups" element={<UserGroups />} />
  <Route path="users/access" element={<AccessControl />} />
  <Route path="users/analytics" element={<UserAnalytics />} />
  <Route path="users/billing" element={<BillingManagement />} />
  <Route path="users/support" element={<SupportTickets />} />
  <Route path="users/onboarding" element={<UserOnboarding />} />
  
  {/* System Administration Routes */}
  <Route path="system/database" element={<DatabaseManagement />} />
  <Route path="system/api" element={<ApiManagement />} />
  <Route path="system/monitoring" element={<SystemMonitoring />} />
  <Route path="system/deployment" element={<DeploymentManagement />} />
  <Route path="system/config" element={<Configuration />} />
  <Route path="system/backup" element={<BackupRecovery />} />
  <Route path="system/security" element={<SystemSecurity />} />
  <Route path="system/integrations" element={<IntegrationHub />} />
  <Route path="system/storage" element={<FileStorage />} />
  <Route path="system/email" element={<EmailServices />} />
  
  {/* Security Center Routes */}
  <Route path="security/audit" element={<SecurityAudit />} />
  <Route path="security/logs" element={<AccessLogs />} />
  <Route path="security/protection" element={<DataProtection />} />
  <Route path="security/api" element={<ApiSecurity />} />
  <Route path="security/permissions" element={<UserPermissions />} />
  <Route path="security/policies" element={<SecurityPolicies />} />
  <Route path="security/incidents" element={<IncidentResponse />} />
  <Route path="security/compliance" element={<ComplianceManagement />} />
  
  {/* System Monitoring Routes */}
  <Route path="monitoring/performance" element={<PerformanceMonitoring />} />
  <Route path="monitoring/errors" element={<ErrorTracking />} />
  <Route path="monitoring/logs" element={<LogAnalysis />} />
  <Route path="monitoring/alerts" element={<AlertManagement />} />
  <Route path="monitoring/uptime" element={<UptimeMonitoring />} />
  <Route path="monitoring/resources" element={<ResourceUsage />} />
  <Route path="monitoring/network" element={<NetworkMonitoring />} />
  <Route path="monitoring/health" element={<HealthChecks />} />
  
  {/* Portal Management Routes */}
  <Route path="portals" element={<PortalOverview />} />
  <Route path="portals/config" element={<PortalConfiguration />} />
  <Route path="portals/users" element={<PortalUsers />} />
  <Route path="portals/features" element={<FeatureManagement />} />
  <Route path="portals/analytics" element={<PortalAnalytics />} />
  <Route path="portals/billing" element={<PortalBilling />} />
  <Route path="portals/support" element={<PortalSupport />} />
  <Route path="portals/integrations" element={<PortalIntegrations />} />
  <Route path="portals/backup" element={<PortalBackup />} />
  <Route path="portals/security" element={<PortalSecurity />} />
  <Route path="portals/compliance" element={<PortalCompliance />} />
  <Route path="portals/deployment" element={<PortalDeployment />} />
  
  {/* Analytics & Reports Routes */}
  <Route path="analytics/business" element={<BusinessAnalytics />} />
  <Route path="analytics/users" element={<UserAnalytics />} />
  <Route path="analytics/performance" element={<PerformanceReports />} />
  <Route path="analytics/security" element={<SecurityReports />} />
  <Route path="analytics/financial" element={<FinancialReports />} />
  <Route path="analytics/operational" element={<OperationalReports />} />
  <Route path="analytics/custom" element={<CustomReports />} />
  <Route path="analytics/export" element={<DataExport />} />
  <Route path="analytics/dashboards" element={<DashboardBuilder />} />
  <Route path="analytics/scheduled" element={<ScheduledReports />} />
  
  {/* MCP Control Center Routes */}
  <Route path="mcp" element={<McpOverview />} />
  <Route path="mcp/agents" element={<AgentManagement />} />
  <Route path="mcp/models" element={<AiModels />} />
  <Route path="mcp/pipeline" element={<DataPipeline />} />
  <Route path="mcp/learning" element={<MachineLearning />} />
  <Route path="mcp/analytics" element={<AiAnalytics />} />
  <Route path="mcp/automation" element={<AutomationRules />} />
  <Route path="mcp/integrations" element={<AiIntegrations />} />
  <Route path="mcp/monitoring" element={<AiMonitoring />} />
  <Route path="mcp/compliance" element={<AiCompliance />} />
  <Route path="mcp/documentation" element={<AiDocumentation />} />
  <Route path="mcp/support" element={<AiSupport />} />
  
  {/* Business Operations Routes */}
  <Route path="business/customers" element={<CustomerManagement />} />
  <Route path="business/sales" element={<SalesPipeline />} />
  <Route path="business/billing" element={<BillingInvoicing />} />
  <Route path="business/support" element={<SupportManagement />} />
  <Route path="business/docs" element={<Documentation />} />
  <Route path="business/marketing" element={<MarketingTools />} />
  <Route path="business/partners" element={<PartnerManagement />} />
  <Route path="business/legal" element={<LegalCompliance />} />
  
  {/* Development & DevOps Routes */}
  <Route path="dev/repository" element={<CodeRepository />} />
  <Route path="dev/pipeline" element={<CiCdPipeline />} />
  <Route path="dev/testing" element={<TestingSuite />} />
  <Route path="dev/environments" element={<EnvironmentManagement />} />
  <Route path="dev/performance" element={<PerformanceTesting />} />
  <Route path="dev/security" element={<SecurityTesting />} />
  <Route path="dev/documentation" element={<DevDocumentation />} />
  <Route path="dev/releases" element={<ReleaseManagement />} />
  
  {/* Settings Routes */}
  <Route path="settings" element={<SettingsOverview />} />
  <Route path="settings/profile" element={<ProfileSettings />} />
  <Route path="settings/system" element={<SystemSettings />} />
  <Route path="settings/preferences" element={<UserPreferences />} />
  <Route path="settings/security" element={<SecuritySettings />} />
  
  {/* Catch-all route */}
  <Route path="*" element={<RouteNotFound />} />
</Route>
```

## Navigation Patterns

### 1. Sidebar Navigation

```typescript
// ✅ CORRECT - Use NavLink for active highlighting
<NavLink
  to="dashboard"
  className={({ isActive }) => `
    ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'}
  `}
>
  Dashboard
</NavLink>

// ❌ INCORRECT - Don't use absolute paths
<NavLink to="/dashboard">Dashboard</NavLink>
```

### 2. Programmatic Navigation

```typescript
// ✅ CORRECT - Use useAdminNav hook
import { useAdminNav } from '../hooks/useAdminNav';

const { toDashboard, toUsers, toMcp } = useAdminNav();

// Usage
<button onClick={toDashboard}>Go to Dashboard</button>
<button onClick={toUsers}>Go to Users</button>
<button onClick={toMcp}>Go to MCP</button>

// ❌ INCORRECT - Don't use absolute paths
navigate('/super-admin/dashboard');
```

### 3. FAB Navigation

```typescript
// ✅ CORRECT - Use relative paths
<button onClick={() => navigate('mcp')}>
  AI Agent
</button>

// ❌ INCORRECT - Don't use absolute paths
<button onClick={() => navigate('/super-admin/mcp')}>
  AI Agent
</button>
```

### 4. Header Navigation

```typescript
// ✅ CORRECT - Use absolute paths from root (header is outside /super-admin)
const quickActions = [
  { name: 'Dashboard', action: () => navigate('/super-admin/dashboard') },
  { name: 'Users', action: () => navigate('/super-admin/users') },
];
```

## Protected Routes

### 1. Role-Based Protection

```typescript
// App.tsx
<Route element={<ProtectedRoute roles={['super-admin']} />}>
  <Route path="/super-admin/*" element={<SuperAdmin />}>
    {/* All Super Admin routes */}
  </Route>
</Route>
```

### 2. Permission-Based Protection

```typescript
// Specific permission protection
<Route element={<ProtectedRoute permissions={['users:read']} />}>
  <Route path="users" element={<AllUsers />} />
  <Route path="users/roles" element={<UserRoles />} />
</Route>
```

## Breadcrumbs

### 1. Dynamic Breadcrumbs

```typescript
// Breadcrumbs component automatically generates breadcrumbs
// based on current route pathname
<Breadcrumbs />

// Example output:
// Home > User Management > User Roles
```

### 2. Breadcrumb Configuration

```typescript
// Add friendly names for route segments in Breadcrumbs.tsx
const friendlyNames: Record<string, string> = {
  'users': 'User Management',
  'roles': 'User Roles',
  'groups': 'User Groups',
  // ... more mappings
};
```

## Error Handling

### 1. Route Not Found

```typescript
// Catch-all route for unmatched paths
<Route path="*" element={<RouteNotFound />} />
```

### 2. Loading States

```typescript
// Show loading state while routes are being resolved
<Route path="users" element={<Suspense fallback={<LoadingSpinner />}>
  <AllUsers />
</Suspense>} />
```

## Testing Guidelines

### 1. Route Testing

```typescript
// Test that routes render correctly
test('should navigate to users page', () => {
  render(<App />);
  fireEvent.click(screen.getByText('User Management'));
  expect(screen.getByText('All Users')).toBeInTheDocument();
});
```

### 2. Navigation Testing

```typescript
// Test programmatic navigation
test('should navigate to dashboard', () => {
  const { toDashboard } = useAdminNav();
  toDashboard();
  expect(window.location.pathname).toBe('/super-admin/dashboard');
});
```

## Common Pitfalls

### 1. ❌ Nested Routes

```typescript
// ❌ DON'T do this - creates routing conflicts
<Routes>
  <Route path="/super-admin" element={<SuperAdmin />}>
    <Routes> {/* Nested Routes - BAD */}
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  </Route>
</Routes>
```

### 2. ❌ Absolute Paths in Child Routes

```typescript
// ❌ DON'T do this - jumps to root
<NavLink to="/dashboard">Dashboard</NavLink>

// ✅ DO this - stays within parent
<NavLink to="dashboard">Dashboard</NavLink>
```

### 3. ❌ Missing Wildcard

```typescript
// ❌ DON'T do this - child routes won't render
<Route path="/super-admin" element={<SuperAdmin />}>

// ✅ DO this - allows child routes to render
<Route path="/super-admin/*" element={<SuperAdmin />}>
```

## Migration Guide

### From Old Routing to New Standards

1. **Add wildcard to parent routes**
   ```typescript
   // Before
   <Route path="/super-admin" element={<SuperAdmin />}>
   
   // After
   <Route path="/super-admin/*" element={<SuperAdmin />}>
   ```

2. **Make child routes relative**
   ```typescript
   // Before
   <Route path="/dashboard" element={<Dashboard />} />
   
   // After
   <Route path="dashboard" element={<Dashboard />} />
   ```

3. **Update navigation calls**
   ```typescript
   // Before
   navigate('/super-admin/dashboard');
   
   // After
   navigate('dashboard'); // or use useAdminNav hook
   ```

4. **Use NavLink for active highlighting**
   ```typescript
   // Before
   <Link to="dashboard" className={isActive ? 'active' : ''}>
   
   // After
   <NavLink to="dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
   ```

## Best Practices Summary

1. **Always use `/*` wildcard** for parent routes with children
2. **Use relative paths** for child routes (no leading `/`)
3. **Use `NavLink`** for navigation with active states
4. **Use `useAdminNav` hook** for programmatic navigation
5. **Group related routes** under common prefixes
6. **Add breadcrumbs** for better UX
7. **Protect routes** with appropriate roles/permissions
8. **Test navigation** thoroughly
9. **Document route changes** in this file
10. **Follow naming conventions** consistently

## Future Considerations

- **Lazy loading** for route components
- **Route-based code splitting**
- **Analytics tracking** for route changes
- **Deep linking** support
- **Route-based permissions** caching
- **Route history** management
- **Route-based state** persistence

---

*This document should be updated whenever routing patterns change or new modules are added.*

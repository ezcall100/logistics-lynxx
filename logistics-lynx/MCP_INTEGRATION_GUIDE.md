# MCP Integration Guide

## Overview

This guide documents the comprehensive MCP (Model Context Protocol) integration for the Logistics Lynx TMS system. The integration provides unified access to all super admin pages, FAB (Floating Action Button), settings, profile, UI components, and everything else through MCP agents using API port 3001.

## Architecture

### API Configuration
- **Base URL**: `http://localhost:3001/api`
- **Port**: 3001
- **Timeout**: 30 seconds
- **Retries**: 3 attempts

### Core Components

1. **MCP Routing Configuration** (`src/config/mcp-routing-config.ts`)
2. **Integrated MCP Service** (`src/services/mcp-integrated.ts`)
3. **React Hooks** (`src/hooks/useMCP.ts`)
4. **Example Component** (`src/components/MCPIntegrationExample.tsx`)

## Super Admin Pages Integration

### Dashboard
- **Route**: `/super-admin/dashboard`
- **MCP Endpoint**: `/mcp/dashboard`
- **Agent**: `dashboard-analytics-agent`
- **Features**: Metrics, analytics, real-time monitoring

### User Management
- **Base Route**: `/super-admin/users`
- **MCP Base**: `/mcp/users`
- **Agent**: `user-management-agent`

| Route | MCP Endpoint | Agent |
|-------|-------------|-------|
| `/super-admin/users` | `/mcp/users` | `user-management-agent` |
| `/super-admin/users/roles` | `/mcp/users/roles` | `role-management-agent` |
| `/super-admin/users/groups` | `/mcp/users/groups` | `group-management-agent` |
| `/super-admin/users/access` | `/mcp/users/access-control` | `access-control-agent` |
| `/super-admin/users/analytics` | `/mcp/users/analytics` | `user-analytics-agent` |
| `/super-admin/users/billing` | `/mcp/users/billing` | `billing-management-agent` |
| `/super-admin/users/support` | `/mcp/users/support` | `support-management-agent` |
| `/super-admin/users/onboarding` | `/mcp/users/onboarding` | `onboarding-agent` |

### System Administration
- **Base Route**: `/super-admin/system`
- **MCP Base**: `/mcp/system`
- **Agent**: `system-administration-agent`

| Route | MCP Endpoint | Agent |
|-------|-------------|-------|
| `/super-admin/system/database` | `/mcp/system/database` | `database-management-agent` |
| `/super-admin/system/api` | `/mcp/system/api` | `api-management-agent` |
| `/super-admin/system/deployment` | `/mcp/system/deployment` | `deployment-agent` |
| `/super-admin/system/config` | `/mcp/system/configuration` | `configuration-agent` |
| `/super-admin/system/backup` | `/mcp/system/backup` | `backup-recovery-agent` |
| `/super-admin/system/security` | `/mcp/system/security` | `security-agent` |
| `/super-admin/system/integrations` | `/mcp/system/integrations` | `integration-agent` |
| `/super-admin/system/storage` | `/mcp/system/storage` | `storage-agent` |
| `/super-admin/system/email` | `/mcp/system/email` | `email-services-agent` |

### Security Center
- **Base Route**: `/super-admin/security`
- **MCP Base**: `/mcp/security`
- **Agent**: `security-center-agent`

| Route | MCP Endpoint | Agent |
|-------|-------------|-------|
| `/super-admin/security/audit` | `/mcp/security/audit` | `security-audit-agent` |
| `/super-admin/security/logs` | `/mcp/security/logs` | `access-logs-agent` |
| `/super-admin/security/protection` | `/mcp/security/data-protection` | `data-protection-agent` |
| `/super-admin/security/api` | `/mcp/security/api` | `api-security-agent` |
| `/super-admin/security/permissions` | `/mcp/security/permissions` | `permissions-agent` |
| `/super-admin/security/policies` | `/mcp/security/policies` | `security-policies-agent` |
| `/super-admin/security/incidents` | `/mcp/security/incidents` | `incident-response-agent` |
| `/super-admin/security/compliance` | `/mcp/security/compliance` | `compliance-agent` |

### System Monitoring
- **Base Route**: `/super-admin/monitoring`
- **MCP Base**: `/mcp/monitoring`
- **Agent**: `system-monitoring-agent`

| Route | MCP Endpoint | Agent |
|-------|-------------|-------|
| `/super-admin/monitoring/performance` | `/mcp/monitoring/performance` | `performance-monitoring-agent` |
| `/super-admin/monitoring/errors` | `/mcp/monitoring/errors` | `error-tracking-agent` |
| `/super-admin/monitoring/logs` | `/mcp/monitoring/logs` | `log-analysis-agent` |
| `/super-admin/monitoring/alerts` | `/mcp/monitoring/alerts` | `alert-management-agent` |
| `/super-admin/monitoring/uptime` | `/mcp/monitoring/uptime` | `uptime-monitoring-agent` |
| `/super-admin/monitoring/resources` | `/mcp/monitoring/resources` | `resource-usage-agent` |
| `/super-admin/monitoring/network` | `/mcp/monitoring/network` | `network-monitoring-agent` |
| `/super-admin/monitoring/health` | `/mcp/monitoring/health` | `health-checks-agent` |

### Portal Management
- **Base Route**: `/super-admin/portals`
- **MCP Base**: `/mcp/portals`
- **Agent**: `portal-management-agent`

| Route | MCP Endpoint | Agent |
|-------|-------------|-------|
| `/super-admin/portals` | `/mcp/portals` | `portal-overview-agent` |
| `/super-admin/portals/config` | `/mcp/portals/configuration` | `portal-config-agent` |
| `/super-admin/portals/users` | `/mcp/portals/users` | `portal-users-agent` |
| `/super-admin/portals/features` | `/mcp/portals/features` | `feature-management-agent` |
| `/super-admin/portals/analytics` | `/mcp/portals/analytics` | `portal-analytics-agent` |
| `/super-admin/portals/billing` | `/mcp/portals/billing` | `portal-billing-agent` |
| `/super-admin/portals/support` | `/mcp/portals/support` | `portal-support-agent` |
| `/super-admin/portals/integrations` | `/mcp/portals/integrations` | `portal-integrations-agent` |
| `/super-admin/portals/backup` | `/mcp/portals/backup` | `portal-backup-agent` |
| `/super-admin/portals/security` | `/mcp/portals/security` | `portal-security-agent` |
| `/super-admin/portals/compliance` | `/mcp/portals/compliance` | `portal-compliance-agent` |
| `/super-admin/portals/deployment` | `/mcp/portals/deployment` | `portal-deployment-agent` |

### Analytics & Reports
- **Base Route**: `/super-admin/analytics`
- **MCP Base**: `/mcp/analytics`
- **Agent**: `analytics-reports-agent`

| Route | MCP Endpoint | Agent |
|-------|-------------|-------|
| `/super-admin/analytics/business` | `/mcp/analytics/business` | `business-analytics-agent` |
| `/super-admin/analytics/users` | `/mcp/analytics/users` | `user-analytics-agent` |
| `/super-admin/analytics/performance` | `/mcp/analytics/performance` | `performance-reports-agent` |
| `/super-admin/analytics/security` | `/mcp/analytics/security` | `security-reports-agent` |
| `/super-admin/analytics/financial` | `/mcp/analytics/financial` | `financial-reports-agent` |
| `/super-admin/analytics/operational` | `/mcp/analytics/operational` | `operational-reports-agent` |
| `/super-admin/analytics/custom` | `/mcp/analytics/custom` | `custom-reports-agent` |
| `/super-admin/analytics/export` | `/mcp/analytics/export` | `data-export-agent` |
| `/super-admin/analytics/dashboards` | `/mcp/analytics/dashboards` | `dashboard-builder-agent` |
| `/super-admin/analytics/scheduled` | `/mcp/analytics/scheduled` | `scheduled-reports-agent` |

### MCP Control Center
- **Base Route**: `/super-admin/mcp`
- **MCP Base**: `/mcp/control-center`
- **Agent**: `mcp-control-center-agent`

| Route | MCP Endpoint | Agent |
|-------|-------------|-------|
| `/super-admin/mcp` | `/mcp/control-center` | `mcp-overview-agent` |
| `/super-admin/mcp/agents` | `/mcp/control-center/agents` | `agent-management-agent` |
| `/super-admin/mcp/models` | `/mcp/control-center/models` | `ai-models-agent` |
| `/super-admin/mcp/pipeline` | `/mcp/control-center/pipeline` | `data-pipeline-agent` |
| `/super-admin/mcp/learning` | `/mcp/control-center/learning` | `machine-learning-agent` |
| `/super-admin/mcp/analytics` | `/mcp/control-center/analytics` | `ai-analytics-agent` |
| `/super-admin/mcp/automation` | `/mcp/control-center/automation` | `automation-rules-agent` |
| `/super-admin/mcp/integrations` | `/mcp/control-center/integrations` | `ai-integrations-agent` |
| `/super-admin/mcp/monitoring` | `/mcp/control-center/monitoring` | `ai-monitoring-agent` |
| `/super-admin/mcp/compliance` | `/mcp/control-center/compliance` | `ai-compliance-agent` |
| `/super-admin/mcp/documentation` | `/mcp/control-center/documentation` | `ai-documentation-agent` |
| `/super-admin/mcp/support` | `/mcp/control-center/support` | `ai-support-agent` |

### Phase 2 Orchestration
- **Route**: `/super-admin/phase2-orchestration`
- **MCP Endpoint**: `/mcp/phase2-orchestration`
- **Agent**: `phase2-orchestration-agent`

### Business Operations
- **Base Route**: `/super-admin/business`
- **MCP Base**: `/mcp/business`
- **Agent**: `business-operations-agent`

| Route | MCP Endpoint | Agent |
|-------|-------------|-------|
| `/super-admin/business/customers` | `/mcp/business/customers` | `customer-management-agent` |
| `/super-admin/business/sales` | `/mcp/business/sales` | `sales-pipeline-agent` |
| `/super-admin/business/billing` | `/mcp/business/billing` | `billing-invoicing-agent` |
| `/super-admin/business/support` | `/mcp/business/support` | `support-management-agent` |
| `/super-admin/business/docs` | `/mcp/business/documentation` | `documentation-agent` |
| `/super-admin/business/marketing` | `/mcp/business/marketing` | `marketing-tools-agent` |
| `/super-admin/business/partners` | `/mcp/business/partners` | `partner-management-agent` |
| `/super-admin/business/legal` | `/mcp/business/legal` | `legal-compliance-agent` |

### Development & DevOps
- **Base Route**: `/super-admin/dev`
- **MCP Base**: `/mcp/dev`
- **Agent**: `development-devops-agent`

| Route | MCP Endpoint | Agent |
|-------|-------------|-------|
| `/super-admin/dev/repository` | `/mcp/dev/repository` | `code-repository-agent` |
| `/super-admin/dev/pipeline` | `/mcp/dev/pipeline` | `cicd-pipeline-agent` |
| `/super-admin/dev/testing` | `/mcp/dev/testing` | `testing-suite-agent` |
| `/super-admin/dev/environments` | `/mcp/dev/environments` | `environment-management-agent` |
| `/super-admin/dev/performance` | `/mcp/dev/performance` | `performance-testing-agent` |
| `/super-admin/dev/security` | `/mcp/dev/security` | `security-testing-agent` |
| `/super-admin/dev/documentation` | `/mcp/dev/documentation` | `dev-documentation-agent` |
| `/super-admin/dev/releases` | `/mcp/dev/releases` | `release-management-agent` |

## Settings Integration

### Settings Routes
- **Base Route**: `/super-admin/settings`
- **MCP Base**: `/mcp/settings`
- **Agent**: `settings-agent`

| Route | MCP Endpoint | Agent |
|-------|-------------|-------|
| `/super-admin/settings` | `/mcp/settings` | `settings-overview-agent` |
| `/super-admin/settings/profile` | `/mcp/settings/profile` | `profile-settings-agent` |
| `/super-admin/settings/system` | `/mcp/settings/system` | `system-settings-agent` |
| `/super-admin/settings/preferences` | `/mcp/settings/preferences` | `user-preferences-agent` |
| `/super-admin/settings/security` | `/mcp/settings/security` | `security-settings-agent` |

## Profile Integration

### Profile Routes
- **Base Route**: `/super-admin/profile`
- **MCP Base**: `/mcp/profile`
- **Agent**: `profile-agent`

| Route | MCP Endpoint | Agent |
|-------|-------------|-------|
| `/super-admin/profile` | `/mcp/profile` | `profile-overview-agent` |
| `/super-admin/profile/personal` | `/mcp/profile/personal` | `personal-information-agent` |
| `/super-admin/profile/avatar` | `/mcp/profile/avatar` | `avatar-media-agent` |
| `/super-admin/profile/preferences` | `/mcp/profile/preferences` | `user-preferences-profile-agent` |
| `/super-admin/profile/activity` | `/mcp/profile/activity` | `activity-history-agent` |
| `/super-admin/profile/delete` | `/mcp/profile/delete` | `account-deletion-agent` |

## FAB (Floating Action Button) Integration

### FAB Routes
- **Base Route**: `/super-admin/fab`
- **MCP Base**: `/mcp/fab`
- **Agent**: `fab-agent`

| Route | MCP Endpoint | Agent |
|-------|-------------|-------|
| `/super-admin/fab` | `/mcp/fab` | `fab-overview-agent` |
| `/super-admin/fab/actions` | `/mcp/fab/actions` | `fab-actions-agent` |
| `/super-admin/fab/customization` | `/mcp/fab/customization` | `fab-customization-agent` |

## UI Components Integration

### UI Component Mappings
- **Dashboard Components**: `EnhancedCard`, `EnhancedTable`, `EnhancedProgress`, `EnhancedBadge`
- **Form Components**: `EnhancedForm`, `EnhancedInput`, `EnhancedSelect`, `EnhancedButton`
- **Navigation Components**: `EnhancedSidebar`, `EnhancedNavbar`, `EnhancedBreadcrumb`
- **Data Components**: `EnhancedTable`, `EnhancedChart`, `EnhancedDataGrid`

## MCP Agent Types

### Autonomous Agents
- **Capabilities**: Self-managing, decision-making, continuous-learning
- **Endpoints**: `/mcp/agents/autonomous`

### Assistant Agents
- **Capabilities**: User-interaction, task-execution, context-awareness
- **Endpoints**: `/mcp/agents/assistant`

### Analytics Agents
- **Capabilities**: Data-analysis, reporting, insights-generation
- **Endpoints**: `/mcp/agents/analytics`

### Automation Agents
- **Capabilities**: Workflow-automation, rule-execution, process-optimization
- **Endpoints**: `/mcp/agents/automation`

### Monitoring Agents
- **Capabilities**: System-monitoring, alerting, performance-tracking
- **Endpoints**: `/mcp/agents/monitoring`

## Usage Examples

### Using the MCP Hook

```typescript
import { useMCP } from '@/hooks/useMCP';

const MyComponent = () => {
  const { 
    loading, 
    error, 
    dashboard, 
    users, 
    system, 
    settings, 
    profile, 
    fab 
  } = useMCP();

  const handleGetDashboardMetrics = async () => {
    try {
      const metrics = await dashboard.getMetrics();
      console.log('Dashboard metrics:', metrics);
    } catch (err) {
      console.error('Failed to get dashboard metrics:', err);
    }
  };

  const handleUpdateSettings = async () => {
    try {
      const result = await settings.updateSystem({
        maintenanceMode: false,
        debugMode: true
      });
      console.log('Settings updated:', result);
    } catch (err) {
      console.error('Failed to update settings:', err);
    }
  };

  return (
    <div>
      <button onClick={handleGetDashboardMetrics}>Get Metrics</button>
      <button onClick={handleUpdateSettings}>Update Settings</button>
    </div>
  );
};
```

### Using Data Fetching Hook

```typescript
import { useMCPData } from '@/hooks/useMCP';

const DashboardComponent = () => {
  const { 
    data: dashboardData, 
    loading, 
    error, 
    refetch 
  } = useMCPData('/super-admin/dashboard');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
};
```

### Using Real-time Hook

```typescript
import { useMCPRealtime } from '@/hooks/useMCP';

const MonitoringComponent = () => {
  const { 
    data: performanceData, 
    loading, 
    error 
  } = useMCPRealtime('/super-admin/monitoring/performance', 5000);

  return (
    <div>
      <h1>Real-time Performance</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {performanceData && (
        <pre>{JSON.stringify(performanceData, null, 2)}</pre>
      )}
    </div>
  );
};
```

### Direct Service Usage

```typescript
import { mcpService } from '@/services/mcp-integrated';

// Call any route directly
const result = await mcpService.callRoute('/super-admin/users', 'GET');

// Use specific service methods
const users = await mcpService.users.getAll();
const settings = await mcpService.settings.getOverview();
const profile = await mcpService.profile.getOverview();
const fabActions = await mcpService.fab.getActions();
```

## Error Handling

The MCP integration includes comprehensive error handling:

1. **HTTP Errors**: Automatic retry with exponential backoff
2. **Authentication Errors**: Automatic token refresh
3. **Network Errors**: Graceful degradation with fallback options
4. **Validation Errors**: Detailed error messages with context

## Configuration

### Environment Variables

```bash
# MCP API Configuration
VITE_MCP_API_URL=http://localhost:3001/api
MCP_PORT=3001
MCP_TIMEOUT=30000
MCP_RETRIES=3
```

### HTTP Configuration

The HTTP client is configured with:
- Base URL: `http://localhost:3001/api`
- Timeout: 20 seconds
- Retries: Automatic with exponential backoff
- CSRF protection
- Request/response interceptors
- Error handling middleware

## Testing

### Unit Tests

```typescript
import { mcpService } from '@/services/mcp-integrated';

describe('MCP Service', () => {
  it('should call dashboard route', async () => {
    const result = await mcpService.dashboard.getMetrics();
    expect(result).toBeDefined();
  });

  it('should handle errors gracefully', async () => {
    try {
      await mcpService.callRoute('/invalid-route');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
```

### Integration Tests

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import MCPIntegrationExample from '@/components/MCPIntegrationExample';

describe('MCP Integration Example', () => {
  it('should render all sections', () => {
    render(<MCPIntegrationExample />);
    expect(screen.getByText('MCP Integration Example')).toBeInTheDocument();
  });
});
```

## Deployment

### Production Configuration

1. Update environment variables for production
2. Configure MCP server on port 3001
3. Set up reverse proxy if needed
4. Configure SSL certificates
5. Set up monitoring and logging

### Docker Configuration

```yaml
# docker-compose.yml
services:
  mcp-server:
    image: mcp-server:latest
    ports:
      - "3001:3001"
    environment:
      - MCP_PORT=3001
      - MCP_API_URL=http://localhost:3001/api
```

## Monitoring and Logging

### Metrics

- Request/response times
- Error rates
- Agent health status
- System resource usage

### Logs

- All MCP API calls are logged
- Error details with stack traces
- Performance metrics
- Security events

## Security

### Authentication

- JWT token-based authentication
- Automatic token refresh
- CSRF protection
- Session management

### Authorization

- Role-based access control
- Permission-based authorization
- API key management
- Audit logging

## Troubleshooting

### Common Issues

1. **Connection Refused**: Check if MCP server is running on port 3001
2. **Authentication Errors**: Verify JWT tokens and refresh mechanism
3. **Timeout Errors**: Increase timeout values or check network connectivity
4. **CORS Errors**: Configure CORS settings on MCP server

### Debug Mode

Enable debug mode to get detailed logs:

```typescript
// Enable debug logging
localStorage.setItem('mcp-debug', 'true');
```

## Support

For issues and questions:
1. Check the logs for error details
2. Verify MCP server configuration
3. Test individual endpoints
4. Review network connectivity
5. Contact the development team

## Conclusion

This MCP integration provides a comprehensive, unified interface for all super admin functionality, FAB actions, settings, profile management, and UI components. The system is designed to be scalable, maintainable, and easy to use while providing robust error handling and monitoring capabilities.

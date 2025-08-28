import React, { useState } from 'react';
import { useMCP, useMCPData, useMCPRealtime } from '@/hooks/useMCP';
import { MCP_ROUTING_CONFIG } from '@/config/mcp-routing-config';
import { 
  EnhancedCard, 
  Button, 
  EnhancedBadge, 
  EnhancedTable, 
  EnhancedProgress, 
  stableStyles 
} from '@/components/ui/EnhancedUIComponents';

// Example component demonstrating MCP integration
const MCPIntegrationExample: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState('/super-admin/dashboard');
  const [selectedMethod, setSelectedMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [requestData, setRequestData] = useState('');

  // Using the main MCP hook
  const { 
    loading, 
    error, 
    clearError, 
    callRoute,
    dashboard,
    users,
    system,
    security,
    monitoring,
    portals,
    analytics,
    mcp,
    settings,
    profile,
    fab,
    utils
  } = useMCP();

  // Using the data fetching hook
  const { 
    data: dashboardData, 
    loading: dashboardLoading, 
    error: dashboardError,
    refetch: refetchDashboard 
  } = useMCPData('/super-admin/dashboard');

  // Using the real-time hook
  const { 
    data: realtimeData, 
    loading: realtimeLoading, 
    error: realtimeError 
  } = useMCPRealtime('/super-admin/monitoring/performance', 10000);

  // Handle custom route call
  const handleCustomRouteCall = async () => {
    try {
      let data = undefined;
      if (requestData) {
        try {
          data = JSON.parse(requestData);
        } catch (e) {
          console.error('Invalid JSON data');
          return;
        }
      }

      const result = await callRoute(selectedRoute, selectedMethod, data);
      console.log('Route call result:', result);
    } catch (err) {
      console.error('Route call failed:', err);
    }
  };

  // Handle dashboard metrics
  const handleGetDashboardMetrics = async () => {
    try {
      const metrics = await dashboard.getMetrics();
      console.log('Dashboard metrics:', metrics);
    } catch (err) {
      console.error('Failed to get dashboard metrics:', err);
    }
  };

  // Handle user management
  const handleGetUsers = async () => {
    try {
      const usersData = await users.getAll();
      console.log('Users data:', usersData);
    } catch (err) {
      console.error('Failed to get users:', err);
    }
  };

  // Handle system monitoring
  const handleGetSystemStatus = async () => {
    try {
      const systemData = await system.getDatabase();
      console.log('System database status:', systemData);
    } catch (err) {
      console.error('Failed to get system status:', err);
    }
  };

  // Handle security audit
  const handleGetSecurityAudit = async () => {
    try {
      const auditData = await security.getAudit();
      console.log('Security audit data:', auditData);
    } catch (err) {
      console.error('Failed to get security audit:', err);
    }
  };

  // Handle settings update
  const handleUpdateSettings = async () => {
    try {
      const settingsData = await settings.updateSystem({
        maintenanceMode: false,
        debugMode: true,
        logLevel: 'info'
      });
      console.log('Settings updated:', settingsData);
    } catch (err) {
      console.error('Failed to update settings:', err);
    }
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    try {
      const profileData = await profile.updatePersonal({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      });
      console.log('Profile updated:', profileData);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  // Handle FAB actions
  const handleGetFABActions = async () => {
    try {
      const fabData = await fab.getActions();
      console.log('FAB actions:', fabData);
    } catch (err) {
      console.error('Failed to get FAB actions:', err);
    }
  };

  // Get route information
  const routeInfo = utils.getRouteInfo(selectedRoute);
  const allRoutes = utils.getAllRoutes();

  return (
    <div className="p-6 space-y-6">
      <EnhancedCard className="p-6">
        <h2 className="text-2xl font-bold mb-4">MCP Integration Example</h2>
        <p className="text-gray-600 mb-4">
          This component demonstrates the comprehensive MCP integration with all super admin pages, 
          FAB, settings, profile, and UI components using API port 3001.
        </p>
      </EnhancedCard>

      {/* Route Information */}
      <EnhancedCard className="p-6">
        <h3 className="text-xl font-semibold mb-4">Route Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Selected Route</label>
            <select 
              value={selectedRoute} 
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {allRoutes.map(route => (
                <option key={route} value={route}>{route}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">MCP Endpoint</label>
            <input 
              type="text" 
              value={routeInfo.endpoint} 
              readOnly 
              className="w-full p-2 border rounded bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">MCP Agent</label>
            <input 
              type="text" 
              value={routeInfo.agent} 
              readOnly 
              className="w-full p-2 border rounded bg-gray-50"
            />
          </div>
        </div>
      </EnhancedCard>

      {/* Custom Route Call */}
      <EnhancedCard className="p-6">
        <h3 className="text-xl font-semibold mb-4">Custom Route Call</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">HTTP Method</label>
              <select 
                value={selectedMethod} 
                onChange={(e) => setSelectedMethod(e.target.value as any)}
                className="w-full p-2 border rounded"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Request Data (JSON)</label>
              <textarea 
                value={requestData} 
                onChange={(e) => setRequestData(e.target.value)}
                placeholder='{"key": "value"}'
                className="w-full p-2 border rounded h-20"
              />
            </div>
          </div>
          <Button 
            onClick={handleCustomRouteCall}
            disabled={loading}
            className={stableStyles.button.primary}
          >
            {loading ? 'Calling...' : 'Call Route'}
          </Button>
        </div>
      </EnhancedCard>

      {/* Quick Actions */}
      <EnhancedCard className="p-6">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button 
            onClick={handleGetDashboardMetrics}
            className={stableStyles.button.secondary}
          >
            Get Dashboard Metrics
          </Button>
          <Button 
            onClick={handleGetUsers}
            className={stableStyles.button.secondary}
          >
            Get Users
          </Button>
          <Button 
            onClick={handleGetSystemStatus}
            className={stableStyles.button.secondary}
          >
            Get System Status
          </Button>
          <Button 
            onClick={handleGetSecurityAudit}
            className={stableStyles.button.secondary}
          >
            Get Security Audit
          </Button>
          <Button 
            onClick={handleUpdateSettings}
            className={stableStyles.button.secondary}
          >
            Update Settings
          </Button>
          <Button 
            onClick={handleUpdateProfile}
            className={stableStyles.button.secondary}
          >
            Update Profile
          </Button>
          <Button 
            onClick={handleGetFABActions}
            className={stableStyles.button.secondary}
          >
            Get FAB Actions
          </Button>
          <Button 
            onClick={refetchDashboard}
            className={stableStyles.button.secondary}
          >
            Refetch Dashboard
          </Button>
        </div>
      </EnhancedCard>

      {/* Data Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dashboard Data */}
        <EnhancedCard className="p-6">
          <h3 className="text-xl font-semibold mb-4">Dashboard Data</h3>
          {dashboardLoading && <EnhancedProgress value={50} />}
          {dashboardError && (
            <EnhancedBadge variant="danger" className="mb-4">
              Error: {dashboardError}
            </EnhancedBadge>
          )}
          {dashboardData && (
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(dashboardData, null, 2)}
            </pre>
          )}
        </EnhancedCard>

        {/* Real-time Data */}
        <EnhancedCard className="p-6">
          <h3 className="text-xl font-semibold mb-4">Real-time Performance Data</h3>
          {realtimeLoading && <EnhancedProgress value={75} />}
          {realtimeError && (
            <EnhancedBadge variant="danger" className="mb-4">
              Error: {realtimeError}
            </EnhancedBadge>
          )}
          {realtimeData && (
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(realtimeData, null, 2)}
            </pre>
          )}
        </EnhancedCard>
      </div>

      {/* Error Display */}
      {error && (
        <EnhancedCard className="p-6 border-red-200 bg-red-50">
          <h3 className="text-xl font-semibold mb-4 text-red-800">Error</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <Button 
            onClick={clearError}
            className={stableStyles.button.danger}
          >
            Clear Error
          </Button>
        </EnhancedCard>
      )}

      {/* Configuration Display */}
      <EnhancedCard className="p-6">
        <h3 className="text-xl font-semibold mb-4">MCP Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">API Configuration</h4>
            <pre className="bg-gray-100 p-4 rounded text-sm">
              {JSON.stringify(MCP_ROUTING_CONFIG.api, null, 2)}
            </pre>
          </div>
          <div>
            <h4 className="font-medium mb-2">Available Routes</h4>
            <div className="bg-gray-100 p-4 rounded text-sm max-h-64 overflow-auto">
              {allRoutes.map(route => (
                <div key={route} className="py-1">
                  <code>{route}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </EnhancedCard>

      {/* Agent Types */}
      <EnhancedCard className="p-6">
        <h3 className="text-xl font-semibold mb-4">MCP Agent Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(MCP_ROUTING_CONFIG.agentTypes).map(([type, config]) => (
            <div key={type} className="border rounded p-4">
              <h4 className="font-medium mb-2 capitalize">{type} Agent</h4>
              <div className="space-y-2">
                <div>
                  <strong>Capabilities:</strong>
                  <ul className="list-disc list-inside text-sm">
                    {config.capabilities.map(cap => (
                      <li key={cap}>{cap}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Endpoints:</strong>
                  <ul className="list-disc list-inside text-sm">
                    {config.endpoints.map(endpoint => (
                      <li key={endpoint}>{endpoint}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </EnhancedCard>

      {/* UI Components */}
      <EnhancedCard className="p-6">
        <h3 className="text-xl font-semibold mb-4">UI Component Mappings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(MCP_ROUTING_CONFIG.uiComponents).map(([type, config]) => (
            <div key={type} className="border rounded p-4">
              <h4 className="font-medium mb-2 capitalize">{type} Components</h4>
              <div>
                <strong>Components:</strong>
                <ul className="list-disc list-inside text-sm">
                  {config.components.map(component => (
                    <li key={component}>{component}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-2">
                <strong>MCP Endpoint:</strong>
                <p className="text-sm text-gray-600">{config.mcpEndpoint}</p>
              </div>
              <div>
                <strong>Agent:</strong>
                <p className="text-sm text-gray-600">{config.agent}</p>
              </div>
            </div>
          ))}
        </div>
      </EnhancedCard>
    </div>
  );
};

export default MCPIntegrationExample;

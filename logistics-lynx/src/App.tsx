
import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SuperAdmin from './components/SuperAdmin';
import SystemOverview from './pages/super-admin/dashboard/SystemOverview';

// Import all Super Admin page components
// Dashboard Routes
import ActiveUsers from './pages/super-admin/dashboard/ActiveUsers';

// User Management Routes
import AllUsers from './pages/super-admin/user-management/AllUsers';
import UserRoles from './pages/super-admin/user-management/UserRoles';
import UserGroups from './pages/super-admin/user-management/UserGroups';
import AccessControl from './pages/super-admin/user-management/AccessControl';
import UserAnalytics from './pages/super-admin/user-management/UserAnalytics';
import BillingManagement from './pages/super-admin/user-management/BillingManagement';
import SupportTickets from './pages/super-admin/user-management/SupportTickets';
import UserOnboarding from './pages/super-admin/user-management/UserOnboarding';

// System Administration Routes
import DatabaseManagement from './pages/super-admin/system-administration/DatabaseManagement';
import ApiManagement from './pages/super-admin/system-administration/APIManagement';
import DeploymentManagement from './pages/super-admin/system-administration/DeploymentManagement';
import Configuration from './pages/super-admin/system-administration/Configuration';
import BackupRecovery from './pages/super-admin/system-administration/BackupRecovery';
import IntegrationHub from './pages/super-admin/system-administration/IntegrationHub';
import FileStorage from './pages/super-admin/system-administration/FileStorage';
import EmailServices from './pages/super-admin/system-administration/EmailServices';
import ServerMonitoring from './pages/super-admin/system-administration/ServerMonitoring';

// Security Center Routes
import SecurityAudit from './pages/super-admin/security-center/SecurityAudit';
import AccessLogs from './pages/super-admin/security-center/AccessLogs';
import DataProtection from './pages/super-admin/security-center/DataProtection';
import ApiSecurity from './pages/super-admin/security-center/APISecurity';
import UserPermissions from './pages/super-admin/security-center/UserPermissions';
import SecurityPolicies from './pages/super-admin/security-center/SecurityPolicies';
import IncidentResponse from './pages/super-admin/security-center/IncidentResponse';
import ComplianceManagement from './pages/super-admin/security-center/ComplianceManagement';

// System Monitoring Routes
import PerformanceMonitoring from './pages/super-admin/system-monitoring/PerformanceMonitoring';
import ErrorTracking from './pages/super-admin/system-monitoring/ErrorTracking';
import LogAnalysis from './pages/super-admin/system-monitoring/LogAnalysis';
import AlertManagement from './pages/super-admin/system-monitoring/AlertManagement';
import UptimeMonitoring from './pages/super-admin/system-monitoring/UptimeMonitoring';
import ResourceUsage from './pages/super-admin/system-monitoring/ResourceUsage';
import NetworkMonitoring from './pages/super-admin/system-monitoring/NetworkMonitoring';
import HealthChecks from './pages/super-admin/system-monitoring/HealthChecks';

// Portal Management Routes
import PortalOverview from './pages/super-admin/portal-management/PortalOverview';
import PortalConfiguration from './pages/super-admin/portal-management/PortalConfiguration';
import PortalUsers from './pages/super-admin/portal-management/PortalUsers';
import FeatureManagement from './pages/super-admin/portal-management/FeatureManagement';
import PortalAnalytics from './pages/super-admin/portal-management/PortalAnalytics';
import PortalBilling from './pages/super-admin/portal-management/PortalBilling';
import PortalSupport from './pages/super-admin/portal-management/PortalSupport';
import PortalIntegrations from './pages/super-admin/portal-management/PortalIntegrations';
import PortalBackup from './pages/super-admin/portal-management/PortalBackup';
import PortalSecurity from './pages/super-admin/portal-management/PortalSecurity';
import PortalCompliance from './pages/super-admin/portal-management/PortalCompliance';
import PortalDeployment from './pages/super-admin/portal-management/PortalDeployment';

// Analytics & Reports Routes
import BusinessAnalytics from './pages/super-admin/analytics-reports/BusinessAnalytics';
import PerformanceReports from './pages/super-admin/analytics-reports/PerformanceReports';
import SecurityReports from './pages/super-admin/analytics-reports/SecurityReports';
import FinancialReports from './pages/super-admin/analytics-reports/FinancialReports';
import OperationalReports from './pages/super-admin/analytics-reports/OperationalReports';
import CustomReports from './pages/super-admin/analytics-reports/CustomReports';
import DataExport from './pages/super-admin/analytics-reports/DataExport';
import DashboardBuilder from './pages/super-admin/analytics-reports/DashboardBuilder';
import ScheduledReports from './pages/super-admin/analytics-reports/ScheduledReports';

// MCP Control Center Routes
import McpOverview from './pages/super-admin/mcp-control-center/MCPOverview';
import AgentManagement from './pages/super-admin/mcp-control-center/AgentManagement';
import AiModels from './pages/super-admin/mcp-control-center/AIModels';
import DataPipeline from './pages/super-admin/mcp-control-center/DataPipeline';
import MachineLearning from './pages/super-admin/mcp-control-center/MachineLearning';
import AiAnalytics from './pages/super-admin/mcp-control-center/AIAnalytics';
import AutomationRules from './pages/super-admin/mcp-control-center/AutomationRules';
import AiIntegrations from './pages/super-admin/mcp-control-center/AIIntegrations';
import AiMonitoring from './pages/super-admin/mcp-control-center/AIMonitoring';
import AiCompliance from './pages/super-admin/mcp-control-center/AICompliance';
import AiDocumentation from './pages/super-admin/mcp-control-center/AIDocumentation';
import AiSupport from './pages/super-admin/mcp-control-center/AISupport';

// Business Operations Routes
import CustomerManagement from './pages/super-admin/business-operations/CustomerManagement';
import SalesPipeline from './pages/super-admin/business-operations/SalesPipeline';
import BillingInvoicing from './pages/super-admin/business-operations/BillingInvoicing';
import SupportManagement from './pages/super-admin/business-operations/SupportManagement';
import Documentation from './pages/super-admin/business-operations/Documentation';
import MarketingTools from './pages/super-admin/business-operations/MarketingTools';
import PartnerManagement from './pages/super-admin/business-operations/PartnerManagement';
import LegalCompliance from './pages/super-admin/business-operations/LegalCompliance';

// Development & DevOps Routes - Commented out due to missing files
// import CodeRepository from './pages/super-admin/development/CodeRepository';
// import CiCdPipeline from './pages/super-admin/development/CiCdPipeline';
// import TestingSuite from './pages/super-admin/development/TestingSuite';
// import EnvironmentManagement from './pages/super-admin/development/EnvironmentManagement';
// import PerformanceTesting from './pages/super-admin/development/PerformanceTesting';
// import SecurityTesting from './pages/super-admin/development/SecurityTesting';
// import DevDocumentation from './pages/super-admin/development/DevDocumentation';
// import ReleaseManagement from './pages/super-admin/development/ReleaseManagement';

// Settings Routes
import Settings from './pages/super-admin/settings/Settings';
import ProfileSettings from './pages/super-admin/settings/ProfileSettings';
import SystemSettings from './pages/super-admin/settings/SystemSettings';
import UserPreferences from './pages/super-admin/settings/UserPreferences';
import SecuritySettings from './pages/super-admin/settings/SecuritySettings';

// Role definitions with demo credentials
const roles = [
  { label: 'Super Admin', value: 'super_admin', email: 'ezcallnet.mo@gmail.com', password: 'demo-password' },
  { label: 'Carrier Admin', value: 'carrier_admin', email: 'carrier@transbotai.com', password: 'demo-password' },
  { label: 'Broker Admin', value: 'freight_broker_admin', email: 'broker@transbotai.com', password: 'demo-password' },
  { label: 'Shipper Admin', value: 'shipper_admin', email: 'shipper@transbotai.com', password: 'demo-password' },
  { label: 'Driver', value: 'carrier_driver', email: 'driver@transbotai.com', password: 'demo-password' },
  { label: 'Owner Operator', value: 'owner_operator', email: 'owner@transbotai.com', password: 'demo-password' },
];

// Simple home page
const HomePage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center space-y-6">
      <h1 className="text-5xl font-bold text-gray-900">🏢 TransBot AI</h1>
      <p className="text-xl text-gray-600">Transportation Management System</p>
      <Link
        to="/login"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
      >
        🚀 Go to Login
      </Link>
    </div>
  </div>
);

// Complete role-based login page
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [selectedRole, setSelectedRole] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [autoFillEnabled, setAutoFillEnabled] = React.useState(true);

  // Handle role selection with autofill
  const handleRoleChange = (roleValue: string) => {
    setSelectedRole(roleValue);
    if (autoFillEnabled && roleValue) {
      const role = roles.find(r => r.value === roleValue);
      if (role) {
        setEmail(role.email);
        setPassword(role.password);
      }
    }
  };

  // Role-based redirect function
  const redirectUserByRole = (role: string): string => {
    switch (role) {
      case 'super_admin': return '/super-admin/dashboard';
      case 'carrier_admin': return '/carrier/dashboard';
      case 'freight_broker_admin': return '/broker/dashboard';
      case 'shipper_admin': return '/shipper/dashboard';
      case 'carrier_driver': return '/driver/dashboard';
      case 'owner_operator': return '/owner-operator/dashboard';
      default: return '/super-admin/dashboard';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('🔍 LoginPage: Starting login process...');
      console.log('🔍 LoginPage: Email:', email);
      console.log('🔍 LoginPage: Selected Role:', selectedRole);
      
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, always succeed
      const success = true;
      
      if (success) {
        const redirectPath = selectedRole ? redirectUserByRole(selectedRole) : '/super-admin/dashboard';
        console.log('🔍 LoginPage: Login successful, redirecting to', redirectPath);
        
        // Store user data in localStorage for the AuthContext to pick up
        const mockUser = {
          id: '1',
          name: selectedRole === 'super_admin' ? 'Super Administrator' : 'Admin User',
          email: email,
          role: selectedRole || 'super_admin',
          isAuthenticated: true,
          lastLogin: new Date().toISOString(),
          sessionExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };
        
        localStorage.setItem('auth_user', JSON.stringify(mockUser));
        console.log('🔍 LoginPage: User data stored in localStorage:', mockUser);
        
        // Navigate to the appropriate dashboard
        navigate(redirectPath, { replace: true });
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error('🔍 LoginPage: Login error', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your TMS Enterprise account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Select Role
              </label>
              <select
                id="role"
                name="role"
                value={selectedRole}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose your role...</option>
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Auto-fill Toggle */}
            <div className="flex items-center">
              <input
                id="autoFill"
                name="autoFill"
                type="checkbox"
                checked={autoFillEnabled}
                onChange={(e) => setAutoFillEnabled(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="autoFill" className="ml-2 block text-sm text-gray-700">
                Auto-fill demo credentials
              </label>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Demo Credentials: Select a role above to auto-fill
            </p>
          </div>
        </form>

        <div className="text-center">
          <Link to="/" className="text-sm text-blue-600 hover:text-blue-500">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Super Admin Routes - Complete Routing Structure */}
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
            <Route path="system/monitoring" element={<ServerMonitoring />} />
            <Route path="system/deployment" element={<DeploymentManagement />} />
            <Route path="system/config" element={<Configuration />} />
            <Route path="system/backup" element={<BackupRecovery />} />
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
            
            {/* Development & DevOps Routes - Commented out due to missing components */}
            {/* <Route path="dev/repository" element={<CodeRepository />} /> */}
            {/* <Route path="dev/pipeline" element={<CiCdPipeline />} /> */}
            {/* <Route path="dev/testing" element={<TestingSuite />} /> */}
            {/* <Route path="dev/environments" element={<EnvironmentManagement />} /> */}
            {/* <Route path="dev/performance" element={<PerformanceTesting />} /> */}
            {/* <Route path="dev/security" element={<SecurityTesting />} /> */}
            {/* <Route path="dev/documentation" element={<DevDocumentation />} /> */}
            {/* <Route path="dev/releases" element={<ReleaseManagement />} /> */}
            
            {/* Settings Routes */}
            <Route path="settings" element={<Settings />} />
            <Route path="settings/profile" element={<ProfileSettings />} />
            <Route path="settings/system" element={<SystemSettings />} />
            <Route path="settings/preferences" element={<UserPreferences />} />
            <Route path="settings/security" element={<SecuritySettings />} />
            
            {/* Catch-all route - redirect to dashboard */}
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>
          
          <Route path="*" element={<HomePage />} />
        </Routes>
    </AuthProvider>
  );
}

export default App;

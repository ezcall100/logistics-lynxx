
import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SuperAdmin from './components/SuperAdmin';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';

// Import the actual existing components
import SystemOverview from './pages/super-admin/dashboard/SystemOverview';
import ActiveUsers from './pages/super-admin/dashboard/ActiveUsers';
import RevenueMetrics from './pages/super-admin/dashboard/RevenueMetrics';
import SystemAlerts from './pages/super-admin/dashboard/SystemAlerts';

// User Management Pages
import AllUsers from './pages/super-admin/user-management/AllUsers';
import UserRoles from './pages/super-admin/user-management/UserRoles';
import UserGroups from './pages/super-admin/user-management/UserGroups';
import AccessControl from './pages/super-admin/user-management/AccessControl';
import UserAnalytics from './pages/super-admin/user-management/UserAnalytics';
import BillingManagement from './pages/super-admin/user-management/BillingManagement';
import SupportTickets from './pages/super-admin/user-management/SupportTickets';
import UserOnboarding from './pages/super-admin/user-management/UserOnboarding';

// System Administration Pages
import DatabaseManagement from './pages/super-admin/system-administration/DatabaseManagement';
import APIManagement from './pages/super-admin/system-administration/APIManagement';
import ServerMonitoring from './pages/super-admin/system-administration/ServerMonitoring';
import DeploymentManagement from './pages/super-admin/system-administration/DeploymentManagement';
import Configuration from './pages/super-admin/system-administration/Configuration';
import BackupRecovery from './pages/super-admin/system-administration/BackupRecovery';
import SecuritySettings from './pages/super-admin/system-administration/SecuritySettings';
import IntegrationHub from './pages/super-admin/system-administration/IntegrationHub';
import FileStorage from './pages/super-admin/system-administration/FileStorage';
import EmailServices from './pages/super-admin/system-administration/EmailServices';

// Security Center Pages
import SecurityAudit from './pages/super-admin/security-center/SecurityAudit';
import AccessLogs from './pages/super-admin/security-center/AccessLogs';
import DataProtection from './pages/super-admin/security-center/DataProtection';
import APISecurity from './pages/super-admin/security-center/APISecurity';
import UserPermissions from './pages/super-admin/security-center/UserPermissions';
import SecurityPolicies from './pages/super-admin/security-center/SecurityPolicies';
import IncidentResponse from './pages/super-admin/security-center/IncidentResponse';
import ComplianceManagement from './pages/super-admin/security-center/ComplianceManagement';

// NEW: Import all 10 new Super Admin pages
import SuperAdminDashboard from './pages/super-admin/dashboard/SuperAdminDashboard';
import UserManagement from './pages/super-admin/user-management/UserManagement';
import MCPAgentManagement from './pages/super-admin/mcp-agents/MCPAgentManagement';
import SystemSettings from './pages/super-admin/system-settings/SystemSettings';
import QATestingPanel from './pages/super-admin/qa-testing/QATestingPanel';
import UIComponentRegistry from './pages/super-admin/ui-components/UIComponentRegistry';
import AutonomousSystem from './pages/super-admin/autonomous-system/AutonomousSystem';
import PerformanceMonitor from './pages/super-admin/performance/PerformanceMonitor';
import AgentWorkflows from './pages/super-admin/agent-workflows/AgentWorkflows';
import DeploymentControls from './pages/super-admin/deployment/DeploymentControls';

// Landing page component
const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">
            🏢 TMS Enterprise Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Advanced Transportation Management System with AI-Powered Super Admin Control Center
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/super-admin')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            🚀 Launch Super Admin Portal
          </button>
          
          <div className="text-sm text-gray-500">
            <p>Enterprise-grade management and monitoring</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder component for routes that don't have components yet
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🚧 {title}
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          This page is under development. Coming soon!
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            <strong>Note:</strong> This is a placeholder page. The actual functionality will be implemented soon.
          </p>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  console.log('🔍 App.tsx: App component rendering...');
  console.log('🔍 App.tsx: Current location:', window.location.pathname);
  
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Super Admin Portal - All routes under /super-admin/* */}
          <Route element={<ProtectedRoute roles={['super_admin']} />}>
            <Route path="/super-admin/*" element={<SuperAdmin />}>
              {/* Default route - redirect to dashboard */}
              <Route index element={<Navigate to="dashboard" replace />} />
              
              {/* Dashboard Routes - Using actual components */}
              <Route path="dashboard" element={<SystemOverview />} />
              <Route path="dashboard/users" element={<ActiveUsers />} />
              <Route path="dashboard/revenue" element={<RevenueMetrics />} />
              <Route path="dashboard/alerts" element={<SystemAlerts />} />

              {/* User Management Routes - Using actual components */}
              <Route path="users" element={<AllUsers />} />
              <Route path="users/roles" element={<UserRoles />} />
              <Route path="users/groups" element={<UserGroups />} />
              <Route path="users/access" element={<AccessControl />} />
              <Route path="users/analytics" element={<UserAnalytics />} />
              <Route path="users/billing" element={<BillingManagement />} />
              <Route path="users/support" element={<SupportTickets />} />
              <Route path="users/onboarding" element={<UserOnboarding />} />

              {/* System Administration Routes - Using actual components */}
              <Route path="system/database" element={<DatabaseManagement />} />
              <Route path="system/api" element={<APIManagement />} />
              <Route path="system/monitoring" element={<ServerMonitoring />} />
              <Route path="system/deployment" element={<DeploymentManagement />} />
              <Route path="system/config" element={<Configuration />} />
              <Route path="system/backup" element={<BackupRecovery />} />
              <Route path="system/security" element={<SecuritySettings />} />
              <Route path="system/integrations" element={<IntegrationHub />} />
              <Route path="system/storage" element={<FileStorage />} />
              <Route path="system/email" element={<EmailServices />} />

              {/* Security Center Routes - Using actual components */}
              <Route path="security/audit" element={<SecurityAudit />} />
              <Route path="security/logs" element={<AccessLogs />} />
              <Route path="security/protection" element={<DataProtection />} />
              <Route path="security/api" element={<APISecurity />} />
              <Route path="security/permissions" element={<UserPermissions />} />
              <Route path="security/policies" element={<SecurityPolicies />} />
              <Route path="security/incidents" element={<IncidentResponse />} />
              <Route path="security/compliance" element={<ComplianceManagement />} />

              {/* NEW: All 10 New Super Admin Pages */}
              <Route path="dashboard/super-admin" element={<SuperAdminDashboard />} />
              <Route path="user-management/overview" element={<UserManagement />} />
              <Route path="mcp-agents/management" element={<MCPAgentManagement />} />
              <Route path="system-settings/overview" element={<SystemSettings />} />
              <Route path="qa-testing/panel" element={<QATestingPanel />} />
              <Route path="ui-components/registry" element={<UIComponentRegistry />} />
              <Route path="autonomous-system/overview" element={<AutonomousSystem />} />
              <Route path="performance/monitor" element={<PerformanceMonitor />} />
              <Route path="agent-workflows/overview" element={<AgentWorkflows />} />
              <Route path="deployment/controls" element={<DeploymentControls />} />

              {/* System Monitoring Routes */}
              <Route path="monitoring/performance" element={<PlaceholderPage title="Performance Monitoring" />} />
              <Route path="monitoring/errors" element={<PlaceholderPage title="Error Tracking" />} />
              <Route path="monitoring/logs" element={<PlaceholderPage title="Log Analysis" />} />
              <Route path="monitoring/alerts" element={<PlaceholderPage title="Alert Management" />} />
              <Route path="monitoring/uptime" element={<PlaceholderPage title="Uptime Monitoring" />} />
              <Route path="monitoring/resources" element={<PlaceholderPage title="Resource Usage" />} />
              <Route path="monitoring/network" element={<PlaceholderPage title="Network Monitoring" />} />
              <Route path="monitoring/health" element={<PlaceholderPage title="Health Checks" />} />

              {/* Portal Management Routes */}
              <Route path="portals" element={<PlaceholderPage title="Portal Overview" />} />
              <Route path="portals/config" element={<PlaceholderPage title="Portal Configuration" />} />
              <Route path="portals/users" element={<PlaceholderPage title="Portal Users" />} />
              <Route path="portals/features" element={<PlaceholderPage title="Feature Management" />} />
              <Route path="portals/analytics" element={<PlaceholderPage title="Portal Analytics" />} />
              <Route path="portals/billing" element={<PlaceholderPage title="Portal Billing" />} />
              <Route path="portals/support" element={<PlaceholderPage title="Portal Support" />} />
              <Route path="portals/integrations" element={<PlaceholderPage title="Portal Integrations" />} />
              <Route path="portals/backup" element={<PlaceholderPage title="Portal Backup" />} />
              <Route path="portals/security" element={<PlaceholderPage title="Portal Security" />} />
              <Route path="portals/compliance" element={<PlaceholderPage title="Portal Compliance" />} />
              <Route path="portals/deployment" element={<PlaceholderPage title="Portal Deployment" />} />

              {/* Analytics & Reports Routes */}
              <Route path="analytics/business" element={<PlaceholderPage title="Business Analytics" />} />
              <Route path="analytics/users" element={<PlaceholderPage title="User Analytics" />} />
              <Route path="analytics/performance" element={<PlaceholderPage title="Performance Reports" />} />
              <Route path="analytics/security" element={<PlaceholderPage title="Security Reports" />} />
              <Route path="analytics/financial" element={<PlaceholderPage title="Financial Reports" />} />
              <Route path="analytics/operational" element={<PlaceholderPage title="Operational Reports" />} />
              <Route path="analytics/custom" element={<PlaceholderPage title="Custom Reports" />} />
              <Route path="analytics/export" element={<PlaceholderPage title="Data Export" />} />
              <Route path="analytics/dashboards" element={<PlaceholderPage title="Dashboard Builder" />} />
              <Route path="analytics/scheduled" element={<PlaceholderPage title="Scheduled Reports" />} />

              {/* MCP Control Center Routes */}
              <Route path="mcp" element={<PlaceholderPage title="MCP Overview" />} />
              <Route path="mcp/agents" element={<PlaceholderPage title="Agent Management" />} />
              <Route path="mcp/models" element={<PlaceholderPage title="AI Models" />} />
              <Route path="mcp/pipeline" element={<PlaceholderPage title="Data Pipeline" />} />
              <Route path="mcp/learning" element={<PlaceholderPage title="Machine Learning" />} />
              <Route path="mcp/analytics" element={<PlaceholderPage title="AI Analytics" />} />
              <Route path="mcp/automation" element={<PlaceholderPage title="Automation Rules" />} />
              <Route path="mcp/integrations" element={<PlaceholderPage title="AI Integrations" />} />
              <Route path="mcp/monitoring" element={<PlaceholderPage title="AI Monitoring" />} />
              <Route path="mcp/compliance" element={<PlaceholderPage title="AI Compliance" />} />
              <Route path="mcp/documentation" element={<PlaceholderPage title="AI Documentation" />} />
              <Route path="mcp/support" element={<PlaceholderPage title="AI Support" />} />

              {/* Business Operations Routes */}
              <Route path="business/customers" element={<PlaceholderPage title="Customer Management" />} />
              <Route path="business/sales" element={<PlaceholderPage title="Sales Pipeline" />} />
              <Route path="business/billing" element={<PlaceholderPage title="Billing & Invoicing" />} />
              <Route path="business/support" element={<PlaceholderPage title="Support Management" />} />
              <Route path="business/docs" element={<PlaceholderPage title="Documentation" />} />
              <Route path="business/marketing" element={<PlaceholderPage title="Marketing Tools" />} />
              <Route path="business/partners" element={<PlaceholderPage title="Partner Management" />} />
              <Route path="business/legal" element={<PlaceholderPage title="Legal Compliance" />} />

              {/* Development & DevOps Routes */}
              <Route path="dev/repository" element={<PlaceholderPage title="Code Repository" />} />
              <Route path="dev/pipeline" element={<PlaceholderPage title="CI/CD Pipeline" />} />
              <Route path="dev/testing" element={<PlaceholderPage title="Testing Suite" />} />
              <Route path="dev/environments" element={<PlaceholderPage title="Environment Management" />} />
              <Route path="dev/performance" element={<PlaceholderPage title="Performance Testing" />} />
              <Route path="dev/security" element={<PlaceholderPage title="Security Testing" />} />
              <Route path="dev/documentation" element={<PlaceholderPage title="Dev Documentation" />} />
              <Route path="dev/releases" element={<PlaceholderPage title="Release Management" />} />

              {/* Settings Routes */}
              <Route path="settings" element={<PlaceholderPage title="Settings Overview" />} />
              <Route path="settings/profile" element={<PlaceholderPage title="Profile Settings" />} />
              <Route path="settings/system" element={<PlaceholderPage title="System Settings" />} />
              <Route path="settings/preferences" element={<PlaceholderPage title="User Preferences" />} />
              <Route path="settings/security" element={<PlaceholderPage title="Security Settings" />} />
              <Route path="settings/notifications" element={<PlaceholderPage title="Notification Settings" />} />
              <Route path="settings/appearance" element={<PlaceholderPage title="Appearance Settings" />} />
              <Route path="settings/language" element={<PlaceholderPage title="Language Settings" />} />
              <Route path="settings/accessibility" element={<PlaceholderPage title="Accessibility Settings" />} />
              <Route path="settings/privacy" element={<PlaceholderPage title="Privacy Settings" />} />
              <Route path="settings/integrations" element={<PlaceholderPage title="Integration Settings" />} />
              <Route path="settings/backup" element={<PlaceholderPage title="Backup Settings" />} />
              <Route path="settings/advanced" element={<PlaceholderPage title="Advanced Settings" />} />
              <Route path="settings/about" element={<PlaceholderPage title="About Settings" />} />

              {/* Profile Routes */}
              <Route path="profile" element={<PlaceholderPage title="Profile Overview" />} />
              <Route path="profile/personal" element={<PlaceholderPage title="Personal Information" />} />
              <Route path="profile/avatar" element={<PlaceholderPage title="Avatar & Media" />} />
              <Route path="profile/preferences" element={<PlaceholderPage title="Profile Preferences" />} />
              <Route path="profile/activity" element={<PlaceholderPage title="Activity History" />} />
              <Route path="profile/sessions" element={<PlaceholderPage title="Active Sessions" />} />
              <Route path="profile/verification" element={<PlaceholderPage title="Account Verification" />} />
              <Route path="profile/delete" element={<PlaceholderPage title="Account Deletion" />} />

              {/* FAB Routes */}
              <Route path="fab" element={<PlaceholderPage title="FAB Overview" />} />
              <Route path="fab/actions" element={<PlaceholderPage title="FAB Actions" />} />
              <Route path="fab/customization" element={<PlaceholderPage title="FAB Customization" />} />
              <Route path="fab/templates" element={<PlaceholderPage title="FAB Templates" />} />
              <Route path="fab/analytics" element={<PlaceholderPage title="FAB Analytics" />} />
              <Route path="fab/integrations" element={<PlaceholderPage title="FAB Integrations" />} />

              {/* Mobile Routes */}
              <Route path="mobile" element={<PlaceholderPage title="Mobile Overview" />} />
              <Route path="mobile/settings" element={<PlaceholderPage title="Mobile Settings" />} />
              <Route path="mobile/sync" element={<PlaceholderPage title="Mobile Sync" />} />
              <Route path="mobile/devices" element={<PlaceholderPage title="Mobile Devices" />} />

              {/* Catch-all route for unmatched paths */}
              <Route path="*" element={
                <div className="min-h-screen bg-red-50 p-8">
                  <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                      <h1 className="text-3xl font-bold text-red-900 mb-6">
                        🚨 Route Not Found
                      </h1>
                      <p className="text-lg text-red-700 mb-4">
                        The requested page could not be found. This might be due to:
                      </p>
                      <ul className="list-disc list-inside text-red-600 space-y-2 mb-6">
                        <li>Incorrect navigation path</li>
                        <li>Missing route definition</li>
                        <li>Route configuration issue</li>
                      </ul>
                      <button
                        onClick={() => window.history.back()}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Go Back
                      </button>
                    </div>
                  </div>
                </div>
              } />
            </Route>
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;

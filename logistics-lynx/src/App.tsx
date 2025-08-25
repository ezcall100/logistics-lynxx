
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SuperAdmin from './components/SuperAdmin';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import UnauthorizedPage from './pages/auth/UnauthorizedPage';

// Import all the SuperAdmin page components
// Dashboard Pages
import SystemOverview from './pages/super-admin/dashboard/SystemOverview';
import ActiveUsers from './pages/super-admin/dashboard/ActiveUsers';
import RevenueMetrics from './pages/super-admin/dashboard/RevenueMetrics';
import SystemAlerts from './pages/super-admin/dashboard/SystemAlerts';

// Settings Pages
import ProfileSettings from './pages/super-admin/settings/ProfileSettings';
import SettingsOverview from './pages/super-admin/settings/SettingsOverview';
import SystemSettings from './pages/super-admin/settings/SystemSettings';
import UserPreferences from './pages/super-admin/settings/UserPreferences';
import SecuritySettings from './pages/super-admin/settings/SecuritySettings';

// MCP Pages
import MCPOverview from './pages/super-admin/mcp-control-center/MCPOverview';
import AgentManagement from './pages/super-admin/mcp-control-center/AgentManagement';
import AIModels from './pages/super-admin/mcp-control-center/AIModels';
import DataPipeline from './pages/super-admin/mcp-control-center/DataPipeline';
import MachineLearning from './pages/super-admin/mcp-control-center/MachineLearning';
import AIAnalytics from './pages/super-admin/mcp-control-center/AIAnalytics';
import AutomationRules from './pages/super-admin/mcp-control-center/AutomationRules';
import AIIntegrations from './pages/super-admin/mcp-control-center/AIIntegrations';
import AIMonitoring from './pages/super-admin/mcp-control-center/AIMonitoring';
import AICompliance from './pages/super-admin/mcp-control-center/AICompliance';
import AIDocumentation from './pages/super-admin/mcp-control-center/AIDocumentation';
import AISupport from './pages/super-admin/mcp-control-center/AISupport';
import AgentControlUI from './pages/mcp/AgentControlUI';


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
import SystemSecuritySettings from './pages/super-admin/system-administration/SecuritySettings';
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

// System Monitoring Pages
import PerformanceMonitoring from './pages/super-admin/system-monitoring/PerformanceMonitoring';
import ErrorTracking from './pages/super-admin/system-monitoring/ErrorTracking';
import LogAnalysis from './pages/super-admin/system-monitoring/LogAnalysis';
import AlertManagement from './pages/super-admin/system-monitoring/AlertManagement';
import UptimeMonitoring from './pages/super-admin/system-monitoring/UptimeMonitoring';
import ResourceUsage from './pages/super-admin/system-monitoring/ResourceUsage';
import NetworkMonitoring from './pages/super-admin/system-monitoring/NetworkMonitoring';
import HealthChecks from './pages/super-admin/system-monitoring/HealthChecks';

// Portal Management Pages
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

// Analytics & Reports Pages
import BusinessAnalytics from './pages/super-admin/analytics-reports/BusinessAnalytics';
import AnalyticsUserAnalytics from './pages/super-admin/analytics-reports/UserAnalytics';
import PerformanceReports from './pages/super-admin/analytics-reports/PerformanceReports';
import SecurityReports from './pages/super-admin/analytics-reports/SecurityReports';
import FinancialReports from './pages/super-admin/analytics-reports/FinancialReports';
import OperationalReports from './pages/super-admin/analytics-reports/OperationalReports';
import CustomReports from './pages/super-admin/analytics-reports/CustomReports';
import DataExport from './pages/super-admin/analytics-reports/DataExport';
import DashboardBuilder from './pages/super-admin/analytics-reports/DashboardBuilder';
import ScheduledReports from './pages/super-admin/analytics-reports/ScheduledReports';

// Business Operations Pages
import CustomerManagement from './pages/super-admin/business-operations/CustomerManagement';
import SalesPipeline from './pages/super-admin/business-operations/SalesPipeline';
import BillingInvoicing from './pages/super-admin/business-operations/BillingInvoicing';
import SupportManagement from './pages/super-admin/business-operations/SupportManagement';
import Documentation from './pages/super-admin/business-operations/Documentation';
import MarketingTools from './pages/super-admin/business-operations/MarketingTools';
import PartnerManagement from './pages/super-admin/business-operations/PartnerManagement';
import LegalCompliance from './pages/super-admin/business-operations/LegalCompliance';

// Development & DevOps Pages
import CodeRepository from './pages/super-admin/development-devops/CodeRepository';
import CICDPipeline from './pages/super-admin/development-devops/CICDPipeline';
import TestingSuite from './pages/super-admin/development-devops/TestingSuite';
import EnvironmentManagement from './pages/super-admin/development-devops/EnvironmentManagement';
import PerformanceTesting from './pages/super-admin/development-devops/PerformanceTesting';
import SecurityTesting from './pages/super-admin/development-devops/SecurityTesting';
import DevDocumentation from './pages/super-admin/development-devops/DevDocumentation';
import ReleaseManagement from './pages/super-admin/development-devops/ReleaseManagement';

import NotificationSettings from './pages/super-admin/settings/NotificationSettings';
import AppearanceSettings from './pages/super-admin/settings/AppearanceSettings';
import LanguageSettings from './pages/super-admin/settings/LanguageSettings';
import AccessibilitySettings from './pages/super-admin/settings/AccessibilitySettings';
import PrivacySettings from './pages/super-admin/settings/PrivacySettings';
import IntegrationSettings from './pages/super-admin/settings/IntegrationSettings';
import BackupSettings from './pages/super-admin/settings/BackupSettings';
import AdvancedSettings from './pages/super-admin/settings/AdvancedSettings';
import AboutSettings from './pages/super-admin/settings/AboutSettings';
import ProfileOverview from './pages/super-admin/profile/ProfileOverview';
import PersonalInformation from './pages/super-admin/profile/PersonalInformation';
import AvatarMedia from './pages/super-admin/profile/AvatarMedia';
import ProfileUserPreferences from './pages/super-admin/profile/UserPreferences';
import ActivityHistory from './pages/super-admin/profile/ActivityHistory';
import ActiveSessions from './pages/super-admin/profile/ActiveSessions';
import AccountVerification from './pages/super-admin/profile/AccountVerification';
import AccountDeletion from './pages/super-admin/profile/AccountDeletion';
import FABOverview from './pages/super-admin/fab/FABOverview';
import FABActions from './pages/super-admin/fab/FABActions';
import FABCustomization from './pages/super-admin/fab/FABCustomization';
import FABTemplates from './pages/super-admin/fab/FABTemplates';
import FABAnalytics from './pages/super-admin/fab/FABAnalytics';
import FABIntegrations from './pages/super-admin/fab/FABIntegrations';
import MobileOverview from './pages/super-admin/mobile/MobileOverview';
import MobileSettings from './pages/super-admin/mobile/MobileSettings';
import MobileSync from './pages/super-admin/mobile/MobileSync';
import MobileDevices from './pages/super-admin/mobile/MobileDevices';
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
    <ErrorBoundary>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            
            {/* Protected Super Admin Portal - All routes under /super-admin/* */}
            <Route element={<ProtectedRoute roles={['super-admin']} />}>
              <Route path="/super-admin/*" element={<SuperAdmin />}>
                {/* Dashboard Routes */}
                <Route path="dashboard" element={<SystemOverview />} />
                <Route path="dashboard/users" element={<ActiveUsers />} />
                <Route path="dashboard/revenue" element={<RevenueMetrics />} />
                <Route path="dashboard/alerts" element={<SystemAlerts />} />

                {/* User Management Routes - Requires specific permissions */}
                <Route element={<ProtectedRoute permissions={['users:read']} />}>
                  <Route path="users" element={<AllUsers />} />
                  <Route path="users/roles" element={<UserRoles />} />
                  <Route path="users/groups" element={<UserGroups />} />
                  <Route path="users/access" element={<AccessControl />} />
                  <Route path="users/analytics" element={<UserAnalytics />} />
                  <Route path="users/billing" element={<BillingManagement />} />
                  <Route path="users/support" element={<SupportTickets />} />
                  <Route path="users/onboarding" element={<UserOnboarding />} />
                </Route>

                {/* System Administration Routes - Requires system admin */}
                <Route element={<ProtectedRoute permissions={['system:admin']} />}>
                  <Route path="system/database" element={<DatabaseManagement />} />
                  <Route path="system/api" element={<APIManagement />} />
                  <Route path="system/monitoring" element={<ServerMonitoring />} />
                  <Route path="system/deployment" element={<DeploymentManagement />} />
                  <Route path="system/config" element={<Configuration />} />
                  <Route path="system/backup" element={<BackupRecovery />} />
                  <Route path="system/security" element={<SystemSecuritySettings />} />
                  <Route path="system/integrations" element={<IntegrationHub />} />
                  <Route path="system/storage" element={<FileStorage />} />
                  <Route path="system/email" element={<EmailServices />} />
                </Route>

                {/* Security Center Routes - Requires security admin */}
                <Route element={<ProtectedRoute permissions={['security:admin']} />}>
                  <Route path="security/audit" element={<SecurityAudit />} />
                  <Route path="security/logs" element={<AccessLogs />} />
                  <Route path="security/protection" element={<DataProtection />} />
                  <Route path="security/api" element={<APISecurity />} />
                  <Route path="security/permissions" element={<UserPermissions />} />
                  <Route path="security/policies" element={<SecurityPolicies />} />
                  <Route path="security/incidents" element={<IncidentResponse />} />
                  <Route path="security/compliance" element={<ComplianceManagement />} />
                </Route>

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
                <Route path="analytics/users" element={<AnalyticsUserAnalytics />} />
                <Route path="analytics/performance" element={<PerformanceReports />} />
                <Route path="analytics/security" element={<SecurityReports />} />
                <Route path="analytics/financial" element={<FinancialReports />} />
                <Route path="analytics/operational" element={<OperationalReports />} />
                <Route path="analytics/custom" element={<CustomReports />} />
                <Route path="analytics/export" element={<DataExport />} />
                <Route path="analytics/dashboards" element={<DashboardBuilder />} />
                <Route path="analytics/scheduled" element={<ScheduledReports />} />

                {/* MCP Control Center Routes - Requires MCP admin */}
                <Route element={<ProtectedRoute permissions={['mcp:admin']} />}>
                  <Route path="mcp" element={<MCPOverview />} />
                  <Route path="mcp/agents" element={<AgentManagement />} />
                  <Route path="mcp/control" element={<AgentControlUI />} />
                  <Route path="mcp/models" element={<AIModels />} />
                  <Route path="mcp/pipeline" element={<DataPipeline />} />
                  <Route path="mcp/learning" element={<MachineLearning />} />
                  <Route path="mcp/analytics" element={<AIAnalytics />} />
                  <Route path="mcp/automation" element={<AutomationRules />} />
                  <Route path="mcp/integrations" element={<AIIntegrations />} />
                  <Route path="mcp/monitoring" element={<AIMonitoring />} />
                  <Route path="mcp/compliance" element={<AICompliance />} />
                  <Route path="mcp/documentation" element={<AIDocumentation />} />
                  <Route path="mcp/support" element={<AISupport />} />
                </Route>

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
                <Route path="dev/pipeline" element={<CICDPipeline />} />
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
                <Route path="settings/notifications" element={<NotificationSettings />} />
                <Route path="settings/appearance" element={<AppearanceSettings />} />
                <Route path="settings/language" element={<LanguageSettings />} />
                <Route path="settings/accessibility" element={<AccessibilitySettings />} />
                <Route path="settings/privacy" element={<PrivacySettings />} />
                <Route path="settings/integrations" element={<IntegrationSettings />} />
                <Route path="settings/backup" element={<BackupSettings />} />
                <Route path="settings/advanced" element={<AdvancedSettings />} />
                <Route path="settings/about" element={<AboutSettings />} />
                <Route path="profile" element={<ProfileOverview />} />
                <Route path="profile/personal" element={<PersonalInformation />} />
                <Route path="profile/avatar" element={<AvatarMedia />} />
                <Route path="profile/preferences" element={<ProfileUserPreferences />} />
                <Route path="profile/activity" element={<ActivityHistory />} />
                <Route path="profile/sessions" element={<ActiveSessions />} />
                <Route path="profile/verification" element={<AccountVerification />} />
                <Route path="profile/delete" element={<AccountDeletion />} />
                <Route path="fab" element={<FABOverview />} />
                <Route path="fab/actions" element={<FABActions />} />
                <Route path="fab/customization" element={<FABCustomization />} />
                <Route path="fab/templates" element={<FABTemplates />} />
                <Route path="fab/analytics" element={<FABAnalytics />} />
                <Route path="fab/integrations" element={<FABIntegrations />} />
                <Route path="mobile" element={<MobileOverview />} />
                <Route path="mobile/settings" element={<MobileSettings />} />
                <Route path="mobile/sync" element={<MobileSync />} />
                <Route path="mobile/devices" element={<MobileDevices />} />
                {/* Security Dashboard Routes */}
                <Route path="security/dashboard" element={<PlaceholderPage title="Security Dashboard" />} />

                {/* Invite Management Routes */}
                <Route path="invites" element={<PlaceholderPage title="Invite Management" />} />

                {/* Default route - redirect to dashboard */}
                <Route index element={<SystemOverview />} />
                
                {/* Catch-all route for unmatched paths - with debugging */}
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
    </ErrorBoundary>
  );
}

export default App;

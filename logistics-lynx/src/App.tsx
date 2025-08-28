import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import UnauthorizedPage from './pages/auth/UnauthorizedPage';
import AccessDeniedPage from './pages/auth/AccessDeniedPage';

// Main Dashboard Pages
import ShipperDashboard from './pages/shipper/ShipperDashboard';
import CarrierDashboard from './pages/carrier/CarrierDashboard';
import BrokerDashboard from './pages/broker/BrokerDashboard';
import DriverDashboard from './pages/driver/DriverDashboard';
import OwnerOperatorDashboard from './pages/owner-operator/OwnerOperatorDashboard';

// Super Admin Pages
import SuperAdmin from './components/SuperAdmin';
import SuperAdminDashboard from './pages/super-admin/dashboard/SuperAdminDashboard';
import SystemOverview from './pages/super-admin/dashboard/SystemOverview';
import ActiveUsers from './pages/super-admin/dashboard/ActiveUsers';
import RevenueMetrics from './pages/super-admin/dashboard/RevenueMetrics';
import SystemAlerts from './pages/super-admin/dashboard/SystemAlerts';

// User Management
import UserManagement from './pages/super-admin/user-management/UserManagement';
import UserRoles from './pages/super-admin/user-management/UserRoles';
import UserGroups from './pages/super-admin/user-management/UserGroups';
import UserAnalytics from './pages/super-admin/user-management/UserAnalytics';
import UserOnboarding from './pages/super-admin/user-management/UserOnboarding';

// Analytics
import Analytics from './pages/super-admin/analytics/Analytics';
import AnalyticsDashboard from './pages/super-admin/analytics/AnalyticsDashboard';
import BusinessAnalytics from './pages/super-admin/analytics-reports/BusinessAnalytics';
import PerformanceReports from './pages/super-admin/analytics-reports/PerformanceReports';
import FinancialReports from './pages/super-admin/analytics-reports/FinancialReports';

// Portal Management
import PortalManagement from './pages/super-admin/portal-management/PortalManagement';
import PortalOverview from './pages/super-admin/portal-management/PortalOverview';
import PortalConfiguration from './pages/super-admin/portal-management/PortalConfiguration';
import PortalUsers from './pages/super-admin/portal-management/PortalUsers';
import PortalSecurity from './pages/super-admin/portal-management/PortalSecurity';

// MCP Control Center
import MCPControlCenter from './pages/super-admin/mcp-control-center/MCPControlCenter';
import MCPOverview from './pages/super-admin/mcp-control-center/MCPOverview';
import AgentManagement from './pages/super-admin/mcp-control-center/AgentManagement';
import AIMonitoring from './pages/super-admin/mcp-control-center/AIMonitoring';
import QAIntelligence from './pages/super-admin/mcp-control-center/QAIntelligence';

// Settings
import SettingsOverview from './pages/super-admin/settings/SettingsOverview';
import ProfileSettings from './pages/super-admin/settings/ProfileSettings';
import SecuritySettings from './pages/super-admin/settings/SecuritySettings';
import NotificationSettings from './pages/super-admin/settings/NotificationSettings';
import AppearanceSettings from './pages/super-admin/settings/AppearanceSettings';

// Profile
import ProfileOverview from './pages/super-admin/profile/ProfileOverview';
import PersonalInformation from './pages/super-admin/profile/PersonalInformation';
import UserPreferences from './pages/super-admin/profile/UserPreferences';
import ActivityHistory from './pages/super-admin/profile/ActivityHistory';

// FAB (Floating Action Button)
import FABOverview from './pages/super-admin/fab/FABOverview';
import FABActions from './pages/super-admin/fab/FABActions';
import FABCustomization from './pages/super-admin/fab/FABCustomization';

// Mobile
import MobileOverview from './pages/super-admin/mobile/MobileOverview';
import MobileSettings from './pages/super-admin/mobile/MobileSettings';

// System Administration
import SystemAdministration from './pages/super-admin/system-administration/SystemAdministration';
import SystemSettings from './pages/super-admin/system-settings/SystemSettings';
import PerformanceMonitoring from './pages/super-admin/system-monitoring/PerformanceMonitoring';

// Security
import SecurityCenter from './pages/super-admin/security-center/SecurityCenter';
import SecurityAudit from './pages/super-admin/security/SecurityAudit';

// Business Operations
import BusinessOperations from './pages/super-admin/business-operations/BusinessOperations';
import CustomerManagement from './pages/super-admin/business-operations/CustomerManagement';
import BillingInvoicing from './pages/super-admin/business-operations/BillingInvoicing';

// Development & DevOps
import DevelopmentDevOps from './pages/super-admin/development-devops/DevelopmentDevOps';
import CICDPipeline from './pages/super-admin/development-devops/CICDPipeline';
import EnvironmentManagement from './pages/super-admin/development-devops/EnvironmentManagement';

// Invites
import InviteManagement from './pages/super-admin/invites/InviteManagement';

// Autonomous System
import AutonomousSystem from './pages/super-admin/autonomous-system/AutonomousSystem';
import AutonomousControl from './pages/super-admin/autonomous-system/AutonomousControl';

// MCP Agent Management
import MCPAgentManagement from './pages/super-admin/mcp-agents/MCPAgentManagement';

// QA Testing
import QATestingPanel from './pages/super-admin/qa-testing/QATestingPanel';

// Performance
import PerformanceMonitor from './pages/super-admin/performance/PerformanceMonitor';

// Core TMS
import CoreTMS from './pages/super-admin/core-tms/CoreTMS';

// Core Portals
import CorePortals from './pages/super-admin/core-portals/CorePortals';

// Additional Portals
import AdditionalPortals from './pages/super-admin/additional-portals/AdditionalPortals';

// Agent Workflows
import AgentWorkflows from './pages/super-admin/agent-workflows/AgentWorkflows';

// UI Components
import UIComponentRegistry from './pages/super-admin/ui-components/UIComponentRegistry';

// MCP Agent Control UI
import AgentControlUI from './pages/mcp/AgentControlUI';

function App() {
  console.log('🔍 App.tsx: App component rendering...');
  console.log('🔍 App.tsx: Current location:', window.location.pathname);
  
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/access-denied" element={<AccessDeniedPage />} />
          
          {/* Main Dashboard Routes */}
          <Route path="/shipper" element={<ShipperDashboard />} />
          <Route path="/carrier" element={<CarrierDashboard />} />
          <Route path="/broker" element={<BrokerDashboard />} />
          <Route path="/driver" element={<DriverDashboard />} />
          <Route path="/owner-operator" element={<OwnerOperatorDashboard />} />
          
          {/* Super Admin Routes */}
          <Route path="/super-admin" element={<SuperAdmin />}>
            {/* Dashboard Routes */}
            <Route index element={<SuperAdminDashboard />} />
            <Route path="dashboard" element={<SystemOverview />} />
            <Route path="dashboard/users" element={<ActiveUsers />} />
            <Route path="dashboard/revenue" element={<RevenueMetrics />} />
            <Route path="dashboard/alerts" element={<SystemAlerts />} />
            
            {/* User Management Routes */}
            <Route path="users" element={<UserManagement />} />
            <Route path="users/roles" element={<UserRoles />} />
            <Route path="users/groups" element={<UserGroups />} />
            <Route path="users/analytics" element={<UserAnalytics />} />
            <Route path="users/onboarding" element={<UserOnboarding />} />
            <Route path="users/access" element={<UserManagement />} />
            <Route path="users/billing" element={<UserManagement />} />
            <Route path="users/support" element={<UserManagement />} />
            
            {/* Analytics Routes */}
            <Route path="analytics" element={<Analytics />} />
            <Route path="analytics/dashboard" element={<AnalyticsDashboard />} />
            <Route path="analytics/business" element={<BusinessAnalytics />} />
            <Route path="analytics/performance" element={<PerformanceReports />} />
            <Route path="analytics/financial" element={<FinancialReports />} />
            <Route path="analytics/users" element={<Analytics />} />
            <Route path="analytics/security" element={<Analytics />} />
            <Route path="analytics/operational" element={<Analytics />} />
            <Route path="analytics/custom" element={<Analytics />} />
            <Route path="analytics/export" element={<Analytics />} />
            <Route path="analytics/dashboards" element={<Analytics />} />
            <Route path="analytics/scheduled" element={<Analytics />} />
            
            {/* Portal Management Routes */}
            <Route path="portals" element={<PortalManagement />} />
            <Route path="portals/overview" element={<PortalOverview />} />
            <Route path="portals/configuration" element={<PortalConfiguration />} />
            <Route path="portals/users" element={<PortalUsers />} />
            <Route path="portals/security" element={<PortalSecurity />} />
            <Route path="portals/config" element={<PortalConfiguration />} />
            <Route path="portals/features" element={<PortalManagement />} />
            <Route path="portals/analytics" element={<PortalManagement />} />
            <Route path="portals/billing" element={<PortalManagement />} />
            <Route path="portals/support" element={<PortalManagement />} />
            <Route path="portals/integrations" element={<PortalManagement />} />
            <Route path="portals/backup" element={<PortalManagement />} />
            <Route path="portals/compliance" element={<PortalManagement />} />
            <Route path="portals/deployment" element={<PortalManagement />} />
            
            {/* MCP Control Center Routes */}
            <Route path="mcp" element={<MCPControlCenter />} />
            <Route path="mcp/overview" element={<MCPOverview />} />
            <Route path="mcp/agents" element={<AgentManagement />} />
            <Route path="mcp/monitoring" element={<AIMonitoring />} />
            <Route path="mcp/qa" element={<QAIntelligence />} />
            <Route path="mcp/models" element={<MCPControlCenter />} />
            <Route path="mcp/pipeline" element={<MCPControlCenter />} />
            <Route path="mcp/learning" element={<MCPControlCenter />} />
            <Route path="mcp/analytics" element={<MCPControlCenter />} />
            <Route path="mcp/automation" element={<MCPControlCenter />} />
            <Route path="mcp/integrations" element={<MCPControlCenter />} />
            <Route path="mcp/compliance" element={<MCPControlCenter />} />
            <Route path="mcp/documentation" element={<MCPControlCenter />} />
            <Route path="mcp/support" element={<MCPControlCenter />} />
            
            {/* Settings Routes */}
            <Route path="settings" element={<SettingsOverview />} />
            <Route path="settings/profile" element={<ProfileSettings />} />
            <Route path="settings/security" element={<SecuritySettings />} />
            <Route path="settings/notifications" element={<NotificationSettings />} />
            <Route path="settings/appearance" element={<AppearanceSettings />} />
            <Route path="settings/system" element={<SettingsOverview />} />
            <Route path="settings/preferences" element={<SettingsOverview />} />
            
            {/* Profile Routes */}
            <Route path="profile" element={<ProfileOverview />} />
            <Route path="profile/personal" element={<PersonalInformation />} />
            <Route path="profile/preferences" element={<UserPreferences />} />
            <Route path="profile/activity" element={<ActivityHistory />} />
            <Route path="profile/avatar" element={<ProfileOverview />} />
            <Route path="profile/sessions" element={<ProfileOverview />} />
            <Route path="profile/verification" element={<ProfileOverview />} />
            <Route path="profile/delete" element={<ProfileOverview />} />
            
            {/* FAB Routes */}
            <Route path="fab" element={<FABOverview />} />
            <Route path="fab/actions" element={<FABActions />} />
            <Route path="fab/customization" element={<FABCustomization />} />
            <Route path="fab/templates" element={<FABOverview />} />
            <Route path="fab/analytics" element={<FABOverview />} />
            <Route path="fab/integrations" element={<FABOverview />} />
            
            {/* Mobile Routes */}
            <Route path="mobile" element={<MobileOverview />} />
            <Route path="mobile/settings" element={<MobileSettings />} />
            <Route path="mobile/sync" element={<MobileOverview />} />
            <Route path="mobile/devices" element={<MobileOverview />} />
            
            {/* System Administration Routes */}
            <Route path="system" element={<SystemAdministration />} />
            <Route path="system/settings" element={<SystemSettings />} />
            <Route path="system/monitoring" element={<PerformanceMonitoring />} />
            <Route path="system/database" element={<SystemAdministration />} />
            <Route path="system/api" element={<SystemAdministration />} />
            <Route path="system/deployment" element={<SystemAdministration />} />
            <Route path="system/config" element={<SystemAdministration />} />
            <Route path="system/backup" element={<SystemAdministration />} />
            <Route path="system/security" element={<SystemAdministration />} />
            <Route path="system/integrations" element={<SystemAdministration />} />
            <Route path="system/storage" element={<SystemAdministration />} />
            <Route path="system/email" element={<SystemAdministration />} />
            
            {/* Security Routes */}
            <Route path="security" element={<SecurityCenter />} />
            <Route path="security/audit" element={<SecurityAudit />} />
            <Route path="security/logs" element={<SecurityCenter />} />
            <Route path="security/protection" element={<SecurityCenter />} />
            <Route path="security/api" element={<SecurityCenter />} />
            <Route path="security/permissions" element={<SecurityCenter />} />
            <Route path="security/policies" element={<SecurityCenter />} />
            <Route path="security/incidents" element={<SecurityCenter />} />
            <Route path="security/compliance" element={<SecurityCenter />} />
            
            {/* Business Operations Routes */}
            <Route path="business" element={<BusinessOperations />} />
            <Route path="business/customers" element={<CustomerManagement />} />
            <Route path="business/billing" element={<BillingInvoicing />} />
            <Route path="business/sales" element={<BusinessOperations />} />
            <Route path="business/support" element={<BusinessOperations />} />
            <Route path="business/docs" element={<BusinessOperations />} />
            <Route path="business/marketing" element={<BusinessOperations />} />
            <Route path="business/partners" element={<BusinessOperations />} />
            <Route path="business/legal" element={<BusinessOperations />} />
            
            {/* Development & DevOps Routes */}
            <Route path="devops" element={<DevelopmentDevOps />} />
            <Route path="devops/cicd" element={<CICDPipeline />} />
            <Route path="devops/environments" element={<EnvironmentManagement />} />
            <Route path="dev/repository" element={<DevelopmentDevOps />} />
            <Route path="dev/pipeline" element={<DevelopmentDevOps />} />
            <Route path="dev/testing" element={<DevelopmentDevOps />} />
            <Route path="dev/environments" element={<DevelopmentDevOps />} />
            <Route path="dev/performance" element={<DevelopmentDevOps />} />
            <Route path="dev/security" element={<DevelopmentDevOps />} />
            <Route path="dev/documentation" element={<DevelopmentDevOps />} />
            <Route path="dev/releases" element={<DevelopmentDevOps />} />
            
            {/* Invites Routes */}
            <Route path="invites" element={<InviteManagement />} />
            
            {/* Autonomous System Routes */}
            <Route path="autonomous" element={<AutonomousSystem />} />
            <Route path="autonomous/control" element={<AutonomousControl />} />
            
            {/* MCP Agent Management Routes */}
            <Route path="agents" element={<MCPAgentManagement />} />
            
            {/* QA Testing Routes */}
            <Route path="qa" element={<QATestingPanel />} />
            
            {/* Performance Routes */}
            <Route path="performance" element={<PerformanceMonitor />} />
            
            {/* System Monitoring Routes */}
            <Route path="monitoring" element={<PerformanceMonitor />} />
            <Route path="monitoring/performance" element={<PerformanceMonitor />} />
            <Route path="monitoring/errors" element={<PerformanceMonitor />} />
            <Route path="monitoring/logs" element={<PerformanceMonitor />} />
            <Route path="monitoring/alerts" element={<PerformanceMonitor />} />
            <Route path="monitoring/uptime" element={<PerformanceMonitor />} />
            <Route path="monitoring/resources" element={<PerformanceMonitor />} />
            <Route path="monitoring/network" element={<PerformanceMonitor />} />
            <Route path="monitoring/health" element={<PerformanceMonitor />} />
            
            {/* Core TMS Routes */}
            <Route path="core-tms" element={<CoreTMS />} />
            
            {/* Core Portals Routes */}
            <Route path="core-portals" element={<CorePortals />} />
            
            {/* Additional Portals Routes */}
            <Route path="additional-portals" element={<AdditionalPortals />} />
            
            {/* Agent Workflows Routes */}
            <Route path="workflows" element={<AgentWorkflows />} />
            
            {/* UI Components Routes */}
            <Route path="ui-components" element={<UIComponentRegistry />} />
          </Route>
          
          {/* MCP Agent Control UI */}
          <Route path="/mcp/control" element={<AgentControlUI />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
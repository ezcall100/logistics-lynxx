// App.tsx — Complete Routing Structure Matching Sidebar
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './providers/ThemeProvider';

// ✅ Core components
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const SuperAdmin = lazy(() => import('./components/SuperAdmin'));

// ✅ Dashboard
const SuperAdminDashboard = lazy(() => import('./pages/super-admin/dashboard/SuperAdminDashboard'));

// ✅ UI Playground
const UIPlayground = lazy(() => import('./pages/super-admin/UIPlayground'));

// ✅ User Management - All Components Available
const AllUsers = lazy(() => import('./pages/super-admin/user-management/AllUsers'));
const UserRoles = lazy(() => import('./pages/super-admin/user-management/UserRoles'));
const UserGroups = lazy(() => import('./pages/super-admin/user-management/UserGroups'));
const AccessControl = lazy(() => import('./pages/super-admin/user-management/AccessControl'));
const UserAnalytics = lazy(() => import('./pages/super-admin/user-management/UserAnalytics'));
const BillingManagement = lazy(() => import('./pages/super-admin/user-management/BillingManagement'));
const SupportTickets = lazy(() => import('./pages/super-admin/user-management/SupportTickets'));
const UserOnboarding = lazy(() => import('./pages/super-admin/user-management/UserOnboarding'));

// ✅ System Administration - Working Components Only
const Configuration = lazy(() => import('./pages/super-admin/system-administration/Configuration'));
const DatabaseManagement = lazy(() => import('./pages/super-admin/system-administration/DatabaseManagement'));
const APIManagement = lazy(() => import('./pages/super-admin/system-administration/APIManagement'));
const ServerMonitoring = lazy(() => import('./pages/super-admin/system-administration/ServerMonitoring'));
const DeploymentManagement = lazy(() => import('./pages/super-admin/system-administration/DeploymentManagement'));
const BackupRecovery = lazy(() => import('./pages/super-admin/system-administration/BackupRecovery'));
const SecuritySettings = lazy(() => import('./pages/super-admin/system-administration/SecuritySettings'));
const IntegrationHub = lazy(() => import('./pages/super-admin/system-administration/IntegrationHub'));
const FileStorage = lazy(() => import('./pages/super-admin/system-administration/FileStorage'));
const EmailServices = lazy(() => import('./pages/super-admin/system-administration/EmailServices'));

// ✅ Security Center - All Components Available
const SecurityAudit = lazy(() => import('./pages/super-admin/security/SecurityAudit'));
const AccessLogs = lazy(() => import('./pages/super-admin/security-center/AccessLogs'));
const DataProtection = lazy(() => import('./pages/super-admin/security-center/DataProtection'));
const APISecurity = lazy(() => import('./pages/super-admin/security-center/APISecurity'));
const UserPermissions = lazy(() => import('./pages/super-admin/security-center/UserPermissions'));
const SecurityPolicies = lazy(() => import('./pages/super-admin/security-center/SecurityPolicies'));
const IncidentResponse = lazy(() => import('./pages/super-admin/security-center/IncidentResponse'));
const ComplianceManagement = lazy(() => import('./pages/super-admin/security-center/ComplianceManagement'));

// ✅ System Monitoring - All Components Available
const PerformanceMonitoring = lazy(() => import('./pages/super-admin/system-monitoring/PerformanceMonitoring'));
const ErrorTracking = lazy(() => import('./pages/super-admin/system-monitoring/ErrorTracking'));
const LogAnalysis = lazy(() => import('./pages/super-admin/system-monitoring/LogAnalysis'));
const AlertManagement = lazy(() => import('./pages/super-admin/system-monitoring/AlertManagement'));
const UptimeMonitoring = lazy(() => import('./pages/super-admin/system-monitoring/UptimeMonitoring'));
const ResourceUsage = lazy(() => import('./pages/super-admin/system-monitoring/ResourceUsage'));
const NetworkMonitoring = lazy(() => import('./pages/super-admin/system-monitoring/NetworkMonitoring'));
const HealthChecks = lazy(() => import('./pages/super-admin/system-monitoring/HealthChecks'));

// ✅ Portal Management - All Components Available
const PortalOverview = lazy(() => import('./pages/super-admin/portal-management/PortalOverview'));
const PortalConfiguration = lazy(() => import('./pages/super-admin/portal-management/PortalConfiguration'));
const PortalUsers = lazy(() => import('./pages/super-admin/portal-management/PortalUsers'));
const FeatureManagement = lazy(() => import('./pages/super-admin/portal-management/FeatureManagement'));
const PortalAnalytics = lazy(() => import('./pages/super-admin/portal-management/PortalAnalytics'));
const PortalBilling = lazy(() => import('./pages/super-admin/portal-management/PortalBilling'));
const PortalSupport = lazy(() => import('./pages/super-admin/portal-management/PortalSupport'));
const PortalIntegrations = lazy(() => import('./pages/super-admin/portal-management/PortalIntegrations'));
const PortalBackup = lazy(() => import('./pages/super-admin/portal-management/PortalBackup'));
const PortalSecurity = lazy(() => import('./pages/super-admin/portal-management/PortalSecurity'));
const PortalCompliance = lazy(() => import('./pages/super-admin/portal-management/PortalCompliance'));
const PortalDeployment = lazy(() => import('./pages/super-admin/portal-management/PortalDeployment'));

// ✅ Analytics & Reports - All Components Available
const BusinessAnalytics = lazy(() => import('./pages/super-admin/analytics-reports/BusinessAnalytics'));
const UserAnalyticsReports = lazy(() => import('./pages/super-admin/analytics-reports/UserAnalytics'));
const PerformanceReports = lazy(() => import('./pages/super-admin/analytics-reports/PerformanceReports'));
const SecurityReports = lazy(() => import('./pages/super-admin/analytics-reports/SecurityReports'));
const FinancialReports = lazy(() => import('./pages/super-admin/analytics-reports/FinancialReports'));
const OperationalReports = lazy(() => import('./pages/super-admin/analytics-reports/OperationalReports'));
const CustomReports = lazy(() => import('./pages/super-admin/analytics-reports/CustomReports'));
const DataExport = lazy(() => import('./pages/super-admin/analytics-reports/DataExport'));
const DashboardBuilder = lazy(() => import('./pages/super-admin/analytics-reports/DashboardBuilder'));
const ScheduledReports = lazy(() => import('./pages/super-admin/analytics-reports/ScheduledReports'));

// ✅ MCP Control Center - All Components Available
const MCPOverview = lazy(() => import('./pages/super-admin/mcp-control-center/MCPOverview'));
const AgentManagement = lazy(() => import('./pages/super-admin/mcp-control-center/AgentManagement'));
const AIModels = lazy(() => import('./pages/super-admin/mcp-control-center/AIModels'));
const DataPipeline = lazy(() => import('./pages/super-admin/mcp-control-center/DataPipeline'));
const MachineLearning = lazy(() => import('./pages/super-admin/mcp-control-center/MachineLearning'));
const AIAnalytics = lazy(() => import('./pages/super-admin/mcp-control-center/AIAnalytics'));
const AutomationRules = lazy(() => import('./pages/super-admin/mcp-control-center/AutomationRules'));
const AIIntegrations = lazy(() => import('./pages/super-admin/mcp-control-center/AIIntegrations'));
const AIMonitoring = lazy(() => import('./pages/super-admin/mcp-control-center/AIMonitoring'));
const AICompliance = lazy(() => import('./pages/super-admin/mcp-control-center/AICompliance'));
const AIDocumentation = lazy(() => import('./pages/super-admin/mcp-control-center/AIDocumentation'));
const AISupport = lazy(() => import('./pages/super-admin/mcp-control-center/AISupport'));

// ✅ Phase 2: MCP Orchestration
const Phase2Orchestration = lazy(() => import('./pages/super-admin/phase2-orchestration'));

// ✅ Business Operations - All Components Available
const CustomerManagement = lazy(() => import('./pages/super-admin/business-operations/CustomerManagement'));
const SalesPipeline = lazy(() => import('./pages/super-admin/business-operations/SalesPipeline'));
const BillingInvoicing = lazy(() => import('./pages/super-admin/business-operations/BillingInvoicing'));
const SupportManagement = lazy(() => import('./pages/super-admin/business-operations/SupportManagement'));
const Documentation = lazy(() => import('./pages/super-admin/business-operations/Documentation'));
const MarketingTools = lazy(() => import('./pages/super-admin/business-operations/MarketingTools'));
const PartnerManagement = lazy(() => import('./pages/super-admin/business-operations/PartnerManagement'));
const LegalCompliance = lazy(() => import('./pages/super-admin/business-operations/LegalCompliance'));

// ✅ Development & DevOps - All Components Available
const CodeRepository = lazy(() => import('./pages/super-admin/development-devops/CodeRepository'));
const CICDPipeline = lazy(() => import('./pages/super-admin/development-devops/CICDPipeline'));
const TestingSuite = lazy(() => import('./pages/super-admin/development-devops/TestingSuite'));
const EnvironmentManagement = lazy(() => import('./pages/super-admin/development-devops/EnvironmentManagement'));
const PerformanceTesting = lazy(() => import('./pages/super-admin/development-devops/PerformanceTesting'));
const SecurityTesting = lazy(() => import('./pages/super-admin/development-devops/SecurityTesting'));
const DevDocumentation = lazy(() => import('./pages/super-admin/development-devops/DevDocumentation'));
const ReleaseManagement = lazy(() => import('./pages/super-admin/development-devops/ReleaseManagement'));

// ✅ Settings - Working Components Only
const SettingsOverview = lazy(() => import('./pages/super-admin/settings/SettingsOverview'));
const ProfileSettings = lazy(() => import('./pages/super-admin/settings/ProfileSettings'));
const SystemSettings = lazy(() => import('./pages/super-admin/settings/SystemSettings'));
const UserPreferences = lazy(() => import('./pages/super-admin/settings/UserPreferences'));
const SecuritySettingsPage = lazy(() => import('./pages/super-admin/settings/SecuritySettings'));

// ✅ Profile - Working Components Only
const ProfileOverview = lazy(() => import('./pages/super-admin/profile/ProfileOverview'));
const PersonalInformation = lazy(() => import('./pages/super-admin/profile/PersonalInformation'));
const AvatarMedia = lazy(() => import('./pages/super-admin/profile/AvatarMedia'));
const UserPreferencesProfile = lazy(() => import('./pages/super-admin/profile/UserPreferences'));
const ActivityHistory = lazy(() => import('./pages/super-admin/profile/ActivityHistory'));
const ActiveSessions = lazy(() => import('./pages/super-admin/profile/ActiveSessions'));
const AccountVerification = lazy(() => import('./pages/super-admin/profile/AccountVerification'));
const AccountDeletion = lazy(() => import('./pages/super-admin/profile/AccountDeletion'));

// ✅ FAB Actions - Working Components Only
const FABOverview = lazy(() => import('./pages/super-admin/fab/FABOverview'));
const FABActions = lazy(() => import('./pages/super-admin/fab/FABActions'));
const FABCustomization = lazy(() => import('./pages/super-admin/fab/FABCustomization'));
// const FABTemplates = lazy(() => import('./pages/super-admin/fab/FABTemplates')); // Has JSX errors
// const FABAnalytics = lazy(() => import('./pages/super-admin/fab/FABAnalytics')); // Has JSX errors
// const FABIntegrations = lazy(() => import('./pages/super-admin/fab/FABIntegrations')); // Has JSX errors

function App() {
  console.log('✅ App.tsx rendering...');
  console.log('🌐 Current route:', window.location.pathname);
  console.log('🔍 Auth state check:', localStorage.getItem('auth_user'));
  
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <Suspense fallback={<div style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
          fontSize: '18px',
          color: '#666'
        }}>Loading...</div>}>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Super Admin Routes - Complete Structure Matching Sidebar */}
          <Route path="/super-admin" element={<SuperAdmin />}>
            {/* Dashboard */}
            <Route index element={<SuperAdminDashboard />} />
            <Route path="dashboard" element={<SuperAdminDashboard />} />
            
            {/* UI Playground */}
            <Route path="ui-playground" element={<UIPlayground />} />
            
            {/* User Management - Complete Routes Matching Sidebar */}
            <Route path="users" element={<AllUsers />} />
            <Route path="users/roles" element={<UserRoles />} />
            <Route path="users/groups" element={<UserGroups />} />
            <Route path="users/access" element={<AccessControl />} />
            <Route path="users/analytics" element={<UserAnalytics />} />
            <Route path="users/billing" element={<BillingManagement />} />
            <Route path="users/support" element={<SupportTickets />} />
            <Route path="users/onboarding" element={<UserOnboarding />} />
            
            {/* System Administration - Working Routes Only */}
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
            
            {/* Security Center - Complete Routes Matching Sidebar */}
            <Route path="security/audit" element={<SecurityAudit />} />
            <Route path="security/logs" element={<AccessLogs />} />
            <Route path="security/protection" element={<DataProtection />} />
            <Route path="security/api" element={<APISecurity />} />
            <Route path="security/permissions" element={<UserPermissions />} />
            <Route path="security/policies" element={<SecurityPolicies />} />
            <Route path="security/incidents" element={<IncidentResponse />} />
            <Route path="security/compliance" element={<ComplianceManagement />} />
            
            {/* System Monitoring - Complete Routes Matching Sidebar */}
            <Route path="monitoring/performance" element={<PerformanceMonitoring />} />
            <Route path="monitoring/errors" element={<ErrorTracking />} />
            <Route path="monitoring/logs" element={<LogAnalysis />} />
            <Route path="monitoring/alerts" element={<AlertManagement />} />
            <Route path="monitoring/uptime" element={<UptimeMonitoring />} />
            <Route path="monitoring/resources" element={<ResourceUsage />} />
            <Route path="monitoring/network" element={<NetworkMonitoring />} />
            <Route path="monitoring/health" element={<HealthChecks />} />
            
            {/* Portal Management - Complete Routes Matching Sidebar */}
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
            
            {/* Analytics & Reports - Complete Routes Matching Sidebar */}
            <Route path="analytics/business" element={<BusinessAnalytics />} />
            <Route path="analytics/users" element={<UserAnalyticsReports />} />
            <Route path="analytics/performance" element={<PerformanceReports />} />
            <Route path="analytics/security" element={<SecurityReports />} />
            <Route path="analytics/financial" element={<FinancialReports />} />
            <Route path="analytics/operational" element={<OperationalReports />} />
            <Route path="analytics/custom" element={<CustomReports />} />
            <Route path="analytics/export" element={<DataExport />} />
            <Route path="analytics/dashboards" element={<DashboardBuilder />} />
            <Route path="analytics/scheduled" element={<ScheduledReports />} />
            
            {/* MCP Control Center - Complete Routes Matching Sidebar */}
            <Route path="mcp" element={<MCPOverview />} />
            <Route path="mcp/agents" element={<AgentManagement />} />
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
            
            {/* Phase 2: MCP Orchestration */}
            <Route path="phase2-orchestration" element={<Phase2Orchestration />} />
            
            {/* Business Operations - Complete Routes Matching Sidebar */}
            <Route path="business/customers" element={<CustomerManagement />} />
            <Route path="business/sales" element={<SalesPipeline />} />
            <Route path="business/billing" element={<BillingInvoicing />} />
            <Route path="business/support" element={<SupportManagement />} />
            <Route path="business/docs" element={<Documentation />} />
            <Route path="business/marketing" element={<MarketingTools />} />
            <Route path="business/partners" element={<PartnerManagement />} />
            <Route path="business/legal" element={<LegalCompliance />} />
            
            {/* Development & DevOps - Complete Routes Matching Sidebar */}
            <Route path="dev/repository" element={<CodeRepository />} />
            <Route path="dev/pipeline" element={<CICDPipeline />} />
            <Route path="dev/testing" element={<TestingSuite />} />
            <Route path="dev/environments" element={<EnvironmentManagement />} />
            <Route path="dev/performance" element={<PerformanceTesting />} />
            <Route path="dev/security" element={<SecurityTesting />} />
            <Route path="dev/documentation" element={<DevDocumentation />} />
            <Route path="dev/releases" element={<ReleaseManagement />} />
            
            {/* Settings - Working Routes Only */}
            <Route path="settings" element={<SettingsOverview />} />
            <Route path="settings/profile" element={<ProfileSettings />} />
            <Route path="settings/system" element={<SystemSettings />} />
            <Route path="settings/preferences" element={<UserPreferences />} />
            <Route path="settings/security" element={<SecuritySettingsPage />} />
            
            {/* Profile - Working Routes Only */}
            <Route path="profile" element={<ProfileOverview />} />
            <Route path="profile/personal" element={<PersonalInformation />} />
            <Route path="profile/avatar" element={<AvatarMedia />} />
            <Route path="profile/preferences" element={<UserPreferencesProfile />} />
            <Route path="profile/activity" element={<ActivityHistory />} />
            <Route path="profile/sessions" element={<ActiveSessions />} />
            <Route path="profile/verification" element={<AccountVerification />} />
            <Route path="profile/delete" element={<AccountDeletion />} />
            
            {/* FAB Actions - Working Routes Only */}
            <Route path="fab" element={<FABOverview />} />
            <Route path="fab/actions" element={<FABActions />} />
            <Route path="fab/customization" element={<FABCustomization />} />
            {/* <Route path="fab/templates" element={<FABTemplates />} /> */} {/* Has JSX errors */}
            {/* <Route path="fab/analytics" element={<FABAnalytics />} /> */} {/* Has JSX errors */}
            {/* <Route path="fab/integrations" element={<FABIntegrations />} /> */} {/* Has JSX errors */}
          </Route>
          
          {/* Catch all fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        </Suspense>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
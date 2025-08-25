import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Dashboard Pages
import SystemOverview from './dashboard/SystemOverview';
import ActiveUsers from './dashboard/ActiveUsers';
import RevenueMetrics from './dashboard/RevenueMetrics';
import SystemAlerts from './dashboard/SystemAlerts';

// Settings Pages
import ProfileSettings from './settings/ProfileSettings';
import SettingsOverview from './settings/SettingsOverview';
import SystemSettings from './settings/SystemSettings';
import UserPreferences from './settings/UserPreferences';
import SecuritySettings from './settings/SecuritySettings';

// MCP Pages
import MCPOverview from './mcp-control-center/MCPOverview';
import AgentManagement from './mcp-control-center/AgentManagement';
import AIModels from './mcp-control-center/AIModels';
import DataPipeline from './mcp-control-center/DataPipeline';
import MachineLearning from './mcp-control-center/MachineLearning';
import AIAnalytics from './mcp-control-center/AIAnalytics';
import AutomationRules from './mcp-control-center/AutomationRules';
import AIIntegrations from './mcp-control-center/AIIntegrations';
import AIMonitoring from './mcp-control-center/AIMonitoring';
import AICompliance from './mcp-control-center/AICompliance';
import AIDocumentation from './mcp-control-center/AIDocumentation';
import AISupport from './mcp-control-center/AISupport';

// User Management Pages
import AllUsers from './user-management/AllUsers';
import UserRoles from './user-management/UserRoles';
import UserGroups from './user-management/UserGroups';
import AccessControl from './user-management/AccessControl';
import UserAnalytics from './user-management/UserAnalytics';
import BillingManagement from './user-management/BillingManagement';
import SupportTickets from './user-management/SupportTickets';
import UserOnboarding from './user-management/UserOnboarding';

// System Administration Pages
import DatabaseManagement from './system-administration/DatabaseManagement';
import APIManagement from './system-administration/APIManagement';
import ServerMonitoring from './system-administration/ServerMonitoring';
import DeploymentManagement from './system-administration/DeploymentManagement';
import Configuration from './system-administration/Configuration';
import BackupRecovery from './system-administration/BackupRecovery';
import SystemSecuritySettings from './system-administration/SecuritySettings';
import IntegrationHub from './system-administration/IntegrationHub';
import FileStorage from './system-administration/FileStorage';
import EmailServices from './system-administration/EmailServices';

// Security Center Pages
import SecurityAudit from './security-center/SecurityAudit';
import AccessLogs from './security-center/AccessLogs';
import DataProtection from './security-center/DataProtection';
import APISecurity from './security-center/APISecurity';
import UserPermissions from './security-center/UserPermissions';
import SecurityPolicies from './security-center/SecurityPolicies';
import IncidentResponse from './security-center/IncidentResponse';
import ComplianceManagement from './security-center/ComplianceManagement';

// System Monitoring Pages
import PerformanceMonitoring from './system-monitoring/PerformanceMonitoring';
import ErrorTracking from './system-monitoring/ErrorTracking';
import LogAnalysis from './system-monitoring/LogAnalysis';
import AlertManagement from './system-monitoring/AlertManagement';
import UptimeMonitoring from './system-monitoring/UptimeMonitoring';
import ResourceUsage from './system-monitoring/ResourceUsage';
import NetworkMonitoring from './system-monitoring/NetworkMonitoring';
import HealthChecks from './system-monitoring/HealthChecks';

// Portal Management Pages
import PortalOverview from './portal-management/PortalOverview';
import PortalConfiguration from './portal-management/PortalConfiguration';
import PortalUsers from './portal-management/PortalUsers';
import FeatureManagement from './portal-management/FeatureManagement';
import PortalAnalytics from './portal-management/PortalAnalytics';
import PortalBilling from './portal-management/PortalBilling';
import PortalSupport from './portal-management/PortalSupport';
import PortalIntegrations from './portal-management/PortalIntegrations';
import PortalBackup from './portal-management/PortalBackup';
import PortalSecurity from './portal-management/PortalSecurity';
import PortalCompliance from './portal-management/PortalCompliance';
import PortalDeployment from './portal-management/PortalDeployment';

// Analytics & Reports Pages
import BusinessAnalytics from './analytics-reports/BusinessAnalytics';
import AnalyticsUserAnalytics from './analytics-reports/UserAnalytics';
import PerformanceReports from './analytics-reports/PerformanceReports';
import SecurityReports from './analytics-reports/SecurityReports';
import FinancialReports from './analytics-reports/FinancialReports';
import OperationalReports from './analytics-reports/OperationalReports';
import CustomReports from './analytics-reports/CustomReports';
import DataExport from './analytics-reports/DataExport';
import DashboardBuilder from './analytics-reports/DashboardBuilder';
import ScheduledReports from './analytics-reports/ScheduledReports';

// Business Operations Pages
import CustomerManagement from './business-operations/CustomerManagement';
import SalesPipeline from './business-operations/SalesPipeline';
import BillingInvoicing from './business-operations/BillingInvoicing';
import SupportManagement from './business-operations/SupportManagement';
import Documentation from './business-operations/Documentation';
import MarketingTools from './business-operations/MarketingTools';
import PartnerManagement from './business-operations/PartnerManagement';
import LegalCompliance from './business-operations/LegalCompliance';

// Development & DevOps Pages
import CodeRepository from './development-devops/CodeRepository';
import CICDPipeline from './development-devops/CICDPipeline';
import TestingSuite from './development-devops/TestingSuite';
import EnvironmentManagement from './development-devops/EnvironmentManagement';
import PerformanceTesting from './development-devops/PerformanceTesting';
import SecurityTesting from './development-devops/SecurityTesting';
import DevDocumentation from './development-devops/DevDocumentation';
import ReleaseManagement from './development-devops/ReleaseManagement';

// Simple placeholder components for other pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {title}
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          This page is under development. Coming soon!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Feature 1</h3>
            <p className="text-blue-700">Advanced functionality coming soon</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Feature 2</h3>
            <p className="text-green-700">Enhanced capabilities in development</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Feature 3</h3>
            <p className="text-purple-700">AI-powered features coming soon</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SuperAdminRoutes: React.FC = () => {
  console.log('🔍 SuperAdminRoutes rendering...');
  
  // Get current location for debugging
  const location = window.location.pathname;
  console.log('🔍 Current location:', location);
  console.log('🔍 Expected routes:', [
    '/users', '/users/roles', '/settings', '/mcp', '/dashboard'
  ]);
  
  return (
    <Routes>
      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<SystemOverview />} />
      <Route path="/dashboard/users" element={<ActiveUsers />} />
      <Route path="/dashboard/revenue" element={<RevenueMetrics />} />
      <Route path="/dashboard/alerts" element={<SystemAlerts />} />

      {/* User Management Routes */}
      <Route path="/users" element={<AllUsers />} />
      <Route path="/users/roles" element={<UserRoles />} />
      <Route path="/users/groups" element={<UserGroups />} />
      <Route path="/users/access" element={<AccessControl />} />
      <Route path="/users/analytics" element={<UserAnalytics />} />
      <Route path="/users/billing" element={<BillingManagement />} />
      <Route path="/users/support" element={<SupportTickets />} />
      <Route path="/users/onboarding" element={<UserOnboarding />} />

      {/* System Administration Routes */}
      <Route path="/system/database" element={<DatabaseManagement />} />
      <Route path="/system/api" element={<APIManagement />} />
      <Route path="/system/monitoring" element={<ServerMonitoring />} />
      <Route path="/system/deployment" element={<DeploymentManagement />} />
      <Route path="/system/config" element={<Configuration />} />
      <Route path="/system/backup" element={<BackupRecovery />} />
      <Route path="/system/security" element={<SystemSecuritySettings />} />
      <Route path="/system/integrations" element={<IntegrationHub />} />
      <Route path="/system/storage" element={<FileStorage />} />
      <Route path="/system/email" element={<EmailServices />} />

      {/* Security Center Routes */}
      <Route path="/security/audit" element={<SecurityAudit />} />
      <Route path="/security/logs" element={<AccessLogs />} />
      <Route path="/security/protection" element={<DataProtection />} />
      <Route path="/security/api" element={<APISecurity />} />
      <Route path="/security/permissions" element={<UserPermissions />} />
      <Route path="/security/policies" element={<SecurityPolicies />} />
      <Route path="/security/incidents" element={<IncidentResponse />} />
      <Route path="/security/compliance" element={<ComplianceManagement />} />

      {/* System Monitoring Routes */}
      <Route path="/monitoring/performance" element={<PerformanceMonitoring />} />
      <Route path="/monitoring/errors" element={<ErrorTracking />} />
      <Route path="/monitoring/logs" element={<LogAnalysis />} />
      <Route path="/monitoring/alerts" element={<AlertManagement />} />
      <Route path="/monitoring/uptime" element={<UptimeMonitoring />} />
      <Route path="/monitoring/resources" element={<ResourceUsage />} />
      <Route path="/monitoring/network" element={<NetworkMonitoring />} />
      <Route path="/monitoring/health" element={<HealthChecks />} />

      {/* Portal Management Routes */}
      <Route path="/portals" element={<PortalOverview />} />
      <Route path="/portals/config" element={<PortalConfiguration />} />
      <Route path="/portals/users" element={<PortalUsers />} />
      <Route path="/portals/features" element={<FeatureManagement />} />
      <Route path="/portals/analytics" element={<PortalAnalytics />} />
      <Route path="/portals/billing" element={<PortalBilling />} />
      <Route path="/portals/support" element={<PortalSupport />} />
      <Route path="/portals/integrations" element={<PortalIntegrations />} />
      <Route path="/portals/backup" element={<PortalBackup />} />
      <Route path="/portals/security" element={<PortalSecurity />} />
      <Route path="/portals/compliance" element={<PortalCompliance />} />
      <Route path="/portals/deployment" element={<PortalDeployment />} />

      {/* Analytics & Reports Routes */}
      <Route path="/analytics/business" element={<BusinessAnalytics />} />
      <Route path="/analytics/users" element={<AnalyticsUserAnalytics />} />
      <Route path="/analytics/performance" element={<PerformanceReports />} />
      <Route path="/analytics/security" element={<SecurityReports />} />
      <Route path="/analytics/financial" element={<FinancialReports />} />
      <Route path="/analytics/operational" element={<OperationalReports />} />
      <Route path="/analytics/custom" element={<CustomReports />} />
      <Route path="/analytics/export" element={<DataExport />} />
      <Route path="/analytics/dashboards" element={<DashboardBuilder />} />
      <Route path="/analytics/scheduled" element={<ScheduledReports />} />

      {/* MCP Control Center Routes */}
      <Route path="/mcp" element={<MCPOverview />} />
      <Route path="/mcp/agents" element={<AgentManagement />} />
      <Route path="/mcp/models" element={<AIModels />} />
      <Route path="/mcp/pipeline" element={<DataPipeline />} />
      <Route path="/mcp/learning" element={<MachineLearning />} />
      <Route path="/mcp/analytics" element={<AIAnalytics />} />
      <Route path="/mcp/automation" element={<AutomationRules />} />
      <Route path="/mcp/integrations" element={<AIIntegrations />} />
      <Route path="/mcp/monitoring" element={<AIMonitoring />} />
      <Route path="/mcp/compliance" element={<AICompliance />} />
      <Route path="/mcp/documentation" element={<AIDocumentation />} />
      <Route path="/mcp/support" element={<AISupport />} />

      {/* Business Operations Routes */}
      <Route path="/business/customers" element={<CustomerManagement />} />
      <Route path="/business/sales" element={<SalesPipeline />} />
      <Route path="/business/billing" element={<BillingInvoicing />} />
      <Route path="/business/support" element={<SupportManagement />} />
      <Route path="/business/docs" element={<Documentation />} />
      <Route path="/business/marketing" element={<MarketingTools />} />
      <Route path="/business/partners" element={<PartnerManagement />} />
      <Route path="/business/legal" element={<LegalCompliance />} />

      {/* Development & DevOps Routes */}
      <Route path="/dev/repository" element={<CodeRepository />} />
      <Route path="/dev/pipeline" element={<CICDPipeline />} />
      <Route path="/dev/testing" element={<TestingSuite />} />
      <Route path="/dev/environments" element={<EnvironmentManagement />} />
      <Route path="/dev/performance" element={<PerformanceTesting />} />
      <Route path="/dev/security" element={<SecurityTesting />} />
      <Route path="/dev/documentation" element={<DevDocumentation />} />
      <Route path="/dev/releases" element={<ReleaseManagement />} />

      {/* Settings Routes */}
      <Route path="/settings" element={<SettingsOverview />} />
      <Route path="/settings/profile" element={<ProfileSettings />} />
      <Route path="/settings/system" element={<SystemSettings />} />
      <Route path="/settings/preferences" element={<UserPreferences />} />
      <Route path="/settings/security" element={<SecuritySettings />} />

      {/* Security Dashboard Routes */}
      <Route path="/security/dashboard" element={<PlaceholderPage title="Security Dashboard" />} />

      {/* Invite Management Routes */}
      <Route path="/invites" element={<PlaceholderPage title="Invite Management" />} />

      {/* Default route - redirect to dashboard */}
      <Route path="/" element={<SystemOverview />} />
      
      {/* Dashboard default route */}
      <Route path="/dashboard" element={<SystemOverview />} />
      
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
    </Routes>
  );
};

export default SuperAdminRoutes;

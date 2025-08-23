import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Dashboard Pages
import SystemOverview from './dashboard/SystemOverview';
import ActiveUsers from './dashboard/ActiveUsers';
import RevenueMetrics from './dashboard/RevenueMetrics';
import SystemAlerts from './dashboard/SystemAlerts';

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
import SecuritySettings from './system-administration/SecuritySettings';
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
import UserAnalytics from './analytics-reports/UserAnalytics';
import PerformanceReports from './analytics-reports/PerformanceReports';
import SecurityReports from './analytics-reports/SecurityReports';
import FinancialReports from './analytics-reports/FinancialReports';
import OperationalReports from './analytics-reports/OperationalReports';
import CustomReports from './analytics-reports/CustomReports';
import DataExport from './analytics-reports/DataExport';
import DashboardBuilder from './analytics-reports/DashboardBuilder';
import ScheduledReports from './analytics-reports/ScheduledReports';

// MCP Control Center Pages
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

const SuperAdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Dashboard Routes */}
      <Route path="/super-admin/dashboard" element={<SystemOverview />} />
      <Route path="/super-admin/dashboard/users" element={<ActiveUsers />} />
      <Route path="/super-admin/dashboard/revenue" element={<RevenueMetrics />} />
      <Route path="/super-admin/dashboard/alerts" element={<SystemAlerts />} />

      {/* User Management Routes */}
      <Route path="/super-admin/users" element={<AllUsers />} />
      <Route path="/super-admin/users/roles" element={<UserRoles />} />
      <Route path="/super-admin/users/groups" element={<UserGroups />} />
      <Route path="/super-admin/users/access" element={<AccessControl />} />
      <Route path="/super-admin/users/analytics" element={<UserAnalytics />} />
      <Route path="/super-admin/users/billing" element={<BillingManagement />} />
      <Route path="/super-admin/users/support" element={<SupportTickets />} />
      <Route path="/super-admin/users/onboarding" element={<UserOnboarding />} />

      {/* System Administration Routes */}
      <Route path="/super-admin/system/database" element={<DatabaseManagement />} />
      <Route path="/super-admin/system/api" element={<APIManagement />} />
      <Route path="/super-admin/system/monitoring" element={<ServerMonitoring />} />
      <Route path="/super-admin/system/deployment" element={<DeploymentManagement />} />
      <Route path="/super-admin/system/config" element={<Configuration />} />
      <Route path="/super-admin/system/backup" element={<BackupRecovery />} />
      <Route path="/super-admin/system/security" element={<SecuritySettings />} />
      <Route path="/super-admin/system/integrations" element={<IntegrationHub />} />
      <Route path="/super-admin/system/storage" element={<FileStorage />} />
      <Route path="/super-admin/system/email" element={<EmailServices />} />

      {/* Security Center Routes */}
      <Route path="/super-admin/security/audit" element={<SecurityAudit />} />
      <Route path="/super-admin/security/logs" element={<AccessLogs />} />
      <Route path="/super-admin/security/protection" element={<DataProtection />} />
      <Route path="/super-admin/security/api" element={<APISecurity />} />
      <Route path="/super-admin/security/permissions" element={<UserPermissions />} />
      <Route path="/super-admin/security/policies" element={<SecurityPolicies />} />
      <Route path="/super-admin/security/incidents" element={<IncidentResponse />} />
      <Route path="/super-admin/security/compliance" element={<ComplianceManagement />} />

      {/* System Monitoring Routes */}
      <Route path="/super-admin/monitoring/performance" element={<PerformanceMonitoring />} />
      <Route path="/super-admin/monitoring/errors" element={<ErrorTracking />} />
      <Route path="/super-admin/monitoring/logs" element={<LogAnalysis />} />
      <Route path="/super-admin/monitoring/alerts" element={<AlertManagement />} />
      <Route path="/super-admin/monitoring/uptime" element={<UptimeMonitoring />} />
      <Route path="/super-admin/monitoring/resources" element={<ResourceUsage />} />
      <Route path="/super-admin/monitoring/network" element={<NetworkMonitoring />} />
      <Route path="/super-admin/monitoring/health" element={<HealthChecks />} />

      {/* Portal Management Routes */}
      <Route path="/super-admin/portals" element={<PortalOverview />} />
      <Route path="/super-admin/portals/config" element={<PortalConfiguration />} />
      <Route path="/super-admin/portals/users" element={<PortalUsers />} />
      <Route path="/super-admin/portals/features" element={<FeatureManagement />} />
      <Route path="/super-admin/portals/analytics" element={<PortalAnalytics />} />
      <Route path="/super-admin/portals/billing" element={<PortalBilling />} />
      <Route path="/super-admin/portals/support" element={<PortalSupport />} />
      <Route path="/super-admin/portals/integrations" element={<PortalIntegrations />} />
      <Route path="/super-admin/portals/backup" element={<PortalBackup />} />
      <Route path="/super-admin/portals/security" element={<PortalSecurity />} />
      <Route path="/super-admin/portals/compliance" element={<PortalCompliance />} />
      <Route path="/super-admin/portals/deployment" element={<PortalDeployment />} />

      {/* Analytics & Reports Routes */}
      <Route path="/super-admin/analytics/business" element={<BusinessAnalytics />} />
      <Route path="/super-admin/analytics/users" element={<UserAnalytics />} />
      <Route path="/super-admin/analytics/performance" element={<PerformanceReports />} />
      <Route path="/super-admin/analytics/security" element={<SecurityReports />} />
      <Route path="/super-admin/analytics/financial" element={<FinancialReports />} />
      <Route path="/super-admin/analytics/operational" element={<OperationalReports />} />
      <Route path="/super-admin/analytics/custom" element={<CustomReports />} />
      <Route path="/super-admin/analytics/export" element={<DataExport />} />
      <Route path="/super-admin/analytics/dashboards" element={<DashboardBuilder />} />
      <Route path="/super-admin/analytics/scheduled" element={<ScheduledReports />} />

      {/* MCP Control Center Routes */}
      <Route path="/super-admin/mcp" element={<MCPOverview />} />
      <Route path="/super-admin/mcp/agents" element={<AgentManagement />} />
      <Route path="/super-admin/mcp/models" element={<AIModels />} />
      <Route path="/super-admin/mcp/pipeline" element={<DataPipeline />} />
      <Route path="/super-admin/mcp/learning" element={<MachineLearning />} />
      <Route path="/super-admin/mcp/analytics" element={<AIAnalytics />} />
      <Route path="/super-admin/mcp/automation" element={<AutomationRules />} />
      <Route path="/super-admin/mcp/integrations" element={<AIIntegrations />} />
      <Route path="/super-admin/mcp/monitoring" element={<AIMonitoring />} />
      <Route path="/super-admin/mcp/compliance" element={<AICompliance />} />
      <Route path="/super-admin/mcp/documentation" element={<AIDocumentation />} />
      <Route path="/super-admin/mcp/support" element={<AISupport />} />

      {/* Business Operations Routes */}
      <Route path="/super-admin/business/customers" element={<CustomerManagement />} />
      <Route path="/super-admin/business/sales" element={<SalesPipeline />} />
      <Route path="/super-admin/business/billing" element={<BillingInvoicing />} />
      <Route path="/super-admin/business/support" element={<SupportManagement />} />
      <Route path="/super-admin/business/docs" element={<Documentation />} />
      <Route path="/super-admin/business/marketing" element={<MarketingTools />} />
      <Route path="/super-admin/business/partners" element={<PartnerManagement />} />
      <Route path="/super-admin/business/legal" element={<LegalCompliance />} />

      {/* Development & DevOps Routes */}
      <Route path="/super-admin/dev/repository" element={<CodeRepository />} />
      <Route path="/super-admin/dev/pipeline" element={<CICDPipeline />} />
      <Route path="/super-admin/dev/testing" element={<TestingSuite />} />
      <Route path="/super-admin/dev/environments" element={<EnvironmentManagement />} />
      <Route path="/super-admin/dev/performance" element={<PerformanceTesting />} />
      <Route path="/super-admin/dev/security" element={<SecurityTesting />} />
      <Route path="/super-admin/dev/documentation" element={<DevDocumentation />} />
      <Route path="/super-admin/dev/releases" element={<ReleaseManagement />} />

      {/* Default route - redirect to dashboard */}
      <Route path="/super-admin" element={<SystemOverview />} />
    </Routes>
  );
};

export default SuperAdminRoutes;

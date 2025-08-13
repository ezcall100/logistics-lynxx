
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// CRM Pages
import CRMOverview from './crm/CRMOverview';
import CRMEmail from './crm/CRMEmail';
import CRMLeads from './crm/CRMLeads';
import CRMContacts from './crm/CRMContacts';
import CRMOpportunities from './crm/CRMOpportunities';
import CRMProjects from './crm/CRMProjects';
import CRMCalendar from './crm/CRMCalendar';

// Tickets Pages  
import TicketsDashboard from './tickets/TicketsDashboard';
import AllTickets from './tickets/AllTickets';
import TicketCategories from './tickets/TicketCategories';
import TicketTemplates from './tickets/TicketTemplates';
import TicketAnalytics from './tickets/TicketAnalytics';

// Networks Pages
import NetworksCustomers from './networks/NetworksCustomers';

// AI Dashboard Pages
import AIAnalytics from './ai-dashboard/AIAnalytics';
import SystemHealth from './ai-dashboard/SystemHealth';
import AgentControl from './ai-dashboard/AgentControl';
import AutonomousSystem from './ai-dashboard/AutonomousSystem';
import AutonomousAgents from './ai-dashboard/AutonomousAgents';
import MarketResearch from './ai-dashboard/MarketResearch';
import AgentMonitoring from './ai-dashboard/AgentMonitoring';
import DesignEngine from './ai-dashboard/DesignEngine';

// Test Pages
import TestSuperAdminUI from './TestSuperAdminUI';
import TestSuperAdminEnhanced from './TestSuperAdminEnhanced';

// API Dashboard Pages
import APIKeys from './api-dashboard/APIKeys';

// Marketplace Pages
import MarketplaceAll from './marketplace/MarketplaceAll';

// Settings Pages
import SuperAdminSettingsPage from './settings/SuperAdminSettingsPage';

const SuperAdminRoutes = () => {
  return (
    <Routes>
      {/* Index Route - Redirect to main dashboard */}
      <Route index element={<Navigate to="/super-admin" replace />} />
      
      {/* CRM Routes */}
      <Route path="/crm/overview" element={<CRMOverview />} />
      <Route path="/crm/email" element={<CRMEmail />} />
      <Route path="/crm/emails" element={<CRMEmail />} />
      <Route path="/crm/leads" element={<CRMLeads />} />
      <Route path="/crm/contacts" element={<CRMContacts />} />
      <Route path="/crm/opportunities" element={<CRMOpportunities />} />
      <Route path="/crm/projects" element={<CRMProjects />} />
      <Route path="/crm/calendar" element={<CRMCalendar />} />
      <Route path="/crm/companies" element={<div>CRM Companies Page</div>} />
      <Route path="/crm/pipeline" element={<div>CRM Pipeline Page</div>} />
      <Route path="/crm/analytics" element={<div>CRM Analytics Page</div>} />
      
      {/* Tickets Routes */}
      <Route path="/tickets/dashboard" element={<TicketsDashboard />} />
      <Route path="/tickets/all" element={<AllTickets />} />
      <Route path="/tickets/categories" element={<TicketCategories />} />
      <Route path="/tickets/templates" element={<TicketTemplates />} />
      <Route path="/tickets/analytics" element={<TicketAnalytics />} />
      
      {/* Networks Routes */}
      <Route path="/networks/customers" element={<NetworksCustomers />} />
      
      {/* AI Dashboard Routes */}
      <Route path="/ai/analytics" element={<AIAnalytics />} />
      <Route path="/ai/health" element={<SystemHealth />} />
      <Route path="/ai/agents" element={<AgentControl />} />
      <Route path="/ai/autonomous-system" element={<AutonomousSystem />} />
      <Route path="/ai/autonomous-agents" element={<AutonomousAgents />} />
      <Route path="/ai/market-research" element={<MarketResearch />} />
      <Route path="/ai/monitoring" element={<AgentMonitoring />} />
      <Route path="/ai/design-engine" element={<DesignEngine />} />
      
      {/* Test Routes */}
      <Route path="/test-ui" element={<TestSuperAdminUI />} />
      <Route path="/test-enhanced" element={<TestSuperAdminEnhanced />} />
      
      {/* API Dashboard Routes */}
      <Route path="/api/keys" element={<APIKeys />} />
      
      {/* Marketplace Routes */}
      <Route path="/marketplace/all" element={<MarketplaceAll />} />
      
      {/* Settings Routes */}
      <Route path="/settings" element={<SuperAdminSettingsPage />} />
    </Routes>
  );
};

export default SuperAdminRoutes;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EnterpriseLayout } from './components/layout/EnterpriseLayout';

// Create a QueryClient instance for autonomous data management
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Dashboard Components
const DashboardOverview = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
              <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Last updated: 2 minutes ago</span>
              </div>
            </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-card p-6 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Portals</p>
            <p className="text-2xl font-bold">20</p>
              </div>
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 text-lg">🌐</span>
              </div>
              </div>
      </div>
      
      <div className="bg-card p-6 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Users</p>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-green-600 text-lg">👥</span>
            </div>
          </div>
        </div>

      <div className="bg-card p-6 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">System Health</p>
            <p className="text-2xl font-bold">99.95%</p>
          </div>
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-green-600 text-lg">✅</span>
          </div>
        </div>
        </div>

      <div className="bg-card p-6 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">AI Agents</p>
            <p className="text-2xl font-bold">250</p>
          </div>
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <span className="text-purple-600 text-lg">🤖</span>
            </div>
            </div>
            </div>
            </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">New load posted in Carrier Portal</span>
            <span className="text-xs text-muted-foreground ml-auto">2 min ago</span>
            </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm">Payment processed in Financials Portal</span>
            <span className="text-xs text-muted-foreground ml-auto">5 min ago</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm">System maintenance scheduled</span>
            <span className="text-xs text-muted-foreground ml-auto">1 hour ago</span>
            </div>
          </div>
        </div>

      <div className="bg-card p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-3 text-left border rounded-lg hover:bg-accent transition-colors">
            <div className="font-medium">Add User</div>
            <div className="text-sm text-muted-foreground">Create new user account</div>
          </button>
          <button className="p-3 text-left border rounded-lg hover:bg-accent transition-colors">
            <div className="font-medium">View Reports</div>
            <div className="text-sm text-muted-foreground">Access analytics</div>
          </button>
          <button className="p-3 text-left border rounded-lg hover:bg-accent transition-colors">
            <div className="font-medium">System Health</div>
            <div className="text-sm text-muted-foreground">Check status</div>
          </button>
          <button className="p-3 text-left border rounded-lg hover:bg-accent transition-colors">
            <div className="font-medium">Settings</div>
            <div className="text-sm text-muted-foreground">Configure system</div>
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Portal Components
const PortalPage = ({ title, description, icon, features, stats }: any) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <div className="text-4xl">{icon}</div>
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
                </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-card p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Features</h3>
        <ul className="space-y-2">
          {features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span className="text-sm">{feature}</span>
            </li>
                    ))}
                  </ul>
                </div>

      <div className="bg-card p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Statistics</h3>
        <div className="space-y-3">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-sm text-muted-foreground capitalize">{key}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
        </div>

      <div className="bg-card p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
        <div className="space-y-2">
          <button className="w-full p-2 text-left text-sm hover:bg-accent rounded transition-colors">
            Dashboard
            </button>
          <button className="w-full p-2 text-left text-sm hover:bg-accent rounded transition-colors">
            Reports
            </button>
          <button className="w-full p-2 text-left text-sm hover:bg-accent rounded transition-colors">
            Settings
            </button>
        </div>
        </div>
      </div>
    </div>
  );

// Portal Data
const portalData = {
  super_admin: {
    title: 'Super Admin Portal',
    description: 'Global command center with AI-powered oversight',
    icon: '👑',
    features: ['AI Agent Management', 'Global Analytics', 'System Health', 'User Administration'],
    stats: { agents: '250', uptime: '99.95%', portals: '20' }
  },
  autonomous: {
    title: 'Autonomous Portal',
    description: '24/7 No-Human Operations Control Center',
    icon: '🤖',
    features: ['Live Agent Feed', 'Metrics Dashboard', 'Trace Links', 'Exception Handling'],
    stats: { agents: '250', workflows: '24', accuracy: '95.2%' }
  },
  carrier: {
    title: 'Carrier Portal',
    description: 'Fleet management and operations with intelligent dispatch',
    icon: '🚛',
    features: ['Fleet Management', 'Load Operations', 'Driver Tracking', 'ELD Compliance'],
    stats: { trucks: '127', drivers: '89', loads: '47' }
  },
  broker: {
    title: 'Broker Portal',
    description: 'Smart load matching and rate optimization platform',
    icon: '🏢',
    features: ['Load Board', 'Rate Management', 'Carrier Network', 'Margin Analysis'],
    stats: { loads: '234', carriers: '156', margin: '12.4%' }
  },
  shipper: {
    title: 'Shipper Portal',
    description: 'Streamlined logistics and shipment tracking dashboard',
    icon: '📦',
    features: ['Shipment Tracking', 'Cost Analysis', 'Performance Reports', 'Carrier Rating'],
    stats: { shipments: '156', ontime: '98.2%', savings: '$8,950' }
  },
  driver: {
    title: 'Driver Portal',
    description: 'Personalized driving command center with HOS tracking',
    icon: '🚗',
    features: ['Hours of Service', 'Route Planning', 'Load Details', 'Safety Score'],
    stats: { hours: '7.5/11', miles: '387', score: '98%' }
  },
  owner_operator: {
    title: 'Owner Operator Portal',
    description: 'Independent trucking business management hub',
    icon: '🚚',
    features: ['Revenue Tracking', 'Expense Management', 'Load Efficiency', 'Profit Analysis'],
    stats: { revenue: '$4,750', margin: '23.4%', efficiency: '94.8%' }
  },
  analytics: {
    title: 'Analytics Portal',
    description: 'Business intelligence and performance analytics',
    icon: '📊',
    features: ['Performance Metrics', 'Trend Analysis', 'Reporting', 'Insights'],
    stats: { reports: '45', insights: '12', accuracy: '97.8%' }
  },
  admin: {
    title: 'Admin Portal',
    description: 'System administration and configuration',
    icon: '⚙️',
    features: ['User Management', 'System Configuration', 'Reports', 'Security'],
    stats: { users: '1,234', systems: '8', security: '100%' }
  },
  factoring: {
    title: 'Factoring Portal',
    description: 'Financial services and invoice factoring',
    icon: '💰',
    features: ['Invoice Factoring', 'Payment Processing', 'Financial Reports', 'Credit Management'],
    stats: { invoices: '89', processed: '$45K', approval: '95%' }
  },
  load_board: {
    title: 'Load Board',
    description: 'Real-time load matching and dispatch',
    icon: '📋',
    features: ['Real-time Loads', 'Carrier Matching', 'Dispatch', 'Status Updates'],
    stats: { loads: '67', active: '23', response: '2.3min' }
  },
  crm: {
    title: 'CRM Portal',
    description: 'Customer relationship and lead management',
    icon: '👥',
    features: ['Lead Management', 'Customer Data', 'Sales Pipeline', 'Communication'],
    stats: { leads: '234', customers: '156', conversion: '12.4%' }
  },
  financials: {
    title: 'Financials Portal',
    description: 'Financial management and reporting',
    icon: '💳',
    features: ['Accounting', 'Reporting', 'Payments', 'Reconciliation'],
    stats: { revenue: '$45K', expenses: '$12K', profit: '73%' }
  },
  edi: {
    title: 'EDI Portal',
    description: 'Electronic data interchange management',
    icon: '📡',
    features: ['EDI Processing', 'Integration', 'Monitoring', 'Compliance'],
    stats: { transactions: '1,234', success: '99.8%', latency: '150ms' }
  },
  marketplace: {
    title: 'Marketplace',
    description: 'TMS marketplace and integrations',
    icon: '🛒',
    features: ['App Store', 'Integrations', 'Services', 'Partners'],
    stats: { apps: '45', integrations: '23', partners: '12' }
  },
  workers: {
    title: 'Workers Portal',
    description: 'Workforce and resource management',
    icon: '👷',
    features: ['Staff Management', 'Scheduling', 'Performance', 'Training'],
    stats: { workers: '89', shifts: '156', efficiency: '94%' }
  },
  rates: {
    title: 'Rates Portal',
    description: 'Rate management and pricing optimization',
    icon: '💰',
    features: ['Rate Management', 'Pricing', 'Contracts', 'Analysis'],
    stats: { rates: '234', contracts: '67', margin: '15.2%' }
  }
};

function AppAuthenticated() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <EnterpriseLayout>
            <Routes>
              {/* Dashboard */}
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/dashboard" element={<DashboardOverview />} />
              
              {/* Super Admin Routes */}
              <Route path="/super-admin" element={<PortalPage {...portalData.super_admin} />} />
              <Route path="/super-admin/*" element={<PortalPage {...portalData.super_admin} />} />
              
              {/* Portal Routes */}
              <Route path="/autonomous" element={<PortalPage {...portalData.autonomous} />} />
              <Route path="/autonomous/*" element={<PortalPage {...portalData.autonomous} />} />
              
              <Route path="/carrier" element={<PortalPage {...portalData.carrier} />} />
              <Route path="/carrier/*" element={<PortalPage {...portalData.carrier} />} />
              
              <Route path="/broker" element={<PortalPage {...portalData.broker} />} />
              <Route path="/broker/*" element={<PortalPage {...portalData.broker} />} />
              
              <Route path="/shipper" element={<PortalPage {...portalData.shipper} />} />
              <Route path="/shipper/*" element={<PortalPage {...portalData.shipper} />} />
              
              <Route path="/driver" element={<PortalPage {...portalData.driver} />} />
              <Route path="/driver/*" element={<PortalPage {...portalData.driver} />} />
              
              <Route path="/owner-operator" element={<PortalPage {...portalData.owner_operator} />} />
              <Route path="/owner-operator/*" element={<PortalPage {...portalData.owner_operator} />} />
              
              <Route path="/analytics" element={<PortalPage {...portalData.analytics} />} />
              <Route path="/analytics/*" element={<PortalPage {...portalData.analytics} />} />
              
              <Route path="/admin" element={<PortalPage {...portalData.admin} />} />
              <Route path="/admin/*" element={<PortalPage {...portalData.admin} />} />
              
              <Route path="/factoring" element={<PortalPage {...portalData.factoring} />} />
              <Route path="/factoring/*" element={<PortalPage {...portalData.factoring} />} />
              
              <Route path="/load-board" element={<PortalPage {...portalData.load_board} />} />
              <Route path="/load-board/*" element={<PortalPage {...portalData.load_board} />} />
              
              <Route path="/crm" element={<PortalPage {...portalData.crm} />} />
              <Route path="/crm/*" element={<PortalPage {...portalData.crm} />} />
              
              <Route path="/financials" element={<PortalPage {...portalData.financials} />} />
              <Route path="/financials/*" element={<PortalPage {...portalData.financials} />} />
              
              <Route path="/edi" element={<PortalPage {...portalData.edi} />} />
              <Route path="/edi/*" element={<PortalPage {...portalData.edi} />} />
              
              <Route path="/marketplace" element={<PortalPage {...portalData.marketplace} />} />
              <Route path="/marketplace/*" element={<PortalPage {...portalData.marketplace} />} />
              
              <Route path="/workers" element={<PortalPage {...portalData.workers} />} />
              <Route path="/workers/*" element={<PortalPage {...portalData.workers} />} />
              
              <Route path="/rates" element={<PortalPage {...portalData.rates} />} />
              <Route path="/rates/*" element={<PortalPage {...portalData.rates} />} />
              
              {/* Additional Routes */}
              <Route path="/health" element={
                <div className="space-y-6">
                  <h1 className="text-3xl font-bold">System Health</h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h3 className="font-semibold text-green-800">✅ All Systems Operational</h3>
                      <p className="text-green-700 mt-2">Uptime: 99.95%</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-blue-800">📊 Performance</h3>
                      <p className="text-blue-700 mt-2">Response time: 150ms</p>
                    </div>
                    <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                      <h3 className="font-semibold text-orange-800">⚠️ Maintenance</h3>
                      <p className="text-orange-700 mt-2">Scheduled for tonight</p>
                    </div>
                  </div>
                </div>
              } />
              
              <Route path="/performance" element={
                <div className="space-y-6">
                  <h1 className="text-3xl font-bold">Performance Analytics</h1>
                  <div className="bg-card p-6 rounded-lg border">
                    <p className="text-muted-foreground">Performance metrics and analytics will be displayed here.</p>
                  </div>
                </div>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={
                <div className="space-y-6">
                  <h1 className="text-3xl font-bold">Page Not Found</h1>
                  <div className="bg-card p-6 rounded-lg border">
                    <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
                </div>
                </div>
              } />
            </Routes>
          </EnterpriseLayout>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default AppAuthenticated;

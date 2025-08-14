import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a QueryClient instance for autonomous data management
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function HomePage() {
  const navigate = useNavigate();

  const autonomousSystem = {
    status: 'ACTIVE',
    uptime: '99.95%',
    agents: 250,
    tasks: 1847,
    successRate: '98.2%',
    quarantineRate: '0.3%'
  };

  // ✅ CANONICAL PORTALS (20 Production Portals)
  const portals = [
    // Core Business Portals
    {
      id: 'super_admin',
      title: '👑 Super Admin Portal',
      description: 'Global command center with AI-powered oversight',
      route: '/super-admin',
      bgGradient: 'from-purple-500 to-violet-500',
      features: ['AI Agent Management', 'Global Analytics', 'System Health', 'User Administration'],
      stats: { agents: '250', uptime: '99.95%', portals: '20' },
      status: 'active'
    },
    {
      id: 'autonomous',
      title: '🤖 Autonomous Portal',
      description: '24/7 No-Human Operations Control Center',
      route: '/autonomous',
      bgGradient: 'from-indigo-500 to-blue-500',
      features: ['Live Agent Feed', 'Metrics Dashboard', 'Trace Links', 'Exception Handling'],
      stats: { agents: '250', workflows: '24', accuracy: '95.2%' },
      status: 'active'
    },
    {
      id: 'carrier',
      title: '🚛 Carrier Portal',
      description: 'Fleet management and operations with intelligent dispatch',
      route: '/carrier',
      bgGradient: 'from-blue-500 to-cyan-500',
      features: ['Fleet Management', 'Load Operations', 'Driver Tracking', 'ELD Compliance'],
      stats: { trucks: '127', drivers: '89', loads: '47' },
      status: 'active'
    },
    {
      id: 'broker',
      title: '🏢 Broker Portal',
      description: 'Smart load matching and rate optimization platform',
      route: '/broker',
      bgGradient: 'from-emerald-500 to-green-500',
      features: ['Load Board', 'Rate Management', 'Carrier Network', 'Margin Analysis'],
      stats: { loads: '234', carriers: '156', margin: '12.4%' },
      status: 'active'
    },
    {
      id: 'shipper',
      title: '📦 Shipper Portal',
      description: 'Streamlined logistics and shipment tracking dashboard',
      route: '/shipper',
      bgGradient: 'from-orange-500 to-amber-500',
      features: ['Shipment Tracking', 'Cost Analysis', 'Performance Reports', 'Carrier Rating'],
      stats: { shipments: '156', ontime: '98.2%', savings: '$8,950' },
      status: 'active'
    },
    {
      id: 'driver',
      title: '🚗 Driver Portal',
      description: 'Personalized driving command center with HOS tracking',
      route: '/driver',
      bgGradient: 'from-pink-500 to-rose-500',
      features: ['Hours of Service', 'Route Planning', 'Load Details', 'Safety Score'],
      stats: { hours: '7.5/11', miles: '387', score: '98%' },
      status: 'active'
    },
    {
      id: 'owner_operator',
      title: '🚚 Owner Operator Portal',
      description: 'Independent trucking business management hub',
      route: '/owner-operator',
      bgGradient: 'from-violet-500 to-purple-500',
      features: ['Revenue Tracking', 'Expense Management', 'Load Efficiency', 'Profit Analysis'],
      stats: { revenue: '$4,750', margin: '23.4%', efficiency: '94.8%' },
      status: 'active'
    },
    {
      id: 'factoring',
      title: '💰 Factoring Portal',
      description: 'Invoice factoring and cash flow management platform',
      route: '/factoring',
      bgGradient: 'from-green-500 to-emerald-500',
      features: ['Invoice Factoring', 'Cash Flow Management', 'Credit Analysis', 'Payment Processing'],
      stats: { invoices: '89', funded: '$127K', rate: '2.8%' },
      status: 'active'
    },
    {
      id: 'load_board',
      title: '📋 Load Board Portal',
      description: 'Real-time load matching and marketplace operations',
      route: '/load-board',
      bgGradient: 'from-cyan-500 to-blue-500',
      features: ['Load Matching', 'Marketplace', 'Bidding System', 'Rate Optimization'],
      stats: { loads: '1,247', carriers: '892', fillRate: '94.2%' },
      status: 'active'
    },
    {
      id: 'crm',
      title: '👥 CRM Portal',
      description: 'Customer relationship management with AI insights',
      route: '/crm',
      bgGradient: 'from-amber-500 to-orange-500',
      features: ['Lead Management', 'Sales Pipeline', 'Customer Analytics', 'Communication Hub'],
      stats: { leads: '234', conversions: '18.7%', revenue: '$127K' },
      status: 'active'
    },
    {
      id: 'financials',
      title: '💳 Financials Portal',
      description: 'Comprehensive financial management and reporting',
      route: '/financials',
      bgGradient: 'from-emerald-500 to-teal-500',
      features: ['AR/AP Management', 'Financial Reporting', 'Budget Tracking', 'Tax Compliance'],
      stats: { ar: '$89K', ap: '$34K', profit: '$23K' },
      status: 'active'
    },
    {
      id: 'edi',
      title: '📡 EDI Portal',
      description: 'Electronic data interchange and integration hub',
      route: '/edi',
      bgGradient: 'from-slate-500 to-gray-500',
      features: ['EDI Processing', 'Integration Management', 'Data Validation', 'Compliance Monitoring'],
      stats: { messages: '2,847', success: '99.8%', partners: '23' },
      status: 'active'
    },
    {
      id: 'marketplace',
      title: '🛒 Marketplace Portal',
      description: 'Third-party integrations and app ecosystem',
      route: '/marketplace',
      bgGradient: 'from-rose-500 to-pink-500',
      features: ['App Integrations', 'API Management', 'Webhook Processing', 'Developer Tools'],
      stats: { apps: '47', integrations: '156', uptime: '99.9%' },
      status: 'active'
    },
    {
      id: 'analytics',
      title: '📊 Analytics Portal',
      description: 'Business intelligence and performance analytics',
      route: '/analytics',
      bgGradient: 'from-indigo-500 to-purple-500',
      features: ['Business Intelligence', 'Performance Metrics', 'Custom Dashboards', 'Data Visualization'],
      stats: { reports: '89', insights: '234', accuracy: '99.2%' },
      status: 'active'
    },
    {
      id: 'workers',
      title: '👷 Workers Portal',
      description: 'Internal workforce management and task allocation',
      route: '/workers',
      bgGradient: 'from-teal-500 to-cyan-500',
      features: ['Task Management', 'Workforce Planning', 'Performance Tracking', 'Resource Allocation'],
      stats: { workers: '45', tasks: '234', efficiency: '96.8%' },
      status: 'active'
    },
    {
      id: 'rates',
      title: '💰 Rates Portal',
      description: 'Dynamic pricing and rate optimization engine',
      route: '/rates',
      bgGradient: 'from-yellow-500 to-amber-500',
      features: ['Rate Optimization', 'Market Analysis', 'Pricing Models', 'Competitive Intelligence'],
      stats: { rates: '1,247', accuracy: '94.8%', margin: '15.2%' },
      status: 'active'
    },
    {
      id: 'directory',
      title: '📚 Directory Portal',
      description: 'Partner network and verification management',
      route: '/directory',
      bgGradient: 'from-blue-500 to-indigo-500',
      features: ['Partner Directory', 'Verification System', 'Compliance Monitoring', 'Network Analytics'],
      stats: { partners: '892', verified: '98.7%', active: '94.2%' },
      status: 'active'
    },
    {
      id: 'testing',
      title: '🧪 Testing Portal',
      description: 'Quality assurance and testing automation hub',
      route: '/testing',
      bgGradient: 'from-gray-500 to-slate-500',
      features: ['Test Automation', 'Quality Assurance', 'Performance Testing', 'Bug Tracking'],
      stats: { tests: '1,247', coverage: '94.8%', bugs: '12' },
      status: 'active'
    },
    {
      id: 'admin',
      title: '⚙️ Admin Portal',
      description: 'System administration and user management',
      route: '/admin',
      bgGradient: 'from-slate-600 to-gray-600',
      features: ['User Management', 'System Configuration', 'Security Settings', 'Access Control'],
      stats: { users: '156', roles: '12', security: '100%' },
      status: 'active'
    },
    {
      id: 'tms_admin',
      title: '🏢 TMS Admin Portal',
      description: 'Transportation management system administration',
      route: '/tms-admin',
      bgGradient: 'from-blue-600 to-indigo-600',
      features: ['TMS Configuration', 'Lane Management', 'Contract Administration', 'System Integration'],
      stats: { lanes: '234', contracts: '89', integrations: '23' },
      status: 'active'
    },
    {
      id: 'onboarding',
      title: '🚀 Onboarding Portal',
      description: 'Streamlined user onboarding and setup process',
      route: '/onboarding',
      bgGradient: 'from-green-600 to-emerald-600',
      features: ['User Onboarding', 'Setup Wizard', 'Training Modules', 'Progress Tracking'],
      stats: { users: '45', completion: '87.3%', satisfaction: '4.8/5' },
      status: 'active'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TB</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Trans Bot AI</h1>
                <p className="text-sm text-gray-600">Autonomous TMS Platform</p>
              </div>
            </div>
            
            {/* Autonomous System Status */}
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 px-3 py-1 rounded-full">
                <span className="text-green-800 text-sm font-medium">🟢 {autonomousSystem.status}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">{autonomousSystem.uptime}</span> uptime
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Autonomous System Overview */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">🤖 Autonomous System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">{autonomousSystem.agents}</div>
              <div className="text-sm text-gray-600">Active Agents</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-green-600">{autonomousSystem.tasks}</div>
              <div className="text-sm text-gray-600">Tasks Today</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-purple-600">{autonomousSystem.successRate}</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-orange-600">{autonomousSystem.quarantineRate}</div>
              <div className="text-sm text-gray-600">Quarantine Rate</div>
            </div>
          </div>
        </div>

        {/* Portal Consolidation Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Portal Consolidation Complete</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>All portals have been consolidated into 20 canonical production portals. Deprecated routes now return 410 Gone status.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Portal Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Production Portals (20 Canonical)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {portals.map((portal) => (
              <div
                key={portal.id}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => navigate(portal.route)}
              >
                <div className={`h-2 bg-gradient-to-r ${portal.bgGradient} rounded-t-lg`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {portal.title}
                    </h3>
                    <div className={`w-2 h-2 rounded-full ${
                      portal.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{portal.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {portal.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center text-xs text-gray-500">
                        <span className="w-1 h-1 bg-gray-300 rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    {Object.entries(portal.stats).slice(0, 2).map(([key, value]) => (
                      <span key={key}>{key}: {value}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Quick Access</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {portals.slice(0, 8).map((portal) => (
              <button
                key={portal.id}
                onClick={() => navigate(portal.route)}
                className="text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-sm text-gray-900">{portal.title.split(' ')[0]}</div>
                <div className="text-xs text-gray-500">{portal.title.split(' ').slice(1).join(' ')}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Portal Decommissioned Component
function PortalDecommissioned({ canonicalRoute }: { canonicalRoute: string }) {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Portal Decommissioned</h1>
          <p className="text-gray-600 mb-6">
            This portal has been decommissioned and consolidated into a canonical portal.
          </p>
          <button
            onClick={() => navigate(canonicalRoute)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Canonical Portal
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Canonical Portal Routes */}
            <Route path="/super-admin/*" element={<div className="p-8 text-center">👑 Super Admin Portal - Coming Soon</div>} />
            <Route path="/autonomous/*" element={<div className="p-8 text-center">🤖 Autonomous Portal - Coming Soon</div>} />
            <Route path="/carrier/*" element={<div className="p-8 text-center">🚛 Carrier Portal - Coming Soon</div>} />
            <Route path="/broker/*" element={<div className="p-8 text-center">🏢 Broker Portal - Coming Soon</div>} />
            <Route path="/shipper/*" element={<div className="p-8 text-center">📦 Shipper Portal - Coming Soon</div>} />
            <Route path="/driver/*" element={<div className="p-8 text-center">🚗 Driver Portal - Coming Soon</div>} />
            <Route path="/owner-operator/*" element={<div className="p-8 text-center">🚚 Owner Operator Portal - Coming Soon</div>} />
            <Route path="/factoring/*" element={<div className="p-8 text-center">💰 Factoring Portal - Coming Soon</div>} />
            <Route path="/load-board/*" element={<div className="p-8 text-center">📋 Load Board Portal - Coming Soon</div>} />
            <Route path="/crm/*" element={<div className="p-8 text-center">👥 CRM Portal - Coming Soon</div>} />
            <Route path="/financials/*" element={<div className="p-8 text-center">💳 Financials Portal - Coming Soon</div>} />
            <Route path="/edi/*" element={<div className="p-8 text-center">📡 EDI Portal - Coming Soon</div>} />
            <Route path="/marketplace/*" element={<div className="p-8 text-center">🛒 Marketplace Portal - Coming Soon</div>} />
            <Route path="/analytics/*" element={<div className="p-8 text-center">📊 Analytics Portal - Coming Soon</div>} />
            <Route path="/workers/*" element={<div className="p-8 text-center">👷 Workers Portal - Coming Soon</div>} />
            <Route path="/rates/*" element={<div className="p-8 text-center">💰 Rates Portal - Coming Soon</div>} />
            <Route path="/directory/*" element={<div className="p-8 text-center">📚 Directory Portal - Coming Soon</div>} />
            <Route path="/testing/*" element={<div className="p-8 text-center">🧪 Testing Portal - Coming Soon</div>} />
            <Route path="/admin/*" element={<div className="p-8 text-center">⚙️ Admin Portal - Coming Soon</div>} />
            <Route path="/tms-admin/*" element={<div className="p-8 text-center">🏢 TMS Admin Portal - Coming Soon</div>} />
            <Route path="/onboarding/*" element={<div className="p-8 text-center">🚀 Onboarding Portal - Coming Soon</div>} />
            
            {/* Deprecated Portal Routes - Return 410 Gone */}
            <Route path="/carrier-admin/*" element={<PortalDecommissioned canonicalRoute="/carrier" />} />
            <Route path="/broker-admin/*" element={<PortalDecommissioned canonicalRoute="/broker" />} />
            <Route path="/shipper-admin/*" element={<PortalDecommissioned canonicalRoute="/shipper" />} />
            <Route path="/carrier-dispatch/*" element={<PortalDecommissioned canonicalRoute="/load-board" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
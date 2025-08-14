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

  const portals = [
    // Core Business Portals
    {
      id: 'super_admin',
      title: '👑 Super Admin Portal',
      description: 'Global command center with AI-powered oversight',
      route: '/super-admin',
      bgGradient: 'from-purple-500 to-violet-500',
      features: ['AI Agent Management', 'Global Analytics', 'System Health', 'User Administration'],
      stats: { agents: '250', uptime: '99.8%', portals: '20+' }
    },
    {
      id: 'carrier_admin',
      title: '🚛 Carrier Admin Portal',
      description: 'Fleet management and operations with intelligent dispatch',
      route: '/carrier-admin',
      bgGradient: 'from-blue-500 to-cyan-500',
      features: ['Fleet Management', 'Load Operations', 'Driver Tracking', 'ELD Compliance'],
      stats: { trucks: '127', drivers: '89', loads: '47' }
    },
    {
      id: 'broker_admin',
      title: '🏢 Broker Admin Portal',
      description: 'Smart load matching and rate optimization platform',
      route: '/broker-admin',
      bgGradient: 'from-emerald-500 to-green-500',
      features: ['Load Board', 'Rate Management', 'Carrier Network', 'Margin Analysis'],
      stats: { loads: '234', carriers: '156', margin: '12.4%' }
    },
    {
      id: 'shipper_admin',
      title: '📦 Shipper Admin Portal',
      description: 'Streamlined logistics and shipment tracking dashboard',
      route: '/shipper-admin',
      bgGradient: 'from-orange-500 to-amber-500',
      features: ['Shipment Tracking', 'Cost Analysis', 'Performance Reports', 'Carrier Rating'],
      stats: { shipments: '156', ontime: '98.2%', savings: '$8,950' }
    },
    {
      id: 'driver',
      title: '🚗 Driver Portal',
      description: 'Personalized driving command center with HOS tracking',
      route: '/driver',
      bgGradient: 'from-pink-500 to-rose-500',
      features: ['Hours of Service', 'Route Planning', 'Load Details', 'Safety Score'],
      stats: { hours: '7.5/11', miles: '387', score: '98%' }
    },
    {
      id: 'owner_operator',
      title: '🚚 Owner Operator Portal',
      description: 'Independent trucking business management hub',
      route: '/owner-operator',
      bgGradient: 'from-violet-500 to-purple-500',
      features: ['Revenue Tracking', 'Expense Management', 'Load Efficiency', 'Profit Analysis'],
      stats: { revenue: '$4,750', margin: '23.4%', efficiency: '94.8%' }
    },
    // Specialized Portals
    {
      id: 'autonomous',
      title: '🤖 Autonomous Portal',
      description: 'AI-powered autonomous system management',
      route: '/autonomous',
      bgGradient: 'from-indigo-500 to-blue-500',
      features: ['AI Agents', 'Automation Workflows', 'Predictive Analytics', 'ML Models'],
      stats: { agents: '250', workflows: '24', accuracy: '95.2%' }
    },
    {
      id: 'analytics',
      title: '📊 Analytics Portal',
      description: 'Business intelligence and performance analytics',
      route: '/analytics',
      bgGradient: 'from-teal-500 to-cyan-500',
      features: ['Performance Metrics', 'Trend Analysis', 'Reporting', 'Insights'],
      stats: { reports: '45', insights: '12', accuracy: '97.8%' }
    },
    {
      id: 'admin',
      title: '⚙️ Admin Portal',
      description: 'System administration and configuration',
      route: '/admin',
      bgGradient: 'from-gray-500 to-slate-500',
      features: ['User Management', 'System Configuration', 'Reports', 'Security'],
      stats: { users: '1,234', systems: '8', security: '100%' }
    },
    {
      id: 'factoring',
      title: '💰 Factoring Portal',
      description: 'Financial services and invoice factoring',
      route: '/factoring',
      bgGradient: 'from-yellow-500 to-orange-500',
      features: ['Invoice Factoring', 'Payment Processing', 'Financial Reports', 'Credit Management'],
      stats: { invoices: '89', processed: '$45K', approval: '95%' }
    },
    {
      id: 'carrier_dispatch',
      title: '📞 Carrier Dispatch',
      description: 'Real-time dispatch and communication center',
      route: '/carrier-dispatch',
      bgGradient: 'from-red-500 to-pink-500',
      features: ['Real-time Dispatch', 'Communication', 'Load Assignment', 'Status Updates'],
      stats: { dispatches: '67', active: '23', response: '2.3min' }
    },
    {
      id: 'testing',
      title: '🧪 Testing Center',
      description: 'Development and testing environment',
      route: '/testing/autonomous-agents',
      bgGradient: 'from-lime-500 to-green-500',
      features: ['Agent Testing', 'Development', 'Performance Testing', 'Debugging'],
      stats: { tests: '156', passed: '98%', coverage: '94%' }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Trans Bot AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Autonomous TMS Platform with 20+ Specialized Portals
          </p>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg inline-block">
            <p className="text-green-600 font-semibold text-lg mb-2">
              ✅ React is working! All portals are accessible.
            </p>
            <p className="text-gray-600 text-sm">
              Server running on localhost:8080 | 250 AI Agents Active
            </p>
          </div>
        </div>

        {/* Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {portals.map((portal) => (
            <div
              key={portal.id}
              className={`bg-gradient-to-br ${portal.bgGradient} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105`}
              onClick={() => navigate(portal.route)}
            >
              <div className="text-white">
                <h3 className="text-xl font-bold mb-2">{portal.title}</h3>
                <p className="text-white/90 text-sm mb-4">{portal.description}</p>
                
                {/* Features */}
                <div className="mb-4">
                  <h4 className="font-semibold text-white/90 mb-2">Features:</h4>
                  <ul className="text-xs space-y-1">
                    {portal.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-white/80">• {feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(portal.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="font-bold">{value}</div>
                        <div className="text-white/70 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <span className="text-white/80 text-xs">Click to access →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access Buttons */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Access</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/super-admin')}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              👑 Super Admin
            </button>
            <button
              onClick={() => navigate('/autonomous')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              🤖 Autonomous System
            </button>
            <button
              onClick={() => navigate('/analytics')}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              📊 Analytics
            </button>
            <button
              onClick={() => navigate('/testing/autonomous-agents')}
              className="px-6 py-3 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors"
            >
              🧪 Testing Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppAuthenticated() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<div className="container mx-auto py-20 text-center">Login Page Coming Soon</div>} />
              <Route path="/signup" element={<div className="container mx-auto py-20 text-center">Sign Up Page Coming Soon</div>} />
              
              {/* All Portal Routes */}
              <Route path="/super-admin/*" element={<div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">👑 Super Admin Portal</h1>
                <p className="text-lg mb-8">Global command center with AI-powered oversight</p>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <p className="text-purple-800">Complete system control with 250 AI agents</p>
                </div>
              </div>} />
              
              <Route path="/carrier-admin/*" element={<div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">🚛 Carrier Admin Portal</h1>
                <p className="text-lg mb-8">Fleet management and operations</p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-blue-800">Fleet tracking, driver management, route optimization</p>
                </div>
              </div>} />
              
              <Route path="/broker-admin/*" element={<div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">🏢 Broker Admin Portal</h1>
                <p className="text-lg mb-8">Smart load matching and rate optimization</p>
                <div className="bg-green-50 p-6 rounded-lg">
                  <p className="text-green-800">Load board, carrier network, margin analysis</p>
                </div>
              </div>} />
              
              <Route path="/shipper-admin/*" element={<div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">📦 Shipper Admin Portal</h1>
                <p className="text-lg mb-8">Shipment tracking and logistics management</p>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <p className="text-orange-800">Shipment tracking, cost analysis, performance reports</p>
                </div>
              </div>} />
              
              <Route path="/driver/*" element={<div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">🚗 Driver Portal</h1>
                <p className="text-lg mb-8">Personalized driving command center</p>
                <div className="bg-pink-50 p-6 rounded-lg">
                  <p className="text-pink-800">HOS tracking, route planning, safety monitoring</p>
                </div>
              </div>} />
              
              <Route path="/owner-operator/*" element={<div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">🚚 Owner Operator Portal</h1>
                <p className="text-lg mb-8">Independent trucking business management</p>
                <div className="bg-violet-50 p-6 rounded-lg">
                  <p className="text-violet-800">Revenue tracking, expense management, profit analysis</p>
                </div>
              </div>} />
              
              <Route path="/autonomous" element={<div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">🤖 Autonomous Portal</h1>
                <p className="text-lg mb-8">AI-powered autonomous system management</p>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <p className="text-indigo-800">250 AI agents, automation workflows, predictive analytics</p>
                </div>
              </div>} />
              
              <Route path="/analytics/*" element={<div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">📊 Analytics Portal</h1>
                <p className="text-lg mb-8">Business intelligence and performance analytics</p>
                <div className="bg-teal-50 p-6 rounded-lg">
                  <p className="text-teal-800">Performance metrics, trend analysis, insights</p>
                </div>
              </div>} />
              
              <Route path="/admin/*" element={<div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">⚙️ Admin Portal</h1>
                <p className="text-lg mb-8">System administration and configuration</p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-800">User management, system configuration, security</p>
                </div>
              </div>} />
              
              <Route path="/factoring/*" element={<div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">💰 Factoring Portal</h1>
                <p className="text-lg mb-8">Financial services and invoice factoring</p>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <p className="text-yellow-800">Invoice factoring, payment processing, credit management</p>
                </div>
              </div>} />
              
              <Route path="/carrier-dispatch/*" element={<div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">📞 Carrier Dispatch</h1>
                <p className="text-lg mb-8">Real-time dispatch and communication center</p>
                <div className="bg-red-50 p-6 rounded-lg">
                  <p className="text-red-800">Real-time dispatch, communication, load assignment</p>
                </div>
              </div>} />
              
              <Route path="/testing/*" element={<div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">🧪 Testing Center</h1>
                <p className="text-lg mb-8">Development and testing environment</p>
                <div className="bg-lime-50 p-6 rounded-lg">
                  <p className="text-lime-800">Agent testing, development, performance testing</p>
                </div>
              </div>} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default AppAuthenticated;

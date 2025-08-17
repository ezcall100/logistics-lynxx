import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import './App.css';

// Import all portal components
import HomePage from './pages/HomePage';
import CarrierPortal from './pages/carrier/CarrierPortal';
import BrokerPortal from './pages/broker/BrokerPortal';
import ShipperPortal from './pages/shipper/ShipperPortal';
import DriverPortal from './pages/driver/DriverPortal';
import OwnerOperatorPortal from './pages/owner-operator/OwnerOperatorPortal';

// Import AI dashboard components
import AgentMonitoring from './pages/super-admin/ai-dashboard/AgentMonitoring';
import AutonomousSystem from './pages/super-admin/ai-dashboard/AutonomousSystem';
import AIAnalytics from './pages/super-admin/ai-dashboard/AIAnalytics';
import AIHealth from './pages/super-admin/ai-dashboard/AIHealth';
import AIAgents from './pages/super-admin/ai-dashboard/AIAgents';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Toaster position="top-right" />
          <Routes>
            {/* Home page with portal selection */}
            <Route path="/" element={<HomePage />} />
            
            {/* ✅ CANONICAL PORTAL ROUTES (20 Production Portals) */}
            
            {/* Core Business Portals */}
            <Route path="/carrier" element={<CarrierPortal />} />
            <Route path="/broker" element={<BrokerPortal />} />
            <Route path="/shipper" element={<ShipperPortal />} />
            <Route path="/driver" element={<DriverPortal />} />
            <Route path="/owner-operator" element={<OwnerOperatorPortal />} />
            
            {/* Administrative Portals */}
            <Route path="/super-admin/*" element={<div className="container mx-auto py-20 text-center">
              <h1 className="text-3xl font-bold mb-4">👑 Super Admin Portal</h1>
              <p className="text-lg mb-8">Global command center with AI-powered oversight</p>
              <div className="bg-purple-50 p-6 rounded-lg">
                <p className="text-purple-800">Complete system control with 250 AI agents</p>
              </div>
            </div>} />
            
            <Route path="/admin/*" element={<div className="container mx-auto py-20 text-center">
              <h1 className="text-3xl font-bold mb-4">⚙️ Admin Portal</h1>
              <p className="text-lg mb-8">System administration and configuration</p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-800">User management, system configuration, security</p>
              </div>
            </div>} />
            
            {/* AI & Autonomous Portals */}
            <Route path="/autonomous" element={<div className="container mx-auto py-20 text-center">
              <h1 className="text-3xl font-bold mb-4">🤖 Autonomous Portal</h1>
              <p className="text-lg mb-8">24/7 No-Human Operations Control Center</p>
              <div className="bg-indigo-50 p-6 rounded-lg">
                <p className="text-indigo-800">Live agent feed, metrics dashboard, trace links, exception handling</p>
              </div>
            </div>} />
            
            <Route path="/analytics/*" element={<div className="container mx-auto py-20 text-center">
              <h1 className="text-3xl font-bold mb-4">📊 Analytics Portal</h1>
              <p className="text-lg mb-8">Business intelligence and performance analytics</p>
              <div className="bg-teal-50 p-6 rounded-lg">
                <p className="text-teal-800">Performance metrics, trend analysis, insights</p>
              </div>
            </div>} />
            
            {/* Financial Portals */}
            <Route path="/factoring/*" element={<div className="container mx-auto py-20 text-center">
              <h1 className="text-3xl font-bold mb-4">💰 Factoring Portal</h1>
              <p className="text-lg mb-8">Financial services and invoice factoring</p>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <p className="text-yellow-800">Invoice factoring, payment processing, credit management</p>
              </div>
            </div>} />
            
            <Route path="/financials/*" element={<div className="container mx-auto py-20 text-center">
              <h1 className="text-3xl font-bold mb-4">💳 Financials Portal</h1>
              <p className="text-lg mb-8">Financial management and reporting</p>
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-green-800">Accounting, reporting, payments, reconciliation</p>
              </div>
            </div>} />
            
            <Route path="/rates/*" element={<div className="container mx-auto py-20 text-center">
              <h1 className="text-3xl font-bold mb-4">💰 Rates Portal</h1>
              <p className="text-lg mb-8">Rate management and pricing optimization</p>
              <div className="bg-amber-50 p-6 rounded-lg">
                <p className="text-amber-800">Rate management, pricing, contracts, analysis</p>
              </div>
            </div>} />
            
            {/* Operations Portals */}
            <Route path="/load-board/*" element={<div className="container mx-auto py-20 text-center">
              <h1 className="text-3xl font-bold mb-4">📋 Load Board</h1>
              <p className="text-lg mb-8">Real-time load matching and dispatch</p>
              <div className="bg-red-50 p-6 rounded-lg">
                <p className="text-red-800">Real-time loads, carrier matching, dispatch</p>
              </div>
            </div>} />
            
            <Route path="/workers/*" element={<div className="container mx-auto py-20 text-center">
              <h1 className="text-3xl font-bold mb-4">👷 Workers Portal</h1>
              <p className="text-lg mb-8">Workforce and resource management</p>
              <div className="bg-lime-50 p-6 rounded-lg">
                <p className="text-lime-800">Staff management, scheduling, performance, training</p>
              </div>
            </div>} />
            
            {/* Business Management Portals */}
            <Route path="/crm/*" element={<div className="container mx-auto py-20 text-center">
              <h1 className="text-3xl font-bold mb-4">👥 CRM Portal</h1>
              <p className="text-lg mb-8">Customer relationship and lead management</p>
              <div className="bg-cyan-50 p-6 rounded-lg">
                <p className="text-cyan-800">Lead management, customer data, sales pipeline</p>
              </div>
            </div>} />
            
            <Route path="/directory/*" element={<div className="container mx-auto py-20 text-center">
              <h1 className="text-3xl font-bold mb-4">📚 Directory Portal</h1>
              <p className="text-lg mb-8">Business directory and network management</p>
              <div className="bg-slate-50 p-6 rounded-lg">
                <p className="text-slate-800">Business directory, network, contacts, search</p>
              </div>
            </div>} />
            
            {/* Integration & Technology Portals */}
            <Route path="/edi/*" element={<div className="container mx-auto py-20 text-center">
              <h1 className="text-3xl font-bold mb-4">📡 EDI Portal</h1>
              <p className="text-lg mb-8">Electronic data interchange management</p>
              <div className="bg-purple-50 p-6 rounded-lg">
                <p className="text-purple-800">EDI processing, integration, monitoring, compliance</p>
              </div>
            </div>} />
            
            <Route path="/marketplace/*" element={<div className="container mx-auto py-20 text-center">
              <h1 className="text-3xl font-bold mb-4">🛒 Marketplace</h1>
              <p className="text-lg mb-8">TMS marketplace and integrations</p>
              <div className="bg-orange-50 p-6 rounded-lg">
                <p className="text-orange-800">App store, integrations, services, partners</p>
              </div>
            </div>} />
            
            <Route path="/testing/*" element={<div className="container mx-auto py-20 text-center">
              <h1 className="text-3xl font-bold mb-4">🧪 Testing Center</h1>
              <p className="text-lg mb-8">Development and testing environment</p>
              <div className="bg-lime-50 p-6 rounded-lg">
                <p className="text-lime-800">Agent testing, development, performance testing</p>
              </div>
            </div>} />
            
            {/* AI Dashboard routes */}
            <Route path="/ai/analytics" element={<AIAnalytics />} />
            <Route path="/ai/health" element={<AIHealth />} />
            <Route path="/ai/agents" element={<AIAgents />} />
            <Route path="/ai/autonomous-system" element={<AutonomousSystem />} />
            <Route path="/ai/autonomous-agents" element={<AgentMonitoring />} />
            <Route path="/ai/monitoring" element={<AgentMonitoring />} />
            
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
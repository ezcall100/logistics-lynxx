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
            
            {/* Portal routes */}
            <Route path="/carrier" element={<CarrierPortal />} />
            <Route path="/broker" element={<BrokerPortal />} />
            <Route path="/shipper" element={<ShipperPortal />} />
            <Route path="/driver" element={<DriverPortal />} />
            <Route path="/owner-operator" element={<OwnerOperatorPortal />} />
            
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
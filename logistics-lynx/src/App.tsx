import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Simple test component without AppShell
const TestDashboard = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">🧠 MCP-V2 Portal Ecosystem</h1>
      <p className="text-xl text-gray-300 mb-6">Trans Bot AI - Master Control Program</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-2">System Status</h3>
          <p className="text-green-400">🟢 All Systems Operational</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-2">Portal Cores</h3>
          <p className="text-blue-400">6 Active Portals</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-2">Network Health</h3>
          <p className="text-purple-400">97.1% Efficiency</p>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestDashboard />} />
        <Route path="/super-admin" element={<TestDashboard />} />
        <Route path="/super-admin/dashboard" element={<TestDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
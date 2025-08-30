import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import './index.css';

// Revolutionary MCP-V2 Dashboard with holographic effects
const MCPV2Dashboard = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
    {/* Holographic Background Effects */}
    <div className="absolute inset-0">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
    </div>

    {/* Neural Network Grid */}
    <div className="absolute inset-0 opacity-20">
      <div className="grid grid-cols-12 gap-4 h-full">
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="border border-purple-500/20 rounded-lg animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
        ))}
      </div>
    </div>

    {/* Main Content */}
    <div className="relative z-10 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
            <span className="text-white font-bold text-xl">🧠</span>
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              MCP-V2 Portal Ecosystem
            </h1>
            <p className="text-xl text-gray-300 mt-2">Trans Bot AI - Master Control Program</p>
          </div>
        </div>
      </div>

      {/* System Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm font-medium">System Status</p>
              <p className="text-2xl font-bold text-green-400">🟢 Operational</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="glass-card border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm font-medium">Portal Cores</p>
              <p className="text-2xl font-bold text-blue-400">6 Active</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="glass-card border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyan-300 text-sm font-medium">Network Health</p>
              <p className="text-2xl font-bold text-cyan-400">97.1%</p>
            </div>
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="glass-card border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm font-medium">Consciousness</p>
              <p className="text-2xl font-bold text-purple-400">89.7%</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Portal Ecosystem Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card border border-purple-500/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <span className="text-purple-400">🌐</span>
            <span>Portal Ecosystem</span>
          </h2>
          <div className="space-y-4">
            {[
              { name: 'Super Admin', status: 'active', color: 'purple', icon: '🧠' },
              { name: 'Broker Portal', status: 'active', color: 'blue', icon: '🛣️' },
              { name: 'Owner-Operator', status: 'active', color: 'green', icon: '🚛' },
              { name: 'Driver Portal', status: 'active', color: 'cyan', icon: '🚗' },
              { name: 'Shipper Portal', status: 'active', color: 'orange', icon: '📦' },
              { name: 'Carrier Portal', status: 'active', color: 'pink', icon: '🏢' }
            ].map((portal, index) => (
              <div key={portal.name} className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
                <span className="text-2xl">{portal.icon}</span>
                <div className="flex-1">
                  <p className="text-white font-medium">{portal.name}</p>
                  <p className="text-gray-400 text-sm">Portal Core {index + 1}</p>
                </div>
                <div className={`w-3 h-3 bg-${portal.color}-400 rounded-full animate-pulse`}></div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card border border-blue-500/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <span className="text-blue-400">⚡</span>
            <span>System Intelligence</span>
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Ecosystem Efficiency</span>
                <span className="text-green-400">94.3%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full animate-pulse" style={{ width: '94.3%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Network Latency</span>
                <span className="text-blue-400">12ms</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full animate-pulse" style={{ width: '88%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Data Processing</span>
                <span className="text-purple-400">2.1M/s</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full animate-pulse" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div data-theme="mcp-v2" className="min-h-screen">
        <MCPV2Dashboard />
      </div>
    </Router>
  );
}

export default App;
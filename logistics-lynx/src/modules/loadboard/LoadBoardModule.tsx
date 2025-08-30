import React, { useState } from 'react';

const LoadBoardModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'broker' | 'shipper' | 'carrier' | 'owner-operator'>('broker');

  const matchmakingMetrics = {
    broker: { matches: 247, successRate: 94.2, avgResponseTime: '2.3min' },
    shipper: { matches: 156, successRate: 91.8, avgResponseTime: '1.8min' },
    carrier: { matches: 892, successRate: 96.7, avgResponseTime: '3.1min' },
    'owner-operator': { matches: 445, successRate: 89.5, avgResponseTime: '4.2min' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-cyan-900 to-teal-900 relative overflow-hidden">
      {/* Holographic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25">
            <span className="text-white font-bold text-xl">📋</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-teal-200 to-cyan-200 bg-clip-text text-transparent">
              Load Board Module
            </h1>
            <p className="text-xl text-gray-300 mt-2">Data-Informed Freight Matchmaker</p>
          </div>
        </div>

        {/* Party Selection Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-xl rounded-xl p-1 border border-white/20">
            {[
              { id: 'broker', label: 'Broker', icon: '🛣️', color: 'from-blue-500 to-indigo-600' },
              { id: 'shipper', label: 'Shipper', icon: '📦', color: 'from-orange-500 to-amber-600' },
              { id: 'carrier', label: 'Carrier', icon: '🏢', color: 'from-pink-500 to-rose-600' },
              { id: 'owner-operator', label: 'Owner-Operator', icon: '🚛', color: 'from-green-500 to-emerald-600' }
            ].map((party) => (
              <button
                key={party.id}
                onClick={() => setActiveTab(party.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === party.id
                    ? `bg-gradient-to-r ${party.color} text-white shadow-lg`
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{party.icon}</span>
                <span className="font-medium">{party.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Matchmaking Intelligence Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="glass-card border border-teal-500/20">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-3">
              <span className="text-teal-400">🎯</span>
              <span>Matchmaking Intelligence</span>
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Active Matches</span>
                <span className="text-2xl font-bold text-teal-400">
                  {matchmakingMetrics[activeTab].matches}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Success Rate</span>
                <span className="text-2xl font-bold text-green-400">
                  {matchmakingMetrics[activeTab].successRate}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Avg Response</span>
                <span className="text-2xl font-bold text-blue-400">
                  {matchmakingMetrics[activeTab].avgResponseTime}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card border border-cyan-500/20">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-3">
              <span className="text-cyan-400">🧠</span>
              <span>AI Matching Engine</span>
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Lane Compatibility</span>
                  <span className="text-cyan-400">98.7%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-400 to-teal-400 h-2 rounded-full animate-pulse" style={{ width: '98.7%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Equipment Match</span>
                  <span className="text-cyan-400">95.3%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-400 to-teal-400 h-2 rounded-full animate-pulse" style={{ width: '95.3%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Rate Optimization</span>
                  <span className="text-cyan-400">92.1%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-400 to-teal-400 h-2 rounded-full animate-pulse" style={{ width: '92.1%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card border border-blue-500/20">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-3">
              <span className="text-blue-400">📊</span>
              <span>Market Analytics</span>
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm text-gray-400">Spot Rate Index</div>
                <div className="text-xl font-bold text-blue-400">$2.47/mile</div>
                <div className="text-xs text-green-400">+5.2% vs last week</div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm text-gray-400">Load Volume</div>
                <div className="text-xl font-bold text-blue-400">12,847</div>
                <div className="text-xs text-green-400">+8.7% vs last week</div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm text-gray-400">Truck Availability</div>
                <div className="text-xl font-bold text-blue-400">8,234</div>
                <div className="text-xs text-red-400">-2.1% vs last week</div>
              </div>
            </div>
          </div>
        </div>

        {/* Party-Specific Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeTab === 'broker' && (
            <>
              <div className="glass-card border border-blue-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Broker Intelligence</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400">🎯</span>
                    <span className="text-gray-300">Smart Carrier Matching</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400">📈</span>
                    <span className="text-gray-300">Rate Optimization Engine</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400">⚡</span>
                    <span className="text-gray-300">Real-time Market Data</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400">🤖</span>
                    <span className="text-gray-300">Automated Negotiation</span>
                  </div>
                </div>
              </div>
              <div className="glass-card border border-indigo-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Load Management</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-indigo-400">📋</span>
                    <span className="text-gray-300">Bulk Load Posting</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-indigo-400">🎯</span>
                    <span className="text-gray-300">Targeted Carrier Outreach</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-indigo-400">📊</span>
                    <span className="text-gray-300">Performance Analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-indigo-400">🔗</span>
                    <span className="text-gray-300">CRM Integration</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'shipper' && (
            <>
              <div className="glass-card border border-orange-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Shipper Intelligence</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-orange-400">🚛</span>
                    <span className="text-gray-300">Carrier Qualification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-orange-400">💰</span>
                    <span className="text-gray-300">Cost Optimization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-orange-400">📊</span>
                    <span className="text-gray-300">Service Level Tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-orange-400">🔒</span>
                    <span className="text-gray-300">Compliance Monitoring</span>
                  </div>
                </div>
              </div>
              <div className="glass-card border border-amber-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Shipment Management</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-amber-400">📦</span>
                    <span className="text-gray-300">Multi-Modal Options</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-amber-400">🎯</span>
                    <span className="text-gray-300">Preferred Carrier Network</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-amber-400">📈</span>
                    <span className="text-gray-300">Volume Forecasting</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-amber-400">🔗</span>
                    <span className="text-gray-300">ERP Integration</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'carrier' && (
            <>
              <div className="glass-card border border-pink-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Carrier Intelligence</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-pink-400">🎯</span>
                    <span className="text-gray-300">Load Matching Algorithm</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-pink-400">💰</span>
                    <span className="text-gray-300">Revenue Optimization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-pink-400">📊</span>
                    <span className="text-gray-300">Lane Performance Analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-pink-400">🤖</span>
                    <span className="text-gray-300">Automated Bidding</span>
                  </div>
                </div>
              </div>
              <div className="glass-card border border-rose-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Fleet Management</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-rose-400">🚛</span>
                    <span className="text-gray-300">Equipment Utilization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-rose-400">👥</span>
                    <span className="text-gray-300">Driver Assignment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-rose-400">📈</span>
                    <span className="text-gray-300">Capacity Planning</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-rose-400">🔗</span>
                    <span className="text-gray-300">TMS Integration</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'owner-operator' && (
            <>
              <div className="glass-card border border-green-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Owner-Operator Intelligence</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400">🎯</span>
                    <span className="text-gray-300">Personalized Load Matching</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400">💰</span>
                    <span className="text-gray-300">Profit Maximization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400">📊</span>
                    <span className="text-gray-300">Home Time Optimization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400">🤖</span>
                    <span className="text-gray-300">Smart Route Planning</span>
                  </div>
                </div>
              </div>
              <div className="glass-card border border-emerald-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Business Management</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-emerald-400">📱</span>
                    <span className="text-gray-300">Mobile-First Interface</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-emerald-400">💳</span>
                    <span className="text-gray-300">Quick Pay Options</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-emerald-400">📈</span>
                    <span className="text-gray-300">Expense Tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-emerald-400">🔗</span>
                    <span className="text-gray-300">ELD Integration</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadBoardModule;

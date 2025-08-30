import React, { useState } from 'react';

const RatesModule: React.FC = () => {
  const [activeAudience, setActiveAudience] = useState<'broker' | 'shipper' | 'carrier' | 'owner-operator'>('broker');
  const [rateType, setRateType] = useState<'spot' | 'contract' | 'ltr' | 'ltl'>('spot');

  const rateIntelligence = {
    broker: {
      avgMargin: 12.5,
      winRate: 78.3,
      avgResponseTime: '1.2min',
      marketShare: 15.7
    },
    shipper: {
      avgSavings: 8.2,
      serviceScore: 94.1,
      onTimeDelivery: 96.8,
      costPerMile: 2.34
    },
    carrier: {
      avgRevenue: 3.47,
      utilization: 87.2,
      deadhead: 12.8,
      profitMargin: 18.5
    },
    'owner-operator': {
      avgRate: 2.89,
      homeTime: 34.2,
      fuelEfficiency: 6.8,
      netProfit: 22.1
    }
  };

  const rateFactors = [
    { factor: 'Distance', weight: 35, trend: '+2.1%' },
    { factor: 'Fuel Prices', weight: 25, trend: '+5.7%' },
    { factor: 'Market Demand', weight: 20, trend: '+8.3%' },
    { factor: 'Equipment Type', weight: 12, trend: '+1.2%' },
    { factor: 'Seasonality', weight: 8, trend: '-3.4%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-900 relative overflow-hidden">
      {/* Holographic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <span className="text-white font-bold text-xl">💰</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-emerald-200 to-green-200 bg-clip-text text-transparent">
              Rates Module
            </h1>
            <p className="text-xl text-gray-300 mt-2">Freight Rate Intelligence Engine</p>
          </div>
        </div>

        {/* Audience Selection Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-xl rounded-xl p-1 border border-white/20">
            {[
              { id: 'broker', label: 'Broker', icon: '🛣️', color: 'from-blue-500 to-indigo-600' },
              { id: 'shipper', label: 'Shipper', icon: '📦', color: 'from-orange-500 to-amber-600' },
              { id: 'carrier', label: 'Carrier', icon: '🏢', color: 'from-pink-500 to-rose-600' },
              { id: 'owner-operator', label: 'Owner-Operator', icon: '🚛', color: 'from-green-500 to-emerald-600' }
            ].map((audience) => (
              <button
                key={audience.id}
                onClick={() => setActiveAudience(audience.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeAudience === audience.id
                    ? `bg-gradient-to-r ${audience.color} text-white shadow-lg`
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{audience.icon}</span>
                <span className="font-medium">{audience.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Rate Type Selection */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-xl rounded-xl p-1 border border-white/20 max-w-md">
            {[
              { id: 'spot', label: 'Spot Rates', icon: '⚡' },
              { id: 'contract', label: 'Contract', icon: '📋' },
              { id: 'ltr', label: 'LTR', icon: '🚛' },
              { id: 'ltl', label: 'LTL', icon: '📦' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setRateType(type.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  rateType === type.id
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-sm">{type.icon}</span>
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Rate Intelligence Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="glass-card border border-emerald-500/20">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-3">
              <span className="text-emerald-400">📊</span>
              <span>Rate Intelligence</span>
            </h3>
            <div className="space-y-4">
              {activeAudience === 'broker' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Avg Margin</span>
                    <span className="text-2xl font-bold text-emerald-400">
                      {rateIntelligence.broker.avgMargin}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Win Rate</span>
                    <span className="text-2xl font-bold text-green-400">
                      {rateIntelligence.broker.winRate}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Response Time</span>
                    <span className="text-2xl font-bold text-blue-400">
                      {rateIntelligence.broker.avgResponseTime}
                    </span>
                  </div>
                </>
              )}
              {activeAudience === 'shipper' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Avg Savings</span>
                    <span className="text-2xl font-bold text-emerald-400">
                      {rateIntelligence.shipper.avgSavings}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Service Score</span>
                    <span className="text-2xl font-bold text-green-400">
                      {rateIntelligence.shipper.serviceScore}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">On-Time Delivery</span>
                    <span className="text-2xl font-bold text-blue-400">
                      {rateIntelligence.shipper.onTimeDelivery}%
                    </span>
                  </div>
                </>
              )}
              {activeAudience === 'carrier' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Avg Revenue</span>
                    <span className="text-2xl font-bold text-emerald-400">
                      ${rateIntelligence.carrier.avgRevenue}/mile
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Utilization</span>
                    <span className="text-2xl font-bold text-green-400">
                      {rateIntelligence.carrier.utilization}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Profit Margin</span>
                    <span className="text-2xl font-bold text-blue-400">
                      {rateIntelligence.carrier.profitMargin}%
                    </span>
                  </div>
                </>
              )}
              {activeAudience === 'owner-operator' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Avg Rate</span>
                    <span className="text-2xl font-bold text-emerald-400">
                      ${rateIntelligence['owner-operator'].avgRate}/mile
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Home Time</span>
                    <span className="text-2xl font-bold text-green-400">
                      {rateIntelligence['owner-operator'].homeTime}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Net Profit</span>
                    <span className="text-2xl font-bold text-blue-400">
                      {rateIntelligence['owner-operator'].netProfit}%
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="glass-card border border-green-500/20">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-3">
              <span className="text-green-400">🧠</span>
              <span>Rate Factors</span>
            </h3>
            <div className="space-y-4">
              {rateFactors.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{factor.factor}</span>
                    <span className="text-green-400">{factor.weight}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full animate-pulse" 
                      style={{ width: `${factor.weight}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400">{factor.trend} vs last month</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card border border-teal-500/20">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-3">
              <span className="text-teal-400">📈</span>
              <span>Market Trends</span>
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm text-gray-400">National Average</div>
                <div className="text-xl font-bold text-teal-400">$2.47/mile</div>
                <div className="text-xs text-green-400">+5.2% vs last week</div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm text-gray-400">Fuel Surcharge</div>
                <div className="text-xl font-bold text-teal-400">$0.23/mile</div>
                <div className="text-xs text-red-400">+12.1% vs last week</div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm text-gray-400">Capacity Index</div>
                <div className="text-xl font-bold text-teal-400">87.3</div>
                <div className="text-xs text-green-400">+2.8% vs last week</div>
              </div>
            </div>
          </div>
        </div>

        {/* Audience-Specific Rate Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeAudience === 'broker' && (
            <>
              <div className="glass-card border border-blue-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Broker Rate Intelligence</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400">🎯</span>
                    <span className="text-gray-300">Margin Optimization Engine</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400">📊</span>
                    <span className="text-gray-300">Competitive Rate Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400">⚡</span>
                    <span className="text-gray-300">Real-time Rate Updates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400">🤖</span>
                    <span className="text-gray-300">Automated Quote Generation</span>
                  </div>
                </div>
              </div>
              <div className="glass-card border border-indigo-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Rate Management</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-indigo-400">📋</span>
                    <span className="text-gray-300">Lane Rate Matrix</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-indigo-400">🎯</span>
                    <span className="text-gray-300">Carrier Rate Negotiation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-indigo-400">📈</span>
                    <span className="text-gray-300">Profit Margin Tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-indigo-400">🔗</span>
                    <span className="text-gray-300">TMS Integration</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeAudience === 'shipper' && (
            <>
              <div className="glass-card border border-orange-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Shipper Rate Intelligence</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-orange-400">💰</span>
                    <span className="text-gray-300">Cost Optimization Engine</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-orange-400">📊</span>
                    <span className="text-gray-300">Rate Benchmarking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-orange-400">⚡</span>
                    <span className="text-gray-300">Spot vs Contract Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-orange-400">🤖</span>
                    <span className="text-gray-300">Automated Rate Shopping</span>
                  </div>
                </div>
              </div>
              <div className="glass-card border border-amber-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Rate Management</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-amber-400">📋</span>
                    <span className="text-gray-300">Contract Rate Management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-amber-400">🎯</span>
                    <span className="text-gray-300">Preferred Carrier Rates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-amber-400">📈</span>
                    <span className="text-gray-300">Budget Forecasting</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-amber-400">🔗</span>
                    <span className="text-gray-300">ERP Integration</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeAudience === 'carrier' && (
            <>
              <div className="glass-card border border-pink-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Carrier Rate Intelligence</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-pink-400">💰</span>
                    <span className="text-gray-300">Revenue Optimization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-pink-400">📊</span>
                    <span className="text-gray-300">Lane Profitability Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-pink-400">⚡</span>
                    <span className="text-gray-300">Market Rate Positioning</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-pink-400">🤖</span>
                    <span className="text-gray-300">Automated Rate Bidding</span>
                  </div>
                </div>
              </div>
              <div className="glass-card border border-rose-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Rate Management</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-rose-400">📋</span>
                    <span className="text-gray-300">Rate Card Management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-rose-400">🎯</span>
                    <span className="text-gray-300">Contract Rate Negotiation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-rose-400">📈</span>
                    <span className="text-gray-300">Profit Margin Tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-rose-400">🔗</span>
                    <span className="text-gray-300">TMS Integration</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeAudience === 'owner-operator' && (
            <>
              <div className="glass-card border border-green-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Owner-Operator Rate Intelligence</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400">💰</span>
                    <span className="text-gray-300">Profit Maximization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400">📊</span>
                    <span className="text-gray-300">Personal Rate Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400">⚡</span>
                    <span className="text-gray-300">Quick Rate Comparison</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400">🤖</span>
                    <span className="text-gray-300">Smart Load Selection</span>
                  </div>
                </div>
              </div>
              <div className="glass-card border border-emerald-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Rate Management</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-emerald-400">📋</span>
                    <span className="text-gray-300">Personal Rate Cards</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-emerald-400">🎯</span>
                    <span className="text-gray-300">Minimum Rate Settings</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-emerald-400">📈</span>
                    <span className="text-gray-300">Earnings Tracking</span>
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

export default RatesModule;

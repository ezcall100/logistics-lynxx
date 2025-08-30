import React, { useState } from 'react';

const OnboardingModule: React.FC = () => {
  const [activeEntity, setActiveEntity] = useState<'carrier' | 'shipper' | 'broker'>('carrier');
  const [onboardingStage, setOnboardingStage] = useState<'pre-screening' | 'documentation' | 'verification' | 'activation'>('pre-screening');

  const onboardingMetrics = {
    carrier: {
      totalApplications: 1247,
      approved: 892,
      pending: 234,
      rejected: 121,
      avgTime: '3.2 days'
    },
    shipper: {
      totalApplications: 567,
      approved: 489,
      pending: 45,
      rejected: 33,
      avgTime: '2.1 days'
    },
    broker: {
      totalApplications: 234,
      approved: 187,
      pending: 28,
      rejected: 19,
      avgTime: '4.5 days'
    }
  };

  const stages = [
    { id: 'pre-screening', label: 'Pre-Screening', icon: '🔍', color: 'from-blue-500 to-indigo-600' },
    { id: 'documentation', label: 'Documentation', icon: '📋', color: 'from-orange-500 to-amber-600' },
    { id: 'verification', label: 'Verification', icon: '✅', color: 'from-green-500 to-emerald-600' },
    { id: 'activation', label: 'Activation', icon: '🚀', color: 'from-purple-500 to-pink-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Holographic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/25">
            <span className="text-white font-bold text-xl">🚀</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-violet-200 to-purple-200 bg-clip-text text-transparent">
              Onboarding Module
            </h1>
            <p className="text-xl text-gray-300 mt-2">Unified Onboarding & Compliance System</p>
          </div>
        </div>

        {/* Entity Selection Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-xl rounded-xl p-1 border border-white/20">
            {[
              { id: 'carrier', label: 'Carrier', icon: '🏢', color: 'from-pink-500 to-rose-600' },
              { id: 'shipper', label: 'Shipper', icon: '📦', color: 'from-orange-500 to-amber-600' },
              { id: 'broker', label: 'Broker', icon: '🛣️', color: 'from-blue-500 to-indigo-600' }
            ].map((entity) => (
              <button
                key={entity.id}
                onClick={() => setActiveEntity(entity.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeEntity === entity.id
                    ? `bg-gradient-to-r ${entity.color} text-white shadow-lg`
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{entity.icon}</span>
                <span className="font-medium">{entity.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Onboarding Pipeline Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="glass-card border border-violet-500/20">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-3">
              <span className="text-violet-400">📊</span>
              <span>Onboarding Pipeline</span>
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Applications</span>
                <span className="text-2xl font-bold text-violet-400">
                  {onboardingMetrics[activeEntity].totalApplications}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Approved</span>
                <span className="text-2xl font-bold text-green-400">
                  {onboardingMetrics[activeEntity].approved}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Pending</span>
                <span className="text-2xl font-bold text-yellow-400">
                  {onboardingMetrics[activeEntity].pending}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Avg Time</span>
                <span className="text-2xl font-bold text-blue-400">
                  {onboardingMetrics[activeEntity].avgTime}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card border border-purple-500/20">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-3">
              <span className="text-purple-400">🎯</span>
              <span>Compliance Status</span>
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Documentation</span>
                  <span className="text-purple-400">94.2%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-400 to-violet-400 h-2 rounded-full animate-pulse" style={{ width: '94.2%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Verification</span>
                  <span className="text-purple-400">87.6%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-400 to-violet-400 h-2 rounded-full animate-pulse" style={{ width: '87.6%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Activation</span>
                  <span className="text-purple-400">91.8%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-400 to-violet-400 h-2 rounded-full animate-pulse" style={{ width: '91.8%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card border border-pink-500/20">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-3">
              <span className="text-pink-400">⚡</span>
              <span>Automation Status</span>
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm text-gray-400">Auto-Approval Rate</div>
                <div className="text-xl font-bold text-pink-400">67.3%</div>
                <div className="text-xs text-green-400">+12.1% vs last month</div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm text-gray-400">Document Processing</div>
                <div className="text-xl font-bold text-pink-400">89.7%</div>
                <div className="text-xs text-green-400">+8.3% vs last month</div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm text-gray-400">Fraud Detection</div>
                <div className="text-xl font-bold text-pink-400">96.2%</div>
                <div className="text-xs text-green-400">+2.1% vs last month</div>
              </div>
            </div>
          </div>
        </div>

        {/* Onboarding Stages */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-xl rounded-xl p-1 border border-white/20">
            {stages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => setOnboardingStage(stage.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  onboardingStage === stage.id
                    ? `bg-gradient-to-r ${stage.color} text-white shadow-lg`
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{stage.icon}</span>
                <span className="font-medium">{stage.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Entity-Specific Onboarding Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeEntity === 'carrier' && (
            <>
              <div className="glass-card border border-pink-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Carrier Onboarding</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-pink-400">📋</span>
                    <span className="text-gray-300">Authority & Insurance Verification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-pink-400">🚛</span>
                    <span className="text-gray-300">Equipment & Fleet Registration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-pink-400">👥</span>
                    <span className="text-gray-300">Driver Qualification & CDL</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-pink-400">🔒</span>
                    <span className="text-gray-300">Safety & Compliance Checks</span>
                  </div>
                </div>
              </div>
              <div className="glass-card border border-rose-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Carrier Requirements</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-rose-400">📄</span>
                    <span className="text-gray-300">MC Authority & DOT Number</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-rose-400">🛡️</span>
                    <span className="text-gray-300">Cargo & Liability Insurance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-rose-400">📊</span>
                    <span className="text-gray-300">Safety Rating & CSA Score</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-rose-400">🔗</span>
                    <span className="text-gray-300">ELD & TMS Integration</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeEntity === 'shipper' && (
            <>
              <div className="glass-card border border-orange-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Shipper Onboarding</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-orange-400">🏢</span>
                    <span className="text-gray-300">Business Entity Verification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-orange-400">📦</span>
                    <span className="text-gray-300">Shipping Profile & Requirements</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-orange-400">💰</span>
                    <span className="text-gray-300">Credit & Payment Terms</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-orange-400">🔗</span>
                    <span className="text-gray-300">ERP & WMS Integration</span>
                  </div>
                </div>
              </div>
              <div className="glass-card border border-amber-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Shipper Requirements</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-amber-400">📄</span>
                    <span className="text-gray-300">Business License & Tax ID</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-amber-400">🏭</span>
                    <span className="text-gray-300">Facility & Location Details</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-amber-400">📊</span>
                    <span className="text-gray-300">Volume & Lane Information</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-amber-400">🔒</span>
                    <span className="text-gray-300">Security & Access Controls</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeEntity === 'broker' && (
            <>
              <div className="glass-card border border-blue-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Broker Onboarding</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400">📋</span>
                    <span className="text-gray-300">MC Authority & Bond Verification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400">🏢</span>
                    <span className="text-gray-300">Business Entity & Operations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400">💰</span>
                    <span className="text-gray-300">Financial Capacity & Credit</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400">🔗</span>
                    <span className="text-gray-300">TMS & Integration Setup</span>
                  </div>
                </div>
              </div>
              <div className="glass-card border border-indigo-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Broker Requirements</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-indigo-400">📄</span>
                    <span className="text-gray-300">MC Authority & Surety Bond</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-indigo-400">🏢</span>
                    <span className="text-gray-300">Business License & Insurance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-indigo-400">📊</span>
                    <span className="text-gray-300">Financial Statements & Credit</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-indigo-400">🔒</span>
                    <span className="text-gray-300">Compliance & Safety Records</span>
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

export default OnboardingModule;

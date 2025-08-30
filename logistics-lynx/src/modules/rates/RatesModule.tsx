import React from 'react';

const RatesModule: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-900 relative overflow-hidden">
      {/* Holographic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
            <p className="text-xl text-gray-300 mt-2">Pricing Engine</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card border border-emerald-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Lane Matrix</h3>
            <p className="text-gray-300">Origin/destination, equipment, weight class, service level</p>
          </div>
          <div className="glass-card border border-green-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Pricers</h3>
            <p className="text-gray-300">Spot quotes, contract tariffs, margin targets, accessorials</p>
          </div>
          <div className="glass-card border border-emerald-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Intelligence</h3>
            <p className="text-gray-300">Historicals, win/loss tracking, quote validity windows</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatesModule;

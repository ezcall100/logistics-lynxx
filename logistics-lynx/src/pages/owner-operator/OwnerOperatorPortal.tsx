import React from 'react';

const OwnerOperatorPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
            <span className="text-white font-bold text-xl">🚛</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent">
              Owner-Operator Portal
            </h1>
            <p className="text-xl text-gray-300 mt-2">Fleet Management & Operations Control</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card border border-green-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">My Loads</h3>
            <p className="text-gray-300">Scheduling, payout tracking, performance analytics</p>
          </div>
          <div className="glass-card border border-emerald-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Equipment Management</h3>
            <p className="text-gray-300">Truck/trailer inventory, maintenance scheduling</p>
          </div>
          <div className="glass-card border border-green-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Cash Flow</h3>
            <p className="text-gray-300">Advance requests, factoring, payment tracking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerOperatorPortal;

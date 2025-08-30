import React from 'react';

const BrokerPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      {/* Holographic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <span className="text-white font-bold text-xl">🛣️</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent">
              Broker Portal
            </h1>
            <p className="text-xl text-gray-300 mt-2">Logistics Orchestration & Optimization</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card border border-blue-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Operations Center</h3>
            <p className="text-gray-300">Leads → Quotes → Booked → In-Transit → Delivered</p>
          </div>
          <div className="glass-card border border-indigo-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Billing & Documents</h3>
            <p className="text-gray-300">Rate confirmations, BOL/POD, invoicing</p>
          </div>
          <div className="glass-card border border-blue-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Carrier Network</h3>
            <p className="text-gray-300">Scorecards, analytics, relationship tracking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerPortal;

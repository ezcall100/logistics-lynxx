import React from 'react';

const CarrierPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-900 to-pink-900 relative overflow-hidden">
      {/* Holographic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/25">
            <span className="text-white font-bold text-xl">🏢</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-pink-200 to-rose-200 bg-clip-text text-transparent">
              Carrier Portal
            </h1>
            <p className="text-xl text-gray-300 mt-2">Transportation Network Management & CRM</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card border border-pink-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Contracts & Lanes</h3>
            <p className="text-gray-300">Lane matrix, bid tracking, contract management</p>
          </div>
          <div className="glass-card border border-rose-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Network CRM</h3>
            <p className="text-gray-300">Shipper/broker contacts, relationship tracking</p>
          </div>
          <div className="glass-card border border-pink-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Financial Management</h3>
            <p className="text-gray-300">Invoice management, settlement tracking, AR/AP</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrierPortal;

import React from 'react';

const ShipperPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-amber-900 to-orange-900 relative overflow-hidden">
      {/* Holographic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
            <span className="text-white font-bold text-xl">📦</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-orange-200 to-amber-200 bg-clip-text text-transparent">
              Shipper Portal
            </h1>
            <p className="text-xl text-gray-300 mt-2">Cargo Management & Tracking System</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card border border-orange-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Book a Shipment</h3>
            <p className="text-gray-300">Requirements wizard, accessorial selection, rate comparison</p>
          </div>
          <div className="glass-card border border-amber-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Track & Trace</h3>
            <p className="text-gray-300">Live map interface, milestone tracking, real-time updates</p>
          </div>
          <div className="glass-card border border-orange-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Vendor Management</h3>
            <p className="text-gray-300">Preferred carriers, performance scorecards, contracts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipperPortal;

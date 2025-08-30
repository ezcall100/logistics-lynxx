import React from 'react';

const DriverPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-cyan-900 relative overflow-hidden">
      {/* Holographic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <span className="text-white font-bold text-xl">🚗</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
              Driver Portal
            </h1>
            <p className="text-xl text-gray-300 mt-2">Mobile-First Operational Interface</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card border border-cyan-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Today View</h3>
            <p className="text-gray-300">Stops, ETAs, turn-by-turn navigation, barcode scanning</p>
          </div>
          <div className="glass-card border border-blue-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Check-ins Management</h3>
            <p className="text-gray-300">Arrive/depart tracking, detention timer, POD capture</p>
          </div>
          <div className="glass-card border border-cyan-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">HOS/DVIR Management</h3>
            <p className="text-gray-300">Hours of service logs, vehicle inspections, compliance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverPortal;

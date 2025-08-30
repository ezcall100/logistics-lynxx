import React from 'react';

const CRMModule: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Holographic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <span className="text-white font-bold text-xl">📊</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              CRM Module
            </h1>
            <p className="text-xl text-gray-300 mt-2">Unified Relationships System</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card border border-indigo-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Accounts & Contacts</h3>
            <p className="text-gray-300">Entity management, relationship tracking, communication history</p>
          </div>
          <div className="glass-card border border-purple-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Leads & Deals</h3>
            <p className="text-gray-300">Pipeline management, opportunity tracking, sales automation</p>
          </div>
          <div className="glass-card border border-indigo-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Activities & Tasks</h3>
            <p className="text-gray-300">Task management, follow-ups, reminders, calendar integration</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMModule;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import the new Professional Super Admin
import ProfessionalSuperAdmin from './components/super-admin/ProfessionalSuperAdmin';

// Simple landing page for portal selection
const PortalSelector = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
        🏢 TMS Professional Platform
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
        Transportation Management System with AI-Powered Super Admin
      </p>
      <div className="space-y-4">
        <button
          onClick={() => window.location.href = '/#/super-admin'}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          🚀 Launch Professional Super Admin
        </button>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Main Portal Selection */}
        <Route path="/" element={<PortalSelector />} />
        
        {/* Professional Super Admin Portal */}
        <Route path="/super-admin/*" element={<ProfessionalSuperAdmin />} />
        
        {/* Global fallback → Portal Selector */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

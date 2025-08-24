import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SuperAdmin from './components/SuperAdmin';
import { AuthProvider } from './context/AuthContext';

// Landing page component
const LandingPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center space-y-6">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-gray-900">
          🏢 TMS Enterprise Platform
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Advanced Transportation Management System with AI-Powered Super Admin Control Center
        </p>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={() => window.location.href = '/#/super-admin'}
          className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          🚀 Launch Super Admin Portal
        </button>
        
        <div className="text-sm text-gray-500">
          <p>Enterprise-grade management and monitoring</p>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Super Admin Portal */}
          <Route path="/super-admin/*" element={<SuperAdmin />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;

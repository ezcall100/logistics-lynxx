import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SuperAdmin from './components/SuperAdmin';
import ErrorBoundary from './components/ErrorBoundary';

// Landing page component
const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
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
            onClick={() => navigate('/super-admin')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
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
};

function App() {
  console.log('🔍 App.tsx: App component rendering...');
  console.log('🔍 App.tsx: Current location:', window.location.pathname);
  
  return (
    <ErrorBoundary>
      <div className="App">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Super Admin Portal - All routes under /super-admin/* */}
          <Route path="/super-admin/*" element={<SuperAdmin />} />
          
          {/* Redirect /super-admin to /super-admin/dashboard */}
          <Route path="/super-admin" element={<Navigate to="/super-admin/dashboard" replace />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;

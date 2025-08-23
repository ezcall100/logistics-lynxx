import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import SuperAdminNew from './components/SuperAdminNew';
import LoginPage from './pages/auth/LoginPage';

const LandingPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        TransBot TMS Platform
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Welcome to the Logistics Management System
      </p>
      <div className="space-y-4">
        <a
          href="/#/super-admin"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Access Super Admin Portal
        </a>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        
        {/* Protected Super Admin routes */}
        <Route
          path="/super-admin/*"
          element={
            <ProtectedRoute requiredRoles={['super_admin', 'admin', 'analyst']}>
              <SuperAdminNew />
            </ProtectedRoute>
          }
        />
        
        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;

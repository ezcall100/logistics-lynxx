import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Simple test component for SuperAdmin
const SuperAdminDashboard = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🏢 Super Admin Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Welcome to the Super Admin Portal
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">System Status</h3>
            <p className="text-blue-700">All systems operational</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-2">User Management</h3>
            <p className="text-green-700">Active users: 25</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Analytics</h3>
            <p className="text-purple-700">Data processing active</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SuperAdmin: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SuperAdminDashboard />} />
      <Route path="*" element={<SuperAdminDashboard />} />
    </Routes>
  );
};

export default SuperAdmin;

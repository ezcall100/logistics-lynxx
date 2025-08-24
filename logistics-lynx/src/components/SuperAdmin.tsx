import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SuperAdminRoutes from '../pages/super-admin/SuperAdminRoutes';

const SuperAdmin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Simple Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-gray-900">🏢 Super Admin</h1>
            <p className="text-sm text-gray-600">Portal</p>
          </div>
          <nav className="p-4 space-y-2">
            <a href="#/super-admin" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              🏠 Dashboard
            </a>
            <a href="#/super-admin/users" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              👥 User Management
            </a>
            <a href="#/super-admin/invites" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              📧 Invite Management
            </a>
            <a href="#/super-admin/settings" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              ⚙️ Settings
            </a>
            <a href="#/super-admin/security/dashboard" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              🛡️ Security Dashboard
            </a>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="p-6">
            <SuperAdminRoutes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;

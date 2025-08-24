import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Shield,
  User
} from 'lucide-react';

const UserPreferences: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">User Preferences</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === 'general' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              General
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === 'notifications' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Bell className="w-4 h-4 inline mr-2" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === 'security' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Shield className="w-4 h-4 inline mr-2" />
              Security
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === 'users' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Users
            </button>
          </nav>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            {activeTab === 'general' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">User General Preferences</h2>
                <p className="text-gray-600">Personal application settings and preferences.</p>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">User Notification Preferences</h2>
                <p className="text-gray-600">Configure personal notification preferences.</p>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">User Security Preferences</h2>
                <p className="text-gray-600">Manage personal security and privacy settings.</p>
              </div>
            )}
            
            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">User Account Management</h2>
                <p className="text-gray-600">Manage personal account settings.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;

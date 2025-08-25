import React from 'react';
import { usePermissions, useCanPerform } from '../../hooks/usePermissions';

/**
 * Example component demonstrating feature-level permission checking
 * This shows how to conditionally render UI elements based on user permissions
 */
const PermissionExample: React.FC = () => {
  const permissions = usePermissions();
  const canCreateUser = useCanPerform('create', 'users');
  const canEditUser = useCanPerform('edit', 'users');
  const canDeleteUser = useCanPerform('delete', 'users');

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        🔐 Permission Example
      </h2>
      
      <div className="space-y-6">
        {/* User Management Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            👥 User Management
          </h3>
          
          <div className="space-y-3">
            {/* Create User Button */}
            {canCreateUser ? (
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                ➕ Create New User
              </button>
            ) : (
              <button 
                disabled 
                className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed"
                title="You don't have permission to create users"
              >
                ➕ Create New User
              </button>
            )}

            {/* Edit User Button */}
            {canEditUser ? (
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                ✏️ Edit User
              </button>
            ) : (
              <button 
                disabled 
                className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed"
                title="You don't have permission to edit users"
              >
                ✏️ Edit User
              </button>
            )}

            {/* Delete User Button */}
            {canDeleteUser ? (
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                🗑️ Delete User
              </button>
            ) : (
              <button 
                disabled 
                className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed"
                title="You don't have permission to delete users"
              >
                🗑️ Delete User
              </button>
            )}
          </div>
        </div>

        {/* System Administration Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            ⚙️ System Administration
          </h3>
          
          <div className="space-y-3">
            {permissions.canManageSystem ? (
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                🔧 System Settings
              </button>
            ) : (
              <div className="text-gray-500 text-sm">
                🔒 System administration access required
              </div>
            )}
          </div>
        </div>

        {/* Security Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🛡️ Security Management
          </h3>
          
          <div className="space-y-3">
            {permissions.canManageSecurity ? (
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors">
                🔐 Security Settings
              </button>
            ) : (
              <div className="text-gray-500 text-sm">
                🔒 Security administration access required
              </div>
            )}
          </div>
        </div>

        {/* MCP Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🤖 MCP Control Center
          </h3>
          
          <div className="space-y-3">
            {permissions.canManageMCP ? (
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                🧠 AI Agent Management
              </button>
            ) : (
              <div className="text-gray-500 text-sm">
                🔒 MCP administration access required
              </div>
            )}
          </div>
        </div>

        {/* Feature Flags Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🚀 Feature Flags
          </h3>
          
          <div className="space-y-3">
            {permissions.hasFabDispatch ? (
              <div className="text-green-600 text-sm">
                ✅ FAB Dispatch feature enabled
              </div>
            ) : (
              <div className="text-gray-500 text-sm">
                ❌ FAB Dispatch feature disabled
              </div>
            )}

            {permissions.hasAIAgents ? (
              <div className="text-green-600 text-sm">
                ✅ AI Agents feature enabled
              </div>
            ) : (
              <div className="text-gray-500 text-sm">
                ❌ AI Agents feature disabled
              </div>
            )}

            {permissions.hasAdvancedAnalytics ? (
              <div className="text-green-600 text-sm">
                ✅ Advanced Analytics feature enabled
              </div>
            ) : (
              <div className="text-gray-500 text-sm">
                ❌ Advanced Analytics feature disabled
              </div>
            )}

            {permissions.hasMultiTenant ? (
              <div className="text-green-600 text-sm">
                ✅ Multi-Tenant feature enabled
              </div>
            ) : (
              <div className="text-gray-500 text-sm">
                ❌ Multi-Tenant feature disabled
              </div>
            )}
          </div>
        </div>

        {/* Role Information */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            👤 Current Role & Permissions
          </h3>
          
          <div className="space-y-2 text-sm">
            <div>
              <strong>Super Admin:</strong> {permissions.isSuperAdmin ? '✅' : '❌'}
            </div>
            <div>
              <strong>Admin:</strong> {permissions.isAdmin ? '✅' : '❌'}
            </div>
            <div>
              <strong>Manager:</strong> {permissions.isManager ? '✅' : '❌'}
            </div>
            <div>
              <strong>User:</strong> {permissions.isUser ? '✅' : '❌'}
            </div>
            <div>
              <strong>Can Manage All:</strong> {permissions.canManageAll ? '✅' : '❌'}
            </div>
            <div>
              <strong>Can Access Admin:</strong> {permissions.canAccessAdmin ? '✅' : '❌'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionExample;

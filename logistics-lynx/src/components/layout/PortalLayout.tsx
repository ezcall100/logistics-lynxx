import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings } from 'lucide-react';

interface PortalLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const PortalLayout: React.FC<PortalLayoutProps> = ({ children, title, subtitle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-semibold text-gray-900">TransBot AI</h1>
              </div>
              <div className="ml-8">
                <h2 className="text-lg font-medium text-gray-900">{title}</h2>
                {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">{user?.name}</span>
                <span className="text-xs text-gray-500">({user?.role?.replace('_', ' ').toUpperCase()})</span>
              </div>
              
              <button
                onClick={() => navigate('/settings')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Settings className="h-5 w-5" />
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default PortalLayout;

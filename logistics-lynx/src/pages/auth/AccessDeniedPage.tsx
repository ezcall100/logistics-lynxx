import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, ArrowLeft, Home } from 'lucide-react';

const AccessDeniedPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleGoHome = () => {
    // Redirect to appropriate dashboard based on user role
    const userRole = user?.role || 'super_admin';
    switch (userRole) {
      case 'super_admin':
        navigate('/super-admin/dashboard');
        break;
      case 'carrier_admin':
        navigate('/carrier/dashboard');
        break;
      case 'freight_broker_admin':
        navigate('/broker/dashboard');
        break;
      case 'shipper_admin':
        navigate('/shipper/dashboard');
        break;
      case 'carrier_driver':
        navigate('/driver/dashboard');
        break;
      case 'owner_operator':
        navigate('/owner-operator/dashboard');
        break;
      default:
        navigate('/super-admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
      <div className="max-w-md w-full space-y-8 p-8 text-center">
        <div className="mx-auto h-20 w-20 bg-red-600 rounded-full flex items-center justify-center mb-6">
          <Shield className="h-10 w-10 text-white" />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            You don't have permission to access this portal
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Current role: <span className="font-semibold">{user?.role || 'Unknown'}</span>
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Home className="h-4 w-4 mr-2" />
            Go to My Dashboard
          </button>
          
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign Out
          </button>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>Need access?</strong> Contact your administrator to request portal permissions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedPage;

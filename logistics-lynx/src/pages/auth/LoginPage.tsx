import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Role definitions with demo credentials
const roles = [
  { label: 'Super Admin', value: 'super_admin', email: 'ezcallnet.mo@gmail.com', password: 'demo-password' },
  { label: 'Carrier Admin', value: 'carrier_admin', email: 'carrier@transbotai.com', password: 'demo-password' },
  { label: 'Broker Admin', value: 'freight_broker_admin', email: 'broker@transbotai.com', password: 'demo-password' },
  { label: 'Shipper Admin', value: 'shipper_admin', email: 'shipper@transbotai.com', password: 'demo-password' },
  { label: 'Driver', value: 'carrier_driver', email: 'driver@transbotai.com', password: 'demo-password' },
  { label: 'Owner Operator', value: 'owner_operator', email: 'owner@transbotai.com', password: 'demo-password' },
];

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');
  const [autoFillEnabled, setAutoFillEnabled] = useState(true);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page they were trying to visit
  const from = location.state?.from?.pathname || '/super-admin';

  // Handle role selection with autofill
  const handleRoleChange = (roleValue: string) => {
    setSelectedRole(roleValue);
    if (autoFillEnabled && roleValue) {
      const role = roles.find(r => r.value === roleValue);
      if (role) {
        setEmail(role.email);
        setPassword(role.password);
      }
    }
  };

  // Role-based redirect function
  const redirectUserByRole = (role: string): string => {
    switch (role) {
      case 'super_admin': return '/super-admin/dashboard';
      case 'carrier_admin': return '/carrier/dashboard';
      case 'freight_broker_admin': return '/broker/dashboard';
      case 'shipper_admin': return '/shipper/dashboard';
      case 'carrier_driver': return '/driver/dashboard';
      case 'owner_operator': return '/owner-operator/dashboard';
      default: return '/super-admin/dashboard';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        console.log('🔍 LoginPage: Login successful, redirecting to', from);
        // Redirect based on selected role
        const redirectPath = selectedRole ? redirectUserByRole(selectedRole) : from;
        navigate(redirectPath, { replace: true });
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error('🔍 LoginPage: Login error', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your TMS Enterprise account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Select Role
              </label>
              <select
                id="role"
                name="role"
                value={selectedRole}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose your role...</option>
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Auto-fill Toggle */}
            <div className="flex items-center">
              <input
                id="autoFill"
                name="autoFill"
                type="checkbox"
                checked={autoFillEnabled}
                onChange={(e) => setAutoFillEnabled(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="autoFill" className="ml-2 block text-sm text-gray-700">
                Auto-fill demo credentials
              </label>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Demo Credentials: Select a role above to auto-fill
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

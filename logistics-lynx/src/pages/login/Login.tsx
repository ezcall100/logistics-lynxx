
import React from 'react';
import { Truck, AlertCircle, CheckCircle } from 'lucide-react';
import LoginForm from '@/components/login/LoginForm';
import RoleSelector, { roles } from '@/components/login/RoleSelector';
import LoginHero from '@/components/login/LoginHero';
import { useLoginForm } from '@/hooks/login/useLoginForm';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const { user, isAuthenticated } = useAuth();
  const {
    email,
    password,
    selectedRole,
    isLoading,
    error,
    setEmail,
    setPassword,
    setSelectedRoleLocal,
    handleSubmit,
    handleForgotPassword,
  } = useLoginForm();

  const selectedRoleData = roles.find(role => role.value === selectedRole);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
      <div className="grid w-full max-w-[900px] grid-cols-1 overflow-hidden rounded-2xl shadow-lg md:grid-cols-5">
        {/* Left side - form */}
        <div className="col-span-3 p-8 md:p-12">
          <div className="mb-8 flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Truck className="h-6 w-6" />
            </div>
            <h1 className="ml-3 text-2xl font-bold">LogiPortal</h1>
          </div>
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Welcome back</h2>
            <p className="mt-2 text-muted-foreground">
              Sign in to access your logistics dashboard
            </p>
          </div>

          {/* Show authentication status */}
          {isAuthenticated && user && (
            <div className="mb-4 flex items-center space-x-2 rounded-md bg-green-50 p-3 text-sm text-green-700 border border-green-200">
              <CheckCircle className="h-4 w-4" />
              <span>Authenticated as {user.email}</span>
            </div>
          )}
          
          <div className="space-y-6">
            <LoginForm
              email={email}
              password={password}
              isLoading={isLoading}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onSubmit={handleSubmit}
              onForgotPassword={handleForgotPassword}
              selectedRoleLabel={selectedRoleData?.label}
            />
            
            <RoleSelector
              selectedRole={selectedRole}
              onRoleChange={setSelectedRoleLocal}
            />
            
            {error && (
              <div className="flex items-center space-x-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Debug information for troubleshooting */}
          <div className="mt-8 text-xs text-muted-foreground">
            <p>Debug: Auth status - {isAuthenticated ? 'Authenticated' : 'Not authenticated'}</p>
            {user && <p>User: {user.email}</p>}
          </div>
        </div>
        
        {/* Right side - hero */}
        <LoginHero />
      </div>
    </div>
  );
};

export default Login;

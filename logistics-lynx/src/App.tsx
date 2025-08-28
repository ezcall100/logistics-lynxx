// App.tsx — Minimal Working Routes
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

// ✅ Core components
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const SuperAdmin = lazy(() => import('./components/SuperAdmin'));

// ✅ Super Admin Dashboard
const SuperAdminDashboard = lazy(() => import('./pages/super-admin/dashboard/SuperAdminDashboard'));

// ✅ Working User Management Pages
const UserManagement = lazy(() => import('./pages/super-admin/user-management/UserManagement'));
const UserOnboarding = lazy(() => import('./pages/super-admin/user-management/UserOnboarding'));

// ✅ Working System Administration Pages
const SystemAdministration = lazy(() => import('./pages/super-admin/system-administration/Configuration'));

// ✅ Working Security Pages
const SecurityAudit = lazy(() => import('./pages/super-admin/security/SecurityAudit'));

// ✅ Working Settings Pages
// const SystemSettings = lazy(() => import('./pages/super-admin/settings/SystemSettings'));
const ProfileSettings = lazy(() => import('./pages/super-admin/settings/ProfileSettings'));

// ✅ Working Profile Pages
const ProfileOverview = lazy(() => import('./pages/super-admin/profile/ProfileOverview'));
const PersonalInformation = lazy(() => import('./pages/super-admin/profile/PersonalInformation'));
const ActivityHistory = lazy(() => import('./pages/super-admin/profile/ActivityHistory'));

function App() {
  console.log('✅ App.tsx rendering...');
  console.log('🌐 Current route:', window.location.pathname);
  console.log('🔍 Auth state check:', localStorage.getItem('auth_user'));
  
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Suspense fallback={<div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '18px',
          color: '#666'
        }}>Loading...</div>}>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Super Admin Routes - Minimal Working Set */}
          <Route path="/super-admin" element={<SuperAdmin />}>
            {/* Dashboard */}
            <Route index element={<SuperAdminDashboard />} />
            <Route path="dashboard" element={<SuperAdminDashboard />} />
            
            {/* User Management - Working Routes */}
            <Route path="users" element={<UserManagement />} />
            <Route path="users/onboarding" element={<UserOnboarding />} />
            
            {/* System Administration - Working Routes */}
            <Route path="system" element={<SystemAdministration />} />
            
            {/* Security - Working Routes */}
            <Route path="security" element={<SecurityAudit />} />
            <Route path="security/audit" element={<SecurityAudit />} />
            
            {/* Settings - Working Routes */}
            <Route path="settings" element={<ProfileSettings />} />
            <Route path="settings/profile" element={<ProfileSettings />} />
            
            {/* Profile - Working Routes */}
            <Route path="profile" element={<ProfileOverview />} />
            <Route path="profile/overview" element={<ProfileOverview />} />
            <Route path="profile/personal" element={<PersonalInformation />} />
            <Route path="profile/activity" element={<ActivityHistory />} />
          </Route>
          
          {/* Catch all fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        </Suspense>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
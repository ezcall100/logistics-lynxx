// App.tsx — Complete Routing Structure Matching Sidebar
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

// ✅ Core components
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const SuperAdmin = lazy(() => import('./components/SuperAdmin'));

// ✅ Dashboard
const SuperAdminDashboard = lazy(() => import('./pages/super-admin/dashboard/SuperAdminDashboard'));

// ✅ User Management
const AllUsers = lazy(() => import('./pages/super-admin/user-management/AllUsers'));
const UserRoles = lazy(() => import('./pages/super-admin/user-management/UserRoles'));
const UserGroups = lazy(() => import('./pages/super-admin/user-management/UserGroups'));
const AccessControl = lazy(() => import('./pages/super-admin/user-management/AccessControl'));
const UserAnalytics = lazy(() => import('./pages/super-admin/user-management/UserAnalytics'));
const BillingManagement = lazy(() => import('./pages/super-admin/user-management/BillingManagement'));
const SupportTickets = lazy(() => import('./pages/super-admin/user-management/SupportTickets'));
const UserOnboarding = lazy(() => import('./pages/super-admin/user-management/UserOnboarding'));

// ✅ System Administration - Working Components Only
const Configuration = lazy(() => import('./pages/super-admin/system-administration/Configuration'));
// const DatabaseManagement = lazy(() => import('./pages/super-admin/system-administration/DatabaseManagement'));
// const APIManagement = lazy(() => import('./pages/super-admin/system-administration/APIManagement'));
// const ServerMonitoring = lazy(() => import('./pages/super-admin/system-administration/ServerMonitoring'));
// const DeploymentManagement = lazy(() => import('./pages/super-admin/system-administration/DeploymentManagement'));
// const BackupRecovery = lazy(() => import('./pages/super-admin/system-administration/BackupRecovery'));
// const SecuritySettings = lazy(() => import('./pages/super-admin/system-administration/SecuritySettings'));
// const IntegrationHub = lazy(() => import('./pages/super-admin/system-administration/IntegrationHub'));
// const FileStorage = lazy(() => import('./pages/super-admin/system-administration/FileStorage'));
// const EmailServices = lazy(() => import('./pages/super-admin/system-administration/EmailServices'));

// ✅ Security Center - Working Components Only
const SecurityAudit = lazy(() => import('./pages/super-admin/security/SecurityAudit'));
// const AccessLogs = lazy(() => import('./pages/super-admin/security-center/AccessLogs'));
// const DataProtection = lazy(() => import('./pages/super-admin/security-center/DataProtection'));
// const APISecurity = lazy(() => import('./pages/super-admin/security-center/APISecurity'));
// const UserPermissions = lazy(() => import('./pages/super-admin/security-center/UserPermissions'));
// const SecurityPolicies = lazy(() => import('./pages/super-admin/security-center/SecurityPolicies'));
// const IncidentResponse = lazy(() => import('./pages/super-admin/security-center/IncidentResponse'));
// const ComplianceManagement = lazy(() => import('./pages/super-admin/security-center/ComplianceManagement'));

// ✅ Settings - Working Components Only
const ProfileSettings = lazy(() => import('./pages/super-admin/settings/ProfileSettings'));

// ✅ Profile - Working Components Only
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

          {/* Super Admin Routes - Complete Structure Matching Sidebar */}
          <Route path="/super-admin" element={<SuperAdmin />}>
            {/* Dashboard */}
            <Route index element={<SuperAdminDashboard />} />
            <Route path="dashboard" element={<SuperAdminDashboard />} />
            
            {/* User Management */}
            <Route path="users" element={<AllUsers />} />
            <Route path="users/roles" element={<UserRoles />} />
            <Route path="users/groups" element={<UserGroups />} />
            <Route path="users/access" element={<AccessControl />} />
            <Route path="users/analytics" element={<UserAnalytics />} />
            <Route path="users/billing" element={<BillingManagement />} />
            <Route path="users/support" element={<SupportTickets />} />
            <Route path="users/onboarding" element={<UserOnboarding />} />
            
            {/* System Administration - Working Routes Only */}
            <Route path="system/config" element={<Configuration />} />
            {/* <Route path="system/database" element={<DatabaseManagement />} /> */}
            {/* <Route path="system/api" element={<APIManagement />} /> */}
            {/* <Route path="system/monitoring" element={<ServerMonitoring />} /> */}
            {/* <Route path="system/deployment" element={<DeploymentManagement />} /> */}
            {/* <Route path="system/backup" element={<BackupRecovery />} /> */}
            {/* <Route path="system/security" element={<SecuritySettings />} /> */}
            {/* <Route path="system/integrations" element={<IntegrationHub />} /> */}
            {/* <Route path="system/storage" element={<FileStorage />} /> */}
            {/* <Route path="system/email" element={<EmailServices />} /> */}
            
            {/* Security Center - Working Routes Only */}
            <Route path="security/audit" element={<SecurityAudit />} />
            
            {/* Settings - Working Routes Only */}
            <Route path="settings" element={<ProfileSettings />} />
            <Route path="settings/profile" element={<ProfileSettings />} />
            
            {/* Profile - Working Routes Only */}
            <Route path="profile" element={<ProfileOverview />} />
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
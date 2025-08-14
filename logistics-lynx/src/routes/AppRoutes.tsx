import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth, RequireRoles } from '@/auth/RequireAuth';
import AppShell from '@/components/layout/AppShell';

// Lazy load portal components
const UnifiedDashboard = lazy(() => import('@/components/dashboard/UnifiedDashboard'));
const RatesPortal = lazy(() => import('@/components/rates/RatesPortal'));
const DirectoryPortal = lazy(() => import('@/components/directory/DirectoryPortal'));

export default function AppRoutes() {
  return (
    <RequireAuth>
      <AppShell>
        <Suspense fallback={<div className="p-6">Loading…</div>}>
          <Routes>
            <Route path="/" element={<UnifiedDashboard />} />

            {/* Rates Portal (Shippers, Brokers, Carriers, Super/Admin) */}
            <Route
              path="/rates/*"
              element={
                <RequireRoles roles={['shipper_admin','freight_broker_admin','carrier_admin','super_admin']}>
                  <RatesPortal />
                </RequireRoles>
              }
            />

            {/* Directory Portal (Shippers, Brokers, Carriers, Super/Admin) */}
            <Route
              path="/directory/*"
              element={
                <RequireRoles roles={['shipper_admin','freight_broker_admin','carrier_admin','super_admin']}>
                  <DirectoryPortal />
                </RequireRoles>
              }
            />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AppShell>
    </RequireAuth>
  );
}

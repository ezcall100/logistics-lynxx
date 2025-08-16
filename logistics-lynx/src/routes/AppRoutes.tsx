import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth, RequireRoles } from '@/auth/RequireAuth';
import AppShell from '@/components/layout/AppShell';

// Lazy load portal components
const UnifiedDashboard = lazy(() => import('@/components/dashboard/UnifiedDashboard'));
const RatesPortal = lazy(() => import('@/components/rates/RatesPortal'));
const DirectoryPortal = lazy(() => import('@/components/directory/DirectoryPortal'));

// Lazy load portal dashboards
const BrokerDashboard = lazy(() => import('@/pages/broker/dashboard'));
const CarrierDashboard = lazy(() => import('@/pages/carrier/dashboard'));
const ShipperDashboard = lazy(() => import('@/pages/shipper/dashboard'));
const DriverDashboard = lazy(() => import('@/pages/driver/dashboard'));
const SuperAdminDashboard = lazy(() => import('@/pages/superAdmin/dashboard'));

export default function AppRoutes() {
  return (
    <RequireAuth>
      <AppShell>
        <Suspense fallback={<div className="p-6">Loading…</div>}>
          <Routes>
            <Route path="/" element={<UnifiedDashboard />} />

            {/* Portal Dashboards */}
            <Route path="/broker/dashboard" element={<BrokerDashboard />} />
            <Route path="/carrier/dashboard" element={<CarrierDashboard />} />
            <Route path="/shipper/dashboard" element={<ShipperDashboard />} />
            <Route path="/driver/dashboard" element={<DriverDashboard />} />
            <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />

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

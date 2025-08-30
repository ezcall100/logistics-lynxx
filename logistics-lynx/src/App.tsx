import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import SuperAdminDashboard from './pages/super-admin/dashboard/SuperAdminDashboard';
import BrokerPortal from './pages/broker/BrokerPortal';
import OwnerOperatorPortal from './pages/owner-operator/OwnerOperatorPortal';
import DriverPortal from './pages/driver/DriverPortal';
import ShipperPortal from './pages/shipper/ShipperPortal';
import CarrierPortal from './pages/carrier/CarrierPortal';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import CRMModule from './modules/crm/CRMModule';
import LoadBoardModule from './modules/loadboard/LoadBoardModule';
import RatesModule from './modules/rates/RatesModule';
import FinancialsModule from './modules/financials/FinancialsModule';
import OnboardingModule from './modules/onboarding/OnboardingModule';
import MarketplaceModule from './modules/marketplace/MarketplaceModule';
import DirectoryModule from './modules/directory/DirectoryModule';
import './index.css';

function App() {
  return (
    <Router>
      <div data-theme="mcp-v2" className="min-h-screen">
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Protected Routes with AppShell */}
          <Route path="/" element={
            <AppShell>
              <SuperAdminDashboard />
            </AppShell>
          } />
          <Route path="/super-admin" element={
            <AppShell>
              <SuperAdminDashboard />
            </AppShell>
          } />
          <Route path="/super-admin/dashboard" element={
            <AppShell>
              <SuperAdminDashboard />
            </AppShell>
          } />
          
          {/* Portal Routes */}
          <Route path="/broker/*" element={
            <AppShell>
              <BrokerPortal />
            </AppShell>
          } />
          <Route path="/owner-operator/*" element={
            <AppShell>
              <OwnerOperatorPortal />
            </AppShell>
          } />
          <Route path="/driver/*" element={
            <AppShell>
              <DriverPortal />
            </AppShell>
          } />
          <Route path="/shipper/*" element={
            <AppShell>
              <ShipperPortal />
            </AppShell>
          } />
          <Route path="/carrier/*" element={
            <AppShell>
              <CarrierPortal />
            </AppShell>
          } />
          
          {/* Cross-Portal Module Routes */}
          <Route path="/crm/*" element={
            <AppShell>
              <CRMModule />
            </AppShell>
          } />
          <Route path="/loadboard/*" element={
            <AppShell>
              <LoadBoardModule />
            </AppShell>
          } />
          <Route path="/rates/*" element={
            <AppShell>
              <RatesModule />
            </AppShell>
          } />
          <Route path="/financials/*" element={
            <AppShell>
              <FinancialsModule />
            </AppShell>
          } />
          <Route path="/onboarding/*" element={
            <AppShell>
              <OnboardingModule />
            </AppShell>
          } />
          <Route path="/marketplace/*" element={
            <AppShell>
              <MarketplaceModule />
            </AppShell>
          } />
          <Route path="/directory/*" element={
            <AppShell>
              <DirectoryModule />
            </AppShell>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
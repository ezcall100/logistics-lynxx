import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import SuperAdminDashboard from './pages/super-admin/dashboard/SuperAdminDashboard';
import BrokerPortal from './pages/broker/BrokerPortal';
import OwnerOperatorPortal from './pages/owner-operator/OwnerOperatorPortal';
import DriverPortal from './pages/driver/DriverPortal';
import ShipperPortal from './pages/shipper/ShipperPortal';
import CarrierPortal from './pages/carrier/CarrierPortal';
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
        <AppShell>
          <Routes>
            {/* Super Admin Portal */}
            <Route path="/" element={<SuperAdminDashboard />} />
            <Route path="/super-admin" element={<SuperAdminDashboard />} />
            <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
            
            {/* Portal Routes */}
            <Route path="/broker/*" element={<BrokerPortal />} />
            <Route path="/owner-operator/*" element={<OwnerOperatorPortal />} />
            <Route path="/driver/*" element={<DriverPortal />} />
            <Route path="/shipper/*" element={<ShipperPortal />} />
            <Route path="/carrier/*" element={<CarrierPortal />} />
            
            {/* Cross-Portal Module Routes */}
            <Route path="/crm/*" element={<CRMModule />} />
            <Route path="/loadboard/*" element={<LoadBoardModule />} />
            <Route path="/rates/*" element={<RatesModule />} />
            <Route path="/financials/*" element={<FinancialsModule />} />
            <Route path="/onboarding/*" element={<OnboardingModule />} />
            <Route path="/marketplace/*" element={<MarketplaceModule />} />
            <Route path="/directory/*" element={<DirectoryModule />} />
          </Routes>
        </AppShell>
      </div>
    </Router>
  );
}

export default App;
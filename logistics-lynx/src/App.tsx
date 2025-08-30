import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

// Super Admin Portal
import SuperAdminDashboard from './pages/super-admin/dashboard/SuperAdminDashboard';
import UserGroups from './pages/super-admin/user-management/UserGroups';
import UserRoles from './pages/super-admin/user-management/UserRoles';
import UserOnboarding from './pages/super-admin/user-management/UserOnboarding';

// Broker Portal
import BrokerPortal from './pages/broker/BrokerPortal';
import BrokerDashboard from './pages/broker/BrokerDashboard';
import LoadManagement from './pages/broker/LoadManagement';
import CarrierManagement from './pages/broker/CarrierManagement';
import RateOptimization from './pages/broker/RateOptimization';
import ComplianceCenter from './pages/broker/ComplianceCenter';
import Analytics from './pages/broker/Analytics';

// Carrier Portal
import CarrierPortal from './pages/carrier/CarrierPortal';
import CarrierDashboard from './pages/carrier/CarrierDashboard';
import FleetManagement from './pages/carrier/FleetManagement';
import RouteOptimization from './pages/carrier/RouteOptimization';
import DriverManagement from './pages/carrier/DriverManagement';
import MaintenanceCenter from './pages/carrier/MaintenanceCenter';
import CarrierAnalytics from './pages/carrier/CarrierAnalytics';

// Shipper Portal
import ShipperPortal from './pages/shipper/ShipperPortal';
import ShipperDashboard from './pages/shipper/ShipperDashboard';
import ShipmentTracking from './pages/shipper/ShipmentTracking';
import CostOptimization from './pages/shipper/CostOptimization';
import ServiceMonitoring from './pages/shipper/ServiceMonitoring';
import ComplianceTracking from './pages/shipper/ComplianceTracking';
import ShipperAnalytics from './pages/shipper/ShipperAnalytics';

// Driver Portal
import DriverPortal from './pages/driver/DriverPortal';
import DriverDashboard from './pages/driver/DriverDashboard';
import RouteNavigation from './pages/driver/RouteNavigation';
import TimeTracking from './pages/driver/TimeTracking';
import CommunicationTools from './pages/driver/CommunicationTools';
import DriverAnalytics from './pages/driver/DriverAnalytics';

// Owner-Operator Portal
import OwnerOperatorPortal from './pages/owner-operator/OwnerOperatorPortal';
import OwnerOperatorDashboard from './pages/owner-operator/OwnerOperatorDashboard';
import ProfitMaximization from './pages/owner-operator/ProfitMaximization';
import HomeTimeOptimization from './pages/owner-operator/HomeTimeOptimization';
import SmartRoutePlanning from './pages/owner-operator/SmartRoutePlanning';
import FinancialTracking from './pages/owner-operator/FinancialTracking';
import OwnerOperatorAnalytics from './pages/owner-operator/OwnerOperatorAnalytics';

// Modules
import CRMModule from './modules/crm/CRMModule';
import LoadBoardModule from './modules/loadboard/LoadBoardModule';
import RatesModule from './modules/rates/RatesModule';
import FinancialsModule from './modules/financials/FinancialsModule';
import OnboardingModule from './modules/onboarding/OnboardingModule';
import MarketplaceModule from './modules/marketplace/MarketplaceModule';
import DirectoryModule from './modules/directory/DirectoryModule';
import FactoringModule from './modules/factoring/FactoringModule';

// Landing Page
import LandingPage from './pages/landing/LandingPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Super Admin Portal */}
          <Route path="/super-admin" element={<SuperAdminDashboard />} />
          <Route path="/super-admin/user-groups" element={<UserGroups />} />
          <Route path="/super-admin/user-roles" element={<UserRoles />} />
          <Route path="/super-admin/user-onboarding" element={<UserOnboarding />} />
          
          {/* Broker Portal */}
          <Route path="/broker" element={<BrokerPortal />}>
            <Route index element={<BrokerDashboard />} />
            <Route path="dashboard" element={<BrokerDashboard />} />
            <Route path="loads" element={<LoadManagement />} />
            <Route path="carriers" element={<CarrierManagement />} />
            <Route path="rates" element={<RateOptimization />} />
            <Route path="compliance" element={<ComplianceCenter />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
          
          {/* Carrier Portal */}
          <Route path="/carrier" element={<CarrierPortal />}>
            <Route index element={<CarrierDashboard />} />
            <Route path="dashboard" element={<CarrierDashboard />} />
            <Route path="fleet" element={<FleetManagement />} />
            <Route path="routes" element={<RouteOptimization />} />
            <Route path="drivers" element={<DriverManagement />} />
            <Route path="maintenance" element={<MaintenanceCenter />} />
            <Route path="analytics" element={<CarrierAnalytics />} />
          </Route>
          
          {/* Shipper Portal */}
          <Route path="/shipper" element={<ShipperPortal />}>
            <Route index element={<ShipperDashboard />} />
            <Route path="dashboard" element={<ShipperDashboard />} />
            <Route path="tracking" element={<ShipmentTracking />} />
            <Route path="costs" element={<CostOptimization />} />
            <Route path="services" element={<ServiceMonitoring />} />
            <Route path="compliance" element={<ComplianceTracking />} />
            <Route path="analytics" element={<ShipperAnalytics />} />
          </Route>
          
          {/* Driver Portal */}
          <Route path="/driver" element={<DriverPortal />}>
            <Route index element={<DriverDashboard />} />
            <Route path="dashboard" element={<DriverDashboard />} />
            <Route path="navigation" element={<RouteNavigation />} />
            <Route path="time-tracking" element={<TimeTracking />} />
            <Route path="communication" element={<CommunicationTools />} />
            <Route path="analytics" element={<DriverAnalytics />} />
          </Route>
          
          {/* Owner-Operator Portal */}
          <Route path="/owner-operator" element={<OwnerOperatorPortal />}>
            <Route index element={<OwnerOperatorDashboard />} />
            <Route path="dashboard" element={<OwnerOperatorDashboard />} />
            <Route path="profit" element={<ProfitMaximization />} />
            <Route path="home-time" element={<HomeTimeOptimization />} />
            <Route path="routes" element={<SmartRoutePlanning />} />
            <Route path="financials" element={<FinancialTracking />} />
            <Route path="analytics" element={<OwnerOperatorAnalytics />} />
          </Route>
          
          {/* Module Routes */}
          <Route path="/modules/crm" element={<CRMModule />} />
          <Route path="/modules/loadboard" element={<LoadBoardModule />} />
          <Route path="/modules/rates" element={<RatesModule />} />
          <Route path="/modules/financials" element={<FinancialsModule />} />
          <Route path="/modules/onboarding" element={<OnboardingModule />} />
          <Route path="/modules/marketplace" element={<MarketplaceModule />} />
          <Route path="/modules/directory" element={<DirectoryModule />} />
          
          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
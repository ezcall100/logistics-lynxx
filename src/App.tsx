
import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SuperAdminPortal from './pages/SuperAdminPortal';
import BrokerPortal from './pages/BrokerPortal';
import CarrierPortal from './pages/CarrierPortal';
import DriverPortal from './pages/DriverPortal';
import ShipperPortal from './pages/ShipperPortal';
import AnalyticsPortal from './pages/AnalyticsPortal';

const App: FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/super-admin" element={<SuperAdminPortal />} />
          <Route path="/broker" element={<BrokerPortal />} />
          <Route path="/carrier" element={<CarrierPortal />} />
          <Route path="/driver" element={<DriverPortal />} />
          <Route path="/shipper" element={<ShipperPortal />} />
          <Route path="/analytics" element={<AnalyticsPortal />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

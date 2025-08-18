
import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import SuperAdminPortal from './pages/SuperAdminPortal';
import BrokerPortal from './pages/BrokerPortal';
import CarrierPortal from './pages/CarrierPortal';
import DriverPortal from './pages/DriverPortal';
import ShipperPortal from './pages/ShipperPortal';
import AnalyticsPortal from './pages/AnalyticsPortal';

const App: FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Header />
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/super-admin" 
              element={
                <ProtectedRoute requiredRole="super_admin">
                  <SuperAdminPortal />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/broker" 
              element={
                <ProtectedRoute requiredRole="freight_broker_admin">
                  <BrokerPortal />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/carrier" 
              element={
                <ProtectedRoute requiredRole="carrier_admin">
                  <CarrierPortal />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/driver" 
              element={
                <ProtectedRoute requiredRole="carrier_driver">
                  <DriverPortal />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/shipper" 
              element={
                <ProtectedRoute requiredRole="shipper_admin">
                  <ShipperPortal />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute requiredRole="super_admin">
                  <AnalyticsPortal />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

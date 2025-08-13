
import React from 'react';
import { useLocation } from 'react-router-dom';
import CustomersPage from '@/components/networks/CustomersPage';
import CarriersPage from '@/components/networks/CarriersPage';
import VendorsPage from '@/components/networks/VendorsPage';
import TerminalsPage from '@/components/networks/TerminalsPage';
import LocationsPage from '@/components/networks/LocationsPage';
import NetworksOverview from '@/pages/broker-admin/networks/NetworksOverview';
import PartnerManagement from '@/pages/broker-admin/networks/PartnerManagement';
import NetworkAnalytics from '@/pages/broker-admin/networks/NetworkAnalytics';

const NetworksPage = () => {
  const location = useLocation();
  
  // Determine which component to render based on current route
  const getCurrentComponent = () => {
    const path = location.pathname;
    if (path.includes('/customers')) return 'customers';
    if (path.includes('/carriers')) return 'carriers';
    if (path.includes('/vendors')) return 'vendors';
    if (path.includes('/terminals')) return 'terminals';
    if (path.includes('/locations')) return 'locations';
    if (path.includes('/partners')) return 'partners';
    if (path.includes('/analytics')) return 'analytics';
    if (path.endsWith('/networks') || path.endsWith('/networks/')) return 'overview';
    return 'overview'; // default to overview
  };

  const currentSection = getCurrentComponent();

  const renderCurrentComponent = () => {
    switch (currentSection) {
      case 'overview':
        return <NetworksOverview />;
      case 'customers':
        return <CustomersPage />;
      case 'carriers':
        return <CarriersPage />;
      case 'vendors':
        return <VendorsPage />;
      case 'terminals':
        return <TerminalsPage />;
      case 'locations':
        return <LocationsPage />;
      case 'partners':
        return <PartnerManagement />;
      case 'analytics':
        return <NetworkAnalytics />;
      default:
        return <NetworksOverview />;
    }
  };

  return (
    <div>
      {renderCurrentComponent()}
    </div>
  );
};

export default NetworksPage;

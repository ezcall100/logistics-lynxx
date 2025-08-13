
import { useAuth } from '@/context/AuthContext';
import AutonomousLayout from '@/components/layout/AutonomousLayout';
import SuperAdminDashboard from './SuperAdminDashboard';
import CarrierAdminDashboard from './CarrierAdminDashboard';
import BrokerAdminDashboard from './BrokerAdminDashboard';
import ShipperAdminDashboard from './ShipperAdminDashboard';
import DriverDashboard from './DriverDashboard';
import OwnerOperatorDashboard from './OwnerOperatorDashboard';

const AutonomousDashboard = () => {
  const { selectedRole } = useAuth();

  const renderRoleSpecificDashboard = () => {
    switch (selectedRole) {
      case 'super_admin':
        return <SuperAdminDashboard />;
      case 'carrier_admin':
        return <CarrierAdminDashboard />;
      case 'freight_broker_admin':
        return <BrokerAdminDashboard />;
      case 'shipper_admin':
        return <ShipperAdminDashboard />;
      case 'carrier_driver':
        return <DriverDashboard />;
      case 'owner_operator':
        return <OwnerOperatorDashboard />;
      default:
        return <SuperAdminDashboard />;
    }
  };

  return (
    <AutonomousLayout>
      {renderRoleSpecificDashboard()}
    </AutonomousLayout>
  );
};

export default AutonomousDashboard;

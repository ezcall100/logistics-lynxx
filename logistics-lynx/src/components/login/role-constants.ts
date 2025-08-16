import { UserRole } from '@/types/auth';
import { Crown, Truck, Users, Package, MapPin, User } from 'lucide-react';

export const roles = [
  {
    value: 'super_admin' as UserRole,
    label: 'Super Admin',
    description: 'Full system access and user management',
    icon: Crown,
    color: 'text-purple-600'
  },
  {
    value: 'carrier_admin' as UserRole,
    label: 'Carrier Admin',
    description: 'Fleet management and driver coordination',
    icon: Truck,
    color: 'text-blue-600'
  },
  {
    value: 'freight_broker_admin' as UserRole,
    label: 'Broker Admin',
    description: 'Connect shippers with carriers',
    icon: Users,
    color: 'text-green-600'
  },
  {
    value: 'shipper_admin' as UserRole,
    label: 'Shipper Admin',
    description: 'Manage shipments and logistics',
    icon: Package,
    color: 'text-orange-600'
  },
  {
    value: 'carrier_driver' as UserRole,
    label: 'Driver',
    description: 'Dispatch and delivery management',
    icon: MapPin,
    color: 'text-red-600'
  },
  {
    value: 'owner_operator' as UserRole,
    label: 'Owner Operator',
    description: 'Independent truck driver operations',
    icon: User,
    color: 'text-indigo-600'
  }
];

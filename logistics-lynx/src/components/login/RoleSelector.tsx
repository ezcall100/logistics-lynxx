
import React from 'react';
import { UserRole } from '@/types/auth';
import { Crown, Truck, Users, Package, MapPin, User } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface RoleSelectorProps {
  selectedRole: UserRole | '';
  onRoleChange: (role: UserRole) => void;
}

const roles = [
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

const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onRoleChange }) => {
  const selectedRoleData = roles.find(role => role.value === selectedRole);

  return (
    <div className="space-y-2">
      <Label htmlFor="role">Select Your Role</Label>
      <Select value={selectedRole} onValueChange={onRoleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Choose a role to continue" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <SelectItem key={role.value} value={role.value}>
                <div className="flex items-center space-x-2">
                  <IconComponent className={`h-4 w-4 ${role.color}`} />
                  <span>{role.label}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {selectedRoleData && (
        <div className="p-3 bg-muted rounded-lg mt-2">
          <div className="flex items-center space-x-2 mb-1">
            <selectedRoleData.icon className={`h-4 w-4 ${selectedRoleData.color}`} />
            <h4 className="text-sm font-medium">{selectedRoleData.label}</h4>
          </div>
          <p className="text-xs text-muted-foreground">{selectedRoleData.description}</p>
        </div>
      )}
    </div>
  );
};

export default RoleSelector;
export { roles };

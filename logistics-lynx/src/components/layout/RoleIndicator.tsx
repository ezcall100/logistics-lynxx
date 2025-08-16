/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/user';
import { Crown, Truck, Users, Package, MapPin, User } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const RoleIndicator = () => {
  const { selectedRole, switchRole } = useAuth();

  const roles = [
    {
      value: 'super_admin' as UserRole,
      label: 'Super Admin',
      icon: Crown,
      color: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    {
      value: 'carrier_admin' as UserRole,
      label: 'Carrier Admin',
      icon: Truck,
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      value: 'freight_broker_admin' as UserRole,
      label: 'Broker Admin',
      icon: Users,
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    {
      value: 'shipper_admin' as UserRole,
      label: 'Shipper Admin',
      icon: Package,
      color: 'bg-orange-100 text-orange-800 border-orange-200'
    },
    {
      value: 'carrier_driver' as UserRole,
      label: 'Driver',
      icon: MapPin,
      color: 'bg-red-100 text-red-800 border-red-200'
    },
    {
      value: 'owner_operator' as UserRole,
      label: 'Owner Operator',
      icon: User,
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    }
  ];

  const currentRole = roles.find(role => role.value === selectedRole);

  return (
    <div className="flex items-center space-x-3">
      {currentRole && (
        <Badge variant="outline" className={`${currentRole.color} flex items-center space-x-1`}>
          <currentRole.icon className="h-3 w-3" />
          <span className="text-xs font-medium">{currentRole.label}</span>
        </Badge>
      )}
      
      <Select value={selectedRole || ''} onValueChange={(value: UserRole) => switchRole(value)}>
        <SelectTrigger className="w-48 h-8 text-xs">
          <SelectValue placeholder="Switch Role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <SelectItem key={role.value} value={role.value}>
                <div className="flex items-center space-x-2">
                  <IconComponent className="h-3 w-3" />
                  <span className="text-xs">{role.label}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleIndicator;

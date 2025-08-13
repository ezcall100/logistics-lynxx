
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Truck, Users, Package, MapPin, User, Crown } from 'lucide-react';

const RoleSelector = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');

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

  const handleRoleSelect = () => {
    if (selectedRole) {
      // Store the selected role in sessionStorage
      sessionStorage.setItem('selectedRole', selectedRole);
      // Trigger a custom event to notify the auth context
      window.dispatchEvent(new CustomEvent('roleChanged', { detail: selectedRole }));
      navigate('/dashboard');
    }
  };

  const selectedRoleData = roles.find(role => role.value === selectedRole);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Select Your Role</CardTitle>
          <CardDescription>
            Welcome back, {user?.name}! Choose the role you want to access.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
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
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <selectedRoleData.icon className={`h-5 w-5 ${selectedRoleData.color}`} />
                <h3 className="font-medium">{selectedRoleData.label}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{selectedRoleData.description}</p>
            </div>
          )}

          <Button 
            onClick={handleRoleSelect} 
            className="w-full" 
            disabled={!selectedRole}
          >
            Continue as {selectedRoleData?.label || 'Selected Role'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleSelector;

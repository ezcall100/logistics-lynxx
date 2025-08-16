/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { UserRole } from '@/types/auth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { roles } from './role-constants';

interface RoleSelectorProps {
  selectedRole: UserRole | '';
  onRoleChange: (role: UserRole) => void;
}

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

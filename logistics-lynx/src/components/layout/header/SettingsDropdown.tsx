/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Building2, CreditCard, FileText, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const SettingsDropdown: React.FC = () => {
  const navigate = useNavigate();

  const handleSettingsNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 text-foreground hover:bg-accent/70 rounded-xl transition-all duration-200"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-background/95 backdrop-blur-xl border-border/60 shadow-xl rounded-xl">
        <DropdownMenuLabel className="font-semibold">Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="rounded-lg cursor-pointer"
          onClick={() => handleSettingsNavigation('/settings/user-management')}
        >
          <UserCog className="mr-3 h-4 w-4" />
          <span className="font-medium">User Management</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="rounded-lg cursor-pointer"
          onClick={() => handleSettingsNavigation('/settings/general')}
        >
          <Settings className="mr-3 h-4 w-4" />
          <span className="font-medium">General Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="rounded-lg cursor-pointer"
          onClick={() => handleSettingsNavigation('/settings/company')}
        >
          <Building2 className="mr-3 h-4 w-4" />
          <span className="font-medium">Company Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="rounded-lg cursor-pointer"
          onClick={() => handleSettingsNavigation('/settings/payroll')}
        >
          <CreditCard className="mr-3 h-4 w-4" />
          <span className="font-medium">Payroll Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="rounded-lg cursor-pointer"
          onClick={() => handleSettingsNavigation('/settings/templates')}
        >
          <FileText className="mr-3 h-4 w-4" />
          <span className="font-medium">Templates & Documents</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsDropdown;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Search, Bell, User, Settings, LogOut, Sparkles, Activity, Globe, Brain } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
const ModernHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    selectedRole,
    logout,
    user
  } = useAuth();
  const location = useLocation();
  const getRoleConfig = () => {
    const configs = {
      super_admin: {
        title: 'Super Admin',
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-200'
      },
      carrier_admin: {
        title: 'Carrier Admin',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200'
      },
      freight_broker_admin: {
        title: 'Broker Admin',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200'
      },
      shipper_admin: {
        title: 'Shipper Admin',
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-200'
      },
      carrier_driver: {
        title: 'Driver',
        color: 'text-pink-600',
        bg: 'bg-pink-50',
        border: 'border-pink-200'
      },
      owner_operator: {
        title: 'Owner Operator',
        color: 'text-violet-600',
        bg: 'bg-violet-50',
        border: 'border-violet-200'
      }
    };
    return configs[selectedRole as keyof typeof configs] || configs.super_admin;
  };
  const config = getRoleConfig();
  const navItems = [{
    label: 'Dashboard',
    href: '/dashboard'
  }, {
    label: 'Analytics',
    href: '/analytics'
  }, {
    label: 'Load Board',
    href: '/loadboard'
  }, {
    label: 'Shipments',
    href: '/shipments'
  }, {
    label: 'Financials',
    href: '/financials'
  }, {
    label: 'Settings',
    href: '/settings'
  }];
  return <header className="glass-ultra border-b border-border/30 sticky top-0 z-50">
      
    </header>;
};
export default ModernHeader;
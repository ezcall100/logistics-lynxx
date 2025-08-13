import React, { useState } from 'react';
import { Menu, Search, Bell, Settings, User, Sparkles, Brain, Zap, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
interface UltraModernHeaderProps {
  toggleSidebar: () => void;
  isMobile?: boolean;
}
const UltraModernHeader: React.FC<UltraModernHeaderProps> = ({
  toggleSidebar,
  isMobile = false
}) => {
  const {
    user,
    selectedRole
  } = useAuth();
  const navigate = useNavigate();
  const [notifications] = useState(7);
  const [searchQuery, setSearchQuery] = useState('');
  const getRoleConfig = () => {
    const configs = {
      super_admin: {
        color: 'from-purple-500 to-violet-500',
        badge: 'Super Admin',
        bgColor: 'bg-purple-100 text-purple-700 border-purple-200'
      },
      carrier_admin: {
        color: 'from-blue-500 to-cyan-500',
        badge: 'Carrier Admin',
        bgColor: 'bg-blue-100 text-blue-700 border-blue-200'
      },
      freight_broker_admin: {
        color: 'from-emerald-500 to-green-500',
        badge: 'Broker Admin',
        bgColor: 'bg-emerald-100 text-emerald-700 border-emerald-200'
      },
      shipper_admin: {
        color: 'from-orange-500 to-amber-500',
        badge: 'Shipper Admin',
        bgColor: 'bg-orange-100 text-orange-700 border-orange-200'
      },
      carrier_driver: {
        color: 'from-pink-500 to-rose-500',
        badge: 'Driver',
        bgColor: 'bg-pink-100 text-pink-700 border-pink-200'
      },
      owner_operator: {
        color: 'from-violet-500 to-purple-500',
        badge: 'Owner Operator',
        bgColor: 'bg-violet-100 text-violet-700 border-violet-200'
      }
    };
    return configs[selectedRole] || configs.super_admin;
  };
  const roleConfig = getRoleConfig();
  return <header className="sticky top-0 z-50 glass-ultra border-b border-border/30 shadow-premium">
      
    </header>;
};
export default UltraModernHeader;
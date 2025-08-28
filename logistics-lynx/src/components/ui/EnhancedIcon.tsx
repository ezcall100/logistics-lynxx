import React from 'react';
import { CheckCircle, AlertTriangle, Eye } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import * as HeroIcons from '@heroicons/react/24/outline';
import * as TablerIcons from '@tabler/icons-react';
import { IconProps } from '@tabler/icons-react';

// Enhanced Icon Component with multiple icon libraries
interface EnhancedIconProps {
  name: string;
  library?: 'lucide' | 'heroicons' | 'tabler';
  size?: number;
  className?: string;
  color?: string;
  variant?: 'outline' | 'solid' | 'duotone';
  animated?: boolean;
  onClick?: () => void;
}

export const EnhancedIcon: React.FC<EnhancedIconProps> = ({
  name,
  library = 'lucide',
  size = 24,
  className = '',
  color,
  variant = 'outline',
  animated = false,
  onClick
}) => {
  const getIconComponent = () => {
    const iconName = name.charAt(0).toUpperCase() + name.slice(1);
    
    switch (library) {
      case 'lucide':
        return (LucideIcons as any)[iconName];
      case 'heroicons':
        return (HeroIcons as any)[iconName];
      case 'tabler':
        return (TablerIcons as any)[iconName];
      default:
        return (LucideIcons as any)[iconName];
    }
  };

  const IconComponent = getIconComponent();
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in ${library} library`);
    return <div className="w-6 h-6 bg-gray-300 rounded" />;
  }

  const baseClasses = `transition-all duration-200 ${animated ? 'hover:scale-110' : ''} ${onClick ? 'cursor-pointer' : ''}`;
  const colorClasses = color ? `text-${color}` : '';
  const variantClasses = {
    outline: '',
    solid: 'fill-current',
    duotone: 'opacity-80'
  };

  return (
    <IconComponent
      size={size}
      className={`${baseClasses} ${colorClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    />
  );
};

// Predefined icon sets for common use cases
export const IconSets = {
  // Navigation Icons
  navigation: {
    dashboard: { name: 'LayoutDashboard', library: 'lucide' },
    users: { name: 'Users', library: 'lucide' },
    settings: { name: 'Settings', library: 'lucide' },
    analytics: { name: 'BarChart3', library: 'lucide' },
    security: { name: 'Shield', library: 'lucide' },
    monitoring: { name: 'Activity', library: 'lucide' },
    system: { name: 'Server', library: 'lucide' },
    business: { name: 'Briefcase', library: 'lucide' },
    devops: { name: 'Code', library: 'lucide' }
  },
  
  // Action Icons
  actions: {
    add: { name: 'Plus', library: 'lucide' },
    edit: { name: 'Edit', library: 'lucide' },
    delete: { name: 'Trash2', library: 'lucide' },
    view: { name: 'Eye', library: 'lucide' },
    download: { name: 'Download', library: 'lucide' },
    upload: { name: 'Upload', library: 'lucide' },
    search: { name: 'Search', library: 'lucide' },
    filter: { name: 'Filter', library: 'lucide' },
    refresh: { name: 'RefreshCw', library: 'lucide' },
    save: { name: 'Save', library: 'lucide' }
  },
  
  // Status Icons
  status: {
    success: { name: 'CheckCircle', library: 'lucide' },
    error: { name: 'XCircle', library: 'lucide' },
    warning: { name: 'AlertTriangle', library: 'lucide' },
    info: { name: 'Info', library: 'lucide' },
    loading: { name: 'Loader2', library: 'lucide' },
    offline: { name: 'WifiOff', library: 'lucide' },
    online: { name: 'Wifi', library: 'lucide' }
  },
  
  // TMS Specific Icons
  tms: {
    truck: { name: 'Truck', library: 'lucide' },
    package: { name: 'Package', library: 'lucide' },
    route: { name: 'Route', library: 'lucide' },
    map: { name: 'MapPin', library: 'lucide' },
    delivery: { name: 'Truck', library: 'lucide' },
    warehouse: { name: 'Building2', library: 'lucide' },
    shipping: { name: 'Ship', library: 'lucide' },
    logistics: { name: 'Globe', library: 'lucide' }
  }
};

// Convenience components for common icons
export const DashboardIcon = (props: Omit<EnhancedIconProps, 'name'>) => (
  <EnhancedIcon name="LayoutDashboard" {...props} />
);

export const UsersIcon = (props: Omit<EnhancedIconProps, 'name'>) => (
  <EnhancedIcon name="Users" {...props} />
);

export const SettingsIcon = (props: Omit<EnhancedIconProps, 'name'>) => (
  <EnhancedIcon name="Settings" {...props} />
);

export const AnalyticsIcon = (props: Omit<EnhancedIconProps, 'name'>) => (
  <EnhancedIcon name="BarChart3" {...props} />
);

export const SecurityIcon = (props: Omit<EnhancedIconProps, 'name'>) => (
  <EnhancedIcon name="Shield" {...props} />
);

export const MonitoringIcon = (props: Omit<EnhancedIconProps, 'name'>) => (
  <EnhancedIcon name="Activity" {...props} />
);

export const TruckIcon = (props: Omit<EnhancedIconProps, 'name'>) => (
  <EnhancedIcon name="Truck" {...props} />
);

export const PackageIcon = (props: Omit<EnhancedIconProps, 'name'>) => (
  <EnhancedIcon name="Package" {...props} />
);

export default EnhancedIcon;
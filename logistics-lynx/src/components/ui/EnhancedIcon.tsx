import React from 'react';
import * as LucideIcons from 'lucide-react';

// Enhanced Icon Component with Lucide icons only
interface EnhancedIconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
  variant?: 'outline' | 'solid' | 'duotone';
  animated?: boolean;
  onClick?: () => void;
}

export const EnhancedIcon: React.FC<EnhancedIconProps> = ({
  name,
  size = 24,
  className = '',
  color,
  variant = 'outline',
  animated = false,
  onClick
}) => {
  const getIconComponent = () => {
    const iconName = name.charAt(0).toUpperCase() + name.slice(1);
    return (LucideIcons as any)[iconName];
  };

  const IconComponent = getIconComponent();
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide library`);
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
    dashboard: { name: 'LayoutDashboard' },
    users: { name: 'Users' },
    settings: { name: 'Settings' },
    analytics: { name: 'BarChart3' },
    security: { name: 'Shield' },
    monitoring: { name: 'Activity' },
    system: { name: 'Server' },
    business: { name: 'Briefcase' },
    devops: { name: 'Code' }
  },
  
  // Action Icons
  actions: {
    add: { name: 'Plus' },
    edit: { name: 'Edit' },
    delete: { name: 'Trash2' },
    view: { name: 'Eye' },
    download: { name: 'Download' },
    upload: { name: 'Upload' },
    search: { name: 'Search' },
    filter: { name: 'Filter' },
    refresh: { name: 'RefreshCw' },
    save: { name: 'Save' }
  },
  
  // Status Icons
  status: {
    success: { name: 'CheckCircle' },
    error: { name: 'XCircle' },
    warning: { name: 'AlertTriangle' },
    info: { name: 'Info' },
    loading: { name: 'Loader2' },
    offline: { name: 'WifiOff' },
    online: { name: 'Wifi' }
  },
  
  // TMS Specific Icons
  tms: {
    truck: { name: 'Truck' },
    package: { name: 'Package' },
    route: { name: 'Route' },
    map: { name: 'MapPin' },
    delivery: { name: 'Truck' },
    warehouse: { name: 'Building2' },
    shipping: { name: 'Ship' },
    logistics: { name: 'Globe' }
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
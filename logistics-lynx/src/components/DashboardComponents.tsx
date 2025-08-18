import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  TrendingUp, 
  TrendingDown, 
  Truck, 
  User, 
  Package, 
  DollarSign,
  FileText,
  Target,
  Activity,
  Plus,
  MapPin,
  Settings,
  BarChart3,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info
} from 'lucide-react';

// Icon mapping for different metric types
const iconMap = {
  '🚛': Truck,
  '👤': User,
  '📦': Package,
  '💰': DollarSign,
  '📋': FileText,
  '🎯': Target,
  '🤖': Activity,
  '➕': Plus,
  '🗺️': MapPin,
  '⚙️': Settings,
  '📊': BarChart3,
  '👥': Users,
  '📅': Calendar,
  '⏰': Clock
};

// Status icon mapping
const statusIconMap = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info
};

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  icon?: string;
  color?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon = '📊', 
  color = '#3b82f6',
  onClick 
}) => {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Activity;
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card 
      className={`card-interactive ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ 
              backgroundColor: `${color}15`,
              color: color 
            }}
          >
            <IconComponent size={24} />
          </div>
          {change !== undefined && (
            <Badge 
              variant={isPositive ? 'default' : isNegative ? 'destructive' : 'secondary'}
              className="text-xs font-semibold"
            >
              <div className="flex items-center gap-1">
                {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {isPositive ? '+' : ''}{change}%
              </div>
            </Badge>
          )}
        </div>
        <h3 className="text-sm text-muted-foreground font-medium mb-2">
          {title}
        </h3>
        <p className="text-3xl font-bold text-primary">
          {value}
        </p>
      </CardContent>
    </Card>
  );
};

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  height?: string;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({ 
  title, 
  children, 
  height = '300px',
  className = ''
}) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent style={{ height }}>
        {children}
      </CardContent>
    </Card>
  );
};

interface ActivityItem {
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  time: string;
  description?: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
  maxHeight?: string;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ 
  activities, 
  title = 'Recent Activity',
  maxHeight = '400px'
}) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Activity size={20} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4" style={{ maxHeight, overflowY: 'auto' }}>
          {activities.map((activity, index) => {
            const StatusIcon = statusIconMap[activity.type];
            const statusColors = {
              success: 'text-green-600 bg-green-50',
              warning: 'text-yellow-600 bg-yellow-50',
              error: 'text-red-600 bg-red-50',
              info: 'text-blue-600 bg-blue-50'
            };

            return (
              <div key={index} className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${statusColors[activity.type]}`}>
                  <StatusIcon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary mb-1">
                    {activity.title}
                  </p>
                  {activity.description && (
                    <p className="text-xs text-muted-foreground mb-1">
                      {activity.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

interface QuickAction {
  icon: string;
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'secondary' | 'outline';
}

interface QuickActionsProps {
  actions: QuickAction[];
  title?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ 
  actions, 
  title = 'Quick Actions' 
}) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const IconComponent = iconMap[action.icon as keyof typeof iconMap] || Plus;
            
            return (
              <Button
                key={index}
                variant={action.variant || 'outline'}
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={action.onClick}
              >
                <IconComponent size={20} />
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'warning' | 'error';
  label: string;
  description?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  label, 
  description 
}) => {
  const statusConfig = {
    online: { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
    offline: { color: 'text-gray-600', bg: 'bg-gray-50', icon: XCircle },
    warning: { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: AlertTriangle },
    error: { color: 'text-red-600', bg: 'bg-red-50', icon: XCircle }
  };

  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg ${config.bg}`}>
      <IconComponent size={20} className={config.color} />
      <div>
        <p className={`text-sm font-medium ${config.color}`}>
          {label}
        </p>
        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'default' | 'success' | 'warning' | 'error';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max = 100, 
  label,
  showPercentage = true,
  color = 'default'
}) => {
  const percentage = (value / max) * 100;
  
  const colorClasses = {
    default: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  return (
    <div className="space-y-2">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center">
          {label && <span className="text-sm font-medium">{label}</span>}
          {showPercentage && <span className="text-sm text-muted-foreground">{Math.round(percentage)}%</span>}
        </div>
      )}
      <Progress value={percentage} className="h-2" />
    </div>
  );
};

interface DataTableProps {
  data: Array<Record<string, unknown>>;
  columns: Array<{
    key: string;
    label: string;
    render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
  }>;
  title?: string;
  className?: string;
}

export const DataTable: React.FC<DataTableProps> = ({ 
  data, 
  columns, 
  title,
  className = ''
}) => {
  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {columns.map((column) => (
                  <th 
                    key={column.key}
                    className="text-left py-3 px-4 font-medium text-sm text-muted-foreground"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b last:border-b-0">
                  {columns.map((column) => (
                    <td key={column.key} className="py-3 px-4">
                      {column.render 
                        ? column.render(row[column.key], row)
                        : row[column.key]
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

interface AlertCardProps {
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const AlertCard: React.FC<AlertCardProps> = ({ 
  type, 
  title, 
  description, 
  action 
}) => {
  const alertConfig = {
    success: { 
      color: 'text-green-600', 
      bg: 'bg-green-50', 
      border: 'border-green-200',
      icon: CheckCircle 
    },
    warning: { 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-50', 
      border: 'border-yellow-200',
      icon: AlertTriangle 
    },
    error: { 
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      border: 'border-red-200',
      icon: XCircle 
    },
    info: { 
      color: 'text-blue-600', 
      bg: 'bg-blue-50', 
      border: 'border-blue-200',
      icon: Info 
    }
  };

  const config = alertConfig[type];
  const IconComponent = config.icon;

  return (
    <Card className={`${config.bg} ${config.border}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <IconComponent size={20} className={config.color} />
          <div className="flex-1">
            <h3 className={`text-sm font-medium ${config.color} mb-1`}>
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground mb-3">
                {description}
              </p>
            )}
            {action && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={action.onClick}
                className="mt-2"
              >
                {action.label}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

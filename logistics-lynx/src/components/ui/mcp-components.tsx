import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Progress } from './progress';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Zap,
  Shield,
  Database,
  Server,
  Network,
  Globe,
  Users,
  Settings,
  Bell,
  Eye,
  EyeOff,
  RefreshCw,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  XCircle,
  Info
} from 'lucide-react';

// Enhanced MCP Status Badge
interface MCPStatusBadgeProps {
  status: 'operational' | 'degraded' | 'critical' | 'offline' | 'maintenance';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const MCPStatusBadge: React.FC<MCPStatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
  className
}) => {
  const statusConfig = {
    operational: {
      icon: CheckCircle,
      color: 'bg-green-500/10 text-green-400 border-green-500/20',
      label: 'Operational'
    },
    degraded: {
      icon: AlertTriangle,
      color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      label: 'Degraded'
    },
    critical: {
      icon: XCircle,
      color: 'bg-red-500/10 text-red-400 border-red-500/20 animate-pulse',
      label: 'Critical'
    },
    offline: {
      icon: Minus,
      color: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
      label: 'Offline'
    },
    maintenance: {
      icon: Settings,
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      label: 'Maintenance'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        'flex items-center gap-1.5 font-medium border-2',
        config.color,
        size === 'sm' && 'text-xs px-2 py-0.5',
        size === 'md' && 'text-sm px-3 py-1',
        size === 'lg' && 'text-base px-4 py-1.5',
        className
      )}
    >
      {showIcon && <Icon className="w-3 h-3" />}
      {config.label}
    </Badge>
  );
};

// Enhanced MCP Metric Card
interface MCPMetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  icon?: React.ComponentType<{ className?: string }>;
  status?: 'success' | 'warning' | 'error' | 'info';
  trend?: 'up' | 'down' | 'stable';
  className?: string;
  onClick?: () => void;
}

export const MCPMetricCard: React.FC<MCPMetricCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  status,
  trend,
  className,
  onClick
}) => {
  const statusColors = {
    success: 'border-green-500/20 bg-green-500/5',
    warning: 'border-yellow-500/20 bg-yellow-500/5',
    error: 'border-red-500/20 bg-red-500/5',
    info: 'border-blue-500/20 bg-blue-500/5'
  };

  const trendIcons = {
    up: <TrendingUp className="w-4 h-4 text-green-400" />,
    down: <TrendingDown className="w-4 h-4 text-red-400" />,
    stable: <Minus className="w-4 h-4 text-gray-400" />
  };

  return (
    <Card
      className={cn(
        'mcp-metric-card cursor-pointer group',
        status && statusColors[status],
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {Icon && (
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="w-4 h-4 text-primary" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <div className="flex items-center gap-1 text-sm">
                {trendIcons[change.type === 'increase' ? 'up' : 'down']}
                <span className={cn(
                  change.type === 'increase' ? 'text-green-400' : 'text-red-400'
                )}>
                  {change.value}%
                </span>
                <span className="text-muted-foreground">vs {change.period}</span>
              </div>
            )}
          </div>
          {trend && trend !== 'stable' && (
            <div className="p-2 rounded-lg bg-muted/50">
              {trendIcons[trend]}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced MCP Progress Card
interface MCPProgressCardProps {
  title: string;
  value: number;
  max: number;
  unit?: string;
  status?: 'success' | 'warning' | 'error';
  showPercentage?: boolean;
  className?: string;
}

export const MCPProgressCard: React.FC<MCPProgressCardProps> = ({
  title,
  value,
  max,
  unit = '%',
  status,
  showPercentage = true,
  className
}) => {
  const percentage = (value / max) * 100;
  
  const statusColors = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  return (
    <Card className={cn('mcp-glass-card', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {showPercentage && (
            <span className="text-sm font-mono text-muted-foreground">
              {percentage.toFixed(1)}{unit}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress 
          value={percentage} 
          className="h-2"
        />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {value} / {max}
          </span>
          {status && (
            <div className={cn(
              'w-2 h-2 rounded-full',
              statusColors[status]
            )} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced MCP Action Button
interface MCPActionButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ComponentType<{ className?: string }>;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MCPActionButton: React.FC<MCPActionButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  disabled = false,
  children,
  className,
  onClick
}) => {
  const variantStyles = {
    primary: 'mcp-button primary',
    secondary: 'mcp-button secondary',
    ghost: 'bg-transparent hover:bg-muted/50',
    destructive: 'bg-red-500 hover:bg-red-600 text-white'
  };

  const sizeStyles = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg'
  };

  return (
    <Button
      variant="outline"
      size={size}
      disabled={disabled || loading}
      className={cn(
        variantStyles[variant],
        sizeStyles[size],
        'mcp-action-button',
        className
      )}
      onClick={onClick}
    >
      {loading ? (
        <RefreshCw className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </Button>
  );
};

// Enhanced MCP System Status Card
interface MCPSystemStatusProps {
  system: string;
  status: 'operational' | 'degraded' | 'critical' | 'offline';
  uptime: string;
  responseTime: string;
  lastCheck: string;
  className?: string;
}

export const MCPSystemStatus: React.FC<MCPSystemStatusProps> = ({
  system,
  status,
  uptime,
  responseTime,
  lastCheck,
  className
}) => {
  const statusIcons = {
    operational: <CheckCircle className="w-5 h-5 text-green-400" />,
    degraded: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
    critical: <XCircle className="w-5 h-5 text-red-400" />,
    offline: <Minus className="w-5 h-5 text-gray-400" />
  };

  return (
    <Card className={cn('mcp-glass-card', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {statusIcons[status]}
            <div>
              <CardTitle className="text-base font-semibold">{system}</CardTitle>
              <MCPStatusBadge status={status} size="sm" showIcon={false} />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Uptime</p>
            <p className="font-mono font-medium">{uptime}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Response Time</p>
            <p className="font-mono font-medium">{responseTime}</p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Last checked: {lastCheck}
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced MCP Alert Card
interface MCPAlertCardProps {
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  source?: string;
  className?: string;
  onAcknowledge?: () => void;
  onDismiss?: () => void;
}

export const MCPAlertCard: React.FC<MCPAlertCardProps> = ({
  type,
  title,
  message,
  timestamp,
  priority,
  source,
  className,
  onAcknowledge,
  onDismiss
}) => {
  const typeConfig = {
    info: {
      icon: Info,
      color: 'border-blue-500/20 bg-blue-500/5',
      iconColor: 'text-blue-400'
    },
    warning: {
      icon: AlertTriangle,
      color: 'border-yellow-500/20 bg-yellow-500/5',
      iconColor: 'text-yellow-400'
    },
    error: {
      icon: XCircle,
      color: 'border-red-500/20 bg-red-500/5',
      iconColor: 'text-red-400'
    },
    success: {
      icon: CheckCircle,
      color: 'border-green-500/20 bg-green-500/5',
      iconColor: 'text-green-400'
    }
  };

  const priorityColors = {
    low: 'bg-gray-500/10 text-gray-400',
    medium: 'bg-blue-500/10 text-blue-400',
    high: 'bg-yellow-500/10 text-yellow-400',
    critical: 'bg-red-500/10 text-red-400 animate-pulse'
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <Card className={cn('mcp-glass-card', config.color, className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Icon className={cn('w-5 h-5 mt-0.5', config.iconColor)} />
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold">{title}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={cn('text-xs', priorityColors[priority])}>
                  {priority}
                </Badge>
                {source && (
                  <span className="text-xs text-muted-foreground">
                    from {source}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {onAcknowledge && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAcknowledge}
                className="h-8 w-8 p-0"
              >
                <CheckCircle className="w-4 h-4" />
              </Button>
            )}
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="h-8 w-8 p-0"
              >
                <XCircle className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{message}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{timestamp}</span>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced MCP Data Table
interface MCPDataTableProps {
  data: any[];
  columns: {
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
  }[];
  className?: string;
  onRowClick?: (row: any) => void;
}

export const MCPDataTable: React.FC<MCPDataTableProps> = ({
  data,
  columns,
  className,
  onRowClick
}) => {
  return (
    <div className={cn('mcp-table overflow-hidden rounded-lg', className)}>
      <div className="mcp-table-header">
        <div className="grid grid-cols-12 gap-4 p-4">
          {columns.map((column) => (
            <div key={column.key} className="font-semibold text-sm">
              {column.label}
            </div>
          ))}
        </div>
      </div>
      <div className="divide-y divide-border/50">
        {data.map((row, index) => (
          <div
            key={index}
            className={cn(
              'mcp-table-row grid grid-cols-12 gap-4 p-4 cursor-pointer',
              onRowClick && 'hover:bg-muted/50'
            )}
            onClick={() => onRowClick?.(row)}
          >
            {columns.map((column) => (
              <div key={column.key} className="text-sm">
                {column.render ? column.render(row[column.key], row) : row[column.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced MCP Loading Skeleton
interface MCPLoadingSkeletonProps {
  type: 'card' | 'table' | 'metric' | 'list';
  count?: number;
  className?: string;
}

export const MCPLoadingSkeleton: React.FC<MCPLoadingSkeletonProps> = ({
  type,
  count = 1,
  className
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="mcp-loading mcp-glass-card p-6 space-y-4">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-8 bg-muted rounded w-1/2" />
            <div className="h-3 bg-muted rounded w-full" />
          </div>
        );
      case 'table':
        return (
          <div className="mcp-loading mcp-table p-4 space-y-3">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        );
      case 'metric':
        return (
          <div className="mcp-loading mcp-metric-card p-4 space-y-3">
            <div className="h-3 bg-muted rounded w-1/2" />
            <div className="h-6 bg-muted rounded w-3/4" />
          </div>
        );
      case 'list':
        return (
          <div className="mcp-loading space-y-2">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </div>
  );
};

// Enhanced MCP Empty State
interface MCPEmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const MCPEmptyState: React.FC<MCPEmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className
}) => {
  return (
    <div className={cn('text-center py-12', className)}>
      {Icon && (
        <div className="mx-auto w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-muted">
          <Icon className="w-6 h-6 text-muted-foreground" />
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <MCPActionButton onClick={action.onClick}>
          {action.label}
        </MCPActionButton>
      )}
    </div>
  );
};

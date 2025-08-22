import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    period: string;
  };
  status?: 'success' | 'warning' | 'error' | 'neutral';
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'cyan' | 'pink' | 'yellow';
  gradient?: boolean;
  animated?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
  formatValue?: (value: number | string) => string;
  suffix?: string;
  prefix?: string;
}

const colorVariants = {
  blue: {
    gradient: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    icon: 'text-blue-500',
    border: 'border-blue-200 dark:border-blue-800'
  },
  green: {
    gradient: 'from-green-500 to-green-600',
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400',
    icon: 'text-green-500',
    border: 'border-green-200 dark:border-green-800'
  },
  purple: {
    gradient: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400',
    icon: 'text-purple-500',
    border: 'border-purple-200 dark:border-purple-800'
  },
  orange: {
    gradient: 'from-orange-500 to-orange-600',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-600 dark:text-orange-400',
    icon: 'text-orange-500',
    border: 'border-orange-200 dark:border-orange-800'
  },
  red: {
    gradient: 'from-red-500 to-red-600',
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-600 dark:text-red-400',
    icon: 'text-red-500',
    border: 'border-red-200 dark:border-red-800'
  },
  cyan: {
    gradient: 'from-cyan-500 to-cyan-600',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    text: 'text-cyan-600 dark:text-cyan-400',
    icon: 'text-cyan-500',
    border: 'border-cyan-200 dark:border-cyan-800'
  },
  pink: {
    gradient: 'from-pink-500 to-pink-600',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    text: 'text-pink-600 dark:text-pink-400',
    icon: 'text-pink-500',
    border: 'border-pink-200 dark:border-pink-800'
  },
  yellow: {
    gradient: 'from-yellow-500 to-yellow-600',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    text: 'text-yellow-600 dark:text-yellow-400',
    icon: 'text-yellow-500',
    border: 'border-yellow-200 dark:border-yellow-800'
  }
};

const statusIcons = {
  success: <CheckCircle className="w-4 h-4 text-green-500" />,
  warning: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
  error: <AlertTriangle className="w-4 h-4 text-red-500" />,
  neutral: <Clock className="w-4 h-4 text-slate-500" />
};

const statusColors = {
  success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  neutral: 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400'
};

export const EnhancedStatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  status,
  color = 'blue',
  gradient = false,
  animated = true,
  clickable = false,
  onClick,
  className = '',
  formatValue,
  suffix = '',
  prefix = ''
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  const colors = colorVariants[color];

  useEffect(() => {
    if (animated && typeof value === 'number') {
      const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
      return controls.stop;
    } else {
      setDisplayValue(value);
    }
  }, [value, animated, count]);

  const formatDisplayValue = (val: number | string) => {
    if (formatValue) return formatValue(val);
    if (typeof val === 'number') {
      return `${prefix}${val.toLocaleString()}${suffix}`;
    }
    return `${prefix}${val}${suffix}`;
  };

  const CardWrapper = clickable ? motion.div : 'div';
  const cardProps = clickable ? {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    onClick,
    className: 'cursor-pointer'
  } : {};

  return (
    <TooltipProvider>
      <CardWrapper
        {...cardProps}
        className={`relative overflow-hidden transition-all duration-300 ${
          gradient ? 'bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800' : ''
        } ${colors.border} ${className}`}
      >
        {/* Gradient Accent Strip */}
        {gradient && (
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient}`} />
        )}

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[length:20px_20px]" />

        <CardHeader className="relative z-10 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {icon && (
                <div className={`p-2 rounded-lg ${colors.bg} backdrop-blur-sm`}>
                  <div className={colors.icon}>
                    {icon}
                  </div>
                </div>
              )}
              <div className="flex-1">
                <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {title}
                </CardTitle>
                {description && (
                  <CardDescription className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {description}
                  </CardDescription>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {status && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-1">
                      {statusIcons[status]}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="capitalize">{status} status</p>
                  </TooltipContent>
                </Tooltip>
              )}
              
              {trend && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {trend.isPositive ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {Math.abs(trend.value)}%
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{trend.isPositive ? 'Increased' : 'Decreased'} by {Math.abs(trend.value)}% {trend.period}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 pt-0">
          <div className="space-y-2">
            <motion.div 
              className={`text-3xl font-bold ${colors.text}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {animated && typeof value === 'number' ? (
                <motion.span>{rounded}</motion.span>
              ) : (
                formatDisplayValue(displayValue)
              )}
            </motion.div>

            {trend && (
              <motion.div 
                className="flex items-center gap-1 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className={trend.isPositive ? 'text-green-600' : 'text-red-600'}>
                  {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                </span>
                <span className="text-slate-500">vs {trend.period}</span>
              </motion.div>
            )}
          </div>
        </CardContent>

        {/* Hover Effect Overlay */}
        {clickable && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
      </CardWrapper>
    </TooltipProvider>
  );
};

// Convenience components for common stat types
export const MetricCard: React.FC<Omit<StatCardProps, 'color'> & { metric: 'users' | 'revenue' | 'performance' | 'errors' }> = ({ 
  metric, 
  ...props 
}) => {
  const metricConfig = {
    users: { color: 'blue' as const, icon: '👥' },
    revenue: { color: 'green' as const, icon: '💰' },
    performance: { color: 'purple' as const, icon: '⚡' },
    errors: { color: 'red' as const, icon: '⚠️' }
  };

  const config = metricConfig[metric];

  return (
    <EnhancedStatCard
      {...props}
      color={config.color}
      icon={<span className="text-2xl">{config.icon}</span>}
    />
  );
};

export const PerformanceCard: React.FC<Omit<StatCardProps, 'color' | 'icon'> & { 
  percentage: number;
  target?: number;
}> = ({ percentage, target, ...props }) => {
  const getColor = (value: number) => {
    if (value >= 90) return 'green';
    if (value >= 70) return 'yellow';
    if (value >= 50) return 'orange';
    return 'red';
  };

  const getStatus = (value: number) => {
    if (value >= 90) return 'success';
    if (value >= 70) return 'neutral';
    if (value >= 50) return 'warning';
    return 'error';
  };

  return (
    <EnhancedStatCard
      {...props}
      color={getColor(percentage)}
      status={getStatus(percentage)}
      icon={<div className="w-6 h-6 rounded-full border-2 border-current" />}
      suffix="%"
      formatValue={(val) => `${val}%`}
    />
  );
};

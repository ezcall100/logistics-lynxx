import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { cn } from '../../lib/utils';

export interface KpiCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  color: string;
  className?: string;
  onClick?: () => void;
}

const getColorClasses = (color: string, changeType: 'increase' | 'decrease' | 'neutral') => {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    red: 'text-red-600',
    emerald: 'text-emerald-600',
    teal: 'text-teal-600',
    indigo: 'text-indigo-600',
    pink: 'text-pink-600',
    amber: 'text-amber-600'
  };

  const changeColorMap: Record<string, string> = {
    increase: 'text-green-600',
    decrease: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return {
    valueColor: colorMap[color] || 'text-gray-900',
    changeColor: changeColorMap[changeType]
  };
};

const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
  switch (trend) {
    case 'up':
      return '↗️';
    case 'down':
      return '↘️';
    case 'stable':
      return '→';
    default:
      return '→';
  }
};

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  change,
  changeType,
  color,
  className,
  onClick
}) => {
  const { valueColor, changeColor } = getColorClasses(color, changeType);
  const trendIcon = getTrendIcon(trend);

  const cardContent = (
    <Card 
      className={cn(
        'transition-all duration-200 hover:shadow-md',
        onClick && 'cursor-pointer hover:scale-[1.02]',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className="flex items-center space-x-1">
          <span className="text-lg" role="img" aria-label={`${title} icon`}>
            {icon}
          </span>
          <Badge 
            variant="secondary" 
            className={cn(
              'text-xs',
              changeType === 'increase' && 'bg-green-100 text-green-800',
              changeType === 'decrease' && 'bg-red-100 text-red-800',
              changeType === 'neutral' && 'bg-gray-100 text-gray-800'
            )}
          >
            {trendIcon} {change}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className={cn('text-2xl font-bold', valueColor)}>
            {value}
          </div>
          <p className="text-xs text-gray-500">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );

  if (onClick) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {cardContent}
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to view details</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return cardContent;
};

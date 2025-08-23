import React from 'react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  className?: string;
  color?: string;
  bgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  className,
  color = 'from-blue-500 to-blue-600',
  bgColor = 'bg-blue-50 dark:bg-blue-900/20'
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-text-muted';
    }
  };

  return (
    <div className={cn("group", className)}>
      <div className={cn(
        bgColor,
        "p-6 rounded-2xl border border-border hover:shadow-lg transition-all duration-300 group-hover:scale-105"
      )}>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-text-muted">{title}</p>
            <p className="text-3xl font-bold text-text">{value}</p>
            {change && (
              <p className={cn("text-xs font-medium", getChangeColor())}>
                {change} from last month
              </p>
            )}
          </div>
          {icon && (
            <div className={cn("p-3 bg-gradient-to-br", color, "rounded-xl shadow-lg")}>
              {icon}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

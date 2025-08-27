import React, { ReactNode } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import ResponsiveLayout from './ResponsiveLayout';
import ResponsiveGrid from '../ui/ResponsiveGrid';

interface DashboardMetric {
  title: string;
  value: string | number;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

interface ResponsiveDashboardProps {
  title: string;
  subtitle?: string;
  metrics?: DashboardMetric[];
  children: ReactNode;
  className?: string;
  mode?: 'light' | 'dark';
}

const ResponsiveDashboard: React.FC<ResponsiveDashboardProps> = ({
  title,
  subtitle,
  metrics = [],
  children,
  className = '',
  mode = 'light'
}) => {
  const getMetricColor = (color?: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500';
      case 'green': return 'bg-green-500';
      case 'red': return 'bg-red-500';
      case 'yellow': return 'bg-yellow-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <ResponsiveLayout className={className}>
      {/* Header */}
      <div className="mb-6">
        <h1 className={`text-2xl sm:text-3xl font-bold ${
          mode === 'light' ? 'text-slate-900' : 'text-white'
        }`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`mt-2 text-sm sm:text-base ${
            mode === 'light' ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Metrics Grid */}
      {metrics.length > 0 && (
        <div className="mb-8">
          <ResponsiveGrid 
            cols={{ mobile: 1, tablet: 2, desktop: 4 }}
            gap="medium"
          >
            {metrics.map((metric) => (
              <ResponsiveCard 
                key={index}
                padding="medium"
                mode={mode}
                className="relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${
                      mode === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      {metric.title}
                    </p>
                    <p className={`text-2xl font-bold ${
                      mode === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                      {metric.value}
                    </p>
                    {metric.trend && (
                      <div className="flex items-center mt-1">
                        <span className={`text-xs font-medium ${
                          metric.trend.isPositive ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.trend.isPositive ? '+' : ''}{metric.trend.value}%
                        </span>
                        <svg 
                          className={`w-3 h-3 ml-1 ${
                            metric.trend.isPositive ? 'text-green-600' : 'text-red-600'
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d={metric.trend.isPositive ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} 
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  {metric.icon && (
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getMetricColor(metric.color)} text-white`}>
                      <span className="text-xl">{metric.icon}</span>
                    </div>
                  )}
                </div>
              </ResponsiveCard>
            ))}
          </ResponsiveGrid>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-6">
        {children}
      </div>
    </ResponsiveLayout>
  );
};

export default ResponsiveDashboard;

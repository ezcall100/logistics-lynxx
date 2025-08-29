import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: any[]) => twMerge(clsx(inputs));

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  title,
  subtitle,
  icon,
  variant = 'default',
  padding = 'md'
}) => {
  const baseClasses = 'rounded-2xl border transition-all duration-200';
  const variantClasses = {
    default: 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-gray-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md',
    elevated: 'bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-gray-200/50 dark:border-slate-700/50 shadow-md hover:shadow-lg',
    outlined: 'bg-transparent border-2 border-gray-200/50 dark:border-slate-700/50'
  };
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], paddingClasses[padding], className)}>
      {(title || icon) && (
        <div className="flex items-center space-x-3 mb-4">
          {icon && <div className="text-blue-600 dark:text-blue-400">{icon}</div>}
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

// Additional card components for compatibility
export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('p-6', className)}>{children}</div>
);

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)}>{children}</div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)}>{children}</h3>
); 
import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'success' | 'danger' | 'neutral' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'xl';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'success' | 'danger' | 'neutral' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'xl';
  };
  children?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  secondaryAction,
  children,
  className,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'py-8 px-4',
    md: 'py-12 px-6',
    lg: 'py-16 px-8',
  };

  const iconSizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-20 w-20',
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        sizeClasses[size],
        className
      )}
    >
      {/* Icon */}
      {icon && (
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-bg-soft text-text-tertiary mb-4',
            iconSizeClasses[size]
          )}
        >
          {icon}
        </div>
      )}

      {/* Title */}
      <h3
        className={cn(
          'font-semibold text-text-primary mb-2',
          size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'
        )}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p
          className={cn(
            'text-text-secondary max-w-md',
            size === 'sm' ? 'text-sm' : 'text-base'
          )}
        >
          {description}
        </p>
      )}

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3 mt-6">
          {action && (
            <Button
              onClick={action.onClick}
              variant={action.variant || 'default'}
              size={action.size || 'md'}
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant={secondaryAction.variant || 'outline'}
              size={secondaryAction.size || 'md'}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}

      {/* Additional Content */}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};

export default EmptyState;

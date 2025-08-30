import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Breadcrumbs } from './Breadcrumbs';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
    icon?: React.ReactNode;
  }>;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  children,
  className,
}) => {
  return (
    <div className={cn('bg-bg-elevated border-b border-border-default', className)}>
      <div className="px-6 py-4">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}

        {/* Header Content */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h1 className="text-2xl font-bold text-text-primary leading-tight">
              {title}
            </h1>
            
            {/* Subtitle */}
            {subtitle && (
              <p className="mt-1 text-text-secondary text-sm leading-relaxed">
                {subtitle}
              </p>
            )}

            {/* Additional Content */}
            {children && (
              <div className="mt-4">
                {children}
              </div>
            )}
          </div>

          {/* Actions */}
          {actions && (
            <div className="ml-6 flex items-center gap-3 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

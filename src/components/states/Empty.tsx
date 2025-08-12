/**
 * Empty State Component
 * Displayed when there's no data to show
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  FileText, 
  Users, 
  Truck, 
  DollarSign, 
  Search,
  Plus,
  RefreshCw,
  Inbox,
  FolderOpen,
  AlertCircle,
  Info,
} from 'lucide-react';

interface EmptyProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'ghost';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'ghost';
  };
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'search' | 'create' | 'error' | 'info';
  className?: string;
}

const defaultIcons = {
  default: Inbox,
  search: Search,
  create: Plus,
  error: AlertCircle,
  info: Info,
};

const defaultTitles = {
  default: 'No data found',
  search: 'No results found',
  create: 'Get started',
  error: 'Something went wrong',
  info: 'Information',
};

const defaultDescriptions = {
  default: 'There are no items to display at the moment.',
  search: 'Try adjusting your search criteria or filters.',
  create: 'Create your first item to get started.',
  error: 'An error occurred while loading the data.',
  info: 'No information available at this time.',
};

export function Empty({
  title,
  description,
  icon,
  action,
  secondaryAction,
  size = 'md',
  variant = 'default',
  className,
}: EmptyProps) {
  const DefaultIcon = defaultIcons[variant];
  const defaultTitle = title || defaultTitles[variant];
  const defaultDescription = description || defaultDescriptions[variant];

  const sizeClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
  };

  const iconSizes = {
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
      <div className={cn('text-text-muted mb-4', iconSizes[size])}>
        {icon || <DefaultIcon className="h-full w-full" />}
      </div>

      {/* Content */}
      <div className="max-w-sm space-y-2">
        <h3 className="text-lg font-semibold text-text">
          {defaultTitle}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed">
          {defaultDescription}
        </p>
      </div>

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3 mt-6">
          {action && (
            <Button
              onClick={action.onClick}
              variant={action.variant || 'default'}
              size="sm"
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant={secondaryAction.variant || 'outline'}
              size="sm"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// Specialized empty state components
export function EmptySearch({
  query,
  onClear,
  onRetry,
  className,
}: {
  query?: string;
  onClear?: () => void;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <Empty
      variant="search"
      title={query ? `No results for "${query}"` : 'No results found'}
      description="Try adjusting your search terms or filters to find what you're looking for."
      action={
        onClear
          ? {
              label: 'Clear filters',
              onClick: onClear,
              variant: 'outline',
            }
          : undefined
      }
      secondaryAction={
        onRetry
          ? {
              label: 'Try again',
              onClick: onRetry,
              variant: 'ghost',
            }
          : undefined
      }
      className={className}
    />
  );
}

export function EmptyCreate({
  title,
  description,
  onCreate,
  className,
}: {
  title?: string;
  description?: string;
  onCreate: () => void;
  className?: string;
}) {
  return (
    <Empty
      variant="create"
      title={title}
      description={description}
      action={{
        label: 'Create new',
        onClick: onCreate,
      }}
      className={className}
    />
  );
}

export function EmptyError({
  title,
  description,
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <Empty
      variant="error"
      title={title}
      description={description}
      action={
        onRetry
          ? {
              label: 'Try again',
              onClick: onRetry,
            }
          : undefined
      }
      className={className}
    />
  );
}

// Portal-specific empty states
export function EmptyLoads({
  onCreate,
  className,
}: {
  onCreate?: () => void;
  className?: string;
}) {
  return (
    <Empty
      title="No loads found"
      description="Get started by creating your first load or importing existing data."
      icon={<Truck className="h-full w-full" />}
      action={
        onCreate
          ? {
              label: 'Create load',
              onClick: onCreate,
            }
          : undefined
      }
      className={className}
    />
  );
}

export function EmptyDrivers({
  onAdd,
  className,
}: {
  onAdd?: () => void;
  className?: string;
}) {
  return (
    <Empty
      title="No drivers found"
      description="Add drivers to your fleet to start managing their loads and schedules."
      icon={<Users className="h-full w-full" />}
      action={
        onAdd
          ? {
              label: 'Add driver',
              onClick: onAdd,
            }
          : undefined
      }
      className={className}
    />
  );
}

export function EmptyInvoices({
  onCreate,
  className,
}: {
  onCreate?: () => void;
  className?: string;
}) {
  return (
    <Empty
      title="No invoices found"
      description="Create invoices for completed loads to track payments and revenue."
      icon={<DollarSign className="h-full w-full" />}
      action={
        onCreate
          ? {
              label: 'Create invoice',
              onClick: onCreate,
            }
          : undefined
      }
      className={className}
    />
  );
}

export function EmptyDocuments({
  onUpload,
  className,
}: {
  onUpload?: () => void;
  className?: string;
}) {
  return (
    <Empty
      title="No documents found"
      description="Upload documents to keep track of important files and records."
      icon={<FileText className="h-full w-full" />}
      action={
        onUpload
          ? {
              label: 'Upload document',
              onClick: onUpload,
            }
          : undefined
      }
      className={className}
    />
  );
}

export function EmptyFleet({
  onAdd,
  className,
}: {
  onAdd?: () => void;
  className?: string;
}) {
  return (
    <Empty
      title="No vehicles in fleet"
      description="Add vehicles to your fleet to start managing your transportation operations."
      icon={<Truck className="h-full w-full" />}
      action={
        onAdd
          ? {
              label: 'Add vehicle',
              onClick: onAdd,
            }
          : undefined
      }
      className={className}
    />
  );
}

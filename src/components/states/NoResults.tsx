/**
 * No Results Component
 * Displayed when search or filters return no results
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  X, 
  RefreshCw, 
  Plus,
  FileText,
  Users,
  Truck,
  DollarSign,
  Package,
} from 'lucide-react';

interface NoResultsProps {
  query?: string;
  filters?: Array<{ key: string; value: string }>;
  onClearFilters?: () => void;
  onClearSearch?: () => void;
  onRetry?: () => void;
  onCreate?: () => void;
  type?: 'search' | 'filters' | 'mixed';
  entity?: 'loads' | 'drivers' | 'invoices' | 'vehicles' | 'documents' | 'customers';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const entityConfigs = {
  loads: {
    icon: Truck,
    title: 'No loads found',
    description: 'No loads match your current search criteria.',
    createLabel: 'Create load',
  },
  drivers: {
    icon: Users,
    title: 'No drivers found',
    description: 'No drivers match your current search criteria.',
    createLabel: 'Add driver',
  },
  invoices: {
    icon: DollarSign,
    title: 'No invoices found',
    description: 'No invoices match your current search criteria.',
    createLabel: 'Create invoice',
  },
  vehicles: {
    icon: Truck,
    title: 'No vehicles found',
    description: 'No vehicles match your current search criteria.',
    createLabel: 'Add vehicle',
  },
  documents: {
    icon: FileText,
    title: 'No documents found',
    description: 'No documents match your current search criteria.',
    createLabel: 'Upload document',
  },
  customers: {
    icon: Users,
    title: 'No customers found',
    description: 'No customers match your current search criteria.',
    createLabel: 'Add customer',
  },
};

export function NoResults({
  query,
  filters = [],
  onClearFilters,
  onClearSearch,
  onRetry,
  onCreate,
  type = 'mixed',
  entity,
  size = 'md',
  className,
}: NoResultsProps) {
  const entityConfig = entity ? entityConfigs[entity] : null;
  const hasFilters = filters.length > 0;
  const hasQuery = !!query;

  const sizeClasses = {
    sm: 'py-6',
    md: 'py-8',
    lg: 'py-12',
  };

  const iconSizes = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  const getTitle = () => {
    if (entityConfig) return entityConfig.title;
    
    if (type === 'search') return 'No search results';
    if (type === 'filters') return 'No filtered results';
    return 'No results found';
  };

  const getDescription = () => {
    if (entityConfig) return entityConfig.description;
    
    if (type === 'search' && query) {
      return `No results found for "${query}". Try adjusting your search terms.`;
    }
    if (type === 'filters' && hasFilters) {
      return 'No results match your current filters. Try adjusting your criteria.';
    }
    return 'No results match your current criteria. Try adjusting your search or filters.';
  };

  const getIcon = () => {
    if (entityConfig) return entityConfig.icon;
    return Search;
  };

  const Icon = getIcon();

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
        <Icon className="h-full w-full" />
      </div>

      {/* Content */}
      <div className="max-w-md space-y-2">
        <h3 className="text-lg font-semibold text-text">
          {getTitle()}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed">
          {getDescription()}
        </p>

        {/* Active Filters */}
        {hasFilters && (
          <div className="mt-4">
            <div className="text-xs text-text-muted mb-2">Active filters:</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {filters.map((filter, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-surface-2 rounded-md text-xs"
                >
                  <span className="text-text-muted">{filter.key}:</span>
                  <span className="text-text">{filter.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6">
        {/* Clear Search */}
        {hasQuery && onClearSearch && (
          <Button
            onClick={onClearSearch}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear search
          </Button>
        )}

        {/* Clear Filters */}
        {hasFilters && onClearFilters && (
          <Button
            onClick={onClearFilters}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Clear filters
          </Button>
        )}

        {/* Clear All */}
        {hasQuery && hasFilters && onClearFilters && onClearSearch && (
          <Button
            onClick={() => {
              onClearSearch();
              onClearFilters();
            }}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear all
          </Button>
        )}

        {/* Retry */}
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        )}

        {/* Create */}
        {onCreate && (
          <Button
            onClick={onCreate}
            variant="default"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {entityConfig?.createLabel || 'Create new'}
          </Button>
        )}
      </div>
    </div>
  );
}

// Specialized no results components
export function NoSearchResults({
  query,
  onClearSearch,
  onRetry,
  className,
}: {
  query: string;
  onClearSearch?: () => void;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <NoResults
      query={query}
      type="search"
      onClearSearch={onClearSearch}
      onRetry={onRetry}
      className={className}
    />
  );
}

export function NoFilterResults({
  filters,
  onClearFilters,
  onRetry,
  className,
}: {
  filters: Array<{ key: string; value: string }>;
  onClearFilters?: () => void;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <NoResults
      filters={filters}
      type="filters"
      onClearFilters={onClearFilters}
      onRetry={onRetry}
      className={className}
    />
  );
}

// Portal-specific no results components
export function NoLoadsFound({
  query,
  filters,
  onClearFilters,
  onClearSearch,
  onCreate,
  className,
}: {
  query?: string;
  filters?: Array<{ key: string; value: string }>;
  onClearFilters?: () => void;
  onClearSearch?: () => void;
  onCreate?: () => void;
  className?: string;
}) {
  return (
    <NoResults
      entity="loads"
      query={query}
      filters={filters}
      onClearFilters={onClearFilters}
      onClearSearch={onClearSearch}
      onCreate={onCreate}
      className={className}
    />
  );
}

export function NoDriversFound({
  query,
  filters,
  onClearFilters,
  onClearSearch,
  onCreate,
  className,
}: {
  query?: string;
  filters?: Array<{ key: string; value: string }>;
  onClearFilters?: () => void;
  onClearSearch?: () => void;
  onCreate?: () => void;
  className?: string;
}) {
  return (
    <NoResults
      entity="drivers"
      query={query}
      filters={filters}
      onClearFilters={onClearFilters}
      onClearSearch={onClearSearch}
      onCreate={onCreate}
      className={className}
    />
  );
}

export function NoInvoicesFound({
  query,
  filters,
  onClearFilters,
  onClearSearch,
  onCreate,
  className,
}: {
  query?: string;
  filters?: Array<{ key: string; value: string }>;
  onClearFilters?: () => void;
  onClearSearch?: () => void;
  onCreate?: () => void;
  className?: string;
}) {
  return (
    <NoResults
      entity="invoices"
      query={query}
      filters={filters}
      onClearFilters={onClearFilters}
      onClearSearch={onClearSearch}
      onCreate={onCreate}
      className={className}
    />
  );
}

export function NoVehiclesFound({
  query,
  filters,
  onClearFilters,
  onClearSearch,
  onCreate,
  className,
}: {
  query?: string;
  filters?: Array<{ key: string; value: string }>;
  onClearFilters?: () => void;
  onClearSearch?: () => void;
  onCreate?: () => void;
  className?: string;
}) {
  return (
    <NoResults
      entity="vehicles"
      query={query}
      filters={filters}
      onClearFilters={onClearFilters}
      onClearSearch={onClearSearch}
      onCreate={onCreate}
      className={className}
    />
  );
}

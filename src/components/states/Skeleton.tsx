/**
 * Skeleton Component
 * Loading state component with various shapes and sizes
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
}

export function Skeleton({
  variant = 'text',
  size = 'md',
  width,
  height,
  lines = 1,
  className,
  ...props
}: SkeletonProps) {
  const sizeClasses = {
    sm: 'h-3',
    md: 'h-4',
    lg: 'h-6',
    xl: 'h-8',
  };

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-md',
  };

  const baseClasses = cn(
    'animate-pulse bg-surface-3',
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const style = {
    width: width,
    height: height,
  };

  if (lines > 1) {
    return (
      <div className="space-y-2" {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              index === lines - 1 && 'w-3/4' // Last line is shorter
            )}
            style={index === 0 ? style : undefined}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={baseClasses}
      style={style}
      {...props}
    />
  );
}

// Specialized skeleton components
export function SkeletonText({
  lines = 3,
  className,
  ...props
}: Omit<SkeletonProps, 'variant' | 'lines'> & { lines?: number }) {
  return (
    <Skeleton
      variant="text"
      lines={lines}
      className={cn('space-y-2', className)}
      {...props}
    />
  );
}

export function SkeletonAvatar({
  size = 'md',
  className,
  ...props
}: Omit<SkeletonProps, 'variant' | 'size'> & { size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  return (
    <Skeleton
      variant="circular"
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  );
}

export function SkeletonButton({
  size = 'md',
  className,
  ...props
}: Omit<SkeletonProps, 'variant' | 'size'> & { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-10 w-24',
    lg: 'h-12 w-32',
  };

  return (
    <Skeleton
      variant="rounded"
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  );
}

export function SkeletonCard({
  className,
  ...props
}: Omit<SkeletonProps, 'variant' | 'size'>) {
  return (
    <div className={cn('p-4 space-y-4', className)} {...props}>
      <div className="flex items-center space-x-4">
        <SkeletonAvatar size="md" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <SkeletonText lines={2} />
      <div className="flex space-x-2">
        <SkeletonButton size="sm" />
        <SkeletonButton size="sm" />
      </div>
    </div>
  );
}

export function SkeletonTable({
  rows = 5,
  columns = 4,
  className,
  ...props
}: {
  rows?: number;
  columns?: number;
  className?: string;
} & Omit<SkeletonProps, 'variant' | 'size'>) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      {/* Header */}
      <div className="flex space-x-4">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton
            key={`header-${index}`}
            className="h-4 flex-1"
          />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex space-x-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              className="h-4 flex-1"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonList({
  items = 3,
  className,
  ...props
}: {
  items?: number;
  className?: string;
} & Omit<SkeletonProps, 'variant' | 'size'>) {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <SkeletonAvatar size="sm" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonForm({
  fields = 4,
  className,
  ...props
}: {
  fields?: number;
  className?: string;
} & Omit<SkeletonProps, 'variant' | 'size'>) {
  return (
    <div className={cn('space-y-6', className)} {...props}>
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <div className="flex space-x-2 pt-4">
        <SkeletonButton size="md" />
        <SkeletonButton size="md" />
      </div>
    </div>
  );
}

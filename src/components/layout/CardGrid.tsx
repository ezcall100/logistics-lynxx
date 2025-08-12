/**
 * Card Grid Component
 * Responsive grid layout helper for consistent card arrangements
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface CardGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  autoFit?: boolean;
  autoFill?: boolean;
  minWidth?: string;
}

export function CardGrid({
  children,
  cols = 3,
  gap = 'md',
  className,
  autoFit = false,
  autoFill = false,
  minWidth = '300px',
}: CardGridProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const gridClasses = autoFit || autoFill
    ? `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`
    : {
        1: 'grid-cols-1',
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
        6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6',
      }[cols];

  const style = autoFit || autoFill ? {
    gridTemplateColumns: autoFit 
      ? `repeat(auto-fit, minmax(${minWidth}, 1fr))`
      : `repeat(auto-fill, minmax(${minWidth}, 1fr))`,
  } : undefined;

  return (
    <div
      className={cn(
        'grid',
        gridClasses,
        gapClasses[gap],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

// Preset grid layouts for common use cases
export function DashboardGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <CardGrid cols={3} gap="lg" className={className}>
      {children}
    </CardGrid>
  );
}

export function StatsGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <CardGrid cols={4} gap="md" className={className}>
      {children}
    </CardGrid>
  );
}

export function ContentGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <CardGrid cols={2} gap="lg" className={className}>
      {children}
    </CardGrid>
  );
}

export function AutoFitGrid({ 
  children, 
  minWidth = '280px',
  className 
}: { 
  children: React.ReactNode; 
  minWidth?: string;
  className?: string;
}) {
  return (
    <CardGrid autoFit minWidth={minWidth} gap="md" className={className}>
      {children}
    </CardGrid>
  );
}

export function AutoFillGrid({ 
  children, 
  minWidth = '280px',
  className 
}: { 
  children: React.ReactNode; 
  minWidth?: string;
  className?: string;
}) {
  return (
    <CardGrid autoFill minWidth={minWidth} gap="md" className={className}>
      {children}
    </CardGrid>
  );
}

// Responsive grid with different column counts per breakpoint
export function ResponsiveGrid({
  children,
  className,
  mobile = 1,
  tablet = 2,
  desktop = 3,
  wide = 4,
  gap = 'md',
}: {
  children: React.ReactNode;
  className?: string;
  mobile?: 1 | 2;
  tablet?: 1 | 2 | 3;
  desktop?: 1 | 2 | 3 | 4;
  wide?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const gridClasses = [
    `grid-cols-${mobile}`,
    tablet !== mobile && `sm:grid-cols-${tablet}`,
    desktop !== tablet && `lg:grid-cols-${desktop}`,
    wide !== desktop && `xl:grid-cols-${wide}`,
  ].filter(Boolean).join(' ');

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  return (
    <div className={cn('grid', gridClasses, gapClasses[gap], className)}>
      {children}
    </div>
  );
}

// Masonry-style grid (requires CSS Grid masonry support)
export function MasonryGrid({ 
  children, 
  className,
  columns = 3,
}: { 
  children: React.ReactNode; 
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}) {
  const columnClasses = {
    1: 'columns-1',
    2: 'columns-1 sm:columns-2',
    3: 'columns-1 sm:columns-2 lg:columns-3',
    4: 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4',
  };

  return (
    <div className={cn('space-y-4', columnClasses[columns], className)}>
      {children}
    </div>
  );
}

// List grid for table-like layouts
export function ListGrid({ 
  children, 
  className,
  gap = 'sm',
}: { 
  children: React.ReactNode; 
  className?: string;
  gap?: 'sm' | 'md' | 'lg';
}) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
  };

  return (
    <div className={cn('grid grid-cols-1', gapClasses[gap], className)}>
      {children}
    </div>
  );
}

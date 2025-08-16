/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = "",
  cols = { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 },
  gap = { xs: 4, sm: 4, md: 6, lg: 6 }
}) => {
  const getGridCols = () => {
    return [
      `grid-cols-${cols.xs || 1}`,
      cols.sm ? `sm:grid-cols-${cols.sm}` : '',
      cols.md ? `md:grid-cols-${cols.md}` : '',
      cols.lg ? `lg:grid-cols-${cols.lg}` : '',
      cols.xl ? `xl:grid-cols-${cols.xl}` : ''
    ].filter(Boolean).join(' ');
  };

  const getGridGap = () => {
    return [
      `gap-${gap.xs || 4}`,
      gap.sm ? `sm:gap-${gap.sm}` : '',
      gap.md ? `md:gap-${gap.md}` : '',
      gap.lg ? `lg:gap-${gap.lg}` : ''
    ].filter(Boolean).join(' ');
  };

  return (
    <div className={cn(
      "grid",
      getGridCols(),
      getGridGap(),
      className
    )}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;

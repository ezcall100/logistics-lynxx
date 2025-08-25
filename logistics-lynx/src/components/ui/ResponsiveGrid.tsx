import React, { ReactNode } from 'react';

interface ResponsiveGridProps {
  children: ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'medium',
  className = ''
}) => {
  const gapClasses = {
    none: '',
    small: 'gap-2 sm:gap-3',
    medium: 'gap-4 sm:gap-6',
    large: 'gap-6 sm:gap-8'
  };

  const gridCols = {
    mobile: cols.mobile || 1,
    tablet: cols.tablet || 2,
    desktop: cols.desktop || 3
  };

  const gridClasses = `grid grid-cols-${gridCols.mobile} sm:grid-cols-${gridCols.tablet} lg:grid-cols-${gridCols.desktop} ${gapClasses[gap]} ${className}`;

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;

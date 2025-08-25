import React, { ReactNode } from 'react';

interface ResponsiveCardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  hover?: boolean;
  mode?: 'light' | 'dark';
}

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  className = '',
  padding = 'medium',
  hover = true,
  mode = 'light'
}) => {
  const paddingClasses = {
    none: '',
    small: 'p-3 sm:p-4',
    medium: 'p-4 sm:p-6',
    large: 'p-6 sm:p-8'
  };

  const baseClasses = `rounded-xl border transition-all duration-200 ${
    mode === 'light' 
      ? 'bg-white border-slate-200 shadow-sm' 
      : 'bg-slate-800 border-slate-700 shadow-sm'
  }`;

  const hoverClasses = hover 
    ? `hover:shadow-lg hover:scale-[1.02] ${
        mode === 'light' 
          ? 'hover:border-slate-300' 
          : 'hover:border-slate-600'
      }` 
    : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveCard;

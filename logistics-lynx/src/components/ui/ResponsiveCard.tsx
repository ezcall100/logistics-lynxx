import React, { ReactNode } from 'react';
import { 
  EnhancedCard, 
  EnhancedButton, 
  EnhancedInput, 
  EnhancedBadge,
  EnhancedProgress,
  EnhancedModal,
  stableStyles 
} from '@/components/ui/EnhancedUIComponents';

interface ResponsiveCardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  hover?: boolean;
  mode?: 'light' | 'dark';
  glass?: boolean;
  elevated?: boolean;
  premium?: boolean;
  animated?: boolean;
  onClick?: () => void;
}

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  className = '',
  padding = 'medium',
  hover = true,
  mode = 'light',
  glass = false,
  elevated = false,
  premium = false,
  animated = false,
  onClick
}) => {
  const paddingClasses = {
    none: 'p-0',
    small: 'p-3 sm:p-4',
    medium: 'p-4 sm:p-6',
    large: 'p-6 sm:p-8'
  };

  // Use custom EnhancedCard with advanced styling options
  return (
    <EnhancedCard
      className={`${paddingClasses[padding]} ${className}`}
      hover={hover}
      glass={glass}
      elevated={elevated}
      premium={premium}
      animated={animated}
      mode={mode}
      onClick={onClick}
    >
      {children}
    </EnhancedCard>
  );
};

// Export additional custom components for easy access
export {
  EnhancedButton,
  EnhancedInput,
  EnhancedBadge,
  EnhancedProgress,
  EnhancedModal,
  stableStyles
};

export default ResponsiveCard;

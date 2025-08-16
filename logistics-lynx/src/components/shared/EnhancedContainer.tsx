/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { cn } from '@/lib/utils';

interface EnhancedContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'premium';
  portal?: 'driver' | 'owner' | 'carrier' | 'broker' | 'shipper';
}

const EnhancedContainer: React.FC<EnhancedContainerProps> = ({ 
  children, 
  className, 
  variant = 'default',
  portal
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return 'glass-ultra border border-border/30 shadow-premium';
      case 'premium':
        return 'glass-ultra border border-border/30 shadow-premium card-hover';
      default:
        return '';
    }
  };

  const getPortalGradient = () => {
    if (!portal) return '';
    switch (portal) {
      case 'driver':
        return 'bg-gradient-to-br from-driver-primary/5 via-transparent to-driver-primary/3';
      case 'owner':
        return 'bg-gradient-to-br from-owner-primary/5 via-transparent to-owner-primary/3';
      case 'carrier':
        return 'bg-gradient-to-br from-carrier-primary/5 via-transparent to-carrier-primary/3';
      case 'broker':
        return 'bg-gradient-to-br from-broker-primary/5 via-transparent to-broker-primary/3';
      case 'shipper':
        return 'bg-gradient-to-br from-shipper-primary/5 via-transparent to-shipper-primary/3';
      default:
        return '';
    }
  };

  return (
    <div className={cn(
      'container-responsive space-y-6 p-6',
      getVariantStyles(),
      'relative overflow-hidden rounded-2xl',
      className
    )}>
      {portal && (
        <div className={cn(
          'absolute inset-0 -z-10',
          getPortalGradient()
        )} />
      )}
      {children}
    </div>
  );
};

export default EnhancedContainer;
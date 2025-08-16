/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'premium' | 'gradient';
  portal?: 'driver' | 'owner' | 'carrier' | 'broker' | 'shipper';
  hover?: boolean;
  gradient?: boolean;
}

const EnhancedCard: React.FC<EnhancedCardProps> = ({ 
  children, 
  className, 
  variant = 'default',
  portal,
  hover = true,
  gradient = false
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return 'glass-ultra border border-border/30 shadow-premium';
      case 'premium':
        return 'glass-ultra border border-border/30 shadow-premium animate-fade-in';
      case 'gradient':
        return 'glass-ultra border border-border/30 shadow-premium relative overflow-hidden';
      default:
        return 'glass-subtle border border-border/20 shadow-float';
    }
  };

  const getPortalAccent = () => {
    if (!portal) return 'border-primary/30';
    switch (portal) {
      case 'driver':
        return 'border-driver-primary/30';
      case 'owner':
        return 'border-owner-primary/30';
      case 'carrier':
        return 'border-carrier-primary/30';
      case 'broker':
        return 'border-broker-primary/30';
      case 'shipper':
        return 'border-shipper-primary/30';
      default:
        return 'border-primary/30';
    }
  };

  const getGradientBackground = () => {
    if (!gradient || !portal) return '';
    switch (portal) {
      case 'driver':
        return 'before:bg-gradient-to-r before:from-driver-primary/5 before:to-transparent';
      case 'owner':
        return 'before:bg-gradient-to-r before:from-owner-primary/5 before:to-transparent';
      case 'carrier':
        return 'before:bg-gradient-to-r before:from-carrier-primary/5 before:to-transparent';
      case 'broker':
        return 'before:bg-gradient-to-r before:from-broker-primary/5 before:to-transparent';
      case 'shipper':
        return 'before:bg-gradient-to-r before:from-shipper-primary/5 before:to-transparent';
      default:
        return 'before:bg-gradient-to-r before:from-primary/5 before:to-transparent';
    }
  };

  return (
    <Card className={cn(
      getVariantStyles(),
      hover && 'card-hover',
      gradient && 'before:absolute before:inset-0 before:pointer-events-none',
      getGradientBackground(),
      getPortalAccent(),
      'rounded-2xl transition-all duration-300',
      className
    )}>
      {children}
    </Card>
  );
};

export default EnhancedCard;
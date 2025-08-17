/**
 * Enhanced Card Component
 * Modern card component with animations, variants, and interactive features
 */

import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled' | 'gradient' | 'glass';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  hover?: boolean;
  loading?: boolean;
  error?: boolean;
  success?: boolean;
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  actions?: React.ReactNode;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
  gradient?: string;
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  border?: 'none' | 'light' | 'default' | 'dark';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const EnhancedCard = forwardRef<HTMLDivElement, EnhancedCardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      interactive = false,
      hover = false,
      loading = false,
      error = false,
      success = false,
      children,
      header,
      footer,
      actions,
      badge,
      icon,
      gradient,
      shadow = 'md',
      border = 'default',
      rounded = 'lg',
      className,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const variants = {
      default: 'bg-white border border-secondary-200',
      elevated: 'bg-white border border-secondary-200 shadow-lg',
      outlined: 'bg-white border-2 border-secondary-200',
      filled: 'bg-secondary-50 border border-secondary-200',
      gradient: gradient || 'bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200',
      glass: 'backdrop-blur-sm bg-white/80 border border-white/20',
    };

    const paddingVariants = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    };

    const shadowVariants = {
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-2xl',
    };

    const borderVariants = {
      none: 'border-0',
      light: 'border border-secondary-100',
      default: 'border border-secondary-200',
      dark: 'border border-secondary-300',
    };

    const roundedVariants = {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      full: 'rounded-full',
    };

    const statusClasses = {
      loading: 'animate-pulse',
      error: 'border-error-200 bg-error-50',
      success: 'border-success-200 bg-success-50',
    };

    const cardClasses = cn(
      'relative overflow-hidden transition-all duration-300 ease-in-out',
      variants[variant],
      paddingVariants[padding],
      shadowVariants[shadow],
      borderVariants[border],
      roundedVariants[rounded],
      interactive && 'cursor-pointer',
      hover && 'hover:scale-105 hover:shadow-xl',
      loading && statusClasses.loading,
      error && statusClasses.error,
      success && statusClasses.success,
      className
    );

    const MotionCard = motion(Card);

    return (
      <MotionCard
        ref={ref}
        className={cardClasses}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={interactive ? { scale: 1.02, y: -2 } : {}}
        whileTap={interactive ? { scale: 0.98 } : {}}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        {...props}
      >
        {/* Badge */}
        {badge && (
          <div className="absolute top-4 right-4 z-10">
            {badge}
          </div>
        )}

        {/* Icon */}
        {icon && (
          <div className="absolute top-4 left-4 z-10">
            <motion.div
              animate={isHovered ? { rotate: 5, scale: 1.1 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.div>
          </div>
        )}

        {/* Header */}
        {header && (
          <CardHeader className="pb-4">
            <AnimatePresence>
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  <div className="h-6 bg-secondary-200 rounded animate-pulse" />
                  <div className="h-4 bg-secondary-200 rounded w-2/3 animate-pulse" />
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {header}
                </motion.div>
              )}
            </AnimatePresence>
          </CardHeader>
        )}

        {/* Content */}
        <CardContent className="relative">
          <AnimatePresence>
            {loading ? (
              <motion.div
                key="loading-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <div className="h-4 bg-secondary-200 rounded animate-pulse" />
                <div className="h-4 bg-secondary-200 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-secondary-200 rounded w-4/6 animate-pulse" />
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        {/* Footer */}
        {footer && (
          <div className="px-6 pb-6 pt-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {footer}
            </motion.div>
          </div>
        )}

        {/* Actions */}
        {actions && (
          <div className="px-6 pb-6 pt-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-end space-x-2"
            >
              {actions}
            </motion.div>
          </div>
        )}

        {/* Interactive Overlay */}
        {interactive && (
          <motion.div
            className="absolute inset-0 bg-primary-500/5 opacity-0 pointer-events-none"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </MotionCard>
    );
  }
);

EnhancedCard.displayName = 'EnhancedCard';

export { EnhancedCard };

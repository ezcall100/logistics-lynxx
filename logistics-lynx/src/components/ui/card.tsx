/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Card Component
 * Unified card component with consistent styling and flexible slots
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  hover?: boolean;
  interactive?: boolean;
  loading?: boolean;
  as?: React.ElementType;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  // Extends HTMLAttributes for standard div element props
  children?: React.ReactNode;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: React.ReactNode;
}

interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  // Extends HTMLAttributes for standard div element props
  children?: React.ReactNode;
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  // Extends HTMLAttributes for standard paragraph element props
  children?: React.ReactNode;
}

// Main Card component
export function Card({
  size = 'md',
  variant = 'default',
  hover = false,
  interactive = false,
  loading = false,
  as: Component = 'div',
  className,
  children,
  ...props
}: CardProps) {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const variantClasses = {
    default: 'bg-surface border border-border shadow-sm',
    elevated: 'bg-surface border border-border shadow-md',
    outlined: 'bg-transparent border border-border',
    ghost: 'bg-transparent border-0',
  };

  const interactiveClasses = interactive
    ? 'cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5'
    : '';

  const hoverClasses = hover
    ? 'transition-all duration-200 hover:shadow-md hover:border-border-strong'
    : '';

  return (
    <Component
      className={cn(
        'rounded-lg transition-all duration-200',
        sizeClasses[size],
        variantClasses[variant],
        interactiveClasses,
        hoverClasses,
        loading && 'animate-pulse',
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="space-y-3">
          <div className="h-4 bg-surface-3 rounded animate-pulse" />
          <div className="h-3 bg-surface-3 rounded animate-pulse w-3/4" />
          <div className="h-3 bg-surface-3 rounded animate-pulse w-1/2" />
        </div>
      ) : (
        children
      )}
    </Component>
  );
}

// Card Header
export function CardHeader({
  icon,
  badge,
  className,
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-3', className)} {...props}>
      <div className="flex items-start gap-3 flex-1 min-w-0">
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
      {badge && <div className="flex-shrink-0">{badge}</div>}
    </div>
  );
}

// Card Title
export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'text-lg font-semibold text-text leading-tight',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

// Card Description
export function CardDescription({
  className,
  children,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={cn(
        'text-sm text-text-muted leading-relaxed mt-1',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

// Card Content
export function CardContent({
  className,
  children,
  ...props
}: CardContentProps) {
  return (
    <div className={cn('mt-4', className)} {...props}>
      {children}
    </div>
  );
}

// Card Footer
export function CardFooter({
  actions,
  className,
  children,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 mt-4 pt-4 border-t border-border-subtle',
        className
      )}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

// Card Actions
export function CardActions({
  className,
  children,
  ...props
}: CardActionsProps) {
  return (
    <div
      className={cn('flex items-center gap-2 mt-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Specialized card variants
export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className,
  ...props
}: {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
} & Omit<CardProps, 'children'>) {
  const trendColors = {
    up: 'text-success',
    down: 'text-destructive',
    neutral: 'text-text-muted',
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    neutral: '→',
  };

  return (
    <Card className={cn('relative overflow-hidden', className)} {...props}>
      <CardHeader
        icon={icon}
        badge={
          trend && (
            <div className={cn('flex items-center gap-1 text-sm', trendColors[trend])}>
              <span>{trendIcons[trend]}</span>
              {trendValue && <span>{trendValue}</span>}
            </div>
          )
        }
      >
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-text">{value}</div>
      </CardContent>
    </Card>
  );
}

export function ActionCard({
  title,
  description,
  icon,
  action,
  href,
  onClick,
  className,
  ...props
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
} & Omit<CardProps, 'children'>) {
  const CardComponent = href ? 'a' : 'div';
  const cardProps = href ? { href } : {};

  return (
    <Card
      as={CardComponent}
      interactive
      className={cn('group', className)}
      onClick={onClick}
      {...cardProps}
      {...props}
    >
      <CardHeader icon={icon}>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {action && (
        <CardFooter>
          <span className="text-sm font-medium text-primary group-hover:text-primary-hover transition-colors">
            {action} →
          </span>
        </CardFooter>
      )}
    </Card>
  );
}

export function InfoCard({
  title,
  description,
  icon,
  variant = 'default',
  className,
  ...props
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
} & Omit<CardProps, 'children'>) {
  const variantStyles = {
    default: 'border-primary-subtle bg-primary-subtle/20',
    success: 'border-success-subtle bg-success-subtle/20',
    warning: 'border-warning-subtle bg-warning-subtle/20',
    error: 'border-destructive-subtle bg-destructive-subtle/20',
    info: 'border-secondary-subtle bg-secondary-subtle/20',
  };

  return (
    <Card
      variant="outlined"
      className={cn(variantStyles[variant], className)}
      {...props}
    >
      <CardHeader icon={icon}>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
    </Card>
  );
}

// Export all components
export {
  Card as Root,
  CardHeader as Header,
  CardTitle as Title,
  CardDescription as Description,
  CardContent as Content,
  CardFooter as Footer,
  CardActions as Actions,
};

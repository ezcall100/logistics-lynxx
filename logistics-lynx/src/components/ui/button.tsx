import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-canvas',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'active:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-brand-primary-500 text-white border border-transparent',
          'hover:bg-brand-primary-600 hover:shadow-md',
          'focus:ring-brand-primary-500',
          'active:bg-brand-primary-700',
        ],
        success: [
          'bg-state-success-bg text-state-success-text border border-state-success-border',
          'hover:bg-green-100 hover:border-green-600',
          'focus:ring-green-500',
          'active:bg-green-200',
        ],
        danger: [
          'bg-state-error-bg text-state-error-text border border-state-error-border',
          'hover:bg-red-100 hover:border-red-600',
          'focus:ring-red-500',
          'active:bg-red-200',
        ],
        neutral: [
          'bg-bg-elevated text-text-primary border border-border-default',
          'hover:bg-bg-soft hover:border-border-hover',
          'focus:ring-border-focus',
          'active:bg-bg-soft',
        ],
        outline: [
          'bg-transparent text-text-primary border border-border-default',
          'hover:bg-bg-elevated hover:border-border-hover',
          'focus:ring-border-focus',
          'active:bg-bg-soft',
        ],
        ghost: [
          'bg-transparent text-text-primary border border-transparent',
          'hover:bg-bg-elevated hover:text-text-primary',
          'focus:ring-border-focus',
          'active:bg-bg-soft',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      loading: {
        true: 'cursor-wait',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      fullWidth: false,
      loading: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(
          buttonVariants({ variant, size, fullWidth, loading }),
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && leftIcon}
        {children}
        {!loading && rightIcon && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };

/* eslint-disable @typescript-eslint/no-explicit-any */
import { tv, type VariantProps } from "tailwind-variants"

// 🎨 ENHANCED BUTTON VARIANTS WITH TAILWIND-VARIANTS
// Provides better type safety, composability, and enterprise-grade styling

export const buttonVariants = tv({
  base: [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
    "ring-offset-background transition-all duration-200 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "active:scale-[0.98] hover:scale-[1.02]",
  ],
  variants: {
    variant: {
      default: [
        "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border-[var(--btn-primary-border)] shadow-sm",
        "hover:bg-[var(--btn-primary-bg-hover)] hover:shadow-md",
        "active:bg-[var(--btn-primary-bg-hover)]",
      ],
      destructive: [
        "bg-[var(--btn-danger-bg)] text-[var(--btn-danger-text)] border-[var(--btn-danger-border)] shadow-sm",
        "hover:bg-[var(--btn-danger-bg-hover)] hover:shadow-md",
        "active:bg-[var(--btn-danger-bg-hover)]",
      ],
      outline: [
        "border border-input bg-background shadow-sm",
        "hover:bg-accent hover:text-accent-foreground hover:shadow-md",
        "active:bg-accent/80",
      ],
      secondary: [
        "bg-[var(--btn-neutral-bg)] text-[var(--btn-neutral-text)] border-[var(--btn-neutral-border)] shadow-sm",
        "hover:bg-[var(--btn-neutral-bg-hover)] hover:shadow-md",
        "active:bg-[var(--btn-neutral-bg-hover)]",
      ],
      ghost: [
        "hover:bg-accent hover:text-accent-foreground",
        "active:bg-accent/80",
      ],
      link: [
        "text-primary underline-offset-4",
        "hover:underline hover:text-primary/80",
        "active:text-primary/90",
      ],
      // Enterprise-specific variants
      success: [
        "bg-[var(--btn-success-bg)] text-[var(--btn-success-text)] border-[var(--btn-success-border)] shadow-sm",
        "hover:bg-[var(--btn-success-bg-hover)] hover:shadow-md",
        "active:bg-[var(--btn-success-bg-hover)]",
      ],
      warning: [
        "bg-[var(--btn-warning-bg)] text-[var(--btn-warning-text)] border-[var(--btn-warning-border)] shadow-sm",
        "hover:bg-[var(--btn-warning-bg-hover)] hover:shadow-md",
        "active:bg-[var(--btn-warning-bg-hover)]",
      ],
      info: [
        "bg-[var(--btn-info-bg)] text-[var(--btn-info-text)] border-[var(--btn-info-border)] shadow-sm",
        "hover:bg-[var(--btn-info-bg-hover)] hover:shadow-md",
        "active:bg-[var(--btn-info-bg-hover)]",
      ],
      gradient: [
        "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm",
        "hover:from-blue-700 hover:to-indigo-700 hover:shadow-md",
        "active:from-blue-800 active:to-indigo-800",
      ],
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3 text-xs",
      lg: "h-11 rounded-md px-8 text-base",
      xl: "h-12 rounded-lg px-10 text-lg",
      icon: "h-10 w-10",
      "icon-sm": "h-8 w-8",
      "icon-lg": "h-12 w-12",
    },
    // Animation variants
    animation: {
      none: "",
      pulse: "animate-pulse",
      bounce: "animate-bounce",
      spin: "animate-spin",
    },
    // Loading state
    loading: {
      true: "opacity-75 cursor-not-allowed",
      false: "",
    },
  },
  compoundVariants: [
    // Icon-only buttons
    {
      size: "icon",
      class: "p-0",
    },
    {
      size: "icon-sm",
      class: "p-0",
    },
    {
      size: "icon-lg",
      class: "p-0",
    },
    // Loading state with spinner
    {
      loading: true,
      class: "relative",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "default",
    animation: "none",
    loading: false,
  },
})

// Export the type for use in components
export type ButtonVariants = VariantProps<typeof buttonVariants>

// 🎯 CONVENIENCE VARIANTS FOR COMMON USE CASES
export const buttonVariantsPresets = {
  // Primary actions
  primary: buttonVariants({ variant: "default", size: "default" }),
  primaryLarge: buttonVariants({ variant: "default", size: "lg" }),
  primarySmall: buttonVariants({ variant: "default", size: "sm" }),
  
  // Secondary actions
  secondary: buttonVariants({ variant: "secondary", size: "default" }),
  secondaryLarge: buttonVariants({ variant: "secondary", size: "lg" }),
  secondarySmall: buttonVariants({ variant: "secondary", size: "sm" }),
  
  // Destructive actions
  destructive: buttonVariants({ variant: "destructive", size: "default" }),
  destructiveLarge: buttonVariants({ variant: "destructive", size: "lg" }),
  destructiveSmall: buttonVariants({ variant: "destructive", size: "sm" }),
  
  // Icon buttons
  icon: buttonVariants({ size: "icon" }),
  iconSmall: buttonVariants({ size: "icon-sm" }),
  iconLarge: buttonVariants({ size: "icon-lg" }),
  
  // Status buttons
  success: buttonVariants({ variant: "success" }),
  warning: buttonVariants({ variant: "warning" }),
  info: buttonVariants({ variant: "info" }),
  
  // Gradient buttons
  gradient: buttonVariants({ variant: "gradient" }),
  gradientLarge: buttonVariants({ variant: "gradient", size: "lg" }),
  
  // Loading states
  loading: buttonVariants({ loading: true }),
  loadingPrimary: buttonVariants({ variant: "default", loading: true }),
  loadingDestructive: buttonVariants({ variant: "destructive", loading: true }),
} as const

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// 🎨 ENHANCED BUTTON WITH SEMANTIC TOKENS - NEVER WHITE ON WHITE
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
    "transition-all duration-200 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "motion-safe:transition-[colors,transform]",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[hsl(var(--color-primary))] text-white shadow-sm",
          "hover:bg-[hsl(var(--color-primary-600))] hover:shadow-md",
          "active:bg-[hsl(var(--color-primary-700))]",
          "focus-visible:ring-[hsl(var(--color-primary))]",
        ],
        destructive: [
          "bg-[hsl(var(--color-danger))] text-white shadow-sm",
          "hover:bg-[hsl(var(--color-danger-600))] hover:shadow-md",
          "active:bg-[hsl(var(--color-danger-700))]",
          "focus-visible:ring-[hsl(var(--color-danger))]",
        ],
        outline: [
          "border border-[hsl(var(--color-border))] bg-transparent",
          "hover:bg-[hsl(var(--color-muted))] hover:text-[hsl(var(--color-text))]",
          "active:bg-[hsl(var(--color-muted))]",
          "focus-visible:ring-[hsl(var(--color-primary))]",
        ],
        secondary: [
          "bg-[hsl(var(--color-muted))] text-[hsl(var(--color-text))] shadow-sm",
          "hover:bg-[hsl(var(--color-muted-hover))] hover:shadow-md",
          "active:bg-[hsl(var(--color-muted-active))]",
          "focus-visible:ring-[hsl(var(--color-primary))]",
        ],
        ghost: [
          "bg-transparent hover:bg-[hsl(var(--color-muted))]",
          "hover:text-[hsl(var(--color-text))]",
          "active:bg-[hsl(var(--color-muted))]",
          "focus-visible:ring-[hsl(var(--color-primary))]",
        ],
        link: [
          "text-[hsl(var(--color-primary))] underline-offset-4",
          "hover:underline hover:text-[hsl(var(--color-primary-600))]",
          "focus-visible:ring-[hsl(var(--color-primary))]",
        ],
        success: [
          "bg-[hsl(var(--color-success))] text-white shadow-sm",
          "hover:bg-[hsl(var(--color-success-600))] hover:shadow-md",
          "active:bg-[hsl(var(--color-success-700))]",
          "focus-visible:ring-[hsl(var(--color-success))]",
        ],
        warning: [
          "bg-[hsl(var(--color-warning))] text-black shadow-sm",
          "hover:bg-[hsl(var(--color-warning-600))] hover:shadow-md",
          "active:bg-[hsl(var(--color-warning-700))]",
          "focus-visible:ring-[hsl(var(--color-warning))]",
        ],
        info: [
          "bg-[hsl(var(--color-info))] text-white shadow-sm",
          "hover:bg-[hsl(var(--color-info-600))] hover:shadow-md",
          "active:bg-[hsl(var(--color-info-700))]",
          "focus-visible:ring-[hsl(var(--color-info))]",
        ],
        gradient: [
          "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm",
          "hover:from-blue-700 hover:to-purple-700 hover:shadow-md",
          "active:from-blue-800 active:to-purple-800",
          "focus-visible:ring-blue-500",
        ],
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        spin: "animate-spin",
      },
      loading: {
        false: "",
        true: "relative cursor-wait",
      },
    },
    compoundVariants: [
      {
        loading: "true",
        className: "text-transparent",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
      loading: "false",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, animation, loading, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, loading, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        )}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

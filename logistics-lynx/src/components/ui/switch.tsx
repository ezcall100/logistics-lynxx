/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils"

// 🎨 ENHANCED SWITCH WITH SEMANTIC TOKENS & SLOTS
const switchStyles = tv({
  slots: {
    root: [
      "inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent",
      "transition-all duration-200 ease-in-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // 🎯 GUARANTEED CONTRAST - never white on white
      "data-[state=unchecked]:bg-slate-300 data-[state=unchecked]:hover:bg-slate-400",
      "border-[hsl(var(--color-border))]",
    ],
    thumb: [
      "pointer-events-none block rounded-full bg-white shadow-lg ring-0",
      "transition-transform duration-200 ease-in-out",
      "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      "h-5 w-5",
    ],
  },
  variants: {
    variant: {
      default: [
        "data-[state=checked]:bg-[hsl(var(--color-primary))]",
        "data-[state=checked]:hover:bg-[hsl(var(--color-primary-600))]",
      ],
      success: [
        "data-[state=checked]:bg-[hsl(var(--color-success))]",
        "data-[state=checked]:hover:bg-[hsl(var(--color-success-600))]",
      ],
      warning: [
        "data-[state=checked]:bg-[hsl(var(--color-warning))]",
        "data-[state=checked]:hover:bg-[hsl(var(--color-warning-600))]",
      ],
      danger: [
        "data-[state=checked]:bg-[hsl(var(--color-danger))]",
        "data-[state=checked]:hover:bg-[hsl(var(--color-danger-600))]",
      ],
      info: [
        "data-[state=checked]:bg-[hsl(var(--color-info))]",
        "data-[state=checked]:hover:bg-[hsl(var(--color-info-600))]",
      ],
      gradient: [
        "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600",
        "data-[state=checked]:hover:from-blue-700 data-[state=checked]:hover:to-purple-700",
      ],
    },
    size: {
      sm: {
        root: "h-5 w-9",
        thumb: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      },
      default: {
        root: "h-6 w-11",
        thumb: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      },
      lg: {
        root: "h-7 w-14",
        thumb: "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchStyles> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant, size, ...props }, ref) => {
  const { root, thumb } = switchStyles({ variant, size })
  
  return (
    <SwitchPrimitives.Root
      className={cn(root(), className)}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb className={cn(thumb())} />
    </SwitchPrimitives.Root>
  )
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch, switchStyles }

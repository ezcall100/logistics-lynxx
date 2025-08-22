/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils"

// 🎨 ENHANCED SWITCH VARIANTS WITH SEMANTIC COLOR TOKENS
const switchVariants = tv({
  base: [
    "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
    "transition-all duration-200 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  variants: {
    variant: {
      default: [
        "data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-300",
        "data-[state=checked]:hover:bg-blue-700 data-[state=unchecked]:hover:bg-slate-400",
      ],
      success: [
        "data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-slate-300",
        "data-[state=checked]:hover:bg-green-700 data-[state=unchecked]:hover:bg-slate-400",
      ],
      warning: [
        "data-[state=checked]:bg-amber-600 data-[state=unchecked]:bg-slate-300",
        "data-[state=checked]:hover:bg-amber-700 data-[state=unchecked]:hover:bg-slate-400",
      ],
      danger: [
        "data-[state=checked]:bg-red-600 data-[state=unchecked]:bg-slate-300",
        "data-[state=checked]:hover:bg-red-700 data-[state=unchecked]:hover:bg-slate-400",
      ],
      info: [
        "data-[state=checked]:bg-cyan-600 data-[state=unchecked]:bg-slate-300",
        "data-[state=checked]:hover:bg-cyan-700 data-[state=unchecked]:hover:bg-slate-400",
      ],
      gradient: [
        "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-indigo-600 data-[state=unchecked]:bg-slate-300",
        "data-[state=checked]:hover:from-blue-700 data-[state=checked]:hover:to-indigo-700 data-[state=unchecked]:hover:bg-slate-400",
      ],
    },
    size: {
      default: "h-6 w-11",
      sm: "h-5 w-9",
      lg: "h-7 w-14",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

const switchThumbVariants = tv({
  base: [
    "pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out",
  ],
  variants: {
    size: {
      default: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      sm: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      lg: "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant, size, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants({ variant, size, className }))}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(switchThumbVariants({ size }))}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch, switchVariants }

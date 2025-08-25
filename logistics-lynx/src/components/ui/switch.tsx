import * as React from "react"
import { cn } from '@/lib/utils.ts'

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...props }, ref) => (
    <div className={cn("relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50", className)}>
      <input
        type="checkbox"
        className="sr-only"
        ref={ref}
        {...props}
      />
      <div className="absolute inset-0 rounded-full bg-input transition-colors peer-checked:bg-primary" />
      <div className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform peer-checked:translate-x-5 peer-checked:translate-x-0" />
    </div>
  )
)
Switch.displayName = "Switch"

export { Switch }

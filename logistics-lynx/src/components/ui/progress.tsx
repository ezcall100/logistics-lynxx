import * as React from "react"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => (
    <div
      ref={ref}
      className={`relative h-4 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 ${className || ''}`}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 transition-all duration-300 ease-out"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </div>
  )
)
Progress.displayName = "Progress"

export { Progress }

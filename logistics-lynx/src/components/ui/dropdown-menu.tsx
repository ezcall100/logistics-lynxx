import * as React from "react"
import { ChevronDown, MoreHorizontal } from "lucide-react"
import { cn } from "../../lib/utils"

const DropdownMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    trigger?: React.ReactNode
    items?: Array<{
      label: string
      onClick?: () => void
      icon?: React.ReactNode
      disabled?: boolean
      separator?: boolean
    }>
  }
>(({ className, trigger, items = [], ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className={cn("relative", className)} ref={ref} {...props}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        {trigger || (
          <>
            <span>Menu</span>
            <ChevronDown className="h-4 w-4" />
          </>
        )}
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 z-50 min-w-[200px] bg-card border border-border rounded-md shadow-lg">
            <div className="py-1">
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  {item.separator ? (
                    <div className="h-px bg-border my-1" />
                  ) : (
                    <button
                      onClick={() => {
                        item.onClick?.()
                        setIsOpen(false)
                      }}
                      disabled={item.disabled}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted focus:outline-none focus:bg-muted",
                        item.disabled && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
})
DropdownMenu.displayName = "DropdownMenu"

export { DropdownMenu }

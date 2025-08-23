import * as React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

interface AccordionItem {
  label: string
  path?: string
  icon?: React.ReactNode
  items?: AccordionItem[]
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
  onItemClick?: (path: string) => void
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ items, className, onItemClick }, ref) => {
    const [openItems, setOpenItems] = React.useState<Set<string>>(new Set())

    const toggleItem = (label: string) => {
      const newOpenItems = new Set(openItems)
      if (newOpenItems.has(label)) {
        newOpenItems.delete(label)
      } else {
        newOpenItems.add(label)
      }
      setOpenItems(newOpenItems)
    }

    const renderItem = (item: AccordionItem, level: number = 0) => {
      const isOpen = openItems.has(item.label)
      const hasChildren = item.items && item.items.length > 0

      return (
        <div key={item.label} className="space-y-1">
          <button
            onClick={() => {
              if (hasChildren) {
                toggleItem(item.label)
              } else if (item.path && onItemClick) {
                onItemClick(item.path)
              }
            }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors",
              level > 0 && "ml-4",
              !hasChildren && "hover:text-primary"
            )}
          >
            {item.icon}
            <span className="flex-1 text-left">{item.label}</span>
            {hasChildren && (
              isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            )}
          </button>
          
          {hasChildren && isOpen && (
            <div className="ml-4 space-y-1">
              {item.items!.map((child) => renderItem(child, level + 1))}
            </div>
          )}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn("space-y-1", className)}>
        {items.map((item) => renderItem(item))}
      </div>
    )
  }
)
Accordion.displayName = "Accordion"

export { Accordion }

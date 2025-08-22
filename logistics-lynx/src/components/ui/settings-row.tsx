import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "@/lib/utils"

// 🎨 SETTINGS ROW WITH GUARANTEED CONTRAST
const settingsRowStyles = tv({
  slots: {
    wrapper: [
      "flex items-center justify-between gap-4 p-4 rounded-xl",
      "bg-[hsl(var(--color-muted))] dark:bg-[hsl(var(--color-muted))]",
      "border border-[hsl(var(--color-border))]",
      "transition-all duration-200 ease-in-out",
      "hover:shadow-sm hover:border-[hsl(var(--color-border-hover))]",
    ],
    content: "flex-1 min-w-0",
    title: [
      "text-base font-medium",
      "text-[hsl(var(--color-text))]",
    ],
    description: [
      "text-sm mt-1",
      "text-[hsl(var(--color-text-muted))]",
    ],
    control: "flex-shrink-0",
  },
  variants: {
    variant: {
      default: "",
      success: {
        wrapper: "border-l-4 border-l-[hsl(var(--color-success))]",
      },
      warning: {
        wrapper: "border-l-4 border-l-[hsl(var(--color-warning))]",
      },
      danger: {
        wrapper: "border-l-4 border-l-[hsl(var(--color-danger))]",
      },
      info: {
        wrapper: "border-l-4 border-l-[hsl(var(--color-info))]",
      },
      primary: {
        wrapper: "border-l-4 border-l-[hsl(var(--color-primary))]",
      },
    },
    size: {
      sm: {
        wrapper: "p-3",
        title: "text-sm",
        description: "text-xs",
      },
      default: {
        wrapper: "p-4",
        title: "text-base",
        description: "text-sm",
      },
      lg: {
        wrapper: "p-6",
        title: "text-lg",
        description: "text-base",
      },
    },
    interactive: {
      false: "",
      true: {
        wrapper: "cursor-pointer hover:bg-[hsl(var(--color-muted-hover))]",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    interactive: "false",
  },
})

export interface SettingsRowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof settingsRowStyles> {
  title: string
  description?: string
  children?: React.ReactNode
  onClick?: () => void
}

const SettingsRow = React.forwardRef<HTMLDivElement, SettingsRowProps>(
  ({ 
    className, 
    variant, 
    size, 
    interactive, 
    title, 
    description, 
    children, 
    onClick,
    ...props 
  }, ref) => {
    const { wrapper, content, title: titleClass, description: descClass, control } = settingsRowStyles({ 
      variant, 
      size, 
      interactive: interactive || !!onClick 
    })
    
    const Comp = onClick ? "button" : "div"
    
    return (
      <Comp
        ref={ref}
        className={cn(wrapper(), className)}
        onClick={onClick}
        type={onClick ? "button" : undefined}
        {...props}
      >
        <div className={content()}>
          <div className={titleClass()}>{title}</div>
          {description && <div className={descClass()}>{description}</div>}
        </div>
        {children && <div className={control()}>{children}</div>}
      </Comp>
    )
  }
)
SettingsRow.displayName = "SettingsRow"

// 🎨 SETTINGS SECTION COMPONENT
const settingsSectionStyles = tv({
  slots: {
    wrapper: [
      "space-y-4",
      "p-6 rounded-xl",
      "bg-[hsl(var(--color-surface))]",
      "border border-[hsl(var(--color-border))]",
      "shadow-sm",
    ],
    header: "mb-6",
    title: [
      "text-lg font-semibold",
      "text-[hsl(var(--color-text))]",
    ],
    subtitle: [
      "text-sm mt-1",
      "text-[hsl(var(--color-text-muted))]",
    ],
    content: "space-y-4",
  },
  variants: {
    variant: {
      default: "",
      card: {
        wrapper: "bg-white dark:bg-slate-900 shadow-md",
      },
      muted: {
        wrapper: "bg-[hsl(var(--color-muted))] dark:bg-slate-800",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface SettingsSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof settingsSectionStyles> {
  title?: string
  subtitle?: string
  children?: React.ReactNode
}

const SettingsSection = React.forwardRef<HTMLDivElement, SettingsSectionProps>(
  ({ 
    className, 
    variant, 
    title, 
    subtitle, 
    children, 
    ...props 
  }, ref) => {
    const { wrapper, header, title: titleClass, subtitle: subtitleClass, content } = settingsSectionStyles({ variant })
    
    return (
      <div ref={ref} className={cn(wrapper(), className)} {...props}>
        {(title || subtitle) && (
          <div className={header()}>
            {title && <div className={titleClass()}>{title}</div>}
            {subtitle && <div className={subtitleClass()}>{subtitle}</div>}
          </div>
        )}
        <div className={content()}>{children}</div>
      </div>
    )
  }
)
SettingsSection.displayName = "SettingsSection"

export { SettingsRow, SettingsSection, settingsRowStyles, settingsSectionStyles }

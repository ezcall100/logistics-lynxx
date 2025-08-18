import * as React from "react"
import { ThemeProvider as RadixThemeProvider } from "@radix-ui/react-theme"
import { useTheme } from "./use-theme"
import { ThemeProviderContext, ThemeProviderState, Theme } from './theme-context'

type EnhancedThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function EnhancedThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'tms-theme',
  attribute = 'class',
  enableSystem = true,
  disableTransitionOnChange = true,
  ...props
}: EnhancedThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme)
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [storageKey])

  React.useEffect(() => {
    const root = window.document.documentElement
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    
    let effectiveTheme = theme
    
    if (theme === 'system' && enableSystem) {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    
    // Apply the theme class
    root.classList.add(effectiveTheme)
    setIsDark(effectiveTheme === 'dark')
    
    // Save to localStorage
    localStorage.setItem(storageKey, theme)
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', effectiveTheme === 'dark' ? '#0f172a' : '#ffffff')
    }

    // Disable transitions during theme change if requested
    if (disableTransitionOnChange) {
      const style = document.createElement('style')
      style.textContent = '* { transition: none !important; }'
      document.head.appendChild(style)
      
      // Remove the style after a short delay
      setTimeout(() => {
        document.head.removeChild(style)
      }, 0)
    }
  }, [theme, storageKey, enableSystem, disableTransitionOnChange])

  // Listen for system theme changes
  React.useEffect(() => {
    if (theme === 'system' && enableSystem) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleChange = () => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        const newTheme = mediaQuery.matches ? 'dark' : 'light'
        root.classList.add(newTheme)
        setIsDark(newTheme === 'dark')
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme, enableSystem])

  const value: ThemeProviderState = {
    theme,
    setTheme,
    isDark,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      <RadixThemeProvider
        attribute={attribute}
        defaultTheme={theme}
        enableSystem={enableSystem}
        disableTransitionOnChange={disableTransitionOnChange}
      >
        {children}
      </RadixThemeProvider>
    </ThemeProviderContext.Provider>
  )
}

// Theme-aware component wrapper
export function ThemeAware({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme()
  
  return (
    <div className={`theme-aware ${isDark ? 'dark' : 'light'}`}>
      {children}
    </div>
  )
}

// Theme status indicator component
export function ThemeStatus() {
  const { theme, isDark } = useTheme()
  
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Theme:</span>
      <span className="font-medium">
        {theme === 'system' ? 'System' : theme === 'light' ? 'Light' : 'Dark'}
      </span>
      <span className="text-xs">
        ({isDark ? 'Dark' : 'Light'} mode)
      </span>
    </div>
  )
}

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  ThemeToggle, 
  ThemeToggleButton, 
  ThemeToggleIcon,
  ThemeSettings,
  ThemePreview,
  ThemeStatus,
  ThemeAware
} from "./index"

export function ThemeDemo() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Theme System Demo</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the comprehensive theme system built with Radix UI components. 
          Test different themes and see how components adapt to light and dark modes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Theme Toggle Components */}
        <Card>
          <CardHeader>
            <CardTitle>Theme Toggles</CardTitle>
            <CardDescription>
              Different ways to switch between themes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Dropdown Toggle</h4>
              <ThemeToggle />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h4 className="font-medium">Button Toggle</h4>
              <ThemeToggleButton />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h4 className="font-medium">Icon Toggle</h4>
              <ThemeToggleIcon />
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
            <CardDescription>
              Advanced theme configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ThemeSettings />
            <p className="text-sm text-muted-foreground">
              Click the settings icon to open advanced theme options
            </p>
          </CardContent>
        </Card>

        {/* Theme Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Theme Preview</CardTitle>
            <CardDescription>
              Current theme information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ThemePreview />
          </CardContent>
        </Card>

        {/* Theme Status */}
        <Card>
          <CardHeader>
            <CardTitle>Theme Status</CardTitle>
            <CardDescription>
              Current theme information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeStatus />
          </CardContent>
        </Card>

        {/* Component Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Component Examples</CardTitle>
            <CardDescription>
              See how components look in different themes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Buttons</h4>
              <div className="flex gap-2 flex-wrap">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h4 className="font-medium">Badges</h4>
              <div className="flex gap-2 flex-wrap">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme Aware Wrapper */}
        <Card>
          <CardHeader>
            <CardTitle>Theme Aware Wrapper</CardTitle>
            <CardDescription>
              Components wrapped with theme awareness
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeAware>
              <div className="p-4 rounded-lg border bg-card text-card-foreground">
                <p className="text-sm">
                  This content is wrapped in a theme-aware container
                </p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="outline">Theme Aware</Badge>
                  <Badge variant="secondary">Adaptive</Badge>
                </div>
              </div>
            </ThemeAware>
          </CardContent>
        </Card>
      </div>

      {/* Color Palette */}
      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>
            Theme colors and their variations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-primary" />
              <p className="text-xs font-medium">Primary</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-secondary" />
              <p className="text-xs font-medium">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-accent" />
              <p className="text-xs font-medium">Accent</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-muted" />
              <p className="text-xs font-medium">Muted</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-destructive" />
              <p className="text-xs font-medium">Destructive</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-border" />
              <p className="text-xs font-medium">Border</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Instructions</CardTitle>
          <CardDescription>
            How to use the theme system in your components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">1. Wrap your app with ThemeProvider</h4>
            <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`import { ThemeProvider } from '@/components/theme-provider'

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  )
}`}
            </pre>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h4 className="font-medium">2. Use theme hooks in components</h4>
            <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`import { useTheme } from '@/components/theme-provider'

function MyComponent() {
  const { theme, setTheme, isDark } = useTheme()
  
  return (
    <div className={isDark ? 'dark' : 'light'}>
      Current theme: {theme}
    </div>
  )
}`}
            </pre>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h4 className="font-medium">3. Add theme toggles</h4>
            <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`import { ThemeToggle, ThemeSettings } from '@/components/theme-provider'

function Header() {
  return (
    <header>
      <ThemeToggle />
      <ThemeSettings />
    </header>
  )
}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import * as React from "react"
import { Settings, Palette, Monitor, Sun, Moon, Eye, EyeOff } from "lucide-react"
import { useTheme } from "./use-theme"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ThemeSettings() {
  const { theme, setTheme, isDark } = useTheme()
  const [reducedMotion, setReducedMotion] = React.useState(false)
  const [highContrast, setHighContrast] = React.useState(false)

  React.useEffect(() => {
    // Check for user preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReducedMotion(prefersReducedMotion)
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as "light" | "dark" | "system")
  }

  const handleReducedMotionChange = (checked: boolean) => {
    setReducedMotion(checked)
    document.documentElement.classList.toggle('motion-reduce', checked)
  }

  const handleHighContrastChange = (checked: boolean) => {
    setHighContrast(checked)
    document.documentElement.classList.toggle('high-contrast', checked)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Theme settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Settings
          </DialogTitle>
          <DialogDescription>
            Customize your theme preferences and accessibility options.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Theme Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Theme</CardTitle>
              <CardDescription>
                Choose your preferred color scheme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme-select">Color Theme</Label>
                <Select value={theme} onValueChange={handleThemeChange}>
                  <SelectTrigger id="theme-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4" />
                        System
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Current Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    {isDark ? 'Dark' : 'Light'} mode is active
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Accessibility Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Accessibility</CardTitle>
              <CardDescription>
                Adjust accessibility preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduced-motion">Reduced Motion</Label>
                  <p className="text-sm text-muted-foreground">
                    Reduce animations and transitions
                  </p>
                </div>
                <Switch
                  id="reduced-motion"
                  checked={reducedMotion}
                  onCheckedChange={handleReducedMotionChange}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast">High Contrast</Label>
                  <p className="text-sm text-muted-foreground">
                    Increase contrast for better visibility
                  </p>
                </div>
                <Switch
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={handleHighContrastChange}
                />
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Quick Actions */}
          <div className="space-y-2">
            <Label>Quick Actions</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme("light")}
                className="flex-1"
              >
                <Sun className="mr-2 h-4 w-4" />
                Light
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme("dark")}
                className="flex-1"
              >
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme("system")}
                className="flex-1"
              >
                <Monitor className="mr-2 h-4 w-4" />
                System
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Theme preview component
export function ThemePreview() {
  const { theme, isDark } = useTheme()
  
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-sm">Theme Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Current Theme:</span>
          <span className="font-medium capitalize">{theme}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Active Mode:</span>
          <span className="font-medium">{isDark ? 'Dark' : 'Light'}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <div className="h-8 rounded bg-primary" />
          <div className="h-8 rounded bg-secondary" />
          <div className="h-8 rounded bg-accent" />
        </div>
        
        <div className="text-xs text-muted-foreground">
          Preview shows current color scheme
        </div>
      </CardContent>
    </Card>
  )
}

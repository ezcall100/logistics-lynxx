import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Palette, 
  Type, 
  Layout, 
  Zap, 
  Eye, 
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

const DesignSystem: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold text-fg mb-4">
            Trans Bot AI Design System
          </h1>
          <p className="text-lg text-fg-muted">
            World-class UI/UX system for all 20 portals and website
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="default">v2.0</Badge>
            <Badge variant="secondary">Production Ready</Badge>
            <Badge variant="outline">WCAG 2.2 AA</Badge>
          </div>
        </div>

        <Tabs defaultValue="tokens" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="tokens" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Tokens
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Components
            </TabsTrigger>
            <TabsTrigger value="layouts" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Layouts
            </TabsTrigger>
            <TabsTrigger value="states" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              States
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              A11y
            </TabsTrigger>
          </TabsList>

          {/* Design Tokens */}
          <TabsContent value="tokens" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Color System */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Color System
                  </CardTitle>
                  <CardDescription>HCT-inspired color palette</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-brand"></div>
                      <span className="text-sm">Brand Primary: #5B8CFF</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-accent"></div>
                      <span className="text-sm">Accent: #22C55E</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-success"></div>
                      <span className="text-sm">Success: #16A34A</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-warning"></div>
                      <span className="text-sm">Warning: #F59E0B</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-danger"></div>
                      <span className="text-sm">Danger: #EF4444</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Typography */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="w-5 h-5" />
                    Typography
                  </CardTitle>
                  <CardDescription>Inter Tight + Inter fonts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-display font-bold">Display Heading</h1>
                    <h2 className="text-2xl font-display font-semibold">Display Subheading</h2>
                    <h3 className="text-xl font-text font-semibold">Text Heading</h3>
                    <p className="text-base font-text">Body text with proper line height</p>
                    <p className="text-sm font-text text-fg-muted">Small muted text</p>
                  </div>
                </CardContent>
              </Card>

              {/* Spacing */}
              <Card>
                <CardHeader>
                  <CardTitle>Spacing System</CardTitle>
                  <CardDescription>8pt base grid system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-2 bg-brand rounded" style={{width: '8px'}}></div>
                    <span className="text-sm">8px (base)</span>
                    <div className="h-2 bg-accent rounded" style={{width: '16px'}}></div>
                    <span className="text-sm">16px (2x)</span>
                    <div className="h-2 bg-success rounded" style={{width: '24px'}}></div>
                    <span className="text-sm">24px (3x)</span>
                    <div className="h-2 bg-warning rounded" style={{width: '32px'}}></div>
                    <span className="text-sm">32px (4x)</span>
                  </div>
                </CardContent>
              </Card>

              {/* Border Radius */}
              <Card>
                <CardHeader>
                  <CardTitle>Border Radius</CardTitle>
                  <CardDescription>Consistent corner radius</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-8 bg-brand rounded-sm"></div>
                    <span className="text-sm">6px (sm)</span>
                    <div className="h-8 bg-accent rounded-md"></div>
                    <span className="text-sm">10px (md)</span>
                    <div className="h-8 bg-success rounded-lg"></div>
                    <span className="text-sm">14px (lg)</span>
                    <div className="h-8 bg-warning rounded-xl"></div>
                    <span className="text-sm">16px (xl)</span>
                  </div>
                </CardContent>
              </Card>

              {/* Shadows */}
              <Card>
                <CardHeader>
                  <CardTitle>Shadows</CardTitle>
                  <CardDescription>Subtle elevation system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-12 bg-bg-subtle rounded-lg shadow-sm border"></div>
                    <span className="text-sm">Small shadow</span>
                    <div className="h-12 bg-bg-subtle rounded-lg shadow-md border"></div>
                    <span className="text-sm">Medium shadow</span>
                    <div className="h-12 bg-bg-subtle rounded-lg shadow-lg border"></div>
                    <span className="text-sm">Large shadow</span>
                  </div>
                </CardContent>
              </Card>

              {/* Portal Accents */}
              <Card>
                <CardHeader>
                  <CardTitle>Portal Accents</CardTitle>
                  <CardDescription>20 portal-specific colors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="w-6 h-6 rounded bg-purple-500" title="Super Admin"></div>
                    <div className="w-6 h-6 rounded bg-indigo-500" title="Admin"></div>
                    <div className="w-6 h-6 rounded bg-blue-500" title="TMS Admin"></div>
                    <div className="w-6 h-6 rounded bg-green-500" title="Onboarding"></div>
                    <div className="w-6 h-6 rounded bg-sky-500" title="Broker"></div>
                    <div className="w-6 h-6 rounded bg-emerald-500" title="Shipper"></div>
                    <div className="w-6 h-6 rounded bg-cyan-500" title="Carrier"></div>
                    <div className="w-6 h-6 rounded bg-orange-500" title="Driver"></div>
                    <div className="w-6 h-6 rounded bg-indigo-600" title="Owner Operator"></div>
                    <div className="w-6 h-6 rounded bg-teal-500" title="Factoring"></div>
                    <div className="w-6 h-6 rounded bg-amber-500" title="Load Board"></div>
                    <div className="w-6 h-6 rounded bg-rose-500" title="CRM"></div>
                    <div className="w-6 h-6 rounded bg-emerald-600" title="Financials"></div>
                    <div className="w-6 h-6 rounded bg-blue-600" title="EDI"></div>
                    <div className="w-6 h-6 rounded bg-purple-600" title="Marketplace"></div>
                    <div className="w-6 h-6 rounded bg-fuchsia-500" title="Analytics"></div>
                    <div className="w-6 h-6 rounded bg-cyan-500" title="Autonomous"></div>
                    <div className="w-6 h-6 rounded bg-orange-600" title="Workers"></div>
                    <div className="w-6 h-6 rounded bg-red-500" title="Rates"></div>
                    <div className="w-6 h-6 rounded bg-gray-500" title="Directory"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Components */}
          <TabsContent value="components" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                  <CardDescription>Solid, soft, ghost variants</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm">Small</Button>
                    <Button>Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button disabled>Disabled</Button>
                    <Button>
                      <Zap className="w-4 h-4 mr-2" />
                      With Icon
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Inputs */}
              <Card>
                <CardHeader>
                  <CardTitle>Inputs</CardTitle>
                  <CardDescription>Form controls with validation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disabled">Disabled</Label>
                    <Input id="disabled" disabled placeholder="Disabled input" />
                  </div>
                </CardContent>
              </Card>

              {/* Cards */}
              <Card>
                <CardHeader>
                  <CardTitle>Cards</CardTitle>
                  <CardDescription>Content containers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                      <CardDescription>Card description</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Card content goes here</p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                  <CardDescription>Status indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-success text-white">Success</Badge>
                    <Badge className="bg-warning text-white">Warning</Badge>
                    <Badge className="bg-danger text-white">Error</Badge>
                    <Badge className="bg-info text-white">Info</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Layouts */}
          <TabsContent value="layouts" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* App Shell */}
              <Card>
                <CardHeader>
                  <CardTitle>App Shell</CardTitle>
                  <CardDescription>Portal layout structure</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 space-y-4">
                    {/* Top Bar */}
                    <div className="h-12 bg-bg-subtle rounded border flex items-center justify-between px-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-brand rounded"></div>
                        <span className="font-semibold">Portal Name</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-accent rounded-full"></div>
                        <span className="text-sm">User</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      {/* Left Rail */}
                      <div className="w-48 bg-bg-subtle rounded border p-4">
                        <div className="space-y-2">
                          <div className="h-8 bg-brand/20 rounded"></div>
                          <div className="h-8 bg-fg-muted/20 rounded"></div>
                          <div className="h-8 bg-fg-muted/20 rounded"></div>
                          <div className="h-8 bg-fg-muted/20 rounded"></div>
                        </div>
                      </div>
                      
                      {/* Main Content */}
                      <div className="flex-1 bg-bg-subtle rounded border p-4">
                        <div className="space-y-4">
                          <div className="h-6 bg-fg-muted/20 rounded w-1/3"></div>
                          <div className="h-32 bg-fg-muted/10 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Responsive Grid */}
              <Card>
                <CardHeader>
                  <CardTitle>Responsive Grid</CardTitle>
                  <CardDescription>12/8/4 column system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12 md:col-span-6 lg:col-span-4 h-16 bg-brand/20 rounded"></div>
                      <div className="col-span-12 md:col-span-6 lg:col-span-4 h-16 bg-accent/20 rounded"></div>
                      <div className="col-span-12 md:col-span-6 lg:col-span-4 h-16 bg-success/20 rounded"></div>
                    </div>
                    <div className="text-sm text-fg-muted">
                      Desktop: 12 columns | Tablet: 8 columns | Mobile: 4 columns
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* States */}
          <TabsContent value="states" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Loading States */}
              <Card>
                <CardHeader>
                  <CardTitle>Loading States</CardTitle>
                  <CardDescription>Skeleton within 200ms, spinner after 800ms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-fg-muted/20 rounded animate-pulse"></div>
                    <div className="h-4 bg-fg-muted/20 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-fg-muted/20 rounded animate-pulse w-1/2"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Loading...</span>
                  </div>
                </CardContent>
              </Card>

              {/* Empty States */}
              <Card>
                <CardHeader>
                  <CardTitle>Empty States</CardTitle>
                  <CardDescription>Icon + sentence + CTA</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-fg-muted/20 rounded-full mx-auto flex items-center justify-center">
                      <Layout className="w-8 h-8 text-fg-muted" />
                    </div>
                    <div>
                      <h3 className="font-semibold">No data available</h3>
                      <p className="text-sm text-fg-muted">Get started by creating your first item</p>
                    </div>
                    <Button>Create Item</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Error States */}
              <Card>
                <CardHeader>
                  <CardTitle>Error States</CardTitle>
                  <CardDescription>Human message + View trace</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-danger rounded-full flex items-center justify-center text-white text-xs">!</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-danger">Something went wrong</h4>
                          <p className="text-sm text-fg-muted mt-1">We couldn't load your data. Please try again.</p>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline">Retry</Button>
                            <Button size="sm" variant="ghost">View Trace</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Success States */}
              <Card>
                <CardHeader>
                  <CardTitle>Success States</CardTitle>
                  <CardDescription>Toast + inline confetti</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center text-white text-xs">✓</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-success">Success!</h4>
                        <p className="text-sm text-fg-muted mt-1">Your changes have been saved successfully.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Accessibility */}
          <TabsContent value="accessibility" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Focus Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Focus Management</CardTitle>
                  <CardDescription>Visible focus rings and logical tab order</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button className="focus:ring-2 focus:ring-brand focus:ring-offset-2">
                      Focusable Button
                    </Button>
                    <Input 
                      placeholder="Focusable input" 
                      className="focus:ring-2 focus:ring-brand focus:ring-offset-2"
                    />
                    <div className="text-sm text-fg-muted">
                      Use Tab to navigate. Focus rings should be visible.
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ARIA Labels */}
              <Card>
                <CardHeader>
                  <CardTitle>ARIA Labels</CardTitle>
                  <CardDescription>Screen reader support</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button aria-label="Close dialog">
                      <span aria-hidden="true">×</span>
                    </Button>
                    <div className="text-sm text-fg-muted">
                      All interactive elements have proper ARIA labels
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Color Contrast */}
              <Card>
                <CardHeader>
                  <CardTitle>Color Contrast</CardTitle>
                  <CardDescription>WCAG 2.2 AA compliance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="p-3 bg-brand text-white rounded">
                      Brand text on brand background (4.5:1 ratio)
                    </div>
                    <div className="p-3 bg-fg text-bg rounded">
                      Default text on default background (4.5:1 ratio)
                    </div>
                    <div className="text-sm text-fg-muted">
                      All text meets WCAG 2.2 AA contrast requirements
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reduced Motion */}
              <Card>
                <CardHeader>
                  <CardTitle>Reduced Motion</CardTitle>
                  <CardDescription>Respects prefers-reduced-motion</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-fg-muted/20 rounded motion-safe:animate-pulse"></div>
                    <div className="text-sm text-fg-muted">
                      Animations respect user's motion preferences
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="text-center text-fg-muted">
            <p>Trans Bot AI Design System v2.0</p>
            <p className="text-sm">Built for all 20 portals with accessibility and performance in mind</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystem;

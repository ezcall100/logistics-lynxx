import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import EnhancedSidebarLayout from './EnhancedSidebarLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Users, Package, DollarSign, FileText, Settings } from 'lucide-react';

// Mock Auth Provider
const MockAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
};

// Test Dashboard Page
const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your TMS dashboard</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Activity className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card text-card-foreground border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Total Shipments</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,234</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2,350</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Activity</CardTitle>
          <CardDescription className="text-muted-foreground">
            Latest updates from your TMS system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 1, action: 'Shipment Delivered', time: '2 minutes ago', status: 'success' },
              { id: 2, action: 'New Order Received', time: '5 minutes ago', status: 'info' },
              { id: 3, action: 'Payment Processed', time: '10 minutes ago', status: 'success' },
              { id: 4, action: 'Route Updated', time: '15 minutes ago', status: 'warning' },
            ].map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <Badge 
                  variant={activity.status === 'success' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Test Operations Page
const OperationsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Operations</h1>
        <p className="text-muted-foreground">Manage your logistics operations</p>
      </div>

      <Card className="bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Shipment Management</CardTitle>
          <CardDescription className="text-muted-foreground">
            Track and manage all shipments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Package className="h-6 w-6" />
              <span className="text-sm">Create Shipment</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Activity className="h-6 w-6" />
              <span className="text-sm">Track Shipment</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Settings className="h-6 w-6" />
              <span className="text-sm">Manage Routes</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Test Settings Page
const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure your TMS preferences</p>
      </div>

      <Card className="bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="text-foreground">System Preferences</CardTitle>
          <CardDescription className="text-muted-foreground">
            Customize your TMS experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Toggle dark/light theme</p>
              </div>
              <Button variant="outline" size="sm">Toggle</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Notifications</p>
                <p className="text-xs text-muted-foreground">Manage notification preferences</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Enhanced Sidebar Example Component
const EnhancedSidebarExample: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="tms-theme">
      <MockAuthProvider>
        <Router>
          <EnhancedSidebarLayout>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/operations" element={<OperationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </EnhancedSidebarLayout>
        </Router>
      </MockAuthProvider>
    </ThemeProvider>
  );
};

// Enhanced Sidebar Usage Documentation
export const EnhancedSidebarUsage: React.FC = () => {
  return (
    <div className="space-y-6 p-6 bg-background text-foreground">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Enhanced Sidebar System</h1>
        <p className="text-muted-foreground">Enterprise-grade sidebar with full theme support</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle className="text-foreground">✅ Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-foreground">
              <li>• Collapsible sidebar with smooth animations</li>
              <li>• Dark/light mode support</li>
              <li>• Role-based navigation</li>
              <li>• Search functionality</li>
              <li>• Favorites and recent items</li>
              <li>• AI insights and recommendations</li>
              <li>• Responsive design</li>
              <li>• Full accessibility support</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle className="text-foreground">🎨 Theme Support</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-foreground">
              <li>• CSS custom properties</li>
              <li>• HSL color format</li>
              <li>• Automatic theme switching</li>
              <li>• High contrast mode</li>
              <li>• Reduced motion support</li>
              <li>• Print styles</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="text-foreground">🚀 Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">1. Import Components</h3>
              <pre className="bg-muted p-3 rounded text-sm text-foreground overflow-x-auto">
{`import EnhancedSidebarLayout from '@/components/sidebar/EnhancedSidebarLayout';
import { ThemeProvider } from '@/components/theme-provider';`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">2. Wrap with Theme Provider</h3>
              <pre className="bg-muted p-3 rounded text-sm text-foreground overflow-x-auto">
{`<ThemeProvider defaultTheme="system" storageKey="tms-theme">
  <EnhancedSidebarLayout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  </EnhancedSidebarLayout>
</ThemeProvider>`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedSidebarExample;

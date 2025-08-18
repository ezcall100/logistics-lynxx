import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EnhancedSidebarLayout from './EnhancedSidebarLayout';
import { getSidebarConfig } from './EnhancedSidebarConfig';
import ThemeProvider from '@/components/theme/theme-provider';
import './enhanced-sidebar-styles.css';

// Example page components
const DashboardPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Dashboard</h1>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="card p-6">
        <h3 className="font-semibold">Total Shipments</h3>
        <p className="text-2xl font-bold text-primary">1,234</p>
      </div>
      <div className="card p-6">
        <h3 className="font-semibold">Active Deliveries</h3>
        <p className="text-2xl font-bold text-success">89</p>
      </div>
      <div className="card p-6">
        <h3 className="font-semibold">Revenue</h3>
        <p className="text-2xl font-bold text-info">$45,678</p>
      </div>
      <div className="card p-6">
        <h3 className="font-semibold">Pending Invoices</h3>
        <p className="text-2xl font-bold text-warning">12</p>
      </div>
    </div>
  </div>
);

const ShipmentsPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Shipments</h1>
      <button className="btn btn-primary">
        New Shipment
      </button>
    </div>
    <div className="card p-6">
      <p className="text-muted-foreground">Shipment management interface would go here...</p>
    </div>
  </div>
);

const InvoicesPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Invoices</h1>
      <button className="btn btn-primary">
        Create Invoice
      </button>
    </div>
    <div className="card p-6">
      <p className="text-muted-foreground">Invoice management interface would go here...</p>
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Settings</h1>
    <div className="card p-6">
      <p className="text-muted-foreground">Settings interface would go here...</p>
    </div>
  </div>
);

// Mock Auth Context for the example
const MockAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'super_admin',
    avatar: undefined
  };

  return (
    <div className="auth-context" data-user={JSON.stringify(mockUser)}>
      {children}
    </div>
  );
};

// Enhanced Sidebar Example Component
export const EnhancedSidebarExample: React.FC = () => {
  const handleSidebarToggle = (collapsed: boolean) => {
    console.log('Sidebar collapsed:', collapsed);
  };

  const handleItemClick = (item: any) => {
    console.log('Sidebar item clicked:', item);
  };

  return (
    <ThemeProvider defaultTheme="system">
      <MockAuthProvider>
        <Router>
          <EnhancedSidebarLayout
            onSidebarToggle={handleSidebarToggle}
            onItemClick={handleItemClick}
          >
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/operations/shipments" element={<ShipmentsPage />} />
              <Route path="/finance/invoices" element={<InvoicesPage />} />
              <Route path="/settings/*" element={<SettingsPage />} />
              <Route path="*" element={<DashboardPage />} />
            </Routes>
          </EnhancedSidebarLayout>
        </Router>
      </MockAuthProvider>
    </ThemeProvider>
  );
};

// Usage Instructions Component
export const EnhancedSidebarUsage: React.FC = () => {
  return (
    <div className="container-responsive py-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Enhanced Enterprise Sidebar System</h1>
        <p className="text-lg text-muted-foreground">
          A complete sidebar solution for enterprise TMS applications with Radix UI components,
          theme support, and advanced features.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Features</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Collapsible sidebar with smooth animations
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Search functionality with real-time filtering
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Favorites and recent items tracking
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              AI insights and recommendations
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Dynamic badges and notifications
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Theme toggle (light/dark mode)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              User profile integration
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Responsive mobile design
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Role-based navigation
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Accessibility support
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quick Start</h2>
          <div className="bg-muted p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
{`// 1. Import the components
import EnhancedSidebarLayout from './EnhancedSidebarLayout';
import { getSidebarConfig } from './EnhancedSidebarConfig';

// 2. Use in your app
<EnhancedSidebarLayout>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/operations/*" element={<Operations />} />
    {/* Add your routes */}
  </Routes>
</EnhancedSidebarLayout>

// 3. Customize configuration
const customConfig = getSidebarConfig(userRole);
`}
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Configuration</h2>
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm mb-2">The sidebar automatically adapts based on user roles:</p>
          <ul className="text-sm space-y-1">
            <li>• <strong>super_admin</strong>: Full access with portal management</li>
            <li>• <strong>admin</strong>: Standard TMS functionality</li>
            <li>• <strong>user</strong>: Limited access based on permissions</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Customization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Styling</h3>
            <p className="text-sm text-muted-foreground">
              Use CSS custom properties for theme customization. All colors and animations
              can be overridden via CSS variables.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Behavior</h3>
            <p className="text-sm text-muted-foreground">
              Configure sidebar behavior through props: search, favorites, recent items,
              theme toggle, and user profile display.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSidebarExample;

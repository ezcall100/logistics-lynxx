import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { PageHeader } from './components/layout/PageHeader';
import { Button } from './components/ui/Button';
import { EmptyState } from './components/ui/EmptyState';
import { Plus, Users, Truck, Package, DollarSign, Settings } from 'lucide-react';
import './styles/globals.css';

// Demo components for showcasing the design system
const DashboardDemo = () => (
  <div className="p-6 space-6">
    <PageHeader
      title="MCP-v2 Dashboard"
      subtitle="Welcome to the redesigned portal ecosystem"
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Overview' }
      ]}
      actions={
        <Button leftIcon={<Plus className="h-4 w-4" />}>
          New Item
        </Button>
      }
    />
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="card">
        <div className="card-content">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Total Users</p>
              <p className="text-2xl font-bold text-text-primary">1,234</p>
            </div>
            <Users className="h-8 w-8 text-brand-primary-500" />
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-content">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Active Loads</p>
              <p className="text-2xl font-bold text-text-primary">567</p>
            </div>
            <Truck className="h-8 w-8 text-brand-accent-500" />
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-content">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Revenue</p>
              <p className="text-2xl font-bold text-text-primary">$89,432</p>
            </div>
            <DollarSign className="h-8 w-8 text-state-success-border" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const EmptyStateDemo = () => (
  <div className="p-6">
    <PageHeader
      title="Empty States"
      subtitle="Demonstrating consistent empty state patterns"
    />
    
    <div className="space-8">
      <EmptyState
        icon={<Package className="h-12 w-12" />}
        title="No items found"
        description="Get started by creating your first item. This will help you organize your workflow more efficiently."
        action={{
          label: "Create Item",
          onClick: () => console.log("Create item clicked"),
          variant: "default"
        }}
        secondaryAction={{
          label: "Learn More",
          onClick: () => console.log("Learn more clicked"),
          variant: "outline"
        }}
      />
      
      <EmptyState
        icon={<Settings className="h-8 w-8" />}
        title="Configuration Required"
        description="Please configure your settings to continue."
        action={{
          label: "Configure Now",
          onClick: () => console.log("Configure clicked"),
          variant: "success"
        }}
        size="sm"
      />
    </div>
  </div>
);

const ButtonDemo = () => (
  <div className="p-6 space-6">
    <PageHeader
      title="Button Components"
      subtitle="All button variants and states"
    />
    
    <div className="space-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="neutral">Neutral</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Button States</h3>
        <div className="flex flex-wrap gap-4">
          <Button>Normal</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button leftIcon={<Plus className="h-4 w-4" />}>With Icon</Button>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<DashboardDemo />} />
          <Route path="/buttons" element={<ButtonDemo />} />
          <Route path="/empty-states" element={<EmptyStateDemo />} />
        </Routes>
      </AppShell>
    </Router>
  );
}

export default App;
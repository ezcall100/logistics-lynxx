import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// Enhanced Components
import { EnhancedDataTable } from '@/components/ui/enhanced-data-table';
import { EnhancedStatCard, MetricCard, PerformanceCard } from '@/components/ui/enhanced-stat-card';
import { EnhancedSearch, SearchWithFilters, CommandSearch } from '@/components/ui/enhanced-search';
import { EnhancedForm, UserForm, SettingsForm } from '@/components/ui/enhanced-form';

// Icons
import { 
  Users, Database, Activity, BarChart3, Server, 
  TrendingUp, TrendingDown, CheckCircle, AlertTriangle,
  Plus, Edit, Trash2, Download, RefreshCw, Settings
} from 'lucide-react';

const UIComponentsDemoPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Sample data for the enhanced table
  const tableData = [
    {
      id: '1',
      name: 'Get Users',
      method: 'GET',
      path: '/api/v1/users',
      status: 'active',
      responseTime: 45,
      requestsPerMinute: 120,
      errorRate: 0.2,
      lastUpdated: '2 minutes ago',
      description: 'Retrieve all users with pagination',
      version: 'v1.0'
    },
    {
      id: '2',
      name: 'Create User',
      method: 'POST',
      path: '/api/v1/users',
      status: 'active',
      responseTime: 78,
      requestsPerMinute: 15,
      errorRate: 1.5,
      lastUpdated: '5 minutes ago',
      description: 'Create a new user account',
      version: 'v1.0'
    },
    {
      id: '3',
      name: 'Update User',
      method: 'PUT',
      path: '/api/v1/users/{id}',
      status: 'active',
      responseTime: 62,
      requestsPerMinute: 25,
      errorRate: 0.8,
      lastUpdated: '1 minute ago',
      description: 'Update user information',
      version: 'v1.0'
    },
    {
      id: '4',
      name: 'Delete User',
      method: 'DELETE',
      path: '/api/v1/users/{id}',
      status: 'active',
      responseTime: 35,
      requestsPerMinute: 8,
      errorRate: 0.1,
      lastUpdated: '10 minutes ago',
      description: 'Delete user account',
      version: 'v1.0'
    }
  ];

  const tableColumns = [
    {
      key: 'name',
      label: 'Endpoint',
      sortable: true,
      filterable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-slate-500">{row.path}</div>
        </div>
      )
    },
    {
      key: 'method',
      label: 'Method',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <Badge 
          variant={value === 'GET' ? 'default' : value === 'POST' ? 'secondary' : 'outline'}
          className="font-mono"
        >
          {value}
        </Badge>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            value === 'active' ? 'bg-green-500' : 'bg-red-500'
          }`} />
          <span className="capitalize">{value}</span>
        </div>
      )
    },
    {
      key: 'responseTime',
      label: 'Response Time',
      sortable: true,
      render: (value: number) => (
        <span className="text-green-600 font-medium">{value}ms</span>
      )
    },
    {
      key: 'requestsPerMinute',
      label: 'Requests/min',
      sortable: true,
      render: (value: number) => (
        <span className="text-blue-600 font-medium">{value}</span>
      )
    },
    {
      key: 'errorRate',
      label: 'Error Rate',
      sortable: true,
      render: (value: number) => (
        <span className={`font-medium ${
          value > 1 ? 'text-red-600' : value > 0.5 ? 'text-yellow-600' : 'text-green-600'
        }`}>
          {value}%
        </span>
      )
    }
  ];

  // Sample search suggestions
  const searchSuggestions = [
    {
      id: '1',
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: <Users className="w-4 h-4" />
    },
    {
      id: '2',
      title: 'API Endpoints',
      description: 'View and manage API endpoints',
      icon: <Server className="w-4 h-4" />
    },
    {
      id: '3',
      title: 'System Analytics',
      description: 'View system performance metrics',
      icon: <BarChart3 className="w-4 h-4" />
    }
  ];

  const handleFormSubmit = async (data: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form submitted:', data);
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Enhanced UI Components Demo
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Showcase of all enhanced UI components with Radix UI and modern design patterns
        </p>
      </div>

      <Tabs defaultValue="cards" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cards">Stat Cards</TabsTrigger>
          <TabsTrigger value="table">Data Table</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
        </TabsList>

        {/* Stat Cards Demo */}
        <TabsContent value="cards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enhanced Stat Cards</CardTitle>
              <CardDescription>
                Beautiful stat cards with gradients, animations, and trend indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <EnhancedStatCard
                  title="Total Users"
                  value={1247}
                  description="Active user accounts"
                  icon={<Users className="w-6 h-6" />}
                  color="blue"
                  gradient={true}
                  trend={{ value: 12.5, isPositive: true, period: 'this month' }}
                  status="success"
                  clickable={true}
                  onClick={() => console.log('Clicked users card')}
                />

                <EnhancedStatCard
                  title="API Requests"
                  value={45678}
                  description="Requests per hour"
                  icon={<Server className="w-6 h-6" />}
                  color="green"
                  gradient={true}
                  trend={{ value: 8.2, isPositive: true, period: 'this week' }}
                  status="success"
                />

                <EnhancedStatCard
                  title="Error Rate"
                  value={0.52}
                  description="Average error rate"
                  icon={<AlertTriangle className="w-6 h-6" />}
                  color="red"
                  gradient={true}
                  trend={{ value: 15.3, isPositive: false, period: 'this week' }}
                  status="warning"
                  suffix="%"
                  formatValue={(val) => `${val}%`}
                />

                <EnhancedStatCard
                  title="System Load"
                  value={72}
                  description="CPU utilization"
                  icon={<Activity className="w-6 h-6" />}
                  color="purple"
                  gradient={true}
                  trend={{ value: 5.1, isPositive: false, period: 'this hour' }}
                  status="neutral"
                  suffix="%"
                />
              </div>

              <Separator className="my-8" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetricCard
                  metric="users"
                  title="Active Users"
                  value={892}
                  description="Currently online"
                  trend={{ value: 23.4, isPositive: true, period: 'today' }}
                />

                <MetricCard
                  metric="revenue"
                  title="Monthly Revenue"
                  value={45678}
                  description="Total revenue this month"
                  trend={{ value: 18.7, isPositive: true, period: 'this month' }}
                  prefix="$"
                />

                <PerformanceCard
                  title="System Performance"
                  percentage={87}
                  description="Overall system health"
                  trend={{ value: 3.2, isPositive: true, period: 'this week' }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Table Demo */}
        <TabsContent value="table" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enhanced Data Table</CardTitle>
              <CardDescription>
                Advanced data table with sorting, filtering, pagination, and row actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EnhancedDataTable
                data={tableData}
                columns={tableColumns}
                title="API Endpoints"
                description="Monitor and manage your API endpoints"
                searchable={true}
                filterable={true}
                selectable={true}
                pagination={true}
                itemsPerPage={5}
                onRowClick={(row) => console.log('Clicked row:', row)}
                onSelectionChange={(selected) => console.log('Selected:', selected)}
                onExport={() => console.log('Export clicked')}
                onRefresh={() => console.log('Refresh clicked')}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Search Demo */}
        <TabsContent value="search" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enhanced Search Components</CardTitle>
              <CardDescription>
                Advanced search with autocomplete, filters, and command palette
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Default Search */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Default Search</h3>
                <EnhancedSearch
                  placeholder="Search endpoints..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSearch={(query) => console.log('Search:', query)}
                  suggestions={searchSuggestions}
                  recentSearches={['users', 'api', 'analytics']}
                  className="max-w-md"
                />
              </div>

              {/* Search with Filters */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Search with Filters</h3>
                <SearchWithFilters
                  placeholder="Search with filters..."
                  filterOptions={[
                    {
                      key: 'status',
                      label: 'Status',
                      options: [
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' },
                        { value: 'pending', label: 'Pending' }
                      ]
                    },
                    {
                      key: 'method',
                      label: 'Method',
                      options: [
                        { value: 'GET', label: 'GET' },
                        { value: 'POST', label: 'POST' },
                        { value: 'PUT', label: 'PUT' },
                        { value: 'DELETE', label: 'DELETE' }
                      ]
                    }
                  ]}
                  onFilterChange={(filters) => console.log('Filters:', filters)}
                  className="max-w-md"
                />
              </div>

              {/* Command Search */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Command Palette (Ctrl+K)</h3>
                <CommandSearch
                  placeholder="Search commands..."
                  commands={[
                    {
                      id: '1',
                      title: 'Open User Management',
                      description: 'Navigate to user management page',
                      icon: <Users className="w-4 h-4" />,
                      action: () => console.log('Opening user management')
                    },
                    {
                      id: '2',
                      title: 'Refresh Data',
                      description: 'Refresh current page data',
                      icon: <RefreshCw className="w-4 h-4" />,
                      action: () => console.log('Refreshing data')
                    },
                    {
                      id: '3',
                      title: 'Open Settings',
                      description: 'Navigate to settings page',
                      icon: <Settings className="w-4 h-4" />,
                      action: () => console.log('Opening settings')
                    }
                  ]}
                  className="max-w-md"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forms Demo */}
        <TabsContent value="forms" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Form */}
            <Card>
              <CardHeader>
                <CardTitle>User Form</CardTitle>
                <CardDescription>
                  Enhanced form with validation and floating labels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserForm
                  onSubmit={handleFormSubmit}
                  onCancel={() => console.log('Cancelled')}
                  loading={loading}
                  defaultValues={{
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john@example.com',
                    role: 'user',
                    active: true
                  }}
                />
              </CardContent>
            </Card>

            {/* Settings Form */}
            <Card>
              <CardHeader>
                <CardTitle>Settings Form</CardTitle>
                <CardDescription>
                  Form with different field types and layouts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SettingsForm
                  onSubmit={handleFormSubmit}
                  onCancel={() => console.log('Cancelled')}
                  loading={loading}
                  defaultValues={{
                    siteName: 'Trans Bot AI',
                    siteUrl: 'https://transbot.ai',
                    description: 'Advanced TMS system with AI capabilities',
                    maintenanceMode: false,
                    notifications: true
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UIComponentsDemoPage;

import React, { useState } from 'react';
import { 
  Activity, 
  Users, 
  Brain, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  Server,
  Database,
  Shield,
  Cpu,
  HardDrive,
  Network,
  BarChart3,
  RefreshCw,
  Settings,
  Eye,
  Download,
  Bell,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DataTable } from '@/components/ui/DataTable';
import { FormDialog } from '@/components/ui/FormDialog';
import { ConfirmDeleteDialog } from '@/components/ui/ConfirmDeleteDialog';

const UIPlayground: React.FC = () => {
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Mock data for DataTable
  const mockData = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-01-15 10:30:00',
      department: 'IT'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'User',
      status: 'active',
      lastLogin: '2024-01-15 09:15:00',
      department: 'Marketing'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'Manager',
      status: 'inactive',
      lastLogin: '2024-01-14 16:45:00',
      department: 'Sales'
    },
    {
      id: '4',
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      role: 'User',
      status: 'pending',
      lastLogin: '2024-01-15 11:20:00',
      department: 'HR'
    }
  ];

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'lastLogin', label: 'Last Login', sortable: true }
  ];

  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter full name'
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email' as const,
      required: true,
      placeholder: 'Enter email address',
      validation: {
        pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
        message: 'Please enter a valid email address'
      }
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'admin', label: 'Administrator' },
        { value: 'manager', label: 'Manager' },
        { value: 'user', label: 'User' }
      ]
    },
    {
      name: 'department',
      label: 'Department',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'it', label: 'Information Technology' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'sales', label: 'Sales' },
        { value: 'hr', label: 'Human Resources' }
      ]
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      placeholder: 'Enter description'
    },
    {
      name: 'active',
      label: 'Active Status',
      type: 'checkbox' as const
    }
  ];

  const handleEdit = (row: any) => {
    setSelectedItem(row);
    setShowFormDialog(true);
  };

  const handleDelete = (row: any) => {
    setSelectedItem(row);
    setShowDeleteDialog(true);
  };

  const handleView = (row: any) => {
    console.log('View item:', row);
    // In a real app, this would navigate to a detail view
  };

  const handleFormSubmit = async (data: any) => {
    console.log('Form submitted:', data);
    // In a real app, this would make an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleDeleteConfirm = async (reason?: string) => {
    console.log('Delete confirmed:', selectedItem, 'Reason:', reason);
    // In a real app, this would make an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="p-8 space-y-8">
        {/* Header */}
        <SectionHeader
          title="MCP Enterprise UI Playground"
          subtitle="Test and demonstrate all enterprise UI components"
          icon={<Settings className="h-8 w-8" />}
          action={
            <Button onClick={() => setShowFormDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Item
            </Button>
          }
        />

        {/* Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Users"
            value="1,247"
            change={12.5}
            changeType="increase"
            icon={<Users className="h-6 w-6" />}
            color="blue"
          />
          <MetricCard
            title="Active Sessions"
            value="89"
            change={-2.1}
            changeType="decrease"
            icon={<Activity className="h-6 w-6" />}
            color="green"
          />
          <MetricCard
            title="System Health"
            value="98.5"
            format="percentage"
            change={0.5}
            changeType="increase"
            icon={<CheckCircle className="h-6 w-6" />}
            color="green"
          />
          <MetricCard
            title="Response Time"
            value="45"
            change={-5.2}
            changeType="increase"
            icon={<Zap className="h-6 w-6" />}
            color="orange"
          />
        </div>

        {/* DataTable Section */}
        <Card className="p-6">
          <SectionHeader
            title="User Management"
            subtitle="Demonstrating enterprise DataTable with full CRUD operations"
            icon={<Users className="h-6 w-6" />}
          />
          
          <DataTable
            data={mockData}
            columns={columns}
            title="Users"
            searchable={true}
            filterable={true}
            sortable={true}
            pagination={true}
            bulkActions={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </Card>

        {/* Component Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card Component Showcase */}
          <Card className="p-6">
            <SectionHeader
              title="Card Component"
              subtitle="Glass morphism design with variants"
              icon={<Card className="h-6 w-6" />}
            />
            
            <div className="space-y-4">
              <Card variant="default" className="p-4">
                <h4 className="font-semibold mb-2">Default Card</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Standard card with glass morphism effect
                </p>
              </Card>
              
              <Card variant="elevated" className="p-4">
                <h4 className="font-semibold mb-2">Elevated Card</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enhanced shadow and backdrop blur
                </p>
              </Card>
              
              <Card variant="outlined" className="p-4">
                <h4 className="font-semibold mb-2">Outlined Card</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Transparent background with border
                </p>
              </Card>
            </div>
          </Card>

          {/* Button Showcase */}
          <Card className="p-6">
            <SectionHeader
              title="Button Components"
              subtitle="All button variants and states"
              icon={<Settings className="h-6 w-6" />}
            />
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button disabled>Disabled</Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  With Icon
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Responsive Design Demo */}
        <Card className="p-6">
          <SectionHeader
            title="Responsive Design"
            subtitle="Test responsive behavior across different screen sizes"
            icon={<Eye className="h-6 w-6" />}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg text-center">
              <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Mobile</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">≤767px</div>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg text-center">
              <div className="text-sm font-medium text-green-700 dark:text-green-300">Tablet</div>
              <div className="text-xs text-green-600 dark:text-green-400">768-1023px</div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-lg text-center">
              <div className="text-sm font-medium text-purple-700 dark:text-purple-300">Desktop</div>
              <div className="text-xs text-purple-600 dark:text-purple-400">≥1024px</div>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/20 p-4 rounded-lg text-center">
              <div className="text-sm font-medium text-orange-700 dark:text-orange-300">Large</div>
              <div className="text-xs text-orange-600 dark:text-orange-400">≥1440px</div>
            </div>
          </div>
        </Card>

        {/* Form Dialog */}
        <FormDialog
          isOpen={showFormDialog}
          onClose={() => {
            setShowFormDialog(false);
            setSelectedItem(null);
          }}
          title={selectedItem ? 'Edit User' : 'Add New User'}
          fields={formFields}
          initialData={selectedItem || {}}
          onSubmit={handleFormSubmit}
          submitLabel={selectedItem ? 'Update' : 'Create'}
        />

        {/* Delete Confirmation Dialog */}
        <ConfirmDeleteDialog
          isOpen={showDeleteDialog}
          onClose={() => {
            setShowDeleteDialog(false);
            setSelectedItem(null);
          }}
          onConfirm={handleDeleteConfirm}
          title="Delete User"
          message="Are you sure you want to delete this user?"
          itemName={selectedItem?.name}
          requireReason={true}
        />
      </div>
    </div>
  );
};

export default UIPlayground;

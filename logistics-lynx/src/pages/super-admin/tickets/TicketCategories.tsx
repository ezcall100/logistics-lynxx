/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus,
  Edit,
  Trash2,
  FolderOpen,
  Tag,
  Settings,
  BarChart3
} from 'lucide-react';
import { CRMStatsCard } from '@/components/crm/shared/CRMStatsCard';

const TicketCategories: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const categories = [
    {
      id: 'cat-1',
      name: 'Technical Issues',
      description: 'Software bugs, API errors, system failures, and technical problems',
      color: 'bg-red-100 text-red-800',
      subcategories: ['API', 'Database', 'UI/UX', 'Performance', 'Security'],
      ticketCount: 145,
      avgResolutionTime: '6.2h',
      priority: 'High',
      slaTarget: '4h',
      created: '2024-01-15',
      lastUpdated: '2024-03-20'
    },
    {
      id: 'cat-2',
      name: 'Access & Authentication',
      description: 'Login issues, password resets, permission problems, and account access',
      color: 'bg-blue-100 text-blue-800',
      subcategories: ['Login', 'Password', 'Permissions', 'Account Setup', '2FA'],
      ticketCount: 89,
      avgResolutionTime: '2.1h',
      priority: 'Medium',
      slaTarget: '8h',
      created: '2024-01-15',
      lastUpdated: '2024-03-19'
    },
    {
      id: 'cat-3',
      name: 'Data & Synchronization',
      description: 'Data sync errors, import/export issues, and data integrity problems',
      color: 'bg-purple-100 text-purple-800',
      subcategories: ['Data Sync', 'Import/Export', 'Data Quality', 'Migration', 'Backup'],
      ticketCount: 67,
      avgResolutionTime: '8.7h',
      priority: 'High',
      slaTarget: '6h',
      created: '2024-01-15',
      lastUpdated: '2024-03-18'
    },
    {
      id: 'cat-4',
      name: 'Feature Requests',
      description: 'New feature suggestions, enhancements, and improvement requests',
      color: 'bg-green-100 text-green-800',
      subcategories: ['Enhancement', 'New Feature', 'UI Improvement', 'Integration', 'Automation'],
      ticketCount: 234,
      avgResolutionTime: '72h',
      priority: 'Low',
      slaTarget: '168h',
      created: '2024-01-15',
      lastUpdated: '2024-03-17'
    },
    {
      id: 'cat-5',
      name: 'Billing & Payments',
      description: 'Invoice issues, payment problems, billing discrepancies, and subscription matters',
      color: 'bg-yellow-100 text-yellow-800',
      subcategories: ['Invoicing', 'Payment Processing', 'Billing Errors', 'Subscriptions', 'Refunds'],
      ticketCount: 43,
      avgResolutionTime: '4.5h',
      priority: 'Medium',
      slaTarget: '12h',
      created: '2024-01-15',
      lastUpdated: '2024-03-16'
    },
    {
      id: 'cat-6',
      name: 'Training & Support',
      description: 'User training requests, documentation needs, and general support questions',
      color: 'bg-indigo-100 text-indigo-800',
      subcategories: ['User Training', 'Documentation', 'How-to Questions', 'Best Practices', 'Consultation'],
      ticketCount: 156,
      avgResolutionTime: '3.2h',
      priority: 'Low',
      slaTarget: '24h',
      created: '2024-01-15',
      lastUpdated: '2024-03-15'
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCategoryStats = () => {
    const totalTickets = categories.reduce((sum, cat) => sum + cat.ticketCount, 0);
    const avgResolution = categories.reduce((sum, cat) => {
      const hours = parseFloat(cat.avgResolutionTime.replace('h', ''));
      return sum + hours;
    }, 0) / categories.length;

    return {
      totalCategories: categories.length,
      totalTickets,
      avgResolution: `${avgResolution.toFixed(1)}h`,
      highPriorityCategories: categories.filter(cat => cat.priority === 'High').length
    };
  };

  const stats = getCategoryStats();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ticket Categories</h1>
          <p className="text-muted-foreground">Organize and manage ticket categories and classifications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Manage
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CRMStatsCard
          title="Total Categories"
          value={stats.totalCategories}
          icon={FolderOpen}
          iconColor="text-blue-600"
        />
        <CRMStatsCard
          title="Total Tickets"
          value={stats.totalTickets.toLocaleString()}
          icon={Tag}
          iconColor="text-green-600"
        />
        <CRMStatsCard
          title="Avg Resolution"
          value={stats.avgResolution}
          icon={BarChart3}
          iconColor="text-purple-600"
        />
        <CRMStatsCard
          title="High Priority"
          value={stats.highPriorityCategories}
          icon={FolderOpen}
          iconColor="text-red-600"
        />
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 mb-2">
                    <FolderOpen className="h-5 w-5" />
                    {category.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Category Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Tickets</div>
                  <div className="font-semibold text-foreground">{category.ticketCount}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Avg Resolution</div>
                  <div className="font-semibold text-foreground">{category.avgResolutionTime}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Priority</div>
                  <Badge className={getPriorityColor(category.priority)} variant="outline">
                    {category.priority}
                  </Badge>
                </div>
                <div>
                  <div className="text-muted-foreground">SLA Target</div>
                  <div className="font-semibold text-foreground">{category.slaTarget}</div>
                </div>
              </div>

              {/* Subcategories */}
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Subcategories</div>
                <div className="flex flex-wrap gap-1">
                  {category.subcategories.map((sub) => (
                    <Badge key={sub} variant="outline" className="text-xs">
                      {sub}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div className="text-xs text-muted-foreground border-t pt-3">
                <div>Created: {new Date(category.created).toLocaleDateString()}</div>
                <div>Last Updated: {new Date(category.lastUpdated).toLocaleDateString()}</div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Tickets
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No categories found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first category.'}
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      )}
      </div>
    </SuperAdminLayout>
  );
};

export default TicketCategories;
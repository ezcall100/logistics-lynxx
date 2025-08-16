/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Plus,
  Edit,
  Trash2,
  Copy,
  FileText,
  Save,
  Eye,
  Clock,
  User,
  Building2,
  Tag,
  AlertTriangle
} from 'lucide-react';
import { CRMStatsCard } from '@/components/crm/shared/CRMStatsCard';

const TicketTemplates: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const templates = [
    {
      id: 'tmpl-1',
      name: 'API Integration Failure',
      category: 'Technical',
      description: 'Template for API connectivity and integration issues',
      priority: 'High',
      estimatedResolution: '4h',
      assignedDepartment: 'Engineering',
      slaTarget: '4h',
      usageCount: 45,
      lastUsed: '2024-03-20',
      created: '2024-01-15',
      template: {
        title: 'API Integration Issue - [System Name]',
        description: `**Issue Description:**
- API endpoint: [URL]
- Error message: [Error details]
- Affected system: [System name]
- Impact: [Business impact]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Additional Information:**
- Environment: [Production/Staging/Development]
- Timestamp: [When issue occurred]
- Frequency: [How often it occurs]`,
        tags: ['API', 'Integration', 'Critical'],
        requiredFields: ['System Name', 'API Endpoint', 'Error Message'],
        escalationRules: ['Auto-assign to Engineering team', 'Notify team lead if unresolved in 2h']
      }
    },
    {
      id: 'tmpl-2',
      name: 'User Access Request',
      category: 'Access',
      description: 'Template for new user access and permission requests',
      priority: 'Medium',
      estimatedResolution: '2h',
      assignedDepartment: 'IT Support',
      slaTarget: '8h',
      usageCount: 128,
      lastUsed: '2024-03-20',
      created: '2024-01-15',
      template: {
        title: 'User Access Request - [User Name]',
        description: `**User Information:**
- Full Name: [User full name]
- Email: [User email]
- Department: [Department]
- Manager: [Manager name]
- Start Date: [Employment start date]

**Access Requirements:**
- Portal Access: [Carrier/Broker/Shipper/Driver]
- Role: [Role name]
- Special Permissions: [List unknown special access needed]
- Equipment: [Mobile/Desktop/Both]

**Business Justification:**
[Reason for access request]

**Manager Approval:**
- Manager Name: [Manager name]
- Approval Date: [Date]
- Approval Method: [Email/Ticket/Other]`,
        tags: ['Access', 'User Management', 'Onboarding'],
        requiredFields: ['User Name', 'Email', 'Department', 'Role'],
        escalationRules: ['Require manager approval', 'Auto-assign to IT Support']
      }
    },
    {
      id: 'tmpl-3',
      name: 'Data Sync Error',
      category: 'Data',
      description: 'Template for data synchronization and integrity issues',
      priority: 'High',
      estimatedResolution: '6h',
      assignedDepartment: 'Data Team',
      slaTarget: '6h',
      usageCount: 67,
      lastUsed: '2024-03-19',
      created: '2024-01-15',
      template: {
        title: 'Data Sync Error - [Source] to [Destination]',
        description: `**Sync Information:**
- Source System: [Source system name]
- Destination System: [Destination system name]
- Data Type: [Type of data being synced]
- Sync Schedule: [Frequency of sync]
- Last Successful Sync: [Timestamp]

**Error Details:**
- Error Message: [Full error message]
- Error Code: [Error code if available]
- Affected Records: [Number of records affected]
- Data Range: [Date range of affected data]

**Impact Assessment:**
- Business Impact: [High/Medium/Low]
- Affected Users: [Number of users affected]
- Downstream Systems: [Other systems affected]

**Investigation Steps:**
1. Check source system logs
2. Verify destination system connectivity
3. Review data integrity
4. Check transformation rules`,
        tags: ['Data Sync', 'Integration', 'Data Quality'],
        requiredFields: ['Source System', 'Destination System', 'Error Message'],
        escalationRules: ['Auto-assign to Data Team', 'Escalate to team lead if critical']
      }
    },
    {
      id: 'tmpl-4',
      name: 'Performance Issue Report',
      category: 'Performance',
      description: 'Template for system performance and slowness issues',
      priority: 'Medium',
      estimatedResolution: '8h',
      assignedDepartment: 'Performance Team',
      slaTarget: '12h',
      usageCount: 89,
      lastUsed: '2024-03-18',
      created: '2024-01-15',
      template: {
        title: 'Performance Issue - [System/Feature]',
        description: `**Performance Details:**
- Affected System/Feature: [System or feature name]
- Issue Type: [Slow loading/Timeout/Unresponsive]
- User Impact: [Number of users affected]
- Performance Metrics: [Load time/Response time]
- Baseline Performance: [Normal performance metrics]

**Environment Information:**
- Environment: [Production/Staging]
- Browser/App Version: [Version information]
- Device Type: [Desktop/Mobile/Tablet]
- Location: [Geographic location if relevant]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Additional Information:**
- Time of occurrence: [When did this start]
- Frequency: [Intermittent/Constant]
- Workarounds: [Any temporary solutions]`,
        tags: ['Performance', 'Optimization', 'User Experience'],
        requiredFields: ['System/Feature', 'Performance Metrics', 'User Impact'],
        escalationRules: ['Auto-assign to Performance Team', 'Monitor resolution time']
      }
    },
    {
      id: 'tmpl-5',
      name: 'Feature Enhancement Request',
      category: 'Feature Request',
      description: 'Template for new feature suggestions and enhancements',
      priority: 'Low',
      estimatedResolution: '72h',
      assignedDepartment: 'Product Team',
      slaTarget: '168h',
      usageCount: 234,
      lastUsed: '2024-03-17',
      created: '2024-01-15',
      template: {
        title: 'Feature Request - [Feature Name]',
        description: `**Feature Description:**
- Feature Name: [Name of requested feature]
- Category: [Portal/System area]
- Description: [Detailed description of the feature]

**Business Case:**
- Business Problem: [What problem does this solve]
- Target Users: [Who will use this feature]
- Expected Benefits: [How will this help]
- Business Impact: [Revenue/Efficiency/User Experience]

**Functional Requirements:**
- Core Functionality: [What the feature should do]
- User Interface: [UI/UX requirements]
- Integration Needs: [Systems that need integration]
- Performance Requirements: [Performance expectations]

**Acceptance Criteria:**
1. [Criteria 1]
2. [Criteria 2]
3. [Criteria 3]

**Additional Information:**
- Priority Level: [High/Medium/Low]
- Requested Timeline: [When is this needed]
- Stakeholders: [Key stakeholders involved]`,
        tags: ['Enhancement', 'Feature Request', 'Product'],
        requiredFields: ['Feature Name', 'Business Problem', 'Target Users'],
        escalationRules: ['Route to Product Team', 'Require business case review']
      }
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getTemplateStats = () => {
    const totalUsage = templates.reduce((sum, tmpl) => sum + tmpl.usageCount, 0);
    const avgUsage = totalUsage / templates.length;
    const categories = new Set(templates.map(t => t.category)).size;

    return {
      totalTemplates: templates.length,
      totalUsage,
      avgUsage: Math.round(avgUsage),
      categories
    };
  };

  const stats = getTemplateStats();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = ['all', ...new Set(templates.map(t => t.category))];

  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ticket Templates</h1>
          <p className="text-muted-foreground">Pre-configured templates for faster ticket creation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CRMStatsCard
          title="Total Templates"
          value={stats.totalTemplates}
          icon={FileText}
          iconColor="text-blue-600"
        />
        <CRMStatsCard
          title="Total Usage"
          value={stats.totalUsage}
          icon={Copy}
          iconColor="text-green-600"
        />
        <CRMStatsCard
          title="Avg Usage"
          value={stats.avgUsage}
          icon={Tag}
          iconColor="text-purple-600"
        />
        <CRMStatsCard
          title="Categories"
          value={stats.categories}
          icon={Building2}
          iconColor="text-orange-600"
        />
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === 'all' ? 'All Categories' : category}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5" />
                    {template.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mb-3">
                    {template.description}
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">{template.category}</Badge>
                    <Badge className={getPriorityColor(template.priority)}>
                      {template.priority}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
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
              {/* Template Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Usage Count</div>
                  <div className="font-semibold text-foreground">{template.usageCount}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Est. Resolution</div>
                  <div className="font-semibold text-foreground">{template.estimatedResolution}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Department</div>
                  <div className="font-semibold text-foreground">{template.assignedDepartment}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">SLA Target</div>
                  <div className="font-semibold text-foreground">{template.slaTarget}</div>
                </div>
              </div>

              {/* Template Preview */}
              <div className="border rounded-lg p-3 bg-muted/30">
                <div className="text-sm font-medium text-foreground mb-2">Template Preview</div>
                <div className="text-sm text-muted-foreground">
                  <div className="font-medium">{template.template.title}</div>
                  <div className="mt-1 text-xs line-clamp-3">
                    {template.template.description.substring(0, 150)}...
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Default Tags</div>
                <div className="flex flex-wrap gap-1">
                  {template.template.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Required Fields */}
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Required Fields</div>
                <div className="text-sm text-muted-foreground">
                  {template.template.requiredFields.join(', ')}
                </div>
              </div>

              {/* Metadata */}
              <div className="text-xs text-muted-foreground border-t pt-3">
                <div>Last Used: {new Date(template.lastUsed).toLocaleDateString()}</div>
                <div>Created: {new Date(template.created).toLocaleDateString()}</div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="default" size="sm" className="flex-1">
                  <Copy className="h-4 w-4 mr-1" />
                  Use Template
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search terms or filters.' : 'Get started by creating your first template.'}
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>
      )}
      </div>
    </SuperAdminLayout>
  );
};

export default TicketTemplates;
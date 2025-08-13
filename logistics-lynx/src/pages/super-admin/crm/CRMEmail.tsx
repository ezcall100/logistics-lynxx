import React, { useState } from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  Send, 
  Inbox, 
  FileText, 
  Archive, 
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Star,
  Reply,
  Forward,
  Trash2,
  RefreshCw
} from 'lucide-react';

const CRMEmail = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const emailMetrics = [
    { title: 'Total Emails', value: '1,247', change: '+23', icon: Mail },
    { title: 'Sent Today', value: '67', change: '+12', icon: Send },
    { title: 'Open Rate', value: '68.5%', change: '+5%', icon: Star },
    { title: 'Response Rate', value: '24.3%', change: '+8%', icon: Reply },
  ];

  const emails = [
    {
      id: 1,
      from: 'john.smith@techcorp.com',
      subject: 'RE: Partnership Proposal',
      preview: 'Thank you for your proposal. We would like to schedule a meeting...',
      time: '2:30 PM',
      unread: true,
      starred: true,
      category: 'Lead'
    },
    {
      id: 2,
      from: 'sarah.johnson@logistics.com',
      subject: 'Project Update - Q4 Implementation',
      preview: 'The Q4 implementation is proceeding on schedule. Current status...',
      time: '1:15 PM',
      unread: true,
      starred: false,
      category: 'Project'
    },
    {
      id: 3,
      from: 'mike.davis@freightco.com',
      subject: 'Rate Quote Request',
      preview: 'We need a rate quote for the following shipment details...',
      time: '11:45 AM',
      unread: false,
      starred: true,
      category: 'Opportunity'
    }
  ];

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Email Center</h1>
            <p className="text-muted-foreground">
              Manage all CRM email communications and campaigns
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Compose
            </Button>
          </div>
        </div>

        {/* Email Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {emailMetrics.map((metric) => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{metric.change}</span> from yesterday
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Email Interface */}
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Email Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Folders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Inbox className="h-4 w-4 mr-2" />
                Inbox
                <Badge variant="secondary" className="ml-auto">12</Badge>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Send className="h-4 w-4 mr-2" />
                Sent
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Drafts
                <Badge variant="secondary" className="ml-auto">3</Badge>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Trash2 className="h-4 w-4 mr-2" />
                Trash
              </Button>
            </CardContent>
          </Card>

          {/* Email List */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Inbox</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {emails.map((email) => (
                  <div
                    key={email.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 ${
                      email.unread ? 'bg-blue-50 dark:bg-blue-950/20' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="flex items-center gap-2">
                          {email.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                          <Badge variant="outline" className="text-xs">
                            {email.category}
                          </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm ${email.unread ? 'font-semibold' : 'font-medium'}`}>
                              {email.from}
                            </p>
                            <span className="text-xs text-muted-foreground">{email.time}</span>
                          </div>
                          <p className={`text-sm ${email.unread ? 'font-medium' : ''} truncate`}>
                            {email.subject}
                          </p>
                          <p className="text-xs text-muted-foreground truncate mt-1">
                            {email.preview}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Email Templates & Campaigns */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Pre-designed templates for common communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  'Welcome to Our Services',
                  'Follow-up After Meeting',
                  'Proposal Submission',
                  'Project Update',
                  'Contract Renewal'
                ].map((template) => (
                  <div key={template} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">{template}</span>
                    <Button variant="outline" size="sm">Use</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Campaigns</CardTitle>
              <CardDescription>Manage your email marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Q4 Newsletter', status: 'Active', sent: '1,247' },
                  { name: 'Product Launch', status: 'Draft', sent: '0' },
                  { name: 'Customer Survey', status: 'Scheduled', sent: '856' }
                ].map((campaign) => (
                  <div key={campaign.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="text-sm font-medium">{campaign.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Sent to {campaign.sent} contacts
                      </div>
                    </div>
                    <Badge variant={
                      campaign.status === 'Active' ? 'default' :
                      campaign.status === 'Scheduled' ? 'secondary' : 'outline'
                    }>
                      {campaign.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default CRMEmail;
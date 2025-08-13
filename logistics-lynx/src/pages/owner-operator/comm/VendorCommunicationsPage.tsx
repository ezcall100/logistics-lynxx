import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Phone, Mail, MessageSquare, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const VendorCommunicationsPage = () => {
  const vendorData = {
    communications: [
      {
        vendor: 'Maintenance Plus Services',
        type: 'email',
        subject: 'Scheduled Maintenance Reminder',
        message: 'Your truck is due for 30,000 mile service next week.',
        time: '3 hours ago',
        status: 'unread',
        priority: 'high',
        category: 'Maintenance'
      },
      {
        vendor: 'Fuel Express Network',
        type: 'call',
        subject: 'Fuel Card Account Review',
        message: 'Discussed fuel spending patterns and potential savings opportunities.',
        time: '1 day ago',
        status: 'completed',
        priority: 'medium',
        category: 'Fuel'
      },
      {
        vendor: 'TruckStop Insurance Group',
        type: 'message',
        subject: 'Policy Renewal Quote',
        message: 'Updated insurance quote for 2024 policy renewal attached.',
        time: '2 days ago',
        status: 'responded',
        priority: 'high',
        category: 'Insurance'
      }
    ],
    vendors: [
      {
        name: 'Maintenance Plus Services',
        category: 'Maintenance',
        contact: 'Mike Johnson',
        phone: '555-0123',
        email: 'mike@maintenanceplus.com',
        lastContact: '3 hours ago',
        status: 'active',
        relationship: 'preferred'
      },
      {
        name: 'Fuel Express Network',
        category: 'Fuel',
        contact: 'Sarah Davis',
        phone: '555-0124',
        email: 'sarah@fuelexpress.com',
        lastContact: '1 day ago',
        status: 'active',
        relationship: 'standard'
      },
      {
        name: 'TruckStop Insurance Group',
        category: 'Insurance',
        contact: 'Robert Wilson',
        phone: '555-0125',
        email: 'robert@truckstopins.com',
        lastContact: '2 days ago',
        status: 'active',
        relationship: 'preferred'
      }
    ],
    categories: [
      { name: 'Maintenance', count: 8, urgent: 2 },
      { name: 'Fuel', count: 3, urgent: 0 },
      { name: 'Insurance', count: 5, urgent: 1 },
      { name: 'Parts & Supplies', count: 4, urgent: 0 },
      { name: 'Technology', count: 2, urgent: 0 }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-500';
      case 'responded': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'preferred': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'standard': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'message': return <MessageSquare className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Vendor Communications</h1>
        <p className="text-muted-foreground">Manage communications with your business vendors and suppliers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Vendors</p>
                <p className="text-2xl font-bold">22</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Open Messages</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Urgent Items</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold">4.2h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Communications
            </CardTitle>
            <CardDescription>Latest vendor interactions and messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {vendorData.communications.map((comm, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(comm.type)}
                    <h4 className="font-semibold">{comm.vendor}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getPriorityColor(comm.priority)} border-0 text-xs`}>
                      {comm.priority}
                    </Badge>
                    <Badge className={getStatusColor(comm.status)}>
                      {comm.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs mb-2">
                    {comm.category}
                  </Badge>
                  <h5 className="font-medium text-sm">{comm.subject}</h5>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{comm.message}</p>
                <p className="text-xs text-muted-foreground">{comm.time}</p>
                
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">Reply</Button>
                  <Button size="sm" variant="outline">Schedule Call</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Vendor Directory
            </CardTitle>
            <CardDescription>Your business vendor contacts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {vendorData.vendors.map((vendor, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{vendor.name}</h4>
                  <Badge className={`${getRelationshipColor(vendor.relationship)} border-0 text-xs`}>
                    {vendor.relationship}
                  </Badge>
                </div>
                
                <div className="space-y-1 text-sm mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {vendor.category}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">Contact: {vendor.contact}</p>
                  <p className="text-muted-foreground">Last contact: {vendor.lastContact}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendor Categories</CardTitle>
            <CardDescription>Communications by vendor category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {vendorData.categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{category.name}</h4>
                  <p className="text-sm text-muted-foreground">{category.count} communications</p>
                </div>
                <div className="flex items-center gap-2">
                  {category.urgent > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {category.urgent} urgent
                    </Badge>
                  )}
                  <Button size="sm" variant="outline">View</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Scheduled Interactions
            </CardTitle>
            <CardDescription>Upcoming vendor meetings and calls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Quarterly Service Review</h4>
                <Badge variant="outline">Tomorrow 10:00 AM</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Maintenance Plus Services</p>
              <Button size="sm" className="mt-2">Join Meeting</Button>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Insurance Policy Review</h4>
                <Badge variant="outline">Friday 2:00 PM</Badge>
              </div>
              <p className="text-sm text-muted-foreground">TruckStop Insurance Group</p>
              <Button size="sm" className="mt-2">View Details</Button>
            </div>

            <Button className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule New Meeting
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorCommunicationsPage;
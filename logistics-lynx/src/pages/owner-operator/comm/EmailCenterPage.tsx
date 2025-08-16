/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Send, Inbox, Archive, Star, Search, Paperclip, Clock } from 'lucide-react';

const EmailCenterPage = () => {
  const emailData = {
    inbox: [
      {
        from: 'Global Logistics Inc',
        subject: 'Load Confirmation Required - LG-8847',
        preview: 'Please confirm receipt of load details for shipment LG-8847...',
        time: '2:30 PM',
        unread: true,
        starred: true,
        hasAttachment: true,
        priority: 'high'
      },
      {
        from: 'Metro Freight Solutions',
        subject: 'Payment Processed - Invoice MF-2024-001',
        preview: 'Payment of $2,450.00 has been processed for invoice MF-2024-001...',
        time: '1:15 PM',
        unread: true,
        starred: false,
        hasAttachment: false,
        priority: 'medium'
      },
      {
        from: 'DOT Compliance Services',
        subject: 'Annual Safety Audit Reminder',
        preview: 'Your annual DOT safety audit is scheduled for next month...',
        time: '11:45 AM',
        unread: false,
        starred: false,
        hasAttachment: true,
        priority: 'high'
      }
    ],
    templates: [
      { name: 'Load Acceptance', category: 'Operations', lastUsed: '2 days ago' },
      { name: 'Delivery Confirmation', category: 'Operations', lastUsed: '1 day ago' },
      { name: 'Invoice Submission', category: 'Finance', lastUsed: '3 days ago' },
      { name: 'Rate Negotiation', category: 'Sales', lastUsed: '1 week ago' }
    ],
    folders: [
      { name: 'Inbox', count: 8, unread: 3 },
      { name: 'Sent', count: 24, unread: 0 },
      { name: 'Drafts', count: 2, unread: 0 },
      { name: 'Customers', count: 45, unread: 2 },
      { name: 'Vendors', count: 18, unread: 1 },
      { name: 'Compliance', count: 12, unread: 0 }
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Email Center</h1>
        <p className="text-muted-foreground">Manage your business email communications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Inbox className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Unread Emails</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Send className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Sent Today</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Starred</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Response Time</p>
                <p className="text-2xl font-bold">2.1h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Inbox className="h-5 w-5" />
                  Inbox
                </CardTitle>
                <CardDescription>Your recent email messages</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
                <Button size="sm">
                  <Send className="h-4 w-4 mr-2" />
                  Compose
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {emailData.inbox.map((email, index) => (
              <div key={index} className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 ${
                email.unread ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200' : ''
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {email.starred && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                    {email.hasAttachment && <Paperclip className="h-4 w-4 text-gray-500" />}
                    <h4 className={`font-medium ${email.unread ? 'font-semibold' : ''}`}>
                      {email.from}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(email.priority)}`} 
                         style={{ backgroundColor: 'currentColor' }} />
                    <span className="text-sm text-muted-foreground">{email.time}</span>
                  </div>
                </div>
                
                <h5 className={`text-sm mb-1 ${email.unread ? 'font-semibold' : 'font-medium'}`}>
                  {email.subject}
                </h5>
                <p className="text-sm text-muted-foreground">{email.preview}</p>
                
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">Reply</Button>
                  <Button size="sm" variant="outline">Forward</Button>
                  {email.unread && (
                    <Button size="sm" variant="outline">Mark Read</Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5" />
                Folders
              </CardTitle>
              <CardDescription>Organize your emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {emailData.folders.map((folder, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-muted rounded-lg cursor-pointer">
                  <span className="font-medium">{folder.name}</span>
                  <div className="flex items-center gap-2">
                    {folder.unread > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {folder.unread}
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground">{folder.count}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Templates
              </CardTitle>
              <CardDescription>Quick email templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {emailData.templates.map((template, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{template.name}</h4>
                    <Button size="sm" variant="outline">Use</Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs mr-2">
                      {template.category}
                    </Badge>
                    {template.lastUsed}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common email tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="justify-start">
              <Send className="h-4 w-4 mr-2" />
              Compose New Email
            </Button>
            <Button className="justify-start" variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Search All Emails
            </Button>
            <Button className="justify-start" variant="outline">
              <Archive className="h-4 w-4 mr-2" />
              Archive Selected
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailCenterPage;
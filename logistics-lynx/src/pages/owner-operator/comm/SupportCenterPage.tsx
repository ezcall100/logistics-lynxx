import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageSquare, HelpCircle, AlertCircle, CheckCircle, Clock, User, FileText } from 'lucide-react';

const SupportCenterPage = () => {
  const supportData = {
    tickets: [
      {
        id: 'SUP-001',
        subject: 'ELD Device Not Syncing',
        category: 'Technical',
        priority: 'high',
        status: 'open',
        created: '2024-01-15',
        lastUpdate: '2 hours ago',
        assignedTo: 'Tech Support Team'
      },
      {
        id: 'SUP-002',
        subject: 'Invoice Payment Inquiry',
        category: 'Billing',
        priority: 'medium',
        status: 'in-progress',
        created: '2024-01-14',
        lastUpdate: '1 day ago',
        assignedTo: 'Billing Department'
      },
      {
        id: 'SUP-003',
        subject: 'Load Board Access Issues',
        category: 'Technical',
        priority: 'low',
        status: 'resolved',
        created: '2024-01-12',
        lastUpdate: '3 days ago',
        assignedTo: 'Platform Support'
      }
    ],
    faqs: [
      {
        question: 'How do I update my insurance information?',
        category: 'Account Management',
        views: 245
      },
      {
        question: 'What are the ELD compliance requirements?',
        category: 'Compliance',
        views: 189
      },
      {
        question: 'How to submit invoices for payment?',
        category: 'Billing',
        views: 156
      },
      {
        question: 'Setting up fuel card integration',
        category: 'Technical',
        views: 134
      }
    ],
    supportChannels: [
      {
        name: 'Phone Support',
        availability: '24/7',
        responseTime: 'Immediate',
        description: 'Direct phone support for urgent issues',
        contact: '1-800-TRUCKER'
      },
      {
        name: 'Live Chat',
        availability: '6 AM - 10 PM EST',
        responseTime: '< 5 minutes',
        description: 'Real-time chat support for quick questions',
        contact: 'Chat Widget'
      },
      {
        name: 'Email Support',
        availability: '24/7',
        responseTime: '< 4 hours',
        description: 'Detailed support via email ticket system',
        contact: 'support@owneroperator.com'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'in-progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'resolved': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <HelpCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Support Center</h1>
        <p className="text-muted-foreground">Get help and support for your business operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Open Tickets</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold">2.3h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
                <p className="text-2xl font-bold">98%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  My Support Tickets
                </CardTitle>
                <CardDescription>Track your support requests</CardDescription>
              </div>
              <Button size="sm">
                <HelpCircle className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {supportData.tickets.map((ticket, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(ticket.status)}
                    <h4 className="font-semibold">{ticket.id}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getPriorityColor(ticket.priority)} border-0 text-xs`}>
                      {ticket.priority}
                    </Badge>
                    <Badge className={`${getStatusColor(ticket.status)} border-0 text-xs`}>
                      {ticket.status}
                    </Badge>
                  </div>
                </div>
                
                <h5 className="font-medium text-sm mb-2">{ticket.subject}</h5>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                  <div>
                    <span className="block">Category: {ticket.category}</span>
                    <span className="block">Created: {ticket.created}</span>
                  </div>
                  <div>
                    <span className="block">Assigned: {ticket.assignedTo}</span>
                    <span className="block">Updated: {ticket.lastUpdate}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm" variant="outline">Add Comment</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Support Channels
            </CardTitle>
            <CardDescription>Choose how you'd like to get help</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {supportData.supportChannels.map((channel, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{channel.name}</h4>
                  <Badge variant="outline">{channel.responseTime}</Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{channel.description}</p>
                
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-muted-foreground">Available: {channel.availability}</span>
                  <span className="font-medium">{channel.contact}</span>
                </div>
                
                <Button size="sm" className="w-full">
                  {channel.name === 'Phone Support' && <Phone className="h-4 w-4 mr-2" />}
                  {channel.name === 'Live Chat' && <MessageSquare className="h-4 w-4 mr-2" />}
                  {channel.name === 'Email Support' && <FileText className="h-4 w-4 mr-2" />}
                  Contact Support
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>Find quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supportData.faqs.map((faq, index) => (
              <div key={index} className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {faq.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{faq.views} views</span>
                </div>
                <h4 className="font-medium text-sm">{faq.question}</h4>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <Button variant="outline">
              <HelpCircle className="h-4 w-4 mr-2" />
              View All FAQs
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Help</CardTitle>
            <CardDescription>Common support topics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <HelpCircle className="h-4 w-4 mr-2" />
              Account Setup & Management
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <AlertCircle className="h-4 w-4 mr-2" />
              Technical Issues
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Billing & Payments
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <CheckCircle className="h-4 w-4 mr-2" />
              Compliance & Documentation
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Support</CardTitle>
            <CardDescription>24/7 emergency assistance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                Roadside Assistance
              </h4>
              <p className="text-sm text-red-600 dark:text-red-400 mb-3">
                24/7 emergency roadside support for breakdowns
              </p>
              <Button size="sm" variant="destructive">
                <Phone className="h-4 w-4 mr-2" />
                Call Now: 1-800-ROAD-HELP
              </Button>
            </div>
            
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
                Load Emergency
              </h4>
              <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-3">
                Critical load issues requiring immediate attention
              </p>
              <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                <MessageSquare className="h-4 w-4 mr-2" />
                Emergency Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportCenterPage;
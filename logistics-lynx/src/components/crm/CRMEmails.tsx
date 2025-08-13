
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Mail, 
  Search, 
  Plus, 
  Send,
  Inbox,
  Eye,
  Reply,
  Paperclip,
  User,
  Building,
  MoreHorizontal
} from 'lucide-react';
import type { CRMEmail, CRMContact, CRMCompany } from '@/types/crm';

interface CRMEmailsProps {
  emails: CRMEmail[];
  contacts: CRMContact[];
  companies: CRMCompany[];
}

export const CRMEmails: React.FC<CRMEmailsProps> = ({ 
  emails, 
  contacts, 
  companies 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredEmails = emails.filter(email => {
    const matchesSearch = 
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.contact?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.contact?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.company?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || email.email_type === selectedType;
    const matchesStatus = selectedStatus === 'all' || email.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const emailTypes = ['all', 'inbound', 'outbound', 'automated'];
  const statuses = ['all', 'draft', 'sent', 'delivered', 'opened', 'replied', 'bounced'];

  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'inbound': return 'bg-blue-100 text-blue-800';
      case 'outbound': return 'bg-green-100 text-green-800';
      case 'automated': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'opened': return 'bg-purple-100 text-purple-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'bounced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'sent': return <Send className="h-4 w-4" />;
      case 'delivered': return <Mail className="h-4 w-4" />;
      case 'opened': return <Eye className="h-4 w-4" />;
      case 'replied': return <Reply className="h-4 w-4" />;
      default: return <Inbox className="h-4 w-4" />;
    }
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      case 'neutral': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  // Calculate stats
  const totalEmails = emails.length;
  const sentEmails = emails.filter(e => e.status === 'sent');
  const openedEmails = emails.filter(e => e.status === 'opened');
  const repliedEmails = emails.filter(e => e.status === 'replied');
  const openRate = sentEmails.length > 0 ? (openedEmails.length / sentEmails.length) * 100 : 0;
  const replyRate = sentEmails.length > 0 ? (repliedEmails.length / sentEmails.length) * 100 : 0;

  // Get recent emails (last 7 days)
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recentEmails = emails.filter(e => new Date(e.created_at) > weekAgo);

  const getInitials = (contact?: CRMContact) => {
    if (!contact) return 'UN';
    return `${contact.first_name.charAt(0)}${contact.last_name.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">Emails</h3>
          <p className="text-muted-foreground">
            Manage your email communications and campaigns
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Compose Email
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmails}</div>
            <p className="text-xs text-muted-foreground">
              {recentEmails.length} this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sent</CardTitle>
            <Send className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sentEmails.length}</div>
            <p className="text-xs text-muted-foreground">
              Successfully delivered
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <Eye className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {openedEmails.length} opened
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reply Rate</CardTitle>
            <Reply className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{replyRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {repliedEmails.length} replies
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Email Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Email Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Sent</span>
                <span className="font-medium">{sentEmails.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Opened</span>
                <span className="font-medium">{openedEmails.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${openRate}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Replied</span>
                <span className="font-medium">{repliedEmails.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ width: `${replyRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {emailTypes.map(type => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type === 'all' ? 'All' : type}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emails Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Emails ({filteredEmails.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From/To</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sentiment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmails.map((email) => (
                <TableRow key={email.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {getInitials(email.contact)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        {email.contact ? (
                          <>
                            <p className="font-medium">
                              {email.contact.first_name} {email.contact.last_name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {email.contact.email}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-muted-foreground">Unknown contact</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium line-clamp-1">{email.subject}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {email.body.substring(0, 100)}...
                      </p>
                      {email.attachments && email.attachments.length > 0 && (
                        <div className="flex items-center space-x-1 mt-1">
                          <Paperclip className="h-3 w-3" />
                          <span className="text-xs text-muted-foreground">
                            {email.attachments.length} attachment(s)
                          </span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge className={getTypeColor(email.email_type)}>
                        {email.email_type || 'outbound'}
                      </Badge>
                      {email.ai_generated && (
                        <Badge variant="outline" className="text-xs">
                          AI
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(email.status)}
                      <Badge className={getStatusColor(email.status)}>
                        {email.status || 'draft'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {email.ai_sentiment && (
                      <Badge className={getSentimentColor(email.ai_sentiment)}>
                        {email.ai_sentiment}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {new Date(email.created_at).toLocaleDateString()}
                      </p>
                      {email.sent_at && (
                        <p className="text-sm text-muted-foreground">
                          Sent: {new Date(email.sent_at).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredEmails.length === 0 && (
            <div className="text-center py-8">
              <Mail className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No emails found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || selectedType !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Get started by composing your first email.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

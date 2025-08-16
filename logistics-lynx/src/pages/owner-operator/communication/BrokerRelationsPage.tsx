/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  MessageSquare, 
  Phone, 
  Mail, 
  Star, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Search,
  Plus,
  Eye,
  Calendar
} from 'lucide-react';

interface Broker {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  rating: number;
  totalLoads: number;
  avgRate: number;
  onTimePayment: number;
  responseTime: string;
  lastContact: string;
  status: 'active' | 'inactive' | 'preferred';
  relationship: 'new' | 'established' | 'long-term';
}

interface Communication {
  id: string;
  brokerId: string;
  brokerName: string;
  type: 'email' | 'phone' | 'chat' | 'meeting';
  subject: string;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'follow-up';
}

const BrokerRelationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const brokers: Broker[] = [
    {
      id: 'BR001',
      name: 'Sarah Johnson',
      company: 'TruckStop Logistics',
      email: 'sarah.johnson@truckstop.com',
      phone: '(555) 123-4567',
      rating: 4.8,
      totalLoads: 45,
      avgRate: 2.85,
      onTimePayment: 98,
      responseTime: '< 2 hours',
      lastContact: '2024-01-15',
      status: 'preferred',
      relationship: 'long-term'
    },
    {
      id: 'BR002',
      name: 'Mike Chen',
      company: 'Express Freight Co',
      email: 'mike.chen@expressfreight.com',
      phone: '(555) 234-5678',
      rating: 4.2,
      totalLoads: 23,
      avgRate: 2.65,
      onTimePayment: 92,
      responseTime: '< 4 hours',
      lastContact: '2024-01-12',
      status: 'active',
      relationship: 'established'
    },
    {
      id: 'BR003',
      name: 'Lisa Rodriguez',
      company: 'National Transport',
      email: 'lisa.rodriguez@nationaltransport.com',
      phone: '(555) 345-6789',
      rating: 4.5,
      totalLoads: 67,
      avgRate: 2.92,
      onTimePayment: 95,
      responseTime: '< 1 hour',
      lastContact: '2024-01-10',
      status: 'preferred',
      relationship: 'long-term'
    },
    {
      id: 'BR004',
      name: 'David Wilson',
      company: 'Prime Logistics',
      email: 'david.wilson@primelogistics.com',
      phone: '(555) 456-7890',
      rating: 3.9,
      totalLoads: 12,
      avgRate: 2.58,
      onTimePayment: 88,
      responseTime: '< 6 hours',
      lastContact: '2024-01-08',
      status: 'active',
      relationship: 'new'
    }
  ];

  const communications: Communication[] = [
    {
      id: 'CM001',
      brokerId: 'BR001',
      brokerName: 'Sarah Johnson',
      type: 'email',
      subject: 'Rate negotiation for Houston-Dallas route',
      date: '2024-01-15',
      time: '14:30',
      status: 'completed'
    },
    {
      id: 'CM002',
      brokerId: 'BR002',
      brokerName: 'Mike Chen',
      type: 'phone',
      subject: 'Load confirmation call',
      date: '2024-01-14',
      time: '09:15',
      status: 'completed'
    },
    {
      id: 'CM003',
      brokerId: 'BR003',
      brokerName: 'Lisa Rodriguez',
      type: 'meeting',
      subject: 'Quarterly business review',
      date: '2024-01-12',
      time: '16:00',
      status: 'follow-up'
    },
    {
      id: 'CM004',
      brokerId: 'BR001',
      brokerName: 'Sarah Johnson',
      type: 'chat',
      subject: 'Load availability inquiry',
      date: '2024-01-11',
      time: '11:45',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preferred':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'long-term':
        return 'bg-purple-100 text-purple-800';
      case 'established':
        return 'bg-blue-100 text-blue-800';
      case 'new':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCommunicationIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'chat':
        return <MessageSquare className="h-4 w-4" />;
      case 'meeting':
        return <Users className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const handleContactBroker = (brokerId: string, method: string) => {
    console.log(`Contacting broker ${brokerId} via ${method}`);
  };

  const handleViewDetails = (brokerId: string) => {
    console.log('Viewing broker details:', brokerId);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Broker Relations</h1>
          <p className="text-muted-foreground">Manage relationships with freight brokers</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Broker
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Brokers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{brokers.length}</div>
            <p className="text-xs text-muted-foreground">Active relationships</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Preferred Brokers</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {brokers.filter(b => b.status === 'preferred').length}
            </div>
            <p className="text-xs text-muted-foreground">Top performers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rate</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(brokers.reduce((sum, b) => sum + b.avgRate, 0) / brokers.length).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Per mile</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8h</div>
            <p className="text-xs text-muted-foreground">Average response</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search brokers by name or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="brokers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="brokers">Broker Directory</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="brokers">
          <Card>
            <CardHeader>
              <CardTitle>Broker Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Broker</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Relationship</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {brokers.map((broker) => (
                    <TableRow key={broker.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{broker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{broker.name}</div>
                            <div className="text-sm text-muted-foreground">{broker.company}</div>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(broker.rating) 
                                      ? 'fill-yellow-400 text-yellow-400' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="text-xs text-muted-foreground ml-1">{broker.rating}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {broker.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {broker.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{broker.totalLoads} loads</div>
                          <div className="text-sm">${broker.avgRate.toFixed(2)}/mile</div>
                          <div className="text-sm">{broker.onTimePayment}% on-time payment</div>
                          <div className="text-xs text-muted-foreground">{broker.responseTime} response</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <Badge className={getStatusColor(broker.status)}>
                            {broker.status}
                          </Badge>
                          <Badge variant="outline" className={getRelationshipColor(broker.relationship)}>
                            {broker.relationship}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{broker.lastContact}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleContactBroker(broker.id, 'email')}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleContactBroker(broker.id, 'phone')}
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(broker.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications">
          <Card>
            <CardHeader>
              <CardTitle>Recent Communications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communications.map((comm) => (
                  <div key={comm.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                        {getCommunicationIcon(comm.type)}
                      </div>
                      <div>
                        <h4 className="font-medium">{comm.subject}</h4>
                        <p className="text-sm text-muted-foreground">{comm.brokerName}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>{comm.date} at {comm.time}</span>
                          <Badge variant="outline" className="capitalize">
                            {comm.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Broker Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Performance analytics coming soon</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Track broker performance, payment history, and relationship metrics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrokerRelationsPage;
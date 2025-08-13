import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  TestTube,
  CheckCircle,
  XCircle,
  Upload
} from 'lucide-react';

export const EDISetup: React.FC = () => {
  const { toast } = useToast();
  const [newConnection, setNewConnection] = useState({
    name: '',
    host: '',
    port: '',
    username: '',
    password: '',
    protocol: 'SFTP'
  });

  const connections = [
    {
      id: 1,
      name: 'ABC Logistics SFTP',
      host: 'edi.abclogistics.com',
      port: '22',
      protocol: 'SFTP',
      status: 'active',
      lastTest: '2024-06-17 09:30',
      testResult: 'success'
    },
    {
      id: 2,
      name: 'XYZ Transport FTP',
      host: 'ftp.xyztransport.com',
      port: '21',
      protocol: 'FTP',
      status: 'active',
      lastTest: '2024-06-17 08:45',
      testResult: 'success'
    },
    {
      id: 3,
      name: 'Global Freight AS2',
      host: 'as2.globalfreight.com',
      port: '443',
      protocol: 'AS2',
      status: 'inactive',
      lastTest: '2024-06-16 15:20',
      testResult: 'failed'
    }
  ];

  const mappingRules = [
    {
      id: 1,
      name: 'Standard 210 Mapping',
      documentType: 'EDI 210',
      description: 'Standard invoice mapping for freight bills',
      status: 'active',
      lastModified: '2024-06-15'
    },
    {
      id: 2,
      name: 'Enhanced 214 Mapping',
      documentType: 'EDI 214',
      description: 'Enhanced status update mapping with GPS coordinates',
      status: 'active',
      lastModified: '2024-06-14'
    },
    {
      id: 3,
      name: 'Custom Carrier Mapping',
      documentType: 'EDI 210',
      description: 'Custom mapping for specific carrier requirements',
      status: 'draft',
      lastModified: '2024-06-13'
    }
  ];

  const handleAddConnection = () => {
    if (!newConnection.name || !newConnection.host || !newConnection.port) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Connection Added",
      description: `EDI connection "${newConnection.name}" has been added successfully.`,
    });

    setNewConnection({
      name: '',
      host: '',
      port: '',
      username: '',
      password: '',
      protocol: 'SFTP'
    });
  };

  const handleTestConnection = (id: number) => {
    toast({
      title: "Testing Connection",
      description: "Connection test initiated. Please wait...",
    });

    setTimeout(() => {
      toast({
        title: "Connection Test Complete",
        description: "Connection test completed successfully.",
      });
    }, 2000);
  };

  const handleDeleteConnection = (id: number) => {
    toast({
      title: "Connection Deleted",
      description: "EDI connection has been removed.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getTestResultIcon = (result: string) => {
    return result === 'success' ? 
      <CheckCircle className="h-4 w-4 text-green-600" /> : 
      <XCircle className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">EDI Setup</h1>
          <p className="text-muted-foreground">Configure EDI connections and mapping rules</p>
        </div>
        <Button>
          <Settings className="mr-2 h-4 w-4" />
          Global Settings
        </Button>
      </div>

      <Tabs defaultValue="connections" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="mappings">Mapping Rules</TabsTrigger>
          <TabsTrigger value="settings">Advanced Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="space-y-6">
          {/* Add New Connection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Connection
              </CardTitle>
              <CardDescription>
                Configure a new EDI connection for data exchange
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Connection Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., ABC Logistics SFTP"
                    value={newConnection.name}
                    onChange={(e) => setNewConnection({...newConnection, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="protocol">Protocol</Label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={newConnection.protocol}
                    onChange={(e) => setNewConnection({...newConnection, protocol: e.target.value})}
                  >
                    <option value="SFTP">SFTP</option>
                    <option value="FTP">FTP</option>
                    <option value="AS2">AS2</option>
                    <option value="HTTP">HTTP</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="host">Host *</Label>
                  <Input
                    id="host"
                    placeholder="edi.partner.com"
                    value={newConnection.host}
                    onChange={(e) => setNewConnection({...newConnection, host: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">Port *</Label>
                  <Input
                    id="port"
                    placeholder="22"
                    value={newConnection.port}
                    onChange={(e) => setNewConnection({...newConnection, port: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Username"
                    value={newConnection.username}
                    onChange={(e) => setNewConnection({...newConnection, username: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={newConnection.password}
                    onChange={(e) => setNewConnection({...newConnection, password: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddConnection}>
                  <Save className="mr-2 h-4 w-4" />
                  Add Connection
                </Button>
                <Button variant="outline">
                  <TestTube className="mr-2 h-4 w-4" />
                  Test & Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Existing Connections */}
          <Card>
            <CardHeader>
              <CardTitle>Existing Connections</CardTitle>
              <CardDescription>
                Manage your EDI connections and monitor their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Host</TableHead>
                    <TableHead>Protocol</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Test</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {connections.map((connection) => (
                    <TableRow key={connection.id}>
                      <TableCell className="font-medium">{connection.name}</TableCell>
                      <TableCell>{connection.host}:{connection.port}</TableCell>
                      <TableCell>{connection.protocol}</TableCell>
                      <TableCell>{getStatusBadge(connection.status)}</TableCell>
                      <TableCell>{connection.lastTest}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTestResultIcon(connection.testResult)}
                          <span className="capitalize">{connection.testResult}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleTestConnection(connection.id)}>
                            <TestTube className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteConnection(connection.id)}>
                            <Trash2 className="h-4 w-4" />
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

        <TabsContent value="mappings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Document Mapping Rules
              </CardTitle>
              <CardDescription>
                Configure how EDI documents are parsed and mapped to your system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div></div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Mapping
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mappingRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>{rule.documentType}</TableCell>
                      <TableCell>{rule.description}</TableCell>
                      <TableCell>{getStatusBadge(rule.status)}</TableCell>
                      <TableCell>{rule.lastModified}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <TestTube className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
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

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced EDI Settings</CardTitle>
              <CardDescription>
                Configure global EDI processing settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Processing Settings</h3>
                  <div className="space-y-2">
                    <Label htmlFor="batchSize">Batch Processing Size</Label>
                    <Input id="batchSize" defaultValue="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retryAttempts">Retry Attempts</Label>
                    <Input id="retryAttempts" defaultValue="3" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeout">Connection Timeout (seconds)</Label>
                    <Input id="timeout" defaultValue="30" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Notification Settings</h3>
                  <div className="space-y-2">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <Input id="emailNotifications" placeholder="admin@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alertThreshold">Error Alert Threshold</Label>
                    <Input id="alertThreshold" defaultValue="5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reportFrequency">Report Frequency</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
                <Button variant="outline">
                  Reset to Defaults
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

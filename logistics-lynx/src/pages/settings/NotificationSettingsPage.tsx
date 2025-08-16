/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Bell, Mail, Smartphone, MessageSquare, Settings, Clock, AlertTriangle, CheckCircle, Volume2, VolumeX, Calendar, Zap, Filter, Users, Truck, DollarSign, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const NotificationSettingsPage = () => {
  const [notificationVolume, setNotificationVolume] = useState([75]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const notificationCategories = [
    {
      id: 'loads',
      name: 'Load Management',
      icon: Truck,
      color: 'text-blue-600',
      description: 'Notifications about load assignments, updates, and completions',
      notifications: [
        { id: 'load_assigned', name: 'Load Assigned', email: true, push: true, sms: false },
        { id: 'load_completed', name: 'Load Completed', email: true, push: true, sms: true },
        { id: 'load_delayed', name: 'Load Delayed', email: true, push: true, sms: true },
        { id: 'delivery_confirmed', name: 'Delivery Confirmed', email: true, push: false, sms: false }
      ]
    },
    {
      id: 'finance',
      name: 'Financial',
      icon: DollarSign,
      color: 'text-emerald-600',
      description: 'Payment, invoice, and financial transaction alerts',
      notifications: [
        { id: 'payment_received', name: 'Payment Received', email: true, push: true, sms: false },
        { id: 'invoice_overdue', name: 'Invoice Overdue', email: true, push: true, sms: true },
        { id: 'expense_approved', name: 'Expense Approved', email: true, push: false, sms: false },
        { id: 'budget_exceeded', name: 'Budget Exceeded', email: true, push: true, sms: true }
      ]
    },
    {
      id: 'safety',
      name: 'Safety & Compliance',
      icon: Shield,
      color: 'text-red-600',
      description: 'Safety incidents, compliance issues, and regulatory updates',
      notifications: [
        { id: 'safety_incident', name: 'Safety Incident', email: true, push: true, sms: true },
        { id: 'compliance_expiry', name: 'Compliance Expiry', email: true, push: true, sms: true },
        { id: 'inspection_due', name: 'Inspection Due', email: true, push: true, sms: false },
        { id: 'violation_reported', name: 'Violation Reported', email: true, push: true, sms: true }
      ]
    },
    {
      id: 'system',
      name: 'System',
      icon: Settings,
      color: 'text-purple-600',
      description: 'System updates, maintenance, and technical notifications',
      notifications: [
        { id: 'system_maintenance', name: 'System Maintenance', email: true, push: true, sms: false },
        { id: 'backup_completed', name: 'Backup Completed', email: false, push: false, sms: false },
        { id: 'security_alert', name: 'Security Alert', email: true, push: true, sms: true },
        { id: 'update_available', name: 'Update Available', email: true, push: false, sms: false }
      ]
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      type: 'Load Completed',
      message: 'Load #LD-2024-001 has been delivered successfully',
      timestamp: '2 minutes ago',
      priority: 'medium',
      category: 'loads',
      read: false
    },
    {
      id: 2,
      type: 'Payment Received',
      message: 'Payment of $2,450.00 received from ABC Logistics',
      timestamp: '15 minutes ago',
      priority: 'low',
      category: 'finance',
      read: true
    },
    {
      id: 3,
      type: 'Safety Incident',
      message: 'Minor incident reported by Driver #DR-001',
      timestamp: '1 hour ago',
      priority: 'high',
      category: 'safety',
      read: false
    },
    {
      id: 4,
      type: 'System Maintenance',
      message: 'Scheduled maintenance completed successfully',
      timestamp: '3 hours ago',
      priority: 'low',
      category: 'system',
      read: true
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notification Settings</h1>
          <p className="text-muted-foreground">Configure how and when you receive notifications</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Test Notifications
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSoundEnabled(!soundEnabled)}>
            {soundEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
            {soundEnabled ? 'Sounds On' : 'Sounds Off'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="preferences" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="space-y-6">
          {/* Quick Settings */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <Bell className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-sm text-muted-foreground">Active Rules</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/10">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-sm text-muted-foreground">Today's Alerts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-red-500/10">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-muted-foreground">High Priority</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <Volume2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{notificationVolume[0]}%</p>
                    <p className="text-sm text-muted-foreground">Sound Level</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Global Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Global Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Enable All Notifications</Label>
                  <p className="text-xs text-muted-foreground">Turn on/off all notification types</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">Notification Volume</Label>
                <div className="px-3">
                  <Slider
                    value={notificationVolume}
                    onValueChange={setNotificationVolume}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Adjust sound volume for notifications</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Do Not Disturb Mode</Label>
                  <p className="text-xs text-muted-foreground">Silence notifications during specified hours</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Weekend Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive notifications on weekends</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Category Settings */}
          {notificationCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <IconComponent className={`h-5 w-5 ${category.color}`} />
                    </div>
                    <div>
                      <CardTitle>{category.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.notifications.map((notification) => (
                      <div key={notification.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-3 rounded-lg border">
                        <div>
                          <p className="font-medium text-sm">{notification.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <Switch defaultChecked={notification.email} />
                          <span className="text-xs text-muted-foreground">Email</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <Switch defaultChecked={notification.push} />
                          <span className="text-xs text-muted-foreground">Push</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4 text-muted-foreground" />
                          <Switch defaultChecked={notification.sms} />
                          <span className="text-xs text-muted-foreground">SMS</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Email</Label>
                  <Input defaultValue="admin@company.com" />
                </div>
                <div className="space-y-2">
                  <Label>Backup Email</Label>
                  <Input placeholder="backup@company.com" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">HTML Emails</Label>
                    <p className="text-xs text-muted-foreground">Rich formatted email notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Email Digest</Label>
                    <p className="text-xs text-muted-foreground">Daily summary of notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SMS Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Phone</Label>
                  <Input defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label>Backup Phone</Label>
                  <Input placeholder="+1 (555) 987-6543" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">International SMS</Label>
                    <p className="text-xs text-muted-foreground">Allow international SMS delivery</p>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label>SMS Rate Limit</Label>
                  <Select defaultValue="10">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 per hour</SelectItem>
                      <SelectItem value="10">10 per hour</SelectItem>
                      <SelectItem value="20">20 per hour</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">Business Hours</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Start Time</Label>
                      <Input type="time" defaultValue="08:00" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">End Time</Label>
                      <Input type="time" defaultValue="18:00" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label className="text-base font-medium">Time Zone</Label>
                  <Select defaultValue="america-chicago">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-new_york">Eastern Time</SelectItem>
                      <SelectItem value="america-chicago">Central Time</SelectItem>
                      <SelectItem value="america-denver">Mountain Time</SelectItem>
                      <SelectItem value="america-los_angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-base font-medium">Active Days</Label>
                <div className="grid grid-cols-7 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="flex flex-col items-center gap-2">
                      <span className="text-sm font-medium">{day}</span>
                      <Switch defaultChecked={index < 5} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentNotifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{notification.type}</Badge>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="truncate">{notification.message}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{notification.timestamp}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={notification.read ? "outline" : "default"}>
                          {notification.read ? "Read" : "Unread"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationSettingsPage;
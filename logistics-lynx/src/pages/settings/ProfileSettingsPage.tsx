import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { User, Settings, Shield, Bell, Key, MapPin, Phone, Mail, Calendar, Camera, Edit, Trash2, Plus, Save, AlertTriangle, CheckCircle, Clock, Globe, Smartphone, Lock, Eye, EyeOff, CreditCard, FileText, Building, UserCheck, Download, Upload } from 'lucide-react';
import CarrierLayout from '@/components/carrier/CarrierLayout';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  employeeId: string;
  hireDate: string;
  birthDate: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  avatar: string;
  timezone: string;
  language: string;
  status: 'active' | 'inactive' | 'pending';
  permissions: string[];
  twoFactorEnabled: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLogin: string;
  loginAttempts: number;
  accountLocked: boolean;
}

interface SecurityLog {
  id: string;
  action: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  status: 'success' | 'failed' | 'suspicious';
}

interface NotificationSetting {
  id: string;
  category: string;
  description: string;
  email: boolean;
  sms: boolean;
  push: boolean;
  inApp: boolean;
}

const ProfileSettingsPage = () => {
  const [profile, setProfile] = useState<UserProfile>({
    id: 'USR-001',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'Fleet Manager',
    department: 'Operations',
    employeeId: 'EMP-2024-001',
    hireDate: '2024-01-15',
    birthDate: '1985-06-15',
    address: {
      street: '123 Main Street',
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543',
      email: 'jane.smith@email.com'
    },
    avatar: '/placeholder.svg',
    timezone: 'America/Chicago',
    language: 'English',
    status: 'active',
    permissions: ['fleet_management', 'user_management', 'reports'],
    twoFactorEnabled: true,
    emailVerified: true,
    phoneVerified: false,
    lastLogin: '2024-01-20 14:30:00',
    loginAttempts: 0,
    accountLocked: false
  });

  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([
    {
      id: 'LOG-001',
      action: 'Login Successful',
      timestamp: '2024-01-20 14:30:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome 120.0.0.0',
      location: 'Dallas, TX',
      status: 'success'
    },
    {
      id: 'LOG-002',
      action: 'Password Changed',
      timestamp: '2024-01-19 09:15:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome 120.0.0.0',
      location: 'Dallas, TX',
      status: 'success'
    },
    {
      id: 'LOG-003',
      action: 'Failed Login Attempt',
      timestamp: '2024-01-18 16:45:00',
      ipAddress: '203.0.113.0',
      userAgent: 'Unknown',
      location: 'Unknown',
      status: 'failed'
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: 'NOTIF-001',
      category: 'Fleet Updates',
      description: 'Notifications about fleet status changes',
      email: true,
      sms: false,
      push: true,
      inApp: true
    },
    {
      id: 'NOTIF-002',
      category: 'Maintenance Alerts',
      description: 'Vehicle maintenance reminders and alerts',
      email: true,
      sms: true,
      push: true,
      inApp: true
    },
    {
      id: 'NOTIF-003',
      category: 'Security Alerts',
      description: 'Account security and login notifications',
      email: true,
      sms: true,
      push: false,
      inApp: true
    },
    {
      id: 'NOTIF-004',
      category: 'System Updates',
      description: 'Platform updates and announcements',
      email: false,
      sms: false,
      push: false,
      inApp: true
    }
  ]);

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isSecurityDialogOpen, setIsSecurityDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleProfileUpdate = () => {
    toast.success('Profile updated successfully');
    setIsProfileDialogOpen(false);
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwords.new.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    toast.success('Password changed successfully');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // In a real app, you would upload the file to your server
      toast.success('Avatar uploaded successfully');
    }
  };

  const handleTwoFactorToggle = (enabled: boolean) => {
    setProfile(prev => ({ ...prev, twoFactorEnabled: enabled }));
    toast.success(`Two-factor authentication ${enabled ? 'enabled' : 'disabled'}`);
  };

  const handleNotificationChange = (id: string, channel: keyof Omit<NotificationSetting, 'id' | 'category' | 'description'>, value: boolean) => {
    setNotificationSettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { ...setting, [channel]: value }
          : setting
      )
    );
    toast.success('Notification preferences updated');
  };

  const handleDataExport = () => {
    toast.success('Data export initiated. You will receive an email when ready.');
  };

  const handleAccountDeactivation = () => {
    toast.success('Account deactivation request submitted');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"><CheckCircle className="w-3 h-3 mr-1" />Success</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20"><AlertTriangle className="w-3 h-3 mr-1" />Failed</Badge>;
      case 'suspicious':
        return <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"><AlertTriangle className="w-3 h-3 mr-1" />Suspicious</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <CarrierLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account, security, and preferences</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDataExport} className="gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>Update your personal information and preferences</DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback>{profile.firstName[0]}{profile.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" onClick={() => document.getElementById('avatar-upload')?.click()}>
                        <Camera className="h-4 w-4 mr-2" />
                        Change Avatar
                      </Button>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                      />
                      <p className="text-sm text-muted-foreground mt-1">JPG, PNG or GIF (max 2MB)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input 
                        value={profile.firstName} 
                        onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input 
                        value={profile.lastName} 
                        onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <div className="relative">
                        <Input 
                          value={profile.email} 
                          onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        />
                        {profile.emailVerified && (
                          <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <div className="relative">
                        <Input 
                          value={profile.phone} 
                          onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        />
                        {!profile.phoneVerified && (
                          <Button variant="link" size="sm" className="absolute right-0 top-0">
                            Verify
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Job Title</Label>
                      <Input 
                        value={profile.jobTitle} 
                        onChange={(e) => setProfile(prev => ({ ...prev, jobTitle: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Input 
                        value={profile.department} 
                        onChange={(e) => setProfile(prev => ({ ...prev, department: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select value={profile.timezone} onValueChange={(value) => setProfile(prev => ({ ...prev, timezone: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time</SelectItem>
                          <SelectItem value="America/Chicago">Central Time</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select value={profile.language} onValueChange={(value) => setProfile(prev => ({ ...prev, language: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Address Section */}
                  <div>
                    <h4 className="font-medium mb-3">Address Information</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label>Street Address</Label>
                        <Input 
                          value={profile.address.street} 
                          onChange={(e) => setProfile(prev => ({ 
                            ...prev, 
                            address: { ...prev.address, street: e.target.value }
                          }))}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Input 
                            value={profile.address.city} 
                            onChange={(e) => setProfile(prev => ({ 
                              ...prev, 
                              address: { ...prev.address, city: e.target.value }
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>State</Label>
                          <Input 
                            value={profile.address.state} 
                            onChange={(e) => setProfile(prev => ({ 
                              ...prev, 
                              address: { ...prev.address, state: e.target.value }
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>ZIP Code</Label>
                          <Input 
                            value={profile.address.zipCode} 
                            onChange={(e) => setProfile(prev => ({ 
                              ...prev, 
                              address: { ...prev.address, zipCode: e.target.value }
                            }))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div>
                    <h4 className="font-medium mb-3">Emergency Contact</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input 
                          value={profile.emergencyContact.name} 
                          onChange={(e) => setProfile(prev => ({ 
                            ...prev, 
                            emergencyContact: { ...prev.emergencyContact, name: e.target.value }
                          }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Relationship</Label>
                        <Input 
                          value={profile.emergencyContact.relationship} 
                          onChange={(e) => setProfile(prev => ({ 
                            ...prev, 
                            emergencyContact: { ...prev.emergencyContact, relationship: e.target.value }
                          }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input 
                          value={profile.emergencyContact.phone} 
                          onChange={(e) => setProfile(prev => ({ 
                            ...prev, 
                            emergencyContact: { ...prev.emergencyContact, phone: e.target.value }
                          }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input 
                          value={profile.emergencyContact.email} 
                          onChange={(e) => setProfile(prev => ({ 
                            ...prev, 
                            emergencyContact: { ...prev.emergencyContact, email: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsProfileDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleProfileUpdate}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Profile Overview Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback>{profile.firstName[0]}{profile.lastName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
                  <Badge className="bg-emerald-500/10 text-emerald-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {profile.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{profile.jobTitle} • {profile.department}</p>
                <p className="text-sm text-muted-foreground">Employee ID: {profile.employeeId}</p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>Last login: {profile.lastLogin}</p>
                <p>Member since: {profile.hireDate}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal" className="gap-2">
              <User className="h-4 w-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="permissions" className="gap-2">
              <Key className="h-4 w-4" />
              Permissions
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Lock className="h-4 w-4" />
              Privacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Your primary contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">{profile.email}</p>
                      <p className="text-sm text-muted-foreground">
                        {profile.emailVerified ? 'Verified' : 'Unverified'}
                      </p>
                    </div>
                    {profile.emailVerified && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">{profile.phone}</p>
                      <p className="text-sm text-muted-foreground">
                        {profile.phoneVerified ? 'Verified' : 'Unverified'}
                      </p>
                    </div>
                    {!profile.phoneVerified && (
                      <Button variant="outline" size="sm">Verify</Button>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{profile.address.street}</p>
                      <p className="text-sm text-muted-foreground">
                        {profile.address.city}, {profile.address.state} {profile.address.zipCode}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Employment Information</CardTitle>
                  <CardDescription>Your job details and company information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{profile.jobTitle}</p>
                      <p className="text-sm text-muted-foreground">{profile.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Employee ID</p>
                      <p className="text-sm text-muted-foreground">{profile.employeeId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Hire Date</p>
                      <p className="text-sm text-muted-foreground">{profile.hireDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                  <CardDescription>Your emergency contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">{profile.emergencyContact.name}</p>
                    <p className="text-sm text-muted-foreground">{profile.emergencyContact.relationship}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{profile.emergencyContact.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{profile.emergencyContact.email}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Your account preferences and settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Timezone</p>
                      <p className="text-sm text-muted-foreground">{profile.timezone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Language</p>
                      <p className="text-sm text-muted-foreground">{profile.language}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password Settings</CardTitle>
                  <CardDescription>Manage your account password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <div className="relative">
                      <Input 
                        type={showPasswords.current ? 'text' : 'password'}
                        value={passwords.current}
                        onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                        placeholder="Enter current password"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                      >
                        {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <div className="relative">
                      <Input 
                        type={showPasswords.new ? 'text' : 'password'}
                        value={passwords.new}
                        onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                        placeholder="Enter new password"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                      >
                        {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <div className="relative">
                      <Input 
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwords.confirm}
                        onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                        placeholder="Confirm new password"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                      >
                        {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button onClick={handlePasswordChange} className="w-full">
                    Change Password
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        {profile.twoFactorEnabled 
                          ? 'Your account is protected with 2FA' 
                          : 'Secure your account with 2FA'}
                      </p>
                    </div>
                    <Switch 
                      checked={profile.twoFactorEnabled} 
                      onCheckedChange={handleTwoFactorToggle}
                    />
                  </div>
                  {profile.twoFactorEnabled && (
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        View Backup Codes
                      </Button>
                      <Button variant="outline" className="w-full">
                        Regenerate Codes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Security Activity</CardTitle>
                  <CardDescription>Recent security events for your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Action</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {securityLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{log.action}</TableCell>
                          <TableCell>{log.timestamp}</TableCell>
                          <TableCell>{log.ipAddress}</TableCell>
                          <TableCell>{log.location}</TableCell>
                          <TableCell>{getStatusBadge(log.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>SMS</TableHead>
                      <TableHead>Push</TableHead>
                      <TableHead>In-App</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notificationSettings.map((setting) => (
                      <TableRow key={setting.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{setting.category}</p>
                            <p className="text-sm text-muted-foreground">{setting.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Switch 
                            checked={setting.email} 
                            onCheckedChange={(checked) => handleNotificationChange(setting.id, 'email', checked)}
                          />
                        </TableCell>
                        <TableCell>
                          <Switch 
                            checked={setting.sms} 
                            onCheckedChange={(checked) => handleNotificationChange(setting.id, 'sms', checked)}
                          />
                        </TableCell>
                        <TableCell>
                          <Switch 
                            checked={setting.push} 
                            onCheckedChange={(checked) => handleNotificationChange(setting.id, 'push', checked)}
                          />
                        </TableCell>
                        <TableCell>
                          <Switch 
                            checked={setting.inApp} 
                            onCheckedChange={(checked) => handleNotificationChange(setting.id, 'inApp', checked)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Permissions</CardTitle>
                <CardDescription>Your current account permissions and access levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.permissions.map((permission) => (
                    <div key={permission} className="flex items-center gap-3 p-3 rounded-lg border">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="font-medium capitalize">{permission.replace('_', ' ')}</p>
                        <p className="text-sm text-muted-foreground">
                          Access to {permission.replace('_', ' ').toLowerCase()} features
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    If you need additional permissions, please contact your system administrator.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data & Privacy</CardTitle>
                  <CardDescription>Manage your data and privacy settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={handleDataExport} className="w-full justify-start gap-2">
                    <Download className="h-4 w-4" />
                    Export My Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <FileText className="h-4 w-4" />
                    View Privacy Policy
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Shield className="h-4 w-4" />
                    Data Processing Agreement
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Management</CardTitle>
                  <CardDescription>Manage your account status and settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Account created: {profile.hireDate}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Last updated: {new Date().toISOString().split('T')[0]}
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        Deactivate Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Deactivate Account</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to deactivate your account? This action will require administrator approval to reverse.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleAccountDeactivation}>
                          Deactivate
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CarrierLayout>
  );
};

export default ProfileSettingsPage;
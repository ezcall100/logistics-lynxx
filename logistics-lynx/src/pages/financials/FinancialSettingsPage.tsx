import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building, 
  CreditCard, 
  DollarSign,
  Settings,
  Shield,
  Bell,
  Users,
  Save,
  Edit,
  Trash2,
  Plus,
  Lock,
  Globe,
  Smartphone,
  FileText,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FinancialSettingsPage = () => {
  const [settings, setSettings] = useState({
    autoApproval: true,
    emailNotifications: true,
    smsAlerts: false,
    multiCurrency: false,
    requireApproval: true,
    dailyLimit: 50000,
    currency: 'USD',
    timeZone: 'EST'
  });

  const [isEditing, setIsEditing] = useState({
    account: null,
    payment: null
  });

  const { toast } = useToast();

  const bankAccounts = [
    { 
      id: 1, 
      name: 'Primary Business Account', 
      bank: 'Chase Bank', 
      accountNumber: '****1234', 
      routingNumber: '021000021',
      balance: 245000, 
      type: 'Checking',
      status: 'active',
      isDefault: true
    },
    { 
      id: 2, 
      name: 'Payroll Account', 
      bank: 'Wells Fargo', 
      accountNumber: '****5678', 
      routingNumber: '121000248',
      balance: 89000, 
      type: 'Checking',
      status: 'active',
      isDefault: false
    },
    { 
      id: 3, 
      name: 'Tax Savings Account', 
      bank: 'Bank of America', 
      accountNumber: '****9012', 
      routingNumber: '026009593',
      balance: 156000, 
      type: 'Savings',
      status: 'active',
      isDefault: false
    }
  ];

  const paymentMethods = [
    { 
      id: 1, 
      type: 'Credit Card', 
      name: 'Business Visa', 
      number: '****4567', 
      expiry: '12/26', 
      provider: 'Visa',
      status: 'active',
      isDefault: true
    },
    { 
      id: 2, 
      type: 'ACH', 
      name: 'Direct Deposit', 
      bank: 'Chase Bank', 
      accountNumber: '****1234',
      status: 'active',
      isDefault: false
    },
    { 
      id: 3, 
      type: 'Wire Transfer', 
      name: 'International Payments', 
      provider: 'SWIFT',
      status: 'active',
      isDefault: false
    }
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' }
  ];

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Financial settings have been updated successfully.",
    });
  };

  const handleEditAccount = (accountId: number) => {
    setIsEditing({ ...isEditing, account: accountId });
  };

  const handleDeleteAccount = (accountId: number) => {
    toast({
      title: "Account Removed",
      description: "Bank account has been removed from your financial settings.",
      variant: "destructive"
    });
  };

  const handleAddAccount = () => {
    toast({
      title: "Add Bank Account",
      description: "Opening account setup wizard...",
    });
  };

  const handleSetDefault = (type: string, id: number) => {
    toast({
      title: "Default Updated",
      description: `${type} has been set as the default payment method.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Settings</h1>
          <p className="text-muted-foreground">Configure banking, payment methods, and financial preferences</p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      {/* Settings Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-blue-50">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <Badge variant="outline">{bankAccounts.length} Accounts</Badge>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Bank Accounts</h3>
              <p className="text-sm text-muted-foreground">Connected accounts</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-green-50">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <Badge variant="outline">{paymentMethods.length} Methods</Badge>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Payment Methods</h3>
              <p className="text-sm text-muted-foreground">Payment options</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-purple-50">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <Badge variant="default">{settings.currency}</Badge>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Currency</h3>
              <p className="text-sm text-muted-foreground">Base currency</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-orange-50">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <Badge variant="default">Secured</Badge>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Security</h3>
              <p className="text-sm text-muted-foreground">Protected access</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="accounts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="accounts">Bank Accounts</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Bank Accounts</CardTitle>
                  <CardDescription>Manage your business bank accounts for payments and deposits</CardDescription>
                </div>
                <Button onClick={handleAddAccount}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Account
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bankAccounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-blue-50">
                        <Building className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{account.name}</p>
                          {account.isDefault && <Badge variant="default" className="text-xs">Default</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {account.bank} • {account.accountNumber} • {account.type}
                        </p>
                        <p className="text-sm font-medium">${account.balance.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(account.status)}
                      <div className="flex gap-2">
                        {!account.isDefault && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSetDefault('Account', account.id)}
                          >
                            Set Default
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditAccount(account.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteAccount(account.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Configure payment processing options and default methods</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Method
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-green-50">
                        <CreditCard className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{method.name}</p>
                          {method.isDefault && <Badge variant="default" className="text-xs">Default</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {method.type} • {method.number || method.bank || method.provider}
                          {method.expiry && ` • Expires ${method.expiry}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(method.status)}
                      <div className="flex gap-2">
                        {!method.isDefault && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSetDefault('Payment Method', method.id)}
                          >
                            Set Default
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Preferences</CardTitle>
                <CardDescription>Configure automated payment settings and limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-approve payments under $1,000</p>
                    <p className="text-sm text-muted-foreground">Automatically approve small payments</p>
                  </div>
                  <Switch 
                    checked={settings.autoApproval}
                    onCheckedChange={(checked) => setSettings({...settings, autoApproval: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Require approval for large payments</p>
                    <p className="text-sm text-muted-foreground">Manual approval for payments over daily limit</p>
                  </div>
                  <Switch 
                    checked={settings.requireApproval}
                    onCheckedChange={(checked) => setSettings({...settings, requireApproval: checked})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Daily Payment Limit</label>
                  <Input 
                    type="number" 
                    value={settings.dailyLimit}
                    onChange={(e) => setSettings({...settings, dailyLimit: parseInt(e.target.value)})}
                    placeholder="Enter daily limit"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Base Currency</label>
                  <Select value={settings.currency} onValueChange={(value) => setSettings({...settings, currency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.name} ({currency.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure alerts and notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-medium">Email notifications</p>
                      <p className="text-sm text-muted-foreground">Receive email alerts for transactions</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="font-medium">SMS alerts</p>
                      <p className="text-sm text-muted-foreground">Get text alerts for large transactions</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.smsAlerts}
                    onCheckedChange={(checked) => setSettings({...settings, smsAlerts: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="font-medium">Multi-currency support</p>
                      <p className="text-sm text-muted-foreground">Enable multiple currency handling</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.multiCurrency}
                    onCheckedChange={(checked) => setSettings({...settings, multiCurrency: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Features</CardTitle>
                <CardDescription>Manage financial security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Enhanced security for financial operations</p>
                      </div>
                    </div>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">Configure</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Session Timeout</p>
                        <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                      </div>
                    </div>
                    <Badge variant="outline">30 min</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">Adjust</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium">User Permissions</p>
                        <p className="text-sm text-muted-foreground">Control who can access financial data</p>
                      </div>
                    </div>
                    <Badge variant="outline">5 Users</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">Manage</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit & Compliance</CardTitle>
                <CardDescription>Monitor access and maintain compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-50">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Audit Logs</p>
                      <p className="text-sm text-muted-foreground">Track all financial system access</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">View Logs</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Compliance Status</p>
                      <p className="text-sm text-muted-foreground">SOX, PCI DSS compliance monitoring</p>
                    </div>
                  </div>
                  <Badge variant="default" className="mt-3">Compliant</Badge>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-orange-50">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium">Risk Assessment</p>
                      <p className="text-sm text-muted-foreground">Automated risk monitoring</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">View Report</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialSettingsPage;
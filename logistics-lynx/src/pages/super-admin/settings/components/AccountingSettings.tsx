/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Calculator, 
  DollarSign, 
  FileText, 
  Plus, 
  Edit,
  Trash2,
  Save,
  Building,
  Percent,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AccountingSettings = () => {
  const { toast } = useToast();
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [accountingConfig, setAccountingConfig] = useState({
    fiscalYearStart: '01',
    defaultCurrency: 'USD',
    taxCalculationMethod: 'accrual',
    autoReconciliation: true,
    requireApproval: true,
    defaultPaymentTerms: 'net-30',
    lateFeePercentage: '1.5',
    discountTerms: '2/10',
    retentionPeriod: '7'
  });

  const [chartOfAccounts, setChartOfAccounts] = useState([
    {
      id: '1000',
      name: 'Cash',
      type: 'Asset',
      category: 'Current Assets',
      description: 'Cash in bank accounts',
      balance: 125000,
      isActive: true
    },
    {
      id: '1200',
      name: 'Accounts Receivable',
      type: 'Asset',
      category: 'Current Assets',
      description: 'Money owed by customers',
      balance: 45000,
      isActive: true
    },
    {
      id: '2000',
      name: 'Accounts Payable',
      type: 'Liability',
      category: 'Current Liabilities',
      description: 'Money owed to vendors',
      balance: 23000,
      isActive: true
    },
    {
      id: '3000',
      name: 'Owner\'s Equity',
      type: 'Equity',
      category: 'Owner\'s Equity',
      description: 'Owner investment in business',
      balance: 200000,
      isActive: true
    },
    {
      id: '4000',
      name: 'Software Revenue',
      type: 'Revenue',
      category: 'Operating Revenue',
      description: 'Revenue from software licenses',
      balance: 750000,
      isActive: true
    },
    {
      id: '5000',
      name: 'Salaries Expense',
      type: 'Expense',
      category: 'Operating Expenses',
      description: 'Employee salaries and wages',
      balance: 450000,
      isActive: true
    }
  ]);

  const [taxSettings, setTaxSettings] = useState([
    {
      id: '1',
      name: 'Federal Income Tax',
      type: 'Income Tax',
      rate: '21.0',
      jurisdiction: 'Federal',
      isActive: true
    },
    {
      id: '2',
      name: 'California State Tax',
      type: 'State Tax',
      rate: '8.84',
      jurisdiction: 'California',
      isActive: true
    },
    {
      id: '3',
      name: 'Sales Tax',
      type: 'Sales Tax',
      rate: '8.25',
      jurisdiction: 'California',
      isActive: true
    },
    {
      id: '4',
      name: 'Payroll Tax',
      type: 'Payroll Tax',
      rate: '15.3',
      jurisdiction: 'Federal',
      isActive: true
    }
  ]);

  const handleConfigChange = (field: string, value: string | boolean) => {
    setAccountingConfig(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Accounting settings saved',
        description: 'All accounting configurations have been updated successfully.',
      });
      setHasChanges(false);
    } catch (error) {
      toast({
        title: 'Error saving settings',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAccountTypeBadge = (type: string) => {
    const variants = {
      'Asset': 'default',
      'Liability': 'destructive',
      'Equity': 'secondary',
      'Revenue': 'default',
      'Expense': 'outline'
    } as const;
    
    return (
      <Badge variant={variants[type as keyof typeof variants] || 'outline'}>
        {type}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* General Accounting Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            General Accounting Configuration
          </CardTitle>
          <CardDescription>
            Core accounting settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fiscalYearStart">Fiscal Year Start</Label>
              <Select value={accountingConfig.fiscalYearStart} onValueChange={(value) => handleConfigChange('fiscalYearStart', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="01">January</SelectItem>
                  <SelectItem value="04">April</SelectItem>
                  <SelectItem value="07">July</SelectItem>
                  <SelectItem value="10">October</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="defaultCurrency">Default Currency</Label>
              <Select value={accountingConfig.defaultCurrency} onValueChange={(value) => handleConfigChange('defaultCurrency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxCalculationMethod">Tax Calculation Method</Label>
              <Select value={accountingConfig.taxCalculationMethod} onValueChange={(value) => handleConfigChange('taxCalculationMethod', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="accrual">Accrual</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Automatic Reconciliation</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically reconcile bank transactions
                </p>
              </div>
              <Switch
                checked={accountingConfig.autoReconciliation}
                onCheckedChange={(checked) => handleConfigChange('autoReconciliation', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Approval for Large Transactions</Label>
                <p className="text-sm text-muted-foreground">
                  Require manager approval for transactions over $5,000
                </p>
              </div>
              <Switch
                checked={accountingConfig.requireApproval}
                onCheckedChange={(checked) => handleConfigChange('requireApproval', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Terms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Payment Terms & Policies
          </CardTitle>
          <CardDescription>
            Default payment terms and fee structures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="defaultPaymentTerms">Default Payment Terms</Label>
              <Select value={accountingConfig.defaultPaymentTerms} onValueChange={(value) => handleConfigChange('defaultPaymentTerms', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="due-on-receipt">Due on Receipt</SelectItem>
                  <SelectItem value="net-15">Net 15</SelectItem>
                  <SelectItem value="net-30">Net 30</SelectItem>
                  <SelectItem value="net-45">Net 45</SelectItem>
                  <SelectItem value="net-60">Net 60</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lateFeePercentage">Late Fee (%)</Label>
              <div className="relative">
                <Input
                  id="lateFeePercentage"
                  type="number"
                  step="0.1"
                  value={accountingConfig.lateFeePercentage}
                  onChange={(e) => handleConfigChange('lateFeePercentage', e.target.value)}
                />
                <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountTerms">Early Payment Discount</Label>
              <Input
                id="discountTerms"
                value={accountingConfig.discountTerms}
                onChange={(e) => handleConfigChange('discountTerms', e.target.value)}
                placeholder="2/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="retentionPeriod">Data Retention (Years)</Label>
              <Select value={accountingConfig.retentionPeriod} onValueChange={(value) => handleConfigChange('retentionPeriod', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 years</SelectItem>
                  <SelectItem value="5">5 years</SelectItem>
                  <SelectItem value="7">7 years</SelectItem>
                  <SelectItem value="10">10 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart of Accounts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Chart of Accounts
            </CardTitle>
            <CardDescription>
              Manage your accounting categories and account structure
            </CardDescription>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account #</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chartOfAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-mono">{account.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-sm text-muted-foreground">{account.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getAccountTypeBadge(account.type)}
                  </TableCell>
                  <TableCell>{account.category}</TableCell>
                  <TableCell className="font-mono">
                    {formatCurrency(account.balance)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={account.isActive ? 'default' : 'secondary'}>
                      {account.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
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

      {/* Tax Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Tax Configuration
            </CardTitle>
            <CardDescription>
              Manage tax rates and jurisdictions
            </CardDescription>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Tax Rate
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tax Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxSettings.map((tax) => (
                <TableRow key={tax.id}>
                  <TableCell className="font-medium">{tax.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{tax.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {tax.rate}%
                    </div>
                  </TableCell>
                  <TableCell>{tax.jurisdiction}</TableCell>
                  <TableCell>
                    <Badge variant={tax.isActive ? 'default' : 'secondary'}>
                      {tax.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            Export Chart of Accounts
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Saving...
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save All Settings
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountingSettings;
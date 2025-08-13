import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  CreditCard, 
  Users, 
  DollarSign, 
  Clock, 
  Trophy, 
  FileText, 
  Plus, 
  Edit,
  Trash2,
  Save,
  Bot,
  Building,
  UserCheck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PayrollSettings = () => {
  const { toast } = useToast();
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [payrollConfig, setPayrollConfig] = useState({
    defaultFrequency: 'bi-weekly',
    companyContribution401k: '4',
    healthInsurancePremium: '150',
    autoPayrollEnabled: true,
    overtimeMultiplier: '1.5',
    payrollProcessingDay: 'friday',
    minimumWage: '15.00',
    maxHoursPerWeek: '40'
  });

  // Mock data for different worker types
  const [payStructures, setPayStructures] = useState([
    {
      id: '1',
      title: 'Senior Software Engineer',
      type: 'salary',
      amount: '95000',
      frequency: 'annually',
      department: 'Engineering',
      benefits: true,
      overtime: false
    },
    {
      id: '2',
      title: 'Support Agent',
      type: 'hourly',
      amount: '22.00',
      frequency: 'hourly',
      department: 'Customer Success',
      benefits: true,
      overtime: true
    },
    {
      id: '3',
      title: 'Sales Representative',
      type: 'commission',
      amount: '45000',
      frequency: 'annually',
      commission: '8',
      department: 'Sales',
      benefits: true,
      overtime: false
    },
    {
      id: '4',
      title: 'AI Agent - Data Processing',
      type: 'ai-token',
      amount: '0.02',
      frequency: 'per-operation',
      department: 'AI Operations',
      benefits: false,
      overtime: false
    },
    {
      id: '5',
      title: 'Freelance Designer',
      type: 'project',
      amount: '75.00',
      frequency: 'hourly',
      department: 'Design',
      benefits: false,
      overtime: false
    }
  ]);

  const [employees, setEmployees] = useState([
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Senior Software Engineer',
      classification: 'full-time',
      payType: 'salary',
      amount: '$95,000',
      department: 'Engineering',
      hireDate: '2023-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      role: 'Support Agent',
      classification: 'part-time',
      payType: 'hourly',
      amount: '$22.00/hr',
      department: 'Customer Success',
      hireDate: '2023-06-10',
      status: 'active'
    },
    {
      id: '3',
      name: 'AI-Agent-001',
      role: 'Data Processing Agent',
      classification: 'ai-agent',
      payType: 'ai-token',
      amount: '$0.02/op',
      department: 'AI Operations',
      hireDate: '2024-01-01',
      status: 'active'
    },
    {
      id: '4',
      name: 'Jennifer Wu',
      role: 'Freelance Designer',
      classification: 'contractor',
      payType: 'project',
      amount: '$75.00/hr',
      department: 'Design',
      hireDate: '2023-09-20',
      status: 'active'
    }
  ]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Payroll settings saved',
        description: 'All payroll configurations have been updated successfully.',
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

  const getPayTypeIcon = (type: string) => {
    switch (type) {
      case 'salary': return <Building className="h-4 w-4" />;
      case 'hourly': return <Clock className="h-4 w-4" />;
      case 'commission': return <Trophy className="h-4 w-4" />;
      case 'ai-token': return <Bot className="h-4 w-4" />;
      case 'project': return <FileText className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const getClassificationBadge = (classification: string) => {
    const variants = {
      'full-time': 'default',
      'part-time': 'secondary',
      'contractor': 'outline',
      'ai-agent': 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[classification as keyof typeof variants] || 'outline'}>
        {classification.replace('-', ' ')}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="structures" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Pay Structures
          </TabsTrigger>
          <TabsTrigger value="employees" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Employees
          </TabsTrigger>
          <TabsTrigger value="benefits" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Benefits
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Compliance
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payroll Configuration
                <Badge variant="secondary">Software Company</Badge>
              </CardTitle>
              <CardDescription>
                Core payroll settings for Trans Bot AI team including executives, developers, support agents, contractors, and AI agents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultFrequency">Default Pay Frequency</Label>
                  <Select value={payrollConfig.defaultFrequency} onValueChange={(value) => setPayrollConfig(prev => ({ ...prev, defaultFrequency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="semi-monthly">Semi-monthly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payrollProcessingDay">Processing Day</Label>
                  <Select value={payrollConfig.payrollProcessingDay} onValueChange={(value) => setPayrollConfig(prev => ({ ...prev, payrollProcessingDay: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="tuesday">Tuesday</SelectItem>
                      <SelectItem value="wednesday">Wednesday</SelectItem>
                      <SelectItem value="thursday">Thursday</SelectItem>
                      <SelectItem value="friday">Friday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minimumWage">Minimum Wage</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="minimumWage"
                      type="number"
                      step="0.25"
                      value={payrollConfig.minimumWage}
                      onChange={(e) => setPayrollConfig(prev => ({ ...prev, minimumWage: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>Automatic Payroll Processing</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically process payroll on scheduled dates
                  </p>
                </div>
                <Switch
                  checked={payrollConfig.autoPayrollEnabled}
                  onCheckedChange={(checked) => setPayrollConfig(prev => ({ ...prev, autoPayrollEnabled: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Users className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-sm text-muted-foreground">Total Employees</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Bot className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">250</p>
                    <p className="text-sm text-muted-foreground">AI Agents</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">$1.2M</p>
                    <p className="text-sm text-muted-foreground">Monthly Payroll</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Trophy className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold">$180K</p>
                    <p className="text-sm text-muted-foreground">Benefits Cost</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pay Structures Tab */}
        <TabsContent value="structures" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pay Structure Templates</CardTitle>
                <CardDescription>
                  Define compensation models for different roles and worker types
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Structure
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Title</TableHead>
                    <TableHead>Pay Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Benefits</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payStructures.map((structure) => (
                    <TableRow key={structure.id}>
                      <TableCell className="font-medium">{structure.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getPayTypeIcon(structure.type)}
                          <Badge variant="outline">
                            {structure.type.replace('-', ' ')}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {structure.amount}
                          {structure.commission && ` + ${structure.commission}%`}
                          <span className="text-xs text-muted-foreground">
                            /{structure.frequency}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{structure.department}</TableCell>
                      <TableCell>
                        {structure.benefits ? (
                          <Badge variant="default">Eligible</Badge>
                        ) : (
                          <Badge variant="secondary">Not Eligible</Badge>
                        )}
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
        </TabsContent>

        {/* Employees Tab */}
        <TabsContent value="employees" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Employee Directory</CardTitle>
                <CardDescription>
                  Manage individual employee payroll information
                </CardDescription>
              </div>
              <Button>
                <UserCheck className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Classification</TableHead>
                    <TableHead>Pay Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Hire Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.role}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getClassificationBadge(employee.classification)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getPayTypeIcon(employee.payType)}
                          {employee.payType.replace('-', ' ')}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">{employee.amount}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.hireDate}</TableCell>
                      <TableCell>
                        <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
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

        {/* Benefits Tab */}
        <TabsContent value="benefits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Benefits Package Configuration</CardTitle>
              <CardDescription>
                Setup company benefits for eligible employees
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Retirement Benefits</h4>
                  <div className="space-y-2">
                    <Label htmlFor="company401k">Company 401(k) Match (%)</Label>
                    <div className="relative">
                      <Input
                        id="company401k"
                        type="number"
                        step="0.5"
                        max="10"
                        value={payrollConfig.companyContribution401k}
                        onChange={(e) => setPayrollConfig(prev => ({ ...prev, companyContribution401k: e.target.value }))}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Health Insurance</h4>
                  <div className="space-y-2">
                    <Label htmlFor="healthPremium">Monthly Premium Contribution</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="healthPremium"
                        type="number"
                        value={payrollConfig.healthInsurancePremium}
                        onChange={(e) => setPayrollConfig(prev => ({ ...prev, healthInsurancePremium: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Additional Benefits</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Professional Development</h5>
                        <p className="text-sm text-muted-foreground">$2,000 annual allowance</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Remote Work Stipend</h5>
                        <p className="text-sm text-muted-foreground">$500 monthly home office</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Flexible PTO</h5>
                        <p className="text-sm text-muted-foreground">Unlimited paid time off</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Stock Options</h5>
                        <p className="text-sm text-muted-foreground">Equity participation</p>
                      </div>
                      <Switch />
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax & Compliance Settings</CardTitle>
              <CardDescription>
                Configure tax withholdings and compliance requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Tax Configuration</h4>
                  <div className="space-y-2">
                    <Label>Federal Tax Rate</Label>
                    <Input value="22%" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>State Tax Rate</Label>
                    <Input value="6.5%" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Social Security Rate</Label>
                    <Input value="6.2%" disabled />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Compliance Documents</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span>W-4 Forms</span>
                      <Badge variant="default">Complete</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span>I-9 Verification</span>
                      <Badge variant="default">Complete</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span>Direct Deposit Forms</span>
                      <Badge variant="secondary">Pending (3)</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Integration Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="text-center space-y-2">
                      <FileText className="h-8 w-8 mx-auto text-blue-500" />
                      <h5 className="font-medium">QuickBooks</h5>
                      <Badge variant="default">Connected</Badge>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center space-y-2">
                      <Users className="h-8 w-8 mx-auto text-green-500" />
                      <h5 className="font-medium">Gusto</h5>
                      <Badge variant="outline">Not Connected</Badge>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center space-y-2">
                      <Building className="h-8 w-8 mx-auto text-purple-500" />
                      <h5 className="font-medium">Deel</h5>
                      <Badge variant="outline">Not Connected</Badge>
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <Card>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            Export Configuration
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
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

export default PayrollSettings;
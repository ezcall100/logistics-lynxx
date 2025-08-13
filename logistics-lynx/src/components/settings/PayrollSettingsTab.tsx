
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DollarSign, Calendar, Users, Settings, Plus, Edit, Trash2, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PayrollSchedule {
  id: string;
  name: string;
  frequency: string;
  nextPayDate: string;
  employeeCount: number;
  status: 'active' | 'inactive';
}

interface TaxSetting {
  id: string;
  taxType: string;
  rate: number;
  jurisdiction: string;
  isActive: boolean;
}

const PayrollSettingsTab = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    defaultPayFrequency: 'bi-weekly',
    overtimeThreshold: '40',
    overtimeRate: '1.5',
    autoCalculateTaxes: true,
    directDepositEnabled: true,
    payStubEmailEnabled: true,
    timesheetApprovalRequired: true,
    defaultWorkWeekStart: 'monday',
    fiscalYearStart: 'january',
    roundingMethod: 'nearest_minute'
  });

  const [payrollSchedules] = useState<PayrollSchedule[]>([
    {
      id: '1',
      name: 'Standard Bi-Weekly',
      frequency: 'bi-weekly',
      nextPayDate: '2024-01-26',
      employeeCount: 45,
      status: 'active'
    },
    {
      id: '2',
      name: 'Executive Monthly',
      frequency: 'monthly',
      nextPayDate: '2024-01-31',
      employeeCount: 8,
      status: 'active'
    },
    {
      id: '3',
      name: 'Driver Weekly',
      frequency: 'weekly',
      nextPayDate: '2024-01-19',
      employeeCount: 32,
      status: 'active'
    }
  ]);

  const [taxSettings] = useState<TaxSetting[]>([
    { id: '1', taxType: 'Federal Income Tax', rate: 22.0, jurisdiction: 'Federal', isActive: true },
    { id: '2', taxType: 'Social Security', rate: 6.2, jurisdiction: 'Federal', isActive: true },
    { id: '3', taxType: 'Medicare', rate: 1.45, jurisdiction: 'Federal', isActive: true },
    { id: '4', taxType: 'California State Tax', rate: 9.3, jurisdiction: 'CA', isActive: true },
    { id: '5', taxType: 'CA SDI', rate: 1.1, jurisdiction: 'CA', isActive: true },
    { id: '6', taxType: 'FUTA', rate: 0.6, jurisdiction: 'Federal', isActive: true }
  ]);

  const handleSave = () => {
    toast({
      title: "Payroll Settings Saved",
      description: "Payroll configuration has been updated successfully.",
    });
  };

  const getFrequencyBadge = (frequency: string) => {
    const colors = {
      'weekly': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'bi-weekly': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'monthly': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    };
    return colors[frequency as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Payroll Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Employees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85</div>
            <p className="text-xs text-muted-foreground">Active payroll</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Next Payroll
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jan 26</div>
            <p className="text-xs text-muted-foreground">5 days remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Monthly Payroll
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$485K</div>
            <p className="text-xs text-muted-foreground">Gross wages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Processing Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
            <p className="text-xs text-muted-foreground">Average duration</p>
          </CardContent>
        </Card>
      </div>

      {/* General Payroll Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            General Payroll Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="payFrequency">Default Pay Frequency</Label>
              <Select
                value={settings.defaultPayFrequency}
                onValueChange={(value) => setSettings({...settings, defaultPayFrequency: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                  <SelectItem value="semi-monthly">Semi-Monthly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="workWeekStart">Work Week Start Day</Label>
              <Select
                value={settings.defaultWorkWeekStart}
                onValueChange={(value) => setSettings({...settings, defaultWorkWeekStart: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunday">Sunday</SelectItem>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="tuesday">Tuesday</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="overtimeThreshold">Overtime Threshold (hours/week)</Label>
              <Input
                id="overtimeThreshold"
                type="number"
                value={settings.overtimeThreshold}
                onChange={(e) => setSettings({...settings, overtimeThreshold: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="overtimeRate">Overtime Rate Multiplier</Label>
              <Input
                id="overtimeRate"
                type="number"
                step="0.1"
                value={settings.overtimeRate}
                onChange={(e) => setSettings({...settings, overtimeRate: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fiscalYearStart">Fiscal Year Start</Label>
              <Select
                value={settings.fiscalYearStart}
                onValueChange={(value) => setSettings({...settings, fiscalYearStart: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january">January</SelectItem>
                  <SelectItem value="april">April</SelectItem>
                  <SelectItem value="july">July</SelectItem>
                  <SelectItem value="october">October</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="roundingMethod">Time Rounding Method</Label>
              <Select
                value={settings.roundingMethod}
                onValueChange={(value) => setSettings({...settings, roundingMethod: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exact">Exact Time</SelectItem>
                  <SelectItem value="nearest_minute">Nearest Minute</SelectItem>
                  <SelectItem value="nearest_5_minutes">Nearest 5 Minutes</SelectItem>
                  <SelectItem value="nearest_15_minutes">Nearest 15 Minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Automation Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Calculate Taxes</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically calculate federal and state taxes
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoCalculateTaxes}
                    onCheckedChange={(checked) => setSettings({...settings, autoCalculateTaxes: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Direct Deposit</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable direct deposit for employees
                    </p>
                  </div>
                  <Switch
                    checked={settings.directDepositEnabled}
                    onCheckedChange={(checked) => setSettings({...settings, directDepositEnabled: checked})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Pay Stubs</Label>
                    <p className="text-sm text-muted-foreground">
                      Send pay stubs via email automatically
                    </p>
                  </div>
                  <Switch
                    checked={settings.payStubEmailEnabled}
                    onCheckedChange={(checked) => setSettings({...settings, payStubEmailEnabled: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Timesheet Approval</Label>
                    <p className="text-sm text-muted-foreground">
                      Require manager approval for timesheets
                    </p>
                  </div>
                  <Switch
                    checked={settings.timesheetApprovalRequired}
                    onCheckedChange={(checked) => setSettings({...settings, timesheetApprovalRequired: checked})}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Schedules */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Payroll Schedules
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Schedule
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Payroll Schedule</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Schedule Name</Label>
                    <Input defaultValue="Contract Workers Weekly" />
                  </div>
                  <div className="space-y-2">
                    <Label>Pay Frequency</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Next Pay Date</Label>
                    <Input type="date" defaultValue="2024-01-26" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Create Schedule</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Schedule Name</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Next Pay Date</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollSchedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell className="font-medium">{schedule.name}</TableCell>
                    <TableCell>
                      <Badge className={getFrequencyBadge(schedule.frequency)}>
                        {schedule.frequency.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{schedule.nextPayDate}</TableCell>
                    <TableCell>{schedule.employeeCount}</TableCell>
                    <TableCell>
                      <Badge className={schedule.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {schedule.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Tax Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Tax Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tax Type</TableHead>
                  <TableHead>Rate (%)</TableHead>
                  <TableHead>Jurisdiction</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taxSettings.map((tax) => (
                  <TableRow key={tax.id}>
                    <TableCell className="font-medium">{tax.taxType}</TableCell>
                    <TableCell>{tax.rate}%</TableCell>
                    <TableCell>{tax.jurisdiction}</TableCell>
                    <TableCell>
                      <Badge className={tax.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {tax.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">
          Reset to Defaults
        </Button>
        <Button onClick={handleSave}>
          Save Payroll Settings
        </Button>
      </div>
    </div>
  );
};

export default PayrollSettingsTab;

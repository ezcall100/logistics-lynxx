import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import UltraModernLayout from '@/components/layout/UltraModernLayout';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Play,
  FileText,
  Calculator,
  Clock,
  Shield,
  Download
} from 'lucide-react';

const RunPayrollPage = () => {
  const { toast } = useToast();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [payrollStatus, setPayrollStatus] = useState<'ready' | 'processing' | 'completed'>('ready');

  const employees = [
    { id: '1', name: 'John Smith', position: 'Driver', hoursWorked: 80, hourlyRate: 22.50, grossPay: 1800, taxes: 360, netPay: 1440, benefits: 150 },
    { id: '2', name: 'Sarah Johnson', position: 'Dispatcher', hoursWorked: 80, hourlyRate: 18.00, grossPay: 1440, taxes: 288, netPay: 1152, benefits: 120 },
    { id: '3', name: 'Mike Davis', position: 'Mechanic', hoursWorked: 85, hourlyRate: 25.00, grossPay: 2125, taxes: 425, netPay: 1700, benefits: 180 },
    { id: '4', name: 'Lisa Chen', position: 'Office Manager', hoursWorked: 80, hourlyRate: 24.00, grossPay: 1920, taxes: 384, netPay: 1536, benefits: 160 },
    { id: '5', name: 'Robert Wilson', position: 'Driver', hoursWorked: 82, hourlyRate: 23.00, grossPay: 1886, taxes: 377, netPay: 1509, benefits: 155 }
  ];

  const payrollSummary = {
    totalEmployees: employees.length,
    totalHours: employees.reduce((sum, emp) => sum + emp.hoursWorked, 0),
    totalGrossPay: employees.reduce((sum, emp) => sum + emp.grossPay, 0),
    totalTaxes: employees.reduce((sum, emp) => sum + emp.taxes, 0),
    totalBenefits: employees.reduce((sum, emp) => sum + emp.benefits, 0),
    totalNetPay: employees.reduce((sum, emp) => sum + emp.netPay, 0),
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleSelectEmployee = (employeeId: string, checked: boolean) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    }
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === employees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employees.map(emp => emp.id));
    }
  };

  const handleRunPayroll = () => {
    if (selectedEmployees.length === 0) {
      toast({
        title: "No employees selected",
        description: "Please select at least one employee to process payroll.",
        variant: "destructive"
      });
      return;
    }

    setPayrollStatus('processing');
    
    // Simulate payroll processing
    setTimeout(() => {
      setPayrollStatus('completed');
      toast({
        title: "Payroll processed successfully",
        description: `Processed payroll for ${selectedEmployees.length} employees.`,
      });
    }, 3000);
  };

  const resetPayroll = () => {
    setPayrollStatus('ready');
    setSelectedEmployees([]);
  };

  return (
    <UltraModernLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Run Payroll</h1>
            <p className="text-muted-foreground">Process employee payroll for the current pay period</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Preview Reports
            </Button>
            {payrollStatus === 'completed' && (
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Paystubs
              </Button>
            )}
          </div>
        </div>

        {/* Status Alert */}
        {payrollStatus === 'processing' && (
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              Processing payroll... This may take a few minutes.
            </AlertDescription>
          </Alert>
        )}

        {payrollStatus === 'completed' && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Payroll has been processed successfully. Paystubs are ready for download.
            </AlertDescription>
          </Alert>
        )}

        {/* Payroll Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Employees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{payrollSummary.totalEmployees}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Total Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{payrollSummary.totalHours}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Gross Pay
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-purple-800">{formatCurrency(payrollSummary.totalGrossPay)}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-700 flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Taxes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-orange-800">{formatCurrency(payrollSummary.totalTaxes)}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-indigo-700 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-indigo-800">{formatCurrency(payrollSummary.totalBenefits)}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-emerald-700 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Net Pay
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-emerald-800">{formatCurrency(payrollSummary.totalNetPay)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Employee List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Employee Payroll Details
              </CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="select-all"
                    checked={selectedEmployees.length === employees.length}
                    onCheckedChange={handleSelectAll}
                    disabled={payrollStatus === 'processing'}
                  />
                  <Label htmlFor="select-all" className="text-sm font-medium">
                    Select All ({selectedEmployees.length} of {employees.length} selected)
                  </Label>
                </div>
                <Button 
                  onClick={payrollStatus === 'completed' ? resetPayroll : handleRunPayroll}
                  disabled={payrollStatus === 'processing'}
                  variant={payrollStatus === 'completed' ? 'outline' : 'default'}
                >
                  {payrollStatus === 'processing' && <Clock className="h-4 w-4 mr-2 animate-spin" />}
                  {payrollStatus === 'ready' && <Play className="h-4 w-4 mr-2" />}
                  {payrollStatus === 'completed' && <Calendar className="h-4 w-4 mr-2" />}
                  {payrollStatus === 'ready' && 'Run Payroll'}
                  {payrollStatus === 'processing' && 'Processing...'}
                  {payrollStatus === 'completed' && 'New Payroll'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Select</th>
                    <th className="text-left p-3 font-medium">Employee</th>
                    <th className="text-left p-3 font-medium">Position</th>
                    <th className="text-center p-3 font-medium">Hours</th>
                    <th className="text-center p-3 font-medium">Rate</th>
                    <th className="text-right p-3 font-medium">Gross Pay</th>
                    <th className="text-right p-3 font-medium">Taxes</th>
                    <th className="text-right p-3 font-medium">Benefits</th>
                    <th className="text-right p-3 font-medium">Net Pay</th>
                    <th className="text-center p-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id} className="border-b hover:bg-muted/50">
                      <td className="p-3">
                        <Checkbox
                          checked={selectedEmployees.includes(employee.id)}
                          onCheckedChange={(checked) => handleSelectEmployee(employee.id, checked as boolean)}
                          disabled={payrollStatus === 'processing'}
                        />
                      </td>
                      <td className="p-3 font-medium">{employee.name}</td>
                      <td className="p-3 text-muted-foreground">{employee.position}</td>
                      <td className="p-3 text-center">{employee.hoursWorked}</td>
                      <td className="p-3 text-center">${employee.hourlyRate.toFixed(2)}</td>
                      <td className="p-3 text-right font-medium">{formatCurrency(employee.grossPay)}</td>
                      <td className="p-3 text-right text-red-600">{formatCurrency(employee.taxes)}</td>
                      <td className="p-3 text-right text-blue-600">{formatCurrency(employee.benefits)}</td>
                      <td className="p-3 text-right font-bold text-green-600">{formatCurrency(employee.netPay)}</td>
                      <td className="p-3 text-center">
                        {payrollStatus === 'completed' && selectedEmployees.includes(employee.id) ? (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Processed
                          </Badge>
                        ) : payrollStatus === 'processing' && selectedEmployees.includes(employee.id) ? (
                          <Badge variant="secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            Processing
                          </Badge>
                        ) : (
                          <Badge variant="outline">Pending</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Processing Instructions */}
        {payrollStatus === 'ready' && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Before Running Payroll
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-blue-700">
                <div>
                  <h4 className="font-medium mb-2">✓ Pre-Payroll Checklist:</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Review all employee timesheets</li>
                    <li>Verify hourly rates and salaries</li>
                    <li>Check for unknown pay adjustments</li>
                    <li>Confirm benefit deductions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">⚠️ Important Notes:</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Payroll processing cannot be undone</li>
                    <li>Tax withholdings are automatically calculated</li>
                    <li>Direct deposits will be initiated immediately</li>
                    <li>Paystubs will be generated upon completion</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </UltraModernLayout>
  );
};

export default RunPayrollPage;
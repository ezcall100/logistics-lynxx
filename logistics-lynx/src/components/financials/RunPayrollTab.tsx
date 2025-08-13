
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, DollarSign, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RunPayrollTabProps {
  searchTerm: string;
}

export function RunPayrollTab({ searchTerm }: RunPayrollTabProps) {
  const { toast } = useToast();

  const handleRunPayroll = () => {
    toast({
      title: "Payroll Started",
      description: "Payroll processing has been initiated for this period.",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Run Payroll</h2>

      {/* Payroll Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pay Period</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jan 16-31, 2024</div>
            <p className="text-xs text-muted-foreground">Bi-weekly payroll</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Active employees</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$89,300</div>
            <p className="text-xs text-muted-foreground">Gross payroll</p>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Review Timesheets</h3>
              <p className="text-sm text-muted-foreground">Verify all employee timesheets for the pay period</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800">23 Approved</Badge>
              <Button variant="outline" size="sm">Review</Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Calculate Deductions</h3>
              <p className="text-sm text-muted-foreground">Calculate taxes, benefits, and other deductions</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Ready</Badge>
              <Button variant="outline" size="sm">Calculate</Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Generate Pay Stubs</h3>
              <p className="text-sm text-muted-foreground">Create pay stubs for all employees</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Pending</Badge>
              <Button variant="outline" size="sm">Generate</Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
            <div>
              <h3 className="font-medium">Run Payroll</h3>
              <p className="text-sm text-muted-foreground">Process payroll for the current pay period</p>
            </div>
            <Button onClick={handleRunPayroll} className="bg-blue-600 hover:bg-blue-700">
              <Play className="mr-2 h-4 w-4" />
              Run Payroll
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Gross Wages:</span>
                <span className="font-medium">$89,300</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Federal Tax:</span>
                <span className="font-medium">$12,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">State Tax:</span>
                <span className="font-medium">$4,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Social Security:</span>
                <span className="font-medium">$5,537</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Medicare:</span>
                <span className="font-medium">$1,295</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Benefits:</span>
                <span className="font-medium">$8,400</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Other Deductions:</span>
                <span className="font-medium">$2,100</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Net Pay:</span>
                <span className="font-bold">$55,268</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

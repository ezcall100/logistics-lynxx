
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Check, X, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Timesheet {
  id: string;
  employeeName: string;
  employeeId: string;
  weekEnding: string;
  regularHours: number;
  overtimeHours: number;
  totalHours: number;
  status: 'pending' | 'approved' | 'rejected';
}

interface TimesheetsTabProps {
  searchTerm: string;
}

export function TimesheetsTab({ searchTerm }: TimesheetsTabProps) {
  const { toast } = useToast();
  const [timesheets, setTimesheets] = useState<Timesheet[]>([
    {
      id: '1',
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      weekEnding: '2024-01-21',
      regularHours: 40,
      overtimeHours: 8,
      totalHours: 48,
      status: 'pending'
    },
    {
      id: '2',
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP002',
      weekEnding: '2024-01-21',
      regularHours: 40,
      overtimeHours: 0,
      totalHours: 40,
      status: 'approved'
    },
    {
      id: '3',
      employeeName: 'Mike Wilson',
      employeeId: 'EMP003',
      weekEnding: '2024-01-21',
      regularHours: 38,
      overtimeHours: 4,
      totalHours: 42,
      status: 'pending'
    }
  ]);

  const filteredTimesheets = timesheets.filter(timesheet =>
    timesheet.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    timesheet.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleApprove = (id: string) => {
    setTimesheets(timesheets.map(timesheet =>
      timesheet.id === id ? { ...timesheet, status: 'approved' } : timesheet
    ));
    toast({
      title: "Timesheet Approved",
      description: "Timesheet has been approved successfully.",
    });
  };

  const handleReject = (id: string) => {
    setTimesheets(timesheets.map(timesheet =>
      timesheet.id === id ? { ...timesheet, status: 'rejected' } : timesheet
    ));
    toast({
      title: "Timesheet Rejected",
      description: "Timesheet has been rejected.",
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Timesheets</h2>

      <Card>
        <CardHeader>
          <CardTitle>Timesheet Approval</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Week Ending</TableHead>
                <TableHead>Regular Hours</TableHead>
                <TableHead>OT Hours</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTimesheets.map((timesheet) => (
                <TableRow key={timesheet.id}>
                  <TableCell className="font-medium">{timesheet.employeeName}</TableCell>
                  <TableCell className="font-mono">{timesheet.employeeId}</TableCell>
                  <TableCell>{new Date(timesheet.weekEnding).toLocaleDateString()}</TableCell>
                  <TableCell>{timesheet.regularHours}</TableCell>
                  <TableCell>{timesheet.overtimeHours}</TableCell>
                  <TableCell className="font-medium">{timesheet.totalHours}</TableCell>
                  <TableCell>{getStatusBadge(timesheet.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {timesheet.status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleApprove(timesheet.id)}
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleReject(timesheet.id)}
                          >
                            <X className="h-4 w-4 text-red-600" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

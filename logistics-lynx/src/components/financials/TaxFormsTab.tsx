
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
import { Plus, Download, Send, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TaxForm {
  id: string;
  formType: string;
  year: number;
  employee?: string;
  status: 'pending' | 'completed' | 'submitted';
  dueDate: string;
  completedDate?: string;
}

interface TaxFormsTabProps {
  searchTerm: string;
}

export function TaxFormsTab({ searchTerm }: TaxFormsTabProps) {
  const { toast } = useToast();
  const [taxForms] = useState<TaxForm[]>([
    {
      id: '1',
      formType: 'W-2',
      year: 2023,
      employee: 'John Smith',
      status: 'completed',
      dueDate: '2024-01-31',
      completedDate: '2024-01-15'
    },
    {
      id: '2',
      formType: 'W-2',
      year: 2023,
      employee: 'Sarah Johnson',
      status: 'completed',
      dueDate: '2024-01-31',
      completedDate: '2024-01-15'
    },
    {
      id: '3',
      formType: '1099-NEC',
      year: 2023,
      employee: 'Mike Wilson',
      status: 'pending',
      dueDate: '2024-01-31'
    },
    {
      id: '4',
      formType: '941',
      year: 2023,
      status: 'submitted',
      dueDate: '2024-01-31',
      completedDate: '2024-01-25'
    }
  ]);

  const filteredForms = taxForms.filter(form =>
    form.formType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (form.employee && form.employee.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'submitted':
        return <Badge className="bg-green-100 text-green-800">Submitted</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleSubmitForm = (form: TaxForm) => {
    toast({
      title: "Form Submitted",
      description: `${form.formType} has been submitted successfully.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tax Forms</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Generate Forms
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tax Forms Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Form Type</TableHead>
                <TableHead>Tax Year</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Completed Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredForms.map((form) => (
                <TableRow key={form.id}>
                  <TableCell className="font-medium">{form.formType}</TableCell>
                  <TableCell>{form.year}</TableCell>
                  <TableCell>{form.employee || 'Company'}</TableCell>
                  <TableCell>{getStatusBadge(form.status)}</TableCell>
                  <TableCell>{new Date(form.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {form.completedDate ? new Date(form.completedDate).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      {form.status === 'completed' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleSubmitForm(form)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
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

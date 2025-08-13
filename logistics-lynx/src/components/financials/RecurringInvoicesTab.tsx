
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Play, Pause, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RecurringInvoice {
  id: string;
  customer: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'yearly';
  status: 'active' | 'paused' | 'cancelled';
  nextInvoiceDate: string;
  lastInvoiceDate: string;
  description: string;
}

interface RecurringInvoicesTabProps {
  searchTerm: string;
}

export function RecurringInvoicesTab({ searchTerm }: RecurringInvoicesTabProps) {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [recurringInvoices, setRecurringInvoices] = useState<RecurringInvoice[]>([
    {
      id: '1',
      customer: 'ABC Logistics',
      amount: 15000,
      frequency: 'monthly',
      status: 'active',
      nextInvoiceDate: '2024-02-01',
      lastInvoiceDate: '2024-01-01',
      description: 'Monthly freight services'
    },
    {
      id: '2',
      customer: 'Global Shipping Co.',
      amount: 25000,
      frequency: 'quarterly',
      status: 'active',
      nextInvoiceDate: '2024-04-01',
      lastInvoiceDate: '2024-01-01',
      description: 'Quarterly shipping contract'
    },
    {
      id: '3',
      customer: 'Fast Delivery Inc.',
      amount: 8500,
      frequency: 'monthly',
      status: 'paused',
      nextInvoiceDate: '2024-03-01',
      lastInvoiceDate: '2023-12-01',
      description: 'Monthly delivery services'
    }
  ]);

  const [formData, setFormData] = useState({
    customer: '',
    amount: '',
    frequency: 'monthly',
    description: ''
  });

  const filteredRecurringInvoices = recurringInvoices.filter(invoice =>
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-100 text-yellow-800">Paused</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleCreate = () => {
    const newRecurringInvoice: RecurringInvoice = {
      id: String(recurringInvoices.length + 1),
      customer: formData.customer,
      amount: parseFloat(formData.amount),
      frequency: formData.frequency as 'monthly' | 'quarterly' | 'yearly',
      status: 'active',
      nextInvoiceDate: '2024-02-01',
      lastInvoiceDate: '2024-01-01',
      description: formData.description
    };
    setRecurringInvoices([...recurringInvoices, newRecurringInvoice]);
    setFormData({ customer: '', amount: '', frequency: 'monthly', description: '' });
    setIsCreateDialogOpen(false);
    toast({
      title: "Recurring Invoice Created",
      description: "Recurring invoice has been created successfully.",
    });
  };

  const toggleStatus = (id: string) => {
    setRecurringInvoices(recurringInvoices.map(invoice =>
      invoice.id === id
        ? { ...invoice, status: invoice.status === 'active' ? 'paused' : 'active' }
        : invoice
    ));
    toast({
      title: "Status Updated",
      description: "Recurring invoice status has been updated.",
    });
  };

  const handleDelete = (id: string) => {
    setRecurringInvoices(recurringInvoices.filter(invoice => invoice.id !== id));
    toast({
      title: "Recurring Invoice Deleted",
      description: "Recurring invoice has been deleted successfully.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Recurring Invoices</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Recurring Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Recurring Invoice</DialogTitle>
              <DialogDescription>
                Set up a recurring invoice for regular billing.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Input
                    id="customer"
                    value={formData.customer}
                    onChange={(e) => setFormData({...formData, customer: e.target.value})}
                    placeholder="Customer name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={formData.frequency} onValueChange={(value) => setFormData({...formData, frequency: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Invoice description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate}>Create Recurring Invoice</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recurring Invoice List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Invoice</TableHead>
                <TableHead>Last Invoice</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecurringInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.customer}</TableCell>
                  <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                  <TableCell className="capitalize">{invoice.frequency}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>{new Date(invoice.nextInvoiceDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(invoice.lastInvoiceDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleStatus(invoice.id)}
                      >
                        {invoice.status === 'active' ? 
                          <Pause className="h-4 w-4" /> : 
                          <Play className="h-4 w-4" />
                        }
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(invoice.id)}
                      >
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
    </div>
  );
}

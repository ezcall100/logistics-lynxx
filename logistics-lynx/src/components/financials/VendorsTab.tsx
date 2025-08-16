/* eslint-disable @typescript-eslint/no-explicit-any */

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
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Vendor {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  totalBills: number;
  outstandingAmount: number;
  status: 'active' | 'inactive';
}

interface VendorsTabProps {
  searchTerm: string;
}

export function VendorsTab({ searchTerm }: VendorsTabProps) {
  const { toast } = useToast();
  const [vendors] = useState<Vendor[]>([
    {
      id: '1',
      name: 'Fuel Express',
      contact: 'John Smith',
      email: 'john@fuelexpress.com',
      phone: '(555) 123-4567',
      totalBills: 24,
      outstandingAmount: 8500,
      status: 'active'
    },
    {
      id: '2',
      name: 'Maintenance Pro',
      contact: 'Sarah Johnson',
      email: 'sarah@maintenancepro.com',
      phone: '(555) 234-5678',
      totalBills: 12,
      outstandingAmount: 3200,
      status: 'active'
    },
    {
      id: '3',
      name: 'Insurance Co.',
      contact: 'Mike Wilson',
      email: 'mike@insuranceco.com',
      phone: '(555) 345-6789',
      totalBills: 4,
      outstandingAmount: 0,
      status: 'active'
    }
  ]);

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === 'active' ? 
      <Badge className="bg-green-100 text-green-800">Active</Badge> :
      <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Vendors</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Vendor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Total Bills</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell>{vendor.contact}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.phone}</TableCell>
                  <TableCell>{vendor.totalBills}</TableCell>
                  <TableCell className={vendor.outstandingAmount > 0 ? "text-red-600" : "text-green-600"}>
                    ${vendor.outstandingAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
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
    </div>
  );
}

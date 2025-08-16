/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, Trash2, MoreHorizontal, Phone, Mail, MapPin } from 'lucide-react';
import { WorkerTableSkeleton } from './WorkerTableSkeleton';

interface Worker {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department?: string;
  status: 'active' | 'inactive' | 'on_leave';
  hireDate: string;
  salary?: number;
  location?: string;
  avatar?: string;
  licenseNumber?: string;
  vehicleAssigned?: string;
  territory?: string;
  performance?: number;
}

interface WorkerTableProps {
  workers: Worker[];
  workerType: string;
  onEdit: (worker: Worker) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export const WorkerTable = ({ workers, workerType, onEdit, onDelete, loading }: WorkerTableProps) => {
  if (loading) {
    return <WorkerTableSkeleton />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'inactive':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'on_leave':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatSalary = (salary?: number) => {
    if (!salary) return 'N/A';
    return `$${salary.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const renderSpecificColumns = (worker: Worker) => {
    switch (workerType) {
      case 'executive':
        return (
          <>
            <TableCell className="font-medium">{worker.department}</TableCell>
            <TableCell>{formatSalary(worker.salary)}</TableCell>
          </>
        );
      case 'employee':
        return (
          <>
            <TableCell>{worker.department}</TableCell>
            <TableCell>{worker.location}</TableCell>
          </>
        );
      case 'drivers':
        return (
          <>
            <TableCell>{worker.licenseNumber}</TableCell>
            <TableCell>{worker.vehicleAssigned || 'Unassigned'}</TableCell>
          </>
        );
      case 'agents':
        return (
          <>
            <TableCell>{worker.territory}</TableCell>
            <TableCell>{worker.performance ? `${worker.performance}%` : 'N/A'}</TableCell>
          </>
        );
      default:
        return null;
    }
  };

  const getSpecificHeaders = () => {
    switch (workerType) {
      case 'executive':
        return ['Department', 'Salary'];
      case 'employee':
        return ['Department', 'Location'];
      case 'drivers':
        return ['License #', 'Vehicle'];
      case 'agents':
        return ['Territory', 'Performance'];
      default:
        return [];
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Worker</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Hire Date</TableHead>
            {getSpecificHeaders().map(header => (
              <TableHead key={header}>{header}</TableHead>
            ))}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7 + getSpecificHeaders().length} className="text-center py-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-muted-foreground">No workers found</div>
                  <div className="text-sm text-muted-foreground">
                    Try adjusting your search or filters
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            workers.map((worker) => (
              <TableRow key={worker.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={worker.avatar} />
                      <AvatarFallback>{getInitials(worker.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{worker.name}</div>
                      <div className="text-sm text-muted-foreground">ID: {worker.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3" />
                      {worker.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3" />
                      {worker.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{worker.role}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`${getStatusColor(worker.status)} border font-medium`}>
                    {worker.status === 'on_leave' ? 'On Leave' : worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(worker.hireDate)}</TableCell>
                {renderSpecificColumns(worker)}
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(worker)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(worker.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

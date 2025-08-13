
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ChevronDown, Trash2, UserCheck, UserX, Clock } from 'lucide-react';

interface UserBulkActionsProps {
  selectedCount: number;
  onBulkDelete: () => Promise<void>;
  onBulkStatusUpdate: (status: 'active' | 'inactive' | 'pending') => Promise<void>;
  disabled?: boolean;
}

export const UserBulkActions = ({ 
  selectedCount, 
  onBulkDelete, 
  onBulkStatusUpdate, 
  disabled = false 
}: UserBulkActionsProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {selectedCount} user{selectedCount > 1 ? 's' : ''} selected
      </span>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" disabled={disabled}>
            Bulk Actions
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            onClick={() => onBulkStatusUpdate('active')}
            className="text-green-600"
          >
            <UserCheck className="mr-2 h-4 w-4" />
            Set Active
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onBulkStatusUpdate('inactive')}
            className="text-orange-600"
          >
            <UserX className="mr-2 h-4 w-4" />
            Set Inactive
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onBulkStatusUpdate('pending')}
            className="text-yellow-600"
          >
            <Clock className="mr-2 h-4 w-4" />
            Set Pending
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem 
                onSelect={(e) => e.preventDefault()}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Selected
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete {selectedCount} user{selectedCount > 1 ? 's' : ''} 
                  and all associated data. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={onBulkDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete {selectedCount} User{selectedCount > 1 ? 's' : ''}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

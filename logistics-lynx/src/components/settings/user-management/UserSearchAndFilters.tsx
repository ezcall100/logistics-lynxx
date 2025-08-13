
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { UserBulkActions } from '../UserBulkActions';

interface UserSearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCount: number;
  onBulkDelete: () => Promise<void>;
  onBulkStatusUpdate: (status: 'active' | 'inactive' | 'pending') => Promise<void>;
  disabled?: boolean;
}

export const UserSearchAndFilters = ({
  searchTerm,
  onSearchChange,
  selectedCount,
  onBulkDelete,
  onBulkStatusUpdate,
  disabled = false,
}: UserSearchAndFiltersProps) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name, email, or role..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-80"
          />
        </div>
      </div>
      <UserBulkActions
        selectedCount={selectedCount}
        onBulkDelete={onBulkDelete}
        onBulkStatusUpdate={onBulkStatusUpdate}
        disabled={disabled}
      />
    </div>
  );
};

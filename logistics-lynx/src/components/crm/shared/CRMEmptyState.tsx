/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, LucideIcon } from 'lucide-react';

interface CRMEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  showAddButton?: boolean;
  onAddClick?: () => void;
  addButtonText?: string;
}

export const CRMEmptyState: React.FC<CRMEmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  showAddButton = false,
  onAddClick,
  addButtonText = "Add First Item"
}) => {
  return (
    <div className="text-center py-12">
      <Icon className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-2 text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      {showAddButton && onAddClick && (
        <div className="mt-4">
          <Button onClick={onAddClick}>
            <Plus className="mr-2 h-4 w-4" />
            {addButtonText}
          </Button>
        </div>
      )}
    </div>
  );
};

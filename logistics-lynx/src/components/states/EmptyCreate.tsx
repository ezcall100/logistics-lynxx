/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Plus, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyCreateProps {
  title?: string;
  description?: string;
  onCreate?: () => void;
  className?: string;
}

export function EmptyCreate({ 
  title = 'No items found', 
  description = 'Get started by creating your first item.',
  onCreate,
  className 
}: EmptyCreateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      <Package className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-md">{description}</p>
      {onCreate && (
        <Button onClick={onCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Create New
        </Button>
      )}
    </div>
  );
}

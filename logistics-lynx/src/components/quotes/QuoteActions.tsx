/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Plus, RefreshCw, GitCompare } from 'lucide-react';

interface QuoteActionsProps {
  selectedCount: number;
  onCompare: () => void;
  onExport: () => void;
  onRefresh: () => void;
  onNewQuote: () => void;
}

export const QuoteActions: React.FC<QuoteActionsProps> = ({
  selectedCount,
  onCompare,
  onExport,
  onRefresh,
  onNewQuote
}) => {
  return (
    <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-2">
      {selectedCount >= 2 && (
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={onCompare}
        >
          <GitCompare className="h-4 w-4" />
          Compare ({selectedCount})
        </Button>
      )}
      
      <Button variant="outline" className="flex items-center gap-2" onClick={onExport}>
        <Download className="h-4 w-4" />
        Export
      </Button>
      
      <Button variant="outline" className="flex items-center gap-2" onClick={onRefresh}>
        <RefreshCw className="h-4 w-4" />
        Refresh
      </Button>
      
      <Button className="flex items-center gap-2" onClick={onNewQuote}>
        <Plus className="h-4 w-4" />
        New Quote
      </Button>
    </div>
  );
};

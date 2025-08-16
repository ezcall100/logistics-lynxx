/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { QuoteTableRow } from './QuoteTableRow';

interface Quote {
  id: string;
  quoteNumber: string;
  customer: string;
  origin: string;
  destination: string;
  loadType: string;
  weight: string;
  date: string;
  expiryDate: string;
  amount: number;
  status: 'pending' | 'approved' | 'declined' | 'expired';
  aiConfidence: number;
}

interface QuoteTableProps {
  quotes: Quote[];
  selectedQuotes: string[];
  onQuoteSelection: (quoteId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onEdit: (quoteId: string) => void;
  onDelete: (quoteId: string) => void;
  onView: (quoteId: string) => void;
}

export const QuoteTable: React.FC<QuoteTableProps> = ({
  quotes,
  selectedQuotes,
  onQuoteSelection,
  onSelectAll,
  onEdit,
  onDelete,
  onView
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedQuotes.length === quotes.length && quotes.length > 0}
                onCheckedChange={onSelectAll}
                aria-label="Select all quotes"
              />
            </TableHead>
            <TableHead>Quote #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Load Details</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>AI Score</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes.map((quote) => (
            <QuoteTableRow
              key={quote.id}
              quote={quote}
              isSelected={selectedQuotes.includes(quote.id)}
              onSelection={onQuoteSelection}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

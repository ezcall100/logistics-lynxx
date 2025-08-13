
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';

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

interface QuoteTableRowProps {
  quote: Quote;
  isSelected: boolean;
  onSelection: (quoteId: string, checked: boolean) => void;
  onEdit: (quoteId: string) => void;
  onDelete: (quoteId: string) => void;
  onView: (quoteId: string) => void;
}

export const QuoteTableRow: React.FC<QuoteTableRowProps> = ({
  quote,
  isSelected,
  onSelection,
  onEdit,
  onDelete,
  onView
}) => {
  const getStatusBadge = (status: Quote['status']) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      declined: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      expired: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    };
    
    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getConfidenceBadge = (confidence: number) => {
    let color = 'bg-red-100 text-red-800';
    if (confidence >= 90) color = 'bg-green-100 text-green-800';
    else if (confidence >= 80) color = 'bg-yellow-100 text-yellow-800';
    
    return (
      <Badge className={color}>
        {confidence}% AI
      </Badge>
    );
  };

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell>
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelection(quote.id, checked as boolean)}
          aria-label={`Select quote ${quote.quoteNumber}`}
        />
      </TableCell>
      <TableCell className="font-medium">
        {quote.quoteNumber}
      </TableCell>
      <TableCell>
        <div>
          <div className="font-medium">{quote.customer}</div>
          <div className="text-sm text-muted-foreground">
            Created: {quote.date}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <div className="text-sm">
            <span className="font-medium">From:</span> {quote.origin}
          </div>
          <div className="text-sm">
            <span className="font-medium">To:</span> {quote.destination}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <div className="text-sm font-medium">{quote.loadType}</div>
          <div className="text-sm text-muted-foreground">{quote.weight}</div>
        </div>
      </TableCell>
      <TableCell className="font-bold text-green-600">
        ${quote.amount.toLocaleString()}
      </TableCell>
      <TableCell>
        {getStatusBadge(quote.status)}
      </TableCell>
      <TableCell>
        {getConfidenceBadge(quote.aiConfidence)}
      </TableCell>
      <TableCell className="text-sm">
        {quote.expiryDate}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(quote.id)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(quote.id)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Quote
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(quote.id)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};


import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  X, 
  TrendingUp, 
  TrendingDown,
  Minus
} from 'lucide-react';

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

interface QuoteComparisonProps {
  quotes: Quote[];
  isOpen: boolean;
  onClose: () => void;
  onSelectionChange: (selectedIds: string[]) => void;
}

export const QuoteComparison: React.FC<QuoteComparisonProps> = ({
  quotes,
  isOpen,
  onClose,
  onSelectionChange
}) => {
  const removeQuote = (quoteId: string) => {
    const updatedSelection = quotes.filter(q => q.id !== quoteId).map(q => q.id);
    onSelectionChange(updatedSelection);
    
    if (updatedSelection.length < 2) {
      onClose();
    }
  };

  const exportComparison = () => {
    const csvData = quotes.map(quote => ({
      'Quote Number': quote.quoteNumber,
      'Customer': quote.customer,
      'Route': `${quote.origin} → ${quote.destination}`,
      'Load Type': quote.loadType,
      'Weight': quote.weight,
      'Amount': `$${quote.amount.toLocaleString()}`,
      'Status': quote.status,
      'AI Confidence': `${quote.aiConfidence}%`,
      'Created': quote.date,
      'Expires': quote.expiryDate
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quote-comparison-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

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

  const getPriceComparison = (currentAmount: number, allAmounts: number[]) => {
    const minAmount = Math.min(...allAmounts);
    const maxAmount = Math.max(...allAmounts);
    
    if (currentAmount === minAmount && currentAmount !== maxAmount) {
      return <TrendingDown className="h-4 w-4 text-green-600" />;
    }
    if (currentAmount === maxAmount && currentAmount !== minAmount) {
      return <TrendingUp className="h-4 w-4 text-red-600" />;
    }
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const allAmounts = quotes.map(q => q.amount);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Quote Comparison ({quotes.length} quotes)
            </DialogTitle>
            <Button variant="outline" onClick={exportComparison} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
          {quotes.map((quote) => (
            <Card key={quote.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {quote.quoteNumber}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQuote(quote.id)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  {quote.customer}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Price with comparison indicator */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      ${quote.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Amount</div>
                  </div>
                  <div className="flex items-center">
                    {getPriceComparison(quote.amount, allAmounts)}
                  </div>
                </div>

                <Separator />

                {/* Route Information */}
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Route</div>
                  <div className="text-sm">
                    <div><span className="font-medium">From:</span> {quote.origin}</div>
                    <div><span className="font-medium">To:</span> {quote.destination}</div>
                  </div>
                </div>

                {/* Load Details */}
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Load Details</div>
                  <div className="text-sm">
                    <div><span className="font-medium">Type:</span> {quote.loadType}</div>
                    <div><span className="font-medium">Weight:</span> {quote.weight}</div>
                  </div>
                </div>

                {/* Status and AI Confidence */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Status</div>
                    {getStatusBadge(quote.status)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">AI Score</div>
                    {getConfidenceBadge(quote.aiConfidence)}
                  </div>
                </div>

                {/* Dates */}
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Important Dates</div>
                  <div className="text-sm">
                    <div><span className="font-medium">Created:</span> {quote.date}</div>
                    <div><span className="font-medium">Expires:</span> {quote.expiryDate}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-3">Comparison Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-medium text-muted-foreground">Price Range</div>
              <div>${Math.min(...allAmounts).toLocaleString()} - ${Math.max(...allAmounts).toLocaleString()}</div>
            </div>
            <div>
              <div className="font-medium text-muted-foreground">Price Difference</div>
              <div>${(Math.max(...allAmounts) - Math.min(...allAmounts)).toLocaleString()}</div>
            </div>
            <div>
              <div className="font-medium text-muted-foreground">Avg AI Confidence</div>
              <div>{Math.round(quotes.reduce((sum, q) => sum + q.aiConfidence, 0) / quotes.length)}%</div>
            </div>
            <div>
              <div className="font-medium text-muted-foreground">Load Types</div>
              <div>{Array.from(new Set(quotes.map(q => q.loadType))).join(', ')}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

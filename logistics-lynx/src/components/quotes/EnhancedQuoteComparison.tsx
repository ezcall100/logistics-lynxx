
import React, { useState, useMemo } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  X, 
  TrendingUp, 
  TrendingDown,
  Minus,
  BarChart3,
  Brain
} from 'lucide-react';
import { MarginAnalysisCard } from './MarginAnalysisCard';
import { MarketIntelligenceCard } from './MarketIntelligenceCard';
import { AIRecommendationsPanel } from './AIRecommendationsPanel';
import { 
  calculateMargin, 
  generateMarketIntelligence, 
  generateAIRecommendations 
} from './utils/marginAnalysis';

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

interface EnhancedQuoteComparisonProps {
  quotes: Quote[];
  isOpen: boolean;
  onClose: () => void;
  onSelectionChange: (selectedIds: string[]) => void;
}

export const EnhancedQuoteComparison: React.FC<EnhancedQuoteComparisonProps> = ({
  quotes,
  isOpen,
  onClose,
  onSelectionChange
}) => {
  const [activeTab, setActiveTab] = useState('comparison');

  // Calculate enhanced data for each quote
  const enhancedQuotes = useMemo(() => {
    return quotes.map(quote => {
      // Simulate buy rate (typically 85-95% of sell rate)
      const buyRate = quote.amount * (0.85 + Math.random() * 0.1);
      const marginData = calculateMargin(quote.amount, buyRate);
      const marketData = generateMarketIntelligence(
        quote.amount, 
        quote.loadType, 
        `${quote.origin} → ${quote.destination}`
      );
      const aiRecommendations = generateAIRecommendations(marginData, marketData);
      
      return {
        ...quote,
        marginData,
        marketData,
        aiRecommendations
      };
    });
  }, [quotes]);

  const removeQuote = (quoteId: string) => {
    const updatedSelection = quotes.filter(q => q.id !== quoteId).map(q => q.id);
    onSelectionChange(updatedSelection);
    
    if (updatedSelection.length < 2) {
      onClose();
    }
  };

  const exportEnhancedComparison = () => {
    const enhancedData = enhancedQuotes.map(quote => ({
      'Quote Number': quote.quoteNumber,
      'Customer': quote.customer,
      'Route': `${quote.origin} → ${quote.destination}`,
      'Load Type': quote.loadType,
      'Weight': quote.weight,
      'Sell Rate': `$${quote.amount.toLocaleString()}`,
      'Buy Rate': `$${quote.marginData.buyRate.toLocaleString()}`,
      'Margin': `$${quote.marginData.margin.toLocaleString()}`,
      'Margin %': `${quote.marginData.marginPercentage.toFixed(1)}%`,
      'Profitability': quote.marginData.profitabilityLevel,
      'Market Position': quote.marketData.competitivePosition,
      'Market Average': `$${quote.marketData.marketAverage.toLocaleString()}`,
      'AI Confidence': `${quote.aiConfidence}%`,
      'Status': quote.status,
      'Created': quote.date,
      'Expires': quote.expiryDate
    }));

    const csvContent = [
      Object.keys(enhancedData[0]).join(','),
      ...enhancedData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `enhanced-quote-comparison-${new Date().toISOString().split('T')[0]}.csv`;
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
  const avgMargin = enhancedQuotes.reduce((sum, q) => sum + q.marginData.marginPercentage, 0) / enhancedQuotes.length;
  const avgConfidence = enhancedQuotes.reduce((sum, q) => sum + q.aiConfidence, 0) / enhancedQuotes.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Enhanced Quote Comparison ({enhancedQuotes.length} quotes)
            </DialogTitle>
            <Button variant="outline" onClick={exportEnhancedComparison} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Enhanced CSV
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Quote Comparison
            </TabsTrigger>
            <TabsTrigger value="margins" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Margin Analysis
            </TabsTrigger>
            <TabsTrigger value="intelligence" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Intelligence
            </TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {enhancedQuotes.map((quote) => (
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
                    {/* Price with comparison and margin indicator */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          ${quote.amount.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Margin: {quote.marginData.marginPercentage.toFixed(1)}%
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPriceComparison(quote.amount, allAmounts)}
                        <Badge className={
                          quote.marginData.profitabilityLevel === 'high' ? 'bg-green-100 text-green-800' :
                          quote.marginData.profitabilityLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {quote.marginData.profitabilityLevel}
                        </Badge>
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

                    {/* Status and Market Position */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Status</div>
                        {getStatusBadge(quote.status)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Market Position</div>
                        <Badge className={
                          quote.marketData.competitivePosition === 'above' ? 'bg-green-100 text-green-800' :
                          quote.marketData.competitivePosition === 'at' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {quote.marketData.competitivePosition} market
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="margins" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {enhancedQuotes.map((quote) => (
                <MarginAnalysisCard key={quote.id} marginData={quote.marginData} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="intelligence" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {enhancedQuotes.map((quote) => (
                <div key={quote.id} className="space-y-4">
                  <MarketIntelligenceCard 
                    marketData={quote.marketData} 
                    currentRate={quote.amount}
                  />
                  <AIRecommendationsPanel 
                    recommendations={quote.aiRecommendations}
                    confidenceScore={quote.aiConfidence}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Enhanced Summary Section */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-3">Enhanced Comparison Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-medium text-muted-foreground">Price Range</div>
              <div>${Math.min(...allAmounts).toLocaleString()} - ${Math.max(...allAmounts).toLocaleString()}</div>
            </div>
            <div>
              <div className="font-medium text-muted-foreground">Avg Margin</div>
              <div>{avgMargin.toFixed(1)}%</div>
            </div>
            <div>
              <div className="font-medium text-muted-foreground">Avg AI Confidence</div>
              <div>{Math.round(avgConfidence)}%</div>
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

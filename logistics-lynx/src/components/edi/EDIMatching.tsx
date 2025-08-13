
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, CheckCircle, Sparkles, TrendingUp } from 'lucide-react';
import { EDI210Table } from './components/EDI210Table';
import { EDI214Table } from './components/EDI214Table';
import { EDISearchFilters } from './components/EDISearchFilters';
import { edi210Data } from './data/ediData';

export const EDIMatching: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Determine active tab based on current route
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/edi/matching/210' || path === '/edi/210') return 'edi210';
    if (path === '/edi/matching/214' || path === '/edi/214') return 'edi214';
    if (path === '/edi/matching') return 'edi210'; // Default to EDI 210
    return 'edi210'; // Default fallback
  };

  const handleTabChange = (value: string) => {
    if (value === 'edi210') {
      navigate('/edi/matching/210');
    } else if (value === 'edi214') {
      navigate('/edi/matching/214');
    }
  };

  const handleMatch = (id: number) => {
    toast({
      title: "✨ Match Successful",
      description: `Document ${id} has been matched successfully with AI precision.`,
    });
  };

  const handleBulkMatch = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "No Items Selected",
        description: "Please select items to perform bulk matching.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "🚀 Bulk Match Initiated",
      description: `Processing ${selectedItems.length} documents for intelligent matching.`,
    });
    setSelectedItems([]);
  };

  const handleRefresh = () => {
    toast({
      title: "🔄 Data Refreshed",
      description: "EDI matching data has been updated with latest information.",
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(edi210Data.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    }
  };

  return (
    <div className="container-responsive space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-responsive-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            EDI Matching Portal
          </h1>
          <p className="text-responsive-base text-muted-foreground max-w-2xl">
            Intelligently match EDI 210 invoices with EDI 214 status updates using advanced algorithms
          </p>
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <TrendingUp className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-medium text-blue-700 dark:text-blue-400">
                {edi210Data.length} Documents
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                {edi210Data.filter(item => item.status === 'matched').length} Matched
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            className="h-12 px-6 rounded-xl border-border/60 hover:border-blue-500/60 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-all duration-200 font-medium group"
          >
            <RefreshCw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
            Refresh Data
          </Button>
          <Button 
            onClick={handleBulkMatch}
            className="h-12 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-200 font-medium group btn-premium"
          >
            <CheckCircle className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            Bulk Match ({selectedItems.length})
          </Button>
        </div>
      </div>

      <EDISearchFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-14 p-1 bg-muted/50 rounded-xl border border-border/60">
          <TabsTrigger 
            value="edi210" 
            className="h-12 rounded-lg font-medium text-sm transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-foreground data-[state=active]:border data-[state=active]:border-border/60"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              EDI 210 (Invoices)
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="edi214"
            className="h-12 rounded-lg font-medium text-sm transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-foreground data-[state=active]:border data-[state=active]:border-border/60"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              EDI 214 (Status Updates)
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edi210" className="space-y-6 animate-scale-in">
          <EDI210Table
            selectedItems={selectedItems}
            onSelectAll={handleSelectAll}
            onSelectItem={handleSelectItem}
            onMatch={handleMatch}
          />
        </TabsContent>

        <TabsContent value="edi214" className="space-y-6 animate-scale-in">
          <EDI214Table onMatch={handleMatch} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

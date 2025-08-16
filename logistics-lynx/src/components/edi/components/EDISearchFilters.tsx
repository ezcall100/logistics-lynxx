/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, Download, Sparkles } from 'lucide-react';

interface EDISearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const EDISearchFilters: React.FC<EDISearchFiltersProps> = ({
  searchTerm,
  onSearchChange
}) => {
  return (
    <Card className="glass border-0 shadow-premium">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <div className="flex-1">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors group-focus-within:text-primary" />
              <Input
                placeholder="Search by document number, partner, or load number..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-12 h-12 bg-background/50 border-border/60 focus:border-primary/60 focus:ring-primary/20 rounded-xl transition-all duration-200 text-sm font-medium placeholder:text-muted-foreground/70 focus:bg-background"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-blue-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              className="h-12 px-6 rounded-xl border-border/60 hover:border-primary/60 hover:bg-primary/5 transition-all duration-200 font-medium group"
            >
              <Filter className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline">Advanced Filters</span>
              <span className="sm:hidden">Filters</span>
            </Button>
            <Button 
              variant="outline"
              className="h-12 px-6 rounded-xl border-border/60 hover:border-emerald-500/60 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400 transition-all duration-200 font-medium group"
            >
              <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline">Export Data</span>
              <span className="sm:hidden">Export</span>
            </Button>
            <Button 
              className="h-12 px-6 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-200 font-medium group btn-premium"
            >
              <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline">AI Match</span>
              <span className="sm:hidden">AI</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

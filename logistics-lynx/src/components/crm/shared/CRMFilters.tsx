/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface CRMFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: string[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  searchPlaceholder?: string;
}

export const CRMFilters: React.FC<CRMFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filters,
  selectedFilter,
  onFilterChange,
  searchPlaceholder = "Search..."
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {filters.map(filter => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => onFilterChange(filter)}
                className="transition-all"
              >
                {filter === 'all' ? 'All' : filter.replace('_', ' ')}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

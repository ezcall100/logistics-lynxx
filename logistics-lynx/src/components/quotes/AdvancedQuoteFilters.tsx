/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  X, 
  Calendar as CalendarIcon,
  DollarSign,
  Truck,
  Weight,
  Brain
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export interface QuoteFilters {
  searchTerm: string;
  status: string;
  carrier: string;
  loadType: string;
  rateRange: [number, number];
  weightRange: [number, number];
  aiConfidenceRange: [number, number];
  createdDateRange: { from?: Date; to?: Date };
  expiryDateRange: { from?: Date; to?: Date };
}

interface AdvancedQuoteFiltersProps {
  filters: QuoteFilters;
  onFiltersChange: (filters: QuoteFilters) => void;
  availableCarriers: string[];
  availableLoadTypes: string[];
}

export const AdvancedQuoteFilters: React.FC<AdvancedQuoteFiltersProps> = ({
  filters,
  onFiltersChange,
  availableCarriers,
  availableLoadTypes
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: keyof QuoteFilters, value: unknown) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      searchTerm: '',
      status: 'all',
      carrier: 'all',
      loadType: 'all',
      rateRange: [0, 10000],
      weightRange: [0, 50000],
      aiConfidenceRange: [0, 100],
      createdDateRange: {},
      expiryDateRange: {}
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.searchTerm) count++;
    if (filters.status !== 'all') count++;
    if (filters.carrier !== 'all') count++;
    if (filters.loadType !== 'all') count++;
    if (filters.rateRange[0] > 0 || filters.rateRange[1] < 10000) count++;
    if (filters.weightRange[0] > 0 || filters.weightRange[1] < 50000) count++;
    if (filters.aiConfidenceRange[0] > 0 || filters.aiConfidenceRange[1] < 100) count++;
    if (filters.createdDateRange.from || filters.createdDateRange.to) count++;
    if (filters.expiryDateRange.from || filters.expiryDateRange.to) count++;
    return count;
  };

  const DateRangePicker = ({ 
    value, 
    onChange, 
    placeholder 
  }: { 
    value: { from?: Date; to?: Date }; 
    onChange: (range: { from?: Date; to?: Date }) => void;
    placeholder: string;
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value.from && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value.from ? (
            value.to ? (
              `${format(value.from, "MMM dd")} - ${format(value.to, "MMM dd")}`
            ) : (
              format(value.from, "MMM dd, yyyy")
            )
          ) : (
            placeholder
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={{ from: value.from, to: value.to }}
          onSelect={(range) => onChange(range || {})}
          numberOfMonths={2}
          className="pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Filters
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFiltersCount()} active
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {getActiveFiltersCount() > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search quotes, customers, routes..."
            value={filters.searchTerm}
            onChange={(e) => updateFilter('searchTerm', e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Quick Filters Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label className="text-sm font-medium">Status</Label>
            <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium">Carrier</Label>
            <Select value={filters.carrier} onValueChange={(value) => updateFilter('carrier', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Carriers</SelectItem>
                {availableCarriers.map(carrier => (
                  <SelectItem key={carrier} value={carrier}>{carrier}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium">Load Type</Label>
            <Select value={filters.loadType} onValueChange={(value) => updateFilter('loadType', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {availableLoadTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium flex items-center gap-1">
              <Brain className="h-3 w-3" />
              AI Confidence
            </Label>
            <div className="pt-2">
              <Slider
                value={filters.aiConfidenceRange}
                onValueChange={(value) => updateFilter('aiConfidenceRange', value)}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{filters.aiConfidenceRange[0]}%</span>
                <span>{filters.aiConfidenceRange[1]}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t">
            {/* Rate Range */}
            <div>
              <Label className="text-sm font-medium flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                Rate Range
              </Label>
              <div className="pt-2">
                <Slider
                  value={filters.rateRange}
                  onValueChange={(value) => updateFilter('rateRange', value)}
                  max={10000}
                  min={0}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>${filters.rateRange[0].toLocaleString()}</span>
                  <span>${filters.rateRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Weight Range */}
            <div>
              <Label className="text-sm font-medium flex items-center gap-1">
                <Weight className="h-3 w-3" />
                Weight Range (lbs)
              </Label>
              <div className="pt-2">
                <Slider
                  value={filters.weightRange}
                  onValueChange={(value) => updateFilter('weightRange', value)}
                  max={50000}
                  min={0}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{filters.weightRange[0].toLocaleString()} lbs</span>
                  <span>{filters.weightRange[1].toLocaleString()} lbs</span>
                </div>
              </div>
            </div>

            {/* Date Ranges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Created Date Range</Label>
                <div className="mt-1">
                  <DateRangePicker
                    value={filters.createdDateRange}
                    onChange={(range) => updateFilter('createdDateRange', range)}
                    placeholder="Select creation date range"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Expiry Date Range</Label>
                <div className="mt-1">
                  <DateRangePicker
                    value={filters.expiryDateRange}
                    onChange={(range) => updateFilter('expiryDateRange', range)}
                    placeholder="Select expiry date range"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

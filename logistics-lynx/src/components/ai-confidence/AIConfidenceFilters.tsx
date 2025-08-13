
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Filter, X } from 'lucide-react';
import type { AIConfidenceFilters } from '@/types/ai-confidence';

interface AIConfidenceFiltersProps {
  filters: AIConfidenceFilters;
  onFilterChange: (filters: AIConfidenceFilters) => void;
}

const decisionTypes = [
  'shipment_assignment',
  'route_optimization',
  'dynamic_pricing',
  'predictive_maintenance',
  'load_matching',
  'driver_dispatch',
  'capacity_planning'
];

const AIConfidenceFilters = ({ filters, onFilterChange }: AIConfidenceFiltersProps) => {
  const [tempFilters, setTempFilters] = useState<AIConfidenceFilters>(filters);
  const [isOpen, setIsOpen] = useState(false);

  const handleApplyFilters = () => {
    onFilterChange(tempFilters);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    const emptyFilters = {};
    setTempFilters(emptyFilters);
    onFilterChange(emptyFilters);
    setIsOpen(false);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.decision_type?.length) count++;
    if (filters.confidence_threshold !== undefined) count++;
    if (filters.flagged_for_review !== undefined) count++;
    if (filters.date_range) count++;
    return count;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {getActiveFilterCount() > 0 && (
            <Badge 
              variant="secondary" 
              className="ml-2 h-5 w-5 p-0 rounded-full text-xs"
            >
              {getActiveFilterCount()}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Filter AI Decisions</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearFilters}
              className="h-auto p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Decision Type Filter */}
          <div className="space-y-2">
            <Label>Decision Type</Label>
            <Select
              value={tempFilters.decision_type?.[0] || ''}
              onValueChange={(value) => 
                setTempFilters(prev => ({
                  ...prev,
                  decision_type: value ? [value] : undefined
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All decision types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All decision types</SelectItem>
                {decisionTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Confidence Threshold */}
          <div className="space-y-2">
            <Label>Confidence Threshold (Show decisions below)</Label>
            <div className="px-2">
              <Slider
                value={[tempFilters.confidence_threshold || 1]}
                onValueChange={([value]) => 
                  setTempFilters(prev => ({
                    ...prev,
                    confidence_threshold: value < 1 ? value : undefined
                  }))
                }
                max={1}
                min={0}
                step={0.05}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span className="font-medium">
                  {Math.round((tempFilters.confidence_threshold || 1) * 100)}%
                </span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Flagged for Review */}
          <div className="flex items-center justify-between">
            <Label htmlFor="flagged-filter">Show only flagged for review</Label>
            <Switch
              id="flagged-filter"
              checked={tempFilters.flagged_for_review || false}
              onCheckedChange={(checked) =>
                setTempFilters(prev => ({
                  ...prev,
                  flagged_for_review: checked ? true : undefined
                }))
              }
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button onClick={handleApplyFilters} className="flex-1">
              Apply Filters
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AIConfidenceFilters;

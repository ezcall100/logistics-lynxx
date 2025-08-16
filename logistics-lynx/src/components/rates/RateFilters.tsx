/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { Search, Filter, CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface RateFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedMode: string;
  onModeChange: (value: string) => void;
  selectedEquipment: string;
  onEquipmentChange: (value: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

const RateFilters = ({
  searchTerm,
  onSearchChange,
  selectedMode,
  onModeChange,
  selectedEquipment,
  onEquipmentChange,
  dateRange,
  onDateRangeChange,
  onClearFilters,
  activeFiltersCount
}: RateFiltersProps) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const transportationModes = [
    { id: 'all', name: 'All Modes' },
    { id: 'truckload', name: 'Truckload' },
    { id: 'ltl', name: 'LTL' },
    { id: 'intermodal', name: 'Intermodal' },
    { id: 'drayage', name: 'Drayage' },
    { id: 'auto', name: 'Auto Transport' },
    { id: 'other', name: 'Other' }
  ];

  const equipmentTypes = [
    { id: 'all', name: 'All Equipment' },
    { id: 'dry-van', name: 'Dry Van' },
    { id: 'reefer', name: 'Reefer' },
    { id: 'flatbed', name: 'Flatbed' },
    { id: 'step-deck', name: 'Step Deck' },
    { id: 'container', name: 'Container' },
    { id: 'chassis', name: 'Chassis' },
    { id: 'car-carrier', name: 'Car Carrier' }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Primary Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by lane, carrier, or customer..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedMode} onValueChange={onModeChange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Transportation Mode" />
              </SelectTrigger>
              <SelectContent>
                {transportationModes.map((mode) => (
                  <SelectItem key={mode.id} value={mode.id}>
                    {mode.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              className="gap-2 relative"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="border-t pt-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Equipment Type</label>
                  <Select value={selectedEquipment} onValueChange={onEquipmentChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipmentTypes.map((equipment) => (
                        <SelectItem key={equipment.id} value={equipment.id}>
                          {equipment.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Date Range</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateRange && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} -{" "}
                              {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          "Pick a date range"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={onDateRangeChange}
                        numberOfMonths={2}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={onClearFilters}
                    className="w-full gap-2"
                  >
                    <X className="h-4 w-4" />
                    Clear All Filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedMode !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  Mode: {transportationModes.find(m => m.id === selectedMode)?.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => onModeChange('all')} />
                </Badge>
              )}
              {selectedEquipment !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  Equipment: {equipmentTypes.find(e => e.id === selectedEquipment)?.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => onEquipmentChange('all')} />
                </Badge>
              )}
              {dateRange?.from && (
                <Badge variant="secondary" className="gap-1">
                  Date: {format(dateRange.from, "MMM dd")} 
                  {dateRange.to && ` - ${format(dateRange.to, "MMM dd")}`}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => onDateRangeChange(undefined)} />
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RateFilters;
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2, Command, Filter, History, TrendingUp } from 'lucide-react';

// Radix UI Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Command as CommandPrimitive, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category?: string;
  icon?: React.ReactNode;
  action?: () => void;
}

interface EnhancedSearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'command' | 'filter';
  showClearButton?: boolean;
  showSearchButton?: boolean;
  debounceMs?: number;
  autocomplete?: boolean;
  suggestions?: SearchResult[];
  recentSearches?: string[];
  filters?: Array<{
    key: string;
    label: string;
    options: Array<{ value: string; label: string }>;
  }>;
  onFilterChange?: (filters: Record<string, string>) => void;
}

export const EnhancedSearch: React.FC<EnhancedSearchProps> = ({
  placeholder = "Search...",
  value = '',
  onChange,
  onSearch,
  onClear,
  loading = false,
  disabled = false,
  className = '',
  size = 'md',
  variant = 'default',
  showClearButton = true,
  showSearchButton = false,
  debounceMs = 300,
  autocomplete = false,
  suggestions = [],
  recentSearches = [],
  filters = [],
  onFilterChange
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-base',
    lg: 'h-12 text-lg'
  };

  // Debounced search
  const debouncedSearch = useCallback((query: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      onSearch?.(query);
    }, debounceMs);
  }, [onSearch, debounceMs]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
    
    if (newValue.length > 0) {
      setShowSuggestions(true);
      debouncedSearch(newValue);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle clear
  const handleClear = () => {
    setInputValue('');
    setShowSuggestions(false);
    onChange?.('');
    onClear?.();
    inputRef.current?.focus();
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: SearchResult) => {
    setInputValue(suggestion.title);
    setShowSuggestions(false);
    onChange?.(suggestion.title);
    suggestion.action?.();
  };

  // Handle filter change
  const handleFilterChange = (filterKey: string, filterValue: string) => {
    const newFilters = { ...activeFilters };
    if (filterValue) {
      newFilters[filterKey] = filterValue;
    } else {
      delete newFilters[filterKey];
    }
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (variant === 'command' && (e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [variant]);

  // Update input value when prop changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  if (variant === 'command') {
    return (
      <TooltipProvider>
        <div className={className}>
          <Button
            variant="outline"
            className="w-full justify-start text-slate-500"
            onClick={() => setIsOpen(true)}
          >
            <Search className="w-4 h-4 mr-2" />
            {placeholder}
            <Command className="ml-auto h-4 w-4" />
          </Button>
          
          <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              
              {recentSearches.length > 0 && (
                <>
                  <CommandGroup heading="Recent Searches">
                    {recentSearches.map((search, index) => (
                      <CommandItem
                        key={index}
                        onSelect={() => {
                          setInputValue(search);
                          onChange?.(search);
                          setIsOpen(false);
                        }}
                      >
                        <History className="w-4 h-4 mr-2 text-slate-400" />
                        {search}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}
              
              {suggestions.length > 0 && (
                <CommandGroup heading="Suggestions">
                  {suggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion.id}
                      onSelect={() => handleSuggestionSelect(suggestion)}
                    >
                      {suggestion.icon || <Search className="w-4 h-4 mr-2" />}
                      <div>
                        <div>{suggestion.title}</div>
                        {suggestion.description && (
                          <div className="text-xs text-slate-500">{suggestion.description}</div>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </CommandDialog>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className={`relative ${className}`}>
        {/* Main Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            disabled={disabled}
            className={`pl-10 pr-20 ${sizeClasses[size]} ${loading ? 'pr-16' : ''}`}
          />
          
          {/* Loading Indicator */}
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            </div>
          )}
          
          {/* Clear Button */}
          {showClearButton && inputValue && !loading && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
              onClick={handleClear}
            >
              <X className="w-3 h-3" />
            </Button>
          )}
          
          {/* Search Button */}
          {showSearchButton && (
            <Button
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6"
              onClick={() => onSearch?.(inputValue)}
              disabled={loading}
            >
              Search
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {Object.keys(activeFilters).length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.entries(activeFilters).map(([key, value]) => (
              <Badge
                key={key}
                variant="secondary"
                className="text-xs"
              >
                {filters.find(f => f.key === key)?.label}: {value}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => handleFilterChange(key, '')}
                >
                  <X className="w-2 h-2" />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        {/* Filter Popover */}
        {filters.length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
              >
                <Filter className="w-3 h-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <h4 className="font-medium">Filters</h4>
                {filters.map((filter) => (
                  <div key={filter.key} className="space-y-2">
                    <label className="text-sm font-medium">{filter.label}</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={activeFilters[filter.key] || ''}
                      onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    >
                      <option value="">All</option>
                      {filter.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Autocomplete Suggestions */}
        <AnimatePresence>
          {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
            >
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="p-2 border-b border-slate-200 dark:border-slate-700">
                  <div className="text-xs font-medium text-slate-500 mb-2">Recent Searches</div>
                  {recentSearches.slice(0, 3).map((search, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded flex items-center gap-2"
                      onClick={() => {
                        setInputValue(search);
                        onChange?.(search);
                        setShowSuggestions(false);
                      }}
                    >
                      <History className="w-3 h-3 text-slate-400" />
                      <span className="text-sm">{search}</span>
                    </button>
                  ))}
                </div>
              )}
              
              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="p-2">
                  <div className="text-xs font-medium text-slate-500 mb-2">Suggestions</div>
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      className="w-full text-left p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded flex items-center gap-2"
                      onClick={() => handleSuggestionSelect(suggestion)}
                    >
                      {suggestion.icon || <Search className="w-3 h-3 text-slate-400" />}
                      <div>
                        <div className="text-sm font-medium">{suggestion.title}</div>
                        {suggestion.description && (
                          <div className="text-xs text-slate-500">{suggestion.description}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
};

// Convenience components
export const SearchWithFilters: React.FC<Omit<EnhancedSearchProps, 'variant'> & {
  filterOptions: Array<{
    key: string;
    label: string;
    options: Array<{ value: string; label: string }>;
  }>;
}> = ({ filterOptions, ...props }) => {
  return (
    <EnhancedSearch
      {...props}
      variant="filter"
      filters={filterOptions}
    />
  );
};

export const CommandSearch: React.FC<Omit<EnhancedSearchProps, 'variant'> & {
  commands?: Array<{
    id: string;
    title: string;
    description?: string;
    icon?: React.ReactNode;
    action: () => void;
  }>;
}> = ({ commands = [], ...props }) => {
  return (
    <EnhancedSearch
      {...props}
      variant="command"
      suggestions={commands}
    />
  );
};

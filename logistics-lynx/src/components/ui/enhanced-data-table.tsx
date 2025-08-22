import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronUp, ChevronDown, ArrowUpDown, Search, Filter,
  MoreHorizontal, Eye, Edit, Trash2, Download, RefreshCw,
  SortAsc, SortDesc
} from 'lucide-react';

// Radix UI Components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface EnhancedDataTableProps {
  data: any[];
  columns: Column[];
  title?: string;
  description?: string;
  searchable?: boolean;
  filterable?: boolean;
  selectable?: boolean;
  pagination?: boolean;
  itemsPerPage?: number;
  className?: string;
  onRowClick?: (row: any) => void;
  onSelectionChange?: (selectedRows: any[]) => void;
  onExport?: () => void;
  onRefresh?: () => void;
}

export const EnhancedDataTable: React.FC<EnhancedDataTableProps> = ({
  data,
  columns,
  title = "Data Table",
  description,
  searchable = true,
  filterable = true,
  selectable = true,
  pagination = true,
  itemsPerPage = 10,
  className = "",
  onRowClick,
  onSelectionChange,
  onExport,
  onRefresh
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchQuery) {
      result = result.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(row => String(row[key]).toLowerCase().includes(value.toLowerCase()));
      }
    });

    // Apply sorting
    if (sortColumn) {
      result.sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchQuery, sortColumn, sortDirection, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = pagination 
    ? filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage)
    : filteredAndSortedData;

  // Handle sorting
  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  // Handle row selection
  const handleRowSelection = (rowId: string, checked: boolean) => {
    const newSelection = new Set(selectedRows);
    if (checked) {
      newSelection.add(rowId);
    } else {
      newSelection.delete(rowId);
    }
    setSelectedRows(newSelection);
    onSelectionChange?.(Array.from(newSelection).map(id => data.find(row => row.id === id)));
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = paginatedData.map(row => row.id);
      setSelectedRows(new Set(allIds));
      onSelectionChange?.(paginatedData);
    } else {
      setSelectedRows(new Set());
      onSelectionChange?.([]);
    }
  };

  const getSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) {
              return <ArrowUpDown className="w-4 h-4 text-slate-400" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-blue-500" />
      : <ChevronDown className="w-4 h-4 text-blue-500" />;
  };

  return (
    <TooltipProvider>
      <div className={`space-y-4 ${className}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
            {description && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{description}</p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {onRefresh && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={onRefresh}>
                    <RefreshCw className="w-4 h-4 text-blue-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Refresh data</TooltipContent>
              </Tooltip>
            )}
            
            {onExport && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={onExport}>
                    <Download className="w-4 h-4 text-green-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Export data</TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {searchable && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setSearchQuery('')}
                >
                  <span className="sr-only">Clear search</span>
                  ×
                </Button>
              )}
            </div>
          )}

          {filterable && (
            <div className="flex gap-2">
              {columns.filter(col => col.filterable).map(column => (
                <Select
                  key={column.key}
                  value={filters[column.key] || ''}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, [column.key]: value }))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder={column.label} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    {Array.from(new Set(data.map(row => row[column.key]))).map(value => (
                      <SelectItem key={value} value={String(value)}>
                        {String(value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-800 sticky top-0 z-10">
                <TableRow>
                  {selectable && (
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                  )}
                  {columns.map((column) => (
                    <TableHead 
                      key={column.key}
                      className={column.sortable ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700' : ''}
                      onClick={() => column.sortable && handleSort(column.key)}
                      style={{ width: column.width }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{column.label}</span>
                        {column.sortable && getSortIcon(column.key)}
                      </div>
                    </TableHead>
                  ))}
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {paginatedData.map((row, index) => (
                    <motion.tr
                      key={row.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                        onRowClick ? 'cursor-pointer' : ''
                      } ${selectedRows.has(row.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                      onClick={() => onRowClick?.(row)}
                    >
                      {selectable && (
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.has(row.id)}
                            onCheckedChange={(checked) => handleRowSelection(row.id, checked as boolean)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </TableCell>
                      )}
                      {columns.map((column) => (
                        <TableCell key={column.key}>
                          {column.render ? column.render(row[column.key], row) : row[column.key]}
                        </TableCell>
                      ))}
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2 text-blue-500" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2 text-green-500" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        {pagination && totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} results
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                {totalPages > 5 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => setCurrentPage(totalPages)}
                        isActive={currentPage === totalPages}
                        className="cursor-pointer"
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

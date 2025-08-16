/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

interface Quote {
  id: string;
  customer_name: string;
  quote_number: string;
  status: string;
  priority: string;
  created_at: string;
  amount: number;
}

const AllQuotesTab = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    dateRange: undefined as DateRange | undefined,
  });

  const loadQuotes = async () => {
    // Simulate loading quotes from an API
    const mockQuotes: Quote[] = [
      {
        id: '1',
        customer_name: 'Acme Corp',
        quote_number: 'Q-2024-001',
        status: 'pending',
        priority: 'high',
        created_at: '2024-01-15',
        amount: 1200.00,
      },
      {
        id: '2',
        customer_name: 'Beta Industries',
        quote_number: 'Q-2024-002',
        status: 'approved',
        priority: 'medium',
        created_at: '2024-01-20',
        amount: 1850.50,
      },
      {
        id: '3',
        customer_name: 'Gamma Solutions',
        quote_number: 'Q-2024-003',
        status: 'rejected',
        priority: 'low',
        created_at: '2024-01-25',
        amount: 975.00,
      },
    ];
    setQuotes(mockQuotes);
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>All Quotes</CardTitle>
          <CardDescription>Filter and manage all your quotes.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <div>
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select onValueChange={(value) => setFilters({ ...filters, priority: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={
                    "w-full justify-start text-left font-normal" +
                    (filters.dateRange?.from
                      ? " pl-3"
                      : " text-muted-foreground")
                  }
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange?.from ? (
                    filters.dateRange.to ? (
                      <>
                        {format(filters.dateRange.from, "MMM dd, yyyy")} -{" "}
                        {format(filters.dateRange.to, "MMM dd, yyyy")}
                      </>
                    ) : (
                      format(filters.dateRange.from, "MMM dd, yyyy")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                  mode="range"
                  defaultMonth={filters.dateRange?.from}
                  selected={filters.dateRange}
                  onSelect={(dateRange) => setFilters({ ...filters, dateRange: dateRange })}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {quotes.map((quote) => (
          <Card key={quote.id}>
            <CardHeader>
              <CardTitle>{quote.customer_name}</CardTitle>
              <CardDescription>Quote Number: {quote.quote_number}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>Status: {quote.status}</p>
                <p>Priority: {quote.priority}</p>
                <p>Amount: ${quote.amount.toFixed(2)}</p>
                <p>Created At: {quote.created_at}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllQuotesTab;

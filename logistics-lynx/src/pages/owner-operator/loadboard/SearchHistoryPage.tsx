/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Calendar, MapPin, DollarSign, Trash2, Star, Clock } from 'lucide-react';

interface SearchHistoryItem {
  id: string;
  searchTerm: string;
  date: string;
  time: string;
  origin: string;
  destination: string;
  equipment: string;
  minRate: number;
  maxRate: number;
  resultsFound: number;
  isFavorite: boolean;
}

const SearchHistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchHistory: SearchHistoryItem[] = [
    {
      id: '1',
      searchTerm: 'Houston to Dallas',
      date: '2024-01-15',
      time: '14:30',
      origin: 'Houston, TX',
      destination: 'Dallas, TX',
      equipment: 'Dry Van',
      minRate: 2.50,
      maxRate: 3.20,
      resultsFound: 23,
      isFavorite: true
    },
    {
      id: '2',
      searchTerm: 'Chicago to Atlanta',
      date: '2024-01-14',
      time: '09:15',
      origin: 'Chicago, IL',
      destination: 'Atlanta, GA',
      equipment: 'Refrigerated',
      minRate: 2.80,
      maxRate: 3.50,
      resultsFound: 18,
      isFavorite: false
    },
    {
      id: '3',
      searchTerm: 'Los Angeles to Phoenix',
      date: '2024-01-13',
      time: '16:45',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      equipment: 'Flatbed',
      minRate: 2.20,
      maxRate: 2.90,
      resultsFound: 31,
      isFavorite: true
    },
    {
      id: '4',
      searchTerm: 'Miami to Orlando',
      date: '2024-01-12',
      time: '11:20',
      origin: 'Miami, FL',
      destination: 'Orlando, FL',
      equipment: 'Dry Van',
      minRate: 1.80,
      maxRate: 2.40,
      resultsFound: 14,
      isFavorite: false
    },
    {
      id: '5',
      searchTerm: 'Denver to Salt Lake City',
      date: '2024-01-11',
      time: '08:30',
      origin: 'Denver, CO',
      destination: 'Salt Lake City, UT',
      equipment: 'Refrigerated',
      minRate: 2.60,
      maxRate: 3.10,
      resultsFound: 9,
      isFavorite: false
    }
  ];

  const recentSearches = searchHistory.slice(0, 3);
  const favoriteSearches = searchHistory.filter(item => item.isFavorite);

  const handleRepeatSearch = (item: SearchHistoryItem) => {
    console.log('Repeating search:', item);
  };

  const handleDeleteSearch = (id: string) => {
    console.log('Deleting search:', id);
  };

  const handleToggleFavorite = (id: string) => {
    console.log('Toggling favorite:', id);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Search History</h1>
          <p className="text-muted-foreground">Review and repeat your previous load searches</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter History
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Searches</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                All Search History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Search Term</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Rate Range</TableHead>
                    <TableHead>Results</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.searchTerm}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item.date}</span>
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs">{item.origin} → {item.destination}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.equipment}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">${item.minRate} - ${item.maxRate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.resultsFound} loads</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRepeatSearch(item)}
                          >
                            Repeat
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleToggleFavorite(item.id)}
                          >
                            <Star className={`h-4 w-4 ${item.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteSearch(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSearches.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">{item.searchTerm}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{item.date} at {item.time}</span>
                        <span>{item.resultsFound} results</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleRepeatSearch(item)}>
                        Repeat Search
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleToggleFavorite(item.id)}
                      >
                        <Star className={`h-4 w-4 ${item.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {favoriteSearches.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                    <div className="space-y-1">
                      <h3 className="font-medium flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {item.searchTerm}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{item.origin} → {item.destination}</span>
                        <span>{item.equipment}</span>
                        <span>${item.minRate} - ${item.maxRate}</span>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleRepeatSearch(item)}>
                      Repeat Search
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchHistoryPage;
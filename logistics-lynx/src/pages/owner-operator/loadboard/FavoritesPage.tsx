import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MapPin, DollarSign, Calendar, Truck, Heart, Trash2, Eye, Filter } from 'lucide-react';

interface FavoriteLoad {
  id: string;
  brokerName: string;
  origin: string;
  destination: string;
  rate: number;
  miles: number;
  equipment: string;
  dateAdded: string;
  isAvailable: boolean;
  rating: number;
}

interface FavoriteBroker {
  id: string;
  name: string;
  rating: number;
  loadsPosted: number;
  avgRate: number;
  responseTime: string;
  dateAdded: string;
}

interface FavoriteRoute {
  id: string;
  name: string;
  origin: string;
  destination: string;
  miles: number;
  avgRate: number;
  frequency: string;
  dateAdded: string;
}

const FavoritesPage: React.FC = () => {
  const favoriteLoads: FavoriteLoad[] = [
    {
      id: 'FL001',
      brokerName: 'TruckStop Logistics',
      origin: 'Houston, TX',
      destination: 'Dallas, TX',
      rate: 1850,
      miles: 240,
      equipment: 'Dry Van',
      dateAdded: '2024-01-10',
      isAvailable: true,
      rating: 4.8
    },
    {
      id: 'FL002',
      brokerName: 'Express Freight Co',
      origin: 'Austin, TX',
      destination: 'San Antonio, TX',
      rate: 980,
      miles: 80,
      equipment: 'Refrigerated',
      dateAdded: '2024-01-08',
      isAvailable: false,
      rating: 4.2
    },
    {
      id: 'FL003',
      brokerName: 'National Transport',
      origin: 'El Paso, TX',
      destination: 'Phoenix, AZ',
      rate: 2100,
      miles: 430,
      equipment: 'Flatbed',
      dateAdded: '2024-01-05',
      isAvailable: true,
      rating: 4.5
    }
  ];

  const favoriteBrokers: FavoriteBroker[] = [
    {
      id: 'FB001',
      name: 'TruckStop Logistics',
      rating: 4.8,
      loadsPosted: 156,
      avgRate: 2.85,
      responseTime: '< 2 hours',
      dateAdded: '2023-12-15'
    },
    {
      id: 'FB002',
      name: 'Prime Logistics',
      rating: 4.7,
      loadsPosted: 89,
      avgRate: 3.12,
      responseTime: '< 1 hour',
      dateAdded: '2023-12-20'
    },
    {
      id: 'FB003',
      name: 'Express Freight Co',
      rating: 4.2,
      loadsPosted: 124,
      avgRate: 2.76,
      responseTime: '< 4 hours',
      dateAdded: '2024-01-02'
    }
  ];

  const favoriteRoutes: FavoriteRoute[] = [
    {
      id: 'FR001',
      name: 'Houston - Dallas Corridor',
      origin: 'Houston, TX',
      destination: 'Dallas, TX',
      miles: 240,
      avgRate: 2.85,
      frequency: 'Daily',
      dateAdded: '2023-11-15'
    },
    {
      id: 'FR002',
      name: 'Texas Triangle',
      origin: 'Austin, TX',
      destination: 'San Antonio, TX',
      miles: 80,
      avgRate: 3.20,
      frequency: 'Weekly',
      dateAdded: '2023-12-01'
    },
    {
      id: 'FR003',
      name: 'Southwest Corridor',
      origin: 'El Paso, TX',
      destination: 'Phoenix, AZ',
      miles: 430,
      avgRate: 2.65,
      frequency: 'Bi-weekly',
      dateAdded: '2024-01-10'
    }
  ];

  const handleRemoveFromFavorites = (id: string, type: 'load' | 'broker' | 'route') => {
    console.log(`Removing ${type} from favorites:`, id);
  };

  const handleViewDetails = (id: string, type: 'load' | 'broker' | 'route') => {
    console.log(`Viewing ${type} details:`, id);
  };

  const handleBookLoad = (loadId: string) => {
    console.log('Booking load:', loadId);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Favorites</h1>
          <p className="text-muted-foreground">Your saved loads, brokers, and routes</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter Favorites
        </Button>
      </div>

      <Tabs defaultValue="loads" className="space-y-6">
        <TabsList>
          <TabsTrigger value="loads">Favorite Loads</TabsTrigger>
          <TabsTrigger value="brokers">Favorite Brokers</TabsTrigger>
          <TabsTrigger value="routes">Favorite Routes</TabsTrigger>
        </TabsList>

        <TabsContent value="loads">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Favorite Loads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Broker</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {favoriteLoads.map((load) => (
                    <TableRow key={load.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{load.brokerName}</div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(load.rating) 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">{load.rating}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div className="text-sm">
                            <div>{load.origin}</div>
                            <div className="text-muted-foreground">→ {load.destination}</div>
                            <div className="text-xs text-muted-foreground">{load.miles} miles</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span className="font-bold">${load.rate.toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${(load.rate / load.miles).toFixed(2)}/mile
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-muted-foreground" />
                          <Badge variant="outline">{load.equipment}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={load.isAvailable ? "default" : "secondary"}>
                          {load.isAvailable ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{load.dateAdded}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {load.isAvailable && (
                            <Button
                              size="sm"
                              onClick={() => handleBookLoad(load.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Book
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(load.id, 'load')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveFromFavorites(load.id, 'load')}
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

        <TabsContent value="brokers">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Favorite Brokers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Broker Name</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Loads Posted</TableHead>
                    <TableHead>Avg Rate/Mile</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {favoriteBrokers.map((broker) => (
                    <TableRow key={broker.id}>
                      <TableCell className="font-medium">{broker.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(broker.rating) 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm ml-1">{broker.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{broker.loadsPosted} loads</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">${broker.avgRate.toFixed(2)}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{broker.responseTime}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{broker.dateAdded}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(broker.id, 'broker')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveFromFavorites(broker.id, 'broker')}
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

        <TabsContent value="routes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                Favorite Routes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route Name</TableHead>
                    <TableHead>Origin → Destination</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Avg Rate/Mile</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {favoriteRoutes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium">{route.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div className="text-sm">
                            <div>{route.origin}</div>
                            <div className="text-muted-foreground">→ {route.destination}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{route.miles} miles</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">${route.avgRate.toFixed(2)}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{route.frequency}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{route.dateAdded}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(route.id, 'route')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveFromFavorites(route.id, 'route')}
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
      </Tabs>
    </div>
  );
};

export default FavoritesPage;
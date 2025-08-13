import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Route, MapPin, Clock, DollarSign } from 'lucide-react';

const TripPlanningPage = () => {
  const plannedTrips = [
    {
      id: '1',
      destination: 'Atlanta, GA to Miami, FL',
      distance: '647 miles',
      estimatedTime: '10 hours',
      estimatedRevenue: '$1,850',
      fuelCost: '$285',
      status: 'planned'
    },
    {
      id: '2',
      destination: 'Chicago, IL to Dallas, TX',
      distance: '925 miles',
      estimatedTime: '14 hours',
      estimatedRevenue: '$2,400',
      fuelCost: '$410',
      status: 'in-progress'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Trip Planning</h1>
        <p className="text-muted-foreground">Plan and optimize your routes for maximum efficiency</p>
      </div>

      <div className="grid gap-4">
        {plannedTrips.map((trip) => (
          <Card key={trip.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Route className="h-5 w-5" />
                  Trip #{trip.id}
                </CardTitle>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  trip.status === 'planned' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                }`}>
                  {trip.status}
                </span>
              </div>
              <CardDescription>{trip.destination}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Distance</p>
                    <p className="text-sm text-muted-foreground">{trip.distance}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Est. Time</p>
                    <p className="text-sm text-muted-foreground">{trip.estimatedTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Revenue</p>
                    <p className="text-sm text-muted-foreground">{trip.estimatedRevenue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Fuel Cost</p>
                    <p className="text-sm text-muted-foreground">{trip.fuelCost}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TripPlanningPage;
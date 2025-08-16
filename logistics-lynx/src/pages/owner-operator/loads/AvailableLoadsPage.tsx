/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, CheckCircle, Clock, MapPin } from 'lucide-react';

const AvailableLoadsPage = () => {
  const availableLoads = [
    {
      id: 'LD001245',
      shipper: 'Walmart Distribution',
      origin: 'Dallas, TX',
      destination: 'Phoenix, AZ',
      pickupDate: '2024-01-22',
      deliveryDate: '2024-01-24',
      distance: '887 miles',
      rate: '$2,650',
      weight: '42,000 lbs',
      commodity: 'General Freight',
      equipment: 'Dry Van',
      status: 'available'
    },
    {
      id: 'LD001246',
      shipper: 'Home Depot',
      origin: 'Atlanta, GA',
      destination: 'Jacksonville, FL',
      pickupDate: '2024-01-23',
      deliveryDate: '2024-01-24',
      distance: '346 miles',
      rate: '$1,250',
      weight: '38,500 lbs',
      commodity: 'Building Materials',
      equipment: 'Flatbed',
      status: 'urgent'
    },
    {
      id: 'LD001247',
      shipper: 'Amazon Fulfillment',
      origin: 'Houston, TX',
      destination: 'New Orleans, LA',
      pickupDate: '2024-01-25',
      deliveryDate: '2024-01-26',
      distance: '352 miles',
      rate: '$1,480',
      weight: '45,000 lbs',
      commodity: 'Consumer Goods',
      equipment: 'Dry Van',
      status: 'available'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'available': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Available Loads</h1>
        <p className="text-muted-foreground">Browse and bid on available freight loads</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Loads</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+12 new today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rate/Mile</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.85</div>
            <p className="text-xs text-muted-foreground">+$0.15 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent Loads</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">High priority picks</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {availableLoads.map((load) => (
          <Card key={load.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Load #{load.id}
                </CardTitle>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(load.status)}`}>
                  {load.status}
                </span>
              </div>
              <CardDescription>
                {load.shipper} • {load.commodity} • {load.equipment}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Origin</p>
                    <p className="text-sm text-muted-foreground">{load.origin}</p>
                    <p className="text-xs text-muted-foreground">Pickup: {load.pickupDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Destination</p>
                    <p className="text-sm text-muted-foreground">{load.destination}</p>
                    <p className="text-xs text-muted-foreground">Delivery: {load.deliveryDate}</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-sm">Distance</p>
                  <p className="text-sm text-muted-foreground">{load.distance}</p>
                  <p className="font-medium text-sm mt-1">Weight</p>
                  <p className="text-sm text-muted-foreground">{load.weight}</p>
                </div>

                <div>
                  <p className="font-medium text-sm">Rate</p>
                  <p className="text-lg font-bold text-green-600">{load.rate}</p>
                  <p className="text-xs text-muted-foreground">
                    ${(parseFloat(load.rate.replace('$', '').replace(',', '')) / parseFloat(load.distance.replace(' miles', ''))).toFixed(2)}/mile
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Button className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Book Load
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Clock className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Load Search Filters</CardTitle>
          <CardDescription>Refine your load search</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Origin State</label>
              <select className="w-full p-2 border rounded-md mt-1">
                <option>All States</option>
                <option>Texas</option>
                <option>California</option>
                <option>Florida</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Equipment Type</label>
              <select className="w-full p-2 border rounded-md mt-1">
                <option>All Equipment</option>
                <option>Dry Van</option>
                <option>Flatbed</option>
                <option>Reefer</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Min Rate/Mile</label>
              <input type="number" className="w-full p-2 border rounded-md mt-1" placeholder="2.00" step="0.01" />
            </div>
            <div className="flex items-end">
              <Button className="w-full">Apply Filters</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvailableLoadsPage;
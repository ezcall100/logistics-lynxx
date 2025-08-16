/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MapPin, Fuel, Utensils, Wifi, Car, Star, Navigation, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TruckStopWidget = () => {
  // Mock truck stop data - in production this would come from APIs
  const nearbyStops = [
    {
      name: "Pilot Flying J",
      address: "2847 I-75 Exit 234, Macon GA",
      distance: "12 miles",
      rating: 4.2,
      amenities: ["fuel", "food", "wifi", "parking"],
      fuelPrice: "$3.45/gal",
      parkingSpots: 45,
      eta: "15 min"
    },
    {
      name: "Love's Travel Stop",
      address: "I-75 Exit 240, Forsyth GA", 
      distance: "18 miles",
      rating: 4.0,
      amenities: ["fuel", "food", "shower", "parking"],
      fuelPrice: "$3.42/gal",
      parkingSpots: 67,
      eta: "22 min"
    },
    {
      name: "TA Travel Center",
      address: "I-75 Exit 246, Cordele GA",
      distance: "24 miles", 
      rating: 3.8,
      amenities: ["fuel", "food", "wifi", "shower"],
      fuelPrice: "$3.48/gal",
      parkingSpots: 32,
      eta: "28 min"
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'fuel': return <Fuel className="w-4 h-4 text-yellow-500" />;
      case 'food': return <Utensils className="w-4 h-4 text-orange-500" />;
      case 'wifi': return <Wifi className="w-4 h-4 text-blue-500" />;
      case 'shower': return <Car className="w-4 h-4 text-green-500" />;
      case 'parking': return <Car className="w-4 h-4 text-purple-500" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const getAmenityLabel = (amenity: string) => {
    switch (amenity) {
      case 'fuel': return 'Fuel';
      case 'food': return 'Food';
      case 'wifi': return 'WiFi';
      case 'shower': return 'Shower';
      case 'parking': return 'Parking';
      default: return amenity;
    }
  };

  const getParkingColor = (spots: number) => {
    if (spots > 50) return 'text-green-600';
    if (spots > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="glass-subtle">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <MapPin className="w-5 h-5 text-blue-500" />
          <span>Nearby Truck Stops</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {nearbyStops.map((stop, index) => (
          <div key={index} className="border border-border/50 rounded-lg p-4 hover:bg-muted/30 transition-colors">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{stop.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{stop.address}</p>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="flex items-center space-x-1">
                    <Navigation className="w-4 h-4 text-blue-500" />
                    <span className="text-muted-foreground">{stop.distance}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="text-muted-foreground">{stop.eta}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-muted-foreground">{stop.rating}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="ml-4">
                <Navigation className="w-4 h-4 mr-1" />
                Navigate
              </Button>
            </div>

            {/* Key Info */}
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="flex items-center space-x-2">
                <Fuel className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{stop.fuelPrice}</span>
                <Badge variant="secondary" className="text-xs">Diesel</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Car className="w-4 h-4 text-purple-500" />
                <span className={`text-sm font-medium ${getParkingColor(stop.parkingSpots)}`}>
                  {stop.parkingSpots} spots
                </span>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">Amenities:</span>
              <div className="flex space-x-2">
                {stop.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center space-x-1 px-2 py-1 bg-muted/50 rounded-md">
                    {getAmenityIcon(amenity)}
                    <span className="text-xs text-muted-foreground">
                      {getAmenityLabel(amenity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Quick Actions */}
        <div className="pt-2 border-t border-border/50">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="w-full">
              <Fuel className="w-4 h-4 mr-2" />
              Find Cheapest Fuel
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              <Car className="w-4 h-4 mr-2" />
              Reserve Parking
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TruckStopWidget;
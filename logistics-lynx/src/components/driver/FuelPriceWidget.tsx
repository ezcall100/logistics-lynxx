/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Fuel, TrendingUp, TrendingDown, MapPin, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const FuelPriceWidget = () => {
  // Mock fuel price data - in production this would come from fuel APIs
  const currentPrice = {
    price: 3.42,
    change: -0.05,
    location: "Along your route",
    lastUpdated: "15 min ago"
  };

  const nearbyPrices = [
    { station: "Shell", location: "Exit 234", price: 3.39, distance: "12 mi", trend: "down" },
    { station: "Pilot", location: "Exit 234", price: 3.45, distance: "12 mi", trend: "up" },
    { station: "Love's", location: "Exit 240", price: 3.42, distance: "18 mi", trend: "stable" },
    { station: "TA", location: "Exit 246", price: 3.48, distance: "24 mi", trend: "up" }
  ];

  const priceHistory = [
    { date: "Mon", price: 3.48 },
    { date: "Tue", price: 3.45 },
    { date: "Wed", price: 3.47 },
    { date: "Thu", price: 3.44 },
    { date: "Today", price: 3.42 }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-500" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-red-600';
      case 'down': return 'text-green-600';
      default: return 'text-muted-foreground';
    }
  };

  const getBestPrice = () => {
    return nearbyPrices.reduce((min, station) => 
      station.price < min.price ? station : min, nearbyPrices[0]
    );
  };

  const bestDeal = getBestPrice();

  return (
    <Card className="glass-subtle">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Fuel className="w-5 h-5 text-yellow-500" />
          <span>Fuel Prices</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Average Price */}
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <DollarSign className="w-6 h-6 text-green-500" />
            <span className="text-3xl font-bold">{currentPrice.price.toFixed(2)}</span>
            <span className="text-lg text-muted-foreground">/gal</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            {currentPrice.change < 0 ? (
              <TrendingDown className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingUp className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${currentPrice.change < 0 ? 'text-green-600' : 'text-red-600'}`}>
              {currentPrice.change > 0 ? '+' : ''}{currentPrice.change.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">vs yesterday</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {currentPrice.location} • Updated {currentPrice.lastUpdated}
          </p>
        </div>

        {/* Best Deal Highlight */}
        <div className="border-2 border-green-200 bg-green-50/50 dark:bg-green-950/20 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-500 text-white">Best Deal</Badge>
                <span className="font-medium">{bestDeal.station}</span>
              </div>
              <div className="text-sm text-muted-foreground">{bestDeal.location} • {bestDeal.distance}</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-green-600">${bestDeal.price.toFixed(2)}</div>
              <Button variant="outline" size="sm" className="mt-1">
                <MapPin className="w-3 h-3 mr-1" />
                Navigate
              </Button>
            </div>
          </div>
        </div>

        {/* Nearby Stations */}
        <div>
          <h4 className="font-medium mb-3">Nearby Stations</h4>
          <div className="space-y-2">
            {nearbyPrices.map((station, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30">
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-medium text-sm">{station.station}</div>
                    <div className="text-xs text-muted-foreground">{station.location} • {station.distance}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(station.trend)}
                  <span className={`font-medium ${getTrendColor(station.trend)}`}>
                    ${station.price.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Trend */}
        <div>
          <h4 className="font-medium mb-3">5-Day Trend</h4>
          <div className="flex items-end space-x-2 h-16">
            {priceHistory.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t-sm mb-1"
                  style={{ 
                    height: `${(day.price - 3.30) * 100}px`,
                    minHeight: '8px'
                  }}
                />
                <div className="text-xs text-muted-foreground">{day.date}</div>
                <div className="text-xs font-medium">${day.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-2 border-t border-border/50">
          <Button variant="outline" size="sm" className="w-full">
            <Fuel className="w-4 h-4 mr-2" />
            Set Price Alert
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FuelPriceWidget;
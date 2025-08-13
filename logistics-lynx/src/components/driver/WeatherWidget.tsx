import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const WeatherWidget = () => {
  // Mock weather data - in production this would come from weather APIs
  const currentWeather = {
    location: "Atlanta, GA",
    temp: 72,
    condition: "Partly Cloudy",
    icon: Cloud,
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    windDirection: "NW"
  };

  const forecast = [
    { time: "2 PM", temp: 74, icon: Sun, condition: "Sunny" },
    { time: "5 PM", temp: 71, icon: Cloud, condition: "Cloudy" },
    { time: "8 PM", temp: 68, icon: CloudRain, condition: "Light Rain" },
    { time: "11 PM", temp: 65, icon: CloudRain, condition: "Rain" }
  ];

  const alerts = [
    { type: "warning", message: "Rain expected after 6 PM - Drive carefully" },
    { type: "info", message: "Clear skies tomorrow morning" }
  ];

  const getWeatherIcon = (IconComponent: typeof Sun) => {
    return <IconComponent className="w-6 h-6" />;
  };

  return (
    <Card className="glass-subtle">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Thermometer className="w-5 h-5 text-blue-500" />
          <span>Weather Along Route</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getWeatherIcon(currentWeather.icon)}
            <div>
              <div className="font-semibold text-2xl">{currentWeather.temp}°F</div>
              <div className="text-sm text-muted-foreground">{currentWeather.condition}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">{currentWeather.location}</div>
            <div className="text-sm text-muted-foreground">Current Location</div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-4 py-3 border-y border-border/50">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-blue-500 mb-1">
              <Droplets className="w-4 h-4" />
              <span className="text-sm font-medium">{currentWeather.humidity}%</span>
            </div>
            <div className="text-xs text-muted-foreground">Humidity</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-green-500 mb-1">
              <Wind className="w-4 h-4" />
              <span className="text-sm font-medium">{currentWeather.windSpeed} mph</span>
            </div>
            <div className="text-xs text-muted-foreground">Wind {currentWeather.windDirection}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-orange-500 mb-1">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">{currentWeather.visibility} mi</span>
            </div>
            <div className="text-xs text-muted-foreground">Visibility</div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div>
          <div className="text-sm font-medium mb-2 flex items-center space-x-1">
            <Navigation className="w-4 h-4" />
            <span>Route Forecast</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {forecast.map((hour, index) => (
              <div key={index} className="text-center p-2 rounded-lg bg-muted/30">
                <div className="text-xs text-muted-foreground mb-1">{hour.time}</div>
                <div className="flex justify-center mb-1">
                  {getWeatherIcon(hour.icon)}
                </div>
                <div className="text-sm font-medium">{hour.temp}°</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Route Alerts</div>
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Badge 
                  variant={alert.type === 'warning' ? 'destructive' : 'secondary'}
                  className="mt-0.5"
                >
                  {alert.type}
                </Badge>
                <p className="text-sm text-muted-foreground flex-1">{alert.message}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
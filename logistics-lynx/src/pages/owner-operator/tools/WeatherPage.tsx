import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Search, 
  Cloud, 
  CloudRain, 
  Sun, 
  CloudSnow, 
  Wind, 
  Eye, 
  Thermometer, 
  Droplets, 
  AlertTriangle,
  Navigation,
  MapPin,
  Calendar,
  Clock
} from 'lucide-react';

interface WeatherData {
  location: string;
  state: string;
  current: {
    temperature: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    visibility: number;
    feelsLike: number;
  };
  forecast: Array<{
    day: string;
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
  }>;
  alerts: Array<{
    id: string;
    type: string;
    severity: string;
    title: string;
    description: string;
    expires: string;
  }>;
}

interface RouteWeather {
  id: string;
  city: string;
  state: string;
  eta: string;
  distance: number;
  temperature: number;
  condition: string;
  icon: string;
  precipitation: number;
  windSpeed: number;
}

const WeatherPage: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');

  const currentWeather: WeatherData = {
    location: 'Houston',
    state: 'TX',
    current: {
      temperature: 78,
      condition: 'Partly Cloudy',
      icon: 'partly-cloudy',
      humidity: 65,
      windSpeed: 12,
      windDirection: 'SW',
      visibility: 10,
      feelsLike: 82
    },
    forecast: [
      {
        day: 'Today',
        date: 'Jan 15',
        high: 82,
        low: 68,
        condition: 'Partly Cloudy',
        icon: 'partly-cloudy',
        precipitation: 10
      },
      {
        day: 'Tomorrow',
        date: 'Jan 16',
        high: 85,
        low: 71,
        condition: 'Sunny',
        icon: 'sunny',
        precipitation: 0
      },
      {
        day: 'Wednesday',
        date: 'Jan 17',
        high: 79,
        low: 65,
        condition: 'Rain',
        icon: 'rainy',
        precipitation: 80
      },
      {
        day: 'Thursday',
        date: 'Jan 18',
        high: 75,
        low: 62,
        condition: 'Cloudy',
        icon: 'cloudy',
        precipitation: 20
      },
      {
        day: 'Friday',
        date: 'Jan 19',
        high: 81,
        low: 67,
        condition: 'Partly Cloudy',
        icon: 'partly-cloudy',
        precipitation: 5
      }
    ],
    alerts: [
      {
        id: '1',
        type: 'Severe Weather',
        severity: 'Warning',
        title: 'Severe Thunderstorm Warning',
        description: 'Severe thunderstorms with heavy rain and strong winds expected through Wednesday evening.',
        expires: 'Jan 17, 11:00 PM'
      }
    ]
  };

  const routeWeather: RouteWeather[] = [
    {
      id: '1',
      city: 'Houston',
      state: 'TX',
      eta: 'Current',
      distance: 0,
      temperature: 78,
      condition: 'Partly Cloudy',
      icon: 'partly-cloudy',
      precipitation: 10,
      windSpeed: 12
    },
    {
      id: '2',
      city: 'Beaumont',
      state: 'TX',
      eta: '2:30 PM',
      distance: 85,
      temperature: 76,
      condition: 'Cloudy',
      icon: 'cloudy',
      precipitation: 25,
      windSpeed: 15
    },
    {
      id: '3',
      city: 'Lafayette',
      state: 'LA',
      eta: '4:45 PM',
      distance: 165,
      temperature: 74,
      condition: 'Light Rain',
      icon: 'rainy',
      precipitation: 60,
      windSpeed: 18
    },
    {
      id: '4',
      city: 'Baton Rouge',
      state: 'LA',
      eta: '6:15 PM',
      distance: 235,
      temperature: 72,
      condition: 'Rain',
      icon: 'rainy',
      precipitation: 75,
      windSpeed: 20
    },
    {
      id: '5',
      city: 'New Orleans',
      state: 'LA',
      eta: '7:30 PM',
      distance: 285,
      temperature: 71,
      condition: 'Heavy Rain',
      icon: 'rainy',
      precipitation: 90,
      windSpeed: 25
    }
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'partly cloudy':
      case 'partly-cloudy':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-gray-600" />;
      case 'rain':
      case 'light rain':
      case 'heavy rain':
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case 'snow':
        return <CloudSnow className="h-8 w-8 text-blue-300" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'warning':
        return 'border-red-500 bg-red-50 text-red-800';
      case 'watch':
        return 'border-yellow-500 bg-yellow-50 text-yellow-800';
      case 'advisory':
        return 'border-blue-500 bg-blue-50 text-blue-800';
      default:
        return 'border-gray-500 bg-gray-50 text-gray-800';
    }
  };

  const handleSearch = () => {
    console.log('Searching weather for:', searchLocation);
  };

  const handleGetRouteWeather = () => {
    console.log('Getting route weather...');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Weather</h1>
          <p className="text-muted-foreground">Check weather conditions along your route</p>
        </div>
        <Button onClick={handleGetRouteWeather} className="gap-2">
          <Navigation className="h-4 w-4" />
          Route Weather
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter city or zip code..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      {currentWeather.alerts.length > 0 && (
        <div className="space-y-4">
          {currentWeather.alerts.map((alert) => (
            <Alert key={alert.id} className={getSeverityColor(alert.severity)}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{alert.title}</h4>
                    <Badge variant="secondary">{alert.severity}</Badge>
                  </div>
                  <p>{alert.description}</p>
                  <p className="text-sm">Expires: {alert.expires}</p>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current">Current Weather</TabsTrigger>
          <TabsTrigger value="forecast">5-Day Forecast</TabsTrigger>
          <TabsTrigger value="route">Route Weather</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {currentWeather.location}, {currentWeather.state}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-4xl font-bold mb-2">
                      {currentWeather.current.temperature}°F
                    </div>
                    <div className="text-lg text-muted-foreground">
                      {currentWeather.current.condition}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Feels like {currentWeather.current.feelsLike}°F
                    </div>
                  </div>
                  <div className="text-center">
                    {getWeatherIcon(currentWeather.current.condition)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Humidity: {currentWeather.current.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Wind: {currentWeather.current.windSpeed} mph {currentWeather.current.windDirection}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Visibility: {currentWeather.current.visibility} mi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Feels like: {currentWeather.current.feelsLike}°F</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">High / Low</span>
                    <span className="font-semibold">
                      {currentWeather.forecast[0].high}° / {currentWeather.forecast[0].low}°
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Precipitation</span>
                    <span className="font-semibold">{currentWeather.forecast[0].precipitation}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Condition</span>
                    <span className="font-semibold">{currentWeather.forecast[0].condition}</span>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Driving Conditions</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Visibility</span>
                        <Badge variant="default">Good</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Road Conditions</span>
                        <Badge variant="secondary">Dry</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecast">
          <Card>
            <CardHeader>
              <CardTitle>5-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {currentWeather.forecast.map((day, index) => (
                  <Card key={index} className="p-4">
                    <div className="text-center space-y-3">
                      <div>
                        <div className="font-semibold">{day.day}</div>
                        <div className="text-sm text-muted-foreground">{day.date}</div>
                      </div>
                      <div className="flex justify-center">
                        {getWeatherIcon(day.condition)}
                      </div>
                      <div>
                        <div className="font-bold">{day.high}°</div>
                        <div className="text-sm text-muted-foreground">{day.low}°</div>
                      </div>
                      <div className="text-sm">{day.condition}</div>
                      <div className="flex items-center justify-center gap-1">
                        <Droplets className="h-3 w-3 text-blue-500" />
                        <span className="text-xs">{day.precipitation}%</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="route">
          <Card>
            <CardHeader>
              <CardTitle>Weather Along Your Route</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routeWeather.map((location) => (
                  <div key={location.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{location.city}, {location.state}</div>
                          <div className="text-sm text-muted-foreground">
                            {location.distance} mi • ETA: {location.eta}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        {getWeatherIcon(location.condition)}
                        <div className="text-sm mt-1">{location.condition}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-bold text-lg">{location.temperature}°F</div>
                        <div className="text-sm text-muted-foreground">Temperature</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <Droplets className="h-4 w-4 text-blue-500" />
                          <span className="font-semibold">{location.precipitation}%</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Rain</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <Wind className="h-4 w-4 text-gray-500" />
                          <span className="font-semibold">{location.windSpeed}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">mph</div>
                      </div>
                    </div>
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

export default WeatherPage;
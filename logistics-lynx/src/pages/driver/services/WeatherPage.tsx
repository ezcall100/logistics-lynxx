/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { 
  Search, 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Wind, 
  Eye, 
  Thermometer,
  Droplets,
  AlertTriangle,
  MapPin,
  Calendar,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Weather data interfaces
interface WeatherData {
  location: string;
  current: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    visibility: number;
    pressure: number;
    uvIndex: number;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    precipitation: number;
  }>;
  alerts: Array<{
    title: string;
    description: string;
    severity: string;
    expires: string;
  }>;
}

interface RouteWeather {
  city: string;
  state: string;
  eta: string;
  distance: number;
  weather: {
    temperature: number;
    condition: string;
    precipitation: number;
  };
}

const WeatherPage: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');

  // Mock current weather data
  const currentWeather: WeatherData = {
    location: 'Dallas, TX',
    current: {
      temperature: 78,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      windDirection: 'SW',
      visibility: 10,
      pressure: 30.15,
      uvIndex: 6
    },
    forecast: [
      { date: 'Today', high: 82, low: 68, condition: 'Partly Cloudy', precipitation: 10 },
      { date: 'Tomorrow', high: 85, low: 71, condition: 'Sunny', precipitation: 0 },
      { date: 'Wednesday', high: 79, low: 65, condition: 'Thunderstorms', precipitation: 85 },
      { date: 'Thursday', high: 75, low: 62, condition: 'Rainy', precipitation: 60 },
      { date: 'Friday', high: 81, low: 67, condition: 'Partly Cloudy', precipitation: 20 }
    ],
    alerts: [
      {
        title: 'Severe Thunderstorm Watch',
        description: 'Severe thunderstorms possible Wednesday afternoon and evening. Large hail and damaging winds possible.',
        severity: 'moderate',
        expires: 'Wed 10:00 PM'
      }
    ]
  };

  // Mock route weather data
  const routeWeather: RouteWeather[] = [
    {
      city: 'Houston',
      state: 'TX',
      eta: '6:30 PM',
      distance: 245,
      weather: { temperature: 84, condition: 'Sunny', precipitation: 0 }
    },
    {
      city: 'San Antonio',
      state: 'TX',
      eta: '9:15 PM',
      distance: 198,
      weather: { temperature: 79, condition: 'Partly Cloudy', precipitation: 15 }
    },
    {
      city: 'Austin',
      state: 'TX',
      eta: 'Tomorrow 12:45 PM',
      distance: 195,
      weather: { temperature: 82, condition: 'Thunderstorms', precipitation: 75 }
    }
  ];

  const getWeatherIcon = (condition: string) => {
    const iconClass = "h-8 w-8";
    
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className={`${iconClass} text-yellow-500`} />;
      case 'partly cloudy':
        return <Cloud className={`${iconClass} text-gray-500`} />;
      case 'rainy':
      case 'thunderstorms':
        return <CloudRain className={`${iconClass} text-blue-500`} />;
      case 'snowy':
        return <CloudSnow className={`${iconClass} text-blue-300`} />;
      default:
        return <Cloud className={`${iconClass} text-gray-500`} />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe':
        return 'destructive';
      case 'moderate':
        return 'default';
      case 'minor':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const handleSearch = () => {
    console.log(`Searching weather for: ${searchLocation}`);
  };

  const handleGetRouteWeather = () => {
    console.log('Getting weather for current route...');
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Weather Intelligence</h1>
          <p className="text-muted-foreground">Stay informed about weather conditions along your route</p>
        </div>
        <Button onClick={handleGetRouteWeather} variant="outline" className="w-fit">
          <RefreshCw className="mr-2 h-4 w-4" />
          Update Weather
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-2">
            <Input 
              placeholder="Enter city, state or ZIP code"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      {currentWeather.alerts.length > 0 && (
        <div className="space-y-2">
          {currentWeather.alerts.map((alert, index) => (
            <Alert key={index} variant={getSeverityColor(alert.severity) as unknown}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-semibold">{alert.title}</div>
                <div className="text-sm mt-1">{alert.description}</div>
                <div className="text-xs text-muted-foreground mt-1">Expires: {alert.expires}</div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Weather Tabs */}
      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Weather</TabsTrigger>
          <TabsTrigger value="forecast">5-Day Forecast</TabsTrigger>
          <TabsTrigger value="route">Route Weather</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {currentWeather.location}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-4xl font-bold">{currentWeather.current.temperature}°F</div>
                    <div className="text-muted-foreground">{currentWeather.current.condition}</div>
                  </div>
                  {getWeatherIcon(currentWeather.current.condition)}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span>Humidity: {currentWeather.current.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-gray-500" />
                    <span>Wind: {currentWeather.current.windSpeed} mph {currentWeather.current.windDirection}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-green-500" />
                    <span>Visibility: {currentWeather.current.visibility} mi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-red-500" />
                    <span>Pressure: {currentWeather.current.pressure} in</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card>
              <CardHeader>
                <CardTitle>Driving Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">UV Index</span>
                  <Badge variant={currentWeather.current.uvIndex > 7 ? 'destructive' : 'secondary'}>
                    {currentWeather.current.uvIndex} - {currentWeather.current.uvIndex > 7 ? 'High' : 'Moderate'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Visibility</span>
                  <Badge variant={currentWeather.current.visibility < 5 ? 'destructive' : 'secondary'}>
                    {currentWeather.current.visibility < 5 ? 'Poor' : 'Good'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Wind Conditions</span>
                  <Badge variant={currentWeather.current.windSpeed > 25 ? 'destructive' : 'secondary'}>
                    {currentWeather.current.windSpeed > 25 ? 'Hazardous' : 'Safe'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecast">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                5-Day Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentWeather.forecast.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="w-16 text-sm font-medium">{day.date}</div>
                      {getWeatherIcon(day.condition)}
                      <div>
                        <div className="font-medium">{day.condition}</div>
                        <div className="text-sm text-muted-foreground">
                          Precipitation: {day.precipitation}%
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{day.high}°</div>
                      <div className="text-sm text-muted-foreground">{day.low}°</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="route">
          <Card>
            <CardHeader>
              <CardTitle>Route Weather Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routeWeather.map((stop, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="w-24">
                        <div className="font-medium">{stop.city}, {stop.state}</div>
                        <div className="text-sm text-muted-foreground">{stop.distance} mi</div>
                      </div>
                      {getWeatherIcon(stop.weather.condition)}
                      <div>
                        <div className="font-medium">{stop.weather.condition}</div>
                        <div className="text-sm text-muted-foreground">
                          ETA: {stop.eta}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{stop.weather.temperature}°F</div>
                      <div className="text-sm text-muted-foreground">
                        {stop.weather.precipitation}% rain
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
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  DollarSign,
  MapPin,
  Package,
  Truck,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface RateConsoleProps {
  companyId: string;
}

export const RateConsole: React.FC<RateConsoleProps> = ({ companyId }) => {
  const [origin, setOrigin] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [equipmentType, setEquipmentType] = React.useState('dry-van');

  const recentQuotes = [
    {
      id: 'Q-001',
      origin: 'Los Angeles, CA',
      destination: 'New York, NY',
      rate: '$2,850',
      status: 'pending',
      createdAt: '2 hours ago',
      customer: 'ABC Manufacturing'
    },
    {
      id: 'Q-002',
      origin: 'Chicago, IL',
      destination: 'Dallas, TX',
      rate: '$1,200',
      status: 'accepted',
      createdAt: '4 hours ago',
      customer: 'XYZ Logistics'
    },
    {
      id: 'Q-003',
      origin: 'Miami, FL',
      destination: 'Atlanta, GA',
      rate: '$950',
      status: 'expired',
      createdAt: '1 day ago',
      customer: 'DEF Supply'
    }
  ];

  const marketTrends = [
    { lane: 'LA → NY', currentRate: '$2.85', change: '+0.15', trend: 'up' },
    { lane: 'CHI → DAL', currentRate: '$1.20', change: '-0.05', trend: 'down' },
    { lane: 'MIA → ATL', currentRate: '$0.95', change: '+0.10', trend: 'up' },
    { lane: 'SEA → DEN', currentRate: '$1.45', change: '+0.20', trend: 'up' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'expired':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Badge variant="default" className="bg-green-100 text-green-800">Accepted</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Rate Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Quick Rate Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="origin">Origin</Label>
              <Input
                id="origin"
                placeholder="Enter origin city"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="Enter destination city"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="equipment">Equipment Type</Label>
              <select
                id="equipment"
                value={equipmentType}
                onChange={(e) => setEquipmentType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="dry-van">Dry Van</option>
                <option value="reefer">Reefer</option>
                <option value="flatbed">Flatbed</option>
                <option value="power-only">Power Only</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button className="w-full md:w-auto">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Rate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Market Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Market Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {marketTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="font-medium">{trend.lane}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">${trend.currentRate}</span>
                    <Badge 
                      variant={trend.trend === 'up' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {trend.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Quotes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Quotes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentQuotes.map((quote) => (
                <div key={quote.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(quote.status)}
                    <div>
                      <div className="font-medium">{quote.id}</div>
                      <div className="text-sm text-gray-600">
                        {quote.origin} → {quote.destination}
                      </div>
                      <div className="text-xs text-gray-500">{quote.customer}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{quote.rate}</div>
                    <div className="text-xs text-gray-500">{quote.createdAt}</div>
                    {getStatusBadge(quote.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">1.2s</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
              <div className="text-xs text-green-600 mt-1">↓ 0.3s from last week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">28%</div>
              <div className="text-sm text-gray-600">Quote Conversion Rate</div>
              <div className="text-xs text-green-600 mt-1">↑ 3% from last week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">$2,450</div>
              <div className="text-sm text-gray-600">Avg Quote Value</div>
              <div className="text-xs text-green-600 mt-1">↑ $150 from last week</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  Calculator, 
  FileText, 
  TrendingUp, 
  Fuel, 
  MapPin, 
  Plus,
  Search,
  Filter,
  Download,
  Upload
} from 'lucide-react';

// Import sub-components (to be created)
import { RateConsole } from './components/RateConsole';
import { QuotesManager } from './components/QuotesManager';
import { ContractsManager } from './components/ContractsManager';
import { FuelAccessorials } from './components/FuelAccessorials';
import { LaneIntelligence } from './components/LaneIntelligence';

interface RatesPortalProps {
  companyId: string;
  userRole: string;
}

export const RatesPortal: React.FC<RatesPortalProps> = ({ companyId, userRole }) => {
  const [activeTab, setActiveTab] = React.useState('console');

  const navigationItems = [
    { id: 'console', label: 'Rate Console', icon: Calculator, description: 'Main dashboard for rate management' },
    { id: 'quotes', label: 'Quotes', icon: FileText, description: 'Quote creation and management' },
    { id: 'contracts', label: 'Contracts', icon: TrendingUp, description: 'Contract rate management' },
    { id: 'fuel', label: 'Fuel & Accessorials', icon: Fuel, description: 'Fuel surcharge and accessorials' },
    { id: 'intelligence', label: 'Lane Intelligence', icon: MapPin, description: 'Market analysis and optimization' },
  ];

  const quickStats = [
    { label: 'Active Quotes', value: '24', change: '+12%', trend: 'up' },
    { label: 'Avg Response Time', value: '1.2s', change: '-0.3s', trend: 'down' },
    { label: 'Conversion Rate', value: '28%', change: '+3%', trend: 'up' },
    { label: 'Contract Coverage', value: '67%', change: '+5%', trend: 'up' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rates Portal</h1>
            <p className="text-sm text-gray-600">Instant rating, contract management, and margin strategy</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search Rates
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <Badge 
                    variant={stat.trend === 'up' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Navigation and Content */}
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div>{item.label}</div>
                        <div className="text-xs text-gray-500 font-normal">{item.description}</div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export Rates
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Upload className="h-4 w-4 mr-2" />
                Import Rates
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<RateConsole companyId={companyId} />} />
            <Route path="/quotes" element={<QuotesManager companyId={companyId} />} />
            <Route path="/contracts" element={<ContractsManager companyId={companyId} />} />
            <Route path="/fuel" element={<FuelAccessorials companyId={companyId} />} />
            <Route path="/intelligence" element={<LaneIntelligence companyId={companyId} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

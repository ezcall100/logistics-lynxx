import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Truck, 
  Calculator,
  Filter,
  Search,
  Plus,
  MoreHorizontal,
  BarChart3,
  Target,
  Clock
} from 'lucide-react';

interface RateLane {
  id: string;
  origin: string;
  destination: string;
  equipment: string;
  weightClass: string;
  serviceLevel: string;
  spotRate: number;
  contractRate: number;
  margin: number;
  volume: number;
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

interface RateQuote {
  id: string;
  lane: string;
  customer: string;
  rate: number;
  validUntil: string;
  status: 'draft' | 'sent' | 'accepted' | 'expired';
  margin: number;
  notes: string;
}

const RatesModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('lanes');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('all');

  const rateLanes: RateLane[] = [
    {
      id: '1',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      equipment: 'Dry Van',
      weightClass: '45K-48K',
      serviceLevel: 'Standard',
      spotRate: 2.85,
      contractRate: 2.65,
      margin: 0.20,
      volume: 125,
      lastUpdated: '2024-01-15',
      trend: 'up'
    },
    {
      id: '2',
      origin: 'Chicago, IL',
      destination: 'Dallas, TX',
      equipment: 'Reefer',
      weightClass: '40K-44K',
      serviceLevel: 'Expedited',
      spotRate: 3.45,
      contractRate: 3.20,
      margin: 0.25,
      volume: 89,
      lastUpdated: '2024-01-14',
      trend: 'down'
    },
    {
      id: '3',
      origin: 'Atlanta, GA',
      destination: 'Miami, FL',
      equipment: 'Flatbed',
      weightClass: '25K-30K',
      serviceLevel: 'Standard',
      spotRate: 3.15,
      contractRate: 2.95,
      margin: 0.20,
      volume: 67,
      lastUpdated: '2024-01-13',
      trend: 'stable'
    }
  ];

  const rateQuotes: RateQuote[] = [
    {
      id: '1',
      lane: 'LA → Phoenix',
      customer: 'ABC Logistics',
      rate: 2.85,
      validUntil: '2024-01-25',
      status: 'sent',
      margin: 0.20,
      notes: 'Standard delivery, lift gate required'
    },
    {
      id: '2',
      lane: 'Chicago → Dallas',
      customer: 'XYZ Transport',
      rate: 3.45,
      validUntil: '2024-01-22',
      status: 'accepted',
      margin: 0.25,
      notes: 'Expedited service, temperature controlled'
    },
    {
      id: '3',
      lane: 'Atlanta → Miami',
      customer: 'Global Shipping Co',
      rate: 3.15,
      validUntil: '2024-01-20',
      status: 'expired',
      margin: 0.20,
      notes: 'Flatbed with tarp, oversized load'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'draft': 'bg-gray-100 text-gray-800',
      'sent': 'bg-blue-100 text-blue-800',
      'accepted': 'bg-green-100 text-green-800',
      'expired': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rates & Pricing</h1>
          <p className="text-gray-600">Central engine for spot/contract pricing and lane strategy</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Quote
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by lane, equipment, or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedEquipment}
          onChange={(e) => setSelectedEquipment(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Equipment</option>
          <option value="dry-van">Dry Van</option>
          <option value="reefer">Reefer</option>
          <option value="flatbed">Flatbed</option>
          <option value="power-only">Power Only</option>
        </select>
        <button className="btn-outline flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Spot Rate</p>
              <p className="text-2xl font-bold text-gray-900">$3.15</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Margin</p>
              <p className="text-2xl font-bold text-gray-900">$0.22</p>
            </div>
            <Target className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Quotes</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
            <Calculator className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Win Rate</p>
              <p className="text-2xl font-bold text-gray-900">68%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('lanes')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'lanes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Rate Lanes
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'quotes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Rate Quotes
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'matrix'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Lane Matrix
          </button>
          <button
            onClick={() => setActiveTab('intelligence')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'intelligence'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Intelligence
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'lanes' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Rate Lanes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lane</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spot Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rateLanes.map((lane) => (
                    <tr key={lane.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{lane.origin} → {lane.destination}</div>
                          <div className="text-sm text-gray-500">{lane.weightClass} • {lane.serviceLevel}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Truck className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{lane.equipment}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${lane.spotRate}/mile</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${lane.contractRate}/mile</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${lane.margin}/mile</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lane.volume}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getTrendIcon(lane.trend)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'quotes' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Rate Quotes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quote</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rateQuotes.map((quote) => (
                    <tr key={quote.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{quote.lane}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${quote.rate}/mile</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${quote.margin}/mile</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.validUntil}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quote.status)}`}>
                          {quote.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'matrix' && (
        <div className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Lane Matrix</h3>
          <p className="text-gray-600">Interactive rate matrix for origin/destination combinations</p>
          <button className="btn-primary mt-4">View Matrix</button>
        </div>
      )}

      {activeTab === 'intelligence' && (
        <div className="text-center py-12">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Rate Intelligence</h3>
          <p className="text-gray-600">Historical data, win/loss tracking, and market insights</p>
          <button className="btn-primary mt-4">View Analytics</button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calculator className="w-6 h-6 text-blue-600 mr-3" />
            <span className="font-medium">Create Quote</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 className="w-6 h-6 text-green-600 mr-3" />
            <span className="font-medium">Rate Analysis</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Target className="w-6 h-6 text-purple-600 mr-3" />
            <span className="font-medium">Margin Calculator</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatesModule;

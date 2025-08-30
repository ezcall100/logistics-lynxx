import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Search, 
  Filter,
  Plus,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BarChart3
} from 'lucide-react';

interface Load {
  id: string;
  origin: string;
  destination: string;
  equipment: string;
  weight: number;
  rate: number;
  pickupDate: string;
  deliveryDate: string;
  status: 'posted' | 'bidding' | 'awarded' | 'in-transit' | 'delivered';
  shipper: string;
  broker: string;
  distance: number;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
}

const LoadBoardModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [loads] = useState<Load[]>([
    {
      id: '1',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      equipment: 'Dry Van',
      weight: 40000,
      rate: 1250,
      pickupDate: '2024-01-20',
      deliveryDate: '2024-01-21',
      status: 'posted',
      shipper: 'ABC Manufacturing',
      broker: 'XYZ Logistics',
      distance: 425,
      urgency: 'high'
    },
    {
      id: '2',
      origin: 'Phoenix, AZ',
      destination: 'Las Vegas, NV',
      equipment: 'Reefer',
      weight: 35000,
      rate: 980,
      pickupDate: '2024-01-22',
      deliveryDate: '2024-01-23',
      status: 'bidding',
      shipper: 'Fresh Foods Inc',
      broker: 'Cool Transport',
      distance: 298,
      urgency: 'medium'
    },
    {
      id: '3',
      origin: 'Las Vegas, NV',
      destination: 'Salt Lake City, UT',
      equipment: 'Flatbed',
      weight: 25000,
      rate: 1450,
      pickupDate: '2024-01-24',
      deliveryDate: '2024-01-25',
      status: 'awarded',
      shipper: 'Construction Supply Co',
      broker: 'Heavy Haul Express',
      distance: 512,
      urgency: 'low'
    },
    {
      id: '4',
      origin: 'Salt Lake City, UT',
      destination: 'Denver, CO',
      equipment: 'Dry Van',
      weight: 38000,
      rate: 1100,
      pickupDate: '2024-01-26',
      deliveryDate: '2024-01-27',
      status: 'in-transit',
      shipper: 'Mountain Goods',
      broker: 'Peak Logistics',
      distance: 389,
      urgency: 'urgent'
    }
  ]);

  const tabs = [
    { id: 'available', label: 'Available Loads', count: 156 },
    { id: 'bidding', label: 'My Bids', count: 8 },
    { id: 'awarded', label: 'Awarded', count: 12 },
    { id: 'in-transit', label: 'In Transit', count: 5 },
    { id: 'completed', label: 'Completed', count: 89 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'posted': return 'text-blue-600 bg-blue-50';
      case 'bidding': return 'text-yellow-600 bg-yellow-50';
      case 'awarded': return 'text-green-600 bg-green-50';
      case 'in-transit': return 'text-purple-600 bg-purple-50';
      case 'delivered': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'urgent': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Load Board - Centralized Marketplace</h1>
          <p className="text-gray-600">Post, bid, and manage loads across the network</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Post Load
          </button>
        </div>
      </div>

      {/* Load Board Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">156</h3>
          <p className="text-gray-600">Available Loads</p>
          <p className="text-sm text-green-600 mt-1">+23% vs yesterday</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">$2.8M</h3>
          <p className="text-gray-600">Total Value</p>
          <p className="text-sm text-green-600 mt-1">+15% vs yesterday</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">89</h3>
          <p className="text-gray-600">Active Lanes</p>
          <p className="text-sm text-green-600 mt-1">+8% vs yesterday</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">12</h3>
          <p className="text-gray-600">Urgent Loads</p>
          <p className="text-sm text-red-600 mt-1">+3 vs yesterday</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search loads by origin, destination, or equipment..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Equipment</option>
              <option>Dry Van</option>
              <option>Reefer</option>
              <option>Flatbed</option>
              <option>Power Only</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Urgency</option>
              <option>Urgent</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <button className="btn-outline flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Load List */}
        <div className="p-6">
          <div className="space-y-4">
            {loads.map((load) => (
              <div key={load.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Load #{load.id}</h3>
                      <p className="text-sm text-gray-600">{load.shipper} • {load.broker}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(load.status)}`}>
                      {load.status}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(load.urgency)}`}>
                      {load.urgency}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Route</p>
                    <p className="font-medium text-gray-900">{load.origin} → {load.destination}</p>
                    <p className="text-xs text-gray-500">{load.distance} miles</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Equipment & Weight</p>
                    <p className="font-medium text-gray-900">{load.equipment}</p>
                    <p className="text-xs text-gray-500">{load.weight.toLocaleString()} lbs</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Rate</p>
                    <p className="font-bold text-green-600">${load.rate.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">${(load.rate / load.distance).toFixed(2)}/mile</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pickup/Delivery</p>
                    <p className="font-medium text-gray-900">{load.pickupDate}</p>
                    <p className="text-xs text-gray-500">Deliver: {load.deliveryDate}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex gap-2">
                    <button className="btn-outline text-sm">View Details</button>
                    {load.status === 'posted' && (
                      <button className="btn-primary text-sm">Place Bid</button>
                    )}
                    {load.status === 'bidding' && (
                      <button className="btn-outline text-sm">Update Bid</button>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    Posted 2 hours ago
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Plus className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Post a Load</h3>
          <p className="text-sm text-gray-600 mb-4">Create a new load posting for carriers to bid on</p>
          <button className="btn-outline w-full">Post Load</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Market Analytics</h3>
          <p className="text-sm text-gray-600 mb-4">View lane rates, trends, and market insights</p>
          <button className="btn-outline w-full">View Analytics</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <MapPin className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Saved Lanes</h3>
          <p className="text-sm text-gray-600 mb-4">Manage your favorite lanes and get alerts</p>
          <button className="btn-outline w-full">Manage Lanes</button>
        </div>
      </div>

      {/* Market Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">Rate Trends</p>
                <p className="text-sm text-blue-700">Average rates up 8% this week on LA-Phoenix lane</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">High Demand</p>
                <p className="text-sm text-green-700">Reefer loads in high demand - 23% more postings</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900">Capacity Alert</p>
                <p className="text-sm text-yellow-700">Limited capacity on Denver-Salt Lake route</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <BarChart3 className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <p className="font-medium text-purple-900">Volume Increase</p>
                <p className="text-sm text-purple-700">15% more loads posted compared to last week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadBoardModule;

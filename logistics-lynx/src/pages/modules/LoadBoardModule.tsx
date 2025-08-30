import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Package, 
  Clock,
  Filter,
  Search,
  Plus,
  MoreHorizontal,
  TrendingUp,
  Star,
  Eye
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
  broker: string;
  distance: number;
  commodity: string;
  specialRequirements: string[];
}

const LoadBoardModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('all');

  const loads: Load[] = [
    {
      id: '1',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      equipment: 'Dry Van',
      weight: 45000,
      rate: 2800,
      pickupDate: '2024-01-20',
      deliveryDate: '2024-01-21',
      status: 'posted',
      broker: 'ABC Logistics',
      distance: 372,
      commodity: 'Electronics',
      specialRequirements: ['Lift Gate', 'Appointment Required']
    },
    {
      id: '2',
      origin: 'Chicago, IL',
      destination: 'Dallas, TX',
      equipment: 'Reefer',
      weight: 38000,
      rate: 3200,
      pickupDate: '2024-01-22',
      deliveryDate: '2024-01-24',
      status: 'bidding',
      broker: 'XYZ Transport',
      distance: 925,
      commodity: 'Food & Beverage',
      specialRequirements: ['Temperature Controlled', 'Hazmat Certified']
    },
    {
      id: '3',
      origin: 'Atlanta, GA',
      destination: 'Miami, FL',
      equipment: 'Flatbed',
      weight: 25000,
      rate: 2100,
      pickupDate: '2024-01-25',
      deliveryDate: '2024-01-26',
      status: 'awarded',
      broker: 'Global Shipping Co',
      distance: 665,
      commodity: 'Construction Materials',
      specialRequirements: ['Tarp Required', 'Oversized Load']
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'posted': 'bg-blue-100 text-blue-800',
      'bidding': 'bg-yellow-100 text-yellow-800',
      'awarded': 'bg-green-100 text-green-800',
      'in-transit': 'bg-purple-100 text-purple-800',
      'delivered': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getEquipmentColor = (equipment: string) => {
    const colors = {
      'Dry Van': 'bg-blue-100 text-blue-800',
      'Reefer': 'bg-green-100 text-green-800',
      'Flatbed': 'bg-orange-100 text-orange-800',
      'Power Only': 'bg-purple-100 text-purple-800'
    };
    return colors[equipment as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Load Board</h1>
          <p className="text-gray-600">Centralized marketplace for posting, bidding, and matching loads</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Post Load
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by origin, destination, or commodity..."
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
              <p className="text-sm text-gray-600">Available Loads</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <Truck className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">My Bids</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Awarded</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Rate</p>
              <p className="text-2xl font-bold text-gray-900">$2.85</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('available')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'available'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Available Loads
          </button>
          <button
            onClick={() => setActiveTab('my-bids')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'my-bids'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Bids
          </button>
          <button
            onClick={() => setActiveTab('awarded')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'awarded'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Awarded
          </button>
          <button
            onClick={() => setActiveTab('posted')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'posted'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Posted
          </button>
        </nav>
      </div>

      {/* Loads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {loads.map((load) => (
          <div key={load.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(load.status)}`}>
                    {load.status}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEquipmentColor(load.equipment)}`}>
                    {load.equipment}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Route */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">{load.origin}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-gray-900">{load.destination}</span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Distance:</span>
                  <span className="font-medium">{load.distance} miles</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium">{load.weight.toLocaleString()} lbs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Commodity:</span>
                  <span className="font-medium">{load.commodity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pickup:</span>
                  <span className="font-medium">{load.pickupDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="font-medium">{load.deliveryDate}</span>
                </div>
              </div>

              {/* Rate */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Rate:</span>
                  <span className="text-lg font-bold text-green-600">${load.rate.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  ${(load.rate / load.distance).toFixed(2)}/mile
                </div>
              </div>

              {/* Special Requirements */}
              {load.specialRequirements.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs text-gray-600 mb-2">Special Requirements:</div>
                  <div className="flex flex-wrap gap-1">
                    {load.specialRequirements.map((req, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Broker */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Broker:</span>
                  <span className="text-sm font-medium">{load.broker}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 btn-primary text-sm py-2">
                  Place Bid
                </button>
                <button className="btn-outline text-sm py-2 px-3">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Truck className="w-6 h-6 text-blue-600 mr-3" />
            <span className="font-medium">Post New Load</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Search className="w-6 h-6 text-green-600 mr-3" />
            <span className="font-medium">Search Loads</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUp className="w-6 h-6 text-purple-600 mr-3" />
            <span className="font-medium">Market Rates</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadBoardModule;

import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Eye, Trash2, Package, MapPin, Calendar, Truck, RefreshCw } from 'lucide-react';
import AddLoadForm from './forms/AddLoadForm';
import EditLoadForm from './forms/EditLoadForm';
import ViewLoadForm from './forms/ViewLoadForm';

interface LoadData {
  id: string;
  loadNumber: string;
  origin: string;
  destination: string;
  pickupDate: string;
  deliveryDate: string;
  equipmentType: string;
  weight: number;
  rate: number;
  brokerFee: number;
  status: 'available' | 'assigned' | 'in-transit' | 'delivered' | 'cancelled';
  shipperName: string;
  createdAt: string;
  updatedAt: string;
}

type ViewMode = 'list' | 'add' | 'edit' | 'view';

const LoadManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedLoadId, setSelectedLoadId] = useState<string>('');
  const [loads, setLoads] = useState<LoadData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data - in real app, this would be an API call
  const mockLoads: LoadData[] = [
    {
      id: '1',
      loadNumber: 'L-2024-001',
      origin: 'Dallas, TX',
      destination: 'Phoenix, AZ',
      pickupDate: '2024-01-20',
      deliveryDate: '2024-01-22',
      equipmentType: 'Dry Van',
      weight: 45000,
      rate: 1850.00,
      brokerFee: 277.50,
      status: 'assigned',
      shipperName: 'ABC Manufacturing',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-16T14:22:00Z'
    },
    {
      id: '2',
      loadNumber: 'L-2024-002',
      origin: 'Houston, TX',
      destination: 'Atlanta, GA',
      pickupDate: '2024-01-21',
      deliveryDate: '2024-01-23',
      equipmentType: 'Reefer',
      weight: 38000,
      rate: 2200.00,
      brokerFee: 330.00,
      status: 'available',
      shipperName: 'Fresh Foods Inc',
      createdAt: '2024-01-16T09:15:00Z',
      updatedAt: '2024-01-16T09:15:00Z'
    },
    {
      id: '3',
      loadNumber: 'L-2024-003',
      origin: 'Chicago, IL',
      destination: 'Los Angeles, CA',
      pickupDate: '2024-01-22',
      deliveryDate: '2024-01-25',
      equipmentType: 'Flatbed',
      weight: 52000,
      rate: 2800.00,
      brokerFee: 420.00,
      status: 'in-transit',
      shipperName: 'Steel Works Corp',
      createdAt: '2024-01-17T11:45:00Z',
      updatedAt: '2024-01-18T16:30:00Z'
    },
    {
      id: '4',
      loadNumber: 'L-2024-004',
      origin: 'Miami, FL',
      destination: 'New York, NY',
      pickupDate: '2024-01-23',
      deliveryDate: '2024-01-26',
      equipmentType: 'Dry Van',
      weight: 42000,
      rate: 1900.00,
      brokerFee: 285.00,
      status: 'delivered',
      shipperName: 'Electronics Plus',
      createdAt: '2024-01-18T08:30:00Z',
      updatedAt: '2024-01-26T14:15:00Z'
    },
    {
      id: '5',
      loadNumber: 'L-2024-005',
      origin: 'Seattle, WA',
      destination: 'Denver, CO',
      pickupDate: '2024-01-24',
      deliveryDate: '2024-01-27',
      equipmentType: 'Power Only',
      weight: 35000,
      rate: 1600.00,
      brokerFee: 240.00,
      status: 'cancelled',
      shipperName: 'Pacific Logistics',
      createdAt: '2024-01-19T13:20:00Z',
      updatedAt: '2024-01-20T10:45:00Z'
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch loads
    const fetchLoads = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setLoads(mockLoads);
      } catch (error) {
        console.error('Error fetching loads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoads();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'assigned': return 'text-blue-600 bg-blue-100';
      case 'in-transit': return 'text-yellow-600 bg-yellow-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'assigned': return 'Assigned';
      case 'in-transit': return 'In Transit';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredLoads = loads.filter(load => {
    const matchesSearch = 
      load.loadNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.shipperName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || load.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddLoad = () => {
    setViewMode('add');
  };

  const handleEditLoad = (loadId: string) => {
    setSelectedLoadId(loadId);
    setViewMode('edit');
  };

  const handleViewLoad = (loadId: string) => {
    setSelectedLoadId(loadId);
    setViewMode('view');
  };

  const handleDeleteLoad = async (loadId: string) => {
    if (window.confirm('Are you sure you want to delete this load? This action cannot be undone.')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Remove from local state
        setLoads(prev => prev.filter(load => load.id !== loadId));
        
        console.log('Load deleted successfully:', loadId);
      } catch (error) {
        console.error('Error deleting load:', error);
      }
    }
  };

  const handleSaveLoad = (load: LoadData) => {
    if (viewMode === 'add') {
      // Add new load
      const newLoad = {
        ...load,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setLoads(prev => [newLoad, ...prev]);
    } else if (viewMode === 'edit') {
      // Update existing load
      setLoads(prev => prev.map(l => l.id === load.id ? { ...load, updatedAt: new Date().toISOString() } : l));
    }
    
    setViewMode('list');
    setSelectedLoadId('');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedLoadId('');
  };

  if (viewMode === 'add') {
    return <AddLoadForm />;
  }

  if (viewMode === 'edit' && selectedLoadId) {
    return (
      <EditLoadForm
        loadId={selectedLoadId}
        onSave={handleSaveLoad}
        onCancel={handleBackToList}
        onDelete={handleDeleteLoad}
      />
    );
  }

  if (viewMode === 'view' && selectedLoadId) {
    return (
      <ViewLoadForm
        loadId={selectedLoadId}
        onEdit={handleEditLoad}
        onDelete={handleDeleteLoad}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Load Management</h1>
          <p className="text-gray-600">Manage freight loads and carrier assignments</p>
        </div>
        <button
          onClick={handleAddLoad}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Load</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search loads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="available">Available</option>
              <option value="assigned">Assigned</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Loads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Loads ({filteredLoads.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Load Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Route
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Equipment & Weight
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rate & Fee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shipper
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLoads.map((load) => (
                    <tr key={load.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <Package className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {load.loadNumber}
                            </div>
                            <div className="text-sm text-gray-500">
                              Created {formatDate(load.createdAt)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span>{load.origin}</span>
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span>{load.destination}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(load.pickupDate)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{load.equipmentType}</div>
                        <div className="text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Truck className="h-3 w-3" />
                            <span>{load.weight.toLocaleString()} lbs</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${load.rate.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          Fee: ${load.brokerFee.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(load.status)}`}>
                          {getStatusLabel(load.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{load.shipperName}</div>
                        <div className="text-sm text-gray-500">
                          Updated {formatDate(load.updatedAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewLoad(load.id)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="View Load"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditLoad(load.id)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Edit Load"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteLoad(load.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete Load"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredLoads.length === 0 && (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No loads found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Get started by creating a new load.'
                  }
                </p>
                {!searchTerm && statusFilter === 'all' && (
                  <div className="mt-6">
                    <button
                      onClick={handleAddLoad}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Load</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LoadManagement;

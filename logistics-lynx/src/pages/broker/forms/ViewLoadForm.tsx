import React, { useState, useEffect } from 'react';
import { Package, MapPin, Calendar, DollarSign, Truck, Eye, Edit, Trash2, ArrowLeft, Phone, Mail, Clock, User } from 'lucide-react';

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
  description: string;
  specialInstructions: string;
  shipperName: string;
  shipperPhone: string;
  shipperEmail: string;
  status: 'available' | 'assigned' | 'in-transit' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  assignedCarrier?: string;
  driverName?: string;
  driverPhone?: string;
  estimatedArrival?: string;
  actualPickup?: string;
  actualDelivery?: string;
}

interface ViewLoadFormProps {
  loadId: string;
  onEdit?: (loadId: string) => void;
  onDelete?: (loadId: string) => void;
  onBack?: () => void;
}

const ViewLoadForm: React.FC<ViewLoadFormProps> = ({ loadId, onEdit, onDelete, onBack }) => {
  const [loadData, setLoadData] = useState<LoadData | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would be an API call
  const mockLoadData: LoadData = {
    id: loadId,
    loadNumber: 'L-2024-001',
    origin: 'Dallas, TX',
    destination: 'Phoenix, AZ',
    pickupDate: '2024-01-20',
    deliveryDate: '2024-01-22',
    equipmentType: 'Dry Van',
    weight: 45000,
    rate: 1850.00,
    brokerFee: 277.50,
    description: 'General freight load with standard delivery requirements. This load contains automotive parts that need to be delivered to the Phoenix distribution center.',
    specialInstructions: 'Driver must call 2 hours before pickup. Appointment required for delivery. No liftgate available.',
    shipperName: 'ABC Manufacturing',
    shipperPhone: '(555) 123-4567',
    shipperEmail: 'shipping@abcmanufacturing.com',
    status: 'assigned',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-16T14:22:00Z',
    assignedCarrier: 'Reliable Transport LLC',
    driverName: 'John Smith',
    driverPhone: '(555) 987-6543',
    estimatedArrival: '2024-01-20T08:00:00Z',
    actualPickup: '2024-01-20T09:15:00Z',
    actualDelivery: null
  };

  useEffect(() => {
    // Simulate API call to fetch load data
    const fetchLoadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setLoadData(mockLoadData);
      } catch (error) {
        console.error('Error fetching load data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoadData();
  }, [loadId]);

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
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!loadData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <p className="text-gray-500">Load not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Load Details</h1>
                <p className="text-sm text-gray-600">Load #{loadData.loadNumber}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(loadData.status)}`}>
                {getStatusLabel(loadData.status)}
              </span>
              <button
                onClick={() => onEdit?.(loadData.id)}
                className="p-2 text-blue-400 hover:text-blue-600"
                title="Edit Load"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete?.(loadData.id)}
                className="p-2 text-red-400 hover:text-red-600"
                title="Delete Load"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Load Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Package className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Load Number</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">{loadData.loadNumber}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Truck className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Equipment</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">{loadData.equipmentType}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Rate</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">${loadData.rate.toLocaleString()}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Broker Fee</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">${loadData.brokerFee.toLocaleString()}</p>
            </div>
          </div>

          {/* Route Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Route Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Origin</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">{loadData.origin}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Destination</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">{loadData.destination}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Pickup Date</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">{formatDate(loadData.pickupDate)}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Delivery Date</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">{formatDate(loadData.deliveryDate)}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <Truck className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Weight</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">{loadData.weight.toLocaleString()} lbs</p>
            </div>
          </div>

          {/* Load Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Load Description</h3>
              <p className="text-gray-700 leading-relaxed">{loadData.description}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Special Instructions</h3>
              <p className="text-gray-700 leading-relaxed">{loadData.specialInstructions}</p>
            </div>
          </div>

          {/* Shipper Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Shipper Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Shipper Name</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">{loadData.shipperName}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Phone</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">{loadData.shipperPhone}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Email</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">{loadData.shipperEmail}</p>
              </div>
            </div>
          </div>

          {/* Carrier Information (if assigned) */}
          {loadData.assignedCarrier && (
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Carrier Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Truck className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Carrier</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{loadData.assignedCarrier}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Driver</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{loadData.driverName}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Driver Phone</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{loadData.driverPhone}</p>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Load Created</p>
                  <p className="text-sm text-gray-600">{formatDateTime(loadData.createdAt)}</p>
                </div>
              </div>
              {loadData.estimatedArrival && (
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Estimated Arrival</p>
                    <p className="text-sm text-gray-600">{formatDateTime(loadData.estimatedArrival)}</p>
                  </div>
                </div>
              )}
              {loadData.actualPickup && (
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Actual Pickup</p>
                    <p className="text-sm text-gray-600">{formatDateTime(loadData.actualPickup)}</p>
                  </div>
                </div>
              )}
              {loadData.actualDelivery && (
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Actual Delivery</p>
                    <p className="text-sm text-gray-600">{formatDateTime(loadData.actualDelivery)}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Last Updated</p>
                  <p className="text-sm text-gray-600">{formatDateTime(loadData.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <button
              onClick={onBack}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back to List
            </button>
            <button
              onClick={() => onEdit?.(loadData.id)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Load</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLoadForm;

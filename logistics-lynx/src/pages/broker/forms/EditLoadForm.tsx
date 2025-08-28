import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, DollarSign, Truck, Save, X, Edit, Trash2 } from 'lucide-react';

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
}

interface EditLoadFormProps {
  loadId: string;
  onSave?: (load: LoadData) => void;
  onCancel?: () => void;
  onDelete?: (loadId: string) => void;
}

const EditLoadForm: React.FC<EditLoadFormProps> = ({ loadId, onSave, onCancel, onDelete }) => {
  const [formData, setFormData] = useState<LoadData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<LoadData>>({});

  const equipmentTypes = [
    'Dry Van',
    'Reefer',
    'Flatbed',
    'Power Only',
    'Step Deck',
    'Lowboy',
    'Box Truck',
    'Straight Truck'
  ];

  const statusOptions = [
    { value: 'available', label: 'Available', color: 'text-green-600' },
    { value: 'assigned', label: 'Assigned', color: 'text-blue-600' },
    { value: 'in-transit', label: 'In Transit', color: 'text-yellow-600' },
    { value: 'delivered', label: 'Delivered', color: 'text-green-600' },
    { value: 'cancelled', label: 'Cancelled', color: 'text-red-600' }
  ];

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
    description: 'General freight load with standard delivery requirements',
    specialInstructions: 'Driver must call 2 hours before pickup',
    shipperName: 'ABC Manufacturing',
    shipperPhone: '(555) 123-4567',
    shipperEmail: 'shipping@abcmanufacturing.com',
    status: 'available',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  };

  useEffect(() => {
    // Simulate API call to fetch load data
    const fetchLoadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setFormData(mockLoadData);
      } catch (error) {
        console.error('Error fetching load data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoadData();
  }, [loadId]);

  const handleInputChange = (field: keyof LoadData, value: string | number) => {
    if (!formData) return;

    setFormData(prev => ({
      ...prev!,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData) return false;

    const newErrors: Partial<LoadData> = {};

    if (!formData.loadNumber.trim()) {
      newErrors.loadNumber = 'Load number is required';
    }
    if (!formData.origin.trim()) {
      newErrors.origin = 'Origin is required';
    }
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }
    if (!formData.pickupDate) {
      newErrors.pickupDate = 'Pickup date is required';
    }
    if (!formData.deliveryDate) {
      newErrors.deliveryDate = 'Delivery date is required';
    }
    if (!formData.equipmentType) {
      newErrors.equipmentType = 'Equipment type is required';
    }
    if (formData.weight <= 0) {
      newErrors['weight'] = 'Weight must be greater than 0';
    }
    if (formData.rate <= 0) {
      newErrors['rate'] = 'Rate must be greater than 0';
    }
    if (!formData.shipperName.trim()) {
      newErrors.shipperName = 'Shipper name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData || !validateForm()) {
      return;
    }

    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the updatedAt timestamp
      const updatedLoad = {
        ...formData,
        updatedAt: new Date().toISOString()
      };
      
      console.log('Load updated successfully:', updatedLoad);
      onSave?.(updatedLoad);
      
    } catch (error) {
      console.error('Error updating load:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!formData) return;

    if (window.confirm('Are you sure you want to delete this load? This action cannot be undone.')) {
      setSaving(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log('Load deleted successfully:', formData.id);
        onDelete?.(formData.id);
        
      } catch (error) {
        console.error('Error deleting load:', error);
      } finally {
        setSaving(false);
      }
    }
  };

  const calculateBrokerFee = () => {
    return formData ? formData.rate * 0.15 : 0; // 15% broker fee
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!formData) {
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
              <div className="p-2 bg-blue-100 rounded-lg">
                <Edit className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Edit Load</h1>
                <p className="text-sm text-gray-600">Load #{formData.loadNumber}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDelete}
                disabled={saving}
                className="p-2 text-red-400 hover:text-red-600 disabled:opacity-50"
                title="Delete Load"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <button
                onClick={onCancel}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Load Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Load Number *
              </label>
              <input
                type="text"
                value={formData.loadNumber}
                onChange={(e) => handleInputChange('loadNumber', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.loadNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter load number"
              />
              {errors.loadNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.loadNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipment Type *
              </label>
              <select
                value={formData.equipmentType}
                onChange={(e) => handleInputChange('equipmentType', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.equipmentType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select equipment type</option>
                {equipmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.equipmentType && (
                <p className="mt-1 text-sm text-red-600">{errors.equipmentType}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Broker Fee ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  value={calculateBrokerFee().toFixed(2)}
                  readOnly
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="0.00"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">15% of rate</p>
            </div>
          </div>

          {/* Origin and Destination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Origin *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.origin ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter origin city"
                />
              </div>
              {errors.origin && (
                <p className="mt-1 text-sm text-red-600">{errors.origin}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.destination ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter destination city"
                />
              </div>
              {errors.destination && (
                <p className="mt-1 text-sm text-red-600">{errors.destination}</p>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.pickupDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.pickupDate && (
                <p className="mt-1 text-sm text-red-600">{errors.pickupDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.deliveryDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.deliveryDate && (
                <p className="mt-1 text-sm text-red-600">{errors.deliveryDate}</p>
              )}
            </div>
          </div>

          {/* Weight and Rate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (lbs) *
              </label>
              <div className="relative">
                <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.weight ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                />
              </div>
              {errors.weight && (
                <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rate ($) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  value={formData.rate}
                  onChange={(e) => handleInputChange('rate', parseFloat(e.target.value) || 0)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.rate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              {errors.rate && (
                <p className="mt-1 text-sm text-red-600">{errors.rate}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Load Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe the load, special requirements, etc."
            />
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions
            </label>
            <textarea
              value={formData.specialInstructions}
              onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any special instructions for carriers"
            />
          </div>

          {/* Shipper Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Shipper Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipper Name *
                </label>
                <input
                  type="text"
                  value={formData.shipperName}
                  onChange={(e) => handleInputChange('shipperName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.shipperName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter shipper name"
                />
                {errors.shipperName && (
                  <p className="mt-1 text-sm text-red-600">{errors.shipperName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.shipperPhone}
                  onChange={(e) => handleInputChange('shipperPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.shipperEmail}
                  onChange={(e) => handleInputChange('shipperEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Update Load</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLoadForm;

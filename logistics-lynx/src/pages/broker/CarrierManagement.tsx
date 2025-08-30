import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Users, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Search, 
  Plus, 
  DollarSign,
  Brain,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';

interface Carrier {
  id: string;
  name: string;
  rating: number;
  status: 'available' | 'busy' | 'offline';
  location: string;
  equipment: string[];
  rate: number;
  responseTime: string;
  successRate: number;
  loadsCompleted: number;
  totalRevenue: number;
  lastActive: string;
  contact: {
    phone: string;
    email: string;
    dispatcher: string;
  };
  documents: {
    insurance: string;
    authority: string;
    safety: string;
  };
  performance: {
    onTimeDelivery: number;
    damageRate: number;
    communicationScore: number;
  };
}

const CarrierManagement: React.FC = () => {
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [selectedCarrier, setSelectedCarrier] = useState<Carrier | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'details'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterEquipment, setFilterEquipment] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCarriers([
        {
          id: 'C001',
          name: 'Elite Transport Co.',
          rating: 4.9,
          status: 'available',
          location: 'Los Angeles, CA',
          equipment: ['Dry Van', 'Reefer'],
          rate: 2.85,
          responseTime: '2.3 min',
          successRate: 98.5,
          loadsCompleted: 156,
          totalRevenue: 445000,
          lastActive: '2 min ago',
          contact: {
            phone: '(555) 123-4567',
            email: 'dispatch@elitetransport.com',
            dispatcher: 'Sarah Johnson'
          },
          documents: {
            insurance: 'Active',
            authority: 'Valid',
            safety: 'Compliant'
          },
          performance: {
            onTimeDelivery: 98.5,
            damageRate: 0.2,
            communicationScore: 4.8
          }
        },
        {
          id: 'C002',
          name: 'Swift Logistics',
          rating: 4.8,
          status: 'busy',
          location: 'Chicago, IL',
          equipment: ['Flatbed', 'Power Only'],
          rate: 2.45,
          responseTime: '4.1 min',
          successRate: 96.2,
          loadsCompleted: 89,
          totalRevenue: 218000,
          lastActive: '15 min ago',
          contact: {
            phone: '(555) 234-5678',
            email: 'operations@swiftlogistics.com',
            dispatcher: 'Mike Chen'
          },
          documents: {
            insurance: 'Active',
            authority: 'Valid',
            safety: 'Compliant'
          },
          performance: {
            onTimeDelivery: 96.2,
            damageRate: 0.5,
            communicationScore: 4.6
          }
        },
        {
          id: 'C003',
          name: 'Reliable Hauling',
          rating: 4.7,
          status: 'available',
          location: 'Dallas, TX',
          equipment: ['Dry Van', 'Step Deck'],
          rate: 2.65,
          responseTime: '3.2 min',
          successRate: 97.8,
          loadsCompleted: 203,
          totalRevenue: 538000,
          lastActive: '5 min ago',
          contact: {
            phone: '(555) 345-6789',
            email: 'dispatch@reliablehauling.com',
            dispatcher: 'David Rodriguez'
          },
          documents: {
            insurance: 'Active',
            authority: 'Valid',
            safety: 'Compliant'
          },
          performance: {
            onTimeDelivery: 97.8,
            damageRate: 0.3,
            communicationScore: 4.7
          }
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCarriers = carriers.filter(carrier => {
    const matchesSearch = carrier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         carrier.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || carrier.status === filterStatus;
    const matchesEquipment = filterEquipment === 'all' || carrier.equipment.includes(filterEquipment);
    return matchesSearch && matchesStatus && matchesEquipment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100 border-green-200';
      case 'busy': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'offline': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Valid':
      case 'Compliant': return 'text-green-600 bg-green-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Carrier Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fleet optimization and relationship management
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors">
            <Brain className="w-4 h-4 mr-2 inline" />
            AI Fleet Analysis
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="w-4 h-4 mr-2 inline" />
            Add Carrier
          </button>
        </div>
      </div>

      {/* Carrier Details View */}
      {viewMode === 'details' && selectedCarrier && (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setViewMode('list')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedCarrier.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedCarrier.location} • {selectedCarrier.equipment.join(', ')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-bold text-gray-900 dark:text-white ml-1">
                    {selectedCarrier.rating}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedCarrier.status)}`}>
                  {selectedCarrier.status}
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Performance Metrics */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">On-Time Delivery</span>
                      <span className="text-lg font-bold text-green-600">{selectedCarrier.performance.onTimeDelivery}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: `${selectedCarrier.performance.onTimeDelivery}%`}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Success Rate</span>
                      <span className="text-lg font-bold text-blue-600">{selectedCarrier.successRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: `${selectedCarrier.successRate}%`}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Communication Score</span>
                      <span className="text-lg font-bold text-purple-600">{selectedCarrier.performance.communicationScore}/5</span>
                    </div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`w-4 h-4 ${star <= selectedCarrier.performance.communicationScore ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Damage Rate</span>
                      <span className="text-lg font-bold text-red-600">{selectedCarrier.performance.damageRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: `${selectedCarrier.performance.damageRate * 10}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact & Documents */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{selectedCarrier.contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{selectedCarrier.contact.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{selectedCarrier.contact.dispatcher}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-6">
                  Documents Status
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Insurance</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDocumentStatusColor(selectedCarrier.documents.insurance)}`}>
                      {selectedCarrier.documents.insurance}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Authority</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDocumentStatusColor(selectedCarrier.documents.authority)}`}>
                      {selectedCarrier.documents.authority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Safety</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDocumentStatusColor(selectedCarrier.documents.safety)}`}>
                      {selectedCarrier.documents.safety}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Carrier List View */}
      {viewMode === 'list' && (
        <>
          {/* Filters and Search */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search carriers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="offline">Offline</option>
                </select>
                
                <select
                  value={filterEquipment}
                  onChange={(e) => setFilterEquipment(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                >
                  <option value="all">All Equipment</option>
                  <option value="Dry Van">Dry Van</option>
                  <option value="Reefer">Reefer</option>
                  <option value="Flatbed">Flatbed</option>
                  <option value="Step Deck">Step Deck</option>
                  <option value="Power Only">Power Only</option>
                </select>
                
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Carriers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCarriers.map((carrier) => (
              <div 
                key={carrier.id} 
                className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedCarrier(carrier);
                  setViewMode('details');
                }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {carrier.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white ml-1">
                          {carrier.rating}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(carrier.status)}`}>
                        {carrier.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{carrier.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {carrier.equipment.join(', ')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          ${carrier.rate}/mile
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{carrier.loadsCompleted} loads</span>
                      <span>{carrier.responseTime} response</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>${(carrier.totalRevenue / 1000).toFixed(0)}k revenue</span>
                      <span>{carrier.successRate}% success</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Last active: {carrier.lastActive}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors">
                          <Phone className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors">
                          <Mail className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors">
                          <MessageSquare className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CarrierManagement;

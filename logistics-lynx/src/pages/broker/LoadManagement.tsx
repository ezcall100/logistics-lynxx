import React, { useState, useEffect } from 'react';
import { 
  Package, 
  MapPin, 
  DollarSign, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Brain,
  RefreshCw,
  ArrowLeft,
  Star
} from 'lucide-react';

interface Load {
  id: string;
  origin: string;
  destination: string;
  rate: number;
  status: 'available' | 'in-progress' | 'completed';
  carrier?: string;
  pickupDate: string;
  deliveryDate: string;
  equipment: string;
  weight: string;
  distance: number;
  priority: 'low' | 'medium' | 'high';
}

const LoadManagement: React.FC = () => {
  const [loads, setLoads] = useState<Load[]>([]);
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'details'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoads([
        {
          id: 'L001',
          origin: 'Los Angeles, CA',
          destination: 'New York, NY',
          rate: 2850,
          status: 'available',
          pickupDate: '2024-01-15',
          deliveryDate: '2024-01-18',
          equipment: 'Dry Van',
          weight: '45,000 lbs',
          distance: 2789,
          priority: 'high'
        },
        {
          id: 'L002',
          origin: 'Chicago, IL',
          destination: 'Miami, FL',
          rate: 1950,
          status: 'in-progress',
          carrier: 'Swift Logistics',
          pickupDate: '2024-01-14',
          deliveryDate: '2024-01-17',
          equipment: 'Reefer',
          weight: '38,000 lbs',
          distance: 1387,
          priority: 'medium'
        },
        {
          id: 'L003',
          origin: 'Dallas, TX',
          destination: 'Seattle, WA',
          rate: 2200,
          status: 'completed',
          carrier: 'Reliable Hauling',
          pickupDate: '2024-01-12',
          deliveryDate: '2024-01-15',
          equipment: 'Flatbed',
          weight: '52,000 lbs',
          distance: 2076,
          priority: 'low'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredLoads = loads.filter(load => {
    const matchesSearch = load.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         load.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || load.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
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
            Load Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Smart carrier matching and load optimization
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors">
            <Brain className="w-4 h-4 mr-2 inline" />
            AI Smart Matching
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="w-4 h-4 mr-2 inline" />
            New Load
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search loads..."
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
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
              <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

             {/* Load Details View */}
       {viewMode === 'details' && selectedLoad && (
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
                     Load {selectedLoad.id}
                   </h2>
                   <p className="text-gray-600 dark:text-gray-400">
                     {selectedLoad.origin} → {selectedLoad.destination}
                   </p>
                 </div>
               </div>
               <div className="flex items-center space-x-2">
                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedLoad.status)}`}>
                   {selectedLoad.status}
                 </span>
                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedLoad.priority)}`}>
                   {selectedLoad.priority} Priority
                 </span>
               </div>
             </div>
           </div>
           
           <div className="p-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                   Load Details
                 </h3>
                 <div className="space-y-3">
                   <div className="flex justify-between">
                     <span className="text-gray-600 dark:text-gray-400">Rate:</span>
                     <span className="font-semibold text-gray-900 dark:text-white">${selectedLoad.rate}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-600 dark:text-gray-400">Equipment:</span>
                     <span className="font-semibold text-gray-900 dark:text-white">{selectedLoad.equipment}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-600 dark:text-gray-400">Weight:</span>
                     <span className="font-semibold text-gray-900 dark:text-white">{selectedLoad.weight}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-600 dark:text-gray-400">Distance:</span>
                     <span className="font-semibold text-gray-900 dark:text-white">{selectedLoad.distance} miles</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-600 dark:text-gray-400">Pickup:</span>
                     <span className="font-semibold text-gray-900 dark:text-white">{selectedLoad.pickupDate}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-600 dark:text-gray-400">Delivery:</span>
                     <span className="font-semibold text-gray-900 dark:text-white">{selectedLoad.deliveryDate}</span>
                   </div>
                 </div>
               </div>
               
               <div>
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                   Carrier Assignment
                 </h3>
                 <div className="space-y-3">
                   <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                     <div className="flex items-center justify-between mb-2">
                       <h4 className="font-medium text-gray-900 dark:text-white">
                         {selectedLoad.carrier || 'No carrier assigned'}
                       </h4>
                       <div className="flex items-center">
                         <Star className="w-4 h-4 text-yellow-400 fill-current" />
                         <span className="text-sm font-medium text-gray-900 dark:text-white ml-1">
                           4.8
                         </span>
                       </div>
                     </div>
                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                       Los Angeles, CA • 2.3 min response
                     </p>
                     <div className="flex items-center justify-between">
                       <span className="text-sm text-gray-600 dark:text-gray-400">
                         $2.85/mile
                       </span>
                       <button className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                         Assign
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )}

       {/* Loads Grid */}
       {viewMode === 'list' && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLoads.map((load) => (
          <div 
            key={load.id} 
            className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer"
                         onClick={() => {
               setSelectedLoad(load);
               setViewMode('details');
             }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {load.id}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(load.status)}`}>
                    {load.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(load.priority)}`}>
                    {load.priority}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 dark:text-white">{load.origin}</p>
                    <p className="text-gray-500">→ {load.destination}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ${load.rate}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {load.equipment}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{load.distance} miles</span>
                  <span>{load.weight}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Pickup: {load.pickupDate}</span>
                  <span>Delivery: {load.deliveryDate}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {load.carrier || 'No carrier assigned'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors">
                      <Edit className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
                 ))}
       </div>
       )}
     </div>
   );
 };

export default LoadManagement;

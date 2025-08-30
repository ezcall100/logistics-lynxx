import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Download,
  Upload,
  RefreshCw,
  Star,
  Users,
  Truck,
  Package,
  DollarSign,
  TrendingUp,
  Award,
  Calendar,
  Brain,
  Target,
  Zap,
  Activity,
  Gauge,
  Network
} from 'lucide-react';

interface ComplianceItem {
  id: string;
  type: 'carrier' | 'driver' | 'vehicle' | 'document';
  title: string;
  status: 'compliant' | 'pending' | 'expired' | 'non-compliant';
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
  entity: string;
  lastUpdated: string;
}

const ComplianceCenter: React.FC = () => {
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ComplianceItem | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'details'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setComplianceItems([
        {
          id: 'C001',
          type: 'carrier',
          title: 'Elite Transport Co. - Authority Renewal',
          status: 'pending',
          dueDate: '2024-02-15',
          priority: 'high',
          description: 'Motor carrier authority renewal required',
          entity: 'Elite Transport Co.',
          lastUpdated: '2 hours ago'
        },
        {
          id: 'C002',
          type: 'driver',
          title: 'John Smith - CDL Medical Certificate',
          status: 'expired',
          dueDate: '2024-01-10',
          priority: 'high',
          description: 'CDL medical certificate has expired',
          entity: 'John Smith',
          lastUpdated: '1 day ago'
        },
        {
          id: 'C003',
          type: 'vehicle',
          title: 'Truck 12345 - Annual Inspection',
          status: 'compliant',
          dueDate: '2024-03-20',
          priority: 'medium',
          description: 'Annual vehicle inspection completed',
          entity: 'Truck 12345',
          lastUpdated: '1 week ago'
        },
        {
          id: 'C004',
          type: 'document',
          title: 'Swift Logistics - Insurance Certificate',
          status: 'non-compliant',
          dueDate: '2024-01-05',
          priority: 'high',
          description: 'Insurance certificate not provided',
          entity: 'Swift Logistics',
          lastUpdated: '3 days ago'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredItems = complianceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.entity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'expired': return 'text-red-600 bg-red-100';
      case 'non-compliant': return 'text-red-600 bg-red-100';
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'carrier': return <Truck className="w-4 h-4" />;
      case 'driver': return <Users className="w-4 h-4" />;
      case 'vehicle': return <Package className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
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
            Compliance Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Regulatory monitoring and compliance tracking
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors">
            <Brain className="w-4 h-4 mr-2 inline" />
            AI Compliance Scan
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="w-4 h-4 mr-2 inline" />
            Add Item
          </button>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Items</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{complianceItems.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Compliant</p>
              <p className="text-2xl font-bold text-green-600">
                {complianceItems.filter(item => item.status === 'compliant').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {complianceItems.filter(item => item.status === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical</p>
              <p className="text-2xl font-bold text-red-600">
                {complianceItems.filter(item => item.status === 'expired' || item.status === 'non-compliant').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
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
                placeholder="Search compliance items..."
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
              <option value="compliant">Compliant</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
              <option value="non-compliant">Non-Compliant</option>
            </select>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="carrier">Carrier</option>
              <option value="driver">Driver</option>
              <option value="vehicle">Vehicle</option>
              <option value="document">Document</option>
            </select>
            
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
              <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => {
              setSelectedItem(item);
              setViewMode('details');
            }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(item.type)}
                  <span className="text-xs font-medium text-gray-500 uppercase">{item.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {item.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Entity:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.entity}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Due Date:</span>
                  <span className={`font-medium ${
                    item.status === 'expired' || item.status === 'non-compliant' 
                      ? 'text-red-600' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {item.dueDate}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Updated: {item.lastUpdated}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors">
                      <Edit className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors">
                      <Download className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceCenter;

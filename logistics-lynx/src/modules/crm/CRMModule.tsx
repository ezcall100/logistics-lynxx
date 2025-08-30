import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Building, 
  Phone, 
  Mail, 
  Calendar,
  Target,
  TrendingUp,
  BarChart3,
  Search,
  Filter,
  Plus,
  Download
} from 'lucide-react';

interface CRMEntity {
  id: string;
  name: string;
  type: 'account' | 'contact' | 'lead' | 'deal';
  status: 'active' | 'inactive' | 'prospect' | 'qualified';
  value: number;
  lastContact: string;
  nextAction: string;
  assignedTo: string;
}

const CRMModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('accounts');
  const [entities] = useState<CRMEntity[]>([
    {
      id: '1',
      name: 'ABC Logistics',
      type: 'account',
      status: 'active',
      value: 125000,
      lastContact: '2024-01-15',
      nextAction: 'Follow up on contract renewal',
      assignedTo: 'John Smith'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      type: 'contact',
      status: 'active',
      value: 45000,
      lastContact: '2024-01-14',
      nextAction: 'Send proposal',
      assignedTo: 'Jane Doe'
    },
    {
      id: '3',
      name: 'XYZ Transport',
      type: 'lead',
      status: 'prospect',
      value: 75000,
      lastContact: '2024-01-10',
      nextAction: 'Schedule demo',
      assignedTo: 'Mike Wilson'
    },
    {
      id: '4',
      name: 'Contract Renewal - ABC',
      type: 'deal',
      status: 'qualified',
      value: 85000,
      lastContact: '2024-01-12',
      nextAction: 'Negotiate terms',
      assignedTo: 'John Smith'
    }
  ]);

  const tabs = [
    { id: 'accounts', label: 'Accounts', icon: Building, count: 45 },
    { id: 'contacts', label: 'Contacts', icon: Users, count: 128 },
    { id: 'leads', label: 'Leads', icon: UserPlus, count: 23 },
    { id: 'deals', label: 'Deals', icon: Target, count: 12 },
    { id: 'activities', label: 'Activities', icon: Calendar, count: 67 },
    { id: 'tasks', label: 'Tasks', icon: TrendingUp, count: 34 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CRM - Customer Relationship Management</h1>
          <p className="text-gray-600">Unified relationships system across all portals</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New
          </button>
        </div>
      </div>

      {/* CRM Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">45</h3>
          <p className="text-gray-600">Active Accounts</p>
          <p className="text-sm text-green-600 mt-1">+12% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">128</h3>
          <p className="text-gray-600">Total Contacts</p>
          <p className="text-sm text-green-600 mt-1">+8% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">$2.4M</h3>
          <p className="text-gray-600">Pipeline Value</p>
          <p className="text-sm text-green-600 mt-1">+15% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">67</h3>
          <p className="text-gray-600">Activities Today</p>
          <p className="text-sm text-green-600 mt-1">+5% vs yesterday</p>
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
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <span className="bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Search and Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search entities..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="btn-outline flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
            <div className="flex gap-2">
              <button className="btn-outline">Kanban View</button>
              <button className="btn-outline">Table View</button>
            </div>
          </div>

          {/* Entity List */}
          <div className="space-y-4">
            {entities.map((entity) => (
              <div key={entity.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      entity.type === 'account' ? 'bg-blue-100' :
                      entity.type === 'contact' ? 'bg-green-100' :
                      entity.type === 'lead' ? 'bg-yellow-100' :
                      'bg-purple-100'
                    }`}>
                      {entity.type === 'account' && <Building className="w-5 h-5 text-blue-600" />}
                      {entity.type === 'contact' && <Users className="w-5 h-5 text-green-600" />}
                      {entity.type === 'lead' && <UserPlus className="w-5 h-5 text-yellow-600" />}
                      {entity.type === 'deal' && <Target className="w-5 h-5 text-purple-600" />}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{entity.name}</h3>
                      <p className="text-sm text-gray-600">{entity.type} • {entity.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${entity.value.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Value</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{entity.assignedTo}</p>
                      <p className="text-xs text-gray-600">Assigned</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Calendar className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last Contact: {entity.lastContact}</span>
                    <span className="text-blue-600 font-medium">{entity.nextAction}</span>
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
            <UserPlus className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Add New Lead</h3>
          <p className="text-sm text-gray-600 mb-4">Create a new lead from any portal</p>
          <button className="btn-outline w-full">Create Lead</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Schedule Activity</h3>
          <p className="text-sm text-gray-600 mb-4">Log calls, meetings, and follow-ups</p>
          <button className="btn-outline w-full">Schedule</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">View Reports</h3>
          <p className="text-sm text-gray-600 mb-4">Analytics and performance insights</p>
          <button className="btn-outline w-full">View Reports</button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Phone className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-blue-900">Call with ABC Logistics</p>
              <p className="text-sm text-blue-700">Discussed contract renewal terms</p>
            </div>
            <span className="text-xs text-blue-600 ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Mail className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-green-900">Email sent to Sarah Johnson</p>
              <p className="text-sm text-green-700">Proposal for new service</p>
            </div>
            <span className="text-xs text-green-600 ml-auto">4 hours ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Target className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-purple-900">Deal won - XYZ Transport</p>
              <p className="text-sm text-purple-700">$75,000 contract signed</p>
            </div>
            <span className="text-xs text-purple-600 ml-auto">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMModule;

import React, { useState } from 'react';
import { 
  UserPlus, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Building,
  Filter,
  Search,
  Plus,
  MoreHorizontal,
  Download,
  Eye,
  Mail
} from 'lucide-react';

interface Application {
  id: string;
  companyName: string;
  type: 'carrier' | 'shipper' | 'broker';
  contactName: string;
  email: string;
  phone: string;
  status: 'draft' | 'submitted' | 'reviewing' | 'approved' | 'rejected';
  progress: number;
  submittedDate: string;
  lastUpdated: string;
  documents: string[];
  blockers: string[];
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
  uploadedDate?: string;
  expiryDate?: string;
  notes?: string;
}

const OnboardingModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const applications: Application[] = [
    {
      id: '1',
      companyName: 'ABC Trucking Co',
      type: 'carrier',
      contactName: 'John Smith',
      email: 'john.smith@abctrucking.com',
      phone: '(555) 123-4567',
      status: 'reviewing',
      progress: 75,
      submittedDate: '2024-01-15',
      lastUpdated: '2024-01-20',
      documents: ['W-9', 'COI', 'Authority'],
      blockers: ['Missing insurance certificate']
    },
    {
      id: '2',
      companyName: 'XYZ Manufacturing',
      type: 'shipper',
      contactName: 'Sarah Johnson',
      email: 'sarah.j@xyzmanufacturing.com',
      phone: '(555) 234-5678',
      status: 'approved',
      progress: 100,
      submittedDate: '2024-01-10',
      lastUpdated: '2024-01-18',
      documents: ['W-9', 'Credit Application'],
      blockers: []
    },
    {
      id: '3',
      companyName: 'Global Logistics Solutions',
      type: 'broker',
      contactName: 'Mike Wilson',
      email: 'mike.wilson@globallogistics.com',
      phone: '(555) 345-6789',
      status: 'submitted',
      progress: 60,
      submittedDate: '2024-01-20',
      lastUpdated: '2024-01-22',
      documents: ['W-9', 'Broker Authority'],
      blockers: ['Pending background check']
    }
  ];

  const documents: Document[] = [
    {
      id: '1',
      name: 'W-9 Tax Form',
      type: 'Tax Document',
      status: 'verified',
      uploadedDate: '2024-01-15',
      notes: 'All information verified'
    },
    {
      id: '2',
      name: 'Certificate of Insurance',
      type: 'Insurance',
      status: 'pending',
      expiryDate: '2024-12-31',
      notes: 'Required for carrier approval'
    },
    {
      id: '3',
      name: 'Motor Carrier Authority',
      type: 'Regulatory',
      status: 'uploaded',
      uploadedDate: '2024-01-18',
      notes: 'Under review'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'draft': 'bg-gray-100 text-gray-800',
      'submitted': 'bg-blue-100 text-blue-800',
      'reviewing': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'pending': 'bg-gray-100 text-gray-800',
      'uploaded': 'bg-blue-100 text-blue-800',
      'verified': 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'carrier': 'bg-blue-100 text-blue-800',
      'shipper': 'bg-green-100 text-green-800',
      'broker': 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Onboarding</h1>
          <p className="text-gray-600">Unified onboarding flows for Carrier, Shipper, and Broker</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Application
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by company name, contact, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="carrier">Carrier</option>
          <option value="shipper">Shipper</option>
          <option value="broker">Broker</option>
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
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">47</p>
            </div>
            <UserPlus className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved This Month</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Processing Time</p>
              <p className="text-2xl font-bold text-gray-900">3.2 days</p>
            </div>
            <FileText className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'applications'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Applications
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'documents'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Documents
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'templates'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('workflows')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'workflows'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Workflows
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Onboarding Applications</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{app.companyName}</div>
                          <div className="text-sm text-gray-500">{app.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(app.type)}`}>
                          {app.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{app.contactName}</div>
                          <div className="text-sm text-gray-500">{app.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(app.progress)}`}
                              style={{ width: `${app.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{app.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.submittedDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Review</button>
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

      {activeTab === 'documents' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Document Management</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.uploadedDate || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.expiryDate || '-'}</td>
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

      {activeTab === 'templates' && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Onboarding Templates</h3>
          <p className="text-gray-600">Manage application templates and document requirements</p>
          <button className="btn-primary mt-4">Manage Templates</button>
        </div>
      )}

      {activeTab === 'workflows' && (
        <div className="text-center py-12">
          <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Workflow Management</h3>
          <p className="text-gray-600">Configure approval workflows and automation rules</p>
          <button className="btn-primary mt-4">Configure Workflows</button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <UserPlus className="w-6 h-6 text-blue-600 mr-3" />
            <span className="font-medium">Start Application</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="w-6 h-6 text-green-600 mr-3" />
            <span className="font-medium">Upload Documents</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Mail className="w-6 h-6 text-purple-600 mr-3" />
            <span className="font-medium">Send Reminders</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModule;

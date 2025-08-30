import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText,
  Filter,
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Download,
  Calculator,
  Building
} from 'lucide-react';

interface FactoringCase {
  id: string;
  invoiceNumber: string;
  customer: string;
  amount: number;
  submittedDate: string;
  status: 'pending' | 'approved' | 'funded' | 'rejected';
  advanceRate: number;
  advanceAmount: number;
  reserveAmount: number;
  feeAmount: number;
  partner: string;
  notes: string;
}

interface Partner {
  id: string;
  name: string;
  rating: number;
  advanceRate: number;
  feeRate: number;
  minAmount: number;
  maxAmount: number;
  status: 'active' | 'inactive';
  specialties: string[];
  contactPerson: string;
  phone: string;
  email: string;
}

interface Analytics {
  totalOutstanding: number;
  fundedPercentage: number;
  averageFee: number;
  averageAdvanceRate: number;
  totalFunded: number;
  pendingAmount: number;
}

const FactoringModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cases');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const factoringCases: FactoringCase[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      customer: 'ABC Logistics',
      amount: 12500,
      submittedDate: '2024-01-15',
      status: 'funded',
      advanceRate: 85,
      advanceAmount: 10625,
      reserveAmount: 1875,
      feeAmount: 375,
      partner: 'QuickFund Solutions',
      notes: 'Standard factoring, customer has good payment history'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      customer: 'XYZ Transport',
      amount: 8900,
      submittedDate: '2024-01-18',
      status: 'approved',
      advanceRate: 80,
      advanceAmount: 7120,
      reserveAmount: 1780,
      feeAmount: 267,
      partner: 'FastCash Factoring',
      notes: 'Pending funding, documents verified'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      customer: 'Global Shipping Co',
      amount: 15600,
      submittedDate: '2024-01-20',
      status: 'pending',
      advanceRate: 0,
      advanceAmount: 0,
      reserveAmount: 0,
      feeAmount: 0,
      partner: 'TBD',
      notes: 'Under review, additional documentation required'
    }
  ];

  const partners: Partner[] = [
    {
      id: '1',
      name: 'QuickFund Solutions',
      rating: 4.8,
      advanceRate: 85,
      feeRate: 3.0,
      minAmount: 1000,
      maxAmount: 50000,
      status: 'active',
      specialties: ['Quick Funding', 'Same Day Advances'],
      contactPerson: 'John Smith',
      phone: '(555) 123-4567',
      email: 'john.smith@quickfund.com'
    },
    {
      id: '2',
      name: 'FastCash Factoring',
      rating: 4.6,
      advanceRate: 80,
      feeRate: 2.8,
      minAmount: 500,
      maxAmount: 25000,
      status: 'active',
      specialties: ['Low Fees', 'Flexible Terms'],
      contactPerson: 'Sarah Johnson',
      phone: '(555) 234-5678',
      email: 'sarah.j@fastcash.com'
    },
    {
      id: '3',
      name: 'Premium Factoring Co',
      rating: 4.9,
      advanceRate: 90,
      feeRate: 3.5,
      minAmount: 5000,
      maxAmount: 100000,
      status: 'active',
      specialties: ['High Advance Rates', 'Premium Service'],
      contactPerson: 'Mike Wilson',
      phone: '(555) 345-6789',
      email: 'mike.wilson@premiumfactoring.com'
    }
  ];

  const analytics: Analytics = {
    totalOutstanding: 45600,
    fundedPercentage: 78.5,
    averageFee: 2.9,
    averageAdvanceRate: 82.5,
    totalFunded: 35800,
    pendingAmount: 9800
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-blue-100 text-blue-800',
      'funded': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-sm ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Factoring</h1>
          <p className="text-gray-600">Dedicated financial operations for factoring services</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Submit Invoice
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search invoices, customers, or partners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="funded">Funded</option>
          <option value="rejected">Rejected</option>
        </select>
        <button className="btn-outline flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Outstanding</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.totalOutstanding.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Funded %</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.fundedPercentage}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Fee Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.averageFee}%</p>
            </div>
            <Calculator className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Advance Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.averageAdvanceRate}%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('cases')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'cases'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Factoring Cases
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'partners'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Partners
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Analytics
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
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'cases' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Factoring Cases</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Advance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {factoringCases.map((case_) => (
                    <tr key={case_.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{case_.invoiceNumber}</div>
                          <div className="text-sm text-gray-500">{case_.submittedDate}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{case_.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${case_.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">${case_.advanceAmount.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">{case_.advanceRate}%</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${case_.feeAmount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{case_.partner}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(case_.status)}`}>
                          {case_.status}
                        </span>
                      </td>
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

      {activeTab === 'partners' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div key={partner.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(partner.status)}`}>
                      {partner.status}
                    </span>
                  </div>
                  <div className="flex">
                    {getRatingStars(partner.rating)}
                  </div>
                </div>

                {/* Partner Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{partner.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>Advance Rate: <span className="font-medium text-gray-900">{partner.advanceRate}%</span></div>
                    <div>Fee Rate: <span className="font-medium text-gray-900">{partner.feeRate}%</span></div>
                    <div>Range: <span className="font-medium text-gray-900">${partner.minAmount.toLocaleString()} - ${partner.maxAmount.toLocaleString()}</span></div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">Specialties:</div>
                  <div className="flex flex-wrap gap-1">
                    {partner.specialties.map((specialty, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-1">Contact:</div>
                  <div className="text-sm font-medium text-gray-900">{partner.contactPerson}</div>
                  <div className="text-sm text-gray-500">{partner.email}</div>
                  <div className="text-sm text-gray-500">{partner.phone}</div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 btn-primary text-sm py-2">
                    Contact
                  </button>
                  <button className="btn-outline text-sm py-2 px-3">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Performance Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Performance Chart</p>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Funding Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Funded:</span>
                  <span className="font-medium">${analytics.totalFunded.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending Amount:</span>
                  <span className="font-medium">${analytics.pendingAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Fee:</span>
                  <span className="font-medium">{analytics.averageFee}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Advance Rate:</span>
                  <span className="font-medium">{analytics.averageAdvanceRate}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Partner Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Partners:</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Cases:</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="font-medium">94.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Processing Time:</span>
                  <span className="font-medium">2.3 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Document Management</h3>
          <p className="text-gray-600">Upload and manage factoring documents and agreements</p>
          <button className="btn-primary mt-4">Upload Documents</button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="w-6 h-6 text-blue-600 mr-3" />
            <span className="font-medium">Submit Invoice</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calculator className="w-6 h-6 text-green-600 mr-3" />
            <span className="font-medium">Calculate Advance</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Building className="w-6 h-6 text-purple-600 mr-3" />
            <span className="font-medium">Find Partner</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FactoringModule;

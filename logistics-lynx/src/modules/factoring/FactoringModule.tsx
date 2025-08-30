import React, { useState } from 'react';
import { 
  DollarSign, 
  Upload, 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  BarChart3,
  Search,
  Filter,
  Plus,
  Download,
  AlertCircle,
  Building,
  FileText,
  Calculator,
  CreditCard
} from 'lucide-react';

interface FactoringCase {
  id: string;
  invoiceNumber: string;
  customer: string;
  amount: number;
  status: 'pending' | 'approved' | 'funded' | 'rejected';
  submissionDate: string;
  approvalDate?: string;
  fundingDate?: string;
  reserveAmount: number;
  feeAmount: number;
  advanceAmount: number;
  factoringPartner: string;
  documents: string[];
  rejectionReason?: string;
}

interface FactoringPartner {
  id: string;
  name: string;
  rating: number;
  advanceRate: number;
  feeRate: number;
  reserveRate: number;
  sameDayFunding: boolean;
  achFunding: boolean;
  status: 'active' | 'inactive';
}

const FactoringModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('submissions');
  const [factoringCases] = useState<FactoringCase[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      customer: 'ABC Logistics',
      amount: 12500,
      status: 'funded',
      submissionDate: '2024-01-15',
      approvalDate: '2024-01-16',
      fundingDate: '2024-01-17',
      reserveAmount: 1250,
      feeAmount: 375,
      advanceAmount: 10875,
      factoringPartner: 'QuickFund Solutions',
      documents: ['Invoice', 'POD', 'Rate Con']
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      customer: 'XYZ Transport',
      amount: 8900,
      status: 'approved',
      submissionDate: '2024-01-18',
      approvalDate: '2024-01-19',
      reserveAmount: 890,
      feeAmount: 267,
      advanceAmount: 7743,
      factoringPartner: 'FastCash Factoring',
      documents: ['Invoice', 'POD']
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      customer: 'Peak Logistics',
      amount: 15600,
      status: 'pending',
      submissionDate: '2024-01-20',
      reserveAmount: 1560,
      feeAmount: 468,
      advanceAmount: 13572,
      factoringPartner: 'QuickFund Solutions',
      documents: ['Invoice', 'Rate Con']
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      customer: 'Mountain Goods',
      amount: 7200,
      status: 'rejected',
      submissionDate: '2024-01-19',
      reserveAmount: 720,
      feeAmount: 216,
      advanceAmount: 6264,
      factoringPartner: 'FastCash Factoring',
      documents: ['Invoice'],
      rejectionReason: 'Missing POD documentation'
    }
  ]);

  const [partners] = useState<FactoringPartner[]>([
    {
      id: '1',
      name: 'QuickFund Solutions',
      rating: 4.8,
      advanceRate: 87,
      feeRate: 3.0,
      reserveRate: 10,
      sameDayFunding: true,
      achFunding: true,
      status: 'active'
    },
    {
      id: '2',
      name: 'FastCash Factoring',
      rating: 4.5,
      advanceRate: 85,
      feeRate: 2.8,
      reserveRate: 12,
      sameDayFunding: false,
      achFunding: true,
      status: 'active'
    },
    {
      id: '3',
      name: 'Express Funding Co',
      rating: 4.2,
      advanceRate: 90,
      feeRate: 3.5,
      reserveRate: 8,
      sameDayFunding: true,
      achFunding: false,
      status: 'active'
    }
  ]);

  const tabs = [
    { id: 'submissions', label: 'Submissions', count: 24 },
    { id: 'pending', label: 'Pending', count: 8 },
    { id: 'approved', label: 'Approved', count: 12 },
    { id: 'funded', label: 'Funded', count: 156 },
    { id: 'rejected', label: 'Rejected', count: 3 },
    { id: 'partners', label: 'Partners', count: 5 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'approved': return 'text-blue-600 bg-blue-50';
      case 'funded': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'funded': return <DollarSign className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Factoring Portal - Financial Operations</h1>
          <p className="text-gray-600">Manage invoice factoring, advances, and partner relationships</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Submit Invoice
          </button>
        </div>
      </div>

      {/* Factoring Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">$2.4M</h3>
          <p className="text-gray-600">Total Outstanding</p>
          <p className="text-sm text-green-600 mt-1">+12% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">94.2%</h3>
          <p className="text-gray-600">Funding Rate</p>
          <p className="text-sm text-green-600 mt-1">+2.1% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">2.8%</h3>
          <p className="text-gray-600">Avg Fee Rate</p>
          <p className="text-sm text-green-600 mt-1">-0.2% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">1.2 days</h3>
          <p className="text-gray-600">Avg Funding Time</p>
          <p className="text-sm text-green-600 mt-1">-0.3 days vs last month</p>
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
                  placeholder="Search invoices, customers, or partners..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Partners</option>
                <option>QuickFund Solutions</option>
                <option>FastCash Factoring</option>
                <option>Express Funding Co</option>
              </select>
              <button className="btn-outline flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
            <div className="flex gap-2">
              <button className="btn-outline">Upload Documents</button>
              <button className="btn-outline">Request Advance</button>
            </div>
          </div>

          {/* Factoring Cases List */}
          <div className="space-y-4">
            {factoringCases.map((case_) => (
              <div key={case_.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{case_.invoiceNumber}</h3>
                      <p className="text-sm text-gray-600">{case_.customer} • {case_.factoringPartner}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(case_.status)}`}>
                      {getStatusIcon(case_.status)}
                      {case_.status}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Invoice Amount</p>
                    <p className="font-bold text-gray-900">${case_.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Advance Amount</p>
                    <p className="font-bold text-green-600">${case_.advanceAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Reserve & Fees</p>
                    <p className="font-medium text-gray-900">Reserve: ${case_.reserveAmount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Fee: ${case_.feeAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Submission Date</p>
                    <p className="font-medium text-gray-900">{case_.submissionDate}</p>
                    {case_.fundingDate && (
                      <p className="text-xs text-gray-500">Funded: {case_.fundingDate}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex gap-2">
                    <button className="btn-outline text-sm">View Details</button>
                    {case_.status === 'pending' && (
                      <button className="btn-primary text-sm">Upload Documents</button>
                    )}
                    {case_.status === 'approved' && (
                      <button className="btn-primary text-sm">Request Funding</button>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="flex gap-1">
                      {case_.documents.map((doc, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">{doc}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {case_.rejectionReason && (
                  <div className="mt-3 p-3 bg-red-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-900">Rejection Reason</p>
                        <p className="text-sm text-red-700">{case_.rejectionReason}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Upload className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Submit Invoice</h3>
          <p className="text-sm text-gray-600 mb-4">Upload invoice and supporting documents for factoring</p>
          <button className="btn-outline w-full">Submit Invoice</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CreditCard className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Request Advance</h3>
          <p className="text-sm text-gray-600 mb-4">Get same-day or ACH funding on approved invoices</p>
          <button className="btn-outline w-full">Request Advance</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">View Analytics</h3>
          <p className="text-sm text-gray-600 mb-4">Track performance, fees, and partner relationships</p>
          <button className="btn-outline w-full">View Analytics</button>
        </div>
      </div>

      {/* Partner Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Factoring Partners Performance</h3>
        <div className="space-y-4">
          {partners.map((partner) => (
            <div key={partner.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{partner.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < Math.floor(partner.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({partner.rating})</span>
                    </div>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  partner.status === 'active' ? 'text-green-600 bg-green-50' : 'text-gray-600 bg-gray-50'
                }`}>
                  {partner.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Advance Rate</p>
                  <p className="font-bold text-green-600">{partner.advanceRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fee Rate</p>
                  <p className="font-bold text-gray-900">{partner.feeRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Reserve Rate</p>
                  <p className="font-bold text-gray-900">{partner.reserveRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Funding Options</p>
                  <div className="flex gap-1">
                    {partner.sameDayFunding && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Same Day</span>
                    )}
                    {partner.achFunding && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">ACH</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-green-900">Invoice INV-2024-001 funded</p>
              <p className="text-sm text-green-700">$10,875 advanced to account</p>
            </div>
            <span className="text-xs text-green-600 ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-blue-900">Invoice INV-2024-002 approved</p>
              <p className="text-sm text-blue-700">Ready for funding request</p>
            </div>
            <span className="text-xs text-blue-600 ml-auto">4 hours ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Upload className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="font-medium text-yellow-900">New invoice submitted</p>
              <p className="text-sm text-yellow-700">INV-2024-003 for $15,600</p>
            </div>
            <span className="text-xs text-yellow-600 ml-auto">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactoringModule;

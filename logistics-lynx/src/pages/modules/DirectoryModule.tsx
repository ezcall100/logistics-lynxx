import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Star, 
  Users, 
  Truck, 
  Package,
  Filter,
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Mail,
  Phone,
  Globe
} from 'lucide-react';

interface Company {
  id: string;
  name: string;
  type: 'shipper' | 'broker' | 'carrier' | 'vendor' | 'facility';
  industry: string;
  location: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  rating: number;
  reviewCount: number;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  complianceStatus: 'compliant' | 'non-compliant' | 'pending';
  equipment: string[];
  lanes: string[];
  specialties: string[];
  lastUpdated: string;
}

interface Contact {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  department: string;
  isPrimary: boolean;
}

const DirectoryModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('companies');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const companies: Company[] = [
    {
      id: '1',
      name: 'ABC Manufacturing Co',
      type: 'shipper',
      industry: 'Manufacturing',
      location: 'Chicago, IL',
      contactPerson: 'John Smith',
      email: 'john.smith@abcmanufacturing.com',
      phone: '(555) 123-4567',
      website: 'www.abcmanufacturing.com',
      rating: 4.8,
      reviewCount: 45,
      status: 'active',
      complianceStatus: 'compliant',
      equipment: ['Dry Van', 'Reefer'],
      lanes: ['Chicago → Dallas', 'Chicago → Atlanta'],
      specialties: ['Electronics', 'Consumer Goods'],
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      name: 'XYZ Logistics Solutions',
      type: 'broker',
      industry: 'Logistics',
      location: 'Atlanta, GA',
      contactPerson: 'Sarah Johnson',
      email: 'sarah.j@xyzlogistics.com',
      phone: '(555) 234-5678',
      website: 'www.xyzlogistics.com',
      rating: 4.6,
      reviewCount: 32,
      status: 'active',
      complianceStatus: 'compliant',
      equipment: ['All Types'],
      lanes: ['Southeast', 'Northeast', 'Midwest'],
      specialties: ['Expedited', 'Temperature Controlled'],
      lastUpdated: '2024-01-12'
    },
    {
      id: '3',
      name: 'Global Trucking Inc',
      type: 'carrier',
      industry: 'Transportation',
      location: 'Dallas, TX',
      contactPerson: 'Mike Wilson',
      email: 'mike.wilson@globaltrucking.com',
      phone: '(555) 345-6789',
      website: 'www.globaltrucking.com',
      rating: 4.7,
      reviewCount: 67,
      status: 'active',
      complianceStatus: 'compliant',
      equipment: ['Dry Van', 'Flatbed', 'Power Only'],
      lanes: ['Texas', 'California', 'Florida'],
      specialties: ['Oversized Loads', 'Hazmat'],
      lastUpdated: '2024-01-18'
    }
  ];

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'John Smith',
      title: 'Operations Manager',
      company: 'ABC Manufacturing Co',
      email: 'john.smith@abcmanufacturing.com',
      phone: '(555) 123-4567',
      department: 'Operations',
      isPrimary: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      title: 'Logistics Coordinator',
      company: 'XYZ Logistics Solutions',
      email: 'sarah.j@xyzlogistics.com',
      phone: '(555) 234-5678',
      department: 'Logistics',
      isPrimary: true
    },
    {
      id: '3',
      name: 'Mike Wilson',
      title: 'Fleet Manager',
      company: 'Global Trucking Inc',
      email: 'mike.wilson@globaltrucking.com',
      phone: '(555) 345-6789',
      department: 'Fleet Operations',
      isPrimary: true
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'suspended': 'bg-red-100 text-red-800',
      'compliant': 'bg-green-100 text-green-800',
      'non-compliant': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'shipper': 'bg-blue-100 text-blue-800',
      'broker': 'bg-purple-100 text-purple-800',
      'carrier': 'bg-green-100 text-green-800',
      'vendor': 'bg-orange-100 text-orange-800',
      'facility': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Directory</h1>
          <p className="text-gray-600">Global directory for Shippers, Brokers, Carriers, and others</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Company
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search companies, contacts, or specialties..."
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
          <option value="shipper">Shipper</option>
          <option value="broker">Broker</option>
          <option value="carrier">Carrier</option>
          <option value="vendor">Vendor</option>
          <option value="facility">Facility</option>
        </select>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Locations</option>
          <option value="chicago">Chicago, IL</option>
          <option value="atlanta">Atlanta, GA</option>
          <option value="dallas">Dallas, TX</option>
          <option value="los-angeles">Los Angeles, CA</option>
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
              <p className="text-sm text-gray-600">Total Companies</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <Building className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Carriers</p>
              <p className="text-2xl font-bold text-gray-900">456</p>
            </div>
            <Truck className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Verified Shippers</p>
              <p className="text-2xl font-bold text-gray-900">234</p>
            </div>
            <Package className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Contacts</p>
              <p className="text-2xl font-bold text-gray-900">3,891</p>
            </div>
            <Users className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('companies')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'companies'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Companies
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'contacts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Contacts
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'map'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Map View
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reports'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Reports
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'companies' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div key={company.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(company.type)}`}>
                      {company.type}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(company.status)}`}>
                      {company.status}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Company Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{company.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="flex mr-2">
                      {getRatingStars(company.rating)}
                    </div>
                    <span className="text-sm text-gray-600">({company.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-1">Primary Contact:</div>
                  <div className="text-sm font-medium text-gray-900">{company.contactPerson}</div>
                  <div className="text-sm text-gray-500">{company.email}</div>
                  <div className="text-sm text-gray-500">{company.phone}</div>
                </div>

                {/* Equipment & Lanes */}
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">Equipment:</div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {company.equipment.slice(0, 3).map((equipment, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {equipment}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">Primary Lanes:</div>
                  <div className="flex flex-wrap gap-1">
                    {company.lanes.slice(0, 2).map((lane, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        {lane}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Compliance */}
                <div className="mb-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(company.complianceStatus)}`}>
                    {company.complianceStatus}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 btn-primary text-sm py-2">
                    View Profile
                  </button>
                  <button className="btn-outline text-sm py-2 px-3">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="btn-outline text-sm py-2 px-3">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Company Contacts</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                          {contact.isPrimary && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              Primary
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.phone}</td>
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

      {activeTab === 'map' && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h3>
          <p className="text-gray-600">View companies and contacts on an interactive map</p>
          <button className="btn-primary mt-4">Open Map</button>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="text-center py-12">
          <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Directory Reports</h3>
          <p className="text-gray-600">Generate reports and analytics on directory data</p>
          <button className="btn-primary mt-4">Generate Report</button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Building className="w-6 h-6 text-blue-600 mr-3" />
            <span className="font-medium">Add Company</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="w-6 h-6 text-green-600 mr-3" />
            <span className="font-medium">Import Contacts</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Globe className="w-6 h-6 text-purple-600 mr-3" />
            <span className="font-medium">Export Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DirectoryModule;

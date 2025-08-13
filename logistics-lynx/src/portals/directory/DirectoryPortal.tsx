import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { 
  Building2, 
  MapPin, 
  Users, 
  Shield, 
  Star, 
  List,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Network
} from 'lucide-react';

// Import sub-components (to be created)
import { ExploreDirectory } from './components/ExploreDirectory';
import { CompanyProfile } from './components/CompanyProfile';
import { FacilityProfile } from './components/FacilityProfile';
import { ListsManager } from './components/ListsManager';
import { Scorecards } from './components/Scorecards';

interface DirectoryPortalProps {
  companyId: string;
  userRole: string;
}

export const DirectoryPortal: React.FC<DirectoryPortalProps> = ({ companyId, userRole }) => {
  const [activeTab, setActiveTab] = React.useState('explore');
  const [searchQuery, setSearchQuery] = React.useState('');

  const navigationItems = [
    { id: 'explore', label: 'Explore', icon: Network, description: 'Search and discover companies' },
    { id: 'companies', label: 'Companies', icon: Building2, description: 'Company profiles and details' },
    { id: 'facilities', label: 'Facilities', icon: MapPin, description: 'Facility management' },
    { id: 'contacts', label: 'Contacts', icon: Users, description: 'People and relationships' },
    { id: 'verification', label: 'Verification', icon: Shield, description: 'Compliance and badges' },
    { id: 'lists', label: 'Lists', icon: List, description: 'Preferred and blocked lists' },
    { id: 'scorecards', label: 'Scorecards', icon: Star, description: 'Performance metrics' },
  ];

  const networkStats = [
    { label: 'Total Companies', value: '1,247', change: '+23', trend: 'up' },
    { label: 'Active Facilities', value: '892', change: '+15', trend: 'up' },
    { label: 'Verified Partners', value: '89%', change: '+2%', trend: 'up' },
    { label: 'Avg Response Time', value: '2.1h', change: '-0.5h', trend: 'down' },
  ];

  const recentActivity = [
    { type: 'company', action: 'Added', name: 'ABC Logistics', time: '2 hours ago' },
    { type: 'facility', action: 'Updated', name: 'XYZ Warehouse', time: '4 hours ago' },
    { type: 'verification', action: 'Verified', name: 'DEF Transport', time: '6 hours ago' },
    { type: 'contact', action: 'Connected', name: 'John Smith', time: '1 day ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Directory Portal</h1>
            <p className="text-sm text-gray-600">Living network graph of companies, facilities, and contacts</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search companies, facilities, contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Company
            </Button>
          </div>
        </div>
      </div>

      {/* Network Stats */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {networkStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <Badge 
                    variant={stat.trend === 'up' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Navigation and Content */}
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div>{item.label}</div>
                        <div className="text-xs text-gray-500 font-normal">{item.description}</div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Recent Activity */}
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Activity</h3>
            <div className="space-y-2">
              {recentActivity.map((activity, index) => (
                <div key={index} className="text-xs text-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{activity.action}</span>
                    <span>{activity.time}</span>
                  </div>
                  <div className="text-gray-500">{activity.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export Directory
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Upload className="h-4 w-4 mr-2" />
                Import Data
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<ExploreDirectory companyId={companyId} searchQuery={searchQuery} />} />
            <Route path="/companies" element={<CompanyProfile companyId={companyId} />} />
            <Route path="/facilities" element={<FacilityProfile companyId={companyId} />} />
            <Route path="/lists" element={<ListsManager companyId={companyId} />} />
            <Route path="/scorecards" element={<Scorecards companyId={companyId} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

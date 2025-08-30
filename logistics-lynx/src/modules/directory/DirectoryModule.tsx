import React, { useState } from 'react';

const DirectoryModule: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'shippers' | 'brokers' | 'carriers' | 'facilities' | 'vendors'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');

  const directoryStats = {
    totalEntities: 12478,
    shippers: 3456,
    brokers: 1234,
    carriers: 5678,
    facilities: 1890,
    vendors: 220
  };

  const categories = [
    { id: 'all', label: 'All Entities', icon: '🌐', count: directoryStats.totalEntities },
    { id: 'shippers', label: 'Shippers', icon: '📦', count: directoryStats.shippers },
    { id: 'brokers', label: 'Brokers', icon: '🛣️', count: directoryStats.brokers },
    { id: 'carriers', label: 'Carriers', icon: '🏢', count: directoryStats.carriers },
    { id: 'facilities', label: 'Facilities', icon: '🏭', count: directoryStats.facilities },
    { id: 'vendors', label: 'Vendors', icon: '🛠️', count: directoryStats.vendors }
  ];

  const regions = [
    { id: 'all', label: 'All Regions', count: directoryStats.totalEntities },
    { id: 'northeast', label: 'Northeast', count: 2345 },
    { id: 'southeast', label: 'Southeast', count: 3456 },
    { id: 'midwest', label: 'Midwest', count: 2987 },
    { id: 'west', label: 'West', count: 2345 },
    { id: 'southwest', label: 'Southwest', count: 1345 }
  ];

  const featuredEntities = [
    {
      id: 1,
      name: 'Global Logistics Corp',
      type: 'shipper',
      rating: 4.8,
      location: 'Chicago, IL',
      lanes: ['Chicago → LA', 'Chicago → NYC', 'Chicago → Miami'],
      compliance: 'Verified',
      equipment: ['Dry Van', 'Reefer', 'Flatbed'],
      score: 95
    },
    {
      id: 2,
      name: 'Express Transport Solutions',
      type: 'carrier',
      rating: 4.7,
      location: 'Dallas, TX',
      lanes: ['Dallas → Chicago', 'Dallas → Atlanta', 'Dallas → Phoenix'],
      compliance: 'Verified',
      equipment: ['Dry Van', 'Power Only'],
      score: 92
    },
    {
      id: 3,
      name: 'Premier Freight Brokers',
      type: 'broker',
      rating: 4.9,
      location: 'Atlanta, GA',
      lanes: ['Southeast → Midwest', 'Southeast → Northeast'],
      compliance: 'Verified',
      equipment: ['All Types'],
      score: 98
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      {/* Holographic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <span className="text-white font-bold text-xl">📚</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent">
              Directory
            </h1>
            <p className="text-xl text-gray-300 mt-2">Global Business Entity Directory</p>
          </div>
        </div>

        {/* Directory Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card border border-blue-500/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{directoryStats.totalEntities.toLocaleString()}</div>
              <div className="text-gray-300">Total Entities</div>
            </div>
          </div>
          <div className="glass-card border border-indigo-500/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-400">{directoryStats.carriers.toLocaleString()}</div>
              <div className="text-gray-300">Carriers</div>
            </div>
          </div>
          <div className="glass-card border border-purple-500/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{directoryStats.shippers.toLocaleString()}</div>
              <div className="text-gray-300">Shippers</div>
            </div>
          </div>
          <div className="glass-card border border-cyan-500/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{directoryStats.brokers.toLocaleString()}</div>
              <div className="text-gray-300">Brokers</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search companies, locations, or equipment types..."
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
              >
                {regions.map((region) => (
                  <option key={region.id} value={region.id} className="bg-gray-800">
                    {region.label} ({region.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-xl rounded-xl p-1 border border-white/20 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.label}</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{category.count.toLocaleString()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Entities */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Entities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEntities.map((entity) => (
              <div key={entity.id} className="glass-card border border-blue-500/20 hover:border-indigo-500/40 transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{entity.name}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-gray-300">{entity.rating}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-300 capitalize">{entity.type}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">{entity.score}</div>
                      <div className="text-xs text-gray-400">Score</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-400">📍</span>
                      <span className="text-gray-300 text-sm">{entity.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">✅</span>
                      <span className="text-gray-300 text-sm">{entity.compliance}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-300 mb-2">Equipment Types:</div>
                    <div className="flex flex-wrap gap-1">
                      {entity.equipment.map((equip, index) => (
                        <span key={index} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                          {equip}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-300 mb-2">Primary Lanes:</div>
                    <div className="space-y-1">
                      {entity.lanes.slice(0, 2).map((lane, index) => (
                        <div key={index} className="text-xs text-gray-400">• {lane}</div>
                      ))}
                      {entity.lanes.length > 2 && (
                        <div className="text-xs text-gray-500">+{entity.lanes.length - 2} more lanes</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                      View Profile
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Directory Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card border border-indigo-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Directory Intelligence</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-indigo-400">🔍</span>
                <span className="text-gray-300">Advanced Search & Filters</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-indigo-400">📊</span>
                <span className="text-gray-300">Compliance & Rating Tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-indigo-400">🎯</span>
                <span className="text-gray-300">Lane & Equipment Matching</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-indigo-400">🤖</span>
                <span className="text-gray-300">AI-Powered Recommendations</span>
              </div>
            </div>
          </div>
          
          <div className="glass-card border border-blue-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Business Actions</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">📧</span>
                <span className="text-gray-300">Direct Messaging</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">📋</span>
                <span className="text-gray-300">Request Quotes</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">🔗</span>
                <span className="text-gray-300">CRM Integration</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">📈</span>
                <span className="text-gray-300">Performance Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectoryModule;

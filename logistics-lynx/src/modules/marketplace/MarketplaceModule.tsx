import React, { useState } from 'react';

const MarketplaceModule: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'tms' | 'eld' | 'tracking' | 'billing' | 'analytics'>('all');
  const [filterType, setFilterType] = useState<'featured' | 'popular' | 'new' | 'trending'>('featured');

  const marketplaceStats = {
    totalApps: 247,
    activeInstalls: 1247,
    totalDownloads: 8923,
    avgRating: 4.6
  };

  const categories = [
    { id: 'all', label: 'All Apps', icon: '📱', count: 247 },
    { id: 'tms', label: 'TMS', icon: '🚛', count: 45 },
    { id: 'eld', label: 'ELD', icon: '📊', count: 23 },
    { id: 'tracking', label: 'Tracking', icon: '📍', count: 34 },
    { id: 'billing', label: 'Billing', icon: '💰', count: 28 },
    { id: 'analytics', icon: '📈', label: 'Analytics', count: 31 }
  ];

  const featuredApps = [
    {
      id: 1,
      name: 'SmartRoute Pro',
      category: 'tms',
      rating: 4.8,
      downloads: 1247,
      price: 'Free',
      description: 'AI-powered route optimization with real-time traffic integration',
      features: ['Route Optimization', 'Traffic Integration', 'Fuel Efficiency', 'Driver Communication']
    },
    {
      id: 2,
      name: 'ELD Connect',
      category: 'eld',
      rating: 4.7,
      downloads: 892,
      price: '$29/month',
      description: 'Comprehensive ELD solution with HOS compliance and DVIR management',
      features: ['HOS Compliance', 'DVIR Management', 'Real-time Alerts', 'FMCSA Integration']
    },
    {
      id: 3,
      name: 'TrackMaster',
      category: 'tracking',
      rating: 4.6,
      downloads: 1567,
      price: '$19/month',
      description: 'Advanced GPS tracking with geofencing and temperature monitoring',
      features: ['GPS Tracking', 'Geofencing', 'Temperature Monitoring', 'Mobile App']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Holographic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <span className="text-white font-bold text-xl">🛒</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Marketplace
            </h1>
            <p className="text-xl text-gray-300 mt-2">Discover → Install → Configure Apps & Integrations</p>
          </div>
        </div>

        {/* Marketplace Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card border border-indigo-500/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-400">{marketplaceStats.totalApps}</div>
              <div className="text-gray-300">Total Apps</div>
            </div>
          </div>
          <div className="glass-card border border-purple-500/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{marketplaceStats.activeInstalls}</div>
              <div className="text-gray-300">Active Installs</div>
            </div>
          </div>
          <div className="glass-card border border-blue-500/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{marketplaceStats.totalDownloads}</div>
              <div className="text-gray-300">Total Downloads</div>
            </div>
          </div>
          <div className="glass-card border border-cyan-500/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{marketplaceStats.avgRating}</div>
              <div className="text-gray-300">Avg Rating</div>
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
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.label}</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter Options */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-xl rounded-xl p-1 border border-white/20 max-w-md">
            {[
              { id: 'featured', label: 'Featured', icon: '⭐' },
              { id: 'popular', label: 'Popular', icon: '🔥' },
              { id: 'new', label: 'New', icon: '🆕' },
              { id: 'trending', label: 'Trending', icon: '📈' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilterType(filter.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  filterType === filter.id
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-sm">{filter.icon}</span>
                <span className="text-sm font-medium">{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredApps.map((app) => (
            <div key={app.id} className="glass-card border border-indigo-500/20 hover:border-purple-500/40 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{app.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-gray-300">{app.rating}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-300">{app.downloads} downloads</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">{app.price}</div>
                    <div className="text-xs text-gray-400 capitalize">{app.category}</div>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{app.description}</p>
                
                <div className="space-y-2 mb-4">
                  {app.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-indigo-400">✓</span>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                    Install
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Hub */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Integration Hub</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-4">Popular Integrations</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-purple-400">🔗</span>
                  <span className="text-gray-300">QuickBooks Integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-400">🔗</span>
                  <span className="text-gray-300">Salesforce CRM</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-400">🔗</span>
                  <span className="text-gray-300">Google Maps API</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-400">🔗</span>
                  <span className="text-gray-300">Weather API</span>
                </div>
              </div>
            </div>
            
            <div className="glass-card border border-indigo-500/20">
              <h3 className="text-xl font-semibold text-white mb-4">Development Tools</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-indigo-400">🛠️</span>
                  <span className="text-gray-300">API Documentation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-indigo-400">🛠️</span>
                  <span className="text-gray-300">SDK Downloads</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-indigo-400">🛠️</span>
                  <span className="text-gray-300">Webhook Setup</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-indigo-400">🛠️</span>
                  <span className="text-gray-300">Testing Environment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceModule;

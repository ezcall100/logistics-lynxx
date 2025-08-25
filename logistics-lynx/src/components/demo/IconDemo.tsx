import React, { useState } from 'react';
import { EnhancedLayout } from '../layout/EnhancedLayout';
import { EnhancedIcon, IconSets } from '../ui/EnhancedIcon';

export const IconDemo: React.FC = () => {
  const [selectedLibrary, setSelectedLibrary] = useState<'lucide' | 'heroicons' | 'tabler'>('lucide');
  const [iconSize, setIconSize] = useState(24);

  const user = {
    name: 'Demo User',
    email: 'demo@logisticslynx.com',
    role: 'Admin',
    avatar: undefined
  };

  const demoIcons = [
    { name: 'Truck', category: 'TMS' },
    { name: 'Package', category: 'TMS' },
    { name: 'Route', category: 'TMS' },
    { name: 'MapPin', category: 'TMS' },
    { name: 'Users', category: 'Navigation' },
    { name: 'Settings', category: 'Navigation' },
    { name: 'BarChart3', category: 'Navigation' },
    { name: 'Shield', category: 'Navigation' },
    { name: 'Activity', category: 'Navigation' },
    { name: 'Server', category: 'Navigation' },
    { name: 'Briefcase', category: 'Navigation' },
    { name: 'Code', category: 'Navigation' },
    { name: 'Plus', category: 'Actions' },
    { name: 'Edit', category: 'Actions' },
    { name: 'Trash2', category: 'Actions' },
    { name: 'Eye', category: 'Actions' },
    { name: 'Download', category: 'Actions' },
    { name: 'Upload', category: 'Actions' },
    { name: 'Search', category: 'Actions' },
    { name: 'Filter', category: 'Actions' },
    { name: 'CheckCircle', category: 'Status' },
    { name: 'XCircle', category: 'Status' },
    { name: 'AlertTriangle', category: 'Status' },
    { name: 'Info', category: 'Status' },
    { name: 'Loader2', category: 'Status' },
    { name: 'WifiOff', category: 'Status' },
    { name: 'Wifi', category: 'Status' }
  ];

  const categories = ['TMS', 'Navigation', 'Actions', 'Status'];

  return (
    <EnhancedLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Enhanced Icon System Demo
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Showcasing improved icons, enhanced sidebar, and modern UI/UX design
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Library:</span>
                <select
                  value={selectedLibrary}
                  onChange={(e) => setSelectedLibrary(e.target.value as any)}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="lucide">Lucide</option>
                  <option value="heroicons">Heroicons</option>
                  <option value="tabler">Tabler</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Size:</span>
                <input
                  type="range"
                  min="16"
                  max="48"
                  value={iconSize}
                  onChange={(e) => setIconSize(Number(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{iconSize}px</span>
              </div>
            </div>
          </div>
        </div>

        {/* Icon Categories */}
        {categories.map(category => (
          <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <EnhancedIcon 
                  name={category === 'TMS' ? 'Truck' : category === 'Navigation' ? 'Compass' : category === 'Actions' ? 'Zap' : 'Activity'} 
                  size={20} 
                  className="text-blue-500" 
                />
                <span>{category} Icons</span>
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {demoIcons
                  .filter(icon => icon.category === category)
                  .map(icon => (
                    <div
                      key={icon.name}
                      className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
                    >
                      <EnhancedIcon
                        name={icon.name}
                        library={selectedLibrary}
                        size={iconSize}
                        className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                        {icon.name}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}

        {/* Features Showcase */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Enhanced Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <EnhancedIcon name="Search" size={24} className="text-blue-500 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Smart Search</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Search through menus and content with intelligent filtering
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <EnhancedIcon name="Zap" size={24} className="text-green-500 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Quick Actions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Floating action buttons for common tasks and shortcuts
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <EnhancedIcon name="Moon" size={24} className="text-purple-500 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Seamless dark/light mode switching with system preference detection
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <EnhancedIcon name="Smartphone" size={24} className="text-orange-500 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Responsive Design</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Fully responsive layout that works on all device sizes
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <EnhancedIcon name="Keyboard" size={24} className="text-indigo-500 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Keyboard Shortcuts</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Power user shortcuts for faster navigation and actions
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <EnhancedIcon name="Activity" size={24} className="text-red-500 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Real-time Status</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Live system status indicators and health monitoring
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Usage Examples
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Basic Icon Usage</h3>
              <div className="flex items-center space-x-4">
                <EnhancedIcon name="Truck" size={24} className="text-blue-500" />
                <EnhancedIcon name="Package" size={24} className="text-green-500" />
                <EnhancedIcon name="Route" size={24} className="text-purple-500" />
                <EnhancedIcon name="MapPin" size={24} className="text-red-500" />
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Animated Icons</h3>
              <div className="flex items-center space-x-4">
                <EnhancedIcon name="Loader2" size={24} className="text-blue-500 animate-spin" />
                <EnhancedIcon name="Activity" size={24} className="text-green-500 animate-pulse" />
                <EnhancedIcon name="Heart" size={24} className="text-red-500 animate-bounce" />
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Interactive Icons</h3>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors duration-200">
                  <EnhancedIcon name="Plus" size={20} className="text-blue-600 dark:text-blue-400" />
                </button>
                <button className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors duration-200">
                  <EnhancedIcon name="Edit" size={20} className="text-green-600 dark:text-green-400" />
                </button>
                <button className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors duration-200">
                  <EnhancedIcon name="Trash2" size={20} className="text-red-600 dark:text-red-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EnhancedLayout>
  );
};

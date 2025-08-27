import React, { useState, useEffect } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { EnhancedButton } from '@/components/ui/EnhancedUIComponents';
import { Settings } from 'lucide-react';

interface PortalConfigurationProps {}

const PortalConfiguration: React.FC<PortalConfigurationProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Portal Configuration
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Settings, branding, customization options
        </p>
      </div>

      {/* Main Content */}
      <ResponsiveCard>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Portal Configuration</h3>
          <p className="text-slate-600 dark:text-slate-400">Settings, branding, customization options</p>
        </div>
        <div>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Portal Configuration
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Settings, branding, customization options
              </p>
              <div className="mt-4 space-y-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Portal Settings</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Branding Customization</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Theme Management</span>
              </div>
              <EnhancedButton className="mt-6">
                Configure Portal Configuration
              </EnhancedButton>
            </div>
          )}
        </div>
      </ResponsiveCard>
    </div>
  );
};

export default PortalConfiguration;

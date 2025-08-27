import React, { useState, useEffect } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { EnhancedButton } from '@/components/ui/EnhancedUIComponents';
import { Plug } from 'lucide-react';

interface IntegrationHubProps {}

const IntegrationHub: React.FC<IntegrationHubProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Plug className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Integration Hub
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Third-party integrations, API connections, webhooks
        </p>
      </div>

      {/* Main Content */}
      <ResponsiveCard>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Integration Hub</h3>
          <p className="text-slate-600 dark:text-slate-400">Third-party integrations, API connections, webhooks</p>
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
              <Plug className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Integration Hub
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Third-party integrations, API connections, webhooks
              </p>
              <div className="mt-4 space-y-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Third Party Apis</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Webhook Management</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Integration Health</span>
              </div>
              <EnhancedButton className="mt-6">
                Configure Integration Hub
              </EnhancedButton>
            </div>
          )}
        </div>
      </ResponsiveCard>
    </div>
  );
};

export default IntegrationHub;

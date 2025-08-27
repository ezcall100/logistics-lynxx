import React from 'react';

import ResponsiveCard from '@/components/ui/ResponsiveCard';
const AboutSettings: React.FC = () => {
  const systemInfo = {
    version: '2.1.0',
    buildNumber: '2024.01.15',
    lastUpdated: '2024-01-15',
    license: 'Enterprise',
    licenseExpiry: '2025-01-15',
    activeFeatures: [
      'Core TMS',
      'Advanced Analytics',
      'Autonomous Agents',
      'Multi-Portal Support',
      'API Integration',
      'Mobile Support'
    ],
    systemStatus: 'Healthy',
    uptime: '99.9%',
    supportContact: 'support@logisticslynx.com'
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">About System</h2>
        <p className="text-muted-foreground">
          System information, version details, and support information.
        </p>
      </div>

      <ResponsiveCard>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">System Information</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Current system version and build details
          </p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Version</p>
              <p className="text-lg font-semibold">{systemInfo.version}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Build Number</p>
              <p className="text-lg font-semibold">{systemInfo.buildNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
              <p className="text-lg font-semibold">{systemInfo.lastUpdated}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">System Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">{systemInfo.systemStatus}</span>
            </div>
          </div>
        </div>
      </ResponsiveCard>

      <ResponsiveCard>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">License Information</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Current license and subscription details
          </p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">License Type</p>
              <p className="text-lg font-semibold">{systemInfo.license}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Expiry Date</p>
              <p className="text-lg font-semibold">{systemInfo.licenseExpiry}</p>
            </div>
          </div>
        </div>
      </ResponsiveCard>

      <ResponsiveCard>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Active Features</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Currently enabled system features and modules
          </p>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-2">
            {systemInfo.activeFeatures.map((feature) => (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </ResponsiveCard>

      <ResponsiveCard>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Performance Metrics</h3>
          <p className="text-slate-600 dark:text-slate-400">
            System performance and reliability statistics
          </p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Uptime</p>
              <p className="text-lg font-semibold">{systemInfo.uptime}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Support Contact</p>
              <p className="text-lg font-semibold">{systemInfo.supportContact}</p>
            </div>
          </div>
        </div>
      </ResponsiveCard>

      <div className="flex justify-end space-x-2">
        <EnhancedButton variant="outline">Check for Updates</EnhancedButton>
      </div>
    </div>
  );
};

export default AboutSettings;

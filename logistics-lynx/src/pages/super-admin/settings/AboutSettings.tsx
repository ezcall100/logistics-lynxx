import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card.tsx'
import { Button } from '../../../components/ui/button.tsx'
import { Badge } from '../../../components/ui/badge.tsx'

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

      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>
            Current system version and build details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
              <Badge variant="success">{systemInfo.systemStatus}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>License Information</CardTitle>
          <CardDescription>
            Current license and subscription details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Features</CardTitle>
          <CardDescription>
            Currently enabled system features and modules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {systemInfo.activeFeatures.map((feature, index) => (
              <Badge key={index} variant="outline" className="justify-start">
                {feature}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>
            System performance and reliability statistics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Check for Updates</Button>
        <Button>Contact Support</Button>
      </div>
    </div>
  );
};

export default AboutSettings;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { ShieldCheck } from 'lucide-react';

interface SecuritySettingsProps {}

const SecuritySettings: React.FC<SecuritySettingsProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Security Settings
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          SSL certificates, firewalls, security configurations
        </p>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>SSL certificates, firewalls, security configurations</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ShieldCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Security Settings
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                SSL certificates, firewalls, security configurations
              </p>
              <div className="mt-4 space-y-2">
                <Badge variant="outline">Ssl Management</Badge>
                <Badge variant="outline">Firewall Config</Badge>
                <Badge variant="outline">Security Policies</Badge>
              </div>
              <Button className="mt-6">
                Configure Security Settings
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;

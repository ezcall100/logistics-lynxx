import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Key } from 'lucide-react';

interface AccessControlProps {}

const AccessControl: React.FC<AccessControlProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Key className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Access Control
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          IP restrictions, session management, security policies
        </p>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Access Control</CardTitle>
          <CardDescription>IP restrictions, session management, security policies</CardDescription>
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
              <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Access Control
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                IP restrictions, session management, security policies
              </p>
              <div className="mt-4 space-y-2">
                <Badge variant="outline">Ip Restrictions</Badge>
                <Badge variant="outline">Session Control</Badge>
                <Badge variant="outline">Security Policies</Badge>
              </div>
              <Button className="mt-6">
                Configure Access Control
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessControl;

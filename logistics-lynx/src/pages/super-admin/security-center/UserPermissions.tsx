import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Key } from 'lucide-react';

interface UserPermissionsProps {}

const UserPermissions: React.FC<UserPermissionsProps> = () => {
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
            User Permissions
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Granular permission management, role-based access
        </p>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>User Permissions</CardTitle>
          <CardDescription>Granular permission management, role-based access</CardDescription>
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
                User Permissions
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Granular permission management, role-based access
              </p>
              <div className="mt-4 space-y-2">
                <Badge variant="outline">Permission Matrix</Badge>
                <Badge variant="outline">Role Access</Badge>
                <Badge variant="outline">Security Groups</Badge>
              </div>
              <Button className="mt-6">
                Configure User Permissions
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPermissions;

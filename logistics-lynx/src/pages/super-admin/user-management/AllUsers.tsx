import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Users } from 'lucide-react';

interface AllUsersProps {}

const AllUsers: React.FC<AllUsersProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            All Users
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Complete user database with search, filter, and management
        </p>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Complete user database with search, filter, and management</CardDescription>
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
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                All Users
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Complete user database with search, filter, and management
              </p>
              <div className="mt-4 space-y-2">
                <Badge variant="outline">User Table</Badge>
                <Badge variant="outline">Search Filter</Badge>
                <Badge variant="outline">Bulk Actions</Badge>
                <Badge variant="outline">User Roles</Badge>
              </div>
              <Button className="mt-6">
                Configure All Users
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AllUsers;

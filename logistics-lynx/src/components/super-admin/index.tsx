import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { { Settings } } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';

export const SuperAdminPortal = () => {
  const { user, selectedRole } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Feature flag check
  const isEnabled = useFeatureFlag('portal.superAdmin.enabled');
  
  useEffect(() => {
    if (!isEnabled) {
      setError('Portal is not enabled');
      return;
    }
    
    // Load portal data
    loadPortalData();
  }, [isEnabled]);

  const loadPortalData = async () => {
    try {
      setLoading(true);
      // TODO: Implement data loading logic
      setData([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isEnabled) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Portal Disabled
            </CardTitle>
            <CardDescription>
              This portal is currently not available.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8" />
            SuperAdmin
          </h1>
          <p className="text-muted-foreground">Complete system administration and oversight</p>
        </div>
        <Badge variant="secondary">active</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        // Dashboard cards for SuperAdmin
<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Total Items</CardTitle>
    <Settings className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">10</div>
    <p className="text-xs text-muted-foreground">
      +5% from last month
    </p>
  </CardContent>
</Card>

// Dashboard cards for SuperAdmin
<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Total Items</CardTitle>
    <Settings className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">20</div>
    <p className="text-xs text-muted-foreground">
      +10% from last month
    </p>
  </CardContent>
</Card>

// Dashboard cards for SuperAdmin
<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Total Items</CardTitle>
    <Settings className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">30</div>
    <p className="text-xs text-muted-foreground">
      +15% from last month
    </p>
  </CardContent>
</Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and activities</CardDescription>
        </CardHeader>
        <CardContent>
          
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <div className="flex-1">
            <p className="text-sm">New item created</p>
            <p className="text-xs text-muted-foreground">2 minutes ago</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="flex-1">
            <p className="text-sm">Item updated</p>
            <p className="text-xs text-muted-foreground">5 minutes ago</p>
          </div>
        </div>
      </div>
        </CardContent>
      </Card>
    </div>
  );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Truck, ExternalLink, Settings, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PersonnelQuickActions = () => {
  const navigate = useNavigate();

  const openPortal = (portalType: 'driver' | 'owner-operator') => {
    const baseUrl = window.location.origin;
    const portalUrl = portalType === 'driver' ? `${baseUrl}/driver` : `${baseUrl}/owner-operator`;
    window.open(portalUrl, '_blank');
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Personnel Management</span>
          </CardTitle>
          <CardDescription>
            Manage drivers and owner-operators with portal access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            onClick={() => navigate('/carrier-admin/personnel')}
            className="w-full"
          >
            <Settings className="h-4 w-4 mr-2" />
            Manage Personnel
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/carrier-admin/personnel')}
            className="w-full"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite New Personnel
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5" />
            <span>Driver Portal</span>
          </CardTitle>
          <CardDescription>
            Direct access to the driver portal interface
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => openPortal('driver')}
            variant="outline"
            className="w-full"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Driver Portal
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Owner-Operator Portal</span>
          </CardTitle>
          <CardDescription>
            Direct access to the owner-operator portal interface
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => openPortal('owner-operator')}
            variant="outline"
            className="w-full"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Owner-Operator Portal
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonnelQuickActions;
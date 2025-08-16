/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  Truck, 
  ExternalLink, 
  Mail, 
  Phone,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Driver {
  user_id: string;
  name: string;
  email: string;
  driver_license_number?: string;
  vehicle_assigned?: string;
  driver_status: string;
  last_login?: string;
  created_at: string;
  phone?: string;
  hire_date?: string;
}

const DriversTable = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchDrivers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'carrier_driver')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDrivers(data || []);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch drivers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Inactive</Badge>;
      case 'suspended':
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Suspended</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const openDriverPortal = (userId?: string) => {
    const baseUrl = window.location.origin;
    const portalUrl = userId ? `${baseUrl}/driver?user=${userId}` : `${baseUrl}/driver`;
    window.open(portalUrl, '_blank');
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Drivers
          </CardTitle>
          <CardDescription>Loading drivers...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          All Drivers ({drivers.length})
        </CardTitle>
        <CardDescription>
          Manage and monitor all drivers in your fleet
        </CardDescription>
      </CardHeader>
      <CardContent>
        {drivers.length === 0 ? (
          <div className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No drivers found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get started by inviting drivers to your fleet.
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>License</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow key={driver.user_id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{driver.name}</span>
                        <span className="text-sm text-muted-foreground">
                          Joined {new Date(driver.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {driver.email}
                        </div>
                        {driver.phone && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {driver.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {driver.driver_license_number ? (
                        <span className="text-sm">{driver.driver_license_number}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">Not provided</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {driver.vehicle_assigned ? (
                        <div className="flex items-center gap-1">
                          <Truck className="h-3 w-3" />
                          <span className="text-sm">{driver.vehicle_assigned}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">No vehicle assigned</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(driver.driver_status)}</TableCell>
                    <TableCell>
                      {driver.last_login ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          {new Date(driver.last_login).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Never</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openDriverPortal(driver.user_id)}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Portal
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DriversTable;
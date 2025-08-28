/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface DriverLoad {
  id: string;
  loadNumber: string;
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: string;
  deliveryDate: string;
  distance: number;
  weight: number;
  status: 'assigned' | 'in-transit' | 'delivered' | 'cancelled';
  revenue: number;
  customer: string;
  commodity: string;
  created_at: string;
  updated_at: string;
}

export interface DriverRoute {
  id: string;
  routeNumber: string;
  loadIds: string[];
  totalDistance: number;
  estimatedDuration: number;
  currentStop: number;
  totalStops: number;
  status: 'active' | 'completed' | 'paused';
  startedAt?: string;
  completedAt?: string;
  created_at: string;
  updated_at: string;
}

export interface DriverVehicle {
  id: string;
  truckNumber: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  fuelLevel: number;
  odometer: number;
  status: 'available' | 'in-use' | 'maintenance' | 'out-of-service';
  lastInspection: string;
  nextMaintenance: string;
  created_at: string;
  updated_at: string;
}

export interface DriverPerformance {
  id: string;
  period: string;
  milesOntime: number;
  safetyScore: number;
  fuelEfficiency: number;
  onTimeDelivery: number;
  earnings: number;
  violationFree: number;
  totalMiles: number;
  hoursOfService: number;
  created_at: string;
  updated_at: string;
}

export const useDriverData = () => {
  const [loads, setLoads] = useState<DriverLoad[]>([]);
  const [routes, setRoutes] = useState<DriverRoute[]>([]);
  const [vehicle, setVehicle] = useState<DriverVehicle | null>(null);
  const [performance, setPerformance] = useState<DriverPerformance | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Sample data initialization
  const initializeSampleData = useCallback(() => {
    const sampleLoads: DriverLoad[] = [
      {
        id: '1',
        loadNumber: 'LD-2024-001',
        pickupLocation: 'Chicago, IL',
        deliveryLocation: 'Miami, FL',
        pickupDate: '2024-07-24 08:00',
        deliveryDate: '2024-07-26 14:00',
        distance: 1284,
        weight: 40000,
        status: 'in-transit',
        revenue: 3250.00,
        customer: 'Walmart Distribution',
        commodity: 'General Freight',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        loadNumber: 'LD-2024-002',
        pickupLocation: 'Atlanta, GA',
        deliveryLocation: 'Dallas, TX',
        pickupDate: '2024-07-25 06:00',
        deliveryDate: '2024-07-26 18:00',
        distance: 925,
        weight: 35000,
        status: 'assigned',
        revenue: 2850.00,
        customer: 'Target Supply Chain',
        commodity: 'Retail Goods',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    const sampleRoute: DriverRoute = {
      id: '1',
      routeNumber: 'RT-2024-001',
      loadIds: ['1', '2'],
      totalDistance: 2209,
      estimatedDuration: 72,
      currentStop: 1,
      totalStops: 4,
      status: 'active',
      startedAt: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const sampleVehicle: DriverVehicle = {
      id: '1',
      truckNumber: 'TK-4521',
      make: 'Freightliner',
      model: 'Cascadia',
      year: 2022,
      vin: '1FUJGLDR0NLAA1234',
      fuelLevel: 75,
      odometer: 245678,
      status: 'in-use',
      lastInspection: '2024-07-23',
      nextMaintenance: '2024-08-15',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const samplePerformance: DriverPerformance = {
      id: '1',
      period: '2024-07',
      milesOntime: 15420,
      safetyScore: 98,
      fuelEfficiency: 7.2,
      onTimeDelivery: 96,
      earnings: 12450.00,
      violationFree: 142,
      totalMiles: 16000,
      hoursOfService: 280,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setLoads(sampleLoads);
    setRoutes([sampleRoute]);
    setVehicle(sampleVehicle);
    setPerformance(samplePerformance);
  }, []);

  const fetchDriverData = useCallback(async () => {
    setLoading(true);
    try {
      // Initialize with sample data for now
      initializeSampleData();
      
      toast({
        title: "Driver data loaded",
        description: "All driver information has been updated successfully.",
      });
    } catch (error) {
      console.error('Error fetching driver data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch driver data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast, initializeSampleData]);

  const updateLoadStatus = useCallback(async (loadId: string, status: DriverLoad['status']) => {
    setLoading(true);
    try {
      setLoads(prev => prev.map(load => 
        load.id === loadId 
          ? { ...load, status, updated_at: new Date().toISOString() }
          : load
      ));
      
      toast({
        title: "Load status updated",
        description: `Load ${loadId} status changed to ${status}`,
      });
    } catch (error) {
      console.error('Error updating load status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update load status',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updateRouteStatus = useCallback(async (routeId: string, status: DriverRoute['status']) => {
    setLoading(true);
    try {
      setRoutes(prev => prev.map(route => 
        route.id === routeId 
          ? { ...route, status, updated_at: new Date().toISOString() }
          : route
      ));
      
      toast({
        title: "Route status updated",
        description: `Route ${routeId} status changed to ${status}`,
      });
    } catch (error) {
      console.error('Error updating route status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update route status',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updateVehicleStatus = useCallback(async (status: DriverVehicle['status'], fuelLevel?: number, odometer?: number) => {
    setLoading(true);
    try {
      setVehicle(prev => prev ? {
        ...prev,
        status,
        ...(fuelLevel !== undefined && { fuelLevel }),
        ...(odometer !== undefined && { odometer }),
        updated_at: new Date().toISOString()
      } : null);
      
      toast({
        title: "Vehicle status updated",
        description: "Vehicle information has been updated successfully",
      });
    } catch (error) {
      console.error('Error updating vehicle status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update vehicle status',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchDriverData();
  }, [fetchDriverData]);

  return {
    loads,
    routes,
    vehicle,
    performance,
    loading,
    refetch: fetchDriverData,
    updateLoadStatus,
    updateRouteStatus,
    updateVehicleStatus,
  };
};

export default useDriverData;
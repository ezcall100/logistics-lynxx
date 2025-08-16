/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Alert, AlertFilters, AlertStats } from '@/types/alerts';

// Mock data for development until Supabase types are updated
const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Low AI Confidence Detected',
    message: 'Shipment assignment decision made with only 65% confidence',
    severity: 'medium',
    category: 'ai_confidence',
    status: 'active',
    timestamp: new Date().toISOString(),
    source: 'Autonomous Dispatch System',
    metadata: { shipment_id: 'SH001', confidence_score: 0.65 }
  },
  {
    id: '2',
    title: 'Route Optimization Failed',
    message: 'Unable to optimize route for shipment SH002 due to traffic data unavailability',
    severity: 'high',
    category: 'system_error',
    status: 'active',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    source: 'Route Optimizer',
    metadata: { shipment_id: 'SH002', error_code: 'TRAFFIC_DATA_UNAVAILABLE' }
  },
  {
    id: '3',
    title: 'Critical System Performance',
    message: 'Response times exceeding 5 seconds for AI decision making',
    severity: 'critical',
    category: 'performance',
    status: 'acknowledged',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    source: 'Performance Monitor',
    acknowledged_by: 'System Admin',
    acknowledged_at: new Date(Date.now() - 3600000).toISOString()
  }
];

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchAlerts = async (filters?: AlertFilters) => {
    setLoading(true);
    try {
      // Mock filtering logic
      let filteredAlerts = [...mockAlerts];
      
      if (filters?.severity?.length) {
        filteredAlerts = filteredAlerts.filter(alert => 
          filters.severity!.includes(alert.severity)
        );
      }
      
      if (filters?.category?.length) {
        filteredAlerts = filteredAlerts.filter(alert => 
          filters.category!.includes(alert.category)
        );
      }
      
      if (filters?.status?.length) {
        filteredAlerts = filteredAlerts.filter(alert => 
          filters.status!.includes(alert.status)
        );
      }
      
      setAlerts(filteredAlerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch alerts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createAlerts = async (newAlerts: Omit<Alert, 'id'>[]) => {
    try {
      const alertsWithIds = newAlerts.map(alert => ({
        ...alert,
        id: Math.random().toString(36).substr(2, 9)
      }));
      
      setAlerts(prev => [...alertsWithIds, ...prev]);
      
      toast({
        title: "Success",
        description: `${newAlerts.length} alert(s) created`,
      });
      
      return alertsWithIds;
    } catch (error) {
      console.error('Error creating alerts:', error);
      toast({
        title: "Error",
        description: "Failed to create alerts",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateAlert = async (id: string, updates: Partial<Alert>) => {
    try {
      setAlerts(prev => prev.map(alert => 
        alert.id === id ? { ...alert, ...updates } : alert
      ));
      
      toast({
        title: "Success",
        description: "Alert updated successfully",
      });
      
      return alerts.find(a => a.id === id);
    } catch (error) {
      console.error('Error updating alert:', error);
      toast({
        title: "Error",
        description: "Failed to update alert",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteAlert = async (id: string) => {
    try {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
      
      toast({
        title: "Success",
        description: "Alert deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting alert:', error);
      toast({
        title: "Error",
        description: "Failed to delete alert",
        variant: "destructive",
      });
      throw error;
    }
  };

  const getAlertStats = (): AlertStats => {
    const total = alerts.length;
    const active = alerts.filter(a => a.status === 'active').length;
    const critical = alerts.filter(a => a.severity === 'critical').length;
    const resolved_today = alerts.filter(a => {
      if (!a.resolved_at) return false;
      const today = new Date().toDateString();
      return new Date(a.resolved_at).toDateString() === today;
    }).length;

    const by_category = alerts.reduce((acc, alert) => {
      acc[alert.category] = (acc[alert.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const by_severity = alerts.reduce((acc, alert) => {
      acc[alert.severity] = (acc[alert.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      active,
      critical,
      resolved_today,
      by_category: by_category as unknown,
      by_severity: by_severity as unknown
    };
  };

  // Mock real-time subscription
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate receiving new alerts occasionally
      if (Math.random() > 0.95) {
        const newAlert: Alert = {
          id: Math.random().toString(36).substr(2, 9),
          title: 'Real-time Alert',
          message: 'New system event detected',
          severity: 'low',
          category: 'system_error',
          status: 'active',
          timestamp: new Date().toISOString(),
          source: 'Real-time Monitor'
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 19)]); // Keep only latest 20
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    alerts,
    loading,
    fetchAlerts,
    createAlerts,
    updateAlert,
    deleteAlert,
    getAlertStats
  };
};

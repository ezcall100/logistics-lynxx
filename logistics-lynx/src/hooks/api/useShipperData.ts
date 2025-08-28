import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export interface ShipperShipment {
  id: string;
  shipment_number: string;
  origin: string;
  destination: string;
  cargo_type: string;
  weight: number;
  cost: number;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  carrier_name: string;
  created_at: string;
}

export interface ShipperStats {
  active_shipments: number;
  carriers_used: number;
  on_time_rate: number;
  monthly_spend: number;
}

export const useShipperData = () => {
  const [shipments, setShipments] = useState<ShipperShipment[]>([]);
  const [stats, setStats] = useState<ShipperStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch shipper shipments
  const fetchShipments = async () => {
    try {
      const { data, error } = await supabase
        .from('shipper_shipments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setShipments(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch shipments');
    }
  };

  // Fetch shipper stats
  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('shipper_stats')
        .select('*')
        .single();

      if (error) throw error;
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    }
  };

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await Promise.all([
        fetchShipments(),
        fetchStats()
      ]);
      setLoading(false);
    };

    initializeData();
  }, []);

  // Create new shipment
  const createShipment = async (shipmentData: Omit<ShipperShipment, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('shipper_shipments')
        .insert([shipmentData])
        .select()
        .single();

      if (error) throw error;
      setShipments(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create shipment');
      throw err;
    }
  };

  // Update shipment status
  const updateShipmentStatus = async (shipmentId: string, status: ShipperShipment['status']) => {
    try {
      const { data, error } = await supabase
        .from('shipper_shipments')
        .update({ status })
        .eq('id', shipmentId)
        .select()
        .single();

      if (error) throw error;
      setShipments(prev => prev.map(shipment => shipment.id === shipmentId ? data : shipment));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update shipment');
      throw err;
    }
  };

  return {
    shipments,
    stats,
    loading,
    error,
    fetchShipments,
    fetchStats,
    createShipment,
    updateShipmentStatus,
    refresh: () => {
      fetchShipments();
      fetchStats();
    }
  };
};

export default useShipperData;
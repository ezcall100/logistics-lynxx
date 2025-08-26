import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export interface CarrierLoad {
  id: string;
  load_number: string;
  origin: string;
  destination: string;
  cargo_type: string;
  weight: number;
  rate: number;
  status: 'available' | 'in_transit' | 'completed' | 'cancelled';
  created_at: string;
}

export interface FleetStatus {
  total_trucks: number;
  available: number;
  in_transit: number;
  loading_unloading: number;
  maintenance: number;
}

export interface CarrierStats {
  active_trucks: number;
  active_loads: number;
  on_time_rate: number;
  monthly_revenue: number;
}

export const useCarrierData = () => {
  const [loads, setLoads] = useState<CarrierLoad[]>([]);
  const [fleetStatus, setFleetStatus] = useState<FleetStatus | null>(null);
  const [stats, setStats] = useState<CarrierStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch carrier loads
  const fetchLoads = async () => {
    try {
      const { data, error } = await supabase
        .from('carrier_loads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLoads(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch loads');
    }
  };

  // Fetch fleet status
  const fetchFleetStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('fleet_status')
        .select('*')
        .single();

      if (error) throw error;
      setFleetStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch fleet status');
    }
  };

  // Fetch carrier stats
  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('carrier_stats')
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
        fetchLoads(),
        fetchFleetStatus(),
        fetchStats()
      ]);
      setLoading(false);
    };

    initializeData();
  }, []);

  // Add new load
  const addLoad = async (loadData: Omit<CarrierLoad, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('carrier_loads')
        .insert([loadData])
        .select()
        .single();

      if (error) throw error;
      setLoads(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add load');
      throw err;
    }
  };

  // Update load status
  const updateLoadStatus = async (loadId: string, status: CarrierLoad['status']) => {
    try {
      const { data, error } = await supabase
        .from('carrier_loads')
        .update({ status })
        .eq('id', loadId)
        .select()
        .single();

      if (error) throw error;
      setLoads(prev => prev.map(load => load.id === loadId ? data : load));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update load');
      throw err;
    }
  };

  return {
    loads,
    fleetStatus,
    stats,
    loading,
    error,
    fetchLoads,
    fetchFleetStatus,
    fetchStats,
    addLoad,
    updateLoadStatus,
    refresh: () => {
      fetchLoads();
      fetchFleetStatus();
      fetchStats();
    }
  };
};

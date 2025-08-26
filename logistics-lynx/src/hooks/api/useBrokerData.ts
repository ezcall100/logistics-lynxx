import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export interface BrokerLoad {
  id: string;
  load_number: string;
  origin: string;
  destination: string;
  equipment_type: string;
  weight: number;
  rate: number;
  status: 'available' | 'assigned' | 'in_transit' | 'completed';
  created_at: string;
}

export interface CarrierPartner {
  id: string;
  name: string;
  rating: number;
  loads_completed: number;
  on_time_percentage: number;
  avatar_initials: string;
}

export interface BrokerStats {
  active_loads: number;
  carrier_partners: number;
  success_rate: number;
  monthly_revenue: number;
}

export const useBrokerData = () => {
  const [loads, setLoads] = useState<BrokerLoad[]>([]);
  const [carriers, setCarriers] = useState<CarrierPartner[]>([]);
  const [stats, setStats] = useState<BrokerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch broker loads
  const fetchLoads = async () => {
    try {
      const { data, error } = await supabase
        .from('broker_loads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLoads(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch loads');
    }
  };

  // Fetch carrier partners
  const fetchCarriers = async () => {
    try {
      const { data, error } = await supabase
        .from('carrier_partners')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;
      setCarriers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch carriers');
    }
  };

  // Fetch broker stats
  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('broker_stats')
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
        fetchCarriers(),
        fetchStats()
      ]);
      setLoading(false);
    };

    initializeData();
  }, []);

  // Post new load
  const postLoad = async (loadData: Omit<BrokerLoad, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('broker_loads')
        .insert([loadData])
        .select()
        .single();

      if (error) throw error;
      setLoads(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post load');
      throw err;
    }
  };

  // Add carrier partner
  const addCarrier = async (carrierData: Omit<CarrierPartner, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('carrier_partners')
        .insert([carrierData])
        .select()
        .single();

      if (error) throw error;
      setCarriers(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add carrier');
      throw err;
    }
  };

  // Update load status
  const updateLoadStatus = async (loadId: string, status: BrokerLoad['status']) => {
    try {
      const { data, error } = await supabase
        .from('broker_loads')
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
    carriers,
    stats,
    loading,
    error,
    fetchLoads,
    fetchCarriers,
    fetchStats,
    postLoad,
    addCarrier,
    updateLoadStatus,
    refresh: () => {
      fetchLoads();
      fetchCarriers();
      fetchStats();
    }
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import type { CRMOpportunity } from '@/types/crm';

export const useCRMOpportunities = () => {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState<CRMOpportunity[]>([]);

  const fetchOpportunities = async () => {
    const { data } = await supabase
      .from('crm_opportunities')
      .select('*, crm_contacts(*), crm_companies(*), crm_leads(*)')
      .order('created_at', { ascending: false });
    
    if (data) setOpportunities(data as CRMOpportunity[]);
    return data;
  };

  const createOpportunity = async (opportunityData: Partial<CRMOpportunity>) => {
    const insertData = {
      ...opportunityData,
      name: opportunityData.name || 'Untitled Opportunity',
      value: opportunityData.value || 0,
      created_by: user?.id
    };

    const { data, error } = await supabase
      .from('crm_opportunities')
      .insert([insertData])
      .select('*, crm_contacts(*), crm_companies(*), crm_leads(*)')
      .single();
    
    if (error) throw error;
    setOpportunities(prev => [data as CRMOpportunity, ...prev]);
    return data;
  };

  const updateOpportunity = async (id: string, updates: Partial<CRMOpportunity>) => {
    const { data, error } = await supabase
      .from('crm_opportunities')
      .update(updates)
      .eq('id', id)
      .select('*, crm_contacts(*), crm_companies(*), crm_leads(*)')
      .single();
    
    if (error) throw error;
    setOpportunities(prev => prev.map(o => o.id === id ? data as CRMOpportunity : o));
    return data;
  };

  return {
    opportunities,
    setOpportunities,
    fetchOpportunities,
    createOpportunity,
    updateOpportunity
  };
};

export default useCRMOpportunities;
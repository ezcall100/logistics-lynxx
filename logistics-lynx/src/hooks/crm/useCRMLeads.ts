/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import type { CRMLead } from '@/types/crm';

export const useCRMLeads = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState<CRMLead[]>([]);

  const fetchLeads = async () => {
    const { data } = await supabase
      .from('crm_leads')
      .select('*, crm_contacts(*), crm_companies(*)')
      .order('created_at', { ascending: false });
    
    if (data) setLeads(data as CRMLead[]);
    return data;
  };

  const createLead = async (leadData: Partial<CRMLead>) => {
    const insertData = {
      ...leadData,
      title: leadData.title || 'Untitled Lead',
      created_by: user?.id
    };

    const { data, error } = await supabase
      .from('crm_leads')
      .insert([insertData])
      .select('*, crm_contacts(*), crm_companies(*)')
      .single();
    
    if (error) throw error;
    setLeads(prev => [data as CRMLead, ...prev]);
    return data;
  };

  const updateLead = async (id: string, updates: Partial<CRMLead>) => {
    const { data, error } = await supabase
      .from('crm_leads')
      .update(updates)
      .eq('id', id)
      .select('*, crm_contacts(*), crm_companies(*)')
      .single();
    
    if (error) throw error;
    setLeads(prev => prev.map(l => l.id === id ? data as CRMLead : l));
    return data;
  };

  return {
    leads,
    setLeads,
    fetchLeads,
    createLead,
    updateLead
  };
};

export default useCRMLeads;
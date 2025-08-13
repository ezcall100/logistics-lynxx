
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import type { CRMCompany } from '@/types/crm';

export const useCRMCompanies = () => {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<CRMCompany[]>([]);

  const fetchCompanies = async () => {
    const { data } = await supabase
      .from('crm_companies')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setCompanies(data as CRMCompany[]);
    return data;
  };

  const createCompany = async (companyData: Partial<CRMCompany>) => {
    const insertData = {
      ...companyData,
      name: companyData.name || 'Untitled Company',
      created_by: user?.id
    };

    const { data, error } = await supabase
      .from('crm_companies')
      .insert([insertData])
      .select()
      .single();
    
    if (error) throw error;
    setCompanies(prev => [data as CRMCompany, ...prev]);
    return data;
  };

  const updateCompany = async (id: string, updates: Partial<CRMCompany>) => {
    const { data, error } = await supabase
      .from('crm_companies')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    setCompanies(prev => prev.map(c => c.id === id ? data as CRMCompany : c));
    return data;
  };

  const deleteCompany = async (id: string) => {
    const { error } = await supabase
      .from('crm_companies')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    setCompanies(prev => prev.filter(c => c.id !== id));
  };

  return {
    companies,
    setCompanies,
    fetchCompanies,
    createCompany,
    updateCompany,
    deleteCompany
  };
};


import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import type { CRMContact } from '@/types/crm';

export const useCRMContacts = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<CRMContact[]>([]);

  const fetchContacts = async () => {
    const { data } = await supabase
      .from('crm_contacts')
      .select('*, crm_companies(*)')
      .order('created_at', { ascending: false });
    
    if (data) setContacts(data as CRMContact[]);
    return data;
  };

  const createContact = async (contactData: Partial<CRMContact>) => {
    const insertData = {
      ...contactData,
      first_name: contactData.first_name || 'Unknown',
      last_name: contactData.last_name || 'Contact',
      created_by: user?.id
    };

    const { data, error } = await supabase
      .from('crm_contacts')
      .insert([insertData])
      .select('*, crm_companies(*)')
      .single();
    
    if (error) throw error;
    setContacts(prev => [data as CRMContact, ...prev]);
    return data;
  };

  const updateContact = async (id: string, updates: Partial<CRMContact>) => {
    const { data, error } = await supabase
      .from('crm_contacts')
      .update(updates)
      .eq('id', id)
      .select('*, crm_companies(*)')
      .single();
    
    if (error) throw error;
    setContacts(prev => prev.map(c => c.id === id ? data as CRMContact : c));
    return data;
  };

  return {
    contacts,
    setContacts,
    fetchContacts,
    createContact,
    updateContact
  };
};

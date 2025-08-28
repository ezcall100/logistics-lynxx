/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import type { CRMEmail } from '@/types/crm';

export const useCRMEmails = () => {
  const { user } = useAuth();
  const [emails, setEmails] = useState<CRMEmail[]>([]);

  const fetchEmails = async () => {
    const { data } = await supabase
      .from('crm_emails')
      .select('*, crm_contacts(*), crm_companies(*), crm_leads(*), crm_opportunities(*), crm_projects(*)')
      .order('created_at', { ascending: false });
    
    if (data) setEmails(data as CRMEmail[]);
    return data;
  };

  const createEmail = async (emailData: Partial<CRMEmail>) => {
    const insertData = {
      ...emailData,
      subject: emailData.subject || 'No Subject',
      body: emailData.body || '',
      created_by: user?.id
    };

    const { data, error } = await supabase
      .from('crm_emails')
      .insert([insertData])
      .select('*, crm_contacts(*), crm_companies(*), crm_leads(*), crm_opportunities(*), crm_projects(*)')
      .single();
    
    if (error) throw error;
    setEmails(prev => [data as CRMEmail, ...prev]);
    return data;
  };

  return {
    emails,
    setEmails,
    fetchEmails,
    createEmail
  };
};

export default useCRMEmails;
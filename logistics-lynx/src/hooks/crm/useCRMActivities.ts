/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import type { CRMActivity } from '@/types/crm';

export const useCRMActivities = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<CRMActivity[]>([]);

  const fetchActivities = async () => {
    const { data } = await supabase
      .from('crm_activities')
      .select('*, crm_contacts(*), crm_companies(*), crm_leads(*), crm_opportunities(*), crm_projects(*)')
      .order('created_at', { ascending: false });
    
    if (data) setActivities(data as CRMActivity[]);
    return data;
  };

  const createActivity = async (activityData: Partial<CRMActivity>) => {
    const insertData = {
      ...activityData,
      activity_type: activityData.activity_type || 'note',
      subject: activityData.subject || 'Untitled Activity',
      created_by: user?.id
    };

    const { data, error } = await supabase
      .from('crm_activities')
      .insert([insertData])
      .select('*, crm_contacts(*), crm_companies(*), crm_leads(*), crm_opportunities(*), crm_projects(*)')
      .single();
    
    if (error) throw error;
    setActivities(prev => [data as CRMActivity, ...prev]);
    return data;
  };

  return {
    activities,
    setActivities,
    fetchActivities,
    createActivity
  };
};

export default useCRMActivities;
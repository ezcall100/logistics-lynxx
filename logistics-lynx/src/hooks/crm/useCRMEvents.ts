
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import type { CRMCalendarEvent } from '@/types/crm';

export const useCRMEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<CRMCalendarEvent[]>([]);

  const fetchEvents = async () => {
    const { data } = await supabase
      .from('crm_calendar')
      .select('*, crm_contacts(*), crm_companies(*), crm_leads(*), crm_opportunities(*), crm_projects(*)')
      .order('start_time', { ascending: true });
    
    if (data) setEvents(data as CRMCalendarEvent[]);
    return data;
  };

  const createEvent = async (eventData: Partial<CRMCalendarEvent>) => {
    const insertData = {
      ...eventData,
      title: eventData.title || 'Untitled Event',
      start_time: eventData.start_time || new Date().toISOString(),
      end_time: eventData.end_time || new Date(Date.now() + 3600000).toISOString(),
      created_by: user?.id
    };

    const { data, error } = await supabase
      .from('crm_calendar')
      .insert([insertData])
      .select('*, crm_contacts(*), crm_companies(*), crm_leads(*), crm_opportunities(*), crm_projects(*)')
      .single();
    
    if (error) throw error;
    setEvents(prev => [data as CRMCalendarEvent, ...prev]);
    return data;
  };

  const updateEvent = async (id: string, updates: Partial<CRMCalendarEvent>) => {
    const { data, error } = await supabase
      .from('crm_calendar')
      .update(updates)
      .eq('id', id)
      .select('*, crm_contacts(*), crm_companies(*), crm_leads(*), crm_opportunities(*), crm_projects(*)')
      .single();
    
    if (error) throw error;
    setEvents(prev => prev.map(e => e.id === id ? data as CRMCalendarEvent : e));
    return data;
  };

  return {
    events,
    setEvents,
    fetchEvents,
    createEvent,
    updateEvent
  };
};

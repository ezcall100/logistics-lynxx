/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import type { CRMProject } from '@/types/crm';

export const useCRMProjects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<CRMProject[]>([]);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('crm_projects')
      .select('*, crm_companies(*), crm_contacts(*), crm_opportunities(*)')
      .order('created_at', { ascending: false });
    
    if (data) setProjects(data as CRMProject[]);
    return data;
  };

  const createProject = async (projectData: Partial<CRMProject>) => {
    const insertData = {
      ...projectData,
      name: projectData.name || 'Untitled Project',
      created_by: user?.id
    };

    const { data, error } = await supabase
      .from('crm_projects')
      .insert([insertData])
      .select('*, crm_companies(*), crm_contacts(*), crm_opportunities(*)')
      .single();
    
    if (error) throw error;
    setProjects(prev => [data as CRMProject, ...prev]);
    return data;
  };

  const updateProject = async (id: string, updates: Partial<CRMProject>) => {
    const { data, error } = await supabase
      .from('crm_projects')
      .update(updates)
      .eq('id', id)
      .select('*, crm_companies(*), crm_contacts(*), crm_opportunities(*)')
      .single();
    
    if (error) throw error;
    setProjects(prev => prev.map(p => p.id === id ? data as CRMProject : p));
    return data;
  };

  return {
    projects,
    setProjects,
    fetchProjects,
    createProject,
    updateProject
  };
};

export default useCRMProjects;
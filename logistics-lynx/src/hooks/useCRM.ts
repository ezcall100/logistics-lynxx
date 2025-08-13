
import { useState, useEffect } from 'react';
import { useCRMCompanies } from './crm/useCRMCompanies';
import { useCRMContacts } from './crm/useCRMContacts';
import { useCRMLeads } from './crm/useCRMLeads';
import { useCRMOpportunities } from './crm/useCRMOpportunities';
import { useCRMProjects } from './crm/useCRMProjects';
import { useCRMEvents } from './crm/useCRMEvents';
import { useCRMEmails } from './crm/useCRMEmails';
import { useCRMActivities } from './crm/useCRMActivities';
import { useAuth } from '@/context/AuthContext';
import { 
  mockCompanies, 
  enrichedContacts, 
  enrichedLeads, 
  enrichedOpportunities, 
  enrichedProjects, 
  enrichedEvents, 
  enrichedEmails, 
  enrichedActivities 
} from '@/data/mockCRMData';

export const useCRM = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const companies = useCRMCompanies();
  const contacts = useCRMContacts();
  const leads = useCRMLeads();
  const opportunities = useCRMOpportunities();
  const projects = useCRMProjects();
  const events = useCRMEvents();
  const emails = useCRMEmails();
  const activities = useCRMActivities();

  const fetchAllCRMData = async () => {
    setLoading(true);
    try {
      // For demo purposes, use mock data immediately
      // In production, you would fetch from Supabase
      companies.setCompanies(mockCompanies);
      contacts.setContacts(enrichedContacts);
      leads.setLeads(enrichedLeads);
      opportunities.setOpportunities(enrichedOpportunities);
      projects.setProjects(enrichedProjects);
      events.setEvents(enrichedEvents);
      emails.setEmails(enrichedEmails);
      activities.setActivities(enrichedActivities);

      // Simulate API delay for realistic loading state
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error loading CRM data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCRMData();
  }, [user]);

  return {
    // Data
    companies: companies.companies.length > 0 ? companies.companies : mockCompanies,
    contacts: contacts.contacts.length > 0 ? contacts.contacts : enrichedContacts,
    leads: leads.leads.length > 0 ? leads.leads : enrichedLeads,
    opportunities: opportunities.opportunities.length > 0 ? opportunities.opportunities : enrichedOpportunities,
    projects: projects.projects.length > 0 ? projects.projects : enrichedProjects,
    events: events.events.length > 0 ? events.events : enrichedEvents,
    emails: emails.emails.length > 0 ? emails.emails : enrichedEmails,
    activities: activities.activities.length > 0 ? activities.activities : enrichedActivities,
    loading,
    
    // Operations
    createCompany: companies.createCompany,
    updateCompany: companies.updateCompany,
    deleteCompany: companies.deleteCompany,
    createContact: contacts.createContact,
    updateContact: contacts.updateContact,
    createLead: leads.createLead,
    updateLead: leads.updateLead,
    createOpportunity: opportunities.createOpportunity,
    updateOpportunity: opportunities.updateOpportunity,
    createProject: projects.createProject,
    updateProject: projects.updateProject,
    createEvent: events.createEvent,
    updateEvent: events.updateEvent,
    createEmail: emails.createEmail,
    createActivity: activities.createActivity,
    
    // Refresh
    fetchAllCRMData
  };
};

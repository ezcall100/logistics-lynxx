
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useCRM } from '@/hooks/useCRM';
import { CRMOverview } from '@/components/crm/CRMOverview';

const CRMOverviewPage = () => {
  const { 
    companies, 
    contacts, 
    leads, 
    opportunities, 
    projects, 
    events, 
    emails, 
    activities,
    loading 
  } = useCRM();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-muted-foreground">Loading CRM data...</div>
        </div>
      </Layout>
    );
  }

  const stats = {
    totalContacts: contacts.length,
    activeLeads: leads.filter(l => !['closed_won', 'closed_lost'].includes(l.lead_status || '')).length,
    openOpportunities: opportunities.filter(o => !['closed_won', 'closed_lost'].includes(o.stage || '')).length,
    activeProjects: projects.filter(p => ['planning', 'in_progress'].includes(p.status || '')).length,
    upcomingEvents: events.filter(e => new Date(e.start_time) > new Date()).length,
    recentEmails: emails.filter(e => {
      const emailDate = new Date(e.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return emailDate > weekAgo;
    }).length,
    totalPipelineValue: opportunities
      .filter(o => !['closed_lost'].includes(o.stage || ''))
      .reduce((sum, o) => sum + (o.value || 0), 0)
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 -m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8">
        <CRMOverview 
          stats={stats}
          companies={companies}
          contacts={contacts}
          leads={leads}
          opportunities={opportunities}
          projects={projects}
          events={events}
          activities={activities}
        />
      </div>
    </Layout>
  );
};

export default CRMOverviewPage;

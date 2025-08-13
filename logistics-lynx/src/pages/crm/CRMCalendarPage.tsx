
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useCRM } from '@/hooks/useCRM';
import { CRMCalendar } from '@/components/crm/CRMCalendar';

const CRMCalendarPage = () => {
  const { events, contacts, companies, loading } = useCRM();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-muted-foreground">Loading calendar...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 -m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8">
        <CRMCalendar events={events} contacts={contacts} companies={companies} />
      </div>
    </Layout>
  );
};

export default CRMCalendarPage;

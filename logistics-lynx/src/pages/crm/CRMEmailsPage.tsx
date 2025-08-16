/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
// Layout import removed - layout is provided by App.tsx routing
import { useCRM } from '@/hooks/useCRM';
import { CRMEmails } from '@/components/crm/CRMEmails';

const CRMEmailsPage = () => {
  const { emails, contacts, companies, loading } = useCRM();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-muted-foreground">Loading emails...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 -m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8">
      <CRMEmails emails={emails} contacts={contacts} companies={companies} />
    </div>
  );
};

export default CRMEmailsPage;

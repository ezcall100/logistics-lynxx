
import React from 'react';
import { Users, Building, Plus } from 'lucide-react';
import { CRMStatsCard } from '../shared/CRMStatsCard';
import type { CRMContact } from '@/types/crm';

interface ContactStatsProps {
  contacts: CRMContact[];
}

export const ContactStats: React.FC<ContactStatsProps> = ({ contacts }) => {
  const activeContacts = contacts.filter(c => c.contact_status === 'active').length;
  const uniqueCompanies = new Set(contacts.map(c => c.company_id).filter(Boolean)).size;
  const thisMonthContacts = contacts.filter(c => {
    const contactDate = new Date(c.created_at);
    const now = new Date();
    return contactDate.getMonth() === now.getMonth() && 
           contactDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <CRMStatsCard
        title="Total Contacts"
        value={contacts.length}
        icon={Users}
      />
      <CRMStatsCard
        title="Active"
        value={activeContacts}
        icon={Users}
        iconColor="text-green-600"
      />
      <CRMStatsCard
        title="Companies"
        value={uniqueCompanies}
        icon={Building}
      />
      <CRMStatsCard
        title="This Month"
        value={thisMonthContacts}
        icon={Plus}
      />
    </div>
  );
};

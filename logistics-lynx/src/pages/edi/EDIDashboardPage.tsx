/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { EDIDashboard } from '@/components/edi/EDIDashboard';
import { EDIMatching } from '@/components/edi/EDIMatching';
import { EDISetup } from '@/components/edi/EDISetup';
import { PartnersList } from '@/components/edi/PartnersList';
import { FailedTender } from '@/components/edi/FailedTender';
import { FailedInvoices } from '@/components/edi/FailedInvoices';

const EDIDashboardPage: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('EDI Dashboard - Current location:', location.pathname);
  }, [location.pathname]);
  
  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      <Routes>
        <Route index element={<EDIDashboard />} />
        <Route path="matching/*" element={<EDIMatching />} />
        <Route path="setup" element={<EDISetup />} />
        <Route path="partners" element={<PartnersList />} />
        <Route path="failed/tender" element={<FailedTender />} />
        <Route path="failed/invoices" element={<FailedInvoices />} />
      </Routes>
    </div>
  );
};

export default EDIDashboardPage;

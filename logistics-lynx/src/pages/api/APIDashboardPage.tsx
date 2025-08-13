import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { APIDashboard } from '@/components/api/APIDashboard';
import { APIKeysManager } from '@/components/api/APIKeysManager';
import { APILogsViewer } from '@/components/api/APILogsViewer';
import { APIErrorTracker } from '@/components/api/APIErrorTracker';

const APIDashboardPage: React.FC = () => {
  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      <Routes>
        <Route index element={<APIDashboard />} />
        <Route path="keys" element={<APIKeysManager />} />
        <Route path="logs" element={<APILogsViewer />} />
        <Route path="errors" element={<APIErrorTracker />} />
      </Routes>
    </div>
  );
};

export default APIDashboardPage;
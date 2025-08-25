import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SuperAdminRoutes from '../pages/super-admin/SuperAdminRoutes';
import { EnhancedLayout } from './layout/EnhancedLayout';

const SuperAdmin: React.FC = () => {
  // Mock user data
  const user = {
    name: 'Admin User',
    email: 'admin@logisticslynx.com',
    role: 'Super Admin'
  };

  return (
    <EnhancedLayout user={user}>
      <Routes>
        <Route path="/*" element={<SuperAdminRoutes />} />
      </Routes>
    </EnhancedLayout>
  );
};

export default SuperAdmin;

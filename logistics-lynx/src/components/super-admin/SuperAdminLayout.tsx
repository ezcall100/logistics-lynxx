/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import SuperAdminSidebar from './SuperAdminSidebar';
import SuperAdminHeader from './SuperAdminHeader';
import SuperAdminFAB from './SuperAdminFAB';

interface SuperAdminLayoutProps {
  children: React.ReactNode;
}

const SuperAdminLayout: React.FC<SuperAdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Glassmorphism background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.1),transparent_70%)]" />
      
      <SuperAdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className="flex flex-col flex-1 overflow-hidden relative z-10">
        <SuperAdminHeader onMenuClick={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-background/80 to-muted/30 backdrop-blur-sm animate-fade-in">
          <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <SuperAdminFAB />
    </div>
  );
};

export default SuperAdminLayout;
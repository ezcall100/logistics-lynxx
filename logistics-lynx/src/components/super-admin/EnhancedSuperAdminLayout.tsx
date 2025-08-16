/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import SuperAdminSidebar from './SuperAdminSidebar';
import SuperAdminHeader from './SuperAdminHeader';

interface EnhancedSuperAdminLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const EnhancedSuperAdminLayout: React.FC<EnhancedSuperAdminLayoutProps> = ({ 
  children, 
  className = "" 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Enhanced Glassmorphism background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      
      {/* Responsive Sidebar */}
      <SuperAdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden relative z-10">
        {/* Enhanced Header */}
        <SuperAdminHeader onMenuClick={toggleSidebar} />
        
        {/* Enhanced Main Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-background/80 to-muted/30 backdrop-blur-sm animate-fade-in">
          <div className={`max-w-none mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 ${className}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EnhancedSuperAdminLayout;

import React from 'react';

interface SuperAdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const SuperAdminLayout: React.FC<SuperAdminLayoutProps> = ({ 
  children, 
  title = "Super Admin",
  className = "" 
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        {title && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {title}
            </h1>
            <div className="w-20 h-1 bg-blue-600 rounded"></div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default SuperAdminLayout;

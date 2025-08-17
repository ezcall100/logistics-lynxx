
import { FC } from 'react';

const SuperAdminPortal: FC = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="bg-red-600 text-white p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">👑 Super Admin Portal</h1>
        <p className="text-sm opacity-90">Full System Control & Management</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card text-card-foreground p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">System Control</h2>
          <p>Complete control over all TMS operations</p>
        </div>
        
        <div className="bg-card text-card-foreground p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p>Manage all user accounts and permissions</p>
        </div>
        
        <div className="bg-card text-card-foreground p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Analytics Overview</h2>
          <p>Complete system analytics and reporting</p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminPortal;

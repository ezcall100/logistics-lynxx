
import { FC } from 'react';

const DriverPortal: FC = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="bg-yellow-600 text-white p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">🚗 Driver Portal</h1>
        <p className="text-sm opacity-90">Driver Management & Operations</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card text-card-foreground p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Current Loads</h2>
          <p>View and manage assigned loads</p>
        </div>
        
        <div className="bg-card text-card-foreground p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Hours of Service</h2>
          <p>Track driving hours and compliance</p>
        </div>
        
        <div className="bg-card text-card-foreground p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Documents</h2>
          <p>Upload BOL and delivery receipts</p>
        </div>
      </div>
    </div>
  );
};

export default DriverPortal;


import { FC } from 'react';

const AnalyticsPortal: FC = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="bg-orange-600 text-white p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">📊 Analytics Portal</h1>
        <p className="text-sm opacity-90">Business Intelligence & Reporting</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card text-card-foreground p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Performance Metrics</h2>
          <p>Key performance indicators and metrics</p>
        </div>
        
        <div className="bg-card text-card-foreground p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Financial Reports</h2>
          <p>Revenue, costs, and profitability analysis</p>
        </div>
        
        <div className="bg-card text-card-foreground p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Operational Analytics</h2>
          <p>Fleet utilization and efficiency metrics</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPortal;

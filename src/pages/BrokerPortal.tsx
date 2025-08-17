
import { FC } from 'react';

const BrokerPortal: FC = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="bg-blue-600 text-white p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">🏢 Broker Portal</h1>
        <p className="text-sm opacity-90">Freight Brokerage Management</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card text-card-foreground p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Load Management</h2>
          <p>Post and manage freight loads</p>
        </div>
        
        <div className="bg-card text-card-foreground p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Carrier Network</h2>
          <p>Manage carrier relationships</p>
        </div>
        
        <div className="bg-card text-card-foreground p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Financial Management</h2>
          <p>Invoicing and payment processing</p>
        </div>
      </div>
    </div>
  );
};

export default BrokerPortal;

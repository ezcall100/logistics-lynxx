
import { FC } from 'react';

const ShipperPortal: FC = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="bg-purple-600 text-white p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">📦 Shipper Portal</h1>
        <p className="text-sm opacity-90">Shipping & Logistics Management</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card text-card-foreground p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Shipment Tracking</h2>
          <p>Track all your shipments in real-time</p>
        </div>
        
        <div className="bg-card text-card-foreground p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Rate Quotes</h2>
          <p>Get instant shipping quotes</p>
        </div>
        
        <div className="bg-card text-card-foreground p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Booking Management</h2>
          <p>Schedule and manage shipments</p>
        </div>
      </div>
    </div>
  );
};

export default ShipperPortal;

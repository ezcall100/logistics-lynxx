
import { FC } from 'react';

const CarrierPortal: FC = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="bg-green-600 text-white p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">🚛 Carrier Portal</h1>
        <p className="text-sm opacity-90">Fleet & Transportation Management</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card text-card-foreground p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Fleet Management</h2>
          <p>Manage trucks and drivers</p>
        </div>
        
        <div className="bg-card text-card-foreground p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Load Board</h2>
          <p>Find and book available loads</p>
        </div>
        
        <div className="bg-card text-card-foreground p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Dispatch Center</h2>
          <p>Coordinate driver assignments</p>
        </div>
      </div>
    </div>
  );
};

export default CarrierPortal;

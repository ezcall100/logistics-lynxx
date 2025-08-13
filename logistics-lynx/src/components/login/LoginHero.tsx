
import React from 'react';
import { Truck } from 'lucide-react';

const LoginHero: React.FC = () => {
  return (
    <div className="col-span-2 hidden bg-primary text-primary-foreground md:block">
      <div className="flex h-full flex-col items-center justify-center p-8">
        <Truck className="h-16 w-16" />
        <h2 className="mt-6 text-2xl font-bold">Logistics Management System</h2>
        <p className="mt-2 text-center text-primary-foreground/80">
          Streamline your operations with our comprehensive logistics platform
        </p>
        <div className="mt-8 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
            <span>Real-time shipment tracking</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
            <span>Fleet management tools</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
            <span>Integrated financial systems</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
            <span>Document management</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHero;

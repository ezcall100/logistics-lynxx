/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Fuel, Plus, Search, Filter } from 'lucide-react';

interface FuelAccessorialsProps {
  companyId: string;
}

export const FuelAccessorials: React.FC<FuelAccessorialsProps> = ({ companyId }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Fuel className="h-5 w-5 mr-2" />
            Fuel & Accessorials Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search Rates
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Rate
            </Button>
          </div>
          
          <div className="text-center py-12 text-gray-500">
            <Fuel className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">Fuel & Accessorials</h3>
            <p className="text-sm">Manage fuel surcharges and accessorial rates.</p>
            <p className="text-xs mt-2">This component will include fuel index management, surcharge calculations, and accessorial rate configuration.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

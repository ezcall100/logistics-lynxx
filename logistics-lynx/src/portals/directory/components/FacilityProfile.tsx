/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { MapPin, Plus, Search, Filter } from 'lucide-react';

interface FacilityProfileProps {
  companyId: string;
}

export const FacilityProfile: React.FC<FacilityProfileProps> = ({ companyId }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Facility Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search Facilities
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Facility
            </Button>
          </div>
          
          <div className="text-center py-12 text-gray-500">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">Facility Management</h3>
            <p className="text-sm">Warehouse, distribution center, and terminal management.</p>
            <p className="text-xs mt-2">This component will include facility profiles, capacity information, and operational details.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

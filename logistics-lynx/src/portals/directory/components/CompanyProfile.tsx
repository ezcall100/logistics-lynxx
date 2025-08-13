import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Building2, Plus, Search, Filter } from 'lucide-react';

interface CompanyProfileProps {
  companyId: string;
}

export const CompanyProfile: React.FC<CompanyProfileProps> = ({ companyId }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Company Profiles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search Companies
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Company
            </Button>
          </div>
          
          <div className="text-center py-12 text-gray-500">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">Company Profiles</h3>
            <p className="text-sm">Detailed company information and performance metrics.</p>
            <p className="text-xs mt-2">This component will include comprehensive company profiles, contact information, and performance tracking.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

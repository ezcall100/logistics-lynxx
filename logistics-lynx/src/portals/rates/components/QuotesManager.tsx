import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { FileText, Plus, Search, Filter } from 'lucide-react';

interface QuotesManagerProps {
  companyId: string;
}

export const QuotesManager: React.FC<QuotesManagerProps> = ({ companyId }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Quotes Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search Quotes
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Quote
            </Button>
          </div>
          
          <div className="text-center py-12 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">Quote Management</h3>
            <p className="text-sm">Create, manage, and track quotes for your customers.</p>
            <p className="text-xs mt-2">This component will include quote creation, tracking, and lifecycle management.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

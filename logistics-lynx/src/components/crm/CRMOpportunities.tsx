
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Target, 
  Plus, 
  DollarSign,
  User,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';
import CRMFormDialog from './CRMFormDialog';
import { CRMFilters } from './shared/CRMFilters';
import { CRMEmptyState } from './shared/CRMEmptyState';
import { OpportunityStats } from './opportunities/OpportunityStats';
import { enrichedOpportunities } from '@/data/mockCRMData';
import type { CRMOpportunity, CRMContact, CRMCompany } from '@/types/crm';

interface CRMOpportunitiesProps {
  opportunities?: CRMOpportunity[];
  contacts?: CRMContact[];
  companies?: CRMCompany[];
}

export const CRMOpportunities: React.FC<CRMOpportunitiesProps> = ({ 
  opportunities = enrichedOpportunities, 
  contacts = [], 
  companies = [] 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [opportunityData, setOpportunityData] = useState(opportunities);

  const filteredOpportunities = opportunityData.filter(opportunity => {
    const matchesSearch = 
      opportunity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.contact?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.contact?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.company?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStage = selectedStage === 'all' || opportunity.stage === selectedStage;
    
    return matchesSearch && matchesStage;
  });

  const opportunityStages = ['all', 'prospect', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost'];

  const getStageColor = (stage?: string) => {
    switch (stage) {
      case 'prospect': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'qualified': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'proposal': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'negotiation': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'closed_won': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'closed_lost': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const handleAddOpportunity = (data: Record<string, string | number | boolean>) => {
    const newOpportunity: CRMOpportunity = {
      id: `opportunity-${Date.now()}`,
      name: data.name as string || `Opportunity ${Date.now()}`,
      value: data.value as number || 0,
      probability: data.probability as number || 0,
      stage: data.stage as string || 'prospect',
      description: data.description as string,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setOpportunityData([newOpportunity, ...opportunityData]);
    console.log('New opportunity added:', newOpportunity);
  };

  const handleEditOpportunity = (opportunity: CRMOpportunity) => {
    console.log('Edit opportunity:', opportunity);
  };

  const handleDeleteOpportunity = (id: string) => {
    setOpportunityData(opportunityData.filter(opp => opp.id !== id));
    console.log('Opportunity deleted:', id);
  };

  const handleViewOpportunity = (opportunity: CRMOpportunity) => {
    console.log('View opportunity details:', opportunity);
  };

  // Calculate pipeline metrics
  const totalValue = opportunityData.reduce((sum, opp) => sum + (opp.value || 0), 0);
  const weightedValue = opportunityData.reduce((sum, opp) => sum + ((opp.value || 0) * (opp.probability || 0) / 100), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">Opportunities</h3>
          <p className="text-muted-foreground">
            Track and manage your sales opportunities
          </p>
        </div>
        <CRMFormDialog
          type="opportunity"
          onSubmit={handleAddOpportunity}
        />
      </div>

      <OpportunityStats opportunities={opportunityData} />

      {/* Opportunity Pipeline */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Sales Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">${totalValue.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Pipeline Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${weightedValue.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Weighted Pipeline</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{opportunityData.length}</div>
              <div className="text-sm text-muted-foreground">Active Opportunities</div>
            </div>
          </div>
          
          <div className="space-y-4">
            {opportunityStages.slice(1).map((stage) => {
              const stageOpportunities = opportunityData.filter(opp => opp.stage === stage);
              const stageValue = stageOpportunities.reduce((sum, opp) => sum + (opp.value || 0), 0);
              const stagePercentage = totalValue > 0 ? (stageValue / totalValue) * 100 : 0;
              
              return (
                <div key={stage} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="capitalize font-medium">{stage.replace('_', ' ')}</span>
                    <div className="flex items-center gap-4">
                      <span>{stageOpportunities.length} opportunities</span>
                      <span className="font-medium">${stageValue.toLocaleString()}</span>
                    </div>
                  </div>
                  <Progress value={stagePercentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <CRMFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={opportunityStages.slice(0, 5)}
        selectedFilter={selectedStage}
        onFilterChange={setSelectedStage}
        searchPlaceholder="Search opportunities..."
      />

      {/* Opportunities Table */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>All Opportunities ({filteredOpportunities.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Opportunity</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Probability</TableHead>
                  <TableHead>Weighted Value</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOpportunities.map((opportunity) => (
                  <TableRow key={opportunity.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <div>
                        <p className="font-medium">{opportunity.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {opportunity.company?.name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {opportunity.contact?.first_name} {opportunity.contact?.last_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStageColor(opportunity.stage)}>
                        {opportunity.stage?.replace('_', ' ') || 'prospect'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{opportunity.value?.toLocaleString() || '0'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{opportunity.probability || 0}%</span>
                        <Progress value={opportunity.probability || 0} className="w-16 h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {(((opportunity.value || 0) * (opportunity.probability || 0)) / 100).toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(opportunity.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem onClick={() => handleViewOpportunity(opportunity)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditOpportunity(opportunity)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteOpportunity(opportunity.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredOpportunities.length === 0 && (
            <CRMEmptyState
              icon={Target}
              title="No opportunities found"
              description={searchTerm || selectedStage !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Get started by adding your first opportunity.'}
              showAddButton={!searchTerm && selectedStage === 'all'}
              onAddClick={() => handleAddOpportunity({})}
              addButtonText="Add Your First Opportunity"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

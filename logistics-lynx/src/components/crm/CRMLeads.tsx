/* eslint-disable @typescript-eslint/no-explicit-any */
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
  ArrowRight
} from 'lucide-react';
import CRMFormDialog from './CRMFormDialog';
import { CRMFilters } from './shared/CRMFilters';
import { CRMEmptyState } from './shared/CRMEmptyState';
import { LeadStats } from './leads/LeadStats';
import { enrichedLeads } from '@/data/mockCRMData';
import type { CRMLead, CRMContact, CRMCompany } from '@/types/crm';

interface CRMLeadsProps {
  leads?: CRMLead[];
  contacts?: CRMContact[];
  companies?: CRMCompany[];
}

export const CRMLeads: React.FC<CRMLeadsProps> = ({ 
  leads = enrichedLeads, 
  contacts = [], 
  companies = [] 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [leadData, setLeadData] = useState(leads);

  const filteredLeads = leadData.filter(lead => {
    const matchesSearch = 
      lead.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || lead.lead_status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const leadStatuses = ['all', 'new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost'];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'contacted': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'qualified': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'proposal': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'negotiation': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'closed_won': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'closed_lost': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  // Calculate pipeline data
  const totalValue = leadData.reduce((sum, lead) => sum + (lead.estimated_value || 0), 0);
  const statusCounts = leadStatuses.slice(1).map(status => ({
    status,
    count: leadData.filter(l => l.lead_status === status).length,
    value: leadData.filter(l => l.lead_status === status).reduce((sum, l) => sum + (l.estimated_value || 0), 0)
  }));

  const handleAddLead = (data: unknown) => {
    const newLead: CRMLead = {
      id: `lead-${Date.now()}`,
      ...data,
      lead_score: data.lead_score || 0,
      converted_to_opportunity: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setLeadData([newLead, ...leadData]);
    console.log('New lead added:', newLead);
  };

  const handleEditLead = (lead: CRMLead) => {
    console.log('Edit lead:', lead);
  };

  const handleDeleteLead = (id: string) => {
    setLeadData(leadData.filter(lead => lead.id !== id));
    console.log('Lead deleted:', id);
  };

  const handleViewLead = (lead: CRMLead) => {
    console.log('View lead details:', lead);
  };

  const handleConvertToOpportunity = (lead: CRMLead) => {
    setLeadData(leadData.map(l => 
      l.id === lead.id 
        ? { ...l, converted_to_opportunity: true, lead_status: 'closed_won' }
        : l
    ));
    console.log('Lead converted to opportunity:', lead);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">Leads</h3>
          <p className="text-muted-foreground">
            Track and manage your sales leads
          </p>
        </div>
        <CRMFormDialog
          type="lead"
          onSubmit={handleAddLead}
        />
      </div>

      <LeadStats leads={leadData} />

      {/* Lead Pipeline */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Lead Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statusCounts.map(({ status, count, value }) => (
              <div key={status} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="capitalize font-medium">{status.replace('_', ' ')}</span>
                  <div className="flex items-center gap-4">
                    <span>{count} leads</span>
                    <span className="font-medium">${value.toLocaleString()}</span>
                  </div>
                </div>
                <Progress value={totalValue > 0 ? (value / totalValue) * 100 : 0} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CRMFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={leadStatuses.slice(0, 5)}
        selectedFilter={selectedStatus}
        onFilterChange={setSelectedStatus}
        searchPlaceholder="Search leads..."
      />

      {/* Leads Table */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>All Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Lead Score</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <div>
                        <p className="font-medium">{lead.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {lead.company?.name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {lead.contact?.first_name} {lead.contact?.last_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(lead.lead_status)}>
                        {lead.lead_status?.replace('_', ' ') || 'new'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(lead.priority)}>
                        {lead.priority || 'medium'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{lead.lead_score || 0}</span>
                        <Progress value={lead.lead_score || 0} className="w-16 h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{lead.estimated_value?.toLocaleString() || '0'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(lead.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem onClick={() => handleViewLead(lead)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditLead(lead)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          {!lead.converted_to_opportunity && (
                            <DropdownMenuItem onClick={() => handleConvertToOpportunity(lead)}>
                              <ArrowRight className="mr-2 h-4 w-4" />
                              Convert to Opportunity
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleDeleteLead(lead.id)}
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
          {filteredLeads.length === 0 && (
            <CRMEmptyState
              icon={Target}
              title="No leads found"
              description={searchTerm || selectedStatus !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Get started by adding your first lead.'}
              showAddButton={!searchTerm && selectedStatus === 'all'}
              onAddClick={() => handleAddLead({})}
              addButtonText="Add Your First Lead"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

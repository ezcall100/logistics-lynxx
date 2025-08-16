import React from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Plus, 
  Target, 
  DollarSign, 
  TrendingUp,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Download,
  Building2,
  User
} from 'lucide-react';
import { useCRMOpportunities } from '@/hooks/crm/useCRMOpportunities';
import { useCRM } from '@/hooks/useCRM';
import { CRMStatsCard } from '@/components/crm/shared/CRMStatsCard';

const CRMOpportunitiesPage: React.FC = () => {
  const { opportunities, fetchOpportunities } = useCRMOpportunities();
  const { contacts, companies } = useCRM();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [stageFilter, setStageFilter] = React.useState('all');

  React.useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = 
      opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.contact?.first_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStage = stageFilter === 'all' || opp.stage === stageFilter;
    
    return matchesSearch && matchesStage;
  });

  const getOpportunityStats = () => {
    const totalValue = opportunities.reduce((sum, opp) => sum + (opp.value || 0), 0);
    const wonValue = opportunities
      .filter(opp => opp.stage === 'won')
      .reduce((sum, opp) => sum + (opp.value || 0), 0);
    
    return {
      total: opportunities.length,
      totalValue,
      wonValue,
      winRate: opportunities.length > 0 ? (opportunities.filter(opp => opp.stage === 'won').length / opportunities.length) * 100 : 0,
      pipeline: opportunities.filter(opp => opp.stage !== 'won' && opp.stage !== 'lost').length
    };
  };

  const stats = getOpportunityStats();

  const getStageColor = (stage?: string) => {
    switch (stage) {
      case 'prospecting': return 'bg-blue-100 text-blue-800';
      case 'qualification': return 'bg-yellow-100 text-yellow-800';
      case 'proposal': return 'bg-orange-100 text-orange-800';
      case 'negotiation': return 'bg-purple-100 text-purple-800';
      case 'won': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">CRM Opportunities</h1>
          <p className="text-muted-foreground">Track and manage your sales opportunities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Opportunity
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <CRMStatsCard
          title="Total Opportunities"
          value={stats.total}
          icon={Target}
          iconColor="text-blue-600"
        />
        <CRMStatsCard
          title="Total Value"
          value={formatCurrency(stats.totalValue)}
          icon={DollarSign}
          iconColor="text-green-600"
        />
        <CRMStatsCard
          title="Won Value"
          value={formatCurrency(stats.wonValue)}
          icon={TrendingUp}
          iconColor="text-emerald-600"
        />
        <CRMStatsCard
          title="Win Rate"
          value={`${stats.winRate.toFixed(1)}%`}
          icon={Target}
          iconColor="text-purple-600"
        />
        <CRMStatsCard
          title="In Pipeline"
          value={stats.pipeline}
          icon={Target}
          iconColor="text-orange-600"
        />
      </div>

      {/* Pipeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {['prospecting', 'qualification', 'proposal', 'negotiation', 'won', 'lost'].map(stage => {
              const stageOpps = opportunities.filter(opp => opp.stage === stage);
              const stageValue = stageOpps.reduce((sum, opp) => sum + (opp.value || 0), 0);
              
              return (
                <div key={stage} className="text-center">
                  <div className="text-2xl font-bold text-foreground">{stageOpps.length}</div>
                  <div className="text-sm text-muted-foreground capitalize">{stage}</div>
                  <div className="text-xs text-muted-foreground">{formatCurrency(stageValue)}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={stageFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStageFilter('all')}
              >
                All
              </Button>
              {['prospecting', 'qualification', 'proposal', 'negotiation'].map(stage => (
                <Button
                  key={stage}
                  variant={stageFilter === stage ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStageFilter(stage)}
                  className="capitalize"
                >
                  {stage}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-foreground">{opportunity.name}</h3>
                      <Badge className={getStageColor(opportunity.stage)}>
                        {opportunity.stage}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        <span className="font-medium text-foreground">
                          {formatCurrency(opportunity.value || 0)}
                        </span>
                      </div>
                      
                      {opportunity.company && (
                        <div className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {opportunity.company.name}
                        </div>
                      )}
                      
                      {opportunity.contact && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {opportunity.contact.first_name} {opportunity.contact.last_name}
                        </div>
                      )}
                      
                      {opportunity.expected_close_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(opportunity.expected_close_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {opportunity.probability && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Probability</span>
                          <span className="text-foreground">{opportunity.probability}%</span>
                        </div>
                        <Progress value={opportunity.probability} className="h-2" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-1 ml-4">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredOpportunities.length === 0 && (
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No opportunities found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first opportunity.'}
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Opportunity
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      </div>
    </SuperAdminLayout>
  );
};

export default CRMOpportunitiesPage;
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';
import AIConfidenceLogCard from './AIConfidenceLogCard';
import AIConfidenceFilters from './AIConfidenceFilters';
import type { AIConfidenceLog, AIConfidenceFilters as FilterType } from '@/types/ai-confidence';

interface DecisionLogsManagerProps {
  logs: AIConfidenceLog[];
  loading: boolean;
  filters: FilterType;
  fetchLogs: (filters?: FilterType) => Promise<void>;
  onFilterChange: (filters: FilterType) => void;
  onFlagForReview: (id: string, flag: boolean) => Promise<void>;
  onMarkAsReviewed: (id: string, reviewedBy: string) => Promise<void>;
}

const DecisionLogsManager = ({
  logs,
  loading,
  filters,
  fetchLogs,
  onFilterChange,
  onFlagForReview,
  onMarkAsReviewed
}: DecisionLogsManagerProps) => {
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredLogs = () => {
    const filtered = logs;
    
    switch (activeTab) {
      case 'flagged':
        filtered = logs.filter(log => log.flagged_for_review);
        break;
      case 'low-confidence':
        filtered = logs.filter(log => log.confidence_score < 0.8);
        break;
      case 'reviewed':
        filtered = logs.filter(log => log.reviewed_by);
        break;
    }
    
    return filtered;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>AI Decision Logs</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => fetchLogs(filters)}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <AIConfidenceFilters 
              filters={filters}
              onFilterChange={onFilterChange}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({logs.length})</TabsTrigger>
            <TabsTrigger value="flagged">
              Flagged ({logs.filter(log => log.flagged_for_review).length})
            </TabsTrigger>
            <TabsTrigger value="low-confidence">
              Low Confidence ({logs.filter(log => log.confidence_score < 0.8).length})
            </TabsTrigger>
            <TabsTrigger value="reviewed">
              Reviewed ({logs.filter(log => log.reviewed_by).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="h-6 w-6 animate-spin" />
                <span className="ml-2">Loading AI decision logs...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {getFilteredLogs().length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No AI decision logs found for the selected filter.
                  </div>
                ) : (
                  getFilteredLogs().map(log => (
                    <AIConfidenceLogCard
                      key={log.id}
                      log={log}
                      onFlagForReview={onFlagForReview}
                      onMarkAsReviewed={onMarkAsReviewed}
                    />
                  ))
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DecisionLogsManager;

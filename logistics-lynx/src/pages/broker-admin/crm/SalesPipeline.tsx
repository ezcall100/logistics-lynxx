/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp,
  Plus,
  Filter,
  FileDown,
  Star
} from 'lucide-react';

const SalesPipeline = () => {
  // Mock data for pipeline stages
  const pipelineStages = [
    { name: 'Prospecting', count: 24, value: 580000 },
    { name: 'Qualified', count: 18, value: 720000 },
    { name: 'Proposal', count: 12, value: 890000 },
    { name: 'Negotiation', count: 8, value: 650000 }
  ];

  const totalPipelineValue = pipelineStages.reduce((sum, stage) => sum + stage.value, 0);

  // Mock data for recent deals
  const recentDeals = [
    {
      id: 1,
      company: 'Global Manufacturing Inc',
      contact: 'Sarah Johnson',
      stage: 'Proposal',
      value: 125000,
      probability: 75,
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      company: 'Retail Solutions Corp',
      contact: 'Mike Chen',
      stage: 'Negotiation',
      value: 98000,
      probability: 85,
      lastActivity: '4 hours ago'
    },
    {
      id: 3,
      company: 'Tech Logistics Pro',
      contact: 'Lisa Rodriguez',
      stage: 'Qualified',
      value: 145000,
      probability: 60,
      lastActivity: 'Yesterday'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Pipeline</h1>
          <p className="text-muted-foreground">
            Visual funnel management and deal progression tracking
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Deal
          </Button>
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        {pipelineStages.map((stage, index) => (
          <Card key={stage.name}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                {stage.name}
                <Badge variant="secondary">{stage.count}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                ${(stage.value / 1000).toFixed(0)}K
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total value in stage
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Funnel</CardTitle>
          <CardDescription>
            Visual representation of deals progression through stages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pipelineStages.map((stage, index) => (
              <div key={stage.name} className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium">{stage.name}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={(stage.value / Math.max(...pipelineStages.map(s => s.value))) * 100} 
                      className="flex-1 h-6"
                    />
                    <div className="text-sm font-medium w-16 text-right">
                      ${(stage.value / 1000).toFixed(0)}K
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{stage.count} deals</span>
                    <span>{Math.round((stage.value / totalPipelineValue) * 100)}% of total</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Deals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Pipeline Activity
          </CardTitle>
          <CardDescription>
            Latest deals and stage movements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDeals.map((deal) => (
              <div key={deal.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-semibold">{deal.company}</p>
                  <p className="text-sm text-muted-foreground">{deal.contact}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{deal.stage}</Badge>
                    <span className="text-xs text-muted-foreground">
                      Updated {deal.lastActivity}
                    </span>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-bold text-lg">${(deal.value / 1000).toFixed(0)}K</p>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(deal.probability / 20)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {deal.probability}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesPipeline;
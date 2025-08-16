
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MarketResearchAgent, MarketIntelligenceData, CompetitiveAnalysis, MarketForecast } from '@/types/market-research';

export const useMarketResearchAgents = () => {
  const [agents, setAgents] = useState<MarketResearchAgent[]>([]);
  const [marketData, setMarketData] = useState<MarketIntelligenceData[]>([]);
  const [competitorData, setCompetitorData] = useState<CompetitiveAnalysis[]>([]);
  const [forecasts, setForecasts] = useState<MarketForecast[]>([]);
  const [researchActive, setResearchActive] = useState(true);
  const { toast } = useToast();

  // Initialize market research agents
  useEffect(() => {
    const initializeAgents = () => {
      const marketResearchAgents: MarketResearchAgent[] = [
        {
          id: 'market-intelligence-agent',
          name: 'Market Intelligence Agent',
          type: 'market_intelligence',
          status: 'active',
          last_research: new Date().toISOString(),
          research_completed: 0,
          success_rate: 100,
          next_research_cycle: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          focus_areas: ['pricing_trends', 'technology_analysis', 'industry_reports']
        },
        {
          id: 'competitive-analysis-agent',
          name: 'Competitive Analysis Agent',
          type: 'competitive_analysis',
          status: 'active',
          last_research: new Date().toISOString(),
          research_completed: 0,
          success_rate: 100,
          next_research_cycle: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
          focus_areas: ['competitor_features', 'market_positioning', 'customer_feedback']
        },
        {
          id: 'demand-forecasting-agent',
          name: 'Market Demand & Forecasting Agent',
          type: 'demand_forecasting',
          status: 'active',
          last_research: new Date().toISOString(),
          research_completed: 0,
          success_rate: 100,
          next_research_cycle: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
          focus_areas: ['demand_prediction', 'capacity_analysis', 'route_optimization']
        }
      ];
      
      setAgents(marketResearchAgents);
    };

    initializeAgents();
  }, []);

  const executeMarketResearch = async (agent: MarketResearchAgent) => {
    setAgents(prev => prev.map(a => 
      a.id === agent.id ? { ...a, status: 'researching' } : a
    ));

    try {
      const { data: result, error } = await supabase.functions.invoke('autonomous-ai', {
        body: {
          action: 'market_research',
          data: {
            agent_type: agent.type,
            focus_areas: agent.focus_areas,
            research_depth: 'comprehensive'
          }
        }
      });

      if (error) throw error;

      // Update agent status and research data
      setAgents(prev => prev.map(a => 
        a.id === agent.id ? {
          ...a,
          status: 'active',
          research_completed: a.research_completed + 1,
          last_research: new Date().toISOString(),
          next_research_cycle: new Date(Date.now() + (agent.type === 'demand_forecasting' ? 12 : 24) * 60 * 60 * 1000).toISOString()
        } : a
      ));

      // Process research results
      if (result && result.research_data) {
        switch (agent.type) {
          case 'market_intelligence':
            setMarketData(prev => [...prev, result.research_data]);
            break;
          case 'competitive_analysis':
            setCompetitorData(prev => [...prev, result.research_data]);
            break;
          case 'demand_forecasting':
            setForecasts(prev => [...prev, result.research_data]);
            break;
        }
      }

      toast({
        title: "Market Research Completed",
        description: `${agent.name}: Research cycle completed successfully`,
      });

    } catch (error: unknown) {
      console.error(`Market research agent ${agent.id} failed:`, error);
      
      setAgents(prev => prev.map(a => 
        a.id === agent.id ? {
          ...a,
          status: 'active',
          success_rate: Math.max(0, a.success_rate - 5),
          next_research_cycle: new Date(Date.now() + 60 * 60 * 1000).toISOString() // Retry in 1 hour
        } : a
      ));

      toast({
        title: "Research Error",
        description: `${agent.name}: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  // Auto-execute research cycles
  useEffect(() => {
    if (!researchActive) return;

    const interval = setInterval(() => {
      agents.forEach(agent => {
        if (agent.status === 'active' && new Date(agent.next_research_cycle) <= new Date()) {
          executeMarketResearch(agent);
        }
      });
    }, 60 * 60 * 1000); // Check every hour

    return () => clearInterval(interval);
  }, [agents, researchActive, executeMarketResearch]);

  const getMarketInsights = () => {
    const recentData = marketData.slice(-5);
    const recentCompetitors = competitorData.slice(-3);
    const recentForecasts = forecasts.slice(-3);

    return {
      latest_intelligence: recentData,
      competitive_landscape: recentCompetitors,
      market_predictions: recentForecasts,
      total_insights: marketData.length + competitorData.length + forecasts.length
    };
  };

  const getActionableRecommendations = () => {
    const allRecommendations = [
      ...marketData.flatMap(d => d.actionable_items),
      ...competitorData.flatMap(c => c.feature_gaps),
      ...forecasts.flatMap(f => f.recommendations.immediate_actions)
    ];

    return allRecommendations.slice(0, 10); // Top 10 recommendations
  };

  return {
    agents,
    marketData,
    competitorData,
    forecasts,
    researchActive,
    setResearchActive,
    executeMarketResearch,
    getMarketInsights,
    getActionableRecommendations
  };
};

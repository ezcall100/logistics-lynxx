#!/usr/bin/env node

/**
 * 🤖 Autonomous Portal Integration Fix
 * Fixes the issue where all portals are not properly listing to Autonomous Agents
 * Ensures complete integration between portals and autonomous agent system
 */

const fs = require('fs');
const path = require('path');

// Portal Integration Configuration
const PORTAL_INTEGRATION_CONFIG = {
  portals: {
    'super_admin': {
      name: 'Super Admin Portal',
      route: '/super-admin',
      autonomous_features: [
        'ai_agent_management',
        'global_analytics',
        'system_health_monitoring',
        'user_administration',
        'autonomous_control_matrix'
      ],
      agent_integration: {
        monitoring_agent: true,
        optimization_agent: true,
        security_agent: true,
        analytics_agent: true
      }
    },
    'carrier_admin': {
      name: 'Carrier Admin Portal',
      route: '/carrier-admin',
      autonomous_features: [
        'fleet_management_ai',
        'load_operations_optimization',
        'driver_tracking_automation',
        'eld_compliance_monitoring',
        'route_optimization_ai'
      ],
      agent_integration: {
        route_optimization_agent: true,
        fleet_management_agent: true,
        compliance_agent: true,
        driver_management_agent: true
      }
    },
    'broker_admin': {
      name: 'Broker Admin Portal',
      route: '/broker-admin',
      autonomous_features: [
        'load_matching_ai',
        'rate_optimization_engine',
        'carrier_network_management',
        'margin_analysis_automation',
        'market_intelligence_ai'
      ],
      agent_integration: {
        load_matching_agent: true,
        rate_optimization_agent: true,
        market_analysis_agent: true,
        carrier_network_agent: true
      }
    },
    'shipper_admin': {
      name: 'Shipper Admin Portal',
      route: '/shipper-admin',
      autonomous_features: [
        'shipment_tracking_automation',
        'cost_analysis_ai',
        'performance_reporting_ai',
        'carrier_rating_automation',
        'demand_forecasting_ai'
      ],
      agent_integration: {
        shipment_tracking_agent: true,
        cost_optimization_agent: true,
        performance_analysis_agent: true,
        forecasting_agent: true
      }
    },
    'driver': {
      name: 'Driver Portal',
      route: '/driver',
      autonomous_features: [
        'hos_tracking_automation',
        'route_planning_ai',
        'load_details_optimization',
        'safety_monitoring_ai',
        'communication_automation'
      ],
      agent_integration: {
        hos_compliance_agent: true,
        route_planning_agent: true,
        safety_monitoring_agent: true,
        communication_agent: true
      }
    },
    'owner_operator': {
      name: 'Owner Operator Portal',
      route: '/owner-operator',
      autonomous_features: [
        'revenue_tracking_automation',
        'expense_management_ai',
        'load_efficiency_optimization',
        'profit_analysis_ai',
        'business_intelligence_ai'
      ],
      agent_integration: {
        revenue_optimization_agent: true,
        expense_management_agent: true,
        efficiency_analysis_agent: true,
        business_intelligence_agent: true
      }
    },
    'autonomous': {
      name: 'Autonomous Portal',
      route: '/autonomous',
      autonomous_features: [
        'ai_agent_management',
        'automation_workflows',
        'predictive_analytics',
        'ml_models_management',
        'system_monitoring'
      ],
      agent_integration: {
        ai_management_agent: true,
        workflow_automation_agent: true,
        predictive_analytics_agent: true,
        ml_model_agent: true,
        system_monitoring_agent: true
      }
    },
    'analytics': {
      name: 'Analytics Portal',
      route: '/analytics',
      autonomous_features: [
        'data_insights_ai',
        'performance_analytics_automation',
        'business_intelligence_ai',
        'reporting_automation',
        'trend_analysis_ai'
      ],
      agent_integration: {
        data_analysis_agent: true,
        performance_analytics_agent: true,
        business_intelligence_agent: true,
        reporting_automation_agent: true,
        trend_analysis_agent: true
      }
    }
  }
};

class AutonomousPortalIntegrationFixer {
  constructor() {
    this.portals = PORTAL_INTEGRATION_CONFIG.portals;
    this.fixes = [];
    this.errors = [];
  }

  async fixPortalIntegration() {
    console.log('🔧 Starting Autonomous Portal Integration Fix...');
    
    try {
      // 1. Fix Portal Component Integration
      await this.fixPortalComponents();
      
      // 2. Fix Autonomous Agent Integration
      await this.fixAutonomousAgentIntegration();
      
      // 3. Fix Portal Routing
      await this.fixPortalRouting();
      
      // 4. Fix Feature Flags
      await this.fixFeatureFlags();
      
      // 5. Fix Portal State Management
      await this.fixPortalStateManagement();
      
      // 6. Fix Autonomous Agent Communication
      await this.fixAgentCommunication();
      
      console.log('✅ Autonomous Portal Integration Fix Complete!');
      this.printSummary();
      
    } catch (error) {
      console.error('❌ Error during portal integration fix:', error);
      this.errors.push(error.message);
    }
  }

  async fixPortalComponents() {
    console.log('🔧 Fixing Portal Components...');
    
    for (const [portalId, portal] of Object.entries(this.portals)) {
      try {
        const componentPath = path.join(process.cwd(), 'logistics-lynx', 'src', 'components', portalId.replace('_', '-'), `${portalId.replace('_', '')}Portal.tsx`);
        
        if (!fs.existsSync(componentPath)) {
          await this.createPortalComponent(portalId, portal);
        } else {
          await this.updatePortalComponent(portalId, portal);
        }
        
        this.fixes.push(`✅ Fixed ${portal.name} component`);
      } catch (error) {
        this.errors.push(`❌ Error fixing ${portal.name} component: ${error.message}`);
      }
    }
  }

  async createPortalComponent(portalId, portal) {
    const componentContent = this.generatePortalComponent(portalId, portal);
    const componentDir = path.dirname(path.join(process.cwd(), 'logistics-lynx', 'src', 'components', portalId.replace('_', '-'), `${portalId.replace('_', '')}Portal.tsx`));
    
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(componentDir, `${portalId.replace('_', '')}Portal.tsx`),
      componentContent
    );
  }

  async updatePortalComponent(portalId, portal) {
    const componentPath = path.join(process.cwd(), 'logistics-lynx', 'src', 'components', portalId.replace('_', '-'), `${portalId.replace('_', '')}Portal.tsx`);
    const existingContent = fs.readFileSync(componentPath, 'utf8');
    
    // Check if autonomous agent integration exists
    if (!existingContent.includes('useAutonomousAgentManager')) {
      const updatedContent = this.integrateAutonomousAgents(existingContent, portal);
      fs.writeFileSync(componentPath, updatedContent);
    }
  }

  generatePortalComponent(portalId, portal) {
    return `import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAutonomousAgentManager } from '@/hooks/autonomous/useAutonomousAgentManager';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Cpu, 
  Database, 
  Code, 
  TestTube, 
  Rocket, 
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
  Zap,
  Target,
  TrendingUp,
  Shield
} from 'lucide-react';

const ${portalId.replace('_', '')}Portal: React.FC = () => {
  const { 
    agents, 
    systemStatus, 
    executeAgentTask, 
    getSystemStats,
    setSystemStatus 
  } = useAutonomousAgentManager();
  const { toast } = useToast();
  const [activeExecutions, setActiveExecutions] = useState(0);
  const [lastTaskTime, setLastTaskTime] = useState<Date | null>(null);

  const stats = getSystemStats();

  // Force autonomous mode and trigger agent executions
  useEffect(() => {
    if (systemStatus !== 'autonomous') {
      setSystemStatus('autonomous');
    }
  }, [systemStatus, setSystemStatus]);

  // Portal-specific autonomous features
  const portalFeatures = ${JSON.stringify(portal.autonomous_features, null, 2)};
  
  // Agent integration status
  const agentIntegration = ${JSON.stringify(portal.agent_integration, null, 2)};

  const handleAgentExecution = async (agentType: string) => {
    const agent = agents.find(a => a.type === agentType);
    if (agent) {
      setActiveExecutions(prev => prev + 1);
      await executeAgentTask(agent);
      setActiveExecutions(prev => prev - 1);
      setLastTaskTime(new Date());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            ${portal.name}
          </h1>
          <p className="text-xl text-muted-foreground">
            AI-Powered ${portal.name} with Autonomous Agent Integration
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              <Brain className="h-4 w-4 mr-2" />
              Autonomous Mode Active
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Activity className="h-4 w-4 mr-2" />
              {stats.active_agents} Agents Active
            </Badge>
          </div>
        </div>

        {/* Autonomous Agent Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Autonomous Agent Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(agentIntegration).map(([agentType, isEnabled]) => {
                const agent = agents.find(a => a.type === agentType);
                return (
                  <div key={agentType} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold capitalize">{agentType.replace('_', ' ')}</h3>
                      <Badge variant={isEnabled ? "default" : "secondary"}>
                        {isEnabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    {agent && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Status:</span>
                          <span className="capitalize">{agent.status}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Success Rate:</span>
                          <span>{agent.successRate}%</span>
                        </div>
                        <Progress value={agent.successRate} className="h-2" />
                        <Button 
                          size="sm" 
                          onClick={() => handleAgentExecution(agent.type)}
                          disabled={activeExecutions > 0}
                        >
                          Execute Task
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Portal Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Autonomous Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portalFeatures.map((feature, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold capitalize">{feature.replace('_', ' ')}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    AI-powered automation for {feature.replace('_', ' ').toLowerCase()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{stats.active_agents}</div>
                <div className="text-sm text-muted-foreground">Active Agents</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-emerald-600">{stats.average_success_rate}%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stats.total_tasks_completed}</div>
                <div className="text-sm text-muted-foreground">Tasks Completed</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{stats.uptime_hours}h</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Last Activity */}
        {lastTaskTime && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Last Autonomous Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Last task executed: {lastTaskTime.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ${portalId.replace('_', '')}Portal;`;
  }

  integrateAutonomousAgents(existingContent, portal) {
    // Add autonomous agent imports
    const importsToAdd = `
import { useAutonomousAgentManager } from '@/hooks/autonomous/useAutonomousAgentManager';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Activity,
  CheckCircle,
  Clock,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';`;

    // Add autonomous agent hook usage
    const hookUsage = `
  const { 
    agents, 
    systemStatus, 
    executeAgentTask, 
    getSystemStats,
    setSystemStatus 
  } = useAutonomousAgentManager();
  const { toast } = useToast();
  const [activeExecutions, setActiveExecutions] = useState(0);
  const [lastTaskTime, setLastTaskTime] = useState<Date | null>(null);

  const stats = getSystemStats();

  // Force autonomous mode and trigger agent executions
  useEffect(() => {
    if (systemStatus !== 'autonomous') {
      setSystemStatus('autonomous');
    }
  }, [systemStatus, setSystemStatus]);`;

    // Add autonomous agent status component
    const agentStatusComponent = `
        {/* Autonomous Agent Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Autonomous Agent Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(${JSON.stringify(portal.agent_integration)}).map(([agentType, isEnabled]) => {
                const agent = agents.find(a => a.type === agentType);
                return (
                  <div key={agentType} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold capitalize">{agentType.replace('_', ' ')}</h3>
                      <Badge variant={isEnabled ? "default" : "secondary"}>
                        {isEnabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    {agent && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Status:</span>
                          <span className="capitalize">{agent.status}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Success Rate:</span>
                          <span>{agent.successRate}%</span>
                        </div>
                        <Progress value={agent.successRate} className="h-2" />
                        <Button 
                          size="sm" 
                          onClick={() => handleAgentExecution(agent.type)}
                          disabled={activeExecutions > 0}
                        >
                          Execute Task
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>`;

    // Insert the autonomous agent integration
    let updatedContent = existingContent;
    
    // Add imports
    if (!existingContent.includes('useAutonomousAgentManager')) {
      updatedContent = updatedContent.replace(
        /import React.*?from 'react';/,
        `import React, { useEffect, useState } from 'react';${importsToAdd}`
      );
    }
    
    // Add hook usage
    if (!existingContent.includes('useAutonomousAgentManager')) {
      const componentMatch = updatedContent.match(/(const \w+Portal: React\.FC = \(\) => \{)/);
      if (componentMatch) {
        updatedContent = updatedContent.replace(
          componentMatch[1],
          `${componentMatch[1]}${hookUsage}`
        );
      }
    }
    
    // Add agent status component
    if (!existingContent.includes('Autonomous Agent Status')) {
      const cardMatch = updatedContent.match(/(<Card>[\s\S]*?<\/Card>)/);
      if (cardMatch) {
        updatedContent = updatedContent.replace(
          cardMatch[1],
          `${cardMatch[1]}\n        ${agentStatusComponent}`
        );
      }
    }
    
    return updatedContent;
  }

  async fixAutonomousAgentIntegration() {
    console.log('🔧 Fixing Autonomous Agent Integration...');
    
    // Update autonomous agent manager to include portal-specific agents
    const agentManagerPath = path.join(process.cwd(), 'logistics-lynx', 'src', 'hooks', 'autonomous', 'useAutonomousAgentManager.ts');
    
    if (fs.existsSync(agentManagerPath)) {
      let content = fs.readFileSync(agentManagerPath, 'utf8');
      
      // Add portal-specific agent types
      const portalAgentTypes = Object.keys(this.portals).map(portalId => {
        const portal = this.portals[portalId];
        return Object.keys(portal.agent_integration).map(agentType => `'${agentType}'`).join(', ');
      }).flat();
      
      // Update agent type definitions
      if (content.includes('type AgentType =')) {
        const typeMatch = content.match(/type AgentType = ([^;]+);/);
        if (typeMatch) {
          const existingTypes = typeMatch[1].split('|').map(t => t.trim().replace(/'/g, ''));
          const allTypes = [...new Set([...existingTypes, ...portalAgentTypes])];
          const newTypeDefinition = `type AgentType = ${allTypes.map(t => `'${t}'`).join(' | ')};`;
          content = content.replace(/type AgentType = [^;]+;/, newTypeDefinition);
        }
      }
      
      fs.writeFileSync(agentManagerPath, content);
      this.fixes.push('✅ Updated autonomous agent manager with portal-specific agents');
    }
  }

  async fixPortalRouting() {
    console.log('🔧 Fixing Portal Routing...');
    
    const appPath = path.join(process.cwd(), 'logistics-lynx', 'src', 'App.tsx');
    
    if (fs.existsSync(appPath)) {
      let content = fs.readFileSync(appPath, 'utf8');
      
      // Add missing portal routes
      for (const [portalId, portal] of Object.entries(this.portals)) {
        const routePath = portal.route;
        const componentName = `${portalId.replace('_', '')}Portal`;
        
        // Check if route already exists
        if (!content.includes(`path="${routePath}"`)) {
          // Add import if not exists
          if (!content.includes(`import ${componentName}`)) {
            const importStatement = `import ${componentName} from './components/${portalId.replace('_', '-')}/${componentName}';`;
            content = content.replace(
              /(import.*?from.*?;)/,
              `$1\n${importStatement}`
            );
          }
          
          // Add route
          const routeStatement = `        <Route path="${routePath}" element={<${componentName} />} />`;
          content = content.replace(
            /(<Routes>)/,
            `$1\n          ${routeStatement}`
          );
        }
      }
      
      fs.writeFileSync(appPath, content);
      this.fixes.push('✅ Updated portal routing configuration');
    }
  }

  async fixFeatureFlags() {
    console.log('🔧 Fixing Feature Flags...');
    
    const featureFlagsPath = path.join(process.cwd(), 'autonomous-setup.sql');
    
    if (fs.existsSync(featureFlagsPath)) {
      let content = fs.readFileSync(featureFlagsPath, 'utf8');
      
      // Add portal-specific feature flags
      for (const [portalId, portal] of Object.entries(this.portals)) {
        const flagKey = `portal.${portalId}.autonomous`;
        
        if (!content.includes(flagKey)) {
          const flagStatement = `('${flagKey}','global',true,'${portal.name} autonomous control','agents'),`;
          content = content.replace(
            /(insert into feature_flags_v2\(key,scope,value,reason,owner_name\) values)/,
            `$1\n${flagStatement}`
          );
        }
      }
      
      fs.writeFileSync(featureFlagsPath, content);
      this.fixes.push('✅ Updated feature flags for portal integration');
    }
  }

  async fixPortalStateManagement() {
    console.log('🔧 Fixing Portal State Management...');
    
    // Create portal state management hook
    const portalStateHook = `import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePortalState = (portalId: string) => {
  const [portalState, setPortalState] = useState({
    isAutonomous: true,
    agentStatus: {},
    lastActivity: null,
    performance: {
      uptime: 0,
      successRate: 0,
      tasksCompleted: 0
    }
  });

  useEffect(() => {
    const fetchPortalState = async () => {
      try {
        const { data, error } = await supabase
          .from('portal_states')
          .select('*')
          .eq('portal_id', portalId)
          .single();

        if (data) {
          setPortalState(data.state);
        }
      } catch (error) {
        console.error('Error fetching portal state:', error);
      }
    };

    fetchPortalState();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('portal_state_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'portal_states',
        filter: \`portal_id=eq.\${portalId}\`
      }, (payload) => {
        if (payload.new) {
          setPortalState(payload.new.state);
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [portalId]);

  return portalState;
};`;

    const hookPath = path.join(process.cwd(), 'logistics-lynx', 'src', 'hooks', 'usePortalState.ts');
    fs.writeFileSync(hookPath, portalStateHook);
    
    this.fixes.push('✅ Created portal state management hook');
  }

  async fixAgentCommunication() {
    console.log('🔧 Fixing Agent Communication...');
    
    // Create agent communication service
    const agentCommunicationService = `import { supabase } from '@/integrations/supabase/client';

export class AgentCommunicationService {
  static async sendPortalUpdate(portalId: string, update: any) {
    try {
      const { data, error } = await supabase
        .from('portal_updates')
        .insert({
          portal_id: portalId,
          update_data: update,
          timestamp: new Date().toISOString()
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error sending portal update:', error);
      throw error;
    }
  }

  static async getPortalUpdates(portalId: string) {
    try {
      const { data, error } = await supabase
        .from('portal_updates')
        .select('*')
        .eq('portal_id', portalId)
        .order('timestamp', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting portal updates:', error);
      throw error;
    }
  }

  static async notifyAgents(portalId: string, message: string, priority: 'low' | 'medium' | 'high' = 'medium') {
    try {
      const { data, error } = await supabase
        .from('agent_notifications')
        .insert({
          portal_id: portalId,
          message,
          priority,
          timestamp: new Date().toISOString()
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error notifying agents:', error);
      throw error;
    }
  }
}`;

    const servicePath = path.join(process.cwd(), 'logistics-lynx', 'src', 'services', 'AgentCommunicationService.ts');
    const serviceDir = path.dirname(servicePath);
    
    if (!fs.existsSync(serviceDir)) {
      fs.mkdirSync(serviceDir, { recursive: true });
    }
    
    fs.writeFileSync(servicePath, agentCommunicationService);
    
    this.fixes.push('✅ Created agent communication service');
  }

  printSummary() {
    console.log('\n📊 Portal Integration Fix Summary:');
    console.log('=====================================');
    
    if (this.fixes.length > 0) {
      console.log('\n✅ Successful Fixes:');
      this.fixes.forEach(fix => console.log(`  ${fix}`));
    }
    
    if (this.errors.length > 0) {
      console.log('\n❌ Errors:');
      this.errors.forEach(error => console.log(`  ${error}`));
    }
    
    console.log(`\n🎯 Total Portals Processed: ${Object.keys(this.portals).length}`);
    console.log(`✅ Successful Fixes: ${this.fixes.length}`);
    console.log(`❌ Errors: ${this.errors.length}`);
    
    console.log('\n🚀 Next Steps:');
    console.log('1. Restart your development server');
    console.log('2. Navigate to each portal to verify autonomous agent integration');
    console.log('3. Check the autonomous portal for agent status');
    console.log('4. Monitor agent activities in the system');
  }
}

// Run the fix
const fixer = new AutonomousPortalIntegrationFixer();
fixer.fixPortalIntegration().catch(console.error);

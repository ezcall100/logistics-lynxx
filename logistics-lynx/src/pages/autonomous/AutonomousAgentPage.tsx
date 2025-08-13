import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  ArrowRight, 
  Shield, 
  Settings, 
  BarChart3,
  Activity,
  Cpu,
  ExternalLink
} from 'lucide-react';

const AutonomousAgentPage: React.FC = () => {
  const navigate = useNavigate();

  const agentFeatures = [
    {
      title: 'AI Analytics Dashboard',
      description: 'Monitor AI agent performance and analytics in real-time',
      icon: BarChart3,
      path: '/super-admin/ai/analytics',
      color: 'text-blue-600'
    },
    {
      title: 'System Health Monitoring',
      description: 'Track system performance and health metrics',
      icon: Activity,
      path: '/super-admin/ai/health',
      color: 'text-green-600'
    },
    {
      title: 'Agent Control Center',
      description: 'Complete control over all 250 autonomous AI agents',
      icon: Cpu,
      path: '/super-admin/ai/agents',
      color: 'text-purple-600'
    }
  ];

  const systemStats = [
    { title: 'Total AI Agents', value: '250', description: 'Autonomous agents working 24/7', icon: Bot },
    { title: 'System Status', value: 'Active', description: 'All systems operational', icon: Shield },
    { title: 'Efficiency Rate', value: '98.7%', description: 'Overall performance metric', icon: Settings },
  ];

  return (
    <Layout>
      <div className="container-responsive space-y-6 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Bot className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">🤖 Autonomous Agent Portal</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Welcome to the Trans Bot AI Autonomous Agent Portal. Access advanced AI management tools and monitoring dashboards.
          </p>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
            250 AI Agents Active
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {systemStats.map((stat) => (
            <Card key={stat.title} className="text-center">
              <CardHeader>
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {agentFeatures.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate(feature.path)}
                  className="w-full group-hover:bg-primary/90"
                >
                  Access Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Fast access to common autonomous agent operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/super-admin/ai/analytics')}
              >
                <BarChart3 className="h-6 w-6" />
                <span>View Analytics</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/super-admin/ai/health')}
              >
                <Activity className="h-6 w-6" />
                <span>System Health</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/super-admin/ai/agents')}
              >
                <Cpu className="h-6 w-6" />
                <span>Agent Control</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/super-admin')}
              >
                <ExternalLink className="h-6 w-6" />
                <span>Super Admin</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Overview */}
        <Card>
          <CardHeader>
            <CardTitle>🚀 Trans Bot AI - Autonomous TMS System</CardTitle>
            <CardDescription>
              Comprehensive Transportation Management System powered by 250 autonomous AI agents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Agent Categories</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Research Agents</span>
                    <Badge variant="outline">50 Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Frontend Agents</span>
                    <Badge variant="outline">80 Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Backend Agents</span>
                    <Badge variant="outline">60 Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Database Agents</span>
                    <Badge variant="outline">30 Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Testing Agents</span>
                    <Badge variant="outline">20 Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Deployment Agents</span>
                    <Badge variant="outline">10 Active</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">System Capabilities</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>• Complete UI/UX Design Authority</div>
                  <div>• All Portal Management (Super Admin, Carrier, Shipper, Broker, Driver, Owner-Operator)</div>
                  <div>• Real-time System Health Monitoring</div>
                  <div>• Autonomous Performance Analytics</div>
                  <div>• 24/7 Continuous Operations</div>
                  <div>• Advanced Error Recovery Mechanisms</div>
                  <div>• Intelligent Resource Optimization</div>
                  <div>• Predictive Maintenance Capabilities</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">Enterprise-Grade Security</span>
              </div>
              <p className="text-sm text-muted-foreground">
                All autonomous agents operate with enterprise-grade security protocols, ensuring data protection, 
                compliance with industry standards, and secure API communications across all TMS operations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AutonomousAgentPage;
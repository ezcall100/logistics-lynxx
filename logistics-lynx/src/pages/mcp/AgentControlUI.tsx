import React, { useState, useEffect } from 'react';
import { ResponsiveCard, EnhancedButton } from '../../../components/ui';
import { Input } from '../../components/ui/input.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs.tsx';
import { ScrollArea } from '../../components/ui/scroll-area.tsx';
import { Progress } from '../../components/ui/progress.tsx';
import { Alert, AlertDescription } from '../../components/ui/alert.tsx';
import { 
  Bot, 
  Activity, 
  Play, 
  Pause, 
  RotateCcw,
  Terminal,
  BarChart3,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Shield,
  Database,
  Code,
  TestTube,
  ShieldCheck
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  status: 'Active' | 'Pending' | 'Error' | 'Completed';
  confidence: number | null;
  currentTask: string;
  uptime: string;
  latency: string;
  testCoverage: string;
  lastActivity: string;
}

interface Metric {
  id: string;
  uptime: string;
  latency: string;
  tests: string;
}

const AgentControlUI: React.FC = () => {
  const [command, setCommand] = useState('');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [agentLogs, setAgentLogs] = useState<string[]>([
    '[10:23:01] MCP initialized for builder.frontend.shipper ✅',
    '[10:23:03] build() executed for Dashboard UI 🚀',
    '[10:23:10] API schema validated by backend.shipper ✅',
    '[10:23:15] Supabase RLS enforced by rls.shipper 🔐',
    '[10:23:20] Confidence score updated: 92%, 95%, 100% 📊',
    '[10:23:25] Test coverage: Frontend 86%, Backend 89%, RLS 100% 🧪',
    '[10:23:30] Agent builder.frontend.broker awaiting assignment ⏳',
    '[10:23:35] System uptime: 99.95% - All agents operational 🟢'
  ]);

  // Mock agent data
  const [agents] = useState<Agent[]>([
    {
      id: 'builder.frontend.shipper',
      name: 'Frontend Shipper Builder',
      status: 'Active',
      confidence: 92,
      currentTask: 'Dashboard UI Development',
      uptime: '99.95%',
      latency: '212ms',
      testCoverage: '86%',
      lastActivity: '2 minutes ago'
    },
    {
      id: 'builder.backend.shipper',
      name: 'Backend Shipper Builder',
      status: 'Active',
      confidence: 95,
      currentTask: 'API + DB Schema Creation',
      uptime: '99.91%',
      latency: '194ms',
      testCoverage: '89%',
      lastActivity: '1 minute ago'
    },
    {
      id: 'builder.rls.shipper',
      name: 'RLS Shipper Security',
      status: 'Active',
      confidence: 100,
      currentTask: 'RLS Policy Enforcement',
      uptime: '100%',
      latency: '102ms',
      testCoverage: '100%',
      lastActivity: '30 seconds ago'
    },
    {
      id: 'builder.frontend.broker',
      name: 'Frontend Broker Builder',
      status: 'Pending',
      confidence: null,
      currentTask: 'Awaiting Assignment',
      uptime: '0%',
      latency: 'N/A',
      testCoverage: '0%',
      lastActivity: 'Never'
    },
    {
      id: 'builder.backend.broker',
      name: 'Backend Broker Builder',
      status: 'Pending',
      confidence: null,
      currentTask: 'Awaiting Assignment',
      uptime: '0%',
      latency: 'N/A',
      testCoverage: '0%',
      lastActivity: 'Never'
    },
    {
      id: 'builder.frontend.carrier',
      name: 'Frontend Carrier Builder',
      status: 'Pending',
      confidence: null,
      currentTask: 'Awaiting Assignment',
      uptime: '0%',
      latency: 'N/A',
      testCoverage: '0%',
      lastActivity: 'Never'
    }
  ]);

  // Mock metrics data
  const [metrics] = useState<Metric[]>([
    {
      id: 'builder.frontend.shipper',
      uptime: '99.95%',
      latency: '212ms',
      tests: '86%'
    },
    {
      id: 'builder.backend.shipper',
      uptime: '99.91%',
      latency: '194ms',
      tests: '89%'
    },
    {
      id: 'builder.rls.shipper',
      uptime: '100%',
      latency: '102ms',
      tests: '100%'
    }
  ]);

  const handleCommand = () => {
    if (command.trim()) {
      const newOutput = `> ${command}`;
      setConsoleOutput(prev => [...prev, newOutput]);
      
      // Simulate command execution
      setTimeout(() => {
        const response = `✅ Command executed: ${command}`;
        setConsoleOutput(prev => [...prev, response]);
      }, 500);
      
      setCommand('');
    }
  };

  // Simulate live log updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newLogs = [
        `[${new Date().toLocaleTimeString()}] Agent health check completed ✅`,
        `[${new Date().toLocaleTimeString()}] System performance: Optimal 🚀`,
        `[${new Date().toLocaleTimeString()}] MCP Control Plane: Connected 📡`
      ];
      
      setAgentLogs(prev => [...prev.slice(-5), ...newLogs.slice(0, 1)]);
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollArea className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          MCP Agent Control Center
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Autonomous Agent Management & Monitoring
        </p>
      </div>

      <Tabs defaultValue="status">
        <TabsList>
          <TabsTrigger value="status">Agent Status</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="console">Agent Console</TabsTrigger>
        </TabsList>

        <TabsContent value="status">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {agents.map((agent) => (
              <ResponsiveCard key={agent.id} className="hover:shadow-lg transition-shadow">
                <div className="space-y-2 p-4">
                  <div className="text-lg font-semibold">{agent.name}</div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                    {agent.status}
                  </span>
                  <div className="text-sm text-muted-foreground">{agent.currentTask}</div>
                  {agent.confidence !== null && (
                    <>
                      <div className="text-sm">Confidence: {agent.confidence}%</div>
                      <Progress value={agent.confidence} className="h-2" />
                    </>
                  )}
                  <div className="text-xs text-muted-foreground">
                    Last Activity: {agent.lastActivity}
                  </div>
                  <EnhancedButton variant="outline" size="sm">Details</EnhancedButton>
                </div>
              </ResponsiveCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs">
          <div className="mt-4 space-y-2 bg-muted p-4 rounded text-sm font-mono h-60 overflow-y-auto border">
            {agentLogs.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="mt-4 space-y-4">
            <Alert>
              <ShieldCheck className="h-5 w-5" />
              <AlertDescription>
                Performance metrics including uptime, latency, and test coverage are tracked below.
              </AlertDescription>
            </Alert>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.map((metric) => (
                <ResponsiveCard key={metric.id}>
                  <div className="space-y-1 p-4">
                    <div className="font-semibold text-sm">{metric.id}</div>
                    <div className="text-sm">Uptime: {metric.uptime}</div>
                    <div className="text-sm">Latency: {metric.latency}</div>
                    <div className="text-sm">Test Coverage: {metric.tests}</div>
                  </div>
                </ResponsiveCard>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="console">
          <div className="space-y-4 mt-4">
            <Alert>
              <Terminal className="h-5 w-5" />
              <AlertDescription>Use this console to issue agent commands (simulated).</AlertDescription>
            </Alert>
            <div className="flex gap-2">
              <Input
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Type a command (e.g. deploy broker.portal)"
                onKeyPress={(e) => e.key === 'Enter' && handleCommand()}
              />
              <EnhancedButton onClick={handleCommand}>Execute</EnhancedButton>
            </div>
            <div className="bg-muted p-4 rounded text-sm font-mono h-40 overflow-y-auto border">
              {consoleOutput.length === 0 ? (
                <div className="text-muted-foreground">
                  No commands executed yet. Try: start builder.frontend.broker
                </div>
              ) : (
                consoleOutput.map((line, index) => (
                  <div key={index}>{line}</div>
                ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </ScrollArea>
  );
};

export default AgentControlUI;

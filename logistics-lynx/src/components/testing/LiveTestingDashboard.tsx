/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  TestTube, 
  Play, 
  Pause, 
  RefreshCw,
  CheckCircle, 
  AlertTriangle,
  Clock,
  Zap,
  Activity,
  Shield,
  Database,
  Code,
  Rocket,
  Brain,
  TrendingUp,
  AlertCircle,
  Info
} from 'lucide-react';

interface TestResult {
  id: string;
  test_name: string;
  test_type: 'unit' | 'integration' | 'e2e' | 'performance' | 'security';
  status: 'running' | 'passed' | 'failed' | 'pending';
  duration: number;
  timestamp: string;
  details: string;
  agent_id: string;
}

interface TestSuite {
  name: string;
  type: string;
  total_tests: number;
  passed: number;
  failed: number;
  running: number;
  coverage: number;
  icon: React.ComponentType<unknown>;
  color: string;
}

export const LiveTestingDashboard: React.FC = () => {
  const [isTestingActive, setIsTestingActive] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [currentTest, setCurrentTest] = useState<string>('');
  const [overallProgress, setOverallProgress] = useState(0);
  const { toast } = useToast();

  const [testSuites] = useState<TestSuite[]>([
    {
      name: 'Unit Tests',
      type: 'unit',
      total_tests: 1247,
      passed: 1239,
      failed: 5,
      running: 3,
      coverage: 94.2,
      icon: Code,
      color: 'text-blue-600'
    },
    {
      name: 'Integration Tests',
      type: 'integration',
      total_tests: 423,
      passed: 418,
      failed: 2,
      running: 3,
      coverage: 87.8,
      icon: Database,
      color: 'text-green-600'
    },
    {
      name: 'End-to-End Tests',
      type: 'e2e',
      total_tests: 156,
      passed: 151,
      failed: 1,
      running: 4,
      coverage: 92.1,
      icon: Activity,
      color: 'text-purple-600'
    },
    {
      name: 'Performance Tests',
      type: 'performance',
      total_tests: 89,
      passed: 85,
      failed: 1,
      running: 3,
      coverage: 88.5,
      icon: Zap,
      color: 'text-yellow-600'
    },
    {
      name: 'Security Tests',
      type: 'security',
      total_tests: 67,
      passed: 65,
      failed: 0,
      running: 2,
      coverage: 96.7,
      icon: Shield,
      color: 'text-red-600'
    },
    {
      name: 'Deployment Tests',
      type: 'deployment',
      total_tests: 34,
      passed: 32,
      failed: 0,
      running: 2,
      coverage: 91.3,
      icon: Rocket,
      color: 'text-orange-600'
    }
  ]);

  // Simulate live testing
  useEffect(() => {
    if (!isTestingActive) return;

    const interval = setInterval(() => {
      // Generate random test result
      const testTypes: TestResult['test_type'][] = ['unit', 'integration', 'e2e', 'performance', 'security'];
      const statuses: TestResult['status'][] = ['passed', 'passed', 'passed', 'failed']; // Mostly passing
      
      const newTest: TestResult = {
        id: `test-${Date.now()}-${Math.random()}`,
        test_name: `TMS_${testTypes[Math.floor(Math.random() * testTypes.length)]}_test_${Math.floor(Math.random() * 1000)}`,
        test_type: testTypes[Math.floor(Math.random() * testTypes.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        duration: Math.floor(Math.random() * 2000) + 100,
        timestamp: new Date().toISOString(),
        details: Math.random() > 0.8 ? 'Test completed with minor warnings' : 'Test completed successfully',
        agent_id: `agent-${Math.floor(Math.random() * 250) + 1}`
      };

      setTestResults(prev => [newTest, ...prev.slice(0, 49)]);
      setCurrentTest(newTest.test_name);
      setOverallProgress(prev => Math.min(prev + 0.5, 100));
    }, 1500);

    return () => clearInterval(interval);
  }, [isTestingActive]);

  const startTesting = () => {
    setIsTestingActive(true);
    setOverallProgress(0);
    setTestResults([]);
    toast({
      title: "Live Testing Started",
      description: "Continuous testing of TMS functionality has begun",
    });
  };

  const pauseTesting = () => {
    setIsTestingActive(false);
    toast({
      title: "Testing Paused",
      description: "Live testing has been paused",
      variant: "destructive"
    });
  };

  const resetTesting = () => {
    setIsTestingActive(false);
    setTestResults([]);
    setOverallProgress(0);
    setCurrentTest('');
    toast({
      title: "Testing Reset",
      description: "All test results have been cleared"
    });
  };

  const totalTests = testSuites.reduce((sum, suite) => sum + suite.total_tests, 0);
  const totalPassed = testSuites.reduce((sum, suite) => sum + suite.passed, 0);
  const totalFailed = testSuites.reduce((sum, suite) => sum + suite.failed, 0);
  const totalRunning = testSuites.reduce((sum, suite) => sum + suite.running, 0);
  const overallCoverage = testSuites.reduce((sum, suite) => sum + suite.coverage, 0) / testSuites.length;

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'running': return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'passed': return 'text-green-600 bg-green-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'running': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Testing Control Panel */}
      <Card className="border-2 border-orange-200 bg-orange-50/30">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-orange-900">
                <TestTube className="h-5 w-5" />
                Live Testing Control Center
              </CardTitle>
              <CardDescription className="text-orange-700">
                Continuous automated testing ensuring TMS functionality and quality
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={isTestingActive ? "default" : "secondary"}>
                {isTestingActive ? 'Testing Active' : 'Testing Paused'}
              </Badge>
              <Badge variant="outline">{testResults.length} Tests Run</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Testing Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalPassed}</div>
              <div className="text-sm text-muted-foreground">Tests Passed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{totalFailed}</div>
              <div className="text-sm text-muted-foreground">Tests Failed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalRunning}</div>
              <div className="text-sm text-muted-foreground">Tests Running</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{overallCoverage.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Test Coverage</div>
            </div>
          </div>

          {/* Current Test */}
          {isTestingActive && currentTest && (
            <Alert>
              <Brain className="h-4 w-4" />
              <AlertDescription>
                <strong>Currently Running:</strong> {currentTest}
              </AlertDescription>
            </Alert>
          )}

          {/* Overall Progress */}
          {isTestingActive && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Testing Progress</span>
                <span>{overallProgress.toFixed(1)}%</span>
              </div>
              <Progress value={overallProgress} className="h-3" />
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex gap-2 justify-center flex-wrap">
            <Button
              onClick={startTesting}
              disabled={isTestingActive}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Start Live Testing
            </Button>
            <Button
              onClick={pauseTesting}
              disabled={!isTestingActive}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Pause className="h-4 w-4" />
              Pause Testing
            </Button>
            <Button
              onClick={resetTesting}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Tests
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test Suites Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {testSuites.map((suite) => {
          const IconComponent = suite.icon;
          const successRate = (suite.passed / suite.total_tests) * 100;
          
          return (
            <Card key={suite.type} className="hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`h-5 w-5 ${suite.color}`} />
                    <CardTitle className="text-lg">{suite.name}</CardTitle>
                  </div>
                  <Badge variant="outline">
                    {suite.passed}/{suite.total_tests}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Success Rate */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Success Rate</span>
                    <span>{successRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={successRate} className="h-2" />
                </div>

                {/* Test Breakdown */}
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{suite.passed}</div>
                    <div className="text-xs text-muted-foreground">Passed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">{suite.failed}</div>
                    <div className="text-xs text-muted-foreground">Failed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{suite.running}</div>
                    <div className="text-xs text-muted-foreground">Running</div>
                  </div>
                </div>

                {/* Coverage */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm text-muted-foreground">Coverage:</span>
                  <div className="flex items-center gap-1">
                    <span className={`font-bold ${suite.color}`}>{suite.coverage}%</span>
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Test Results */}
      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Live Test Results
            </CardTitle>
            <CardDescription>
              Real-time stream of test execution results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {testResults.slice(0, 20).map((result) => (
                <div key={result.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {getStatusIcon(result.status)}
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm truncate">{result.test_name}</div>
                      <div className="text-xs text-muted-foreground">{result.details}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant="outline" className={getStatusColor(result.status)}>
                      {result.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {result.duration}ms
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(result.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
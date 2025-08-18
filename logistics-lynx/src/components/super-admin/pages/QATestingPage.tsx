import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

// Icons
import { 
  Bug, TestTube, CheckCircle, AlertTriangle, Clock, TrendingUp, Activity,
  Play, Pause, RotateCcw, Save, Download, Upload,
  Trash2, Edit, Plus, Filter, MoreHorizontal, Bell, User,
  Zap, Eye, EyeOff, RefreshCw, Settings, Code,
  ExternalLink, Copy, Share2, Maximize2, Minimize2,
  Globe, Lock, Shield, Key, Wifi, HardDrive, Cpu,
  HardDriveIcon, WifiOff, AlertCircle, Info,
  FileText, Database, Server
} from 'lucide-react';

// Real data models
interface TestSuite {
  id: string;
  name: string;
  description: string;
  type: 'unit' | 'integration' | 'e2e' | 'performance' | 'security';
  status: 'active' | 'inactive' | 'deprecated';
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  lastRun: string;
  duration: string;
  coverage: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface TestCase {
  id: string;
  name: string;
  suiteId: string;
  description: string;
  status: 'passed' | 'failed' | 'skipped' | 'running' | 'pending';
  priority: 'low' | 'medium' | 'high' | 'critical';
  duration: number;
  lastRun: string;
  errorMessage?: string;
  steps: string[];
  expectedResult: string;
  actualResult?: string;
  automated: boolean;
}

interface TestRun {
  id: string;
  suiteId: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: string;
  endTime?: string;
  duration?: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  environment: string;
  browser?: string;
  device?: string;
  triggeredBy: string;
}

interface BugReport {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  reportedBy: string;
  reportedAt: string;
  testCaseId?: string;
  steps: string[];
  expectedResult: string;
  actualResult: string;
  attachments: string[];
}

// Mock API functions
const mockAPI = {
  getTestSuites: (): Promise<TestSuite[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'User Authentication Tests',
        description: 'Comprehensive tests for user login, registration, and session management',
        type: 'integration',
        status: 'active',
        totalTests: 25,
        passedTests: 23,
        failedTests: 1,
        skippedTests: 1,
        lastRun: '2 hours ago',
        duration: '5m 30s',
        coverage: 85,
        priority: 'high'
      },
      {
        id: '2',
        name: 'API Endpoint Tests',
        description: 'REST API endpoint testing with various HTTP methods',
        type: 'unit',
        status: 'active',
        totalTests: 45,
        passedTests: 44,
        failedTests: 0,
        skippedTests: 1,
        lastRun: '1 hour ago',
        duration: '3m 15s',
        coverage: 92,
        priority: 'high'
      },
      {
        id: '3',
        name: 'E2E User Journey Tests',
        description: 'End-to-end testing of complete user workflows',
        type: 'e2e',
        status: 'active',
        totalTests: 12,
        passedTests: 10,
        failedTests: 2,
        skippedTests: 0,
        lastRun: '30 minutes ago',
        duration: '12m 45s',
        coverage: 78,
        priority: 'medium'
      },
      {
        id: '4',
        name: 'Performance Load Tests',
        description: 'Load testing for system performance under stress',
        type: 'performance',
        status: 'active',
        totalTests: 8,
        passedTests: 7,
        failedTests: 1,
        skippedTests: 0,
        lastRun: '4 hours ago',
        duration: '25m 10s',
        coverage: 65,
        priority: 'medium'
      }
    ]),

  getTestCases: (): Promise<TestCase[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'User Login with Valid Credentials',
        suiteId: '1',
        description: 'Test user login with correct email and password',
        status: 'passed',
        priority: 'high',
        duration: 2.5,
        lastRun: '2 hours ago',
        steps: ['Navigate to login page', 'Enter valid email', 'Enter valid password', 'Click login button'],
        expectedResult: 'User should be logged in and redirected to dashboard',
        actualResult: 'User successfully logged in and redirected to dashboard',
        automated: true
      },
      {
        id: '2',
        name: 'User Login with Invalid Credentials',
        suiteId: '1',
        description: 'Test user login with incorrect credentials',
        status: 'passed',
        priority: 'high',
        duration: 1.8,
        lastRun: '2 hours ago',
        steps: ['Navigate to login page', 'Enter invalid email', 'Enter invalid password', 'Click login button'],
        expectedResult: 'Error message should be displayed',
        actualResult: 'Error message "Invalid credentials" displayed',
        automated: true
      },
      {
        id: '3',
        name: 'API GET Users Endpoint',
        suiteId: '2',
        description: 'Test GET /api/v1/users endpoint',
        status: 'failed',
        priority: 'critical',
        duration: 0.5,
        lastRun: '1 hour ago',
        errorMessage: 'Expected status code 200, got 500',
        steps: ['Send GET request to /api/v1/users', 'Verify response status code', 'Verify response body structure'],
        expectedResult: 'Should return 200 status with user list',
        actualResult: 'Returned 500 status with server error',
        automated: true
      },
      {
        id: '4',
        name: 'Complete Order Flow',
        suiteId: '3',
        description: 'Test complete order creation and checkout process',
        status: 'running',
        priority: 'high',
        duration: 0,
        lastRun: 'Currently running',
        steps: ['Login as user', 'Browse products', 'Add item to cart', 'Proceed to checkout', 'Complete payment'],
        expectedResult: 'Order should be created and confirmation shown',
        automated: false
      }
    ]),

  getTestRuns: (): Promise<TestRun[]> => 
    Promise.resolve([
      {
        id: '1',
        suiteId: '1',
        status: 'completed',
        startTime: '2 hours ago',
        endTime: '1 hour 55 minutes ago',
        duration: '5m 30s',
        totalTests: 25,
        passedTests: 23,
        failedTests: 1,
        skippedTests: 1,
        environment: 'staging',
        browser: 'Chrome 120',
        triggeredBy: 'Automated CI/CD'
      },
      {
        id: '2',
        suiteId: '2',
        status: 'completed',
        startTime: '1 hour ago',
        endTime: '57 minutes ago',
        duration: '3m 15s',
        totalTests: 45,
        passedTests: 44,
        failedTests: 0,
        skippedTests: 1,
        environment: 'staging',
        triggeredBy: 'Manual Trigger'
      },
      {
        id: '3',
        suiteId: '3',
        status: 'running',
        startTime: '30 minutes ago',
        totalTests: 12,
        passedTests: 8,
        failedTests: 2,
        skippedTests: 0,
        environment: 'production',
        browser: 'Firefox 119',
        triggeredBy: 'Scheduled Run'
      }
    ]),

  getBugReports: (): Promise<BugReport[]> => 
    Promise.resolve([
      {
        id: '1',
        title: 'API Users endpoint returns 500 error',
        description: 'The GET /api/v1/users endpoint is consistently returning 500 server errors',
        severity: 'high',
        status: 'open',
        priority: 'critical',
        assignedTo: 'Backend Team',
        reportedBy: 'QA Automation',
        reportedAt: '1 hour ago',
        testCaseId: '3',
        steps: ['Send GET request to /api/v1/users', 'Observe response'],
        expectedResult: '200 status with user data',
        actualResult: '500 status with server error',
        attachments: ['error_log.txt', 'screenshot.png']
      },
      {
        id: '2',
        title: 'Login form validation not working',
        description: 'Login form accepts empty email field without validation',
        severity: 'medium',
        status: 'in-progress',
        priority: 'high',
        assignedTo: 'Frontend Team',
        reportedBy: 'Manual Tester',
        reportedAt: '3 hours ago',
        steps: ['Navigate to login page', 'Leave email field empty', 'Enter password', 'Click login'],
        expectedResult: 'Validation error should appear',
        actualResult: 'Form submits without validation',
        attachments: ['video_recording.mp4']
      }
    ])
};

const QATestingPage = () => {
  const { toast } = useToast();
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [testRuns, setTestRuns] = useState<TestRun[]>([]);
  const [bugReports, setBugReports] = useState<BugReport[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [showAddTestSuiteDialog, setShowAddTestSuiteDialog] = useState(false);
  const [newTestSuite, setNewTestSuite] = useState({
    name: '',
    description: '',
    type: 'unit' as const,
    priority: 'medium' as const
  });

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [suitesData, casesData, runsData, bugsData] = await Promise.all([
          mockAPI.getTestSuites(),
          mockAPI.getTestCases(),
          mockAPI.getTestRuns(),
          mockAPI.getBugReports()
        ]);

        setTestSuites(suitesData);
        setTestCases(casesData);
        setTestRuns(runsData);
        setBugReports(bugsData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load QA data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [toast]);

  // Action handlers
  const handleAddTestSuite = async () => {
    try {
      const testSuite: TestSuite = {
        id: Date.now().toString(),
        name: newTestSuite.name,
        description: newTestSuite.description,
        type: newTestSuite.type,
        status: 'active',
        totalTests: 0,
        passedTests: 0,
        failedTests: 0,
        skippedTests: 0,
        lastRun: 'Never',
        duration: '0s',
        coverage: 0,
        priority: newTestSuite.priority
      };

      setTestSuites(prev => [...prev, testSuite]);
      setShowAddTestSuiteDialog(false);
      setNewTestSuite({
        name: '',
        description: '',
        type: 'unit',
        priority: 'medium'
      });

      toast({
        title: "Success",
        description: "Test suite added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add test suite",
        variant: "destructive"
      });
    }
  };

  const handleRunTestSuite = async (suiteId: string) => {
    try {
      const testRun: TestRun = {
        id: Date.now().toString(),
        suiteId,
        status: 'running',
        startTime: 'Just now',
        totalTests: testSuites.find(s => s.id === suiteId)?.totalTests || 0,
        passedTests: 0,
        failedTests: 0,
        skippedTests: 0,
        environment: 'staging',
        triggeredBy: 'Manual Trigger'
      };

      setTestRuns(prev => [testRun, ...prev]);

      toast({
        title: "Success",
        description: "Test suite started running",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start test suite",
        variant: "destructive"
      });
    }
  };

  const handleUpdateBugStatus = async (bugId: string, status: BugReport['status']) => {
    try {
      setBugReports(prev => prev.map(bug => 
        bug.id === bugId 
          ? { ...bug, status }
          : bug
      ));

      toast({
        title: "Success",
        description: "Bug status updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update bug status",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'running': return 'bg-blue-500';
      case 'skipped': return 'bg-yellow-500';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'unit': return 'bg-blue-100 text-blue-800';
      case 'integration': return 'bg-green-100 text-green-800';
      case 'e2e': return 'bg-purple-100 text-purple-800';
      case 'performance': return 'bg-orange-100 text-orange-800';
      case 'security': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              QA Testing Agent
            </h1>
            <p className="text-sm md:text-base mt-2 text-slate-600">
              Test automation, bug tracking, and quality assurance management
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
              <Bug className="w-4 h-4 mr-1" />
              Testing Active
            </Badge>
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Test Suites</CardTitle>
              <TestTube className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testSuites.length}</div>
              <p className="text-xs text-muted-foreground">
                {testSuites.filter(s => s.status === 'active').length} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Test Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((testCases.filter(t => t.status === 'passed').length / testCases.length) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                {testCases.filter(t => t.status === 'passed').length} passed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Bugs</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bugReports.filter(b => b.status === 'open').length}</div>
              <p className="text-xs text-muted-foreground">
                {bugReports.filter(b => b.severity === 'critical').length} critical
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Running Tests</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testRuns.filter(r => r.status === 'running').length}</div>
              <p className="text-xs text-muted-foreground">
                {testCases.filter(t => t.status === 'running').length} test cases
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="suites" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="suites">Test Suites</TabsTrigger>
            <TabsTrigger value="cases">Test Cases</TabsTrigger>
            <TabsTrigger value="runs">Test Runs</TabsTrigger>
            <TabsTrigger value="bugs">Bug Reports</TabsTrigger>
          </TabsList>

          {/* Test Suites Tab */}
          <TabsContent value="suites" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Test Suites</CardTitle>
                    <CardDescription>Manage and monitor test suites</CardDescription>
                  </div>
                  <Dialog open={showAddTestSuiteDialog} onOpenChange={setShowAddTestSuiteDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Test Suite
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Test Suite</DialogTitle>
                        <DialogDescription>
                          Create a new test suite with specifications.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Suite Name</Label>
                          <Input
                            id="name"
                            value={newTestSuite.name}
                            onChange={(e) => setNewTestSuite(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter test suite name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="type">Test Type</Label>
                          <Select value={newTestSuite.type} onValueChange={(value: 'unit' | 'integration' | 'e2e' | 'performance' | 'security') => setNewTestSuite(prev => ({ ...prev, type: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="unit">Unit Tests</SelectItem>
                              <SelectItem value="integration">Integration Tests</SelectItem>
                              <SelectItem value="e2e">End-to-End Tests</SelectItem>
                              <SelectItem value="performance">Performance Tests</SelectItem>
                              <SelectItem value="security">Security Tests</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="priority">Priority</Label>
                          <Select value={newTestSuite.priority} onValueChange={(value: 'low' | 'medium' | 'high' | 'critical') => setNewTestSuite(prev => ({ ...prev, priority: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newTestSuite.description}
                            onChange={(e) => setNewTestSuite(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter test suite description"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddTestSuiteDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddTestSuite} disabled={!newTestSuite.name}>
                          Add Test Suite
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Test Suite</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Test Results</TableHead>
                      <TableHead>Coverage</TableHead>
                      <TableHead>Last Run</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testSuites.map((suite) => (
                      <TableRow key={suite.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{suite.name}</div>
                            <div className="text-sm text-muted-foreground">{suite.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(suite.type)}>
                            {suite.type.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={suite.status === 'active' ? 'default' : 'secondary'}>
                            {suite.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-green-600">{suite.passedTests} passed</span>
                              <span className="text-red-600">{suite.failedTests} failed</span>
                              <span className="text-yellow-600">{suite.skippedTests} skipped</span>
                            </div>
                            <Progress value={(suite.passedTests / suite.totalTests) * 100} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{suite.coverage}%</div>
                        </TableCell>
                        <TableCell>{suite.lastRun}</TableCell>
                        <TableCell>{suite.duration}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRunTestSuite(suite.id)}
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Test Cases Tab */}
          <TabsContent value="cases" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Test Cases</CardTitle>
                <CardDescription>Individual test case management and results</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Test Case</TableHead>
                      <TableHead>Suite</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Automated</TableHead>
                      <TableHead>Last Run</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testCases.map((testCase) => (
                      <TableRow key={testCase.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{testCase.name}</div>
                            <div className="text-sm text-muted-foreground">{testCase.description}</div>
                            {testCase.errorMessage && (
                              <div className="text-sm text-red-600 mt-1">{testCase.errorMessage}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {testSuites.find(s => s.id === testCase.suiteId)?.name || 'Unknown'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(testCase.status)}`} />
                            <span className="capitalize">{testCase.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(testCase.priority)}>
                            {testCase.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{testCase.duration}s</TableCell>
                        <TableCell>
                          <Badge variant={testCase.automated ? 'default' : 'secondary'}>
                            {testCase.automated ? 'Yes' : 'No'}
                          </Badge>
                        </TableCell>
                        <TableCell>{testCase.lastRun}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Test Runs Tab */}
          <TabsContent value="runs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Test Runs</CardTitle>
                <CardDescription>Monitor test execution and results</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Test Suite</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Environment</TableHead>
                      <TableHead>Results</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Triggered By</TableHead>
                      <TableHead>Start Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testRuns.map((run) => (
                      <TableRow key={run.id}>
                        <TableCell className="font-medium">
                          {testSuites.find(s => s.id === run.suiteId)?.name || 'Unknown'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            run.status === 'completed' ? 'default' :
                            run.status === 'running' ? 'secondary' :
                            run.status === 'failed' ? 'destructive' : 'outline'
                          }>
                            {run.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{run.environment}</div>
                            {run.browser && <div className="text-muted-foreground">{run.browser}</div>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-green-600">{run.passedTests} passed</span>
                              <span className="text-red-600">{run.failedTests} failed</span>
                              <span className="text-yellow-600">{run.skippedTests} skipped</span>
                            </div>
                            <Progress value={(run.passedTests / run.totalTests) * 100} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>{run.duration || 'Running...'}</TableCell>
                        <TableCell>{run.triggeredBy}</TableCell>
                        <TableCell>{run.startTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bug Reports Tab */}
          <TabsContent value="bugs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bug Reports</CardTitle>
                <CardDescription>Track and manage bug reports</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bug Title</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Reported By</TableHead>
                      <TableHead>Reported At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bugReports.map((bug) => (
                      <TableRow key={bug.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{bug.title}</div>
                            <div className="text-sm text-muted-foreground">{bug.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(bug.severity)}>
                            {bug.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(bug.priority)}>
                            {bug.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            bug.status === 'open' ? 'destructive' :
                            bug.status === 'in-progress' ? 'secondary' :
                            bug.status === 'resolved' ? 'default' : 'outline'
                          }>
                            {bug.status.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>{bug.assignedTo}</TableCell>
                        <TableCell>{bug.reportedBy}</TableCell>
                        <TableCell>{bug.reportedAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Select value={bug.status} onValueChange={(value: BugReport['status']) => handleUpdateBugStatus(bug.id, value)}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
};

export default QATestingPage;

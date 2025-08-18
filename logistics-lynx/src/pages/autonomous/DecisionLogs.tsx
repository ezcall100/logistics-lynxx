/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  RefreshCw, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap, 
  Target, 
  BarChart3, 
  FileText, 
  Calendar,
  ArrowUpDown,
  FilterX,
  MoreHorizontal,
  Home
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DecisionLog {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  decisionType: 'route_optimization' | 'load_assignment' | 'pricing' | 'risk_assessment' | 'capacity_planning' | 'maintenance_scheduling';
  decision: string;
  confidence: number;
  status: 'approved' | 'rejected' | 'pending' | 'reviewed' | 'escalated';
  priority: 'critical' | 'high' | 'medium' | 'low';
  impact: 'positive' | 'negative' | 'neutral';
  reasoning: string;
  dataSources: string[];
  executionTime: number;
  outcome: string;
  feedback?: {
    rating: number;
    comment: string;
    reviewer: string;
    reviewedAt: string;
  };
  metadata: {
    inputData: Record<string, any>;
    modelVersion: string;
    algorithm: string;
    processingTime: number;
  };
}

interface DecisionAnalytics {
  totalDecisions: number;
  approvedDecisions: number;
  rejectedDecisions: number;
  averageConfidence: number;
  averageExecutionTime: number;
  successRate: number;
  decisionsByType: Record<string, number>;
  decisionsByStatus: Record<string, number>;
  confidenceDistribution: Array<{ range: string; count: number }>;
}

const DecisionLogs: React.FC = () => {
  const [decisionLogs, setDecisionLogs] = useState<DecisionLog[]>([]);
  const [analytics, setAnalytics] = useState<DecisionAnalytics | null>(null);
  const [selectedDecision, setSelectedDecision] = useState<DecisionLog | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState('24h');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Initialize with realistic data
  useEffect(() => {
    const initialDecisionLogs: DecisionLog[] = [
      {
        id: 'decision-001',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        agentId: 'route-optimizer-001',
        agentName: 'Route Optimization Agent',
        decisionType: 'route_optimization',
        decision: 'Optimized delivery route for shipment #12345 to reduce travel time by 23%',
        confidence: 94.2,
        status: 'approved',
        priority: 'high',
        impact: 'positive',
        reasoning: 'Based on real-time traffic data, weather conditions, and historical delivery patterns, the optimized route reduces travel time while maintaining delivery reliability.',
        dataSources: ['traffic_api', 'weather_service', 'historical_data', 'gps_tracking'],
        executionTime: 245,
        outcome: 'Route optimization successful - 23% time reduction achieved',
        feedback: {
          rating: 5,
          comment: 'Excellent optimization, significant time savings achieved',
          reviewer: 'System Admin',
          reviewedAt: new Date(Date.now() - 180000).toISOString()
        },
        metadata: {
          inputData: {
            origin: 'Warehouse A',
            destination: 'Customer B',
            trafficConditions: 'moderate',
            weatherConditions: 'clear',
            vehicleType: 'truck',
            cargoWeight: '2.5 tons'
          },
          modelVersion: '2.1.4',
          algorithm: 'genetic_algorithm',
          processingTime: 245
        }
      },
      {
        id: 'decision-002',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        agentId: 'load-matcher-001',
        agentName: 'Load Matching Agent',
        decisionType: 'load_assignment',
        decision: 'Assigned load #67890 to carrier ABC Trucking based on capacity and performance metrics',
        confidence: 87.5,
        status: 'approved',
        priority: 'medium',
        impact: 'positive',
        reasoning: 'Carrier ABC Trucking has the required capacity, good performance history, and competitive pricing for this route.',
        dataSources: ['carrier_database', 'performance_metrics', 'pricing_data', 'capacity_analysis'],
        executionTime: 156,
        outcome: 'Load assignment successful - carrier confirmed acceptance',
        metadata: {
          inputData: {
            loadId: '67890',
            origin: 'Factory X',
            destination: 'Distribution Center Y',
            weight: '5.2 tons',
            dimensions: '12x8x6 feet',
            deliveryDeadline: '2024-01-20T18:00:00Z'
          },
          modelVersion: '1.9.2',
          algorithm: 'matching_algorithm',
          processingTime: 156
        }
      },
      {
        id: 'decision-003',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        agentId: 'pricing-engine-001',
        agentName: 'Pricing Engine',
        decisionType: 'pricing',
        decision: 'Set dynamic pricing for route NYC-LA at $2,450 based on demand and fuel costs',
        confidence: 91.8,
        status: 'approved',
        priority: 'high',
        impact: 'positive',
        reasoning: 'Current market demand is high, fuel costs have increased by 8%, and competitor pricing supports this rate.',
        dataSources: ['market_data', 'fuel_prices', 'competitor_analysis', 'demand_forecast'],
        executionTime: 89,
        outcome: 'Pricing decision implemented - 12% margin achieved',
        metadata: {
          inputData: {
            route: 'NYC-LA',
            distance: '2789 miles',
            fuelCost: '$1.85/gallon',
            marketDemand: 'high',
            competitorPrice: '$2,600'
          },
          modelVersion: '3.0.1',
          algorithm: 'dynamic_pricing',
          processingTime: 89
        }
      },
      {
        id: 'decision-004',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        agentId: 'risk-assessor-001',
        agentName: 'Risk Assessment Agent',
        decisionType: 'risk_assessment',
        decision: 'Flagged shipment #11111 for manual review due to unusual routing pattern',
        confidence: 78.3,
        status: 'escalated',
        priority: 'critical',
        impact: 'neutral',
        reasoning: 'Shipment shows unusual routing pattern that deviates significantly from normal delivery routes for this customer.',
        dataSources: ['routing_history', 'customer_profiles', 'anomaly_detection', 'fraud_patterns'],
        executionTime: 312,
        outcome: 'Shipment escalated for manual review - security team notified',
        metadata: {
          inputData: {
            shipmentId: '11111',
            customerId: 'CUST-456',
            routingPattern: 'unusual',
            riskScore: 0.78,
            deviationFromNormal: 'high'
          },
          modelVersion: '2.5.3',
          algorithm: 'anomaly_detection',
          processingTime: 312
        }
      },
      {
        id: 'decision-005',
        timestamp: new Date(Date.now() - 5400000).toISOString(),
        agentId: 'capacity-planner-001',
        agentName: 'Capacity Planning Agent',
        decisionType: 'capacity_planning',
        decision: 'Recommended fleet expansion by 3 vehicles based on projected demand increase',
        confidence: 82.7,
        status: 'pending',
        priority: 'high',
        impact: 'positive',
        reasoning: 'Demand forecasting models predict 25% increase in shipments over next quarter, requiring additional fleet capacity.',
        dataSources: ['demand_forecast', 'capacity_analysis', 'financial_models', 'market_trends'],
        executionTime: 445,
        outcome: 'Recommendation submitted for management review',
        metadata: {
          inputData: {
            projectedDemand: '+25%',
            currentCapacity: '85%',
            financialImpact: '$150,000',
            paybackPeriod: '8 months'
          },
          modelVersion: '1.7.8',
          algorithm: 'capacity_optimization',
          processingTime: 445
        }
      },
      {
        id: 'decision-006',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        agentId: 'maintenance-scheduler-001',
        agentName: 'Maintenance Scheduler',
        decisionType: 'maintenance_scheduling',
        decision: 'Scheduled preventive maintenance for vehicle #V789 on 2024-01-25',
        confidence: 95.1,
        status: 'approved',
        priority: 'medium',
        impact: 'positive',
        reasoning: 'Vehicle has reached 85% of recommended maintenance interval and shows no critical issues requiring immediate attention.',
        dataSources: ['vehicle_telemetry', 'maintenance_history', 'sensor_data', 'manufacturer_guidelines'],
        executionTime: 67,
        outcome: 'Maintenance scheduled - parts ordered and technician assigned',
        feedback: {
          rating: 4,
          comment: 'Good proactive maintenance scheduling',
          reviewer: 'Fleet Manager',
          reviewedAt: new Date(Date.now() - 3600000).toISOString()
        },
        metadata: {
          inputData: {
            vehicleId: 'V789',
            mileage: '45,200',
            lastMaintenance: '2023-10-15',
            maintenanceInterval: '50,000 miles',
            sensorReadings: 'normal'
          },
          modelVersion: '2.3.5',
          algorithm: 'predictive_maintenance',
          processingTime: 67
        }
      }
    ];

    const initialAnalytics: DecisionAnalytics = {
      totalDecisions: initialDecisionLogs.length,
      approvedDecisions: initialDecisionLogs.filter(d => d.status === 'approved').length,
      rejectedDecisions: initialDecisionLogs.filter(d => d.status === 'rejected').length,
      averageConfidence: Math.round(initialDecisionLogs.reduce((sum, d) => sum + d.confidence, 0) / initialDecisionLogs.length),
      averageExecutionTime: Math.round(initialDecisionLogs.reduce((sum, d) => sum + d.executionTime, 0) / initialDecisionLogs.length),
      successRate: Math.round((initialDecisionLogs.filter(d => d.status === 'approved').length / initialDecisionLogs.length) * 100),
      decisionsByType: {
        route_optimization: 1,
        load_assignment: 1,
        pricing: 1,
        risk_assessment: 1,
        capacity_planning: 1,
        maintenance_scheduling: 1
      },
      decisionsByStatus: {
        approved: 4,
        pending: 1,
        escalated: 1
      },
      confidenceDistribution: [
        { range: '90-100%', count: 2 },
        { range: '80-89%', count: 2 },
        { range: '70-79%', count: 1 },
        { range: '60-69%', count: 0 },
        { range: '0-59%', count: 0 }
      ]
    };

    setDecisionLogs(initialDecisionLogs);
    setAnalytics(initialAnalytics);
  }, []);

  const filteredDecisions = decisionLogs.filter(decision => {
    const matchesSearch = decision.decision.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         decision.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         decision.reasoning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || decision.status === statusFilter;
    const matchesType = typeFilter === 'all' || decision.decisionType === typeFilter;
    const matchesPriority = priorityFilter === 'all' || decision.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const getStatusColor = (status: DecisionLog['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'escalated': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: DecisionLog['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: DecisionLog['impact']) => {
    switch (impact) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      case 'neutral': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: DecisionLog['decisionType']) => {
    switch (type) {
      case 'route_optimization': return <TrendingUp className="w-4 h-4" />;
      case 'load_assignment': return <Target className="w-4 h-4" />;
      case 'pricing': return <Zap className="w-4 h-4" />;
      case 'risk_assessment': return <AlertTriangle className="w-4 h-4" />;
      case 'capacity_planning': return <Activity className="w-4 h-4" />;
      case 'maintenance_scheduling': return <Clock className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const handleExportLogs = async () => {
    setLoading(true);
    try {
      // Simulate export
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Export Successful",
        description: "Decision logs have been exported to CSV",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export decision logs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshLogs = async () => {
    setLoading(true);
    try {
      // Simulate refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Logs Refreshed",
        description: "Decision logs have been updated",
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh decision logs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const openDetailDialog = (decision: DecisionLog) => {
    setSelectedDecision(decision);
    setIsDetailDialogOpen(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTypeFilter('all');
    setPriorityFilter('all');
  };

  const performanceData = [
    { name: 'Approved', value: analytics?.approvedDecisions || 0, color: '#10b981' },
    { name: 'Pending', value: analytics?.decisionsByStatus.pending || 0, color: '#f59e0b' },
    { name: 'Escalated', value: analytics?.decisionsByStatus.escalated || 0, color: '#f97316' },
    { name: 'Rejected', value: analytics?.rejectedDecisions || 0, color: '#ef4444' }
  ];

  const confidenceData = analytics?.confidenceDistribution.map(item => ({
    range: item.range,
    count: item.count
  })) || [];

  return (
    <div className="space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link to="/autonomous" className="flex items-center space-x-1 hover:text-foreground transition-colors">
          <Home className="h-4 w-4" />
          <span>Autonomous System</span>
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">Decision Logs</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Decision Logs</h1>
          <p className="text-muted-foreground">
            Track and analyze autonomous AI decision making across the TMS system
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 Hour</SelectItem>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExportLogs} disabled={loading} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleRefreshLogs} disabled={loading} variant="outline">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Analytics Overview */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Decisions</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalDecisions}</div>
              <p className="text-xs text-muted-foreground">
                In selected time range
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.successRate}%</div>
              <p className="text-xs text-muted-foreground">
                Approved decisions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.averageConfidence}%</div>
              <p className="text-xs text-muted-foreground">
                Decision confidence
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Execution</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.averageExecutionTime}ms</div>
              <p className="text-xs text-muted-foreground">
                Processing time
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="logs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="logs">Decision Logs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Decision Logs</CardTitle>
              <CardDescription>
                Comprehensive audit trail of all autonomous decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search decisions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="route_optimization">Route Optimization</SelectItem>
                    <SelectItem value="load_assignment">Load Assignment</SelectItem>
                    <SelectItem value="pricing">Pricing</SelectItem>
                    <SelectItem value="risk_assessment">Risk Assessment</SelectItem>
                    <SelectItem value="capacity_planning">Capacity Planning</SelectItem>
                    <SelectItem value="maintenance_scheduling">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={clearFilters}>
                  <FilterX className="w-4 h-4" />
                </Button>
              </div>

              {/* Decision Logs Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Agent</TableHead>
                      <TableHead>Decision</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDecisions.map((decision) => (
                      <TableRow key={decision.id}>
                        <TableCell>
                          <div className="text-sm">
                            <div>{new Date(decision.timestamp).toLocaleDateString()}</div>
                            <div className="text-muted-foreground">
                              {new Date(decision.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                              {getTypeIcon(decision.decisionType)}
                            </div>
                            <span className="text-sm font-medium">{decision.agentName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <div className="text-sm font-medium truncate">{decision.decision}</div>
                            <div className="text-xs text-muted-foreground truncate">{decision.outcome}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {decision.decisionType.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(decision.status)}>
                            {decision.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={decision.confidence} className="w-16" />
                            <span className="text-sm font-medium">{decision.confidence}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(decision.priority)}>
                            {decision.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDetailDialog(decision)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Decision Status Distribution</CardTitle>
                <CardDescription>
                  Breakdown of decisions by status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={performanceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Confidence Distribution</CardTitle>
                <CardDescription>
                  Distribution of decision confidence levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={confidenceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, 'Count']} />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Decision Types</CardTitle>
                <CardDescription>
                  Number of decisions by type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={Object.entries(analytics?.decisionsByType || {}).map(([type, count]) => ({
                    type: type.replace('_', ' '),
                    count
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, 'Count']} />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Execution Time Trends</CardTitle>
                <CardDescription>
                  Average execution time by decision type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={decisionLogs.map(log => ({
                    type: log.decisionType.replace('_', ' '),
                    time: log.executionTime
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}ms`, 'Execution Time']} />
                    <Line type="monotone" dataKey="time" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Decision Insights</CardTitle>
              <CardDescription>
                Automated analysis and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">High Confidence Decisions</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Decisions with confidence above 90% are performing well and can be trusted for autonomous execution.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">3 decisions</Badge>
                    <span className="text-xs text-muted-foreground">Route optimization, pricing, maintenance scheduling</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Escalated Decisions</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Risk assessment decisions are being escalated for manual review due to unusual patterns.
                  </p>
                  <div className="flex items-center space-x-2">
                                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">1 decision</Badge>
                    <span className="text-xs text-muted-foreground">Requires human oversight</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Performance Optimization</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Average execution time is within acceptable limits. Consider optimizing complex algorithms for faster processing.
                  </p>
                  <div className="flex items-center space-x-2">
                                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Optimization</Badge>
                    <span className="text-xs text-muted-foreground">Algorithm tuning recommended</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Decision Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Decision Details</DialogTitle>
            <DialogDescription>
              Comprehensive view of the autonomous decision
            </DialogDescription>
          </DialogHeader>
          {selectedDecision && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Decision</h3>
                <p className="text-sm text-muted-foreground">{selectedDecision.decision}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Reasoning</h3>
                <p className="text-sm text-muted-foreground">{selectedDecision.reasoning}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Outcome</h3>
                <p className="text-sm text-muted-foreground">{selectedDecision.outcome}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Confidence</h3>
                  <div className="flex items-center space-x-2">
                    <Progress value={selectedDecision.confidence} className="w-20" />
                    <span className="text-sm font-medium">{selectedDecision.confidence}%</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Execution Time</h3>
                  <span className="text-sm font-medium">{selectedDecision.executionTime}ms</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Data Sources</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDecision.dataSources.map((source, index) => (
                    <Badge key={index} variant="outline">{source}</Badge>
                  ))}
                </div>
              </div>
              {selectedDecision.feedback && (
                <div>
                  <h3 className="font-medium mb-2">Feedback</h3>
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{selectedDecision.feedback.reviewer}</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < selectedDecision.feedback!.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedDecision.feedback.comment}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Reviewed: {new Date(selectedDecision.feedback.reviewedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
              <div>
                <h3 className="font-medium mb-2">Metadata</h3>
                <div className="bg-gray-50 rounded-lg p-3 text-xs font-mono">
                  <pre>{JSON.stringify(selectedDecision.metadata, null, 2)}</pre>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DecisionLogs;

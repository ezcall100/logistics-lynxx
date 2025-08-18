import React, { useState, useEffect } from 'react';
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
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Play, 
  Pause, 
  RefreshCw, 
  Settings, 
  TrendingUp, 
  TrendingDown,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Zap,
  Target,
  Activity
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface MLModel {
  id: string;
  name: string;
  type: 'classification' | 'regression' | 'clustering' | 'nlp' | 'computer-vision' | 'reinforcement-learning';
  status: 'training' | 'active' | 'inactive' | 'failed' | 'deployed';
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  version: string;
  lastTrained: string;
  trainingProgress: number;
  datasetSize: number;
  features: number;
  hyperparameters: Record<string, any>;
  performance: {
    trainingLoss: number;
    validationLoss: number;
    testAccuracy: number;
  };
  description: string;
  tags: string[];
}

interface TrainingJob {
  id: string;
  modelId: string;
  modelName: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  startTime: string;
  endTime?: string;
  duration?: number;
  metrics: {
    accuracy: number;
    loss: number;
    epoch: number;
  };
  logs: string[];
}

const LearningModels: React.FC = () => {
  const [models, setModels] = useState<MLModel[]>([]);
  const [trainingJobs, setTrainingJobs] = useState<TrainingJob[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isTrainingDialogOpen, setIsTrainingDialogOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<MLModel | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Form states
  const [newModel, setNewModel] = useState({
    name: '',
    type: 'classification' as MLModel['type'],
    description: '',
    datasetSize: 10000,
    features: 50
  });

  const [trainingConfig, setTrainingConfig] = useState({
    epochs: 100,
    batchSize: 32,
    learningRate: 0.001,
    validationSplit: 0.2
  });

  // Initialize with realistic data
  useEffect(() => {
    const initialModels: MLModel[] = [
      {
        id: 'route-optimization-001',
        name: 'Route Optimization Model',
        type: 'regression',
        status: 'active',
        accuracy: 94.2,
        precision: 92.8,
        recall: 95.1,
        f1Score: 93.9,
        version: '2.1.4',
        lastTrained: new Date(Date.now() - 86400000).toISOString(),
        trainingProgress: 100,
        datasetSize: 50000,
        features: 25,
        hyperparameters: {
          learningRate: 0.001,
          batchSize: 64,
          epochs: 200,
          optimizer: 'adam'
        },
        performance: {
          trainingLoss: 0.12,
          validationLoss: 0.15,
          testAccuracy: 94.2
        },
        description: 'Machine learning model for optimizing delivery routes based on traffic, weather, and historical data',
        tags: ['route-optimization', 'regression', 'production']
      },
      {
        id: 'demand-forecasting-001',
        name: 'Demand Forecasting Model',
        type: 'regression',
        status: 'active',
        accuracy: 89.7,
        precision: 87.3,
        recall: 91.2,
        f1Score: 89.2,
        version: '1.8.2',
        lastTrained: new Date(Date.now() - 172800000).toISOString(),
        trainingProgress: 100,
        datasetSize: 75000,
        features: 40,
        hyperparameters: {
          learningRate: 0.0005,
          batchSize: 128,
          epochs: 150,
          optimizer: 'adam'
        },
        performance: {
          trainingLoss: 0.18,
          validationLoss: 0.22,
          testAccuracy: 89.7
        },
        description: 'Time series forecasting model for predicting shipment demand and capacity planning',
        tags: ['demand-forecasting', 'time-series', 'production']
      },
      {
        id: 'fraud-detection-001',
        name: 'Fraud Detection Model',
        type: 'classification',
        status: 'training',
        accuracy: 96.8,
        precision: 95.2,
        recall: 97.1,
        f1Score: 96.1,
        version: '3.0.1',
        lastTrained: new Date().toISOString(),
        trainingProgress: 75,
        datasetSize: 100000,
        features: 60,
        hyperparameters: {
          learningRate: 0.002,
          batchSize: 32,
          epochs: 300,
          optimizer: 'adam'
        },
        performance: {
          trainingLoss: 0.08,
          validationLoss: 0.11,
          testAccuracy: 96.8
        },
        description: 'Binary classification model for detecting fraudulent transactions and suspicious activities',
        tags: ['fraud-detection', 'classification', 'training']
      },
      {
        id: 'sentiment-analysis-001',
        name: 'Customer Sentiment Analysis',
        type: 'nlp',
        status: 'active',
        accuracy: 91.5,
        precision: 90.8,
        recall: 92.1,
        f1Score: 91.4,
        version: '2.3.5',
        lastTrained: new Date(Date.now() - 259200000).toISOString(),
        trainingProgress: 100,
        datasetSize: 25000,
        features: 768,
        hyperparameters: {
          learningRate: 0.0001,
          batchSize: 16,
          epochs: 50,
          optimizer: 'adamw'
        },
        performance: {
          trainingLoss: 0.15,
          validationLoss: 0.18,
          testAccuracy: 91.5
        },
        description: 'Natural language processing model for analyzing customer feedback and support tickets',
        tags: ['sentiment-analysis', 'nlp', 'production']
      },
      {
        id: 'image-recognition-001',
        name: 'Package Damage Detection',
        type: 'computer-vision',
        status: 'inactive',
        accuracy: 88.9,
        precision: 87.1,
        recall: 89.8,
        f1Score: 88.4,
        version: '1.5.2',
        lastTrained: new Date(Date.now() - 604800000).toISOString(),
        trainingProgress: 100,
        datasetSize: 15000,
        features: 2048,
        hyperparameters: {
          learningRate: 0.0003,
          batchSize: 8,
          epochs: 100,
          optimizer: 'adam'
        },
        performance: {
          trainingLoss: 0.22,
          validationLoss: 0.25,
          testAccuracy: 88.9
        },
        description: 'Computer vision model for detecting package damage from images',
        tags: ['damage-detection', 'computer-vision', 'inactive']
      }
    ];

    const initialTrainingJobs: TrainingJob[] = [
      {
        id: 'job-001',
        modelId: 'fraud-detection-001',
        modelName: 'Fraud Detection Model',
        status: 'running',
        progress: 75,
        startTime: new Date(Date.now() - 3600000).toISOString(),
        metrics: {
          accuracy: 96.8,
          loss: 0.08,
          epoch: 225
        },
        logs: [
          'Epoch 1/300 - Loss: 0.45 - Accuracy: 0.72',
          'Epoch 50/300 - Loss: 0.25 - Accuracy: 0.85',
          'Epoch 100/300 - Loss: 0.18 - Accuracy: 0.91',
          'Epoch 150/300 - Loss: 0.12 - Accuracy: 0.94',
          'Epoch 200/300 - Loss: 0.09 - Accuracy: 0.96'
        ]
      },
      {
        id: 'job-002',
        modelId: 'route-optimization-001',
        modelName: 'Route Optimization Model',
        status: 'completed',
        progress: 100,
        startTime: new Date(Date.now() - 86400000).toISOString(),
        endTime: new Date(Date.now() - 82800000).toISOString(),
        duration: 3600,
        metrics: {
          accuracy: 94.2,
          loss: 0.12,
          epoch: 200
        },
        logs: [
          'Training completed successfully',
          'Model deployed to production',
          'Performance validation passed'
        ]
      }
    ];

    setModels(initialModels);
    setTrainingJobs(initialTrainingJobs);
  }, []);

  const getStatusColor = (status: MLModel['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'deployed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: MLModel['type']) => {
    switch (type) {
      case 'classification': return <Target className="w-4 h-4" />;
      case 'regression': return <TrendingUp className="w-4 h-4" />;
      case 'clustering': return <Activity className="w-4 h-4" />;
      case 'nlp': return <Brain className="w-4 h-4" />;
      case 'computer-vision': return <Eye className="w-4 h-4" />;
      case 'reinforcement-learning': return <Zap className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const handleCreateModel = async () => {
    setLoading(true);
    try {
      const newModelData: MLModel = {
        id: `model-${Date.now()}`,
        name: newModel.name,
        type: newModel.type,
        status: 'inactive',
        accuracy: 0,
        precision: 0,
        recall: 0,
        f1Score: 0,
        version: '1.0.0',
        lastTrained: new Date().toISOString(),
        trainingProgress: 0,
        datasetSize: newModel.datasetSize,
        features: newModel.features,
        hyperparameters: {
          learningRate: 0.001,
          batchSize: 32,
          epochs: 100,
          optimizer: 'adam'
        },
        performance: {
          trainingLoss: 0,
          validationLoss: 0,
          testAccuracy: 0
        },
        description: newModel.description,
        tags: [newModel.type, 'new']
      };

      setModels(prev => [...prev, newModelData]);
      setIsCreateDialogOpen(false);
      setNewModel({ name: '', type: 'classification', description: '', datasetSize: 10000, features: 50 });
      
      toast({
        title: "Model Created",
        description: `Successfully created model: ${newModel.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create model",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartTraining = async (modelId: string) => {
    setLoading(true);
    try {
      const model = models.find(m => m.id === modelId);
      if (!model) return;

      const trainingJob: TrainingJob = {
        id: `job-${Date.now()}`,
        modelId,
        modelName: model.name,
        status: 'running',
        progress: 0,
        startTime: new Date().toISOString(),
        metrics: {
          accuracy: 0,
          loss: 1.0,
          epoch: 0
        },
        logs: ['Training started...']
      };

      setTrainingJobs(prev => [...prev, trainingJob]);
      setModels(prev => prev.map(m => 
        m.id === modelId ? { ...m, status: 'training', trainingProgress: 0 } : m
      ));
      
      toast({
        title: "Training Started",
        description: `Training started for model: ${model.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start training",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeployModel = async (modelId: string) => {
    setLoading(true);
    try {
      setModels(prev => prev.map(m => 
        m.id === modelId ? { ...m, status: 'deployed' } : m
      ));
      
      toast({
        title: "Model Deployed",
        description: "Model has been deployed to production",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to deploy model",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteModel = async (modelId: string) => {
    setLoading(true);
    try {
      setModels(prev => prev.filter(m => m.id !== modelId));
      
      toast({
        title: "Model Deleted",
        description: "Model has been successfully deleted",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete model",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const systemMetrics = {
    totalModels: models.length,
    activeModels: models.filter(m => m.status === 'active' || m.status === 'deployed').length,
    averageAccuracy: Math.round(models.reduce((sum, model) => sum + model.accuracy, 0) / models.length),
    trainingJobs: trainingJobs.filter(job => job.status === 'running').length
  };

  const performanceData = models.map(model => ({
    name: model.name,
    accuracy: model.accuracy,
    precision: model.precision,
    recall: model.recall,
    f1Score: model.f1Score
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Learning Models</h1>
          <p className="text-muted-foreground">
            Manage and monitor machine learning models for autonomous decision making
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Model
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Model</DialogTitle>
              <DialogDescription>
                Configure a new machine learning model for the autonomous system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Model Name</Label>
                <Input
                  id="name"
                  value={newModel.name}
                  onChange={(e) => setNewModel(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter model name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Model Type</Label>
                <Select value={newModel.type} onValueChange={(value: MLModel['type']) => setNewModel(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classification">Classification</SelectItem>
                    <SelectItem value="regression">Regression</SelectItem>
                    <SelectItem value="clustering">Clustering</SelectItem>
                    <SelectItem value="nlp">Natural Language Processing</SelectItem>
                    <SelectItem value="computer-vision">Computer Vision</SelectItem>
                    <SelectItem value="reinforcement-learning">Reinforcement Learning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newModel.description}
                  onChange={(e) => setNewModel(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter model description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="datasetSize">Dataset Size</Label>
                <Input
                  id="datasetSize"
                  type="number"
                  value={newModel.datasetSize}
                  onChange={(e) => setNewModel(prev => ({ ...prev, datasetSize: parseInt(e.target.value) }))}
                  placeholder="Enter dataset size"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="features">Number of Features</Label>
                <Input
                  id="features"
                  type="number"
                  value={newModel.features}
                  onChange={(e) => setNewModel(prev => ({ ...prev, features: parseInt(e.target.value) }))}
                  placeholder="Enter number of features"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateModel} disabled={loading || !newModel.name || !newModel.description}>
                {loading ? 'Creating...' : 'Create Model'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Models</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.totalModels}</div>
            <p className="text-xs text-muted-foreground">
              Across all types
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Models</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.activeModels}</div>
            <p className="text-xs text-muted-foreground">
              In production
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.averageAccuracy}%</div>
            <p className="text-xs text-muted-foreground">
              System-wide average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Jobs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.trainingJobs}</div>
            <p className="text-xs text-muted-foreground">
              Currently running
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="models" className="space-y-4">
        <TabsList>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="training">Training Jobs</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Machine Learning Models</CardTitle>
              <CardDescription>
                Manage and monitor all ML models in the autonomous system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Model</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Accuracy</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Last Trained</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {models.map((model) => (
                      <TableRow key={model.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              {getTypeIcon(model.type)}
                            </div>
                            <div>
                              <div className="font-medium">{model.name}</div>
                              <div className="text-sm text-muted-foreground">{model.description}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {model.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(model.status)}>
                            {model.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{model.accuracy}%</span>
                            {model.accuracy >= 95 && <CheckCircle className="w-4 h-4 text-green-500" />}
                            {model.accuracy < 85 && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Precision: {model.precision}%</div>
                            <div className="text-muted-foreground">Recall: {model.recall}%</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {new Date(model.lastTrained).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {model.status === 'inactive' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStartTraining(model.id)}
                                disabled={loading}
                              >
                                <Play className="w-4 h-4" />
                              </Button>
                            )}
                            {model.status === 'active' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeployModel(model.id)}
                                disabled={loading}
                              >
                                Deploy
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedModel(model)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteModel(model.id)}
                              disabled={loading}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training Jobs</CardTitle>
              <CardDescription>
                Monitor active and completed training jobs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{job.modelName}</span>
                        <Badge variant={job.status === 'completed' ? 'default' : job.status === 'failed' ? 'destructive' : 'secondary'}>
                          {job.status}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(job.startTime).toLocaleString()}
                      </span>
                    </div>
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{job.progress}%</span>
                      </div>
                      <Progress value={job.progress} className="h-2" />
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Accuracy:</span>
                        <span className="ml-1 font-medium">{job.metrics.accuracy}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Loss:</span>
                        <span className="ml-1 font-medium">{job.metrics.loss.toFixed(3)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Epoch:</span>
                        <span className="ml-1 font-medium">{job.metrics.epoch}</span>
                      </div>
                    </div>
                    {job.logs.length > 0 && (
                      <div className="mt-3 p-2 bg-gray-50 rounded text-xs font-mono max-h-20 overflow-y-auto">
                        {job.logs.slice(-3).map((log, index) => (
                          <div key={index} className="text-gray-600">• {log}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Model Performance Comparison</CardTitle>
                <CardDescription>
                  Accuracy comparison across all models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Accuracy']} />
                    <Bar dataKey="accuracy" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Precision, Recall, and F1 Score comparison
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                    <Line type="monotone" dataKey="precision" stroke="#8884d8" />
                    <Line type="monotone" dataKey="recall" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="f1Score" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Analytics</CardTitle>
              <CardDescription>
                Insights and recommendations for model optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">High Performance Models</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Models with accuracy above 95% are performing exceptionally well.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">2 models</Badge>
                    <span className="text-xs text-muted-foreground">Route Optimization, Fraud Detection</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Models Needing Retraining</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Models with accuracy below 90% may benefit from retraining with updated data.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="warning">1 model</Badge>
                    <span className="text-xs text-muted-foreground">Package Damage Detection</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Training Recommendations</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Consider increasing dataset size for NLP models to improve accuracy.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="info">Optimization</Badge>
                    <span className="text-xs text-muted-foreground">Data augmentation suggested</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningModels;

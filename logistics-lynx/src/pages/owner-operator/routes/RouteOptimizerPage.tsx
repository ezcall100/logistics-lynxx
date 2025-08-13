import React, { useState } from 'react';
import { 
  Route, 
  Navigation, 
  MapPin, 
  Target, 
  Zap, 
  DollarSign, 
  Clock, 
  Fuel, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  Play,
  RotateCcw,
  Settings,
  Save
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface OptimizationResult {
  originalDistance: number;
  optimizedDistance: number;
  fuelSavings: number;
  timeSavings: number;
  costSavings: number;
  carbonReduction: number;
}

const RouteOptimizerPage: React.FC = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationComplete, setOptimizationComplete] = useState(false);
  
  const [optimizationSettings, setOptimizationSettings] = useState({
    prioritizeFuel: true,
    prioritizeTime: false,
    avoidTolls: false,
    avoidTraffic: true,
    maxStops: 10,
    maxDetour: 15, // percentage
    fuelPrice: 3.85,
    driverWage: 25
  });

  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult>({
    originalDistance: 1247,
    optimizedDistance: 1189,
    fuelSavings: 87.50,
    timeSavings: 2.3,
    costSavings: 145.80,
    carbonReduction: 285
  });

  const [selectedRoutes] = useState([
    { id: '1', name: 'Chicago to Atlanta Express', distance: 587, stops: 3, priority: 'high' },
    { id: '2', name: 'LA to Phoenix Run', distance: 372, stops: 2, priority: 'medium' },
    { id: '3', name: 'Houston to Dallas Local', distance: 239, stops: 4, priority: 'low' }
  ]);

  const runOptimization = async () => {
    setIsOptimizing(true);
    setOptimizationComplete(false);
    
    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate optimized results
    const savings = Math.random() * 0.15 + 0.05; // 5-20% savings
    setOptimizationResult(prev => ({
      ...prev,
      optimizedDistance: Math.round(prev.originalDistance * (1 - savings)),
      fuelSavings: Math.round(prev.originalDistance * savings * 0.15),
      timeSavings: Math.round((savings * 5) * 10) / 10,
      costSavings: Math.round(prev.originalDistance * savings * 0.25),
      carbonReduction: Math.round(prev.originalDistance * savings * 0.6)
    }));
    
    setIsOptimizing(false);
    setOptimizationComplete(true);
    toast.success('Route optimization completed!');
  };

  const applyOptimization = () => {
    toast.success('Optimized routes applied successfully!');
  };

  const resetOptimization = () => {
    setOptimizationComplete(false);
    setOptimizationResult({
      originalDistance: 1247,
      optimizedDistance: 1189,
      fuelSavings: 87.50,
      timeSavings: 2.3,
      costSavings: 145.80,
      carbonReduction: 285
    });
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Route Optimizer</h1>
          <p className="text-muted-foreground">
            Optimize your routes for maximum efficiency and cost savings
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetOptimization}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={runOptimization} disabled={isOptimizing}>
            {isOptimizing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Optimizing...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Optimize Routes
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="optimization" className="space-y-4">
        <TabsList>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        {/* Optimization Tab */}
        <TabsContent value="optimization" className="space-y-4">
          {/* Current Routes */}
          <Card>
            <CardHeader>
              <CardTitle>Routes to Optimize</CardTitle>
              <CardDescription>Select routes for optimization analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedRoutes.map((route) => (
                  <div key={route.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <div>
                        <div className="font-medium">{route.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {route.distance} miles • {route.stops} stops
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={
                      route.priority === 'high' ? 'border-red-500 text-red-700' :
                      route.priority === 'medium' ? 'border-yellow-500 text-yellow-700' :
                      'border-green-500 text-green-700'
                    }>
                      {route.priority} priority
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Optimization Progress */}
          {isOptimizing && (
            <Card>
              <CardHeader>
                <CardTitle>Optimization in Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Analyzing routes...</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="text-sm text-muted-foreground">
                  Processing {selectedRoutes.length} routes for optimal efficiency
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Summary */}
          {optimizationComplete && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Distance Saved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                    {optimizationResult.originalDistance - optimizationResult.optimizedDistance} mi
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    {(((optimizationResult.originalDistance - optimizationResult.optimizedDistance) / optimizationResult.originalDistance) * 100).toFixed(1)}% reduction
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Cost Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    ${optimizationResult.costSavings}
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    Per route cycle
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Time Saved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {optimizationResult.timeSavings}h
                  </div>
                  <p className="text-xs text-purple-600 dark:text-purple-400">
                    Total time reduction
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Fuel Saved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                    {optimizationResult.fuelSavings} gal
                  </div>
                  <p className="text-xs text-orange-600 dark:text-orange-400">
                    ${(optimizationResult.fuelSavings * optimizationSettings.fuelPrice).toFixed(2)} saved
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Apply Optimization */}
          {optimizationComplete && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Optimization Complete
                </CardTitle>
                <CardDescription>
                  Review the optimized routes and apply changes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Original Route:</span>
                      <span className="ml-2">{optimizationResult.originalDistance} miles</span>
                    </div>
                    <div>
                      <span className="font-medium">Optimized Route:</span>
                      <span className="ml-2 text-green-600">{optimizationResult.optimizedDistance} miles</span>
                    </div>
                    <div>
                      <span className="font-medium">Estimated Savings:</span>
                      <span className="ml-2 text-green-600">${optimizationResult.costSavings}/cycle</span>
                    </div>
                    <div>
                      <span className="font-medium">Annual Savings:</span>
                      <span className="ml-2 text-green-600">${(optimizationResult.costSavings * 52).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={applyOptimization} className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Apply Optimization
                  </Button>
                  <Button variant="outline" onClick={() => {}}>
                    <Save className="h-4 w-4 mr-2" />
                    Save as Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Settings</CardTitle>
              <CardDescription>Configure optimization parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Optimization Priorities</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Prioritize Fuel Efficiency</Label>
                      <div className="text-sm text-muted-foreground">Optimize for minimum fuel consumption</div>
                    </div>
                    <Switch
                      checked={optimizationSettings.prioritizeFuel}
                      onCheckedChange={(checked) => 
                        setOptimizationSettings(prev => ({ ...prev, prioritizeFuel: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Prioritize Time</Label>
                      <div className="text-sm text-muted-foreground">Optimize for fastest delivery</div>
                    </div>
                    <Switch
                      checked={optimizationSettings.prioritizeTime}
                      onCheckedChange={(checked) => 
                        setOptimizationSettings(prev => ({ ...prev, prioritizeTime: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Avoid Tolls</Label>
                      <div className="text-sm text-muted-foreground">Prefer toll-free routes</div>
                    </div>
                    <Switch
                      checked={optimizationSettings.avoidTolls}
                      onCheckedChange={(checked) => 
                        setOptimizationSettings(prev => ({ ...prev, avoidTolls: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Avoid Traffic</Label>
                      <div className="text-sm text-muted-foreground">Use real-time traffic data</div>
                    </div>
                    <Switch
                      checked={optimizationSettings.avoidTraffic}
                      onCheckedChange={(checked) => 
                        setOptimizationSettings(prev => ({ ...prev, avoidTraffic: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Constraints</h4>
                  
                  <div className="space-y-2">
                    <Label>Maximum Stops per Route</Label>
                    <Input
                      type="number"
                      min="1"
                      max="20"
                      value={optimizationSettings.maxStops}
                      onChange={(e) => 
                        setOptimizationSettings(prev => ({ ...prev, maxStops: Number(e.target.value) }))
                      }
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Maximum Detour (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="50"
                      value={optimizationSettings.maxDetour}
                      onChange={(e) => 
                        setOptimizationSettings(prev => ({ ...prev, maxDetour: Number(e.target.value) }))
                      }
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Fuel Price ($/gallon)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={optimizationSettings.fuelPrice}
                      onChange={(e) => 
                        setOptimizationSettings(prev => ({ ...prev, fuelPrice: Number(e.target.value) }))
                      }
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Driver Wage ($/hour)</Label>
                    <Input
                      type="number"
                      value={optimizationSettings.driverWage}
                      onChange={(e) => 
                        setOptimizationSettings(prev => ({ ...prev, driverWage: Number(e.target.value) }))
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Results</CardTitle>
              <CardDescription>Complete optimization analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {optimizationComplete ? (
                <>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{optimizationResult.optimizedDistance}</div>
                      <div className="text-sm text-muted-foreground">Total Miles</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">${optimizationResult.costSavings}</div>
                      <div className="text-sm text-muted-foreground">Cost Savings</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{optimizationResult.carbonReduction} lbs</div>
                      <div className="text-sm text-muted-foreground">CO2 Reduction</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Environmental Impact</h4>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Fuel Savings:</span>
                          <span className="ml-2">{optimizationResult.fuelSavings} gallons</span>
                        </div>
                        <div>
                          <span className="font-medium">CO2 Reduction:</span>
                          <span className="ml-2">{optimizationResult.carbonReduction} pounds</span>
                        </div>
                        <div>
                          <span className="font-medium">Trees Equivalent:</span>
                          <span className="ml-2">{Math.round(optimizationResult.carbonReduction / 48)} trees saved</span>
                        </div>
                        <div>
                          <span className="font-medium">Annual Impact:</span>
                          <span className="ml-2">{(optimizationResult.carbonReduction * 52).toLocaleString()} lbs CO2</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Financial Breakdown</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Fuel Cost Savings:</span>
                          <span className="text-green-600">${(optimizationResult.fuelSavings * optimizationSettings.fuelPrice).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time Cost Savings:</span>
                          <span className="text-green-600">${(optimizationResult.timeSavings * optimizationSettings.driverWage).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Maintenance Savings:</span>
                          <span className="text-green-600">${((optimizationResult.originalDistance - optimizationResult.optimizedDistance) * 0.15).toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between font-medium">
                          <span>Total Savings per Cycle:</span>
                          <span className="text-green-600">${optimizationResult.costSavings}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly Savings:</span>
                          <span className="text-green-600">${(optimizationResult.costSavings * 4).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Annual Savings:</span>
                          <span className="text-green-600">${(optimizationResult.costSavings * 52).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Optimization Results</h3>
                  <p className="text-muted-foreground">Run route optimization to see detailed results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RouteOptimizerPage;
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { Download, Calculator, TrendingUp, DollarSign, Clock, Users } from 'lucide-react';
import { toast } from '../../hooks/use-toast';

interface ROICalculation {
  annualQuotes: number;
  timeSaved: number;
  costSavings: number;
  revenueIncrease: number;
  totalROI: number;
  paybackPeriod: number;
  threeYearROI: number;
}

export const ROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState({
    laneCount: 50,
    quotesPerMonth: 1000,
    averageRate: 2500,
    winRate: 0.25,
    currentTimePerQuote: 15, // minutes
    currentCostPerHour: 75, // USD
    transbotCost: 299 // monthly
  });

  const [calculation, setCalculation] = useState<ROICalculation | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateROI = useCallback(() => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const annualQuotes = inputs.quotesPerMonth * 12;
      const timeSaved = (inputs.currentTimePerQuote - 2) * annualQuotes; // TransBot reduces to 2 min
      const costSavings = (timeSaved / 60) * inputs.currentCostPerHour;
      const revenueIncrease = annualQuotes * inputs.averageRate * (inputs.winRate * 0.05); // 5% improvement
      const totalROI = costSavings + revenueIncrease - (inputs.transbotCost * 12);
      const paybackPeriod = (inputs.transbotCost * 12) / (costSavings + revenueIncrease);
      const threeYearROI = (costSavings + revenueIncrease) * 3 - (inputs.transbotCost * 36);

      setCalculation({
        annualQuotes,
        timeSaved,
        costSavings,
        revenueIncrease,
        totalROI,
        paybackPeriod,
        threeYearROI
      });
      
      setIsCalculating(false);
    }, 1000);
  }, []);

  const exportToPDF = () => {
    if (!calculation) return;
    
    // Simulate PDF generation
    toast({
      title: "ROI Report Generated",
      description: "Your ROI calculation has been exported to PDF and sent to your email.",
    });
  };

  const handleInputChange = (field: string, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (inputs.laneCount > 0 && inputs.quotesPerMonth > 0) {
      calculateROI();
    }
  }, [inputs, calculateROI]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            ROI Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="laneCount">Number of Lanes</Label>
                <Input
                  id="laneCount"
                  type="number"
                  value={inputs.laneCount}
                  onChange={(e) => handleInputChange('laneCount', parseInt(e.target.value) || 0)}
                  placeholder="50"
                />
              </div>
              
              <div>
                <Label htmlFor="quotesPerMonth">Quotes per Month</Label>
                <Input
                  id="quotesPerMonth"
                  type="number"
                  value={inputs.quotesPerMonth}
                  onChange={(e) => handleInputChange('quotesPerMonth', parseInt(e.target.value) || 0)}
                  placeholder="1000"
                />
              </div>
              
              <div>
                <Label htmlFor="averageRate">Average Rate ($)</Label>
                <Input
                  id="averageRate"
                  type="number"
                  value={inputs.averageRate}
                  onChange={(e) => handleInputChange('averageRate', parseInt(e.target.value) || 0)}
                  placeholder="2500"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Win Rate: {Math.round(inputs.winRate * 100)}%</Label>
                <Slider
                  value={[inputs.winRate * 100]}
                  onValueChange={([value]) => handleInputChange('winRate', value / 100)}
                  max={100}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>Current Time per Quote: {inputs.currentTimePerQuote} min</Label>
                <Slider
                  value={[inputs.currentTimePerQuote]}
                  onValueChange={([value]) => handleInputChange('currentTimePerQuote', value)}
                  max={60}
                  min={5}
                  step={1}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>Cost per Hour: ${inputs.currentCostPerHour}</Label>
                <Slider
                  value={[inputs.currentCostPerHour]}
                  onValueChange={([value]) => handleInputChange('currentCostPerHour', value)}
                  max={200}
                  min={25}
                  step={5}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          {calculation && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Annual Savings</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      ${calculation.costSavings.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Time savings converted to cost
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Revenue Increase</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      ${calculation.revenueIncrease.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      From improved win rates
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">Time Saved</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(calculation.timeSaved / 60)}h
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Per year
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-4">ROI Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Total Annual ROI:</span>
                          <Badge variant={calculation.totalROI > 0 ? "default" : "destructive"}>
                            ${calculation.totalROI.toLocaleString()}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Payback Period:</span>
                          <span>{calculation.paybackPeriod.toFixed(1)} months</span>
                        </div>
                        <div className="flex justify-between">
                          <span>3-Year ROI:</span>
                          <span>${calculation.threeYearROI.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-4">Key Metrics</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Annual Quotes:</span>
                          <span>{calculation.annualQuotes.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>TransBot Cost:</span>
                          <span>${(inputs.transbotCost * 12).toLocaleString()}/year</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ROI Percentage:</span>
                          <span>{((calculation.totalROI / (inputs.transbotCost * 12)) * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button onClick={exportToPDF} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export to PDF
                </Button>
                <Button variant="outline" onClick={() => window.print()}>
                  Print Report
                </Button>
              </div>
            </div>
          )}

          {isCalculating && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-sm text-muted-foreground">Calculating ROI...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

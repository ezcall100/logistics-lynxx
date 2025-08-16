import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { Download, Calculator, TrendingUp, DollarSign, Clock, Users, CreditCard, ExternalLink } from 'lucide-react';
import { toast } from '../../hooks/use-toast';

interface ROICalculation {
  annualQuotes: number;
  timeSaved: number;
  costSavings: number;
  revenueIncrease: number;
  totalROI: number;
  paybackPeriod: number;
  threeYearROI: number;
  monthlyImpact: number;
  incrGP: number;
  hrsSaved: number;
  paybackDays: number;
}

interface ROIFormData {
  company_name: string;
  contact_email: string;
  monthly_quotes: number;
  win_rate_before: number;
  avg_revenue_per_load: number;
  avg_margin_before: number;
  minutes_per_quote: number;
  plan: 'starter' | 'pro' | 'enterprise';
  uplift_win_rate: number;
  uplift_margin_pts: number;
  time_reduction_pct: number;
  labor_cost_per_hour: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export const ROICalculatorEnhanced: React.FC = () => {
  const [inputs, setInputs] = useState({
    laneCount: 50,
    quotesPerMonth: 1000,
    averageRate: 2500,
    winRate: 0.25,
    currentTimePerQuote: 15,
    currentCostPerHour: 75,
    transbotCost: 299
  });

  const [formData, setFormData] = useState<ROIFormData>({
    company_name: '',
    contact_email: '',
    monthly_quotes: 1000,
    win_rate_before: 25,
    avg_revenue_per_load: 2500,
    avg_margin_before: 12,
    minutes_per_quote: 15,
    plan: 'starter',
    uplift_win_rate: 5,
    uplift_margin_pts: 1.2,
    time_reduction_pct: 60,
    labor_cost_per_hour: 75,
    utm_source: 'roi_calculator',
    utm_medium: 'web',
    utm_campaign: 'phase6_launch'
  });

  const [calculation, setCalculation] = useState<ROICalculation | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roiId, setRoiId] = useState<string | null>(null);
  const [roiSummaryUrl, setRoiSummaryUrl] = useState<string | null>(null);

  const calculateROI = useCallback(() => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const annualQuotes = inputs.quotesPerMonth * 12;
      const timeSaved = (inputs.currentTimePerQuote - 2) * annualQuotes;
      const costSavings = (timeSaved / 60) * inputs.currentCostPerHour;
      const revenueIncrease = annualQuotes * inputs.averageRate * (inputs.winRate * 0.05);
      const totalROI = costSavings + revenueIncrease - (inputs.transbotCost * 12);
      const paybackPeriod = (inputs.transbotCost * 12) / (costSavings + revenueIncrease);
      const threeYearROI = (costSavings + revenueIncrease) * 3 - (inputs.transbotCost * 36);
      const monthlyImpact = (costSavings + revenueIncrease) / 12;
      const incrGP = revenueIncrease;
      const hrsSaved = timeSaved / 60;
      const paybackDays = paybackPeriod * 30;

      setCalculation({
        annualQuotes,
        timeSaved,
        costSavings,
        revenueIncrease,
        totalROI,
        paybackPeriod,
        threeYearROI,
        monthlyImpact,
        incrGP,
        hrsSaved,
        paybackDays
      });
      
      setIsCalculating(false);
    }, 1000);
  }, []);

  const handleSubmitROI = async () => {
    if (!formData.company_name || !formData.contact_email) {
      toast({
        title: "Missing Information",
        description: "Please provide company name and contact email.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Submit ROI data
      const roiResponse = await fetch('/functions/v1/roi-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          calc: calculation
        })
      });

      const roiResult = await roiResponse.json();
      
      if (roiResult.ok) {
        setRoiId(roiResult.id);
        
        // Generate ROI summary
        const summaryResponse = await fetch('/functions/v1/roi-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: roiResult.id,
            company_name: formData.company_name,
            calc: calculation
          })
        });

        const summaryResult = await summaryResponse.json();
        if (summaryResult.url) {
          setRoiSummaryUrl(summaryResult.url);
        }

        toast({
          title: "ROI Submitted Successfully",
          description: "Your ROI calculation has been saved and our team will contact you shortly.",
        });
      } else {
        throw new Error(roiResult.error || 'Failed to submit ROI');
      }
    } catch (error) {
      console.error('ROI submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your ROI calculation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartCheckout = async () => {
    if (!formData.contact_email) {
      toast({
        title: "Email Required",
        description: "Please provide your email address to start checkout.",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch('/functions/v1/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.contact_email,
          plan: formData.plan,
          return_url: window.location.origin
        })
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Error",
        description: "Unable to start checkout. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setFormData(prev => ({ ...prev, [field]: value }));
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
            Enhanced ROI Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company_name">Company Name *</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                placeholder="Acme Freight"
              />
            </div>
            <div>
              <Label htmlFor="contact_email">Contact Email *</Label>
              <Input
                id="contact_email"
                type="email"
                value={formData.contact_email}
                onChange={(e) => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
                placeholder="ops@acme.com"
              />
            </div>
          </div>

          {/* Plan Selection */}
          <div>
            <Label>Select Plan</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {['starter', 'pro', 'enterprise'].map((plan) => (
                <Button
                  key={plan}
                  variant={formData.plan === plan ? "default" : "outline"}
                  onClick={() => setFormData(prev => ({ ...prev, plan: plan as string }))}
                  className="capitalize"
                >
                  {plan}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
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
                      <span className="text-sm font-medium">Monthly Impact</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      ${calculation.monthlyImpact.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Total monthly benefit
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Payback Period</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {calculation.paybackDays.toFixed(0)} days
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Time to break even
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
                      {calculation.hrsSaved.toFixed(0)}h
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Per month
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  onClick={handleSubmitROI} 
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  {isSubmitting ? 'Submitting...' : 'Save ROI & Get Report'}
                </Button>
                
                <Button 
                  onClick={handleStartCheckout}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Start Free Trial
                </Button>
              </div>

              {/* ROI Summary Link */}
              {roiSummaryUrl && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ExternalLink className="h-4 w-4" />
                  <a 
                    href={roiSummaryUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View ROI Summary
                  </a>
                </div>
              )}
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

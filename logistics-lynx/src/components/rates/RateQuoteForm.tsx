import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calculator, TrendingUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRatesFeature } from "@/hooks/useEntitlement";

interface QuoteRequest {
  origin: {
    city: string;
    state: string;
    zip: string;
  };
  destination: {
    city: string;
    state: string;
    zip: string;
  };
  equipment: 'dry_van' | 'reefer' | 'flatbed' | 'power_only';
  weight: number;
  class: number;
  hazmat: boolean;
  expedited: boolean;
  company_id: string;
}

interface QuoteResponse {
  ok: boolean;
  rate?: number;
  confidence?: number;
  breakdown?: {
    base_rate: number;
    fuel_surcharge: number;
    accessorials: number;
    hazmat_fee?: number;
    expedited_fee?: number;
  };
  error?: string;
  message?: string;
}

const EQUIPMENT_TYPES = [
  { value: 'dry_van', label: 'Dry Van' },
  { value: 'reefer', label: 'Reefer' },
  { value: 'flatbed', label: 'Flatbed' },
  { value: 'power_only', label: 'Power Only' },
];

const FREIGHT_CLASSES = [
  { value: 50, label: '50 - Light' },
  { value: 55, label: '55' },
  { value: 60, label: '60' },
  { value: 65, label: '65' },
  { value: 70, label: '70' },
  { value: 77.5, label: '77.5' },
  { value: 85, label: '85' },
  { value: 92.5, label: '92.5' },
  { value: 100, label: '100' },
  { value: 110, label: '110' },
  { value: 125, label: '125' },
  { value: 150, label: '150' },
  { value: 175, label: '175' },
  { value: 200, label: '200' },
  { value: 250, label: '250' },
  { value: 300, label: '300' },
  { value: 400, label: '400' },
  { value: 500, label: '500 - Heavy' },
];

export function RateQuoteForm() {
  const { toast } = useToast();
  const hasRatesFeature = useRatesFeature();
  
  const [formData, setFormData] = useState<QuoteRequest>({
    origin: { city: '', state: '', zip: '' },
    destination: { city: '', state: '', zip: '' },
    equipment: 'dry_van',
    weight: 0,
    class: 70,
    hazmat: false,
    expedited: false,
    company_id: '00000000-0000-0000-0000-000000000001', // Default company ID
  });

  const quoteMutation = useMutation({
    mutationFn: async (data: QuoteRequest): Promise<QuoteResponse> => {
      const response = await fetch('/api/v1/rate/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get quote');
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Quote Generated",
        description: `Rate: $${data.rate?.toFixed(2)} (${(data.confidence! * 100).toFixed(0)}% confidence)`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Quote Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasRatesFeature) {
      toast({
        title: "Feature Not Available",
        description: "Rate quotes are not available in your current plan.",
        variant: "destructive",
      });
      return;
    }

    quoteMutation.mutate(formData);
  };

  const updateField = (field: string, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateLocation = (type: 'origin' | 'destination', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  if (!hasRatesFeature) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Rate Quote
          </CardTitle>
          <CardDescription>
            Get instant freight rates for your shipments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-800">Feature Not Available</p>
              <p className="text-sm text-yellow-700">
                Rate quotes are not available in your current plan. Upgrade to access this feature.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Rate Quote
        </CardTitle>
        <CardDescription>
          Get instant freight rates for your shipments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Origin */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Origin</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="origin-city">City</Label>
                <Input
                  id="origin-city"
                  value={formData.origin.city}
                  onChange={(e) => updateLocation('origin', 'city', e.target.value)}
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <Label htmlFor="origin-state">State</Label>
                <Input
                  id="origin-state"
                  value={formData.origin.state}
                  onChange={(e) => updateLocation('origin', 'state', e.target.value.toUpperCase())}
                  placeholder="CA"
                  maxLength={2}
                  required
                />
              </div>
              <div>
                <Label htmlFor="origin-zip">ZIP Code</Label>
                <Input
                  id="origin-zip"
                  value={formData.origin.zip}
                  onChange={(e) => updateLocation('origin', 'zip', e.target.value)}
                  placeholder="90210"
                  required
                />
              </div>
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Destination</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="dest-city">City</Label>
                <Input
                  id="dest-city"
                  value={formData.destination.city}
                  onChange={(e) => updateLocation('destination', 'city', e.target.value)}
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <Label htmlFor="dest-state">State</Label>
                <Input
                  id="dest-state"
                  value={formData.destination.state}
                  onChange={(e) => updateLocation('destination', 'state', e.target.value.toUpperCase())}
                  placeholder="NY"
                  maxLength={2}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dest-zip">ZIP Code</Label>
                <Input
                  id="dest-zip"
                  value={formData.destination.zip}
                  onChange={(e) => updateLocation('destination', 'zip', e.target.value)}
                  placeholder="10001"
                  required
                />
              </div>
            </div>
          </div>

          {/* Equipment and Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="equipment">Equipment Type</Label>
              <Select
                value={formData.equipment}
                onValueChange={(value: string) => updateField('equipment', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EQUIPMENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => updateField('weight', parseInt(e.target.value) || 0)}
                placeholder="5000"
                min="1"
                max="80000"
                required
              />
            </div>
          </div>

          {/* Freight Class */}
          <div>
            <Label htmlFor="freight-class">Freight Class</Label>
            <Select
              value={formData.class.toString()}
              onValueChange={(value) => updateField('class', parseFloat(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FREIGHT_CLASSES.map((fc) => (
                  <SelectItem key={fc.value} value={fc.value.toString()}>
                    {fc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional Options */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hazmat"
                checked={formData.hazmat}
                onCheckedChange={(checked) => updateField('hazmat', checked)}
              />
              <Label htmlFor="hazmat">Hazmat</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="expedited"
                checked={formData.expedited}
                onCheckedChange={(checked) => updateField('expedited', checked)}
              />
              <Label htmlFor="expedited">Expedited</Label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={quoteMutation.isPending}
          >
            {quoteMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting Quote...
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-4 w-4" />
                Get Quote
              </>
            )}
          </Button>
        </form>

        {/* Quote Result */}
        {quoteMutation.data && quoteMutation.data.ok && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-green-800">Quote Result</h3>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {(quoteMutation.data.confidence! * 100).toFixed(0)}% Confidence
              </Badge>
            </div>
            
            <div className="text-3xl font-bold text-green-900 mb-3">
              ${quoteMutation.data.rate?.toFixed(2)}
            </div>

            {quoteMutation.data.breakdown && (
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Base Rate:</span>
                  <span>${quoteMutation.data.breakdown.base_rate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fuel Surcharge:</span>
                  <span>${quoteMutation.data.breakdown.fuel_surcharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Accessorials:</span>
                  <span>${quoteMutation.data.breakdown.accessorials.toFixed(2)}</span>
                </div>
                {quoteMutation.data.breakdown.hazmat_fee && (
                  <div className="flex justify-between">
                    <span>Hazmat Fee:</span>
                    <span>${quoteMutation.data.breakdown.hazmat_fee.toFixed(2)}</span>
                  </div>
                )}
                {quoteMutation.data.breakdown.expedited_fee && (
                  <div className="flex justify-between">
                    <span>Expedited Fee:</span>
                    <span>${quoteMutation.data.breakdown.expedited_fee.toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

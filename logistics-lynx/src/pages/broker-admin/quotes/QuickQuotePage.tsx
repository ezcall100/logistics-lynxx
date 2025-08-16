/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Zap, 
  Plus, 
  Brain,
  MapPin,
  Truck,
  DollarSign,
  Calculator,
  Send
} from 'lucide-react';
import { toast } from 'sonner';

const QuickQuotePage = () => {
  const [formData, setFormData] = useState({
    customer: '',
    pickup: '',
    delivery: '',
    equipment: 'Dry Van',
    weight: '',
    commodities: '',
    pickupDate: '',
    deliveryDate: ''
  });

  const generateQuickQuote = () => {
    if (!formData.customer || !formData.pickup || !formData.delivery) {
      toast.error('Please fill in required fields');
      return;
    }

    // Simulate AI quote generation
    const baseRate = 2.50;
    const distance = Math.floor(Math.random() * 1000) + 200;
    const quote = Math.round(distance * baseRate);

    toast.success(`Quick quote generated: $${quote.toLocaleString()} for ${distance} miles`);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quick Quote</h1>
          <p className="text-muted-foreground">
            Generate instant freight quotes in 30 seconds
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-700">AI Powered</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Quote Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Lightning Fast Quote
            </CardTitle>
            <CardDescription>
              Enter basic shipment details for instant pricing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="customer">Customer Name *</Label>
                <Input
                  id="customer"
                  value={formData.customer}
                  onChange={(e) => setFormData(prev => ({ ...prev, customer: e.target.value }))}
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <Label htmlFor="equipment">Equipment Type</Label>
                <Select value={formData.equipment} onValueChange={(value) => setFormData(prev => ({ ...prev, equipment: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dry Van">Dry Van</SelectItem>
                    <SelectItem value="Refrigerated">Refrigerated</SelectItem>
                    <SelectItem value="Flatbed">Flatbed</SelectItem>
                    <SelectItem value="Step Deck">Step Deck</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="pickup">Pickup Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="pickup"
                    value={formData.pickup}
                    onChange={(e) => setFormData(prev => ({ ...prev, pickup: e.target.value }))}
                    placeholder="City, State or ZIP"
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="delivery">Delivery Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="delivery"
                    value={formData.delivery}
                    onChange={(e) => setFormData(prev => ({ ...prev, delivery: e.target.value }))}
                    placeholder="City, State or ZIP"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                  placeholder="e.g., 35,000 lbs"
                />
              </div>
              <div>
                <Label htmlFor="commodities">Commodities</Label>
                <Input
                  id="commodities"
                  value={formData.commodities}
                  onChange={(e) => setFormData(prev => ({ ...prev, commodities: e.target.value }))}
                  placeholder="General freight, food, etc."
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="pickupDate">Pickup Date</Label>
                <Input
                  id="pickupDate"
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, pickupDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="deliveryDate">Delivery Date</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, deliveryDate: e.target.value }))}
                />
              </div>
            </div>

            <Button onClick={generateQuickQuote} className="w-full bg-blue-600 text-white">
              <Brain className="h-4 w-4 mr-2" />
              Generate Quick Quote
            </Button>
          </CardContent>
        </Card>

        {/* AI Insights Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-800">Market Analysis</div>
              <div className="text-xs text-blue-600 mt-1">
                Current market rates for this lane are trending up 8% this week
              </div>
            </div>

            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm font-medium text-green-800">Carrier Availability</div>
              <div className="text-xs text-green-600 mt-1">
                High carrier availability - competitive pricing expected
              </div>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-sm font-medium text-yellow-800">Seasonal Factor</div>
              <div className="text-xs text-yellow-600 mt-1">
                Peak season adjustment: +15% recommended
              </div>
            </div>

            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-sm font-medium text-purple-800">Win Probability</div>
              <div className="text-xs text-purple-600 mt-1">
                73% win rate for similar quotes with this customer
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Quick Quotes */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Quick Quotes</CardTitle>
          <CardDescription>
            Your last 5 quick quotes for reference
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { customer: 'ABC Manufacturing', route: 'Chicago → Detroit', amount: '$1,850', status: 'sent' },
              { customer: 'XYZ Logistics', route: 'LA → Phoenix', amount: '$2,650', status: 'won' },
              { customer: 'Global Freight Co', route: 'Miami → Orlando', amount: '$950', status: 'pending' },
              { customer: 'Metro Distribution', route: 'Dallas → Houston', amount: '$1,250', status: 'declined' },
              { customer: 'Prime Shipping', route: 'Atlanta → Nashville', amount: '$1,450', status: 'sent' }
            ].map((quote, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{quote.customer}</div>
                  <div className="text-sm text-muted-foreground">{quote.route}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{quote.amount}</div>
                  <div className={`text-xs ${
                    quote.status === 'won' ? 'text-green-600' :
                    quote.status === 'declined' ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {quote.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickQuotePage;
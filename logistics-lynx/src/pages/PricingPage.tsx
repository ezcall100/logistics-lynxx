import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Check, Star, Zap, Crown, Users, Truck, Globe } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            Pricing Plans
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Flexible pricing options designed to scale with your business needs
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-blue-600 mr-2" />
                  <CardTitle className="text-2xl">Starter</CardTitle>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  $99
                  <span className="text-lg font-normal text-gray-600">/month</span>
                </div>
                <CardDescription>
                  Perfect for small fleets getting started with AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Up to 10 vehicles</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Basic route optimization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Real-time tracking</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Email support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Mobile app access</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="border-2 border-blue-500 shadow-xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-1">
                  <Star className="h-4 w-4 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Crown className="h-8 w-8 text-blue-600 mr-2" />
                  <CardTitle className="text-2xl">Professional</CardTitle>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  $299
                  <span className="text-lg font-normal text-gray-600">/month</span>
                </div>
                <CardDescription>
                  Advanced features for growing transportation companies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Up to 50 vehicles</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Advanced AI optimization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Predictive analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Smart load matching</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Safety management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-blue-600 mr-2" />
                  <CardTitle className="text-2xl">Enterprise</CardTitle>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  Custom
                  <span className="text-lg font-normal text-gray-600">/month</span>
                </div>
                <CardDescription>
                  Tailored solutions for large-scale operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Unlimited vehicles</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Custom AI models</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Multi-region support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Custom development</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>SLA guarantees</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>On-premise options</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Feature Comparison
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare what's included in each plan
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Starter</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Professional</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">Vehicles</td>
                  <td className="text-center py-4 px-6">Up to 10</td>
                  <td className="text-center py-4 px-6">Up to 50</td>
                  <td className="text-center py-4 px-6">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">Route Optimization</td>
                  <td className="text-center py-4 px-6">Basic</td>
                  <td className="text-center py-4 px-6">Advanced AI</td>
                  <td className="text-center py-4 px-6">Custom Models</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">Real-time Tracking</td>
                  <td className="text-center py-4 px-6">✓</td>
                  <td className="text-center py-4 px-6">✓</td>
                  <td className="text-center py-4 px-6">✓</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">Predictive Analytics</td>
                  <td className="text-center py-4 px-6">✗</td>
                  <td className="text-center py-4 px-6">✓</td>
                  <td className="text-center py-4 px-6">✓</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">Smart Load Matching</td>
                  <td className="text-center py-4 px-6">✗</td>
                  <td className="text-center py-4 px-6">✓</td>
                  <td className="text-center py-4 px-6">✓</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">Safety Management</td>
                  <td className="text-center py-4 px-6">✗</td>
                  <td className="text-center py-4 px-6">✓</td>
                  <td className="text-center py-4 px-6">✓</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">API Access</td>
                  <td className="text-center py-4 px-6">✗</td>
                  <td className="text-center py-4 px-6">✓</td>
                  <td className="text-center py-4 px-6">✓</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">Support</td>
                  <td className="text-center py-4 px-6">Email</td>
                  <td className="text-center py-4 px-6">Priority</td>
                  <td className="text-center py-4 px-6">Dedicated</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium">SLA</td>
                  <td className="text-center py-4 px-6">✗</td>
                  <td className="text-center py-4 px-6">✗</td>
                  <td className="text-center py-4 px-6">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about our pricing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Can I change plans anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, all plans come with a 14-day free trial. No credit card required to start.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Do you offer volume discounts?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, we offer volume discounts for Professional and Enterprise plans with multiple vehicles.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your free trial today and experience the power of AI-powered transportation management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

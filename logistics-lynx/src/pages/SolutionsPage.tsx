/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  Building, Truck, Package, Factory, ShoppingCart, 
  Heart, Car, Plane, Zap, Users, Globe, Shield 
} from 'lucide-react';

export default function SolutionsPage() {
  const industries = [
    {
      name: 'Logistics & Transportation',
      icon: Truck,
      description: 'Optimize fleet operations and reduce delivery times',
      features: ['Route Optimization', 'Real-time Tracking', 'Load Matching'],
      color: 'text-blue-600'
    },
    {
      name: 'E-commerce & Retail',
      icon: ShoppingCart,
      description: 'Streamline last-mile delivery and improve customer satisfaction',
      features: ['Delivery Optimization', 'Customer Notifications', 'Returns Management'],
      color: 'text-green-600'
    },
    {
      name: 'Manufacturing',
      icon: Factory,
      description: 'Optimize supply chain and reduce production delays',
      features: ['Supply Chain Optimization', 'Inventory Management', 'Production Planning'],
      color: 'text-orange-600'
    },
    {
      name: 'Healthcare',
      icon: Heart,
      description: 'Ensure timely delivery of medical supplies and equipment',
      features: ['Medical Supply Chain', 'Temperature Monitoring', 'Compliance Tracking'],
      color: 'text-red-600'
    },
    {
      name: 'Food & Beverage',
      icon: Package,
      description: 'Maintain freshness and optimize delivery routes',
      features: ['Freshness Monitoring', 'Temperature Control', 'Quick Delivery'],
      color: 'text-yellow-600'
    },
    {
      name: 'Automotive',
      icon: Car,
      description: 'Streamline parts distribution and service operations',
      features: ['Parts Distribution', 'Service Scheduling', 'Warranty Management'],
      color: 'text-purple-600'
    }
  ];

  const useCases = [
    {
      title: 'Fleet Management',
      description: 'Comprehensive fleet management with AI-powered optimization',
      benefits: ['25% reduction in fuel costs', '30% faster delivery times', 'Improved driver safety']
    },
    {
      title: 'Supply Chain Optimization',
      description: 'End-to-end supply chain visibility and optimization',
      benefits: ['Reduced inventory costs', 'Improved supplier relationships', 'Better demand forecasting']
    },
    {
      title: 'Last-Mile Delivery',
      description: 'Optimize the final leg of delivery for maximum efficiency',
      benefits: ['Faster customer delivery', 'Reduced delivery costs', 'Better customer satisfaction']
    },
    {
      title: 'Route Planning',
      description: 'AI-powered route optimization for multiple vehicles',
      benefits: ['Optimal route selection', 'Real-time traffic avoidance', 'Reduced carbon footprint']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            Industry Solutions
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            AI Solutions for Every Industry
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Tailored AI-powered transportation solutions designed for your specific industry needs
          </p>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Industry-Specific Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI platform adapts to your industry's unique challenges and requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <Card key={industry.name} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <industry.icon className={`h-12 w-12 ${industry.color}`} />
                    <div>
                      <CardTitle className="text-xl">{industry.name}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {industry.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {industry.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6" variant="outline">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Common Use Cases
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how companies are using Trans Bot AI to transform their operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase) => (
              <Card key={useCase.title} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">{useCase.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Key Benefits:</h4>
                    {useCase.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-green-500" />
                        <span className="text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="mt-6" variant="outline">
                    View Case Study
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for scale with enterprise security and compliance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  SOC 2 compliant with end-to-end encryption
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Global Scale</CardTitle>
                <CardDescription>
                  Multi-region deployment with 99.9% uptime
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Team Management</CardTitle>
                <CardDescription>
                  Role-based access control and team collaboration
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <Building className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Integration</CardTitle>
                <CardDescription>
                  Seamless integration with existing systems
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how leading companies are achieving results with Trans Bot AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Global Logistics Corp</CardTitle>
                <CardDescription>Logistics & Transportation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  "Trans Bot AI helped us reduce delivery times by 35% and cut fuel costs by 28% across our entire fleet."
                </p>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">25% Cost Reduction</Badge>
                  <Badge variant="secondary">35% Faster Delivery</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Fresh Foods Inc</CardTitle>
                <CardDescription>Food & Beverage</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  "Our fresh produce delivery is now 40% more efficient, and customer satisfaction has increased significantly."
                </p>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">40% Efficiency Gain</Badge>
                  <Badge variant="secondary">95% Customer Satisfaction</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">MedSupply Solutions</CardTitle>
                <CardDescription>Healthcare</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  "Critical medical supplies now reach hospitals 50% faster, improving patient care outcomes."
                </p>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">50% Faster Delivery</Badge>
                  <Badge variant="secondary">100% Compliance</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how Trans Bot AI can optimize your specific industry needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Schedule Demo
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

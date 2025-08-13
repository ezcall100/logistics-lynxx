import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Truck, 
  Building2, 
  Route, 
  DollarSign, 
  BarChart3, 
  Clock, 
  Shield, 
  Users, 
  Target,
  ArrowRight,
  CheckCircle,
  Zap,
  FileText,
  Activity
} from 'lucide-react';

const CarriersBrokersSection = () => {
  const carrierFeatures = [
    {
      icon: Route,
      title: 'Smart Route Optimization',
      description: 'AI-powered route planning that reduces fuel costs and increases efficiency',
      benefits: ['30% fuel savings', 'Optimized delivery windows', 'Real-time traffic updates'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: DollarSign,
      title: 'Instant Payment Processing',
      description: 'Get paid faster with automated invoicing and quick payment solutions',
      benefits: ['Same-day payments', 'Automated invoicing', 'Transparent pricing'],
      color: 'from-emerald-500 to-green-500'
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Comprehensive insights into fleet performance and driver efficiency',
      benefits: ['Fleet utilization metrics', 'Driver scorecards', 'Profit analysis'],
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Shield,
      title: 'Compliance Management',
      description: 'Automated compliance tracking for HOS, ELD, and safety regulations',
      benefits: ['HOS monitoring', 'ELD integration', 'Safety scoring'],
      color: 'from-orange-500 to-amber-500'
    }
  ];

  const brokerFeatures = [
    {
      icon: Target,
      title: 'Smart Load Matching',
      description: 'AI-driven carrier matching based on capacity, location, and performance',
      benefits: ['Automated matching', 'Carrier scoring', 'Capacity optimization'],
      color: 'from-emerald-500 to-green-500'
    },
    {
      icon: Users,
      title: 'Carrier Network Management',
      description: 'Comprehensive carrier relationship management with performance tracking',
      benefits: ['Carrier onboarding', 'Performance metrics', 'Relationship scoring'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: DollarSign,
      title: 'Dynamic Rate Management',
      description: 'Real-time market intelligence for competitive pricing and margin optimization',
      benefits: ['Market rate analysis', 'Margin optimization', 'Competitive pricing'],
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: FileText,
      title: 'Automated Documentation',
      description: 'Streamlined contract management and automated compliance documentation',
      benefits: ['Digital contracts', 'Compliance tracking', 'Document automation'],
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const carrierStats = [
    { value: '30%', label: 'Cost Reduction', icon: DollarSign },
    { value: '45%', label: 'Faster Payments', icon: Clock },
    { value: '25%', label: 'More Loads', icon: Truck }
  ];

  const brokerStats = [
    { value: '40%', label: 'Margin Increase', icon: BarChart3 },
    { value: '60%', label: 'Faster Matching', icon: Target },
    { value: '50%', label: 'More Carriers', icon: Users }
  ];

  return (
    <section id="carriers" className="py-20 bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <Building2 className="h-4 w-4 mr-2" />
            For Carriers & Brokers
          </Badge>
          
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Tailored Solutions for
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary-deep bg-clip-text text-transparent">
              Every Logistics Role
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Whether you're a carrier looking to optimize operations or a broker managing complex networks, 
            our AI-powered platform delivers role-specific solutions that drive results.
          </p>
        </div>

        {/* Tabs for Carriers vs Brokers */}
        <Tabs defaultValue="carriers" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 glass-subtle p-1 h-12">
            <TabsTrigger value="carriers" className="flex items-center gap-2 data-[state=active]:glass-ultra">
              <Truck className="h-4 w-4" />
              For Carriers
            </TabsTrigger>
            <TabsTrigger value="brokers" className="flex items-center gap-2 data-[state=active]:glass-ultra">
              <Building2 className="h-4 w-4" />
              For Brokers
            </TabsTrigger>
          </TabsList>

          {/* Carriers Content */}
          <TabsContent value="carriers" className="mt-12 space-y-12">
            {/* Carrier Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {carrierFeatures.map((feature, idx) => (
                <Card 
                  key={idx} 
                  className="glass-subtle border-border/30 hover:glass-ultra transition-all duration-300 group overflow-hidden hover:-translate-y-1"
                >
                  <CardHeader className="pb-4">
                    <div className={`h-12 w-12 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, benefitIdx) => (
                        <div key={benefitIdx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          <span className="text-sm text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Carrier Stats */}
            <div className="glass-ultra p-8 lg:p-12 rounded-3xl border border-border/30 shadow-premium">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Carrier Success Metrics</h3>
                <p className="text-muted-foreground">See the impact our platform has on carrier operations</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {carrierStats.map((stat, idx) => (
                  <div key={idx} className="text-center space-y-4">
                    <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mx-auto border border-primary/20">
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Brokers Content */}
          <TabsContent value="brokers" className="mt-12 space-y-12">
            {/* Broker Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {brokerFeatures.map((feature, idx) => (
                <Card 
                  key={idx} 
                  className="glass-subtle border-border/30 hover:glass-ultra transition-all duration-300 group overflow-hidden hover:-translate-y-1"
                >
                  <CardHeader className="pb-4">
                    <div className={`h-12 w-12 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, benefitIdx) => (
                        <div key={benefitIdx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          <span className="text-sm text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Broker Stats */}
            <div className="glass-ultra p-8 lg:p-12 rounded-3xl border border-border/30 shadow-premium">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Broker Success Metrics</h3>
                <p className="text-muted-foreground">Measurable improvements in broker operations and profitability</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {brokerStats.map((stat, idx) => (
                  <div key={idx} className="text-center space-y-4">
                    <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mx-auto border border-primary/20">
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="glass-subtle p-8 lg:p-12 rounded-3xl border border-border/30 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your Operations?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of carriers and brokers who trust our autonomous TMS platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary-deep hover:shadow-premium transition-all duration-300"
              >
                Get Started Today
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="glass-subtle hover:glass-ultra">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarriersBrokersSection;
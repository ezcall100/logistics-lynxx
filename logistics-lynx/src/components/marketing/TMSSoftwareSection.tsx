/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Truck, 
  Route, 
  FileText, 
  BarChart3, 
  Zap,
  ArrowRight,
  CheckCircle,
  Brain,
  Clock,
  Shield,
  Globe
} from 'lucide-react';

const TMSSoftwareSection = () => {
  const features = [
    {
      icon: Package,
      title: 'Load Management',
      description: 'AI-powered load planning and optimization with automated carrier assignment',
      benefits: ['Smart load consolidation', 'Real-time capacity matching', 'Automated dispatch'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Truck,
      title: 'Carrier Dispatch Optimization',
      description: 'Intelligent dispatch system that maximizes efficiency and reduces empty miles',
      benefits: ['Route optimization', 'Driver scheduling', 'Fleet utilization'],
      color: 'from-emerald-500 to-green-500'
    },
    {
      icon: Route,
      title: 'Route Planning & Tracking',
      description: 'Advanced GPS tracking with predictive analytics for optimal route selection',
      benefits: ['Real-time tracking', 'Predictive ETAs', 'Traffic optimization'],
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: FileText,
      title: 'Automated Invoicing',
      description: 'Streamlined billing process with automated invoice generation and processing',
      benefits: ['Instant invoicing', 'Payment tracking', 'Financial reporting'],
      color: 'from-orange-500 to-amber-500'
    },
    {
      icon: BarChart3,
      title: 'Real-time Market Intelligence',
      description: 'Data-driven insights for pricing, capacity, and market trends',
      benefits: ['Dynamic pricing', 'Market analytics', 'Competitive intelligence'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Brain,
      title: 'AI Autonomous Operations',
      description: '250 AI agents working 24/7 to manage operations without human intervention',
      benefits: ['24/7 operations', 'Self-optimizing', 'Predictive maintenance'],
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const capabilities = [
    {
      icon: Clock,
      title: '24/7 Operations',
      description: 'Continuous autonomous management'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance'
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Handle millions of loads efficiently'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Sub-second response times'
    }
  ];

  return (
    <section id="tms-software" className="py-20 bg-gradient-to-br from-background via-background/98 to-primary/10">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <Brain className="h-4 w-4 mr-2" />
            TMS Software Platform
          </Badge>
          
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Autonomous Transportation
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary-deep bg-clip-text text-transparent">
              Management System
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Experience the next generation of logistics management with AI-powered automation, 
            real-time intelligence, and seamless integration across all transportation operations.
          </p>
        </div>

        {/* Core Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, idx) => (
            <Card 
              key={idx} 
              className="glass-subtle border-border/30 hover:glass-ultra transition-all duration-300 group cursor-pointer overflow-hidden hover:-translate-y-1"
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
                
                <Button 
                  variant="ghost" 
                  className="w-full mt-4 group-hover:bg-primary/10 transition-colors"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Platform Capabilities */}
        <div className="glass-ultra p-8 lg:p-12 rounded-3xl border border-border/30 shadow-premium">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Platform Capabilities
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for enterprise scale with cutting-edge technology and autonomous intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, idx) => (
              <div key={idx} className="text-center space-y-4">
                <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mx-auto border border-primary/20">
                  <capability.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{capability.title}</h4>
                  <p className="text-sm text-muted-foreground">{capability.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary-deep hover:shadow-premium transition-all duration-300 px-8 py-6"
            >
              Explore Full Platform
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-subtle p-8 rounded-2xl border border-border/20 text-center">
            <div className="text-3xl font-bold text-primary mb-2">250</div>
            <div className="text-sm text-muted-foreground">AI Agents Active</div>
          </div>
          <div className="glass-subtle p-8 rounded-2xl border border-border/20 text-center">
            <div className="text-3xl font-bold text-emerald-500 mb-2">99.8%</div>
            <div className="text-sm text-muted-foreground">System Uptime</div>
          </div>
          <div className="glass-subtle p-8 rounded-2xl border border-border/20 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">10M+</div>
            <div className="text-sm text-muted-foreground">Loads Processed</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TMSSoftwareSection;
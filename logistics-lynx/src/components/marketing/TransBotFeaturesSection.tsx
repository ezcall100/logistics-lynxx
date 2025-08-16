/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Truck, 
  BarChart3, 
  Shield, 
  Zap, 
  Clock, 
  Target, 
  Brain,
  Users,
  Building2,
  Route,
  DollarSign
} from 'lucide-react';

const TransBotFeaturesSection = () => {
  const features = [
    {
      category: 'Autonomous Operations',
      icon: Bot,
      gradient: 'from-blue-500 to-cyan-500',
      items: [
        {
          title: '250 AI Agents',
          description: 'Autonomous agents working 24/7 to optimize every aspect of your logistics operations',
          icon: Bot,
          highlight: 'Always Active'
        },
        {
          title: 'Smart Load Matching',
          description: 'AI-powered algorithms instantly match loads with optimal carriers for maximum efficiency',
          icon: Target,
          highlight: '96.7% Match Rate'
        },
        {
          title: 'Predictive Analytics',
          description: 'Advanced machine learning predicts demand patterns and optimizes resource allocation',
          icon: Brain,
          highlight: 'Real-time Insights'
        }
      ]
    },
    {
      category: 'Fleet Management',
      icon: Truck,
      gradient: 'from-emerald-500 to-green-500',
      items: [
        {
          title: 'Real-time Tracking',
          description: 'Live GPS tracking with geofencing and automated status updates for complete visibility',
          icon: Route,
          highlight: 'Sub-second Updates'
        },
        {
          title: 'Driver Management',
          description: 'Comprehensive driver portal with HOS tracking, performance metrics, and communication tools',
          icon: Users,
          highlight: '99.2% Compliance'
        },
        {
          title: 'Maintenance Optimization',
          description: 'Predictive maintenance scheduling reduces downtime and extends vehicle lifespan',
          icon: Shield,
          highlight: '40% Cost Reduction'
        }
      ]
    },
    {
      category: 'Business Intelligence',
      icon: BarChart3,
      gradient: 'from-purple-500 to-violet-500',
      items: [
        {
          title: 'Advanced Analytics',
          description: 'Real-time dashboards with KPI tracking, trend analysis, and performance benchmarking',
          icon: BarChart3,
          highlight: 'Live Dashboards'
        },
        {
          title: 'Financial Management',
          description: 'Automated invoicing, expense tracking, and profit margin analysis with AI insights',
          icon: DollarSign,
          highlight: '35% Profit Increase'
        },
        {
          title: 'Performance Optimization',
          description: 'Continuous optimization algorithms improve efficiency across all operational metrics',
          icon: Zap,
          highlight: 'Auto-Optimization'
        }
      ]
    }
  ];

  return (
    <section id="autonomous-tms" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-primary/20 px-4 py-2 text-sm font-medium mb-6">
            <Bot className="w-4 h-4 mr-2" />
            Autonomous TMS Features
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Revolutionizing Logistics with
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Artificial Intelligence
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Experience the power of 250 autonomous AI agents working around the clock to optimize 
            your transportation management system with unprecedented precision and efficiency.
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-16">
          {features.map((category, categoryIndex) => (
            <div key={categoryIndex} className="relative">
              {/* Category Header */}
              <div className="flex items-center justify-center mb-12">
                <div className="flex items-center gap-4 glass-subtle rounded-2xl px-6 py-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient} bg-opacity-10`}>
                    <category.icon className={`h-6 w-6 bg-gradient-to-br ${category.gradient} bg-clip-text text-transparent`} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{category.category}</h3>
                </div>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {category.items.map((feature, featureIndex) => (
                  <Card 
                    key={featureIndex} 
                    className="glass-subtle hover:glass-ultra transition-all duration-300 border-0 group relative overflow-hidden"
                  >
                    <CardContent className="p-8">
                      {/* Feature Icon */}
                      <div className="relative mb-6">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.gradient} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                          <feature.icon className="h-8 w-8 text-primary" />
                        </div>
                        <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-primary/80 text-white text-xs px-2 py-1">
                          {feature.highlight}
                        </Badge>
                      </div>

                      {/* Feature Content */}
                      <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Hover Effect Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass-subtle rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Experience Autonomous Logistics?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of companies already benefiting from AI-powered transportation management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-primary/20 px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                30-Day Free Trial
              </Badge>
              <Badge className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-primary/20 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                No Setup Fees
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransBotFeaturesSection;
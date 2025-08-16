/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Clock, 
  Shield, 
  Zap, 
  DollarSign, 
  Target,
  Users,
  BarChart3,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const TransBotBenefitsSection = () => {
  const benefits = [
    {
      title: 'Reduce Operating Costs',
      subtitle: 'Up to 35% savings',
      description: 'Our AI agents optimize routes, reduce fuel consumption, and eliminate inefficiencies across your entire operation.',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-500',
      stats: [
        { label: 'Fuel Savings', value: '25%' },
        { label: 'Labor Costs', value: '30%' },
        { label: 'Admin Time', value: '60%' }
      ]
    },
    {
      title: 'Increase Efficiency',
      subtitle: 'Real-time optimization',
      description: 'Autonomous agents work 24/7 to continuously optimize your operations, ensuring peak efficiency at all times.',
      icon: Zap,
      gradient: 'from-blue-500 to-cyan-500',
      stats: [
        { label: 'Route Efficiency', value: '40%' },
        { label: 'Load Utilization', value: '85%' },
        { label: 'Delivery Speed', value: '45%' }
      ]
    },
    {
      title: 'Enhance Safety',
      subtitle: 'AI-powered monitoring',
      description: 'Advanced safety protocols and real-time monitoring ensure compliance and reduce accidents by up to 50%.',
      icon: Shield,
      gradient: 'from-purple-500 to-violet-500',
      stats: [
        { label: 'Accident Reduction', value: '50%' },
        { label: 'Compliance Rate', value: '99.8%' },
        { label: 'Safety Score', value: '98%' }
      ]
    },
    {
      title: 'Scale Operations',
      subtitle: 'Limitless growth',
      description: 'Our autonomous system scales effortlessly with your business, handling increased volume without additional overhead.',
      icon: TrendingUp,
      gradient: 'from-orange-500 to-red-500',
      stats: [
        { label: 'Scalability', value: '1000%' },
        { label: 'Response Time', value: '<1s' },
        { label: 'Uptime', value: '99.9%' }
      ]
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'AI Analysis',
      description: 'Our agents analyze your current operations and identify optimization opportunities',
      icon: BarChart3
    },
    {
      step: '02',
      title: 'Smart Automation',
      description: 'Autonomous systems implement optimizations and manage day-to-day operations',
      icon: Zap
    },
    {
      step: '03',
      title: 'Continuous Learning',
      description: 'AI continuously learns and adapts to improve performance over time',
      icon: Target
    },
    {
      step: '04',
      title: 'Results Delivery',
      description: 'Experience measurable improvements in efficiency, cost savings, and performance',
      icon: CheckCircle
    }
  ];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-primary/20 px-4 py-2 text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            Proven Benefits
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Transforming Logistics
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Performance
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            See how Trans Bot's autonomous AI agents deliver measurable improvements 
            across every aspect of your transportation management system.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="glass-subtle hover:glass-ultra transition-all duration-500 border-0 group relative overflow-hidden"
            >
              <CardContent className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${benefit.gradient} bg-opacity-10 mb-4 group-hover:bg-opacity-20 transition-all duration-300`}>
                      <benefit.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <Badge className={`bg-gradient-to-r ${benefit.gradient} bg-opacity-10 text-primary border-primary/20 mb-4`}>
                      {benefit.subtitle}
                    </Badge>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {benefit.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {benefit.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hover Effect Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Section */}
        <div className="glass-subtle rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              How Trans Bot Transforms Your Operations
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our proven 4-step process ensures seamless integration and immediate results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Card */}
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-bold px-2 py-1">
                      {step.step}
                    </Badge>
                  </div>
                  
                  <h4 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Arrow */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 z-10">
                    <ArrowRight className="h-6 w-6 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ROI Calculator CTA */}
        <div className="text-center mt-16">
          <div className="glass-subtle rounded-3xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Calculate Your Potential Savings
            </h3>
            <p className="text-muted-foreground mb-6">
              See how much Trans Bot can save your operation with our ROI calculator
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 border-green-500/20 px-4 py-2">
                <DollarSign className="w-4 h-4 mr-2" />
                Average ROI: 340%
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 border-blue-500/20 px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                Payback: 3 months
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 text-purple-600 border-purple-500/20 px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                1,200+ Happy Customers
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransBotBenefitsSection;
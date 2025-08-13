import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Sparkles, Activity, Globe, Zap, CheckCircle } from 'lucide-react';

const HeroSection = () => {
  const features = [
    'AI-Powered Automation',
    'Real-Time Tracking', 
    'Smart Route Optimization',
    '24/7 Operations'
  ];

  const stats = [
    { value: '250', label: 'AI Agents Active', icon: Activity },
    { value: '99.8%', label: 'System Uptime', icon: Globe },
    { value: '10M+', label: 'Loads Processed', icon: Zap }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/10">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-primary-glow/20 to-transparent rounded-full blur-3xl animate-pulse-soft" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_0%,transparent_50%)]"></div>

      <div className="container mx-auto px-6 pt-20 pb-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Status Badge */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-4 py-2">
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse mr-2" />
                Live & Autonomous
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered TMS
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                  The Future of
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary via-primary-deep to-purple-600 bg-clip-text text-transparent">
                  Transportation
                </span>
                <br />
                <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                  Management
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Experience fully autonomous logistics management with 250 AI agents working 24/7 to optimize your freight operations, reduce costs, and eliminate manual processes.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 py-4">
              {features.map((feature, idx) => (
                <div key={idx} className="glass-subtle px-4 py-2 rounded-full border border-border/20 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary-deep hover:shadow-premium transition-all duration-300 px-8 py-6 text-lg group"
              >
                Request Live Demo
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="glass-subtle hover:glass-ultra border-border/30 px-8 py-6 text-lg group"
              >
                <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Overview
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-12">
              <p className="text-sm text-muted-foreground mb-6">Trusted by leading logistics companies worldwide</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                {stats.map((stat, idx) => (
                  <div key={idx} className="glass-subtle p-6 rounded-2xl border border-border/20 hover:glass-ultra transition-all duration-300">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <stat.icon className="h-5 w-5 text-primary" />
                      <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Visual/Illustration Placeholder */}
          <div className="mt-16 relative">
            <div className="glass-ultra p-8 rounded-3xl border border-border/30 shadow-premium max-w-4xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="h-16 w-16 bg-gradient-to-br from-primary to-primary-deep rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <Activity className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-lg font-semibold text-foreground">Live TMS Dashboard Preview</p>
                  <p className="text-sm text-muted-foreground">See real-time operations in action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
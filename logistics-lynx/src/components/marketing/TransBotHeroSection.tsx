import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Truck, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  TrendingUp,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react';

const TransBotHeroSection = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'AI Agents', value: '250+', icon: Bot },
    { label: 'Active Fleets', value: '1,200+', icon: Truck },
    { label: 'Cost Savings', value: '35%', icon: TrendingUp },
    { label: 'Uptime', value: '99.9%', icon: Shield }
  ];

  const features = [
    'Autonomous load matching',
    '24/7 AI fleet monitoring',
    'Real-time route optimization',
    'Predictive maintenance alerts'
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      {/* Animated Background Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <Badge className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
              <Bot className="w-4 h-4 mr-2" />
              Powered by 250 Autonomous AI Agents
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
              The Future of
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
              Transportation
            </span>
            <br />
            <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
              Management
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            Trans Bot Inc revolutionizes logistics with{' '}
            <span className="text-primary font-semibold">autonomous AI agents</span>{' '}
            that manage your entire TMS ecosystem 24/7, delivering unprecedented efficiency and cost savings.
          </p>

          {/* Feature List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-left">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground/80 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg"
              onClick={() => navigate('/portal')}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-primary/20 hover:border-primary/40 font-semibold px-8 py-4 text-lg group"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="glass-subtle rounded-2xl p-6 hover:glass-ultra transition-all duration-300 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 mb-3 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-8 hidden lg:block">
        <div className="glass-subtle rounded-2xl p-4 animate-float">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold">Real-time Processing</div>
              <div className="text-xs text-muted-foreground">1.2M events/sec</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/3 right-8 hidden lg:block">
        <div className="glass-subtle rounded-2xl p-4 animate-float" style={{ animationDelay: '1s' }}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold">Global Network</div>
              <div className="text-xs text-muted-foreground">50+ Countries</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1/4 left-12 hidden lg:block">
        <div className="glass-subtle rounded-2xl p-4 animate-float" style={{ animationDelay: '2s' }}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold">Active Users</div>
              <div className="text-xs text-muted-foreground">25,000+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransBotHeroSection;
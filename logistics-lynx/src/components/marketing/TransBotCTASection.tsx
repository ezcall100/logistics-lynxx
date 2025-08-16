/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  ArrowRight, 
  Clock, 
  Shield, 
  Zap, 
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  Rocket
} from 'lucide-react';

const TransBotCTASection = () => {
  const navigate = useNavigate();

  const benefits = [
    'No setup fees or hidden costs',
    '30-day money-back guarantee',
    'Free data migration & training',
    '24/7 expert support team'
  ];

  const urgencyFactors = [
    {
      icon: TrendingUp,
      title: 'Limited Time Offer',
      description: '30% off your first year - expires soon'
    },
    {
      icon: Users,
      title: 'Join 1,200+ Companies',
      description: 'Leading businesses already saving millions'
    },
    {
      icon: Rocket,
      title: 'Fast Implementation',
      description: 'Go live in 24 hours with zero downtime'
    }
  ];

  const socialProof = [
    { metric: '98.9%', label: 'Customer Satisfaction' },
    { metric: '35%', label: 'Average Cost Savings' },
    { metric: '99.8%', label: 'System Uptime' },
    { metric: '6 months', label: 'Average ROI Time' }
  ];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA Card */}
        <div className="max-w-5xl mx-auto">
          <div className="glass-ultra rounded-3xl p-8 lg:p-16 shadow-premium border border-white/10 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50"></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-12">
                <Badge className="bg-gradient-to-r from-primary/20 to-primary/30 text-primary border-primary/30 px-6 py-3 text-lg font-semibold mb-6">
                  <Bot className="w-5 h-5 mr-2" />
                  Start Your Autonomous Journey Today
                </Badge>
                
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    Transform Your Logistics
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    In 24 Hours
                  </span>
                </h2>
                
                <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  Join the autonomous revolution. Let 250 AI agents optimize your entire TMS ecosystem 
                  while you focus on growing your business.
                </p>
              </div>

              {/* Urgency Factors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {urgencyFactors.map((factor, index) => (
                  <div key={index} className="text-center p-6 glass-subtle rounded-2xl group hover:glass-ultra transition-all duration-300">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 inline-block mb-4 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <factor.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {factor.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {factor.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Benefits List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/90 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button 
                  size="lg"
                  onClick={() => navigate('/portal')}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-bold px-12 py-6 text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Start Free Trial Now
                    <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                </Button>
                
                <div className="text-center sm:text-left">
                  <div className="text-sm text-muted-foreground mb-1">
                    No credit card required
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      4.9/5 from 1,200+ reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {socialProof.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                      {item.metric}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-4 mt-12">
                <Badge className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 border-green-500/20 px-4 py-2">
                  <Shield className="w-4 h-4 mr-2" />
                  SOC 2 Compliant
                </Badge>
                <Badge className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 border-blue-500/20 px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  99.9% SLA Guarantee
                </Badge>
                <Badge className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 text-purple-600 border-purple-500/20 px-4 py-2">
                  <Zap className="w-4 h-4 mr-2" />
                  24/7 AI Monitoring
                </Badge>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-8 right-8 opacity-10">
              <Bot className="h-24 w-24 text-primary animate-pulse" />
            </div>
            <div className="absolute bottom-8 left-8 opacity-10">
              <Rocket className="h-16 w-16 text-primary animate-bounce" />
            </div>
          </div>
        </div>

        {/* Secondary CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Questions about implementation? Our AI experts are standing by.
          </p>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/contact')}
            className="border-2 border-primary/20 hover:border-primary/40 font-semibold px-8 py-4 text-lg group"
          >
            Schedule a Demo
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Urgency Footer */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 glass-subtle rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">
              <span className="text-primary font-bold">127</span> companies started their trial this week
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransBotCTASection;
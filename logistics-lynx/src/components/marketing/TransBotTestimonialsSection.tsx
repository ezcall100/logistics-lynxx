import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, Users, Building2, Truck, TrendingUp } from 'lucide-react';

const TransBotTestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fleet Operations Manager',
      company: 'Global Logistics Corp',
      companySize: '500+ trucks',
      avatar: 'SJ',
      quote: "Trans Bot's AI agents have revolutionized our operations. We've seen a 40% reduction in fuel costs and 99.9% on-time delivery rate. The autonomous system handles everything seamlessly.",
      rating: 5,
      metrics: {
        costSaving: '40%',
        efficiency: '99.9%',
        roi: '425%'
      },
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Michael Chen',
      role: 'CEO',
      company: 'Swift Transport Solutions',
      companySize: '200+ drivers',
      avatar: 'MC',
      quote: "The 250 AI agents working 24/7 have transformed our business. Our profit margins increased by 35% in just 6 months. Best investment we've ever made.",
      rating: 5,
      metrics: {
        profitIncrease: '35%',
        timeToROI: '6 months',
        uptime: '99.8%'
      },
      gradient: 'from-emerald-500 to-green-500'
    },
    {
      name: 'Jennifer Martinez',
      role: 'VP of Operations',
      company: 'Premium Freight Lines',
      companySize: '1000+ shipments/day',
      avatar: 'JM',
      quote: "Trans Bot's autonomous load matching is incredible. We've achieved 96.7% match efficiency and our drivers love the AI-powered route optimization.",
      rating: 5,
      metrics: {
        matchRate: '96.7%',
        driverSatisfaction: '98%',
        routeOptimization: '45%'
      },
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      name: 'David Rodriguez',
      role: 'Logistics Director',
      company: 'Regional Express',
      companySize: '300+ vehicles',
      avatar: 'DR',
      quote: "The real-time analytics and predictive maintenance features have reduced our downtime by 60%. The AI never sleeps and neither does our efficiency.",
      rating: 5,
      metrics: {
        downtimeReduction: '60%',
        maintenanceCosts: '45%',
        availability: '99.2%'
      },
      gradient: 'from-orange-500 to-red-500'
    },
    {
      name: 'Lisa Thompson',
      role: 'Owner-Operator',
      company: 'Independent Trucker',
      companySize: '5 trucks',
      avatar: 'LT',
      quote: "As a small operation, Trans Bot's AI gives me the same advantages as big fleets. My revenue per mile increased 28% and I spend 70% less time on admin tasks.",
      rating: 5,
      metrics: {
        revenueIncrease: '28%',
        adminTime: '70% less',
        profitMargin: '32%'
      },
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Robert Wilson',
      role: 'Transportation Manager',
      company: 'National Shipping Co',
      companySize: '2000+ employees',
      avatar: 'RW',
      quote: "The autonomous system handles our entire TMS ecosystem flawlessly. Customer satisfaction is at an all-time high with 98.5% on-time deliveries.",
      rating: 5,
      metrics: {
        customerSatisfaction: '98.5%',
        onTimeDelivery: '98.5%',
        operationalEfficiency: '52%'
      },
      gradient: 'from-indigo-500 to-blue-500'
    }
  ];

  const companyLogos = [
    { name: 'Global Logistics', size: 'Fortune 500' },
    { name: 'Swift Transport', size: 'Mid-Market' },
    { name: 'Premium Freight', size: 'Enterprise' },
    { name: 'Regional Express', size: 'Regional' },
    { name: 'National Shipping', size: 'Large Fleet' },
    { name: 'Independent Ops', size: 'Small Business' }
  ];

  const overallStats = [
    { label: 'Customer Satisfaction', value: '98.9%', icon: Users },
    { label: 'Average Cost Savings', value: '35%', icon: TrendingUp },
    { label: 'Fleet Uptime', value: '99.8%', icon: Truck },
    { label: 'Enterprise Clients', value: '1,200+', icon: Building2 }
  ];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-primary/5"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-primary/20 px-4 py-2 text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Customer Success Stories
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Trusted by Industry
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Leaders Worldwide
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Join over 1,200 companies that have transformed their logistics operations 
            with Trans Bot's autonomous AI technology.
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {overallStats.map((stat, index) => (
            <div 
              key={index} 
              className="glass-subtle rounded-2xl p-6 text-center hover:glass-ultra transition-all duration-300 group"
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 inline-block mb-4 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="glass-subtle hover:glass-ultra transition-all duration-500 border-0 group relative overflow-hidden"
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-6">
                  <Quote className="h-8 w-8 text-primary/40 group-hover:text-primary/60 transition-colors" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-foreground/90 leading-relaxed mb-6 text-lg italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 glass-subtle rounded-xl">
                  {Object.entries(testimonial.metrics).map(([key, value], metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="text-lg font-bold text-primary mb-1">
                        {value}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-sm font-medium text-primary">
                      {testimonial.company} • {testimonial.companySize}
                    </div>
                  </div>
                </div>

                {/* Hover Effect Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Logos Section */}
        <div className="glass-subtle rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Trusted Across All Fleet Sizes
            </h3>
            <p className="text-muted-foreground">
              From independent operators to Fortune 500 companies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {companyLogos.map((company, index) => (
              <div 
                key={index} 
                className="text-center p-4 hover:glass-subtle rounded-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">
                  {company.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {company.size}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Join Our Success Stories?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Experience the same transformational results with Trans Bot's autonomous AI technology.
          </p>
          <Badge className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-primary/20 px-6 py-3 text-lg">
            <Star className="w-5 h-5 mr-2" />
            4.9/5 Average Rating • 1,200+ Reviews
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default TransBotTestimonialsSection;
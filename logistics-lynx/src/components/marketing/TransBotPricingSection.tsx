import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  Zap, 
  Crown, 
  Rocket, 
  Bot, 
  Users, 
  Truck, 
  Building2,
  Star,
  ArrowRight
} from 'lucide-react';

const TransBotPricingSection = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small fleets and independent operators',
      price: '$299',
      period: 'per month',
      originalPrice: '$399',
      discount: '25% OFF',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      popular: false,
      features: [
        '50 AI Agents',
        'Up to 25 vehicles',
        'Basic route optimization',
        'Real-time tracking',
        'Driver mobile app',
        'Standard support',
        'Basic analytics',
        'Load board access'
      ],
      limits: [
        '500 loads per month',
        'Standard integrations',
        'Email support'
      ],
      cta: 'Start Free Trial',
      savings: 'Save $1,200/year'
    },
    {
      name: 'Professional',
      description: 'Advanced features for growing transportation companies',
      price: '$799',
      period: 'per month',
      originalPrice: '$1,099',
      discount: '27% OFF',
      icon: Truck,
      gradient: 'from-emerald-500 to-green-500',
      popular: true,
      features: [
        '150 AI Agents',
        'Up to 100 vehicles',
        'Advanced route optimization',
        'Predictive analytics',
        'ELD compliance',
        'Priority support',
        'Custom dashboards',
        'API integrations',
        'Maintenance scheduling',
        'Performance reports'
      ],
      limits: [
        '2,000 loads per month',
        'Premium integrations',
        'Phone & email support'
      ],
      cta: 'Most Popular',
      savings: 'Save $3,600/year'
    },
    {
      name: 'Enterprise',
      description: 'Full autonomous TMS for large operations',
      price: '$1,999',
      period: 'per month',
      originalPrice: '$2,799',
      discount: '29% OFF',
      icon: Building2,
      gradient: 'from-purple-500 to-violet-500',
      popular: false,
      features: [
        '250 AI Agents',
        'Unlimited vehicles',
        'Complete automation',
        'Advanced AI insights',
        'White-label options',
        'Dedicated support',
        'Custom development',
        'Enterprise integrations',
        'Advanced security',
        'SLA guarantees',
        'Training & onboarding',
        'Custom reporting'
      ],
      limits: [
        'Unlimited loads',
        'All integrations included',
        '24/7 dedicated support'
      ],
      cta: 'Contact Sales',
      savings: 'Save $9,600/year'
    }
  ];

  const addOns = [
    {
      name: 'AI Route Optimizer Pro',
      description: 'Advanced machine learning for optimal routing',
      price: '$199/month',
      icon: Zap
    },
    {
      name: 'Predictive Maintenance',
      description: 'AI-powered vehicle maintenance forecasting',
      price: '$149/month',
      icon: Bot
    },
    {
      name: 'Load Board Premium',
      description: 'Access to exclusive high-paying loads',
      price: '$99/month',
      icon: Star
    },
    {
      name: 'Custom Integrations',
      description: 'Connect with your existing systems',
      price: 'Custom pricing',
      icon: Rocket
    }
  ];

  const faqs = [
    {
      question: 'What happens during the free trial?',
      answer: 'You get full access to Trans Bot for 30 days with up to 50 AI agents and all core features. No credit card required.'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can change your plan at unknown time. Changes take effect immediately with prorated billing.'
    },
    {
      question: 'How quickly can I see results?',
      answer: 'Most customers see measurable improvements within the first week, with full optimization typically achieved within 30 days.'
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No setup fees ever. We provide free onboarding and training to ensure your success with Trans Bot.'
    }
  ];

  return (
    <section id="pricing" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-primary/20 px-4 py-2 text-sm font-medium mb-6">
            <Crown className="w-4 h-4 mr-2" />
            Transparent Pricing
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Choose Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Autonomous Plan
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Start with a 30-day free trial. No setup fees, no long-term contracts. 
            Cancel anytime. Scale as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`
                relative glass-subtle hover:glass-ultra transition-all duration-500 border-0 group overflow-hidden
                ${plan.popular ? 'ring-2 ring-primary/20 shadow-2xl scale-105' : ''}
              `}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary/80 text-white text-center py-3 text-sm font-semibold">
                  <Star className="w-4 h-4 inline mr-2" />
                  Most Popular Choice
                </div>
              )}

              <CardHeader className={plan.popular ? 'pt-16' : 'pt-8'}>
                {/* Plan Icon & Discount */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${plan.gradient} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                    <plan.icon className="h-8 w-8 text-primary" />
                  </div>
                  <Badge className={`bg-gradient-to-r ${plan.gradient} bg-opacity-10 text-primary border-primary/20`}>
                    {plan.discount}
                  </Badge>
                </div>

                {/* Plan Name & Description */}
                <CardTitle className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {plan.name}
                </CardTitle>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {plan.description}
                </p>

                {/* Pricing */}
                <div className="mt-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground line-through">
                      {plan.originalPrice}
                    </span>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                      {plan.savings}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-8 pb-8">
                {/* CTA Button */}
                <Button 
                  className={`
                    w-full mb-6 font-semibold transition-all duration-300
                    ${plan.popular 
                      ? 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 text-primary border border-primary/20'
                    }
                  `}
                  onClick={() => plan.name === 'Enterprise' ? navigate('/contact') : navigate('/portal')}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                    Everything included:
                  </h4>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Limits */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  {plan.limits.map((limit, limitIndex) => (
                    <div key={limitIndex} className="flex items-center gap-3 mb-2">
                      <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {limit}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Hover Effect Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="glass-subtle rounded-3xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Powerful Add-ons
            </h3>
            <p className="text-muted-foreground">
              Enhance your Trans Bot experience with specialized AI modules
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="text-center group">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 inline-block mb-4 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                  <addon.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {addon.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {addon.description}
                </p>
                <Badge className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-primary/20">
                  {addon.price}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-subtle rounded-2xl p-6 hover:glass-ultra transition-all duration-300">
                <h4 className="font-semibold text-foreground mb-3">
                  {faq.question}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass-subtle rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join 1,200+ companies already saving millions with Trans Bot's autonomous AI
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/portal')}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransBotPricingSection;
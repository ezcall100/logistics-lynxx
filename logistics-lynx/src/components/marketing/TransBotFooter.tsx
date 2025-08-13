import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Facebook,
  ArrowRight,
  Truck,
  Users,
  Building2,
  Zap,
  Shield,
  BarChart3
} from 'lucide-react';
import transBotLogo from '@/assets/transbot-logo.png';

const TransBotFooter = () => {
  const footerLinks = {
    Solutions: [
      { name: 'Autonomous TMS', href: '#autonomous-tms' },
      { name: 'Fleet Management', href: '#fleet-management' },
      { name: 'Driver Portal', href: '#driver-portal' },
      { name: 'Load Board', href: '#load-board' },
      { name: 'Analytics Dashboard', href: '#analytics' },
      { name: 'AI Integration', href: '#ai-integration' }
    ],
    Company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press Kit', href: '#press' },
      { name: 'Partners', href: '#partners' },
      { name: 'Contact', href: '#contact' },
      { name: 'Blog', href: '#blog' }
    ],
    Resources: [
      { name: 'Documentation', href: '#docs' },
      { name: 'API Reference', href: '#api' },
      { name: 'Help Center', href: '#help' },
      { name: 'Case Studies', href: '#case-studies' },
      { name: 'Webinars', href: '#webinars' },
      { name: 'ROI Calculator', href: '#roi-calculator' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Security', href: '#security' },
      { name: 'Compliance', href: '#compliance' },
      { name: 'Data Protection', href: '#data-protection' },
      { name: 'Cookie Policy', href: '#cookies' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/transbotai', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/transbot', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/transbotai', label: 'YouTube' },
    { icon: Facebook, href: 'https://facebook.com/transbotai', label: 'Facebook' }
  ];

  const stats = [
    { icon: Users, value: '1,200+', label: 'Active Customers' },
    { icon: Truck, value: '50K+', label: 'Vehicles Managed' },
    { icon: Bot, value: '250', label: 'AI Agents' },
    { icon: BarChart3, value: '35%', label: 'Avg. Cost Savings' }
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-primary/10"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section */}
        <div className="py-16 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Company Info */}
            <div>
              <Link to="/" className="flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity">
                <img 
                  src={transBotLogo} 
                  alt="Trans Bot Inc" 
                  className="h-12 w-12 rounded-xl shadow-lg"
                />
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Trans Bot Inc
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    transbot.ai
                  </div>
                </div>
              </Link>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-md">
                Revolutionizing transportation management with 250 autonomous AI agents 
                working 24/7 to optimize your logistics operations.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>support@transbot.ai</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>1-800-TRANSBOT</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Austin, TX • Global Operations</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass-subtle rounded-xl hover:glass-ultra transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Newsletter Signup */}
            <div className="glass-subtle rounded-3xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Stay Updated
                </h3>
                <p className="text-muted-foreground">
                  Get the latest updates on autonomous logistics technology
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-primary/50 focus:outline-none transition-colors"
                />
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-6 py-3">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>No spam, unsubscribe anytime</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>Weekly industry insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-12 border-b border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 inline-block mb-3 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links Section */}
        <div className="py-12 border-b border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold text-foreground mb-4">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm text-left"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 Trans Bot Inc. All rights reserved.</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  All systems operational
                </span>
                <span>Version 2.1.0</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4 text-primary" />
                <span>SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>ISO 27001 Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50 hidden lg:block">
        <Button 
          onClick={() => window.open('/portal', '_blank')}
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-full p-4 group"
        >
          <Bot className="h-6 w-6 mr-2 group-hover:animate-pulse" />
          Try Trans Bot Free
        </Button>
      </div>
    </footer>
  );
};

export default TransBotFooter;
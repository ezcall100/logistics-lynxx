import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const MarketingFooter = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'TMS Software', href: '#tms-software' },
        { name: 'For Carriers', href: '#carriers' },
        { name: 'For Brokers', href: '#brokers' },
        { name: 'For Shippers', href: '#shippers' },
        { name: 'Integrations', href: '#integrations' },
        { name: 'API Documentation', href: '#api' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog & Insights', href: '#blog' },
        { name: 'Case Studies', href: '#case-studies' },
        { name: 'White Papers', href: '#whitepapers' },
        { name: 'Help Center', href: '#help' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Video Tutorials', href: '#tutorials' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Careers', href: '#careers' },
        { name: 'Partners', href: '#partners' },
        { name: 'News & Media', href: '#news' },
        { name: 'Investor Relations', href: '#investors' },
        { name: 'Contact Us', href: '#contact' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Customer Support', href: '#support' },
        { name: 'Technical Support', href: '#tech-support' },
        { name: 'Training', href: '#training' },
        { name: 'Implementation', href: '#implementation' },
        { name: 'System Status', href: '#status' },
        { name: 'Security', href: '#security' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#twitter' },
    { name: 'LinkedIn', icon: Linkedin, href: '#linkedin' },
    { name: 'Facebook', icon: Facebook, href: '#facebook' }
  ];

  const contactInfo = [
    { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: Mail, text: 'contact@autonomoustms.com', href: 'mailto:contact@autonomoustms.com' },
    { icon: MapPin, text: 'San Francisco, CA', href: '#location' }
  ];

  return (
    <footer className="bg-gradient-to-br from-background via-background/98 to-primary/10 border-t border-border/30">
      {/* Newsletter Section */}
      <div className="glass-subtle border-b border-border/20">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              Stay Updated with Autonomous TMS
            </h3>
            <p className="text-lg text-muted-foreground">
              Get the latest insights, product updates, and industry trends delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border/30 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button className="bg-gradient-to-r from-primary to-primary-deep whitespace-nowrap">
                Subscribe
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-to-br from-primary to-primary-deep rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <Brain className="h-7 w-7 text-white relative z-10" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Autonomous TMS
                </h1>
                <p className="text-xs text-muted-foreground font-medium">
                  Next-Gen Logistics
                </p>
              </div>
            </Link>
            
            <p className="text-muted-foreground leading-relaxed">
              The world's first fully autonomous Transportation Management System, powered by 250 AI agents 
              working 24/7 to revolutionize freight logistics and supply chain operations.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((contact, idx) => (
                <a
                  key={idx}
                  href={contact.href}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <contact.icon className="h-4 w-4" />
                  <span className="text-sm">{contact.text}</span>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="h-10 w-10 bg-muted/60 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors group"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="font-semibold text-foreground text-lg">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-1 group"
                    >
                      {link.name}
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-border/30" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <span>© 2024 Autonomous TMS. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#cookies" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>System Status: All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MarketingFooter;
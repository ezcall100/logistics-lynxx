/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  Brain, 
  Menu, 
  X, 
  Truck, 
  Building2, 
  Package, 
  Users, 
  Globe, 
  BookOpen, 
  Phone, 
  LogIn,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MarketingHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-trigger')) {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [mobileMenuOpen]);

  const navigationItems = [
    {
      title: 'Solutions',
      hasDropdown: true,
      items: [
        {
          title: 'For Carriers',
          href: '#carriers',
          description: 'Fleet management and route optimization',
          icon: Truck
        },
        {
          title: 'For Brokers',
          href: '#brokers', 
          description: 'Load matching and carrier networks',
          icon: Building2
        },
        {
          title: 'For Shippers',
          href: '#shippers',
          description: 'Real-time tracking and logistics',
          icon: Package
        }
      ]
    },
    {
      title: 'Platform',
      href: '#platform',
      description: 'Complete TMS platform overview'
    },
    {
      title: 'Integrations',
      hasDropdown: true,
      items: [
        {
          title: 'API Partners',
          href: '#partners',
          description: 'Connect with freight ecosystems',
          icon: Users
        },
        {
          title: 'Marketplace',
          href: '#marketplace',
          description: 'Load boards, factoring, ELD devices',
          icon: Globe
        }
      ]
    },
    {
      title: 'Resources',
      href: '#resources',
      description: 'Guides, case studies, and documentation',
      icon: BookOpen
    },
    {
      title: 'Company',
      href: '#about',
      description: 'Our story and mission'
    }
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    handleLinkClick();
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled 
        ? "glass-ultra border-b border-border/30 backdrop-blur-md" 
        : "bg-transparent"
    )}>
      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center gap-3 hover:scale-105 transition-all duration-300 group flex-shrink-0"
            onClick={handleLinkClick}
          >
            <div className="relative">
              <div className="h-9 w-9 lg:h-11 lg:w-11 bg-gradient-to-br from-primary via-primary-light to-primary-deep rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tl from-primary-deep/20 to-transparent" />
                <Brain className="h-5 w-5 lg:h-6 lg:w-6 text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-accent to-accent-light rounded-full animate-pulse" />
            </div>
            <div className="hidden sm:flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                  Autonomous TMS
                </h1>
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              </div>
              <p className="text-xs text-muted-foreground font-medium tracking-wide">
                AI-Powered Logistics Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-2">
              {navigationItems.map((item) => (
                <li key={item.title} className="relative group">
                  {item.hasDropdown ? (
                    <div className="relative">
                      <button 
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground rounded-xl hover:bg-muted/60 transition-all duration-200 group"
                        onMouseEnter={() => setActiveDropdown(item.title)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {item.title}
                        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                      </button>
                      
                      {/* Mega Menu Dropdown */}
                      <div 
                        className={cn(
                          "absolute top-full left-1/2 -translate-x-1/2 mt-3 w-96 glass-ultra border border-border/20 rounded-2xl shadow-2xl transition-all duration-300 origin-top",
                          activeDropdown === item.title ? "opacity-100 scale-100 visible translate-y-0" : "opacity-0 scale-95 invisible translate-y-2"
                        )}
                        onMouseEnter={() => setActiveDropdown(item.title)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <div className="p-6">
                          <div className="grid gap-4">
                            {item.items?.map((subItem, index) => (
                              <button
                                key={subItem.title}
                                onClick={() => scrollToSection(subItem.href)}
                                className="group flex items-start gap-4 p-4 rounded-xl hover:bg-muted/40 transition-all duration-200 text-left w-full border border-transparent hover:border-border/20"
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                {subItem.icon && (
                                  <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                    <subItem.icon className="h-5 w-5 text-primary" />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
                                    {subItem.title}
                                  </div>
                                  <div className="text-sm text-muted-foreground leading-relaxed">
                                    {subItem.description}
                                  </div>
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 opacity-0 group-hover:opacity-100" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => scrollToSection(item.href || '#')}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground rounded-xl hover:bg-muted/60 transition-all duration-200"
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.title}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA Section */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              className="text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-all duration-200" 
              asChild
            >
              <Link to="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Sign In
              </Link>
            </Button>
            <Button className="bg-gradient-to-r from-primary via-primary-light to-primary-deep hover:shadow-xl hover:shadow-primary/25 hover:scale-105 transition-all duration-300 font-semibold px-6 group">
              <Zap className="h-4 w-4 mr-2 group-hover:animate-pulse" />
              Get Started Free
            </Button>
          </div>

          {/* Mobile Menu Toggle & Theme */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="mobile-menu-trigger p-2.5 hover:bg-muted/60 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
            >
              <div className="relative">
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-foreground transition-transform duration-200 rotate-90" />
                ) : (
                  <Menu className="h-6 w-6 text-foreground transition-transform duration-200" />
                )}
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={cn(
            "lg:hidden mobile-menu overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-screen opacity-100 pb-6" : "max-h-0 opacity-0"
          )}
        >
          <div className="pt-4 space-y-3">
            {navigationItems.map((item, index) => (
              <div key={item.title} className="space-y-2" style={{ animationDelay: `${index * 100}ms` }}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                      className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-muted/60 transition-all duration-200 text-left border border-transparent hover:border-border/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                          <ChevronDown className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{item.title}</div>
                          <div className="text-sm text-muted-foreground">Explore options</div>
                        </div>
                      </div>
                      <ArrowRight 
                        className={cn(
                          "h-5 w-5 text-muted-foreground transition-transform duration-200",
                          activeDropdown === item.title ? "rotate-90" : ""
                        )} 
                      />
                    </button>
                    
                    {/* Mobile Dropdown */}
                    <div 
                      className={cn(
                        "ml-4 space-y-2 transition-all duration-300 overflow-hidden",
                        activeDropdown === item.title ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
                      )}
                    >
                      {item.items?.map((subItem) => (
                        <button
                          key={subItem.title}
                          onClick={() => scrollToSection(subItem.href)}
                          className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-muted/40 transition-all duration-200 text-left border border-border/10"
                        >
                          {subItem.icon && (
                            <div className="h-8 w-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                              <subItem.icon className="h-4 w-4 text-primary" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="font-medium text-foreground">{subItem.title}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {subItem.description}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.href || '#')}
                    className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-muted/60 transition-all duration-200 text-left border border-transparent hover:border-border/20"
                  >
                    <div className="h-8 w-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                      {item.icon ? <item.icon className="h-4 w-4 text-primary" /> : <div className="h-2 w-2 bg-primary rounded-full" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{item.title}</div>
                      {item.description && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </button>
                )}
              </div>
            ))}
            
            {/* Mobile CTA Section */}
            <div className="pt-6 mt-6 border-t border-border/20 space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-center border-border/20 hover:bg-muted/60 transition-all duration-200" 
                asChild
              >
                <Link to="/login" onClick={handleLinkClick} className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In to Portal
                </Link>
              </Button>
              <Button className="w-full bg-gradient-to-r from-primary via-primary-light to-primary-deep hover:shadow-lg transition-all duration-300 font-semibold group">
                <Zap className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MarketingHeader;
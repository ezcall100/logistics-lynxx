import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Menu, X, ChevronDown, Bot, Truck, Brain, Users, Building2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import transBotLogo from '@/assets/transbot-logo.png';

const TransBotMarketingHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      title: 'Solutions',
      isDropdown: true,
      items: [
        {
          title: 'Autonomous TMS',
          href: '#autonomous-tms',
          description: '250 AI agents managing your logistics 24/7',
          icon: Bot
        },
        {
          title: 'Fleet Management',
          href: '#fleet-management',
          description: 'Smart vehicle tracking and optimization',
          icon: Truck
        },
        {
          title: 'Load Board',
          href: '#load-board',
          description: 'AI-powered freight matching',
          icon: Building2
        },
        {
          title: 'Driver Portal',
          href: '#driver-portal',
          description: 'Enhanced driver experience platform',
          icon: Users
        }
      ]
    },
    {
      title: 'Technology',
      isDropdown: true,
      items: [
        {
          title: 'AI Integration',
          href: '#ai-integration',
          description: 'Machine learning and automation',
          icon: Brain
        },
        {
          title: 'Real-time Analytics',
          href: '#analytics',
          description: 'Live data insights and reporting',
          icon: Zap
        }
      ]
    },
    { title: 'Pricing', href: '#pricing' },
    { title: 'About', href: '#about' },
    { title: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    handleLinkClick();
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled 
        ? "glass-ultra shadow-premium border-b border-white/10" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            onClick={handleLinkClick}
          >
            <div className="relative">
              <img 
                src={transBotLogo} 
                alt="Trans Bot Inc" 
                className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Trans Bot
              </div>
              <div className="text-xs lg:text-sm text-muted-foreground font-medium -mt-1">
                transbot.ai
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.title} className="relative group">
                {item.isDropdown ? (
                  <div
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
                    onMouseEnter={() => setActiveDropdown(item.title)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.title}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                    
                    {activeDropdown === item.title && (
                      <div className="absolute top-full left-0 mt-2 w-80 glass-ultra rounded-2xl shadow-premium border border-white/10 overflow-hidden">
                        <div className="p-6 space-y-4">
                          {item.items?.map((subItem) => (
                            <button
                              key={subItem.title}
                              onClick={() => scrollToSection(subItem.href)}
                              className="w-full text-left group/item hover:glass-subtle rounded-xl p-3 transition-all duration-200"
                            >
                              <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-primary/10 group-hover/item:bg-primary/20 transition-colors">
                                  <subItem.icon className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <div className="font-medium text-foreground group-hover/item:text-primary transition-colors">
                                    {subItem.title}
                                  </div>
                                  <div className="text-sm text-muted-foreground mt-1">
                                    {subItem.description}
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.href!)}
                    className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {item.title}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
              className="font-medium"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/portal')}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-medium px-6 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass-ultra border-t border-white/10 shadow-premium">
            <div className="p-6 space-y-4">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  {item.isDropdown ? (
                    <div className="space-y-3">
                      <div className="font-medium text-foreground">{item.title}</div>
                      <div className="space-y-2 pl-4">
                        {item.items?.map((subItem) => (
                          <button
                            key={subItem.title}
                            onClick={() => scrollToSection(subItem.href)}
                            className="w-full text-left flex items-center gap-3 p-2 hover:glass-subtle rounded-lg transition-all"
                          >
                            <subItem.icon className="h-4 w-4 text-primary" />
                            <div>
                              <div className="font-medium text-sm">{subItem.title}</div>
                              <div className="text-xs text-muted-foreground">{subItem.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => scrollToSection(item.href!)}
                      className="w-full text-left font-medium text-foreground/80 hover:text-foreground py-2 transition-colors"
                    >
                      {item.title}
                    </button>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-white/10 space-y-3">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start font-medium"
                  onClick={() => {
                    navigate('/login');
                    handleLinkClick();
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-primary/80 text-white font-medium"
                  onClick={() => {
                    navigate('/portal');
                    handleLinkClick();
                  }}
                >
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TransBotMarketingHeader;
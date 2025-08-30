import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Menu, 
  X, 
  ChevronDown,
  Github,
  Twitter,
  Linkedin,
  Mail
} from 'lucide-react';

const WebsiteLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = React.useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = React.useState(false);

  const navigation = [
    { name: 'Introduction', href: '/website' },
    { 
      name: 'Features', 
      href: '/website/features',
      hasDropdown: true,
      dropdownItems: [
        { name: 'CRM', href: '/website/features/crm' },
        { name: 'Load Board', href: '/website/features/load-board' },
        { name: 'Rates & Pricing', href: '/website/features/rates' },
        { name: 'Financials', href: '/website/features/financials' },
        { name: 'Onboarding', href: '/website/features/onboarding' },
        { name: 'Marketplace', href: '/website/features/marketplace' },
        { name: 'Directory', href: '/website/features/directory' },
        { name: 'Factoring', href: '/website/features/factoring' },
        { name: 'EDI & Documents', href: '/website/features/edi' },
        { name: 'AI Agents', href: '/website/features/ai-agents' },
        { name: 'Mobile App', href: '/website/features/mobile' },
        { name: 'Super Admin', href: '/website/features/super-admin' }
      ]
    },
    { name: 'Integrations', href: '/website/integrations' },
    { name: 'Plans', href: '/website/plans' },
    { 
      name: 'Resources', 
      href: '/website/resources',
      hasDropdown: true,
      dropdownItems: [
        { name: 'User Guide', href: '/website/resources/user-guide' },
        { name: 'API Docs', href: '/website/resources/api-docs' },
        { name: 'FAQ', href: '/website/resources/faq' },
        { name: 'Announcements', href: '/website/resources/announcements' },
        { name: 'Case Studies', href: '/website/resources/case-studies' },
        { name: 'Blog', href: '/website/resources/blog' }
      ]
    },
    { name: 'Support', href: '/website/support' },
    { name: 'Company', href: '/website/company' },
    { name: 'Portals', href: '/website/portals' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/website" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Trans Bot AI</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => {
                          if (item.name === 'Features') setIsFeaturesOpen(!isFeaturesOpen);
                          if (item.name === 'Resources') setIsResourcesOpen(!isResourcesOpen);
                        }}
                        className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      
                      {/* Dropdown */}
                      {(item.name === 'Features' && isFeaturesOpen) || 
                       (item.name === 'Resources' && isResourcesOpen) ? (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                              onClick={() => {
                                setIsFeaturesOpen(false);
                                setIsResourcesOpen(false);
                              }}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm font-medium"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-gray-900"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Trans Bot AI</span>
              </div>
              <p className="text-gray-400 mb-4">
                The future of logistics management powered by AI.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/website/features" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link to="/website/integrations" className="text-gray-400 hover:text-white">Integrations</Link></li>
                <li><Link to="/website/plans" className="text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link to="/website/portals" className="text-gray-400 hover:text-white">Portals</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/website/resources/user-guide" className="text-gray-400 hover:text-white">User Guide</Link></li>
                <li><Link to="/website/resources/api-docs" className="text-gray-400 hover:text-white">API Docs</Link></li>
                <li><Link to="/website/resources/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                <li><Link to="/website/resources/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/website/company/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link to="/website/company/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
                <li><Link to="/website/support" className="text-gray-400 hover:text-white">Support</Link></li>
                <li><Link to="/website/company/legal" className="text-gray-400 hover:text-white">Legal</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Trans Bot AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/website/company/legal/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link to="/website/company/legal/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WebsiteLayout;

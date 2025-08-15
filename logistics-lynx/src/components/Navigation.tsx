import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import TransBotLogo from './TransBotLogo';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const publicPages = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/products', label: 'Products' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
    { path: '/blog', label: 'Blog' },
    { path: '/careers', label: 'Careers' },
    { path: '/support', label: 'Support' },
    { path: '/documentation', label: 'Docs' },
    { path: '/status', label: 'Status' },
  ];

  const protectedPages = [
    { path: '/login', label: 'Login' },
    { path: '/register', label: 'Register' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/portal-selection', label: 'Portals' },
  ];

  const portalPages = [
    { path: '/broker', label: 'Broker' },
    { path: '/carrier', label: 'Carrier' },
    { path: '/shipper', label: 'Shipper' },
    { path: '/driver', label: 'Driver' },
    { path: '/super-admin', label: 'Super Admin' },
    { path: '/admin', label: 'Admin' },
  ];

  return (
    <nav className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
                     {/* Logo */}
           <div className="flex items-center space-x-4">
             <Link to="/" className="flex items-center space-x-2">
               <TransBotLogo size="lg" variant="full" />
               <div>
                 <p className="text-xs text-gray-600">Autonomous Agents</p>
               </div>
             </Link>
           </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Public Pages */}
            <div className="flex items-center space-x-4">
              {publicPages.slice(1, 6).map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive(page.path)
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {page.label}
                </Link>
              ))}
            </div>

            {/* Dropdown for more pages */}
            <div className="relative group">
              <Button variant="ghost" className="text-sm">
                More Pages
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Public Pages</h4>
                      <div className="space-y-1">
                        {publicPages.slice(6).map((page) => (
                          <Link
                            key={page.path}
                            to={page.path}
                            className="block text-sm text-gray-600 hover:text-blue-600"
                          >
                            {page.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Portals</h4>
                      <div className="space-y-1">
                        {portalPages.map((page) => (
                          <Link
                            key={page.path}
                            to={page.path}
                            className="block text-sm text-gray-600 hover:text-blue-600"
                          >
                            {page.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              🔥 Live
            </Badge>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Main Pages</h4>
                <div className="grid grid-cols-2 gap-2">
                  {publicPages.slice(1, 7).map((page) => (
                    <Link
                      key={page.path}
                      to={page.path}
                      className="block text-sm text-gray-600 hover:text-blue-600 p-2 rounded"
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Portals</h4>
                <div className="grid grid-cols-2 gap-2">
                  {portalPages.map((page) => (
                    <Link
                      key={page.path}
                      to={page.path}
                      className="block text-sm text-gray-600 hover:text-blue-600 p-2 rounded"
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 pt-4 border-t border-gray-200">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">Login</Button>
                </Link>
                <Link to="/register" className="flex-1">
                  <Button size="sm" className="w-full">Register</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

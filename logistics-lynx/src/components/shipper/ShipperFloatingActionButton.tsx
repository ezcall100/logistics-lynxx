/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { 
  Plus, Package, Truck, Phone, MessageSquare, Mail, FileText, 
  Users, X, Calculator, MapPin, BarChart3, Settings, Zap 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const ShipperFloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    {
      label: 'New Shipment',
      icon: Package,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      action: () => {
        navigate('/shipper-admin/shipments/new');
        setIsOpen(false);
      }
    },
    {
      label: 'Quick Quote',
      icon: Calculator,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      action: () => {
        navigate('/shipper-admin/quotes/new');
        setIsOpen(false);
      }
    },
    {
      label: 'Find Carrier',
      icon: Truck,
      color: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      action: () => {
        navigate('/shipper-admin/networks/carriers');
        setIsOpen(false);
      }
    },
    {
      label: 'Track Shipment',
      icon: MapPin,
      color: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700',
      action: () => {
        navigate('/shipper-admin/shipments/in-transit');
        setIsOpen(false);
      }
    },
    {
      label: 'Reports',
      icon: BarChart3,
      color: 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700',
      action: () => {
        navigate('/shipper-admin/reports/financial');
        setIsOpen(false);
      }
    },
    {
      label: 'Contact Support',
      icon: Phone,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      action: () => {
        console.log('Contact support');
        setIsOpen(false);
      }
    },
    {
      label: 'Send Message',
      icon: MessageSquare,
      color: 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700',
      action: () => {
        console.log('Send message');
        setIsOpen(false);
      }
    },
    {
      label: 'Email',
      icon: Mail,
      color: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
      action: () => {
        console.log('Open email');
        setIsOpen(false);
      }
    }
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      <div className={cn(
        "flex flex-col-reverse gap-3 mb-4 transition-all duration-300 ease-out transform-gpu",
        isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
      )}>
        {actions.map((action, index) => (
          <div
            key={action.label}
            className={cn(
              "flex items-center gap-3 transition-all duration-300 ease-out transform-gpu",
              isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            )}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {/* Label */}
            <div className="bg-background/95 backdrop-blur-md border border-border/50 rounded-xl px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {action.label}
              </span>
            </div>
            
            {/* Button */}
            <Button
              size="icon"
              onClick={action.action}
              className={cn(
                "h-12 w-12 rounded-full shadow-lg hover:shadow-xl border border-white/20 transition-all duration-200 hover:scale-110 transform-gpu",
                action.color,
                "text-white font-medium"
              )}
            >
              <action.icon className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>

      {/* Main FAB button */}
      <Button
        size="icon"
        onClick={handleToggle}
        className={cn(
          "h-16 w-16 rounded-full shadow-xl hover:shadow-2xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary border border-white/20 transition-all duration-300 hover:scale-105 transform-gpu",
          isOpen && "rotate-45"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-primary-foreground" />
        ) : (
          <Plus className="h-6 w-6 text-primary-foreground" />
        )}
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/10 backdrop-blur-[2px] -z-10 transition-all duration-300" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ShipperFloatingActionButton;

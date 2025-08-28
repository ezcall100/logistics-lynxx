import React from 'react';

interface ToastProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'destructive';
}

export const Toast: React.FC<ToastProps> = ({ 
  children, 
  title,
  description,
  className = '', 
  variant = 'default' 
}) => {
  const baseClasses = 'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-sm';
  
  const variantClasses = {
    default: 'bg-white border border-gray-200 text-gray-900',
    success: 'bg-green-100 border border-green-200 text-green-800',
    error: 'bg-red-100 border border-red-200 text-red-800',
    warning: 'bg-yellow-100 border border-yellow-200 text-yellow-800',
    destructive: 'bg-red-100 border border-red-200 text-red-800'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  // If children are provided, render them directly
  if (children) {
    return (
      <div className={classes}>
        {children}
      </div>
    );
  }
  
  // Otherwise render title and description
  return (
    <div className={classes}>
      {title && <div className="font-semibold">{title}</div>}
      {description && <div className="text-sm mt-1">{description}</div>}
    </div>
  );
};

export const ToastActionElement: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex gap-2 mt-2">
    {children}
  </div>
);

export type { ToastProps };

export const useToast = () => {
  const toast = (message: string | { title?: string; description?: string; variant?: 'default' | 'success' | 'error' | 'warning' | 'destructive' }, variant: 'default' | 'success' | 'error' | 'warning' | 'destructive' = 'default') => {
    if (typeof message === 'string') {
      console.log(`Toast: ${message} (${variant})`);
    } else {
      console.log(`Toast: ${message.title || ''} - ${message.description || ''} (${message.variant || variant})`);
    }
  };
  
  return { toast };
};

export default useToast;
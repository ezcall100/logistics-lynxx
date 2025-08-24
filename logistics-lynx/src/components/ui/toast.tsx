import React from 'react';

interface ToastProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
}

export const Toast: React.FC<ToastProps> = ({ 
  children, 
  className = '', 
  variant = 'default' 
}) => {
  const baseClasses = 'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-sm';
  
  const variantClasses = {
    default: 'bg-white border border-gray-200 text-gray-900',
    success: 'bg-green-100 border border-green-200 text-green-800',
    error: 'bg-red-100 border border-red-200 text-red-800',
    warning: 'bg-yellow-100 border border-yellow-200 text-yellow-800'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export const useToast = () => {
  const toast = (message: string, variant: 'default' | 'success' | 'error' | 'warning' = 'default') => {
    console.log(`Toast: ${message} (${variant})`);
  };
  
  return { toast };
};

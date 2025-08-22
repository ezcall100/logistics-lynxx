import React from 'react';

interface TransBotLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

const TransBotLogo: React.FC<TransBotLogoProps> = ({ 
  size = 'md', 
  animated = false, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const animationClass = animated ? 'animate-pulse' : '';

  return (
    <div className={`relative ${sizeClasses[size]} ${animationClass} ${className}`}>
      {/* Main Logo Container */}
      <div className="relative w-full h-full">
        {/* Background Circle with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-full shadow-lg"></div>
        
        {/* Inner Circle */}
        <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
          {/* AI Brain Icon */}
          <div className="relative">
            {/* Brain Circuit Pattern */}
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="w-3/4 h-3/4 text-blue-600"
            >
              {/* Brain Outline */}
              <path 
                d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.5 4.5 3 6l3 3 3-3c1.5-1.5 3-3.5 3-6 0-3.5-2.5-6-6-6z" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="none"
              />
              {/* Circuit Nodes */}
              <circle cx="8" cy="6" r="1" fill="currentColor" className="animate-pulse" />
              <circle cx="16" cy="6" r="1" fill="currentColor" className="animate-pulse" />
              <circle cx="12" cy="10" r="1" fill="currentColor" className="animate-pulse" />
              <circle cx="9" cy="12" r="0.5" fill="currentColor" />
              <circle cx="15" cy="12" r="0.5" fill="currentColor" />
              {/* Circuit Lines */}
              <path d="M8 6 L12 10 L16 6" stroke="currentColor" strokeWidth="0.5" />
              <path d="M9 12 L12 10 L15 12" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
        
        {/* Transportation Elements */}
        <div className="absolute -bottom-1 -right-1 w-1/3 h-1/3 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-md">
          {/* Truck Icon */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-2/3 h-2/3 text-white"
          >
            <path 
              d="M3 17h2v-4H3v4zm16 0h2v-4h-2v4zm-2-4h-2v4h2v-4zm-4 0h-2v4h2v-4zm-4 0H7v4h2v-4zm-2-4H3v2h2v-2zm16 0h-2v2h2v-2z" 
              fill="currentColor"
            />
            <circle cx="7" cy="17" r="1.5" fill="currentColor" />
            <circle cx="17" cy="17" r="1.5" fill="currentColor" />
          </svg>
        </div>
        
        {/* AI Indicator */}
        <div className="absolute -top-1 -left-1 w-1/4 h-1/4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
          <div className="w-1/2 h-1/2 bg-white rounded-full flex items-center justify-center">
            <div className="w-1/2 h-1/2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Text Label for larger sizes */}
      {size === 'lg' || size === 'xl' && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <div className="text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Trans Bot AI
          </div>
        </div>
      )}
    </div>
  );
};

export default TransBotLogo;

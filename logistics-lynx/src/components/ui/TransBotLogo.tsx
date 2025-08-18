import React from 'react';
import { Truck, Brain, Zap, Globe } from 'lucide-react';

interface TransBotLogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

export const TransBotLogo: React.FC<TransBotLogoProps> = ({ 
  size = 'md', 
  animated = true, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: { truck: 'w-3 h-3', brain: 'w-2 h-2', zap: 'w-1.5 h-1.5' },
    md: { truck: 'w-5 h-5', brain: 'w-3 h-3', zap: 'w-2 h-2' },
    lg: { truck: 'w-7 h-7', brain: 'w-4 h-4', zap: 'w-3 h-3' }
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Main container with gradient background */}
      <div className="relative w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
        
        {/* Animated background patterns */}
        {animated && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-pulse"></div>
          </>
        )}
        
        {/* Main icon composition */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative">
            {/* Primary truck icon */}
            <Truck className={`${iconSizes[size].truck} text-white drop-shadow-sm`} />
            
            {/* AI brain icon overlay */}
            <div className={`absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-0.5 shadow-sm ${animated ? 'animate-bounce' : ''}`}>
              <Brain className={`${iconSizes[size].brain} text-white`} />
            </div>
            
            {/* Energy/connection dots */}
            <div className="absolute -bottom-1 -left-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-0.5 shadow-sm">
              <Zap className={`${iconSizes[size].zap} text-white`} />
            </div>
            
            {/* Global connection indicator */}
            <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-0.5 shadow-sm opacity-80">
              <Globe className={`${iconSizes[size].zap} text-white`} />
            </div>
          </div>
        </div>
        
        {/* Glowing effect */}
        {animated && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-indigo-500/30 rounded-xl animate-pulse"></div>
        )}
        
        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-xl border-2 border-white/20"></div>
      </div>
    </div>
  );
};

export default TransBotLogo;

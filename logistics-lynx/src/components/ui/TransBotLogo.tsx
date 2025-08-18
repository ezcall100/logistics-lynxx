import React from 'react';
import { Truck, Brain, Zap, Globe, Code, Database } from 'lucide-react';

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
    sm: { truck: 'w-3 h-3', brain: 'w-2 h-2', zap: 'w-1.5 h-1.5', code: 'w-1.5 h-1.5' },
    md: { truck: 'w-5 h-5', brain: 'w-3 h-3', zap: 'w-2 h-2', code: 'w-2 h-2' },
    lg: { truck: 'w-7 h-7', brain: 'w-4 h-4', zap: 'w-3 h-3', code: 'w-3 h-3' }
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Main container with professional software company gradient */}
      <div className="relative w-full h-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-xl flex items-center justify-center shadow-xl overflow-hidden border border-slate-600/30">
        
        {/* Animated background patterns for tech feel */}
        {animated && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-pulse"></div>
            {/* Tech circuit pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1 left-1 w-1 h-1 bg-blue-400 rounded-full"></div>
              <div className="absolute top-1 right-1 w-1 h-1 bg-indigo-400 rounded-full"></div>
              <div className="absolute bottom-1 left-1 w-1 h-1 bg-purple-400 rounded-full"></div>
              <div className="absolute bottom-1 right-1 w-1 h-1 bg-blue-400 rounded-full"></div>
            </div>
          </>
        )}
        
        {/* Main icon composition */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative">
            {/* Primary truck icon - representing transportation */}
            <Truck className={`${iconSizes[size].truck} text-white drop-shadow-sm`} />
            
            {/* AI brain icon overlay - representing intelligent software */}
            <div className={`absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full p-0.5 shadow-sm ${animated ? 'animate-bounce' : ''}`}>
              <Brain className={`${iconSizes[size].brain} text-white`} />
            </div>
            
            {/* Code icon - representing software development */}
            <div className="absolute -bottom-1 -left-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-0.5 shadow-sm">
              <Code className={`${iconSizes[size].code} text-white`} />
            </div>
            
            {/* Database icon - representing TMS system */}
            <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-0.5 shadow-sm opacity-90">
              <Database className={`${iconSizes[size].code} text-white`} />
            </div>
          </div>
        </div>
        
        {/* Professional glow effect */}
        {animated && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-xl animate-pulse"></div>
        )}
        
        {/* Professional border with tech accent */}
        <div className="absolute inset-0 rounded-xl border border-slate-500/30"></div>
        <div className="absolute inset-0 rounded-xl border border-blue-500/20"></div>
      </div>
    </div>
  );
};

export default TransBotLogo;

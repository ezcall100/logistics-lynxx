/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface TransBotLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'text' | 'icon' | 'full';
  className?: string;
}

const TransBotLogo: React.FC<TransBotLogoProps> = ({ 
  size = 'md', 
  variant = 'full',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  const LogoIcon = () => (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center ${className}`}>
      <span className="text-white font-bold text-xs">TBA</span>
    </div>
  );

  const LogoText = () => (
    <span className={`font-bold text-gray-900 ${textSizes[size]} ${className}`}>
      Trans Bot AI
    </span>
  );

  const LogoFull = () => (
    <div className={`flex items-center space-x-2 ${className}`}>
      <LogoIcon />
      <LogoText />
    </div>
  );

  switch (variant) {
    case 'icon':
      return <LogoIcon />;
    case 'text':
      return <LogoText />;
    case 'full':
    default:
      return <LogoFull />;
  }
};

export default TransBotLogo;

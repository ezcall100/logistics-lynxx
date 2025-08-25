import React, { useState, useEffect } from 'react';

interface ResponsiveDebugProps {
  className?: string;
}

export const ResponsiveDebug: React.FC<ResponsiveDebugProps> = ({ className = '' }) => {
  const [screenInfo, setScreenInfo] = useState({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    breakpoint: ''
  });

  useEffect(() => {
    const updateScreenInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      let isMobile = false;
      let isTablet = false;
      let isDesktop = false;
      let breakpoint = '';

      if (width < 768) {
        isMobile = true;
        breakpoint = 'Mobile (< 768px)';
      } else if (width >= 768 && width < 1024) {
        isTablet = true;
        breakpoint = 'Tablet (768px - 1023px)';
      } else {
        isDesktop = true;
        breakpoint = 'Desktop (≥ 1024px)';
      }

      setScreenInfo({
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        breakpoint
      });
    };

    updateScreenInfo();
    window.addEventListener('resize', updateScreenInfo);
    return () => window.removeEventListener('resize', updateScreenInfo);
  }, []);

  return (
    <div className={`fixed top-0 left-0 z-50 bg-black/80 text-white p-2 text-xs font-mono ${className}`}>
      <div>Screen: {screenInfo.width} × {screenInfo.height}</div>
      <div>Breakpoint: {screenInfo.breakpoint}</div>
      <div>Mobile: {screenInfo.isMobile ? '✓' : '✗'}</div>
      <div>Tablet: {screenInfo.isTablet ? '✓' : '✗'}</div>
      <div>Desktop: {screenInfo.isDesktop ? '✓' : '✗'}</div>
    </div>
  );
};

export default ResponsiveDebug;

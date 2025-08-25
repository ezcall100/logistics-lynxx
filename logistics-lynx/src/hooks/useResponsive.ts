import { useState, useEffect } from 'react';

interface ResponsiveBreakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop' | 'large';
  width: number;
  height: number;
}

const useResponsive = (): ResponsiveBreakpoints => {
  const [screenSize, setScreenSize] = useState<ResponsiveBreakpoints>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    screenSize: 'mobile',
    width: 0,
    height: 0
  });

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;
      const isDesktop = width >= 1024 && width < 1280;
      const isLargeDesktop = width >= 1280;

      let currentScreenSize: 'mobile' | 'tablet' | 'desktop' | 'large';
      if (isMobile) currentScreenSize = 'mobile';
      else if (isTablet) currentScreenSize = 'tablet';
      else if (isDesktop) currentScreenSize = 'desktop';
      else currentScreenSize = 'large';

      setScreenSize({
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop,
        screenSize: currentScreenSize,
        width,
        height
      });
    };

    // Initial call
    updateScreenSize();

    // Add event listener
    window.addEventListener('resize', updateScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
};

export default useResponsive;

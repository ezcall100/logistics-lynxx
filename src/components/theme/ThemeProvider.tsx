/**
 * Theme Provider
 * Handles theme switching, system preference detection, and persistence
 */

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystem?: boolean;
  enableTransition?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'logistics-lynx-theme',
  enableSystem = true,
  enableTransition = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Get system preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Apply theme to document
  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add new theme class
    root.classList.add(newTheme);
    
    // Update resolved theme
    setResolvedTheme(newTheme);
    
    // Set data attribute for CSS targeting
    root.setAttribute('data-theme', newTheme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#0a0a0f' : '#ffffff');
    }
  };

  // Handle theme change
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme);
    }
    
    // Apply theme
    const resolved = newTheme === 'system' ? getSystemTheme() : newTheme;
    applyTheme(resolved);
  };

  // Toggle between light and dark
  const toggleTheme = () => {
    const currentResolved = resolvedTheme;
    const newTheme: Theme = currentResolved === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Initialize theme on mount
  useEffect(() => {
    // Get stored theme or default
    const stored = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
    const initialTheme = (stored as Theme) || defaultTheme;
    
    setThemeState(initialTheme);
    
    // Apply initial theme
    const resolved = initialTheme === 'system' ? getSystemTheme() : initialTheme;
    applyTheme(resolved);
    
    // Listen for system theme changes
    if (enableSystem && initialTheme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = () => {
        if (theme === 'system') {
          applyTheme(getSystemTheme());
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Handle system theme changes
  useEffect(() => {
    if (theme === 'system') {
      applyTheme(getSystemTheme());
    }
  }, [theme]);

  // Enable/disable transitions
  useEffect(() => {
    const root = document.documentElement;
    
    if (enableTransition) {
      root.style.setProperty('--transition-theme', 'color 200ms ease, background-color 200ms ease');
    } else {
      root.style.setProperty('--transition-theme', 'none');
    }
  }, [enableTransition]);

  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme context
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

// Hook to get current theme state
export function useThemeState() {
  const { theme, resolvedTheme } = useTheme();
  
  return {
    theme,
    resolvedTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    isSystem: theme === 'system',
  };
}

// Utility to get theme without context (for SSR)
export function getInitialTheme(storageKey = 'logistics-lynx-theme'): Theme {
  if (typeof window === 'undefined') return 'system';
  
  const stored = localStorage.getItem(storageKey);
  return (stored as Theme) || 'system';
}

// Utility to apply theme without context (for SSR)
export function applyThemeToDocument(theme: Theme) {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  const resolvedTheme = theme === 'system' 
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;
  
  root.classList.remove('light', 'dark');
  root.classList.add(resolvedTheme);
  root.setAttribute('data-theme', resolvedTheme);
}

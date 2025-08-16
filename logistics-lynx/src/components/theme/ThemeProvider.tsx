/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, createContext, useContext } from "react";

type Theme = "light" | "dark" | "system";
const ThemeCtx = createContext<{theme: Theme; setTheme:(t:Theme)=>void}>({theme:"system", setTheme:()=>{}});

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  enableTransition?: boolean;
};

export function ThemeProvider({ 
  children, 
  defaultTheme = "system",
  enableSystem = true,
  enableTransition = true 
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const saved = localStorage.getItem("theme") as Theme;
    if (saved && ["light", "dark", "system"].includes(saved)) {
      return saved;
    }
    // Use defaultTheme prop
    return defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Determine if we should use dark mode
    const shouldUseDark = theme === "dark" || (theme === "system" && enableSystem && prefersDark);
    
    // Apply the appropriate class
    root.classList.remove("light", "dark");
    root.classList.add(shouldUseDark ? "dark" : "light");
    
    // Add transition class if enabled
    if (enableTransition) {
      root.classList.add("transition-colors", "duration-300");
    }
    
    // Save to localStorage
    localStorage.setItem("theme", theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', shouldUseDark ? '#0a0a0f' : '#ffffff');
    }
  }, [theme, enableSystem, enableTransition]);

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem) return;
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      if (theme === "system") {
        const root = document.documentElement;
        const prefersDark = mediaQuery.matches;
        root.classList.remove("light", "dark");
        root.classList.add(prefersDark ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, enableSystem]);

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}

export function useTheme(){ return useContext(ThemeCtx); }

/**
 * Theme Toggle Component
 * Accessible theme switcher with proper ARIA labels and keyboard navigation
 */

import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  variant?: 'button' | 'select' | 'dropdown';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabels?: boolean;
  showSystem?: boolean;
}

export function ThemeToggle({
  variant = 'button',
  size = 'md',
  className,
  showLabels = false,
  showSystem = true,
}: ThemeToggleProps) {
  const { theme, setTheme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  // Simple button toggle
  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          'inline-flex items-center justify-center rounded-md border border-border bg-surface text-text-muted transition-colors hover:bg-surface-2 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          sizeClasses[size],
          className
        )}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  // Select dropdown
  if (variant === 'select') {
    return (
      <div className={cn('relative', className)}>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
          className={cn(
            'appearance-none rounded-md border border-border bg-surface px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            size === 'sm' && 'px-2 py-1 text-xs',
            size === 'lg' && 'px-4 py-3 text-base'
          )}
          aria-label="Select theme"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          {showSystem && <option value="system">System</option>}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }

  // Dropdown menu
  if (variant === 'dropdown') {
    const [isOpen, setIsOpen] = React.useState(false);

    const themes = [
      { value: 'light' as const, label: 'Light', icon: Sun },
      { value: 'dark' as const, label: 'Dark', icon: Moon },
      ...(showSystem ? [{ value: 'system' as const, label: 'System', icon: Monitor }] : []),
    ];

    return (
      <div className={cn('relative', className)}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'inline-flex items-center justify-center rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-muted transition-colors hover:bg-surface-2 hover:text-text focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            size === 'sm' && 'px-2 py-1 text-xs',
            size === 'lg' && 'px-4 py-3 text-base'
          )}
          aria-label="Open theme menu"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {themes.find(t => t.value === theme)?.icon && (
            <themes.find(t => t.value === theme)!.icon className="mr-2 h-4 w-4" />
          )}
          {showLabels && themes.find(t => t.value === theme)?.label}
          <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            
            {/* Dropdown menu */}
            <div className="absolute right-0 top-full z-50 mt-1 min-w-[8rem] rounded-md border border-border bg-surface py-1 shadow-lg">
              {themes.map((themeOption) => {
                const Icon = themeOption.icon;
                return (
                  <button
                    key={themeOption.value}
                    type="button"
                    onClick={() => {
                      setTheme(themeOption.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center px-3 py-2 text-sm text-text transition-colors hover:bg-surface-2 focus:bg-surface-2 focus:outline-none',
                      theme === themeOption.value && 'bg-primary-subtle text-primary'
                    )}
                    aria-label={`Switch to ${themeOption.label.toLowerCase()} theme`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {themeOption.label}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }

  return null;
}

// Compact theme toggle for headers
export function CompactThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-text-muted transition-colors hover:bg-surface-2 hover:text-text focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

// Theme indicator (read-only)
export function ThemeIndicator({ className }: { className?: string }) {
  const { theme, resolvedTheme } = useTheme();

  const getThemeInfo = () => {
    switch (theme) {
      case 'light':
        return { icon: Sun, label: 'Light Mode' };
      case 'dark':
        return { icon: Moon, label: 'Dark Mode' };
      case 'system':
        return { 
          icon: Monitor, 
          label: `System (${resolvedTheme === 'dark' ? 'Dark' : 'Light'})` 
        };
      default:
        return { icon: Sun, label: 'Unknown' };
    }
  };

  const { icon: Icon, label } = getThemeInfo();

  return (
    <div className={cn('flex items-center gap-2 text-sm text-text-muted', className)}>
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </div>
  );
}

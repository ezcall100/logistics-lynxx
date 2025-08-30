/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'brand-primary': {
          50: 'var(--color-brand-primary-50)',
          100: 'var(--color-brand-primary-100)',
          200: 'var(--color-brand-primary-200)',
          300: 'var(--color-brand-primary-300)',
          400: 'var(--color-brand-primary-400)',
          500: 'var(--color-brand-primary-500)',
          600: 'var(--color-brand-primary-600)',
          700: 'var(--color-brand-primary-700)',
          800: 'var(--color-brand-primary-800)',
          900: 'var(--color-brand-primary-900)',
          950: 'var(--color-brand-primary-950)',
        },
        'brand-secondary': {
          50: 'var(--color-brand-secondary-50)',
          100: 'var(--color-brand-secondary-100)',
          200: 'var(--color-brand-secondary-200)',
          300: 'var(--color-brand-secondary-300)',
          400: 'var(--color-brand-secondary-400)',
          500: 'var(--color-brand-secondary-500)',
          600: 'var(--color-brand-secondary-600)',
          700: 'var(--color-brand-secondary-700)',
          800: 'var(--color-brand-secondary-800)',
          900: 'var(--color-brand-secondary-900)',
          950: 'var(--color-brand-secondary-950)',
        },
        'brand-accent': {
          50: 'var(--color-brand-accent-50)',
          100: 'var(--color-brand-accent-100)',
          200: 'var(--color-brand-accent-200)',
          300: 'var(--color-brand-accent-300)',
          400: 'var(--color-brand-accent-400)',
          500: 'var(--color-brand-accent-500)',
          600: 'var(--color-brand-accent-600)',
          700: 'var(--color-brand-accent-700)',
          800: 'var(--color-brand-accent-800)',
          900: 'var(--color-brand-accent-900)',
          950: 'var(--color-brand-accent-950)',
        },
        
        // Background Colors
        'bg': {
          'canvas': 'var(--color-bg-canvas)',
          'elevated': 'var(--color-bg-elevated)',
          'soft': 'var(--color-bg-soft)',
          'overlay': 'var(--color-bg-overlay)',
          'backdrop': 'var(--color-bg-backdrop)',
        },
        
        // Text Colors
        'text': {
          'primary': 'var(--color-text-primary)',
          'secondary': 'var(--color-text-secondary)',
          'tertiary': 'var(--color-text-tertiary)',
          'disabled': 'var(--color-text-disabled)',
          'inverse': 'var(--color-text-inverse)',
        },
        
        // Border Colors
        'border': {
          'default': 'var(--color-border-default)',
          'hover': 'var(--color-border-hover)',
          'focus': 'var(--color-border-focus)',
          'error': 'var(--color-border-error)',
          'success': 'var(--color-border-success)',
          'warning': 'var(--color-border-warning)',
        },
        
        // State Colors
        'state': {
          'success': {
            'bg': 'var(--color-state-success-bg)',
            'text': 'var(--color-state-success-text)',
            'border': 'var(--color-state-success-border)',
          },
          'warning': {
            'bg': 'var(--color-state-warning-bg)',
            'text': 'var(--color-state-warning-text)',
            'border': 'var(--color-state-warning-border)',
          },
          'error': {
            'bg': 'var(--color-state-error-bg)',
            'text': 'var(--color-state-error-text)',
            'border': 'var(--color-state-error-border)',
          },
          'info': {
            'bg': 'var(--color-state-info-bg)',
            'text': 'var(--color-state-info-text)',
            'border': 'var(--color-state-info-border)',
          },
        },
        
        // Portal Colors
        'portal': {
          'super-admin': {
            'primary': 'var(--color-portal-super-admin-primary)',
            'secondary': 'var(--color-portal-super-admin-secondary)',
          },
          'broker': {
            'primary': 'var(--color-portal-broker-primary)',
            'secondary': 'var(--color-portal-broker-secondary)',
          },
          'carrier': {
            'primary': 'var(--color-portal-carrier-primary)',
            'secondary': 'var(--color-portal-carrier-secondary)',
          },
          'shipper': {
            'primary': 'var(--color-portal-shipper-primary)',
            'secondary': 'var(--color-portal-shipper-secondary)',
          },
          'owner-operator': {
            'primary': 'var(--color-portal-owner-operator-primary)',
            'secondary': 'var(--color-portal-owner-operator-secondary)',
          },
          'driver': {
            'primary': 'var(--color-portal-driver-primary)',
            'secondary': 'var(--color-portal-driver-secondary)',
          },
        },
      },
      
      fontFamily: {
        'sans': ['var(--font-family-sans)'],
        'mono': ['var(--font-family-mono)'],
      },
      
      fontSize: {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
        '6xl': 'var(--font-size-6xl)',
        
        // Typography Roles
        'display': ['var(--font-size-display)', { lineHeight: 'var(--line-height-display)', fontWeight: 'var(--font-weight-display)' }],
        'h1': ['var(--font-size-h1)', { lineHeight: 'var(--line-height-h1)', fontWeight: 'var(--font-weight-h1)' }],
        'h2': ['var(--font-size-h2)', { lineHeight: 'var(--line-height-h2)', fontWeight: 'var(--font-weight-h2)' }],
        'h3': ['var(--font-size-h3)', { lineHeight: 'var(--line-height-h3)', fontWeight: 'var(--font-weight-h3)' }],
        'h4': ['var(--font-size-h4)', { lineHeight: 'var(--line-height-h4)', fontWeight: 'var(--font-weight-h4)' }],
        'h5': ['var(--font-size-h5)', { lineHeight: 'var(--line-height-h5)', fontWeight: 'var(--font-weight-h5)' }],
        'h6': ['var(--font-size-h6)', { lineHeight: 'var(--line-height-h6)', fontWeight: 'var(--font-weight-h6)' }],
        'body': ['var(--font-size-body)', { lineHeight: 'var(--line-height-body)', fontWeight: 'var(--font-weight-body)' }],
        'meta': ['var(--font-size-meta)', { lineHeight: 'var(--line-height-meta)', fontWeight: 'var(--font-weight-meta)' }],
        'mono': ['var(--font-size-mono)', { lineHeight: 'var(--line-height-mono)', fontWeight: 'var(--font-weight-mono)', fontFamily: 'var(--font-family-mono)' }],
      },
      
      fontWeight: {
        'normal': 'var(--font-weight-normal)',
        'medium': 'var(--font-weight-medium)',
        'semibold': 'var(--font-weight-semibold)',
        'bold': 'var(--font-weight-bold)',
      },
      
      lineHeight: {
        'tight': 'var(--line-height-tight)',
        'normal': 'var(--line-height-normal)',
        'relaxed': 'var(--line-height-relaxed)',
      },
      
      spacing: {
        '0': 'var(--spacing-0)',
        '1': 'var(--spacing-1)',
        '2': 'var(--spacing-2)',
        '3': 'var(--spacing-3)',
        '4': 'var(--spacing-4)',
        '5': 'var(--spacing-5)',
        '6': 'var(--spacing-6)',
        '8': 'var(--spacing-8)',
        '10': 'var(--spacing-10)',
        '12': 'var(--spacing-12)',
        '16': 'var(--spacing-16)',
        '20': 'var(--spacing-20)',
        '24': 'var(--spacing-24)',
        '32': 'var(--spacing-32)',
        '40': 'var(--spacing-40)',
        '48': 'var(--spacing-48)',
        '56': 'var(--spacing-56)',
        '64': 'var(--spacing-64)',
      },
      
      borderRadius: {
        'none': 'var(--radius-none)',
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        'full': 'var(--radius-full)',
      },
      
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        'focus': 'var(--shadow-focus)',
        'portal': 'var(--shadow-portal)',
      },
      
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
        'reduced': 'var(--duration-reduced)',
      },
      
      transitionTimingFunction: {
        'linear': 'var(--easing-linear)',
        'ease': 'var(--easing-ease)',
        'ease-in': 'var(--easing-ease-in)',
        'ease-out': 'var(--easing-ease-out)',
        'ease-in-out': 'var(--easing-ease-in-out)',
        'spring-bounce': 'var(--easing-spring-bounce)',
        'spring-smooth': 'var(--easing-spring-smooth)',
      },
      
      screens: {
        'sm': 'var(--breakpoint-sm)',
        'md': 'var(--breakpoint-md)',
        'lg': 'var(--breakpoint-lg)',
        'xl': 'var(--breakpoint-xl)',
        '2xl': 'var(--breakpoint-2xl)',
      },
      
      zIndex: {
        'hide': 'var(--z-hide)',
        'auto': 'var(--z-auto)',
        'base': 'var(--z-base)',
        'docked': 'var(--z-docked)',
        'dropdown': 'var(--z-dropdown)',
        'sticky': 'var(--z-sticky)',
        'banner': 'var(--z-banner)',
        'overlay': 'var(--z-overlay)',
        'modal': 'var(--z-modal)',
        'popover': 'var(--z-popover)',
        'skip-link': 'var(--z-skip-link)',
        'toast': 'var(--z-toast)',
        'tooltip': 'var(--z-tooltip)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
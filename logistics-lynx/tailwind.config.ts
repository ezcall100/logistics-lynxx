import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  corePlugins: {
    preflight: false,
  },
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Unified Design System Colors
        bg: "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-tertiary": "var(--bg-tertiary)",
        "bg-elevated": "var(--bg-elevated)",
        "bg-overlay": "var(--bg-overlay)",
        "bg-glass": "var(--bg-glass)",
        
        surface: "var(--bg-elevated)",
        "surface-2": "var(--bg-secondary)",
        "surface-3": "var(--bg-tertiary)",
        "surface-4": "var(--bg-tertiary)",
        
        text: "var(--text-primary)",
        "text-muted": "var(--text-secondary)",
        "text-subtle": "var(--text-tertiary)",
        "text-inverse": "var(--text-inverse)",
        
        border: "var(--border-medium)",
        "border-strong": "var(--border-strong)",
        "border-subtle": "var(--border-light)",
        
        primary: {
          DEFAULT: "var(--primary-500)",
          contrast: "var(--text-inverse)",
          hover: "var(--primary-600)",
          active: "var(--primary-700)",
          subtle: "var(--primary-50)",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
        },
        
        secondary: {
          DEFAULT: "var(--text-secondary)",
          contrast: "var(--text-inverse)",
          hover: "var(--text-primary)",
          active: "var(--text-primary)",
          subtle: "var(--bg-secondary)",
        },
        
        success: {
          DEFAULT: "var(--success-500)",
          contrast: "var(--text-inverse)",
          hover: "var(--success-600)",
          subtle: "var(--success-50)",
          50: "var(--success-50)",
          500: "var(--success-500)",
          600: "var(--success-600)",
        },
        
        warning: {
          DEFAULT: "var(--warning-500)",
          contrast: "var(--text-inverse)",
          hover: "var(--warning-600)",
          subtle: "var(--warning-50)",
          50: "var(--warning-50)",
          500: "var(--warning-500)",
          600: "var(--warning-600)",
        },
        
        destructive: {
          DEFAULT: "var(--error-500)",
          contrast: "var(--text-inverse)",
          hover: "var(--error-600)",
          subtle: "var(--error-50)",
          50: "var(--error-50)",
          500: "var(--error-500)",
          600: "var(--error-600)",
        },
        
        muted: {
          DEFAULT: "var(--bg-secondary)",
          contrast: "var(--text-secondary)",
          hover: "var(--bg-tertiary)",
          subtle: "var(--bg-tertiary)",
        },
        
        // Portal Colors
        "super-admin": "var(--super-admin)",
        carrier: "var(--carrier)",
        broker: "var(--broker)",
        shipper: "var(--shipper)",
        driver: "var(--driver)",
        "owner-operator": "var(--owner-operator)",
        factoring: "var(--factoring)",
        
        // Legacy shadcn/ui compatibility
        background: "var(--bg)",
        foreground: "var(--text)",
        input: "var(--border)",
        ring: "var(--primary)",
        popover: {
          DEFAULT: "var(--surface)",
          foreground: "var(--text)",
        },
        card: {
          DEFAULT: "var(--surface)",
          foreground: "var(--text)",
        },
        accent: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-contrast)",
        },
      },

      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },

      fontFamily: {
        sans: ["var(--font-primary)"],
        heading: ["var(--font-primary)"],
        body: ["var(--font-primary)"],
        mono: ["var(--font-mono)"],
      },

      fontSize: {
        xs: ["var(--text-xs)", { lineHeight: "var(--leading-tight)" }],
        sm: ["var(--text-sm)", { lineHeight: "var(--leading-normal)" }],
        base: ["var(--text-base)", { lineHeight: "var(--leading-normal)" }],
        lg: ["var(--text-lg)", { lineHeight: "var(--leading-relaxed)" }],
        xl: ["var(--text-xl)", { lineHeight: "var(--leading-tight)" }],
        "2xl": ["var(--text-2xl)", { lineHeight: "var(--leading-tight)" }],
        "3xl": ["var(--text-3xl)", { lineHeight: "var(--leading-tight)" }],
        "4xl": ["var(--text-4xl)", { lineHeight: "var(--leading-tight)" }],
        "5xl": ["var(--text-5xl)", { lineHeight: "var(--leading-tight)" }],
        "6xl": ["var(--text-6xl)", { lineHeight: "var(--leading-tight)" }],
      },

      spacing: {
        // Unified spacing system
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        8: "var(--space-8)",
        10: "var(--space-10)",
        12: "var(--space-12)",
        16: "var(--space-16)",
        20: "var(--space-20)",
        24: "var(--space-24)",
        
        // Additional spacing for specific use cases
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
        144: "36rem",
      },

      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        
        // Additional shadows for specific use cases
        premium: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "premium-lg": "0 35px 60px -12px rgba(0, 0, 0, 0.3)",
        "inner-lg": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        glow: "0 0 20px rgba(59, 130, 246, 0.5)",
        "glow-lg": "0 0 40px rgba(59, 130, 246, 0.6)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(10px) scale(0.95)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-out": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(-100%)", opacity: "0" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9) translateY(10px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "scale-out": {
          "0%": { opacity: "1", transform: "scale(1) translateY(0)" },
          "100%": { opacity: "0", transform: "scale(0.9) translateY(10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "bounce-subtle": {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-5%)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-out": "fade-out 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-in": "slide-in 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-out": "slide-out 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "scale-in": "scale-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "scale-out": "scale-out 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 2s infinite",
      },

      backdropBlur: {
        xs: "2px",
      },

      screens: {
        xs: "475px",
        "3xl": "1600px",
      },

      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "2/3": "2 / 3",
        "9/16": "9 / 16",
      },
    },
  },
  plugins: [],
};

export default config;

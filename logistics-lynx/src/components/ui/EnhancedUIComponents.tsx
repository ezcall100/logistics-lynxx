import { useState } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Search, Filter, X, ChevronDown, ChevronUp, RefreshCw, Package, Eye } from 'lucide-react';

// Stable Design System - No Flashing, Eye-Friendly, KPI-Focused
export const stableStyles = {
  // 🌈 Stable Color Palette - No Flashing, Eye-Friendly
  primary: {
    light: "bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30",
    dark: "bg-gradient-to-br from-slate-900 via-blue-900/20 to-indigo-900/20"
  },
  secondary: {
    light: "bg-white",
    dark: "bg-slate-800"
  },
  accent: {
    light: "bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600",
    dark: "bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-500"
  },
  accentHover: {
    light: "bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-700",
    dark: "bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600"
  },
  
  // 🌊 Stable Glassmorphism - No Flashing
  glass: {
    light: "bg-white/15 backdrop-blur-xl border border-white/25 shadow-lg",
    dark: "bg-slate-800/15 backdrop-blur-xl border border-slate-700/25 shadow-lg"
  },
  glassHover: {
    light: "bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl",
    dark: "bg-slate-800/20 backdrop-blur-xl border border-slate-700/30 shadow-xl"
  },
  glassDark: {
    light: "bg-slate-900/8 backdrop-blur-xl border border-slate-800/15",
    dark: "bg-black/15 backdrop-blur-xl border border-slate-900/15"
  },
  
  // 🏗️ Stable Surfaces - No Flashing
  surface: {
    light: "bg-white/90 backdrop-blur-lg border border-slate-200/50 shadow-lg",
    dark: "bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 shadow-lg"
  },
  surfaceHover: {
    light: "bg-white/95 backdrop-blur-lg border border-slate-300/50 shadow-xl",
    dark: "bg-slate-800/95 backdrop-blur-lg border border-slate-600/50 shadow-xl"
  },
  surfaceElevated: {
    light: "bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 backdrop-blur-lg border border-slate-200/60 shadow-xl",
    dark: "bg-gradient-to-br from-slate-800 via-blue-900/20 to-indigo-900/20 backdrop-blur-lg border border-slate-700/60 shadow-xl"
  },
  
  // 📝 Stable Typography - Eye-Friendly
  textPrimary: {
    light: "text-slate-800 font-semibold",
    dark: "text-slate-100 font-semibold"
  },
  textSecondary: {
    light: "text-slate-600",
    dark: "text-slate-300"
  },
  textAccent: {
    light: "text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600",
    dark: "text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400"
  },
  textMuted: {
    light: "text-slate-500",
    dark: "text-slate-400"
  },
  
  // 🎯 Stable Borders & Shadows - Subtle
  border: {
    light: "border border-slate-200/50",
    dark: "border border-slate-700/50"
  },
  borderAccent: {
    light: "border border-teal-200/50",
    dark: "border border-teal-700/50"
  },
  shadow: {
    light: "shadow-lg shadow-slate-900/5",
    dark: "shadow-lg shadow-black/15"
  },
  shadowHover: {
    light: "shadow-xl shadow-slate-900/8",
    dark: "shadow-xl shadow-black/20"
  },
  shadowGlow: {
    light: "shadow-md shadow-teal-500/15",
    dark: "shadow-md shadow-teal-400/15"
  },
  
  // ⚡ Stable Micro-interactions - No Flashing
  transition: "transition-all duration-300 ease-out",
  transitionFast: "transition-all duration-200 ease-out",
  transitionSlow: "transition-all duration-500 ease-out",
  transitionSmooth: "transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1)",
  
  // 🌊 Stable Gradients - Subtle
  gradientPrimary: {
    light: "bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/20",
    dark: "bg-gradient-to-br from-slate-900 via-blue-900/15 to-indigo-900/15"
  },
  gradientAccent: {
    light: "bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600",
    dark: "bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-500"
  },
  gradientSurface: {
    light: "bg-gradient-to-br from-white via-blue-50/10 to-indigo-50/10",
    dark: "bg-gradient-to-br from-slate-800 via-blue-900/10 to-indigo-900/10"
  },
  gradientGlass: {
    light: "bg-gradient-to-br from-white/15 via-teal-50/5 to-transparent",
    dark: "bg-gradient-to-br from-slate-800/15 via-teal-900/5 to-transparent"
  },
  
  // 🎭 Stable Animations - No Flashing
  animateFloat: "animate-pulse",
  animateGlow: "animate-pulse",
  animateSlide: "animate-in slide-in-from-top-2 duration-300",
  animateFade: "animate-in fade-in duration-300",
  animateScale: "animate-in zoom-in-95 duration-300",
  animateRotate: "animate-spin",
  animatePulse: "animate-pulse"
};

// 🌟 Enhanced Button Component
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'premium';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  premium?: boolean;
  mode?: 'light' | 'dark';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md", 
  className = "", 
  icon, 
  loading = false, 
  premium = false, 
  mode = "light", 
  disabled = false,
  type = "button",
  ...props 
}) => {
  const variants = {
    primary: {
      light: "bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 hover:from-teal-600 hover:via-blue-600 hover:to-indigo-700 text-white shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/25 hover:scale-[1.02]",
      dark: "bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-500 hover:from-teal-500 hover:via-blue-500 hover:to-indigo-600 text-white shadow-lg shadow-teal-400/20 hover:shadow-xl hover:shadow-teal-400/25 hover:scale-[1.02]"
    },
    secondary: {
      light: "bg-white/90 backdrop-blur-sm border border-slate-200/50 text-slate-700 hover:bg-white hover:border-slate-300 shadow-md hover:shadow-lg hover:scale-[1.02]",
      dark: "bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:border-slate-600 shadow-md hover:shadow-lg hover:scale-[1.02]"
    },
    ghost: {
      light: "bg-transparent text-slate-600 hover:bg-slate-100/50 hover:text-slate-800 hover:scale-[1.02]",
      dark: "bg-transparent text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 hover:scale-[1.02]"
    },
    danger: {
      light: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/20 hover:shadow-xl hover:scale-[1.02]",
      dark: "bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-400/20 hover:shadow-xl hover:scale-[1.02]"
    },
    success: {
      light: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:scale-[1.02]",
      dark: "bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-lg shadow-emerald-400/20 hover:shadow-xl hover:scale-[1.02]"
    },
    premium: {
      light: "bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 hover:from-teal-600 hover:via-blue-600 hover:to-indigo-700 text-white shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 hover:scale-[1.02]",
      dark: "bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-500 hover:from-teal-500 hover:via-blue-500 hover:to-indigo-600 text-white shadow-lg shadow-teal-400/25 hover:shadow-xl hover:shadow-teal-400/30 hover:scale-[1.02]"
    }
  };
  
  const sizes = {
    sm: "px-4 py-2.5 text-sm font-medium",
    md: "px-6 py-3 text-sm font-semibold",
    lg: "px-8 py-4 text-base font-bold"
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`${variants[variant][mode]} ${sizes[size]} ${stableStyles.transitionSmooth} rounded-xl font-medium ${loading || disabled ? 'opacity-75 cursor-not-allowed' : ''} ${premium ? 'animate-pulse' : ''} ${className}`}
      {...props}
    >
      <div className="flex items-center justify-center space-x-2">
        {loading && (
          <RefreshCw className="w-4 h-4 animate-spin" />
        )}
        {icon && !loading && <span className="text-lg">{icon}</span>}
        <span>{children}</span>
      </div>
    </button>
  );
};

// 🎨 Enhanced Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  elevated?: boolean;
  premium?: boolean;
  animated?: boolean;
  mode?: 'light' | 'dark';
  onClick?: () => void;
}

export const EnhancedCard: React.FC<ResponsiveCardProps> = ({ 
  children, 
  className = "", 
  hover = true, 
  glass = false, 
  elevated = false, 
  premium = false, 
  animated = false, 
  mode = "light",
  onClick,
  ...props 
}) => (
  <div 
    onClick={onClick}
    className={`${glass ? stableStyles.glass[mode] : elevated ? stableStyles.surfaceElevated[mode] : stableStyles.surface[mode]} rounded-2xl p-6 ${hover ? stableStyles.transitionSmooth + ' hover:' + (glass ? stableStyles.glassHover[mode] : stableStyles.surfaceHover[mode]) + ' hover:scale-[1.01]' : ''} ${animated ? 'animate-pulse' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`} 
    {...props}
  >
    {children}
  </div>
);

// 📝 Enhanced Input Component
interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  icon?: React.ReactNode;
  error?: string;
  success?: boolean;
  premium?: boolean;
  mode?: 'light' | 'dark';
  type?: string;
  disabled?: boolean;
  required?: boolean;
}

export const EnhancedInput: React.FC<InputProps> = ({ 
  placeholder, 
  value, 
  onChange, 
  className = "", 
  icon, 
  error, 
  success, 
  premium = false, 
  mode = "light",
  type = "text",
  disabled = false,
  required = false,
  ...props 
}) => (
  <div className="relative">
    {icon && (
      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg">
        {icon}
      </span>
    )}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={`w-full px-4 py-3 ${icon ? 'pl-12' : ''} ${mode === "light" ? 'bg-white/80' : 'bg-slate-800/80'} backdrop-blur-sm border ${error ? 'border-red-300' : success ? 'border-emerald-300' : mode === "light" ? 'border-slate-200/50' : 'border-slate-700/50'} rounded-xl focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500/30' : success ? 'focus:ring-emerald-500/30' : 'focus:ring-teal-500/30'} focus:border-teal-500 ${stableStyles.transitionSmooth} ${mode === "light" ? 'text-slate-700 placeholder-slate-400' : 'text-white placeholder-slate-500'} ${premium ? 'animate-pulse' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    />
    {error && (
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 text-sm">⚠️</span>
    )}
    {success && (
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-500 text-sm">✅</span>
    )}
  </div>
);

// 🏷️ Enhanced Badge Component
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'live' | 'premium';
  className?: string;
  pulse?: boolean;
  premium?: boolean;
  mode?: 'light' | 'dark';
}

export const EnhancedBadge: React.FC<BadgeProps> = ({ 
  children, 
  variant = "default", 
  className = "", 
  pulse = false, 
  premium = false, 
  mode = "light" 
}) => {
  const variants = {
    default: {
      light: "bg-gradient-to-r from-teal-100 to-indigo-100 text-teal-800 border border-teal-200/50",
      dark: "bg-gradient-to-r from-teal-900 to-indigo-900 text-teal-200 border border-teal-700/50"
    },
    success: {
      light: "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200/50",
      dark: "bg-gradient-to-r from-emerald-900 to-green-900 text-emerald-200 border border-emerald-700/50"
    },
    warning: {
      light: "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200/50",
      dark: "bg-gradient-to-r from-amber-900 to-yellow-900 text-amber-200 border border-amber-700/50"
    },
    danger: {
      light: "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200/50",
      dark: "bg-gradient-to-r from-red-900 to-pink-900 text-red-200 border border-red-700/50"
    },
    live: {
      light: "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200/50",
      dark: "bg-gradient-to-r from-emerald-900 to-green-900 text-emerald-200 border border-emerald-700/50"
    },
    premium: {
      light: "bg-gradient-to-r from-teal-100 to-indigo-100 text-teal-800 border border-teal-200/50",
      dark: "bg-gradient-to-r from-teal-900 to-indigo-900 text-teal-200 border border-teal-700/50"
    }
  };
  
  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${variants[variant][mode]} ${stableStyles.shadow[mode]} ${pulse ? 'animate-pulse' : ''} ${premium ? 'animate-pulse' : ''} ${className}`}>
      {children}
    </span>
  );
};

// 📊 Enhanced Table Component
interface TableColumn {
  key: string;
  title: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  className?: string;
  mode?: 'light' | 'dark';
  sortable?: boolean;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  selectable?: boolean;
  onSelectionChange?: (selectedRows: any[]) => void;
  selectedRows?: any[];
  loading?: boolean;
  emptyMessage?: string;
}

export const EnhancedTable: React.FC<TableProps> = ({
  columns,
  data,
  className = "",
  mode = "light",
  sortable = false,
  onSort,
  sortColumn,
  sortDirection,
  selectable = false,
  onSelectionChange,
  selectedRows = [],
  loading = false,
  emptyMessage = "No data available"
}) => {
  const [selected, setSelected] = useState<any[]>(selectedRows);

  const handleSort = (key: string) => {
    if (!sortable || !onSort) return;
    const direction = sortColumn === key && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(key, direction);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelected = checked ? data : [];
    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  const handleSelectRow = (row: any, checked: boolean) => {
    const newSelected = checked 
      ? [...selected, row]
      : selected.filter(r => r.id !== row.id);
    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  if (loading) {
    return (
      <div className={`${stableStyles.surface[mode]} rounded-xl p-8 ${className}`}>
        <div className="flex items-center justify-center space-x-2">
          <RefreshCw className="w-6 h-6 animate-spin text-teal-500" />
          <span className={stableStyles.textSecondary[mode]}>Loading data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${stableStyles.surface[mode]} rounded-xl overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${mode === "light" ? 'bg-slate-50' : 'bg-slate-800'}`}>
            <tr>
              {selectable && (
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selected.length === data.length && data.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left ${stableStyles.textPrimary[mode]} ${column.sortable && sortable ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700' : ''}`}
                  onClick={() => column.sortable && handleSort(column.key)}
                  style={{ width: column.width }}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.title}</span>
                    {column.sortable && sortable && (
                      <div className="flex flex-col">
                        <ChevronUp className={`w-3 h-3 ${sortColumn === column.key && sortDirection === 'asc' ? 'text-teal-500' : 'text-slate-400'}`} />
                        <ChevronDown className={`w-3 h-3 ${sortColumn === column.key && sortDirection === 'desc' ? 'text-teal-500' : 'text-slate-400'}`} />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <Package className="w-8 h-8 text-slate-400" />
                    <span className={stableStyles.textMuted[mode]}>{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row.id || index}
                  className={`${index % 2 === 0 ? (mode === "light" ? 'bg-white' : 'bg-slate-800') : (mode === "light" ? 'bg-slate-50' : 'bg-slate-750')} hover:${mode === "light" ? 'bg-slate-100' : 'bg-slate-700'} ${stableStyles.transitionFast}`}
                >
                  {selectable && (
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selected.some(r => r.id === row.id)}
                        onChange={(e) => handleSelectRow(row, e.target.checked)}
                        className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 🔍 Enhanced Search Component
interface SearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  mode?: 'light' | 'dark';
  onSearch?: (query: string) => void;
  suggestions?: string[];
  loading?: boolean;
}

export const EnhancedSearch: React.FC<SearchProps> = ({
  placeholder = "Search...",
  value = "",
  onChange,
  className = "",
  mode = "light",
  onSearch,
  suggestions = [],
  loading = false
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
    setShowSuggestions(newValue.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    onChange?.(suggestion);
    setShowSuggestions(false);
    onSearch?.(suggestion);
  };

  const handleSearch = () => {
    onSearch?.(inputValue);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <EnhancedInput
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          icon={<Search className="w-4 h-4" />}
          mode={mode}
          className="pr-12"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-slate-400 hover:text-teal-500 transition-colors"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </button>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className={`absolute top-full left-0 right-0 mt-2 ${stableStyles.surface[mode]} rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto`}>
          {suggestions.map((suggestion) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`px-4 py-3 cursor-pointer hover:${mode === "light" ? 'bg-slate-100' : 'bg-slate-700'} ${stableStyles.transitionFast} ${index === 0 ? 'rounded-t-xl' : ''} ${index === suggestions.length - 1 ? 'rounded-b-xl' : ''}`}
            >
              <span className={stableStyles.textSecondary[mode]}>{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 📈 Enhanced Progress Component
interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  premium?: boolean;
  mode?: 'light' | 'dark';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export const EnhancedProgress: React.FC<ProgressProps> = ({ 
  value, 
  max = 100, 
  className = "", 
  premium = false, 
  mode = "light",
  showLabel = false,
  size = "md",
  variant = "default"
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizes = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3"
  };
  
  const variants = {
    default: {
      light: "bg-gradient-to-r from-teal-500 to-indigo-500",
      dark: "bg-gradient-to-r from-teal-400 to-indigo-400"
    },
    success: {
      light: "bg-gradient-to-r from-emerald-500 to-green-500",
      dark: "bg-gradient-to-r from-emerald-400 to-green-400"
    },
    warning: {
      light: "bg-gradient-to-r from-amber-500 to-yellow-500",
      dark: "bg-gradient-to-r from-amber-400 to-yellow-400"
    },
    danger: {
      light: "bg-gradient-to-r from-red-500 to-pink-500",
      dark: "bg-gradient-to-r from-red-400 to-pink-400"
    }
  };
  
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm ${stableStyles.textSecondary[mode]}`}>Progress</span>
          <span className={`text-sm font-semibold ${stableStyles.textPrimary[mode]}`}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={`w-full ${mode === "light" ? 'bg-slate-200/30' : 'bg-slate-700/30'} rounded-full ${sizes[size]} ${premium ? 'animate-pulse' : ''}`}>
        <div 
          className={`${sizes[size]} rounded-full transition-all duration-500 ease-out ${variants[variant][mode]}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// 🎯 Enhanced Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  mode?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const EnhancedModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  mode = "light",
  size = "md"
}) => {
  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative ${stableStyles.surface[mode]} rounded-2xl shadow-2xl ${sizes[size]} w-full ${className}`}>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-slate-200/50 dark:border-slate-700/50">
            <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]}`}>
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// 📊 Enhanced Data Grid Component
interface DataGridProps {
  data: any[];
  columns: TableColumn[];
  className?: string;
  mode?: 'light' | 'dark';
  pagination?: boolean;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  totalPages?: number;
  searchable?: boolean;
  onSearch?: (query: string) => void;
  filterable?: boolean;
  filters?: any;
  onFilterChange?: (filters: any) => void;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: any[]) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export const EnhancedDataGrid: React.FC<DataGridProps> = ({
  data,
  columns,
  className = "",
  mode = "light",
  pagination = false,
  pageSize = 10,
  currentPage = 1,
  onPageChange,
  totalPages = 1,
  searchable = false,
  onSearch,
  filterable = false,
  filters = {},
  onFilterChange,
  selectable = false,
  onSelectionChange,
  loading = false,
  emptyMessage = "No data available"
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleSelectionChange = (rows: any[]) => {
    setSelectedRows(rows);
    onSelectionChange?.(rows);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and Filters */}
      {(searchable || filterable) && (
        <div className={`${stableStyles.surface[mode]} rounded-xl p-4`}>
          <div className="flex flex-col sm:flex-row gap-4">
            {searchable && (
              <div className="flex-1">
                <EnhancedSearch
                  placeholder="Search data..."
                  value={searchQuery}
                  onChange={handleSearch}
                  mode={mode}
                />
              </div>
            )}
            {filterable && (
              <div className="flex gap-2">
                  <EnhancedButton

                    variant="secondary"
                  size="sm"
                  icon={<Filter className="w-4 h-4" />}
                  mode={mode}
                >
                  Filters
                </EnhancedButton>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <EnhancedTable
        columns={columns}
        data={data}
        mode={mode}
        selectable={selectable}
        onSelectionChange={handleSelectionChange}
        loading={loading}
        emptyMessage={emptyMessage}
      />

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className={`${stableStyles.surface[mode]} rounded-xl p-4`}>
          <div className="flex items-center justify-between">
            <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <EnhancedButton
                variant="secondary"
                size="sm"
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={currentPage === 1}
                mode={mode}
              >
                Previous
              </EnhancedButton>
              <EnhancedButton
                variant="secondary"
                size="sm"
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={currentPage === totalPages}
                mode={mode}
              >
                Next
              </EnhancedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Default export for backward compatibility
export default {
  EnhancedCard,
  EnhancedInput,
  EnhancedBadge,
  EnhancedTable,
  EnhancedSearch,
  EnhancedProgress,
  EnhancedModal,
  EnhancedDataGrid,
  stableStyles
};

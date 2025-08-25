import React, { ReactNode, useState } from 'react';

interface NavigationItem {
  key: string;
  title: string;
  icon?: string;
  path?: string;
  badge?: string;
  onClick?: () => void;
  children?: NavigationItem[];
}

interface ResponsiveNavigationProps {
  items: NavigationItem[];
  className?: string;
  mode?: 'light' | 'dark';
  orientation?: 'horizontal' | 'vertical';
}

const ResponsiveNavigation: React.FC<ResponsiveNavigationProps> = ({
  items,
  className = '',
  mode = 'light',
  orientation = 'horizontal'
}) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const baseClasses = `${
    orientation === 'horizontal' 
      ? 'flex flex-row space-x-2 overflow-x-auto' 
      : 'flex flex-col space-y-1'
  } ${className}`;

  const itemClasses = `flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
    mode === 'light' 
      ? 'hover:bg-slate-100 text-slate-700' 
      : 'hover:bg-slate-700 text-slate-300'
  }`;

  const renderItem = (item: NavigationItem) => (
    <div key={item.key} className="relative">
      <div 
        className={itemClasses}
        onClick={() => {
          if (item.children) {
            toggleItem(item.key);
          } else if (item.onClick) {
            item.onClick();
          }
        }}
      >
        {item.icon && <span className="text-lg">{item.icon}</span>}
        <span className="font-medium text-sm sm:text-base">{item.title}</span>
        {item.badge && (
          <span className={`px-2 py-1 text-xs rounded-full ${
            mode === 'light' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-blue-900 text-blue-200'
          }`}>
            {item.badge}
          </span>
        )}
        {item.children && (
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${
              expandedItems[item.key] ? 'rotate-180' : ''
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>
      
      {item.children && expandedItems[item.key] && (
        <div className={`${
          orientation === 'horizontal' 
            ? 'absolute top-full left-0 mt-1' 
            : 'ml-4 mt-1'
        } ${
          mode === 'light' 
            ? 'bg-white border border-slate-200' 
            : 'bg-slate-800 border border-slate-700'
        } rounded-lg shadow-lg z-50 min-w-48`}>
          {item.children.map(child => (
            <div 
              key={child.key}
              className="px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer text-sm"
              onClick={child.onClick}
            >
              <div className="flex items-center space-x-2">
                {child.icon && <span>{child.icon}</span>}
                <span>{child.title}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav className={baseClasses}>
      {items.map(renderItem)}
    </nav>
  );
};

export default ResponsiveNavigation;

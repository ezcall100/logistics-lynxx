import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
  showHome?: boolean;
  homeHref?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className,
  separator = <ChevronRight className="h-4 w-4 text-text-tertiary" />,
  showHome = true,
  homeHref = '/',
}) => {
  const allItems = showHome 
    ? [{ label: 'Home', href: homeHref, icon: <Home className="h-4 w-4" /> }, ...items]
    : items;

  return (
    <nav className={cn('flex items-center space-x-2 text-sm', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isLink = item.href && !isLast;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 flex-shrink-0" aria-hidden="true">
                  {separator}
                </span>
              )}
              
              {isLink ? (
                <a
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-1 text-text-secondary hover:text-text-primary',
                    'transition-colors duration-200 focus:outline-none focus:ring-2',
                    'focus:ring-brand-primary-500 focus:ring-offset-2 focus:ring-offset-canvas rounded'
                  )}
                >
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </a>
              ) : (
                <span
                  className={cn(
                    'flex items-center space-x-1',
                    isLast ? 'text-text-primary font-medium' : 'text-text-secondary'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

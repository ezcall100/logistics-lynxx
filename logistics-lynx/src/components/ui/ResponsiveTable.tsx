import React, { ReactNode } from 'react';

interface ResponsiveTableProps {
  children: ReactNode;
  className?: string;
  mode?: 'light' | 'dark';
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  children,
  className = '',
  mode = 'light'
}) => {
  const baseClasses = `w-full ${
    mode === 'light' 
      ? 'bg-white border border-slate-200' 
      : 'bg-slate-800 border border-slate-700'
  } rounded-lg overflow-hidden`;

  return (
    <div className="w-full overflow-x-auto">
      <table className={`${baseClasses} ${className}`}>
        {children}
      </table>
    </div>
  );
};

interface ResponsiveTableHeaderProps {
  children: ReactNode;
  className?: string;
  mode?: 'light' | 'dark';
}

export const ResponsiveTableHeader: React.FC<ResponsiveTableHeaderProps> = ({
  children,
  className = '',
  mode = 'light'
}) => {
  const headerClasses = `${
    mode === 'light' 
      ? 'bg-slate-50 border-b border-slate-200' 
      : 'bg-slate-700 border-b border-slate-600'
  } ${className}`;

  return (
    <thead className={headerClasses}>
      {children}
    </thead>
  );
};

interface ResponsiveTableRowProps {
  children: ReactNode;
  className?: string;
  mode?: 'light' | 'dark';
  hover?: boolean;
}

export const ResponsiveTableRow: React.FC<ResponsiveTableRowProps> = ({
  children,
  className = '',
  mode = 'light',
  hover = true
}) => {
  const rowClasses = `${
    mode === 'light' 
      ? 'border-b border-slate-100' 
      : 'border-b border-slate-700'
  } ${hover ? 'hover:bg-slate-50 dark:hover:bg-slate-700' : ''} ${className}`;

  return (
    <tr className={rowClasses}>
      {children}
    </tr>
  );
};

interface ResponsiveTableCellProps {
  children: ReactNode;
  className?: string;
  mode?: 'light' | 'dark';
  isHeader?: boolean;
}

export const ResponsiveTableCell: React.FC<ResponsiveTableCellProps> = ({
  children,
  className = '',
  mode = 'light',
  isHeader = false
}) => {
  const cellClasses = `px-3 py-2 sm:px-4 sm:py-3 text-sm ${
    isHeader 
      ? 'font-semibold text-left' 
      : 'text-left'
  } ${
    mode === 'light' 
      ? 'text-slate-900' 
      : 'text-slate-100'
  } ${className}`;

  const Element = isHeader ? 'th' : 'td';

  return (
    <Element className={cellClasses}>
      {children}
    </Element>
  );
};

export default ResponsiveTable;

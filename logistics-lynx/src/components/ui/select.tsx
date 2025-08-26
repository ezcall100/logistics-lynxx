import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface SelectProps {
  children: ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({ children, value, onValueChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === SelectTrigger) {
            return React.cloneElement(child, {
              isOpen,
              setIsOpen,
              selectedValue,
              disabled
            });
          }
          if (child.type === SelectContent) {
            return React.cloneElement(child, {
              isOpen,
              onSelect: handleSelect
            });
          }
        }
        return child;
      })}
    </div>
  );
};

interface SelectTriggerProps {
  children: ReactNode;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  selectedValue?: string;
  disabled?: boolean;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ 
  children, 
  isOpen, 
  setIsOpen, 
  selectedValue, 
  disabled = false 
}) => {
  return (
    <div
      className={`relative w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white cursor-pointer ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'
      }`}
      onClick={() => !disabled && setIsOpen?.(!isOpen)}
    >
      <div className="flex items-center justify-between">
        <span className="text-gray-900">
          {selectedValue || 'Select an option...'}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

interface SelectContentProps {
  children: ReactNode;
  isOpen?: boolean;
  onSelect?: (value: string) => void;
}

export const SelectContent: React.FC<SelectContentProps> = ({ children, isOpen, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
      <div className="py-1">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === SelectItem) {
            return React.cloneElement(child, { onSelect });
          }
          return child;
        })}
      </div>
    </div>
  );
};

interface SelectItemProps {
  children: ReactNode;
  value: string;
  onSelect?: (value: string) => void;
}

export const SelectItem: React.FC<SelectItemProps> = ({ children, value, onSelect }) => {
  return (
    <div
      className="px-3 py-2 text-sm text-gray-900 cursor-pointer hover:bg-gray-100"
      onClick={() => onSelect?.(value)}
    >
      {children}
    </div>
  );
};

export const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => {
  return <span>{placeholder}</span>;
};

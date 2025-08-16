/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TabItem {
  id: string;
  label: string;
}

interface DashboardTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const DashboardTabs = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}: DashboardTabsProps) => {
  return (
    <div className={cn("border-b", className)}>
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "relative py-3 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardTabs;

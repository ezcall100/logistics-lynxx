// Enhanced Sidebar System Exports

// Main Components
export { default as EnhancedSidebar } from './EnhancedSidebar';
export { default as EnhancedSidebarLayout } from './EnhancedSidebarLayout';
export { default as EnhancedSidebarExample } from './EnhancedSidebarExample';

// Configuration
export { 
  getSidebarConfig, 
  getDefaultFavorites, 
  getDefaultRecentItems,
  tmsSidebarConfig,
  superAdminSidebarConfig 
} from './EnhancedSidebarConfig';

// Types
export type { 
  EnhancedSidebarItem, 
  SidebarSection, 
  EnhancedSidebarProps 
} from './EnhancedSidebar';

// Styles
export './enhanced-sidebar-styles.css';

// Usage Instructions
export { EnhancedSidebarUsage } from './EnhancedSidebarExample';

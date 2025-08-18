// Enterprise Sidebar System Exports

// Main Components
export { default as EnterpriseSidebar } from './EnterpriseSidebar';
export { EnterpriseLayout } from '../layout/EnterpriseLayout';

// Configuration
export { 
  enterpriseSidebarConfig,
  superAdminSidebarConfig,
  getPortalSidebarConfig 
} from './EnterpriseSidebarConfig';

// Types
export type { 
  EnterpriseSidebarItem,
  EnterpriseSidebarSection,
  EnterpriseSidebarProps 
} from './EnterpriseSidebar';

// Legacy exports for backward compatibility
export { default as EnhancedSidebar } from './EnhancedSidebar';
export { default as EnhancedSidebarLayout } from './EnhancedSidebarLayout';
export { default as EnhancedSidebarExample } from './EnhancedSidebarExample';
export { default as EnhancedSidebarConfig } from './EnhancedSidebarConfig';
export { default as SidebarMenuItem } from './SidebarMenuItem';
export { default as SidebarMenuGroup } from './SidebarMenuGroup';
export { default as SidebarFooter } from './SidebarFooter';
export { default as SidebarHeader } from './SidebarHeader';
export { default as AIRecommendationsSection } from './AIRecommendationsSection';

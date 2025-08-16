/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import ModernHeader from './ModernHeader';
import ModernSidebar from './ModernSidebar';
interface ModernLayoutProps {
  children: React.ReactNode;
}
const ModernLayout: React.FC<ModernLayoutProps> = ({
  children
}) => {
  return <SidebarProvider defaultOpen={true}>
      
    </SidebarProvider>;
};
export default ModernLayout;
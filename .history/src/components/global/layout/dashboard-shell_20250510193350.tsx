"use client"

import React from 'react';
import { useSidebarState } from '@/hooks/use-sidebar-state';
import { useDeviceType } from '@/hooks/use-device-type';

interface DashboardShellProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({ 
  children, 
  sidebar,
  rightPanel
}) => {
  const { isSidebarOpen } = useSidebarState();
  const { isMobile, isTablet, isDesktop } = useDeviceType();
  
  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {isSidebarOpen && sidebar && (
        <aside className="w-80 border-r border-border h-full overflow-y-auto">
          {sidebar}
        </aside>
      )}
      
      <main className={`flex-1 overflow-auto ${isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
        {children}
      </main>
      
      {isDesktop && rightPanel && (
        <aside className="w-80 border-l border-border h-full overflow-y-auto">
          {rightPanel}
        </aside>
      )}
    </div>
  );
};
"use client"

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  isSidebarOpen: boolean;
  isRightPanelOpen: boolean;
  toggleSidebar: () => void;
  toggleRightPanel: () => void;
  setSidebarOpen: (open: boolean) => void;
  setRightPanelOpen: (open: boolean) => void;
}

export const useSidebarState = create<SidebarState>()(
  persist(
    (set) => ({
      isSidebarOpen: true,
      isRightPanelOpen: false,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      toggleRightPanel: () => set((state) => ({ isRightPanelOpen: !state.isRightPanelOpen })),
      setSidebarOpen: (open) => set({ isSidebarOpen: open }),
      setRightPanelOpen: (open) => set({ isRightPanelOpen: open }),
    }),
    {
      name: 'sidebar-storage',
    }
  )
);

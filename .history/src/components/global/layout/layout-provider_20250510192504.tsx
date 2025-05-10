"use client"

import React, { createContext, useState, useContext } from 'react';
import { timelineData } from '@/data/timeline';

interface LayoutContextType {
  showTaskList: boolean;
  showNotes: boolean;
  activeView: 'chat' | 'tasks' | 'notes';
  toggleTaskList: () => void;
  toggleNotes: () => void;
  setActiveView: (view: 'chat' | 'tasks' | 'notes') => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};

export const LayoutProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [showTaskList, setShowTaskList] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [activeView, setActiveView] = useState<'chat' | 'tasks' | 'notes'>('chat');

  const toggleTaskList = () => setShowTaskList(prev => !prev);
  const toggleNotes = () => setShowNotes(prev => !prev);

  return (
    <LayoutContext.Provider value={{
      showTaskList,
      showNotes,
      activeView,
      toggleTaskList,
      toggleNotes,
      setActiveView
    }}>
      {children}
    </LayoutContext.Provider>
  );
};
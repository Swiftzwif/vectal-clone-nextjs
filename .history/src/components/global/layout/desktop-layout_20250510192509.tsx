"use client"

import React from 'react';
import { useLayout } from './layout-provider';
import TaskList from '@/components/global/task-list';
import Notes from '@/components/global/notes';
import { timelineData } from '@/data/timeline';

export const DesktopLayout: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { showTaskList, showNotes } = useLayout();
  
  return (
    <div className="flex flex-col w-full relative overflow-hidden">
      <div className="ml-80 w-auto mt-7 rounded-lg h-full xl:w-[80%] xl:mr-96 sm:w-full md:ml-10 md:w-[80%] md:mr-96 lg:w-[80%] lg:mr-96 lg:ml-10 xl:ml-80">
        {showTaskList && <TaskList />}
        {showNotes && <Notes items={timelineData} />}
      </div>
      <div className="w-full ml-40">
        {children}
      </div>
    </div>
  );
};